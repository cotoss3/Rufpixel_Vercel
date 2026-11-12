import { NextResponse } from 'next/server';
import localProductsDb from '@/lib/products-db.json';
import catalogData from '@/lib/catalogData.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufpixel.com';
  const catalogBaselineDate = '2026-11-11T00:00:00.000Z';

  // Deduplicate products strictly and preserve real modification dates
  const seen = new Set<string>();
  const productEntries: { slug: string; lastmod: string }[] = [];

  (localProductsDb as any[]).forEach((p) => {
    const s = (p.slug || p.handle || '').trim();
    if (s && !seen.has(s.toLowerCase())) {
      seen.add(s.toLowerCase());
      const modDate = p.date_modified || p.updated_at || catalogBaselineDate;
      productEntries.push({ slug: s, lastmod: modDate });
    }
  });

  (catalogData as any[]).forEach((p) => {
    const s = (p.slug || '').trim();
    if (s && !seen.has(s.toLowerCase())) {
      seen.add(s.toLowerCase());
      const modDate = p.date_modified || p.updated_at || catalogBaselineDate;
      productEntries.push({ slug: s, lastmod: modDate });
    }
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${productEntries
  .map(
    (entry) => `  <url>
    <loc>${baseUrl}/productos/${entry.slug}</loc>
    <lastmod>${entry.lastmod}</lastmod>
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
