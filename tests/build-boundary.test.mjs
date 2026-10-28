import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, test } from 'node:test';
import { checkBuildBoundary } from '../scripts/check_build_boundary.mjs';

const fixtures = [];
afterEach(() => { for (const path of fixtures.splice(0)) rmSync(path, { recursive: true, force: true }); });
function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'fidret-boundary-'));
  fixtures.push(root);
  mkdirSync(join(root, 'public'));
  mkdirSync(join(root, 'lab'));
  return root;
}

test('new output directory is safe to build', () => {
  assert.deepEqual(checkBuildBoundary(fixture()), []);
});

test('symlinked output and source trees fail before a build can clean or copy them', () => {
  for (const target of ['src', 'website', 'public/nested', 'lab/authors.json', '.astro']) {
    const root = fixture();
    const external = fixture();
    writeFileSync(join(external, 'keep.txt'), 'preserve');
    symlinkSync(external, join(root, target), 'dir');
    assert.ok(checkBuildBoundary(root).some((error) => error.includes('must not be symlinks')));
    assert.equal(checkBuildBoundary(external).length, 0);
  }
});

test('dangling symlinks are also rejected', () => {
  const root = fixture();
  symlinkSync(join(root, 'missing'), join(root, 'website'), 'dir');
  assert.ok(checkBuildBoundary(root).some((error) => error.includes('must not be symlinks')));
});
