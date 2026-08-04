import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/shop/ProductCard';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: { categoria: string } }) {
  return {
    title: `Productos de ${params.categoria} — RufPixel Tienda`,
    description: `Catálogo de productos impresos en la categoría ${params.categoria}.`,
  };
}

export default async function TiendaCategoriaPage({ params }: { params: { categoria: string } }) {
  const products = await getProducts(params.categoria);

  const categories = [
    { slug: 'todos', label: 'Todos los Productos' },
    { slug: 'tarjetas', label: 'Tarjetas de Presentación' },
    { slug: 'gran-formato', label: 'Gran Formato & Banners' },
    { slug: 'flyers', label: 'Flyers & Folletos' },
    { slug: 'stickers', label: 'Stickers & Etiquetas' },
    { slug: 'promocional', label: 'Promocional & POP' },
  ];

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <Link href="/tienda" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo completo</span>
        </Link>
      </div>

      {/* Category Pill Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-gray-200">
        {categories.map((cat) => {
          const active = cat.slug === params.categoria;
          return (
            <Link
              key={cat.slug}
              href={cat.slug === 'todos' ? '/tienda' : `/tienda/${cat.slug}`}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 font-outfit capitalize">
        Categoría: {params.categoria.replace('-', ' ')}
      </h1>

      {products.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-gray-200 space-y-4">
          <p className="text-gray-500">No hay productos disponibles en esta categoría por el momento.</p>
          <Link href="/tienda" className="inline-block bg-[#FF5E14] text-white px-6 py-2.5 rounded-xl font-bold text-xs">
            Ver Todos los Productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
