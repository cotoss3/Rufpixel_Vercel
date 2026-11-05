import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout/', '/mi-cuenta/', '/cotizacion/'],
      },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'cohere-ai',
          'anthropic-ai',
        ],
        allow: ['/', '/llms.txt'],
        disallow: ['/checkout/', '/mi-cuenta/', '/cotizacion/'],
      },
    ],
    sitemap: 'https://rufpixel.com/sitemap.xml',
  };
}
