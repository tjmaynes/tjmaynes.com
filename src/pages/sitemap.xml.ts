import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const routes = ['/', '/services/consulting/', '/services/coaching/', '/privacy/'];
  const urls = routes.map(route => `<url><loc>${new URL(route, site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
