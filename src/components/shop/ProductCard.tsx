import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group flex flex-col justify-between">
      <div>
        {/* Square container with 30px padding and object-contain to prevent cropping */}
        <div className="relative aspect-square bg-gray-50 p-7 flex items-center justify-center overflow-hidden border-b border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-[#0D0D0D] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider z-10">
            {product.category}
          </span>
          {product.regularPrice && product.regularPrice > product.price && (
            <span className="absolute top-3 right-3 bg-[#FF5E14] text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
              Oferta
            </span>
          )}
        </div>
        <div className="p-5 space-y-2">
          <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-[#FF5E14] transition-colors font-outfit">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto">
        <div>
          <span className="text-[11px] text-gray-400 block">Precio:</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-extrabold text-gray-900 font-outfit">
              ${product.price.toFixed(2)}
            </span>
            {product.regularPrice && product.regularPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ${product.regularPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <Link
          href={`/producto/${product.slug}`}
          className="p-3 bg-[#FF5E14] text-white rounded-xl hover:bg-[#E04700] transition-colors shadow-md shadow-[#FF5E14]/20 flex items-center space-x-1"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-bold px-1">Ver</span>
        </Link>
      </div>
    </div>
  );
}
