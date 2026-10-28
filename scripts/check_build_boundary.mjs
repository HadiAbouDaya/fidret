import { existsSync, lstatSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Refuse to clean/copy through a symlink before Astro touches generated output. */
export function checkBuildBoundary(root) {
  const errors = [];
  function inspect(path) {
    if (!existsSync(path) && !lstatExists(path)) return;
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) {
      errors.push(`Build paths must not be symlinks: ${path}`);
      return;
    }
    if (stat.isDirectory()) {
      for (const entry of readdirSync(path)) inspect(resolve(path, entry));
    }
  }
  for (const directory of ['src', 'public', 'lab', 'website', '.astro']) inspect(resolve(root, directory));
  if (!existsSync(resolve(root, 'public'))) errors.push('Missing public source directory');
  return errors;
}

function lstatExists(path) {
  try { lstatSync(path); return true; } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const errors = checkBuildBoundary(root);
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  }
}
