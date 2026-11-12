import { NextResponse } from 'next/server';
import { MOCK_SERVICES } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufpixel.com';
  const lastmod = '2026-11-11T00:00:00.000Z';

  const canonicalServices = MOCK_SERVICES.filter((s) => s.slug !== 'tomas-aereas-drones');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${canonicalServices
  .map(
    (s) => `  <url>
    <loc>${baseUrl}/servicios/${s.slug}</loc>
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
