import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, test } from 'node:test';
import { createSiteFixture, buildSite as build } from './helpers/site-fixture.mjs';

const fixtures = [];
afterEach(() => { for (const path of fixtures.splice(0)) rmSync(path, { recursive: true, force: true }); });

function fixture() {
  const root = createSiteFixture();
  fixtures.push(root);
  return root;
}

const narrative = `## Question
How does the publishing pipeline behave?

## Approach
Build a disposable fixture.

\`\`\`html
<script>alert('inert fixture')</script>
\`\`\`

## Takeaways
This is a rendering test fixture.

## Limits
No real experiment or client result is claimed.

## Next steps
Discard the fixture after checking it.
`;

function writePiece(root, slug, { status = 'published', authors = ['elie', 'hadi'], body = narrative, media = [], resources = [] } = {}) {
  const data = {
    schema_version: 1, slug, title: 'Pipeline fixture <b>literal</b>', kind: 'technical-note', status,
    authors, created: '2025-01-01', published: status === 'published' ? '2025-01-02' : null,
    updated: '2025-01-02', summary: 'A disposable pipeline test, not company evidence.',
    resources, media, snippets: [],
  };
  const frontmatter = Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
  writeFileSync(join(root, 'lab/pieces', `${slug}.md`), `---\n${frontmatter}\n---\n\n${body}`);
}

test('actual Astro builds publish only complete pieces with ordered credit and safe rendering; withdrawal removes output', () => {
  const root = fixture();
  mkdirSync(join(root, 'public/lab-assets'), { recursive: true });
  writeFileSync(join(root, 'public/lab-assets/pipeline-fixture.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8"/></svg>');
  writePiece(root, 'published-fixture', {
    resources: [{ label: 'Independent reference', url: 'https://example.com/reference' }],
    body: `${narrative}\n## Piece resources\nAuthored heading tests shared ID space.\n\n## Resources title\nAnother authored heading.\n\n![Markdown fixture image](/lab-assets/pipeline-fixture.svg)\n`,
    media: [{ src: '/lab-assets/pipeline-fixture.svg', alt: 'Structured fixture image', caption: 'Disposable test image.', width: 8, height: 8 }],
  });
  writePiece(root, 'private-draft', { status: 'draft', body: '## Question\n' });
  let result = build(root);
  assert.equal(result.status, 0, result.output);
  const article = readFileSync(join(root, 'website/lab/published-fixture/index.html'), 'utf8');
  const listing = readFileSync(join(root, 'website/lab/index.html'), 'utf8');
  const sitemap = readFileSync(join(root, 'website/sitemap.xml'), 'utf8');
  assert.match(article, /&lt;b&gt;literal&lt;\/b&gt;/);
  assert.match(article, /(?:&lt;|&#x3c;)script(?:&gt;|>)/i);
  assert.match(article, /src="\/lab-assets\/pipeline-fixture.svg"/);
  assert.match(article, /width="8"/);
  const articleIds = [...article.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(articleIds).size, articleIds.length, 'Authored headings cannot collide with template anchors');
  for (const [, target] of article.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(articleIds.includes(target), `Article navigation must resolve: ${target}`);
  }
  assert.doesNotMatch(article, /<script(?:\s|>)/i);
  assert.ok(article.indexOf('Elie Azoury') < article.indexOf('Hadi Abou Daya'));
  assert.match(article, /https:\/\/fidret\.com\/lab\/published-fixture\//);
  assert.match(listing, /published-fixture/);
  assert.equal(existsSync(join(root, 'website/lab/published-fixture/sources/index.html')), true);
  assert.equal(existsSync(join(root, 'website/lab/private-draft/sources/index.html')), false);
  assert.match(sitemap, /<loc>https:\/\/fidret\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/fidret\.com\/lab\/<\/loc>/);
  assert.match(sitemap, /published-fixture/);
  assert.doesNotMatch(listing + sitemap, /private-draft/);
  assert.equal(existsSync(join(root, 'website/lab/private-draft')), false);
  assert.equal(existsSync(join(root, 'website/lab/authors.json')), false);
  assert.equal(existsSync(join(root, 'website/AGENTS.md')), false);

  writePiece(root, 'published-fixture', { status: 'draft', body: '## Question\n' });
  result = build(root);
  assert.equal(result.status, 0, result.output);
  assert.equal(existsSync(join(root, 'website/lab/published-fixture')), false);
  assert.equal(existsSync(join(root, 'website/lab/published-fixture/sources')), false);
  assert.doesNotMatch(readFileSync(join(root, 'website/sitemap.xml'), 'utf8'), /published-fixture/);
});

test('workflow companion, download and entry points follow parent publication and withdrawal', () => {
  const root = fixture();
  const slug = 'agentic-company-harness';
  const guidePath = `/lab/${slug}/workflow-brief/`;
  const downloadPath = `/lab/${slug}/workflow-brief.md`;
  writePiece(root, slug, {authors: ['hadi']});
  writePiece(root, 'published-fixture');
  let result = build(root);
  assert.equal(result.status, 0, result.output);
  const guide = readFileSync(join(root, 'website', guidePath, 'index.html'), 'utf8');
  const download = readFileSync(join(root, 'website', downloadPath), 'utf8');
  assert.match(guide, /download="fidret-agent-workflow-brief.md"/);
  assert.match(guide, /type="checkbox"/);
  assert.doesNotMatch(guide, /<(?:script|form)(?:\s|>)/i);
  assert.match(download, /^# Agent workflow brief\n/);
  assert.match(download, /\[not yet tested\]/);
  assert.match(download, /Human launch decision/);
  for (const section of ['Purpose', 'Context', 'Authority', 'Evidence', 'Recovery']) {
    assert.ok(download.includes(`## ${section}\n`), `${section} must be in the actual download`);
  }
  for (const route of [`lab/${slug}/index.html`, 'approach/index.html', 'sitemap.xml']) {
    assert.ok(readFileSync(join(root, 'website', route), 'utf8').includes(guidePath), `${route} must expose the companion`);
  }
  assert.ok(guide.includes(downloadPath));
  assert.equal(existsSync(join(root, 'website/lab/published-fixture/workflow-brief')), false);

  writePiece(root, slug, {status: 'draft', body: '## Question\n'});
  result = build(root);
  assert.equal(result.status, 0, result.output);
  assert.equal(existsSync(join(root, 'website', guidePath)), false);
  assert.equal(existsSync(join(root, 'website', downloadPath)), false);
  for (const route of ['approach/index.html', 'sitemap.xml', 'lab/index.html']) {
    assert.ok(!readFileSync(join(root, 'website', route), 'utf8').includes(guidePath), `${route} must withdraw the entry point`);
  }
});

test('actual Astro build rejects incomplete published narrative', () => {
  const root = fixture();
  writePiece(root, 'incomplete', { body: '## Question\n\n## Approach\n\n## Takeaways\n\n## Limits\n\n## Next steps\n' });
  const result = build(root);
  assert.notEqual(result.status, 0, 'Build must fail for blank published sections');
  writePiece(root, 'incomplete');
  const repaired = build(root);
  assert.equal(repaired.status, 0, repaired.output);
});

test('actual Astro build rejects raw HTML through the configured Markdown pipeline', () => {
  const root = fixture();
  writePiece(root, 'injected', { body: `${narrative}\n<script>alert('blocked')</script>\n` });
  const result = build(root);
  assert.notEqual(result.status, 0, 'Build must reject active authored HTML');
  writePiece(root, 'injected');
  const repaired = build(root);
  assert.equal(repaired.status, 0, repaired.output);
});

test('actual Astro collection rejects an unregistered author', () => {
  const root = fixture();
  writePiece(root, 'wrong-author', { authors: ['unregistered'] });
  const result = build(root);
  assert.notEqual(result.status, 0, 'Build must reject unregistered authors');
  writePiece(root, 'wrong-author', { authors: ['hadi'] });
  const repaired = build(root);
  assert.equal(repaired.status, 0, repaired.output);
});
