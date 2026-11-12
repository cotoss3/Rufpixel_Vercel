import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufpixel.com';
  const lastmod = '2026-11-11T00:00:00.000Z';

  const pages = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${baseUrl}/articulos-promocionales-panama`, priority: '1.0', changefreq: 'weekly' },
    { url: `${baseUrl}/tienda`, priority: '0.9', changefreq: 'daily' },
    { url: `${baseUrl}/zona-pixel`, priority: '0.9', changefreq: 'weekly' },
    { url: `${baseUrl}/cotizador`, priority: '0.9', changefreq: 'weekly' },
    { url: `${baseUrl}/tomas-aereas-panama`, priority: '0.9', changefreq: 'weekly' },
    { url: `${baseUrl}/servicios`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/galeria`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/blog`, priority: '0.7', changefreq: 'weekly' },
    { url: `${baseUrl}/nosotros`, priority: '0.6', changefreq: 'monthly' },
    { url: `${baseUrl}/contacto`, priority: '0.6', changefreq: 'monthly' },
    { url: `${baseUrl}/privacidad`, priority: '0.3', changefreq: 'yearly' },
    { url: `${baseUrl}/terminos`, priority: '0.3', changefreq: 'yearly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
