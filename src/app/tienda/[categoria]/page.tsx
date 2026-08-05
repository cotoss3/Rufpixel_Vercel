import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductCard from '@/components/shop/ProductCard';
import { ChevronLeft, ChevronRight, Grid, Filter, Check, ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: { categoria: string } }) {
  const categories = await getCategories();
  const catObj = categories.find((c) => c.slug === params.categoria);
  const title = catObj ? `${catObj.name} — RufPixel Panamá` : 'Categoría de Productos — RufPixel Panamá';
  return {
    title,
    description: `Explora nuestros productos de ${catObj?.name || params.categoria} personalizados en Panamá.`,
  };
}

export default async function TiendaCategoriaPage({
  params,
  searchParams,
}: {
  params: { categoria: string };
  searchParams?: { page?: string };
}) {
  const page = parseInt(searchParams?.page || '1', 10);

  const [{ products, totalPages, totalProducts }, categories] = await Promise.all([
    getProducts(params.categoria, page, 15),
    getCategories(),
  ]);

  const currentCat = categories.find((c) => c.slug === params.categoria);
  const categoryTitle = currentCat ? currentCat.name : params.categoria;

  return (
    <div className="py-10 space-y-8">
      {/* Category Banner */}
      <section className="bg-[#0D0D0D] text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Link href="/tienda" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la Tienda Principal</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit capitalize">
            {categoryTitle}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm">
            Mostrando {products.length} de {totalProducts} productos en la categoría <span className="text-[#FF5E14] font-bold">{categoryTitle}</span>.
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
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-gray-700 hover:bg-gray-100 hover:text-[#FF5E14] transition-all border border-transparent hover:border-gray-200 group"
              >
                <div className="flex items-center space-x-2">
                  <Grid className="w-4 h-4 text-gray-400 group-hover:text-[#FF5E14]" />
                  <span>Todos los Productos</span>
                </div>
              </Link>

              {categories.map((cat) => {
                const isActive = cat.slug === params.categoria;
                return (
                  <Link
                    key={cat.slug}
                    href={`/tienda/${cat.slug}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all ${
                      isActive
                        ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-[#FF5E14] border border-transparent hover:border-gray-200 group'
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 group-hover:bg-[#FF5E14]/10 text-gray-500 group-hover:text-[#FF5E14]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Right Area: Product Grid + Pagination */}
          <main className="flex-1 w-full space-y-8">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-4">
                <p className="text-gray-600 font-medium text-base">
                  No se encontraron productos disponibles en la categoría <strong className="text-gray-900">{categoryTitle}</strong>.
                </p>
                <Link
                  href="/tienda"
                  className="inline-block bg-[#FF5E14] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-[#FF5E14]/30 hover:bg-[#E04700] transition-colors"
                >
                  Ver Todos los Productos
                </Link>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6 border-t border-gray-200">
                {page > 1 && (
                  <Link
                    href={`/tienda/${params.categoria}?page=${page - 1}`}
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
                      href={`/tienda/${params.categoria}?page=${pNum}`}
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
                    href={`/tienda/${params.categoria}?page=${page + 1}`}
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
