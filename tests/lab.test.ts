import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test, { type TestContext } from 'node:test';
import { createPiece } from '../scripts/lab.mjs';
import { assertPieceSource, comparePublication, createLabSchema, existingLabImage, repositoryRoot, safeLocalPath, safeUrl, validDate } from '../src/lib/lab-schema.ts';

const today = '2026-10-28';
const draft = {
  schema_version: 1, slug: 'fixture-note', title: 'Test fixture note',
  kind: 'technical-note', status: 'draft', authors: ['hadi'],
  created: today, published: null, updated: today, summary: '',
};

function fixture(t: TestContext): string {
  const root = mkdtempSync(join(tmpdir(), 'fidret-lab-schema-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'lab/pieces'), { recursive: true });
  mkdirSync(join(root, 'public/lab-assets/fixture'), { recursive: true });
  copyFileSync(join(repositoryRoot, 'lab/authors.json'), join(root, 'lab/authors.json'));
  copyFileSync(join(repositoryRoot, 'lab/TEMPLATE.md'), join(root, 'lab/TEMPLATE.md'));
  writeFileSync(join(root, 'public/lab-assets/fixture/image.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><title>Test fixture</title></svg>');
  return root;
}

test('an incomplete draft is valid but publishing requires a summary and publication date', () => {
  const schema = createLabSchema({ today });
  assert.equal(schema.parse(draft).status, 'draft');
  assert.equal(schema.safeParse({ ...draft, status: 'published' }).success, false);
  assert.equal(schema.parse({ ...draft, status: 'published', summary: 'A conceptual fixture, without measured results.', published: today }).status, 'published');
});

test('authors are explicit, registered, unique and retain their supplied order', () => {
  const schema = createLabSchema({ today });
  assert.deepEqual(schema.parse({ ...draft, authors: ['elie', 'hadi'] }).authors, ['elie', 'hadi']);
  for (const authors of [[], ['unknown'], ['hadi', 'hadi']]) {
    assert.equal(schema.safeParse({ ...draft, authors }).success, false);
  }
});

test('dates use real dashed UTC calendar dates and reject future values', () => {
  assert.equal(validDate('2024-02-29', today), true);
  for (const value of ['2026-02-29', '2026-04-31', '20261028', '0000-01-01', '2026-10-29', '2026-10-28T00:00:00Z']) {
    assert.equal(validDate(value, today), false, value);
  }
  const schema = createLabSchema({ today });
  assert.equal(schema.safeParse({ ...draft, created: '2026-10-29' }).success, false);
  assert.equal(schema.safeParse({ ...draft, published: '2026-10-29' }).success, false);
});

test('publication falls between creation and update, including for revised pieces', () => {
  const schema = createLabSchema({ today });
  const published = { ...draft, status: 'published', summary: 'Fixture explanation.', created: '2026-10-20', published: '2026-10-21' };
  assert.equal(schema.parse(published).published, '2026-10-21');
  for (const change of [{ updated: '2026-10-19' }, { published: '2026-10-19' }, { published: '2026-10-27', updated: '2026-10-22' }]) {
    assert.equal(schema.safeParse({ ...published, ...change }).success, false);
  }
});

test('schema versions, kinds, slugs and unknown fields cannot silently change', () => {
  const schema = createLabSchema({ today });
  for (const change of [{ schema_version: 2 }, { kind: 'case-study' }, { slug: '../escape' }, { slug: 'Uppercase' }, { status: 'scheduled' }, { metric: 42 }]) {
    assert.equal(schema.safeParse({ ...draft, ...change }).success, false);
  }
});

test('resource links reject executable, credentialed, relative and ambiguous destinations', () => {
  assert.equal(safeUrl('https://example.com/paper?q=1#section'), true);
  assert.equal(safeUrl('/lab/fixture-note/#limits'), true);
  for (const value of ['javascript:alert(1)', 'data:text/html,test', 'http://example.com', '//example.com/a', 'https://user:pass@example.com/', 'relative.md', '/\\evil.example', '/%2fexample.com', '/lab/../AGENTS.md', '/lab/%2e%2e/AGENTS.md', 'https://example.com/\n']) {
    assert.equal(safeUrl(value), false, value);
  }
  const schema = createLabSchema({ today });
  assert.equal(schema.safeParse({ ...draft, resources: [{ label: 'Unsafe fixture', url: 'javascript:alert(1)' }] }).success, false);
});

test('structured media require a real local image, descriptions and positive dimensions', (t) => {
  const root = fixture(t);
  const schema = createLabSchema({ root, today });
  const figure = { src: '/lab-assets/fixture/image.svg', alt: 'Fixture diagram', caption: 'Illustrative test fixture.', width: 10, height: 10 };
  assert.equal(schema.parse({ ...draft, media: [figure] }).media.length, 1);
  for (const change of [{ src: '/favicon.svg' }, { src: '/lab-assets/missing.png' }, { src: 'https://example.com/image.png' }, { src: '/lab-assets/../private.svg' }, { alt: '' }, { caption: '' }, { width: 0 }, { height: 1.5 }]) {
    assert.equal(schema.safeParse({ ...draft, media: [{ ...figure, ...change }] }).success, false);
  }
  symlinkSync(join(root, 'public/lab-assets/fixture/image.svg'), join(root, 'public/lab-assets/fixture/linked.svg'));
  assert.equal(existingLabImage('/lab-assets/fixture/linked.svg', root), false);
});

test('code excerpts remain strings with complete labels', () => {
  const schema = createLabSchema({ today });
  const snippet = { title: 'Fixture source', language: 'html', code: '<script>alert("fixture")</script>' };
  assert.equal(schema.parse({ ...draft, snippets: [snippet] }).snippets[0]?.code, snippet.code);
  assert.equal(schema.safeParse({ ...draft, snippets: [{ ...snippet, code: ' ' }] }).success, false);
});

test('source metadata must match a flat Markdown filename', (t) => {
  const root = fixture(t);
  assert.doesNotThrow(() => assertPieceSource('fixture-note', 'lab/pieces/fixture-note.md', root));
  assert.throws(() => assertPieceSource('fixture-note', 'lab/pieces/other.md', root), /must match/);
  assert.throws(() => assertPieceSource('fixture-note', 'lab/pieces/nested/fixture-note.md', root), /must match/);
  assert.throws(() => assertPieceSource('fixture-note', undefined, root), /safe filename/);
});

test('publication ordering is newest first with a deterministic descending slug tie-break', () => {
  const entries = [
    { published: '2026-10-20', slug: 'z' }, { published: today, slug: 'a-2' },
    { published: today, slug: 'a2' }, { published: today, slug: 'z' },
  ];
  assert.deepEqual(entries.sort(comparePublication).map((piece) => piece.slug), ['z', 'a2', 'a-2', 'z']);
});

test('creation produces a safe attributed Markdown draft without overwriting work', (t) => {
  const root = fixture(t);
  const path = createPiece(root, { slug: 'fixture-note', title: 'Fixture: "quoted"\nsecond line', kind: 'architecture', authors: ['elie', 'hadi'] }, today);
  const source = readFileSync(path, 'utf8');
  assert.match(source, /status: "draft"/);
  assert.match(source, /authors: \["elie","hadi"\]/);
  assert.match(source, /title: "Fixture: \\"quoted\\"\\nsecond line"/);
  assert.match(source, /created: "2026-10-28"/);
  assert.match(source, /## Question/);
  assert.throws(() => createPiece(root, { slug: 'fixture-note', title: 'Replacement', authors: ['hadi'] }, today), /EEXIST/);
  assert.equal(readFileSync(path, 'utf8'), source);
});

test('creation rejects traversal, missing authors and symlinked source directories', (t) => {
  const root = fixture(t);
  for (const change of [{ slug: '../escape' }, { authors: [] }, { authors: ['unknown'] }, { authors: ['hadi', 'hadi'] }]) {
    assert.throws(() => createPiece(root, { slug: 'fixture-note', title: 'Fixture', authors: ['hadi'], ...change }, today));
  }
  const outside = mkdtempSync(join(tmpdir(), 'fidret-outside-'));
  t.after(() => rmSync(outside, { recursive: true, force: true }));
  rmSync(join(root, 'lab/pieces'), { recursive: true });
  symlinkSync(outside, join(root, 'lab/pieces'));
  assert.throws(() => createPiece(root, { slug: 'fixture-note', title: 'Fixture', authors: ['hadi'] }, today), /symlink/);
  assert.equal(existsSync(join(outside, 'fixture-note.md')), false);
  assert.throws(() => safeLocalPath(root, resolve(root, '../escape')), /inside/);
});

test('creation preserves literal dollar replacement tokens in an authored title', (t) => {
  const root = fixture(t);
  const title = "Price $& $` $' $$ $1 $<name> behavior";
  const path = createPiece(root, { slug: 'literal-dollar-fixture', title, authors: ['hadi'] }, today);
  const source = readFileSync(path, 'utf8');
  const titleLine = source.split('\n').find((line) => line.startsWith('title: '));
  assert.equal(titleLine, `title: ${JSON.stringify(title)}`);
  assert.equal(JSON.parse(titleLine!.slice('title: '.length)), title);
  assert.equal(source.match(/^---$/gm)?.length, 2);
});
