import { cpSync, mkdtempSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../../', import.meta.url));

export function createSiteFixture() {
  const root = mkdtempSync(join(tmpdir(), 'fidret-astro-build-'));
  for (const path of ['src', 'public', 'lab', 'astro.config.mjs', 'tsconfig.json', 'package.json']) {
    cpSync(join(project, path), join(root, path), { recursive: true });
  }
  symlinkSync(join(project, 'node_modules'), join(root, 'node_modules'), 'dir');
  return root;
}

export function buildSite(root) {
  const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' };
  // The application subprocess must not inherit Node's test-runner mode.
  delete env.NODE_TEST_CONTEXT;
  const program = `try {
    const { build } = await import('astro');
    await build({ root: process.cwd() });
  } catch (error) {
    console.error(error.stack ?? error);
    process.exitCode = 1;
  }`;
  const result = spawnSync(process.execPath, ['--input-type=module', '--eval', program], {
    cwd: root, encoding: 'utf8', timeout: 120_000, maxBuffer: 8 * 1024 * 1024, env,
  });
  return { ...result, output: `${result.stdout ?? ''}\n${result.stderr ?? ''}` };
}
