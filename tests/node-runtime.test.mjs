import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const nodeVersion = readFileSync(new URL('.node-version', root), 'utf8').trim();
const nvmVersion = readFileSync(new URL('.nvmrc', root), 'utf8').trim();

test('managed runtime agrees with developer, deployment and engine pins', () => {
  assert.match(nodeVersion, /^\d+\.\d+\.\d+$/);
  assert.equal(nvmVersion, nodeVersion, '.nvmrc and .node-version must stay aligned');
  assert.deepEqual(manifest.devEngines.runtime, {
    name: 'node',
    version: nodeVersion,
    onFail: 'download',
  });
  const nextMajor = Number(nodeVersion.split('.')[0]) + 1;
  assert.equal(manifest.engines.node, `>=${nodeVersion} <${nextMajor}`);
  assert.equal(manifest.packageManager, `pnpm@${manifest.engines.pnpm}`);
});

test('project scripts actually execute with the exact managed Node runtime', () => {
  assert.equal(process.versions.node, nodeVersion,
    'Run project scripts through pnpm so they use the lockfile-managed Node runtime');
});

test('project scripts are launched by the exact pinned pnpm version', () => {
  const manager = process.env.npm_config_user_agent?.split(' ')[0];
  assert.equal(manager, `pnpm/${manifest.engines.pnpm}`,
    'Run pnpm test or pnpm runtime:check with the packageManager version pinned in package.json');
});
