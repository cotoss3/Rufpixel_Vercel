/** @type {import('next').NextConfig} */
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
  // 301 Permanent SEO Redirects to preserve 100% Google traffic and prevent 404 errors
  async redirects() {
    return [
      // 1. Old WordPress Product URLs (/productos/[slug] -> /producto/[slug])
      {
        source: '/productos/:slug*',
        destination: '/producto/:slug*',
        permanent: true,
      },
      {
        source: '/product/:slug*',
        destination: '/producto/:slug*',
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
      // 4. Old English / WordPress utility pages
      {
        source: '/contact',
        destination: '/contacto',
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
    ];
  },
};

module.exports = nextConfig;
