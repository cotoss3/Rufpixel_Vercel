import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductCard from '@/components/shop/ProductCard';
import { ChevronLeft, ChevronRight, Grid, Filter, Check } from 'lucide-react';

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
            Mostrando {products.length} de {totalProducts} modelos disponibles en nuestro catálogo.
          </p>
        </div>
      </section>

      {/* Main Container with Left Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar Categories Navigation */}
          <aside className="w-full lg:w-72 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6 shrink-0 sticky top-28">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
              <Filter className="w-5 h-5 text-[#FF5E14]" />
              <h2 className="font-extrabold text-gray-900 text-base font-outfit">
                Categorías de Productos
              </h2>
            </div>

            <nav className="space-y-1.5">
              <Link
                href="/tienda"
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all bg-[#0D0D0D] text-white shadow-md"
              >
                <div className="flex items-center space-x-2">
                  <Grid className="w-4 h-4 text-[#FF5E14]" />
                  <span>Todos los Productos</span>
                </div>
                <Check className="w-4 h-4 text-[#FF5E14]" />
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/tienda/${cat.slug}`}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-gray-700 hover:bg-gray-100 hover:text-[#FF5E14] transition-all border border-transparent hover:border-gray-200 group"
                >
                  <span className="truncate pr-2">{cat.name}</span>
                  <span className="bg-gray-100 group-hover:bg-[#FF5E14]/10 text-gray-500 group-hover:text-[#FF5E14] px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Right Area: Product Grid + Pagination */}
          <main className="flex-1 w-full space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6 border-t border-gray-200">
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
          </main>

        </div>
      </div>
    </div>
  );
}
