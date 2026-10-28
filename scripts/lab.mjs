#!/usr/bin/env node
/** Create an explicitly attributed draft; Astro owns rendering and publication. */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { authorsSchema, kindLabels, safeLocalPath, slugPattern, utcToday } from '../src/lib/lab-schema.ts';

export function createPiece(root, { slug, title, kind = 'technical-note', authors }, today = utcToday()) {
  if (typeof slug !== 'string' || !slugPattern.test(slug)) throw new Error('Use a lowercase hyphenated slug');
  if (typeof title !== 'string' || !title.trim()) throw new Error('Supply a nonempty title');
  if (!Object.hasOwn(kindLabels, kind)) throw new Error(`Unknown piece kind: ${kind}`);
  const registryFile = safeLocalPath(root, resolve(root, 'lab/authors.json'));
  const registry = authorsSchema.parse(JSON.parse(readFileSync(registryFile, 'utf8')));
  if (!Array.isArray(authors) || !authors.length || authors.some((id) => !Object.hasOwn(registry, id))) {
    throw new Error('Select at least one registered author explicitly');
  }
  if (new Set(authors).size !== authors.length) throw new Error('Author IDs must be unique');
  const template = safeLocalPath(root, resolve(root, 'lab/TEMPLATE.md'));
  let source = readFileSync(template, 'utf8');
  for (const [key, value] of Object.entries({ slug, title: title.trim(), kind, authors, created: today, updated: today })) {
    source = source.replace(new RegExp(`^${key}:.*$`, 'm'), () => `${key}: ${JSON.stringify(value)}`);
  }
  const destination = safeLocalPath(root, resolve(root, 'lab/pieces', `${slug}.md`));
  mkdirSync(safeLocalPath(root, resolve(root, 'lab/pieces')), { recursive: true });
  writeFileSync(destination, source, { encoding: 'utf8', flag: 'wx' });
  return destination;
}

function main() {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      title: { type: 'string' },
      kind: { type: 'string', default: 'technical-note' },
      author: { type: 'string', multiple: true },
    },
  });
  if (positionals.length !== 2 || positionals[0] !== 'new') {
    throw new Error('Usage: node scripts/lab.mjs new <slug> --title "..." --author hadi [--author elie]');
  }
  const root = fileURLToPath(new URL('../', import.meta.url));
  const path = createPiece(root, { slug: positionals[1], title: values.title, kind: values.kind, authors: values.author });
  console.log(`Created draft ${path.slice(root.length)}; build with pnpm build when ready.`);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
