import { MetadataRoute } from 'next';
import { MOCK_PRODUCTS, MOCK_SERVICES, MOCK_BLOG_POSTS } from '@/lib/mockData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rufpixel.com';

  const staticRoutes = [
    '',
    '/servicios',
    '/tienda',
    '/blog',
    '/nosotros',
    '/contacto',
    '/cotizador',
    '/carrito',
    '/checkout',
    '/mi-cuenta',
    '/privacidad',
    '/terminos',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productRoutes = MOCK_PRODUCTS.map((product) => ({
    url: `${baseUrl}/producto/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const serviceRoutes = MOCK_SERVICES.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogRoutes = MOCK_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...serviceRoutes, ...blogRoutes];
}
