import type { APIRoute, GetStaticPaths } from 'astro';
import {getPublishedPieces} from '../../../lib/lab';
import {FARM_SLUG} from '../../../lib/autonomous-farm';
import {renderFarmBrief} from '../../../lib/farm-blueprint';
import {FACTORY_SLUG, renderFactoryBrief} from '../../../lib/software-factory';

export const prerender = true;
export const getStaticPaths = (async () => (await getPublishedPieces())
  .filter(piece => [FACTORY_SLUG, FARM_SLUG].includes(piece.data.slug))
  .map(piece => ({params: {slug: piece.data.slug}}))) satisfies GetStaticPaths;

export const GET: APIRoute = ({params}) => new Response(params.slug === FARM_SLUG ? renderFarmBrief() : renderFactoryBrief(), {
  headers: {'Content-Type': 'text/markdown; charset=utf-8'},
});
