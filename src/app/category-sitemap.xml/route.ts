import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufpixel.com';
  const now = new Date().toISOString();

  const categories = await getCategories();
  const seen = new Set<string>();
  const uniqueCategories: typeof categories = [];

  categories.forEach((cat) => {
    const s = cat.slug.toLowerCase().trim();
    if (s && !seen.has(s)) {
      seen.add(s);
      uniqueCategories.push(cat);
    }
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueCategories
  .map(
    (c) => `  <url>
    <loc>${baseUrl}/tienda/${c.slug}</loc>
    <lastmod>${now}</lastmod>
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
