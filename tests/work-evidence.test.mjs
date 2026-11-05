import assert from 'node:assert/strict';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { createSiteFixture, buildSite } from './helpers/site-fixture.mjs';
import { workCatalogue } from '../src/lib/work.ts';
import { workspacesFor } from '../src/lib/lab-workspaces.ts';
import { sensorEvidence, sensorEvidenceTotals } from '../src/lib/sensor-evidence.ts';
import { contracts, GUIDE_PATH } from '../src/lib/workflow-brief.ts';
import { parseJourneyHash, parseWorkspaceToken } from '../src/scripts/lab-experience.js';

function plain(html) {
  return html.replace(/<[^>]*>/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16)))
    .replace(/&#([0-9]+);/g, (_, value) => String.fromCodePoint(Number(value)))
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ').trim();
}

test('work pages render canonical evidence, exact workspace settings and their own invitation', () => {
  const root = createSiteFixture();
  try {
    // Give every Lab-dependent work item a controlled published parent, even
    // if an editorial change has withdrawn it from the actual collection.
    for (const work of workCatalogue.filter(item => item.sourceSlug)) {
      writeFileSync(join(root, 'lab/pieces', `${work.sourceSlug}.md`), `---
schema_version: 1
slug: "${work.sourceSlug}"
title: "Publication evidence fixture"
kind: "technical-note"
status: "published"
authors: ["hadi"]
created: "2025-01-01"
published: "2025-01-02"
updated: "2025-01-02"
summary: "A disposable publication fixture, not a company result."
resources: []
media: []
snippets: []
---
${['Question', 'Approach', 'Takeaways', 'Limits', 'Next steps'].map(heading => `\n## ${heading}\n\nA disposable publication fixture.\n`).join('')}`);
    }
    const result = buildSite(root);
    assert.equal(result.status, 0, result.output);
    const pages = Object.fromEntries(workCatalogue.map(work => {
      const html = readFileSync(join(root, 'website/work', work.slug, 'index.html'), 'utf8');
      assert.ok(plain(html).includes(work.kind));
      assert.ok(plain(html).includes(work.limit), `${work.slug} retains full limitations`);
      assert.ok(plain(html).includes(work.invitation), `${work.slug} uses its catalogue invitation`);
      assert.equal((html.match(/class="project-invitation shell"/g) ?? []).length, 1);
      assert.match(html, /href="\/contact\/"/);
      assert.ok(html.indexOf(`href="${work.artifact}"`) < html.indexOf('class="work-example shell"'), 'The artifact action stays early');
      assert.doesNotMatch(html, /class="work-artifact|<script(?! type="application\/ld\+json")/);
      return [work.slug, html];
    }));

    const signal = plain(pages['signal-freshness']);
    assert.ok(signal.includes(`${sensorEvidenceTotals.observations} scheduled observation points in ${Object.keys(sensorEvidence.scenarios).length} fixed synthetic scenarios`));
    assert.ok(signal.includes(`age-invalid value at ${sensorEvidenceTotals.baseline_age_invalid} points`));
    assert.ok(signal.includes(`guard does so at ${sensorEvidenceTotals.guarded_age_invalid} points`));
    assert.ok(signal.includes('No current value (stale)'));
    assert.ok(signal.includes('not independent trials or an estimate of field reliability'));

    for (const [slug, kind, scene, tokens] of [
      ['autonomous-farm', 'farm', 'water', ['000', '010']],
      ['ai-software-factory', 'factory', 'evidence', ['000', '100', '101']],
    ]) {
      const work = workCatalogue.find(item => item.slug === slug);
      const model = workspacesFor(kind).find(item => item.key === scene);
      const html = pages[slug];
      assert.ok(plain(html).includes(model.fixed));
      for (const token of tokens) {
        const marker = `id="example-${scene}-${token}"`;
        const start = html.indexOf(marker);
        assert.ok(start >= 0, marker);
        const end = html.indexOf('<li id="example-', start + marker.length);
        const block = html.slice(start, end < 0 ? html.indexOf('</ol>', start) : end);
        const text = plain(block);
        const state = model.states[token];
        assert.ok(text.includes(`Model response: ${state.label}`));
        for (const reason of state.reasons) assert.ok(text.includes(reason));
        model.controls.forEach((control, index) => assert.ok(text.includes(`${control.label} ${control.options[Number(token[index])]}`)));
        const href = /href="([^"]*#scene-[^"]+)"/.exec(block)?.[1];
        assert.equal(href, `${work.artifact}#scene-${scene}~v1-${token}`);
        const hash = new URL(href, 'https://fidret.com').hash;
        assert.equal(parseJourneyHash(hash, [scene]).key, scene);
        assert.equal(parseWorkspaceToken(hash), token);
      }
    }

    const harness = pages['agentic-company-harness'];
    for (const contract of contracts.filter(item => ['purpose', 'authority', 'recovery'].includes(item.id))) {
      assert.ok(plain(harness).includes(contract.question));
      assert.ok(plain(harness).includes(contract.id === 'recovery' ? contract.example : contract.prompts[0]));
      assert.ok(harness.includes(`href="${GUIDE_PATH}#${contract.id}"`));
    }
    const publishing = pages['publishing-system'];
    assert.match(publishing, /id="verification"/);
    assert.ok(publishing.includes(`href="${GUIDE_PATH}"`), 'The published example has real companion links');
    assert.ok(plain(publishing).includes('Change that parent to draft'));
    assert.ok(plain(publishing).includes('including generated brief downloads'));

    // The publishing example must not keep advertising a withdrawn parent.
    const sourcePath = join(root, 'lab/pieces/agentic-company-harness.md');
    writeFileSync(sourcePath, readFileSync(sourcePath, 'utf8').replace(/^status:.*$/m, 'status: draft'));
    const withdrawn = buildSite(root);
    assert.equal(withdrawn.status, 0, withdrawn.output);
    const publishingAfter = readFileSync(join(root, 'website/work/publishing-system/index.html'), 'utf8');
    assert.doesNotMatch(publishingAfter, /href="[^\"]*(?:\/lab|\/work)\/agentic-company-harness\//);
    assert.match(publishingAfter, /A current example:/, 'Another published contribution can illustrate the lifecycle');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
