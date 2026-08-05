'use client';

import React, { useState, useEffect } from 'react';
import { Product, ProductVariation } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Layers, Tag } from 'lucide-react';
import Link from 'next/link';
import { ProductSchema } from '@/components/seo/SchemaOrg';

export default function ProductDetailClient({ product }: { product: Product }) {
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
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [addedMessage, setAddedMessage] = useState(false);

  // Find matching child variation based on selected quantity (e.g. Cantidad: 50, 100, 250)
  const getSelectedVariation = (): ProductVariation | undefined => {
    if (!product.childVariations || product.childVariations.length === 0) return undefined;
    
    const selectedQty = selectedAttributes['Cantidad'] || Object.values(selectedAttributes)[0];
    if (selectedQty) {
      const match = product.childVariations.find(v => v.quantityOption === selectedQty || v.name.includes(selectedQty));
      if (match) return match;
    }
    return product.childVariations[0];
  };

  const selectedVariation = getSelectedVariation();
  const currentTotalPrice = selectedVariation ? selectedVariation.price : product.price;

  // Calculate per-unit price
  const selectedQtyStr = selectedAttributes['Cantidad'] || Object.values(selectedAttributes)[0] || '50';
  const selectedQtyNum = parseInt(selectedQtyStr, 10) || (currentTotalPrice > 30 ? 50 : 1);
  const unitPrice = currentTotalPrice / selectedQtyNum;

  useEffect(() => {
    if (selectedVariation?.image) {
      setSelectedImage(selectedVariation.image);
    }
  }, [selectedVariation]);

  const handleAttributeChange = (attrName: string, option: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrName]: option }));
  };

  const handleAddToCart = () => {
    const productToCart = {
      ...product,
      price: currentTotalPrice,
      image: selectedImage,
    };
    addToCart(productToCart, quantity, selectedAttributes);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 4000);
  };

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProductSchema product={product} />

      <div>
        <Link href="/tienda" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la tienda</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: PDP Image Gallery (Square 1:1 with ~30px padding and object-contain to prevent cropping) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square p-8 relative shadow-md flex items-center justify-center">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-contain p-2" 
            />
            {selectedQtyNum > 1 && (
              <span className="absolute top-4 right-4 bg-[#FF5E14] text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5">
                <Layers className="w-4 h-4" />
                <span>Pack x {selectedQtyNum} Unidades</span>
              </span>
            )}
          </div>

          {product.gallery && product.gallery.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-gray-50 p-2 flex items-center justify-center transition-all shrink-0 ${
                    selectedImage === img ? 'border-[#FF5E14]' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Options */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit mt-2">
              {product.name}
            </h1>

            {/* Price Display with Unit Price Prominent */}
            <div className="mt-4 bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-xs uppercase font-bold text-gray-400">Precio Unitario:</span>
                <span className="text-3xl font-extrabold text-[#FF5E14] font-outfit">
                  ${unitPrice.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-gray-600">/ ud</span>
              </div>
              {selectedQtyNum > 1 && (
                <div className="text-xs text-gray-500 font-medium flex items-center space-x-2 pt-1 border-t border-gray-200/60 mt-2">
                  <Tag className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>Total Paquete de <strong>{selectedQtyNum} uds</strong>: <strong>${currentTotalPrice.toFixed(2)} USD</strong></span>
                </div>
              )}
            </div>
          </div>

          <div
            className="text-gray-600 text-sm leading-relaxed border-t border-b border-gray-200 py-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Attributes Selectors (Cantidad, Color, etc.) with Per-Unit Breakdown */}
          {product.attributes.map((attr) => (
            <div key={attr.name} className="space-y-2">
              <label className="text-xs uppercase font-extrabold text-gray-700 tracking-wider block">
                Seleccionar {attr.name}: <span className="text-[#FF5E14] font-bold">{selectedAttributes[attr.name]}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
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
                      className={`px-5 py-3 rounded-xl text-xs transition-all border text-left ${
                        isSelected
                          ? 'bg-[#FF5E14] text-white border-[#FF5E14] shadow-md shadow-[#FF5E14]/25 scale-105 font-extrabold'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF5E14]'
                      }`}
                    >
                      <div className="font-bold">{opt} unidades</div>
                      {attr.name.toLowerCase() === 'cantidad' && (
                        <div className={isSelected ? 'text-white/90 text-[11px]' : 'text-gray-500 text-[11px]'}>
                          ${optUnit.toFixed(2)}/ud (${optTotal.toFixed(2)})
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-grow bg-[#FF5E14] hover:bg-[#E04700] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Agregar al Carrito</span>
              </button>
            </div>

            {/* RufPixel Branded Notification Badge */}
            {addedMessage && (
              <div className="bg-[#0D0D0D] border border-[#FF5E14]/40 text-white p-4 rounded-xl text-xs font-medium flex items-center justify-between animate-fade-in shadow-xl">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF5E14] shrink-0" />
                  <span>¡Producto agregado al carrito exitosamente!</span>
                </div>
                <Link href="/carrito" className="font-bold text-[#FF5E14] hover:underline flex items-center space-x-1">
                  <span>Ir al Carrito</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Yappy payment notice in Jet Black (#0D0D0D) with RufPixel Orange (#FF5E14) accents */}
          <div className="bg-[#0D0D0D] text-white p-5 rounded-2xl border border-gray-800 space-y-3 text-xs shadow-lg">
            <div className="flex items-center space-x-2 text-[#FF5E14] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Pago Exclusivo vía Yappy Panamá</span>
            </div>
            <p className="text-gray-300">
              Al finalizar el checkout recibirás las instrucciones para realizar tu pago por Yappy y adjuntar tu comprobante de transacción.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
