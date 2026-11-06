/** @type {import('next').NextConfig} */
const gscPackRedirects = require('./src/lib/gsc-pack-redirects.json');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 301 Permanent SEO Redirects to preserve 100% Google traffic and eliminate 404 errors
  async redirects() {
    return [
      // 1. WordPress Canonical Product URLs (/producto/[slug]) - Preserve 100% SEO traffic
      {
        source: '/producto/:slug*',
        destination: '/productos/:slug*',
        permanent: true,
      },
      {
        source: '/product/:slug*',
        destination: '/productos/:slug*',
        permanent: true,
      },
      // 2. Old WordPress Category URLs (/categoria-producto/[slug] -> /tienda/[slug])
      {
        source: '/categoria-producto/:slug*',
        destination: '/tienda/:slug*',
        permanent: true,
      },
      {
        source: '/product-category/:slug*',
        destination: '/tienda/:slug*',
        permanent: true,
      },
      {
        source: '/categoria/:slug*',
        destination: '/tienda/:slug*',
        permanent: true,
      },
      // Fix legacy service URL
      {
        source: '/servicios/material-promocional-pop',
        destination: '/tienda',
        permanent: true,
      },
      // 3. Old Shop / Catalog pages
      {
        source: '/shop',
        destination: '/tienda',
        permanent: true,
      },
      {
        source: '/catalogo',
        destination: '/tienda',
        permanent: true,
      },
      // 4. Old English & High-Impression WordPress Legacy Landing Pages (from GSC)
      {
        source: '/about',
        destination: '/nosotros',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/impresiones-digitales',
        destination: '/zona-pixel',
        permanent: true,
      },
      {
        source: '/impresiones-digitales-2',
        destination: '/zona-pixel',
        permanent: true,
      },
      {
        source: '/impresiones',
        destination: '/zona-pixel',
        permanent: true,
      },
      {
        source: '/articulos-promocionales',
        destination: '/tienda',
        permanent: true,
      },
      {
        source: '/articulos-promocionale',
        destination: '/tienda',
        permanent: true,
      },
      {
        source: '/diseno-grafico',
        destination: '/servicios/diseno-grafico-vectorizacion',
        permanent: true,
      },
      {
        source: '/activaciones',
        destination: '/servicios/impresion-gran-formato',
        permanent: true,
      },
      {
        source: '/request-quote',
        destination: '/cotizador',
        permanent: true,
      },
      {
        source: '/3090-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/diseno-web',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/cart',
        destination: '/carrito',
        permanent: true,
      },
      {
        source: '/checkout-2',
        destination: '/checkout',
        permanent: true,
      },
      // WordPress Yoast Sitemap alias (/sitemap_index.xml -> /sitemap.xml)
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      // 5. Google Search Console Legacy Pack URLs (/productos/[slug]-[cantidad]-uds) -> Base Product
      ...gscPackRedirects,
    ];
  },
  // Transparent Proxy Rewrites: forward /wp-admin, /wp-login.php, /wp-json to WordPress host
  async rewrites() {
    const wpOrigin = process.env.WORDPRESS_BACKEND_ORIGIN || 'https://backend.rufpixel.com';
    return [
      {
        source: '/wp-admin/:path*',
        destination: `${wpOrigin}/wp-admin/:path*`,
      },
      {
        source: '/wp-login.php',
        destination: `${wpOrigin}/wp-login.php`,
      },
      {
        source: '/wp-json/:path*',
        destination: `${wpOrigin}/wp-json/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
