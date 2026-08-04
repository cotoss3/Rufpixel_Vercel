import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/woocommerce';
import { ShoppingBag, Filter, ArrowRight, Tag } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';

export const metadata = {
  title: 'Tienda de Impresión Corporativa — RufPixel Panamá',
  description: 'Catálogo de productos impresos: Tarjetas de presentación, Banners Roll-up, Volantes, Stickers troquelados y Carpetas corporativas.',
};

export default async function TiendaPage() {
  const products = await getProducts();

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
            WooCommerce Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit">
            Tienda & Productos Impresos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Selecciona tu producto corporativo, elige los acabados y realiza tu pedido directo con pago seguro vía Yappy.
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

      </div>
    </div>
  );
}
