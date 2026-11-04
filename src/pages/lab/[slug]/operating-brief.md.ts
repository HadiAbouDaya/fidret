import type { APIRoute, GetStaticPaths } from 'astro';
import {getPublishedPieces} from '../../../lib/lab';
import {FACTORY_SLUG, renderFactoryBrief} from '../../../lib/software-factory';

export const prerender = true;
export const getStaticPaths = (async () => (await getPublishedPieces())
  .filter(piece => piece.data.slug === FACTORY_SLUG)
  .map(piece => ({params: {slug: piece.data.slug}}))) satisfies GetStaticPaths;

export const GET: APIRoute = () => new Response(renderFactoryBrief(), {
  headers: {'Content-Type': 'text/markdown; charset=utf-8'},
});
