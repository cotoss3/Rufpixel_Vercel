'use client';

import React, { useState } from 'react';
import { Product, ProductVariation } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { X, ShoppingBag, CheckCircle2, Clock, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

interface QuickAddModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAddModal({ product, isOpen, onClose }: QuickAddModalProps) {
  const { addToCart } = useCart();

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.attributes.forEach((attr) => {
      if (attr.options.length > 0) {
        initial[attr.name] = attr.options[0];
      }
    });
    const qtyAttr = product.attributes.find((a) => a.name.toLowerCase() === 'cantidad');
    if (qtyAttr && qtyAttr.options.includes('50')) {
      initial[qtyAttr.name] = '50';
    }
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!isOpen) return null;

  const selectedQtyOption = selectedAttributes['Cantidad'] || Object.values(selectedAttributes)[0] || '50';
  const isSingleUnit = selectedQtyOption === '1' || selectedQtyOption.toLowerCase().includes('1 unidad') || selectedQtyOption.toLowerCase().includes('muestra');

  const getSelectedVariation = (): ProductVariation | undefined => {
    if (!product.childVariations || product.childVariations.length === 0) return undefined;
    const match = product.childVariations.find(v => v.quantityOption === selectedQtyOption || v.name.includes(selectedQtyOption));
    return match || product.childVariations[0];
  };

  const selectedVariation = getSelectedVariation();

  const defaultPackQty = 50;
  const basePackPrice = selectedVariation ? selectedVariation.price : product.price;
  const baseQtyNum = parseInt(selectedQtyOption, 10) || defaultPackQty;
  
  const baseUnitPriceFrom50 = product.price / defaultPackQty;
  const singleUnitPriceWith35 = baseUnitPriceFrom50 * 1.35;

  const displayUnitPrice = isSingleUnit ? singleUnitPriceWith35 : (basePackPrice / baseQtyNum);

  const handleAttributeChange = (attrName: string, option: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrName]: option }));
  };

  const handleAddToCart = () => {
    const productToCart = {
      ...product,
      price: isSingleUnit ? singleUnitPriceWith35 : basePackPrice,
    };
    addToCart(productToCart, quantity, selectedAttributes);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1800);
  };

  const rawQtyAttr = product.attributes.find((a) => a.name.toLowerCase() === 'cantidad');
  const qtyOptions = ['1', ...(rawQtyAttr?.options.filter((o) => o !== '1') || ['50', '100', '250'])];

  return (
    <div className="fixed inset-[#0000] z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Header Info */}
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 p-2 shrink-0 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>

          <div className="space-y-1 pr-6">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF5E14] bg-[#FF5E14]/10 px-2 py-0.5 rounded-md">
              {product.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 font-outfit line-clamp-2 leading-tight">
              {product.name}
            </h3>

            {/* Per-Unit Pricing Breakdown */}
            <div className="flex items-baseline space-x-1.5 pt-1">
              <span className="text-xl font-extrabold text-[#FF5E14] font-outfit">
                ${displayUnitPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-gray-500">/ ud</span>

              {!isSingleUnit && baseQtyNum > 1 && (
                <span className="text-xs text-gray-400 font-medium ml-2">
                  (Pack x {baseQtyNum}: ${(basePackPrice * quantity).toFixed(2)})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Company Benefit Bullet Points (Replaces wholesale disclaimer) */}
        <div className="bg-[#0D0D0D] text-white p-4 rounded-2xl border border-gray-800 space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-[#FF5E14] font-extrabold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Beneficios RufPixel</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-gray-300 text-[11px]">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
              <span>Entrega en 24 a 48h</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
              <span>Calidad HD Impresa</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
              <span>Pagos Vía Yappy</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Truck className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
              <span>Muestras y Volumen</span>
            </div>
          </div>
        </div>

        {/* Quantity Modal Options */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-extrabold text-gray-700 tracking-wider block">
            Seleccionar Cantidad:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {qtyOptions.map((opt) => {
              const isSelected = selectedQtyOption === opt;
              const isSingle = opt === '1';

              if (isSingle) {
                return (
                  <button
                    key="1-unit"
                    onClick={() => handleAttributeChange('Cantidad', '1')}
                    className={`p-3 rounded-xl text-xs transition-all border text-left ${
                      isSelected
                        ? 'bg-[#FF5E14] text-white border-[#FF5E14] shadow-md font-extrabold'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF5E14]'
                    }`}
                  >
                    <div className="font-bold">1 Unidad (Muestra)</div>
                    <div className={isSelected ? 'text-white/90 text-[11px]' : 'text-[#FF5E14] text-[11px] font-bold'}>
                      ${singleUnitPriceWith35.toFixed(2)}/ud
                    </div>
                  </button>
                );
              }

              const optQty = parseInt(opt, 10) || 50;
              const optVar = product.childVariations?.find(v => v.quantityOption === opt || v.name.includes(opt));
              const optTotal = optVar ? optVar.price : product.price;
              const optUnit = optTotal / optQty;

              return (
                <button
                  key={opt}
                  onClick={() => handleAttributeChange('Cantidad', opt)}
                  className={`p-3 rounded-xl text-xs transition-all border text-left ${
                    isSelected
                      ? 'bg-[#FF5E14] text-white border-[#FF5E14] shadow-md font-extrabold'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF5E14]'
                  }`}
                >
                  <div className="font-bold">{opt} unidades</div>
                  <div className={isSelected ? 'text-white/90 text-[11px]' : 'text-gray-500 text-[11px]'}>
                    ${optUnit.toFixed(2)}/ud (${optTotal.toFixed(2)})
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add to Cart Actions */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
              >
                -
              </button>
              <span className="px-3 py-2 text-sm font-bold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-grow bg-[#FF5E14] hover:bg-[#E04700] text-white py-3.5 px-4 rounded-xl font-bold text-xs shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Agregar al Carrito</span>
            </button>
          </div>

          {addedMessage && (
            <div className="bg-[#0D0D0D] text-white p-3 rounded-xl text-xs font-medium flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5E14]" />
                <span>¡Agregado al carrito!</span>
              </div>
              <Link href="/carrito" className="font-bold text-[#FF5E14] hover:underline text-[11px]">
                Ver Carrito
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
