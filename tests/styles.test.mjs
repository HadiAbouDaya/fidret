import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, renameSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
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

const workspaceRoutes = new Set([
  'lab/autonomous-farm/index.html',
  'lab/ai-software-factory/index.html',
]);
const boundaryRoute = 'lab/agentic-company-harness/index.html';
const referenceRoutes = new Set([
  'lab/autonomous-farm/blueprint/index.html',
  'lab/autonomous-farm/scenario-desk/index.html',
  'lab/ai-software-factory/engineering-notes/index.html',
  'lab/ai-software-factory/scenarios/index.html',
]);

function representativeFixture() {
  const root = fixture();
  // Exercise all route variants independently of the current editorial status.
  for (const slug of ['autonomous-farm', 'ai-software-factory', 'agentic-company-harness', 'ordinary-style-fixture']) {
    const data = {
      schema_version: 1, slug, title: 'Stylesheet publication fixture',
      kind: 'technical-note', status: 'published', authors: ['hadi'],
      created: '2025-01-01', published: '2025-01-02', updated: '2025-01-02',
      summary: 'A disposable style fixture, not company evidence.',
      resources: [], media: [], snippets: [],
    };
    const frontmatter = Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
    const body = ['Question', 'Approach', 'Takeaways', 'Limits', 'Next steps']
      .map(heading => `## ${heading}\n\nInspect the rendered article and its external styles.\n`).join('\n');
    writeFileSync(join(root, 'lab/pieces', `${slug}.md`), `---\n${frontmatter}\n---\n\n${body}`);
  }
  return root;
}

function routesFor(root) {
  return readdirSync(join(root, 'website'), {recursive: true}).filter(name => name.endsWith('.html')).sort();
}
const usesLabStyles = route => route === 'lab/index.html' || /^lab\/[^/]+\/index\.html$/.test(route)
  || route === 'lab/ai-software-factory/engineering-notes/index.html';
function linkedStyles(root) {
  return routesFor(root).map((route) => {
    const html = readFileSync(join(root, 'website', route), 'utf8');
    assert.doesNotMatch(html, /<style(?:\s|>)/i);
    assert.doesNotMatch(html, /<script(?! type="application\/ld\+json")[^>]*>(?!\s*<\/script>)/i);
    assert.doesNotMatch(html, /\sstyle\s*=/i);
    const links = [...html.matchAll(/<link\b[^>]*>/gi)]
      .filter(([tag]) => /\brel="stylesheet"/.test(tag))
      .map(([tag]) => /\bhref="([^"]+)"/.exec(tag)?.[1]);
    assert.ok(links.length > 0, `${route} must link external CSS`);
    assert.equal(new Set(links).size, links.length, `${route} must not load a stylesheet twice`);
    for (const href of links) {
      assert.match(href, /^\/_astro\/[^/]+\.[A-Za-z0-9_-]+\.css$/);
      assert.ok(existsSync(join(root, 'website', href.slice(1))), `${route} CSS must exist`);
      assert.ok(html.indexOf(`href="${href}"`) < html.indexOf('</head>'), `${route} must discover CSS in its head`);
    }
    return links;
  });
}

function stylesByRoute(root) {
  const links = linkedStyles(root);
  return Object.fromEntries(routesFor(root).map((route, index) => [route, links[index]]));
}

function cssFor(root, links) {
  return links.map(href => readFileSync(join(root, 'website', href.slice(1)), 'utf8')).join('\n');
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
  const root = representativeFixture();
  let result = buildSite(root);
  assert.equal(result.status, 0, result.output);
  const routes = routesFor(root);
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
      const route = routes[index];
      if (name === 'styles.css' || usesLabStyles(route)) {
        assert.notDeepEqual(after[index], before[index], `${name} change must invalidate CSS linked from ${route}`);
      } else {
        assert.deepEqual(after[index], before[index], `${name} must not invalidate unrelated ${route}`);
      }
    }
    assertAliases(root);
  }
});

test('rendered Lab variants load their own component styles and invalidate only their consumers', () => {
  const root = representativeFixture();
  let result = buildSite(root);
  assert.equal(result.status, 0, result.output);
  const originalLinks = stylesByRoute(root);
  for (const route of [...workspaceRoutes, boundaryRoute, ...referenceRoutes, 'lab/ordinary-style-fixture/index.html']) {
    assert.ok(originalLinks[route], `${route} must be covered`);
  }

  const families = [
    { name: 'workspace.css', selector: /\.workspace-stage\s*\{/, consumers: workspaceRoutes },
    { name: 'agentic-boundary.css', selector: /\.authority-bench\s*\{/, consumers: new Set([boundaryRoute]) },
    { name: 'lab-experience.css', selector: /\.reference-title\s*\{/, consumers: referenceRoutes },
  ];
  for (const [route, links] of Object.entries(originalLinks)) {
    const css = cssFor(root, links);
    for (const { name, selector, consumers } of families) {
      assert.equal(selector.test(css), consumers.has(route), `${route} must ${consumers.has(route) ? 'include' : 'omit'} ${name}`);
    }
  }
  const ordinary = readFileSync(join(root, 'website/lab/ordinary-style-fixture/index.html'), 'utf8');
  assert.match(ordinary, /<h2 id="question">Question<\/h2>/);
  assert.match(ordinary, /Inspect the rendered article and its external styles\./);
  for (const route of workspaceRoutes) {
    const html = readFileSync(join(root, 'website', route), 'utf8');
    assert.equal((html.match(/data-scene /g) ?? []).length, 5, 'Every initial worked situation remains in HTML');
  }

  result = buildSite(root);
  assert.equal(result.status, 0, result.output);
  assert.deepEqual(stylesByRoute(root), originalLinks, 'Conditional styles must remain deterministic');

  for (const { name, consumers } of families) {
    const before = stylesByRoute(root);
    const source = join(root, 'src/styles', name);
    writeFileSync(source, readFileSync(source, 'utf8') + '\n.fixture-style-change { color: #153e35; }\n');
    result = buildSite(root);
    assert.equal(result.status, 0, result.output);
    const after = stylesByRoute(root);
    for (const [route, links] of Object.entries(before)) {
      if (consumers.has(route)) {
        assert.equal(after[route].filter(href => !links.includes(href)).length, 1, `${name} must update exactly one linked fingerprint on ${route}`);
        assert.equal(links.filter(href => !after[route].includes(href)).length, 1, `${name} must replace its previous fingerprint on ${route}`);
        assert.match(cssFor(root, after[route]), /\.fixture-style-change\s*\{/);
      } else {
        assert.deepEqual(after[route], links, `${name} must not invalidate unrelated ${route}`);
      }
    }
    assertAliases(root);
  }
});

test('conditional CSS URLs preserve CSS imports, asset processing and small external styles without duplicates', () => {
  const root = representativeFixture();
  // These fixture-only sources catch a raw asset bypass, data-URL inlining,
  // unresolved relative URLs and accidental side-effect imports of the same CSS.
  writeFileSync(join(root, 'src/styles/workspace.css'), '@import "./style-fixture.css";\n.workspace-stage { background-image: url("./style-fixture.svg?no-inline"); }\n');
  writeFileSync(join(root, 'src/styles/style-fixture.css'), '.workspace-stage { --fixture-imported: 1; }\n');
  writeFileSync(join(root, 'src/styles/style-fixture.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8"/></svg>');
  writeFileSync(join(root, 'src/styles/agentic-boundary.css'), '.authority-bench { --fixture-small: 1; }\n');
  const result = buildSite(root);
  assert.equal(result.status, 0, result.output);
  const links = stylesByRoute(root);
  for (const route of workspaceRoutes) {
    const css = cssFor(root, links[route]);
    assert.match(css, /--fixture-imported:\s*1/);
    assert.doesNotMatch(css, /@import|\.\/style-fixture/);
    const assetUrl = /url\(["']?([^)'"\s]*style-fixture[^)'"\s]*)/.exec(css)?.[1];
    assert.match(assetUrl ?? '', /^\/_astro\/style-fixture\.[A-Za-z0-9_-]+\.svg$/);
    assert.ok(existsSync(join(root, 'website', assetUrl.slice(1))));
  }
  assert.match(cssFor(root, links[boundaryRoute]), /--fixture-small:\s*1/);
  const emitted = readdirSync(join(root, 'website/_astro')).filter(name => name.endsWith('.css'))
    .map(name => readFileSync(join(root, 'website/_astro', name), 'utf8'));
  assert.equal(emitted.filter(css => css.includes('--fixture-imported')).length, 1);
  assert.equal(emitted.filter(css => css.includes('--fixture-small')).length, 1);
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
