import React, { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/woocommerce';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import ShopClientGrid from '@/components/shop/ShopClientGrid';
import { BreadcrumbListSchema } from '@/components/seo/SchemaOrg';

export const metadata = {
  title: 'Artículos Promocionales e Imprenta en Panamá | RufPixel', // 55 chars (Regla 1: 50-60)
  description: 'Catálogo de artículos promocionales en Panamá: termos, libretas, gorras y DTF por mayor desde 50 uds. Taller en La Chorrera y envíos. ¡Cotiza al WhatsApp!', // 154 chars (Regla 2: 120-155)
  alternates: {
    canonical: 'https://rufpixel.com/tienda',
  },
  openGraph: {
    title: 'Artículos Promocionales e Imprenta en Panamá | RufPixel',
    description: 'Catálogo de artículos promocionales en Panamá: termos, libretas, gorras y DTF por mayor desde 50 uds. Taller en La Chorrera y envíos. ¡Cotiza al WhatsApp!',
    url: 'https://rufpixel.com/tienda',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default async function TiendaPage() {
  // Fetch full catalog for instant 0ms client-side category filtering
  const [{ products }, categories] = await Promise.all([
    getProducts('todos', 1, 100),
    getCategories(),
  ]);

  const activeProducts = products && products.length > 0 ? products : MOCK_PRODUCTS;

  const breadcrumbs = [
    { name: 'Inicio', url: 'https://rufpixel.com' },
    { name: 'Tienda', url: 'https://rufpixel.com/tienda' },
  ];

  return (
    <div className="py-10 space-y-8">
      <BreadcrumbListSchema items={breadcrumbs} />

      {/* Catalog Header in Jet Black (#0D0D0D) & RufPixel Orange (#FF5E14) */}
      <section className="bg-[#0D0D0D] text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            Catálogo RufPixel
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit">
            Artículos Promocionales y Catálogo Corporativo
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm">
            Explora {activeProducts.length} productos disponibles para personalización al por mayor con despacho a todo Panamá.
          </p>
        </div>
      </section>

      {/* Main Container with Instant Shop Client Grid Wrapped in Suspense */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="py-24 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-[#FF5E14] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-gray-500 font-outfit">Cargando catálogo RufPixel...</p>
          </div>
        }>
          <ShopClientGrid initialProducts={activeProducts} categories={categories} activeCategorySlug="todos" />
        </Suspense>
      </div>
    </div>
  );
}
