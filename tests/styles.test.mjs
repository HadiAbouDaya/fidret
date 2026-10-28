import assert from 'node:assert/strict';
import { existsSync, readFileSync, renameSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { join, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { afterEach, test } from 'node:test';
import { createSiteFixture, buildSite } from './helpers/site-fixture.mjs';
import compatibilityStyles from '../src/integrations/compatibility-styles.mjs';

const fixtures = [];
afterEach(() => { for (const path of fixtures.splice(0)) rmSync(path, { recursive: true, force: true }); });
function fixture() {
  const root = createSiteFixture();
  fixtures.push(root);
  return root;
}

const routes = ['index.html', 'lab/index.html', '404.html'];
function linkedStyles(root) {
  return routes.map((route) => {
    const html = readFileSync(join(root, 'website', route), 'utf8');
    assert.doesNotMatch(html, /<(?:style|script)(?:\s|>)/i);
    assert.doesNotMatch(html, /\sstyle\s*=/i);
    const links = [...html.matchAll(/<link\b[^>]*>/gi)]
      .filter(([tag]) => /\brel="stylesheet"/.test(tag))
      .map(([tag]) => /\bhref="([^"]+)"/.exec(tag)?.[1]);
    assert.ok(links.length > 0, `${route} must link external CSS`);
    for (const href of links) {
      assert.match(href, /^\/_astro\/[^/]+\.[A-Za-z0-9_-]+\.css$/);
      assert.ok(existsSync(join(root, 'website', href.slice(1))), `${route} CSS must exist`);
    }
    return links;
  });
}

function assertAliases(root) {
  for (const name of ['styles.css', 'lab.css']) {
    assert.equal(existsSync(join(root, 'public', name)), false, 'Legacy aliases must not be editable duplicates');
    assert.deepEqual(readFileSync(join(root, 'website', name)), readFileSync(join(root, 'src/styles', name)));
  }
}

test('compatibility generation rejects symlinked stylesheet directories and source ancestors', async () => {
  for (const relative of ['src', 'src/styles']) {
    const root = fixture();
    const source = join(root, relative);
    const external = join(root, 'external-source');
    renameSync(source, external);
    symlinkSync(external, source, 'dir');
    const rootUrl = pathToFileURL(root + sep);
    await assert.rejects(
      compatibilityStyles().hooks['astro:config:done']({
        config: { root: rootUrl, publicDir: new URL('public/', rootUrl) },
      }),
      /regular source directories/,
    );
    assert.ok(existsSync(external), 'Rejected configuration must preserve the external source');
  }
});

test('real builds use deterministic external fingerprinted CSS on every page and preserve legacy source bytes', () => {
  const root = fixture();
  let result = buildSite(root);
  assert.equal(result.status, 0, result.output);
  const originalLinks = linkedStyles(root);
  assertAliases(root);

  result = buildSite(root);
  assert.equal(result.status, 0, result.output);
  assert.deepEqual(linkedStyles(root), originalLinks, 'Unchanged CSS must retain its public identity');
  assertAliases(root);

  for (const [name, rule] of [
    ['styles.css', '\nbody { border-top: 1px solid #153e35; }\n'],
    ['lab.css', '\n.lab-page { border-bottom: 1px solid #153e35; }\n'],
  ]) {
    const before = linkedStyles(root);
    const source = join(root, 'src/styles', name);
    writeFileSync(source, readFileSync(source, 'utf8') + rule);
    result = buildSite(root);
    assert.equal(result.status, 0, result.output);
    const after = linkedStyles(root);
    for (let index = 0; index < routes.length; index++) {
      assert.notDeepEqual(after[index], before[index], `${name} change must invalidate CSS linked from ${routes[index]}`);
    }
    assertAliases(root);
  }
});

test('builds reject a second editable source at a legacy CSS alias', () => {
  const root = fixture();
  writeFileSync(join(root, 'public/styles.css'), 'body { color: red; }');
  const result = buildSite(root);
  assert.notEqual(result.status, 0);
  rmSync(join(root, 'public/styles.css'));
  const repaired = buildSite(root);
  assert.equal(repaired.status, 0, repaired.output);
  assertAliases(root);
});
