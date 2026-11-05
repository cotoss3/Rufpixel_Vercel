import { MetadataRoute } from 'next';
import { getCategories } from '@/lib/woocommerce';
import { MOCK_SERVICES, MOCK_BLOG_POSTS } from '@/lib/mockData';
import localProductsDb from '@/lib/products-db.json';
import catalogData from '@/lib/catalogData.json';

export const revalidate = 86400; // Revalidate sitemap daily

/**
 * Yoast SEO-Style Clean XML Sitemap Generator for Next.js App Router
 * - 100% Unique URLs (Zero duplicates guaranteed)
 * - Strict trailing slash consistency matching canonical URLs
 * - Grouped logically: Core Pages -> Categories -> Products -> Services -> Blog Posts
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufpixel.com';
  const now = new Date();

  // Deduplicate products strictly (case-insensitive deduplication)
  const seenSlugs = new Set<string>();
  const uniqueProductSlugs: string[] = [];

  (localProductsDb as any[]).forEach((p) => {
    const slug = (p.slug || p.handle || '').trim();
    if (slug && !seenSlugs.has(slug.toLowerCase())) {
      seenSlugs.add(slug.toLowerCase());
      uniqueProductSlugs.push(slug);
    }
  });

  (catalogData as any[]).forEach((p) => {
    const slug = (p.slug || '').trim();
    if (slug && !seenSlugs.has(slug.toLowerCase())) {
      seenSlugs.add(slug.toLowerCase());
      uniqueProductSlugs.push(slug);
    }
  });

  // 1. Core Priority Pages (Yoast "Pages" index equivalent)
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zona-pixel`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cotizador`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Categories (Yoast "Taxonomy Category" equivalent)
  const categories = await getCategories();
  const seenCategorySlugs = new Set<string>();
  const categoryRoutes: MetadataRoute.Sitemap = [];

  categories.forEach((cat) => {
    const slug = cat.slug.trim().toLowerCase();
    if (slug && !seenCategorySlugs.has(slug)) {
      seenCategorySlugs.add(slug);
      categoryRoutes.push({
        url: `${baseUrl}/tienda/${cat.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  });

  // 3. Products (Yoast "Product Post Type" equivalent - with canonical trailing slash)
  const productRoutes: MetadataRoute.Sitemap = uniqueProductSlugs.map((slug) => ({
    url: `${baseUrl}/productos/${slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 4. Services (Yoast "Services CPT" equivalent)
  const serviceRoutes: MetadataRoute.Sitemap = MOCK_SERVICES.map((serv) => ({
    url: `${baseUrl}/servicios/${serv.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 5. Blog Articles (Yoast "Posts" equivalent)
  const blogRoutes: MetadataRoute.Sitemap = MOCK_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Combine and enforce 100% unique URLs using Map
  const urlMap = new Map<string, MetadataRoute.Sitemap[0]>();
  [...coreRoutes, ...categoryRoutes, ...productRoutes, ...serviceRoutes, ...blogRoutes].forEach((entry) => {
    if (!urlMap.has(entry.url)) {
      urlMap.set(entry.url, entry);
    }
  });

  return Array.from(urlMap.values());
}
