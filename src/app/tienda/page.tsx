import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/shop/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Tienda de Impresión Corporativa — RufPixel Panamá',
  description: 'Catálogo de productos impresos: Tarjetas de presentación, Banners Roll-up, Volantes, Stickers troquelados y Carpetas corporativas.',
};

export default async function TiendaPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = parseInt(searchParams?.page || '1', 10);
  const { products, totalPages, totalProducts } = await getProducts('todos', page, 15);

  const categories = [
    { slug: 'todos', label: 'Todos los Productos' },
    { slug: 'tarjetas', label: 'Tarjetas de Presentación' },
    { slug: 'gran-formato', label: 'Gran Formato & Banners' },
    { slug: 'flyers', label: 'Flyers & Folletos' },
    { slug: 'stickers', label: 'Stickers & Etiquetas' },
    { slug: 'promocional', label: 'Promocional & POP' },
  ];

  return (
    <div className="py-12 space-y-10">
      {/* Catalog Header */}
      <section className="bg-[#0D0D0D] text-white py-14 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            WooCommerce Catalog (15 por página)
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit">
            Tienda & Productos Impresos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Mostrando {products.length} de {totalProducts} productos disponibles en nuestro catálogo.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Pill Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none border-b border-gray-200">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === 'todos' ? '/tienda' : `/tienda/${cat.slug}`}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                cat.slug === 'todos'
                  ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </Link>
          ))}
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
