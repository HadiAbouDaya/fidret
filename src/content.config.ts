import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { authorSchema, labSchema } from './lib/lab-schema.ts';

const authors = defineCollection({
  loader: file('lab/authors.json'),
  schema: authorSchema,
});

const lab = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './lab/pieces' }),
  schema: labSchema,
});

export const collections = { authors, lab };
