import type { APIRoute, GetStaticPaths } from 'astro';
import { getPublishedPieces } from '../../../lib/lab';
import { HARNESS_SLUG, renderWorkflowBrief } from '../../../lib/workflow-brief';

export const prerender = true;
export const getStaticPaths = (async () => (await getPublishedPieces())
  .filter(piece => piece.data.slug === HARNESS_SLUG)
  .map(piece => ({params: {slug: piece.data.slug}}))) satisfies GetStaticPaths;

export const GET: APIRoute = () => new Response(renderWorkflowBrief(), {
  headers: {'Content-Type': 'text/markdown; charset=utf-8'},
});
