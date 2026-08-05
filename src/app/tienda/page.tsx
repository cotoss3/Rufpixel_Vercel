import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductCard from '@/components/shop/ProductCard';
import { ChevronLeft, ChevronRight, Grid } from 'lucide-react';

export const metadata = {
  title: 'Tienda de Impresión Corporativa & Promocionales — RufPixel Panamá',
  description: 'Catálogo de productos e impresos corporativos: Llaveros, Tazas, Botellas, Bolígrafos, Gorras, Mochilas y Sets Ejecutivos.',
};

export default async function TiendaPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = parseInt(searchParams?.page || '1', 10);
  
  // Fetch real live products and real live categories
  const [{ products, totalPages, totalProducts }, categories] = await Promise.all([
    getProducts('todos', page, 15),
    getCategories(),
  ]);

  return (
    <div className="py-12 space-y-10">
      {/* Catalog Header in Jet Black (#0D0D0D) & RufPixel Orange (#FF5E14) */}
      <section className="bg-[#0D0D0D] text-white py-14 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            Catálogo RufPixel (En Vivo)
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit">
            Tienda & Productos Promocionales
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Mostrando {products.length} de {totalProducts} modelos disponibles en nuestro catálogo.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Real Live Categories Filter Bar */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Grid className="w-4 h-4 text-[#FF5E14]" />
            <span>Categorías del Catálogo:</span>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none border-b border-gray-200">
            <Link
              href="/tienda"
              className="px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30"
            >
              Todos los Productos
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tienda/${cat.slug}`}
                className="px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-[#FF5E14]"
              >
                {cat.name} <span className="text-gray-400 text-[10px]">({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination Controls (15 items per page) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 pt-8 border-t border-gray-200">
            {page > 1 && (
              <Link
                href={`/tienda?page=${page - 1}`}
                className="p-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 font-bold text-xs flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </Link>
            )}

            {[...Array(totalPages)].map((_, i) => {
              const pNum = i + 1;
              const isCurrent = pNum === page;
              return (
                <Link
                  key={pNum}
                  href={`/tienda?page=${pNum}`}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all ${
                    isCurrent
                      ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pNum}
                </Link>
              );
            })}

            {page < totalPages && (
              <Link
                href={`/tienda?page=${page + 1}`}
                className="p-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 font-bold text-xs flex items-center space-x-1"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
