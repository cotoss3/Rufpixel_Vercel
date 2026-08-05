import React from 'react';
import { getProducts, getCategories } from '@/lib/woocommerce';
import ShopClientGrid from '@/components/shop/ShopClientGrid';

export const metadata = {
  title: 'Tienda de Impresión Corporativa & Promocionales — RufPixel Panamá',
  description: 'Catálogo de productos e impresos corporativos: Llaveros, Tazas, Botellas, Bolígrafos, Gorras, Mochilas y Sets Ejecutivos.',
};

export default async function TiendaPage() {
  // Fetch full catalog (100 items) for instant 0ms client-side category filtering
  const [{ products, totalProducts }, categories] = await Promise.all([
    getProducts('todos', 1, 100),
    getCategories(),
  ]);

  return (
    <div className="py-10 space-y-8">
      {/* Catalog Header in Jet Black (#0D0D0D) & RufPixel Orange (#FF5E14) */}
      <section className="bg-[#0D0D0D] text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            Catálogo RufPixel (En Vivo)
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit">
            Tienda & Catálogo de Productos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm">
            Explora {totalProducts} modelos disponibles con filtros instantáneos por categoría.
          </p>
        </div>
      </section>

      {/* Main Container with Instant Shop Client Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShopClientGrid initialProducts={products} categories={categories} activeCategorySlug="todos" />
      </div>
    </div>
  );
}
