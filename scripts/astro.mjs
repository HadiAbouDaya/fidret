#!/usr/bin/env node
/** Keep Astro's CLI within the project and independent of writable home state. */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkBuildBoundary } from './check_build_boundary.mjs';

process.env.ASTRO_TELEMETRY_DISABLED = '1';
const root = fileURLToPath(new URL('../', import.meta.url));
if (resolve(process.cwd()) !== resolve(root)) {
  console.error('Run project commands from the repository root.');
  process.exitCode = 1;
} else {
  const errors = checkBuildBoundary(root);
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else {
    const manifest = import.meta.resolve('astro/package.json');
    await import(new URL('./bin/astro.mjs', manifest));
  }
}
