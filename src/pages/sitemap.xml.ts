import type { APIRoute } from 'astro';
import { getPublishedPieces } from '../lib/lab';

export const prerender = true;

export const GET: APIRoute = async () => {
  const pieces = await getPublishedPieces();
  const urls = [
    'https://fidret.com/',
    'https://fidret.com/lab/',
    ...pieces.map((piece) => `https://fidret.com/lab/${piece.data.slug}/`),
  ];
  const body = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')
    + '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
