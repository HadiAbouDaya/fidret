import { getCollection, type CollectionEntry } from 'astro:content';
import { assertPieceSource, comparePublication } from './lab-schema.ts';
import { renderLabMarkdown } from '../plugins/lab-policy.mjs';

export async function getPublishedPieces(): Promise<CollectionEntry<'lab'>[]> {
  const pieces = await getCollection('lab');
  for (const piece of pieces) {
    assertPieceSource(piece.data.slug, piece.filePath);
    await renderLabMarkdown(piece.body ?? '', piece.data);
  }
  return pieces.filter((piece) => piece.data.status === 'published')
    .sort((left, right) => comparePublication(left.data, right.data));
}
