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
      // 1. Specific Legacy WordPress Categories from Google Search Console (must run before generic /categoria-producto/:slug*)
      {
        source: '/categoria-producto/impresiones-de-gran-formato-banners-y-letreros',
        destination: '/servicios/impresion-gran-formato',
        permanent: true,
      },
      {
        source: '/categoria-producto/etiquetas-stickers',
        destination: '/cotizador',
        permanent: true,
      },
      {
        source: '/categoria-producto/grabado-laser',
        destination: '/servicios/grabados-laser',
        permanent: true,
      },
      {
        source: '/categoria-producto/boligrafos',
        destination: '/tienda/boligrafos-y-plumas',
        permanent: true,
      },
      {
        source: '/categoria-producto/bolsas-loncheras-y-hieleras/:path*',
        destination: '/tienda/bolsas-y-totes',
        permanent: true,
      },
      {
        source: '/categoria-producto/cuadernos-y-libretas',
        destination: '/tienda/libretas-y-cuadernos',
        permanent: true,
      },
      {
        source: '/categoria-producto/papeleria-y-facturas',
        destination: '/servicios/flyers-y-folletos',
        permanent: true,
      },
      {
        source: '/categoria-producto/porta-id',
        destination: '/tienda/identificacion-y-correas',
        permanent: true,
      },
      {
        source: '/categoria-producto/productos-de-cocina',
        destination: '/tienda/cocina-y-hogar',
        permanent: true,
      },
      {
        source: '/categoria-producto/ofertas',
        destination: '/articulos-promocionales-panama',
        permanent: true,
      },
      {
        source: '/categoria-producto/productos-autos',
        destination: '/articulos-promocionales-panama',
        permanent: true,
      },
      {
        source: '/categoria-producto/sublimacion',
        destination: '/articulos-promocionales-panama',
        permanent: true,
      },
      {
        source: '/web/producto/stand-promocional',
        destination: '/servicios/impresion-gran-formato',
        permanent: true,
      },
      {
        source: '/web/categoria-producto/bordados-textiles',
        destination: '/servicios/bordados-computarizados',
        permanent: true,
      },
      {
        source: '/que-es-el-grabado-laser-y-por-que-conviene-para-series-grandes',
        destination: '/blog/grabado-laser-uv-dtf-o-serigrafia-cual-conviene',
        permanent: true,
      },
      {
        source: '/servicio',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/tienda/page/:num*',
        destination: '/tienda',
        permanent: true,
      },
      {
        source: '/sample-page',
        destination: '/articulos-promocionales-panama',
        permanent: true,
      },
      {
        source: '/qr',
        destination: '/articulos-promocionales-panama',
        permanent: true,
      },
      {
        source: '/t-shirt-rojo',
        destination: '/tienda/textiles-y-ropa',
        permanent: true,
      },
      {
        source: '/post-1',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/post-2',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/post-3',
        destination: '/blog',
        permanent: true,
      },
      // 2. WordPress Canonical Product URLs (/producto/[slug]) - Preserve 100% SEO traffic
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
      // 3. Old WordPress Category URLs (/categoria-producto/[slug] -> /tienda/[slug])
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
      // SILO Category Anti-Cannibalization 301 Redirects
      {
        source: '/tienda/vasos-y-tazas',
        destination: '/tienda/tazas-botellas-y-termos',
        permanent: true,
      },
      {
        source: '/tienda/articulos-promocionales-de-oficina',
        destination: '/tienda/oficina-y-escritorio',
        permanent: true,
      },
      // Fix legacy service URL
      {
        source: '/servicios/material-promocional-pop',
        destination: '/articulos-promocionales-panama',
        permanent: true,
      },
      // 4. Old Shop / Catalog pages
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
      // 5. Old English & High-Impression WordPress Legacy Landing Pages (from GSC)
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
        destination: '/cotizador',
        permanent: true,
      },
      {
        source: '/impresiones-digitales-2',
        destination: '/cotizador',
        permanent: true,
      },
      {
        source: '/impresiones',
        destination: '/cotizador',
        permanent: true,
      },
      {
        source: '/articulos-promocionales',
        destination: '/articulos-promocionales-panama',
        permanent: true,
      },
      {
        source: '/articulos-promocionale',
        destination: '/articulos-promocionales-panama',
        permanent: true,
      },
      {
        source: '/diseno-grafico',
        destination: '/servicios',
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
      // 6. Google Search Console Legacy Pack & Renamed Product URLs -> Canonical Target
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
