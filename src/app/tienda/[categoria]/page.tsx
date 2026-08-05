import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductCard from '@/components/shop/ProductCard';
import { ChevronLeft, ChevronRight, Grid, ArrowLeft } from 'lucide-react';

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
    <div className="py-12 space-y-10">
      {/* Category Banner */}
      <section className="bg-[#0D0D0D] text-white py-14 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Link href="/tienda" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la Tienda Principal</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit capitalize">
            {categoryTitle}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Mostrando {products.length} de {totalProducts} productos en la categoría <span className="text-[#FF5E14] font-bold">{categoryTitle}</span>.
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
              className="px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-[#FF5E14]"
            >
              Todos los Productos
            </Link>
            {categories.map((cat) => {
              const isActive = cat.slug === params.categoria;
              return (
                <Link
                  key={cat.slug}
                  href={`/tienda/${cat.slug}`}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-[#FF5E14]'
                  }`}
                >
                  {cat.name} <span className={isActive ? 'text-white/80 text-[10px]' : 'text-gray-400 text-[10px]'}>({cat.count})</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
          <div className="flex items-center justify-center space-x-2 pt-8 border-t border-gray-200">
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

      </div>
    </div>
  );
}
