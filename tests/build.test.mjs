import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterEach, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../', import.meta.url));
const fixtures = [];
afterEach(() => { for (const path of fixtures.splice(0)) rmSync(path, { recursive: true, force: true }); });

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'fidret-astro-build-'));
  fixtures.push(root);
  for (const path of ['src', 'public', 'lab', 'astro.config.mjs', 'tsconfig.json', 'package.json']) {
    cpSync(join(project, path), join(root, path), { recursive: true });
  }
  symlinkSync(join(project, 'node_modules'), join(root, 'node_modules'), 'dir');
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

function writePiece(root, slug, { status = 'published', authors = ['elie', 'hadi'], body = narrative, media = [] } = {}) {
  const data = {
    schema_version: 1, slug, title: 'Pipeline fixture <b>literal</b>', kind: 'technical-note', status,
    authors, created: '2025-01-01', published: status === 'published' ? '2025-01-02' : null,
    updated: '2025-01-02', summary: 'A disposable pipeline test, not company evidence.',
    resources: [], media, snippets: [],
  };
  const frontmatter = Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
  writeFileSync(join(root, 'lab/pieces', `${slug}.md`), `---\n${frontmatter}\n---\n\n${body}`);
}

function build(root) {
  const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' };
  // The CLI is an application subprocess, not a child of Node's test runner.
  delete env.NODE_TEST_CONTEXT;
  const program = `try {
    const { build } = await import('astro');
    await build({ root: process.cwd() });
  } catch (error) {
    console.error(error.stack ?? error);
    process.exitCode = 1;
  }`;
  const result = spawnSync(process.execPath, ['--input-type=module', '--eval', program], {
    cwd: root, encoding: 'utf8', timeout: 120_000, maxBuffer: 8 * 1024 * 1024,
    env,
  });
  return { ...result, output: `${result.stdout ?? ''}\n${result.stderr ?? ''}` };
}

test('actual Astro builds publish only complete pieces with ordered credit and safe rendering; withdrawal removes output', () => {
  const root = fixture();
  mkdirSync(join(root, 'public/lab-assets'));
  writeFileSync(join(root, 'public/lab-assets/pipeline-fixture.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8"/></svg>');
  writePiece(root, 'published-fixture', {
    body: `${narrative}\n![Markdown fixture image](/lab-assets/pipeline-fixture.svg)\n`,
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
  assert.doesNotMatch(article, /<script(?:\s|>)/i);
  assert.ok(article.indexOf('Elie Azoury') < article.indexOf('Hadi Abou Daya'));
  assert.match(article, /https:\/\/fidret\.com\/lab\/published-fixture\//);
  assert.match(listing, /published-fixture/);
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
  assert.doesNotMatch(readFileSync(join(root, 'website/sitemap.xml'), 'utf8'), /published-fixture/);
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
