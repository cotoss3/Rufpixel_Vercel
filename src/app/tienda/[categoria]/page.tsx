import React, { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/woocommerce';
import ShopClientGrid from '@/components/shop/ShopClientGrid';

export async function generateMetadata({ params }: { params: { categoria: string } }) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.categoria);
  const catName = category ? category.name : params.categoria;

  return {
    title: `${catName} — Tienda RufPixel Panamá`,
    description: `Explora nuestros productos e impresos de la categoría ${catName} en RufPixel Panamá.`,
  };
}

export default async function CategoriaTiendaPage({ params }: { params: { categoria: string } }) {
  const [{ products }, categories] = await Promise.all([
    getProducts('todos', 1, 100),
    getCategories(),
  ]);

  const activeCat = categories.find((c) => c.slug === params.categoria);
  const catName = activeCat ? activeCat.name : params.categoria.replace(/-/g, ' ');

  return (
    <div className="py-10 space-y-8">
      {/* Category Header */}
      <section className="bg-[#0D0D0D] text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            Categoría Especializada
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold capitalize font-outfit">
            {catName}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm">
            Filtros instantáneos entre categorías con catálogo de productos RufPixel.
          </p>
        </div>
      </section>

      {/* Main Container with Instant Shop Client Grid Wrapped in Suspense */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="py-24 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-[#FF5E14] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-gray-500 font-outfit">Cargando categoría RufPixel...</p>
          </div>
        }>
          <ShopClientGrid
            initialProducts={products}
            categories={categories}
            activeCategorySlug={params.categoria}
          />
        </Suspense>
      </div>
    </div>
  );
}
