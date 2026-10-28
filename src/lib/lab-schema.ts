import { lstatSync, realpathSync, statSync } from 'node:fs';
import { dirname, extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { z } from 'astro/zod';
import rawAuthors from '../../lab/authors.json' with { type: 'json' };

// All supported commands run at the repository root. Astro relocates this
// module into website/.prerender/chunks, so import.meta.url is not a source root.
export const repositoryRoot = process.cwd();
export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const kindLabels = {
  simulation: 'Simulation',
  prototype: 'Prototype',
  'technical-note': 'Technical note',
  architecture: 'Architecture note',
} as const;

export function utcToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function validDate(value: string, today = utcToday()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith('0000-')) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value && value <= today;
}

/** Public links are explicit HTTPS destinations or paths within this site. */
export function safeUrl(value: string): boolean {
  if (!value || /[\s\\\u0000-\u001f\u007f]/u.test(value)) return false;
  if (value.startsWith('/') && !value.startsWith('//')) {
    try {
      const decoded = decodeURIComponent(value.split(/[?#]/, 1)[0] ?? '');
      return !decoded.startsWith('//') && !decoded.includes('\\') && !decoded.split('/').includes('..');
    } catch {
      return false;
    }
  }
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}

/** Reject symlinks as well as traversal before reading or creating Lab files. */
export function safeLocalPath(root: string, target: string): string {
  const base = resolve(root);
  const absolute = resolve(target);
  const distance = relative(base, absolute);
  if (distance.startsWith(`..${sep}`) || distance === '..' || isAbsolute(distance)) {
    throw new Error('Lab path must stay inside the repository');
  }
  if (realpathSync(base) !== base) throw new Error('Lab repository root must not be a symlink');
  let current = base;
  for (const part of distance.split(sep).filter(Boolean)) {
    current = resolve(current, part);
    try {
      if (lstatSync(current).isSymbolicLink()) throw new Error('Lab source and asset paths must not contain symlinks');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
  }
  return absolute;
}

export function existingLabImage(value: string, root = repositoryRoot): boolean {
  if (!safeUrl(value) || !value.startsWith('/lab-assets/') || /[?#]/.test(value)) return false;
  try {
    const decoded = decodeURIComponent(value);
    const target = safeLocalPath(root, resolve(root, 'public', `.${decoded}`));
    const imageRoot = resolve(root, 'public/lab-assets');
    if (!target.startsWith(`${imageRoot}${sep}`)) return false;
    return ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(extname(target).toLowerCase())
      && statSync(target).isFile();
  } catch {
    return false;
  }
}

export const authorSchema = z.object({
  name: z.string().trim().min(1),
  url: z.string().refine(safeUrl, 'Use an HTTPS or root-local URL'),
}).strict();

export const authorsSchema = z.record(z.string().regex(slugPattern), authorSchema)
  .refine((authors) => Object.keys(authors).length > 0, 'The author registry cannot be empty');
export const authorRegistry: Record<string, z.infer<typeof authorSchema>> = authorsSchema.parse(rawAuthors);

export function createLabSchema({ root = repositoryRoot, today = utcToday() } = {}) {
  const date = z.string().refine((value) => validDate(value, today), 'Use a valid, nonfuture UTC date (YYYY-MM-DD)');
  const resource = z.object({
    label: z.string().trim().min(1),
    url: z.string().refine(safeUrl, 'Use an HTTPS or root-local URL'),
  }).strict();
  const media = z.object({
    src: z.string().refine((value) => existingLabImage(value, root), 'Use an existing image under public/lab-assets/'),
    alt: z.string().trim().min(1),
    caption: z.string().trim().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }).strict();
  return z.object({
    schema_version: z.literal(1),
    slug: z.string().regex(slugPattern, 'Use a lowercase hyphenated slug matching the filename'),
    title: z.string().trim().min(1),
    kind: z.enum(['simulation', 'prototype', 'technical-note', 'architecture']),
    status: z.enum(['draft', 'published']),
    authors: z.array(z.string().refine((id) => Object.hasOwn(authorRegistry, id), 'Use a registered author ID'))
      .min(1, 'Select actual authors explicitly')
      .refine((ids) => new Set(ids).size === ids.length, 'Author IDs must be unique'),
    created: date,
    published: date.nullable().default(null),
    updated: date,
    summary: z.string(),
    resources: z.array(resource).default([]),
    media: z.array(media).default([]),
    snippets: z.array(z.object({
      title: z.string().trim().min(1),
      language: z.string().trim().min(1),
      code: z.string().min(1).refine((value) => Boolean(value.trim()), 'Code cannot be blank'),
    }).strict()).default([]),
  }).strict().superRefine((piece, context) => {
    if (piece.created > piece.updated) {
      context.addIssue({ code: 'custom', path: ['updated'], message: 'updated cannot precede created' });
    }
    if (piece.status === 'published') {
      if (!piece.published || piece.published < piece.created || piece.published > piece.updated) {
        context.addIssue({ code: 'custom', path: ['published'], message: 'Publication must lie between created and updated' });
      }
      if (!piece.summary.trim()) {
        context.addIssue({ code: 'custom', path: ['summary'], message: 'Complete the summary before publishing' });
      }
    }
  });
}

export const labSchema = createLabSchema();
export type LabFrontmatter = z.infer<typeof labSchema>;

/** Stable code-point order, independent of the build machine's locale. */
export function comparePublication(left: Pick<LabFrontmatter, 'published' | 'slug'>, right: Pick<LabFrontmatter, 'published' | 'slug'>): number {
  const leftDate = left.published ?? '';
  const rightDate = right.published ?? '';
  if (leftDate !== rightDate) return leftDate < rightDate ? 1 : -1;
  return left.slug === right.slug ? 0 : left.slug < right.slug ? 1 : -1;
}

export function assertPieceSource(slug: string, filePath: string | undefined, root = repositoryRoot): void {
  if (!slugPattern.test(slug) || !filePath) throw new Error('Lab pieces need a safe filename matching their slug');
  const target = safeLocalPath(root, resolve(root, filePath));
  const expected = resolve(root, 'lab/pieces', `${slug}.md`);
  if (target !== expected || dirname(target) !== resolve(root, 'lab/pieces')) {
    throw new Error(`Lab slug ${slug} must match its source filename lab/pieces/${slug}.md`);
  }
}
