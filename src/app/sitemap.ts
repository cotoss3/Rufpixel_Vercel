import { MetadataRoute } from 'next';
import { getCategories } from '@/lib/woocommerce';
import { MOCK_SERVICES, MOCK_BLOG_POSTS } from '@/lib/mockData';
import localProductsDb from '@/lib/products-db.json';
import catalogData from '@/lib/catalogData.json';

export const revalidate = 86400; // Revalidate sitemap daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufpixel.com';

  const categories = await getCategories();

  // Deduplicate all product slugs from local verified database and catalogData
  const productSlugs = new Set<string>();
  (localProductsDb as any[]).forEach((p) => {
    if (p.slug) productSlugs.add(p.slug);
    else if (p.handle) productSlugs.add(p.handle);
  });
  (catalogData as any[]).forEach((p) => {
    if (p.slug) productSlugs.add(p.slug);
  });

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cotizador`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zona-pixel`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Category URLs (/tienda/[categoria])
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/tienda/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Complete Product URLs (/productos/[slug]/) for all catalog items
  const productRoutes: MetadataRoute.Sitemap = Array.from(productSlugs).map((slug) => ({
    url: `${baseUrl}/productos/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Services URLs (/servicios/[slug])
  const serviceRoutes: MetadataRoute.Sitemap = MOCK_SERVICES.map((serv) => ({
    url: `${baseUrl}/servicios/${serv.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Blog Post URLs (/blog/[slug])
  const blogRoutes: MetadataRoute.Sitemap = MOCK_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...serviceRoutes, ...blogRoutes];
}
