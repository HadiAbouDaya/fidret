import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { renderLabMarkdown } from '../src/plugins/lab-policy.mjs';

const complete = `## Question

What trade-off does this conceptual fixture explore?

## Approach

Explain an idea without claiming an experiment was run.

## Takeaways

- A qualitative observation is enough for this fixture.

## Limits

- This is a test fixture, without real-world validation.

## Next steps

- Compare alternatives before any physical trial.
`;

test('a complete conceptual piece renders real Markdown without requiring metrics', async () => {
  const result = await renderLabMarkdown(complete, { status: 'published' });
  assert.match(result.code, /<h2 id="question">Question<\/h2>/);
  assert.match(result.code, /<li>This is a test fixture/);
  assert.doesNotMatch(result.code, /<script|style=/);
});

test('drafts can have empty sections while published sections must contain substance', async (t) => {
  t.mock.method(console, 'error', () => {});
  await assert.doesNotReject(renderLabMarkdown('## Question\n\n## Limits\n', { status: 'draft' }));
  await assert.rejects(renderLabMarkdown('## Question\n\n## Limits\n', { status: 'published' }), /Complete the question section/);
  await assert.rejects(renderLabMarkdown(complete.replace('- Compare alternatives before any physical trial.', '---'), { status: 'published' }), /Complete the next steps section/);
});

test('duplicate required sections and authored H1 headings cannot distort the page', async (t) => {
  t.mock.method(console, 'error', () => {});
  await assert.rejects(renderLabMarkdown(`${complete}\n## Question\nAnother question.`, { status: 'published' }), /Duplicate article section/);
  await assert.rejects(renderLabMarkdown('# Authored title\n', { status: 'draft' }), /page supplies the H1/);
});

test('raw HTML, comments and event handlers are rejected before HTML generation', async (t) => {
  t.mock.method(console, 'error', () => {});
  for (const source of ['<script>alert(1)</script>', '<img src="/x.png" onerror="alert(1)">', '<!-- hidden HTML -->', 'Text <span style="color:red">markup</span>']) {
    await assert.rejects(renderLabMarkdown(source, { status: 'draft' }), /Raw HTML/);
  }
});

test('fenced and inline code containing HTML remains escaped inert text', async () => {
  const source = '```html\n<script>alert("fixture")</script>\n```\n\n`<img onerror="fixture">`';
  const result = await renderLabMarkdown(source, { status: 'draft' });
  assert.match(result.code, /(?:&lt;|&#x3C;)script>/);
  assert.match(result.code, /(?:&lt;|&#x3C;)img onerror=/);
  assert.doesNotMatch(result.code, /<script|<img|style=/);
});

test('direct, autolink and reference destinations use the same safe URL policy', async (t) => {
  t.mock.method(console, 'error', () => {});
  for (const source of ['[unsafe](javascript:alert%281%29)', '[unsafe](data:text/html,fixture)', '[unsafe](//example.com/a)', '[unsafe](https://user:secret@example.com/)', '[unsafe](relative.md)', '[unsafe][ref]\n\n[ref]: javascript:alert%281%29', '<http://example.com/>']) {
    await assert.rejects(renderLabMarkdown(source, { status: 'draft' }), /links must use HTTPS/);
  }
  const result = await renderLabMarkdown('[source](https://example.com/paper) and [limits](/lab/fixture/#limits)', { status: 'draft' });
  assert.match(result.code, /href="https:\/\/example.com\/paper"/);
  assert.match(result.code, /href="\/lab\/fixture\/#limits"/);
});

test('Markdown image references require real local Lab images and meaningful alt text', async (t) => {
  t.mock.method(console, 'error', () => {});
  const root = mkdtempSync(join(tmpdir(), 'fidret-markdown-images-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'public/lab-assets/fixture'), { recursive: true });
  writeFileSync(join(root, 'public/lab-assets/fixture/image.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"></svg>');
  const result = await renderLabMarkdown('![Fixture diagram][image]\n\n[image]: /lab-assets/fixture/image.svg', { status: 'draft' }, { root });
  assert.match(result.code, /alt="Fixture diagram"/);
  for (const source of ['![](/lab-assets/fixture/image.svg)', '![fixture](https://example.com/image.svg)', '![fixture](/lab-assets/missing.svg)', '![fixture][image]\n\n[image]: /lab-assets/missing.svg']) {
    await assert.rejects(renderLabMarkdown(source, { status: 'draft' }, { root }), /images/);
  }
});

test('duplicate reference definitions cannot validate one image and render another', async (t) => {
  t.mock.method(console, 'error', () => {});
  const root = mkdtempSync(join(tmpdir(), 'fidret-markdown-reference-shadow-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'public/lab-assets/fixture'), { recursive: true });
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"></svg>';
  writeFileSync(join(root, 'public/favicon.svg'), svg);
  writeFileSync(join(root, 'public/lab-assets/fixture/image.svg'), svg);
  for (const duplicate of ['shared image', 'SHARED IMAGE', '  Shared   Image  ']) {
    const source = `![Fixture diagram][shared image]\n\n[shared image]: /favicon.svg\n\n[${duplicate}]: /lab-assets/fixture/image.svg`;
    await assert.rejects(renderLabMarkdown(source, { status: 'draft' }, { root }), /Duplicate Markdown reference definition/);
  }
});
