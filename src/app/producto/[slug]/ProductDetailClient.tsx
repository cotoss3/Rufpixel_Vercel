'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, CheckCircle2, ShieldCheck, Truck, Clock, ArrowRight } from 'lucide-react';
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

  const handleAttributeChange = (attrName: string, option: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrName]: option }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedAttributes);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 4000);
  };

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProductSchema product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white h-96 sm:h-[450px] relative shadow-md">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {product.gallery && product.gallery.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? 'border-[#FF5E14]' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
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
            <div className="mt-3 flex items-baseline space-x-3">
              <span className="text-3xl font-extrabold text-[#FF5E14] font-outfit">
                ${product.price.toFixed(2)} <span className="text-sm font-normal text-gray-500">USD</span>
              </span>
              {product.regularPrice && product.regularPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.regularPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed border-t border-b border-gray-200 py-4">
            {product.description}
          </p>

          {/* Attributes Selectors */}
          {product.attributes.map((attr) => (
            <div key={attr.name} className="space-y-2">
              <label className="text-xs uppercase font-bold text-gray-700 tracking-wider">
                {attr.name}: <span className="text-[#FF5E14]">{selectedAttributes[attr.name]}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {attr.options.map((opt) => {
                  const isSelected = selectedAttributes[attr.name] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleAttributeChange(attr.name, opt)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-[#FF5E14] text-white border-[#FF5E14] shadow-md shadow-[#FF5E14]/20'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF5E14]'
                      }`}
                    >
                      {opt}
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

            {/* Notification message */}
            {addedMessage && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-medium flex items-center justify-between animate-fade-in">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>¡Producto agregado al carrito exitosamente!</span>
                </div>
                <Link href="/carrito" className="font-bold underline text-emerald-900 flex items-center space-x-1">
                  <span>Ir al Carrito</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Yappy payment notice */}
          <div className="bg-gray-900 text-white p-5 rounded-2xl border border-gray-800 space-y-3 text-xs">
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
