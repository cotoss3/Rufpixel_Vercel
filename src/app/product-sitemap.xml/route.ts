import { NextResponse } from 'next/server';
import localProductsDb from '@/lib/products-db.json';
import catalogData from '@/lib/catalogData.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufpixel.com';
  const now = new Date().toISOString();

  // Deduplicate products strictly
  const seen = new Set<string>();
  const productSlugs: string[] = [];

  (localProductsDb as any[]).forEach((p) => {
    const s = (p.slug || p.handle || '').trim();
    if (s && !seen.has(s.toLowerCase())) {
      seen.add(s.toLowerCase());
      productSlugs.push(s);
    }
  });

  (catalogData as any[]).forEach((p) => {
    const s = (p.slug || '').trim();
    if (s && !seen.has(s.toLowerCase())) {
      seen.add(s.toLowerCase());
      productSlugs.push(s);
    }
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${productSlugs
  .map(
    (slug) => `  <url>
    <loc>${baseUrl}/productos/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
