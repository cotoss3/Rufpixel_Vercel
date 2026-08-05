'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ShoppingBag, Layers, Loader2 } from 'lucide-react';
import QuickAddModal from './QuickAddModal';

export default function ProductCard({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCardClick = () => {
    setIsNavigating(true);
  };

  // Determine base quantity
  const qtyAttr = product.attributes.find((a) => a.name.toLowerCase() === 'cantidad');
  const baseQtyStr = qtyAttr?.options?.[0] || '50';
  const baseQty = parseInt(baseQtyStr, 10) || (product.price > 30 ? 50 : 1);
  const unitPrice = product.price / baseQty;

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group flex flex-col justify-between relative">
        {/* Instant Spinner Overlay on Card Click */}
        {isNavigating && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-30 flex flex-col items-center justify-center space-y-2 animate-fade-in">
            <Loader2 className="w-8 h-8 text-[#FF5E14] animate-spin" />
            <span className="text-xs font-bold text-gray-900 font-outfit">Abriendo producto...</span>
          </div>
        )}

        {/* Tapping photo or card body enters the product page */}
        <Link
          href={`/producto/${product.slug}`}
          prefetch={true}
          onClick={handleCardClick}
          className="block flex-1"
        >
          {/* Square container with ~30px padding and object-contain */}
          <div className="relative aspect-square bg-gray-50 p-7 flex items-center justify-center overflow-hidden border-b border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-[#0D0D0D] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider z-10">
              {product.category}
            </span>
            
            {/* Pack Quantity Badge */}
            {baseQty > 1 && (
              <span className="absolute top-3 right-3 bg-[#FF5E14] text-white text-[10px] font-extrabold px-2 py-1 rounded-md z-10 flex items-center space-x-1 shadow-sm">
                <Layers className="w-3 h-3" />
                <span>Pack x {baseQty} uds</span>
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
        </Link>

        {/* Card Footer displaying Unit Price */}
        <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
              {baseQty > 1 ? 'Precio Unitario:' : 'Precio:'}
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl font-extrabold text-[#FF5E14] font-outfit">
                ${unitPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-gray-500">/ ud</span>
            </div>
            {baseQty > 1 && (
              <span className="text-[11px] text-gray-400 font-medium block mt-0.5">
                (${product.price.toFixed(2)} pack de {baseQty} uds)
              </span>
            )}
          </div>

          {/* Clicking Orange Button opens Quick Add Pop-Up Modal */}
          <button
            onClick={handleOpenModal}
            className="p-3 bg-[#FF5E14] text-white rounded-xl hover:bg-[#E04700] transition-colors shadow-md shadow-[#FF5E14]/20 flex items-center space-x-1 font-bold text-xs shrink-0"
            title="Agregar rápido al carrito"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="px-1">Cotizar</span>
          </button>
        </div>
      </div>

      {/* Quick Add Pop-Up Modal */}
      <QuickAddModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
