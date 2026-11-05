import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufpixel.com';
  const now = new Date().toISOString();

  // Exactly like Yoast SEO: sitemap_index.xml linking to child sitemaps
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/page-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/product-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/category-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/service-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/post-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
