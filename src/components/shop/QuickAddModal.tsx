'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { X, ShoppingBag, CheckCircle2 } from 'lucide-react';

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
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!isOpen) return null;

  // Calculate matching price based on variation
  const getSelectedVariation = () => {
    if (!product.childVariations || product.childVariations.length === 0) return undefined;
    const selectedQty = selectedAttributes['Cantidad'] || Object.values(selectedAttributes)[0];
    if (selectedQty) {
      return product.childVariations.find(v => v.quantityOption === selectedQty || v.name.includes(selectedQty));
    }
    return product.childVariations[0];
  };

  const selectedVariation = getSelectedVariation();
  const currentTotalPrice = selectedVariation ? selectedVariation.price : product.price;

  const selectedQtyStr = selectedAttributes['Cantidad'] || Object.values(selectedAttributes)[0] || '50';
  const selectedQtyNum = parseInt(selectedQtyStr, 10) || (currentTotalPrice > 30 ? 50 : 1);
  const unitPrice = currentTotalPrice / selectedQtyNum;

  const handleAttributeChange = (attrName: string, option: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrName]: option }));
  };

  const handleAddToCart = () => {
    const productToCart = {
      ...product,
      price: currentTotalPrice,
    };
    addToCart(productToCart, quantity, selectedAttributes);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 relative animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Image */}
        <div className="p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          <div className="bg-gray-50 rounded-2xl aspect-square p-6 flex items-center justify-center border border-gray-100">
            <img
              src={selectedVariation?.image || product.image}
              alt={product.name}
              className="w-full h-full object-contain p-2"
            />
          </div>

          <div>
            <span className="text-[10px] uppercase font-extrabold text-[#FF5E14] bg-[#FF5E14]/10 px-2.5 py-1 rounded-md">
              {product.category}
            </span>
            <h3 className="text-xl font-extrabold text-gray-900 font-outfit mt-1">
              {product.name}
            </h3>
            
            {/* Unit Price Highlight */}
            <div className="mt-2 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xs font-bold text-gray-400 uppercase">Precio Unitario:</span>
                <span className="text-2xl font-extrabold text-[#FF5E14] font-outfit">
                  ${unitPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-gray-600">/ ud</span>
              </div>
              {selectedQtyNum > 1 && (
                <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                  Pack de {selectedQtyNum} uds por ${currentTotalPrice.toFixed(2)} USD
                </div>
              )}
            </div>
          </div>

          {/* Attributes Selectors */}
          {product.attributes.map((attr) => (
            <div key={attr.name} className="space-y-1.5">
              <label className="text-xs uppercase font-extrabold text-gray-700 block">
                Seleccionar {attr.name}:
              </label>
              <div className="flex flex-wrap gap-2">
                {attr.options.map((opt) => {
                  const isSelected = selectedAttributes[attr.name] === opt;
                  const optQty = parseInt(opt, 10) || 50;
                  const optVar = product.childVariations?.find(v => v.quantityOption === opt || v.name.includes(opt));
                  const optTotal = optVar ? optVar.price : product.price;
                  const optUnit = optTotal / optQty;

                  return (
                    <button
                      key={opt}
                      onClick={() => handleAttributeChange(attr.name, opt)}
                      className={`px-3 py-2 rounded-xl text-xs transition-all border text-left ${
                        isSelected
                          ? 'bg-[#FF5E14] text-white border-[#FF5E14] font-extrabold'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF5E14]'
                      }`}
                    >
                      <div className="font-bold">{opt} uds</div>
                      {attr.name.toLowerCase() === 'cantidad' && (
                        <div className={isSelected ? 'text-white/90 text-[10px]' : 'text-gray-500 text-[10px]'}>
                          ${optUnit.toFixed(2)}/ud
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity Selector & Add Action */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-grow bg-[#FF5E14] hover:bg-[#E04700] text-white py-3 px-5 rounded-xl font-bold text-xs shadow-md shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Carrito</span>
              </button>
            </div>

            {addedMessage && (
              <div className="bg-[#0D0D0D] text-white p-3.5 rounded-xl text-xs font-bold flex items-center space-x-2 animate-fade-in border border-[#FF5E14]/50">
                <CheckCircle2 className="w-4 h-4 text-[#FF5E14]" />
                <span>¡Agregado al carrito! Cerrando...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
