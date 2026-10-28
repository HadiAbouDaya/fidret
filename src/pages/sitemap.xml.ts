import type { APIRoute } from 'astro';
import { getPublishedPieces } from '../lib/lab';
import { authorRegistry } from '../lib/lab-schema';

export const prerender = true;

export const GET: APIRoute = async () => {
  const pieces = await getPublishedPieces();
  const urls = [
    'https://fidret.com/',
    'https://fidret.com/lab/',
    'https://fidret.com/approach/',
    'https://fidret.com/project/',
    'https://fidret.com/charter/',
    ...Object.keys(authorRegistry).map(id => `https://fidret.com/people/${id}/`),
    'https://fidret.com/explorations/signal-freshness/',
    'https://fidret.com/explorations/signal-freshness/method/',
    ...pieces.flatMap((piece) => [`https://fidret.com/lab/${piece.data.slug}/`, `https://fidret.com/lab/${piece.data.slug}/sources/`]),
  ];
  const body = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')
    + '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
