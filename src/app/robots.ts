import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout/', '/mi-cuenta/'],
    },
    sitemap: 'https://rufpixel.com/sitemap.xml',
  };
}
