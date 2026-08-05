'use client';

import React, { useState, useEffect } from 'react';
import { Product, ProductVariation } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Layers, Tag, Info } from 'lucide-react';
import Link from 'next/link';
import { ProductSchema } from '@/components/seo/SchemaOrg';
import { getCachedProduct } from '@/lib/productCache';

export default function ProductDetailClient({ 
  product: initialProduct,
  slug
}: { 
  product?: Product;
  slug?: string;
}) {
  const { addToCart } = useCart();

  // Instant lookup from client memory cache if user clicked card in shop
  const cached = slug ? getCachedProduct(slug) : undefined;
  const product = cached || initialProduct;

  // Initial attribute selections
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product) {
      product.attributes.forEach((attr) => {
        if (attr.options.length > 0) {
          initial[attr.name] = attr.options[0];
        }
      });
      // Default to 50 units wholesale pack if present, or first option
      const qtyAttr = product.attributes.find((a) => a.name.toLowerCase() === 'cantidad');
      if (qtyAttr && qtyAttr.options.includes('50')) {
        initial[qtyAttr.name] = '50';
      }
    }
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    if (product?.image && !selectedImage) {
      setSelectedImage(product.image);
    }
  }, [product, selectedImage]);

  if (!product) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 font-outfit">Cargando producto...</h2>
        <p className="text-gray-500 text-sm">Obteniendo detalles de la BDD RufPixel...</p>
      </div>
    );
  }

  // Selected quantity option (e.g., '1', '50', '100', '250')
  const selectedQtyOption = selectedAttributes['Cantidad'] || Object.values(selectedAttributes)[0] || '50';
  const isSingleUnit = selectedQtyOption === '1' || selectedQtyOption.toLowerCase().includes('1 unidad') || selectedQtyOption.toLowerCase().includes('muestra');

  // Find matching child variation for bulk pack
  const getSelectedVariation = (): ProductVariation | undefined => {
    if (!product.childVariations || product.childVariations.length === 0) return undefined;
    const match = product.childVariations.find(v => v.quantityOption === selectedQtyOption || v.name.includes(selectedQtyOption));
    return match || product.childVariations[0];
  };

  const selectedVariation = getSelectedVariation();
  
  // Calculate base wholesale pack price and base unit price
  const defaultPackQty = 50;
  const basePackPrice = selectedVariation ? selectedVariation.price : product.price;
  const baseQtyNum = parseInt(selectedQtyOption, 10) || defaultPackQty;
  
  // Base unit price without surcharge (from 50 uds pack)
  const baseUnitPriceFrom50 = product.price / defaultPackQty;

  // Single unit price with +35% surcharge
  const singleUnitPriceWith35 = baseUnitPriceFrom50 * 1.35;

  // Current Total Price for calculation
  const currentTotalPrice = isSingleUnit
    ? singleUnitPriceWith35 * quantity
    : basePackPrice * quantity;

  // Displayed unit price
  const displayUnitPrice = isSingleUnit ? singleUnitPriceWith35 : (basePackPrice / baseQtyNum);

  const handleAttributeChange = (attrName: string, option: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrName]: option }));
  };

  const handleAddToCart = () => {
    const productToCart = {
      ...product,
      price: isSingleUnit ? singleUnitPriceWith35 : basePackPrice,
      image: selectedImage || product.image,
    };
    addToCart(productToCart, quantity, selectedAttributes);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 4000);
  };

  // Quantity options available including Single Unit (1 Unidad Muestra)
  const rawQtyAttr = product.attributes.find((a) => a.name.toLowerCase() === 'cantidad');
  const qtyOptions = ['1', ...(rawQtyAttr?.options.filter((o) => o !== '1') || ['50', '100', '250'])];

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
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
              src={selectedImage || product.image} 
              alt={product.name} 
              className="w-full h-full object-contain p-2" 
            />
            <span className="absolute top-4 right-4 bg-[#FF5E14] text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5">
              <Layers className="w-4 h-4" />
              <span>{isSingleUnit ? '1 Unidad (Muestra)' : `Pack x ${baseQtyNum} Unidades`}</span>
            </span>
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
                <span className="text-xs uppercase font-bold text-gray-400">
                  {isSingleUnit ? 'Precio Unidad Individual (+35%):' : 'Precio Unitario al por Mayor:'}
                </span>
                <span className="text-3xl font-extrabold text-[#FF5E14] font-outfit">
                  ${displayUnitPrice.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-gray-600">/ ud</span>
              </div>
              
              {!isSingleUnit && baseQtyNum > 1 && (
                <div className="text-xs text-gray-500 font-medium flex items-center space-x-2 pt-1 border-t border-gray-200/60 mt-2">
                  <Tag className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>Total Paquete Mayorista de <strong>{baseQtyNum} uds</strong>: <strong>${(basePackPrice * quantity).toFixed(2)} USD</strong></span>
                </div>
              )}

              {isSingleUnit && (
                <div className="text-xs text-gray-600 font-medium flex items-center space-x-2 pt-1 border-t border-gray-200/60 mt-2">
                  <Tag className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>Total Pedido Individual (1 ud): <strong>${(singleUnitPriceWith35 * quantity).toFixed(2)} USD</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Wholesale Specialty Disclaimer Box */}
          <div className="bg-[#0D0D0D] text-white p-4.5 rounded-2xl border border-gray-800 space-y-2 text-xs shadow-md">
            <div className="flex items-center space-x-2 text-[#FF5E14] font-extrabold">
              <Info className="w-4 h-4 shrink-0" />
              <span>Tienda Especializada al Por Mayor</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Nuestra tienda está especializada en volumen al por mayor. Sin embargo, te ofrecemos la opción de comprar <strong>1 unidad individual (muestra / detal)</strong> agregando un <strong>35% adicional</strong> al costo unitario.
            </p>
          </div>

          <div
            className="text-gray-600 text-sm leading-relaxed border-t border-b border-gray-200 py-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Quantity Selector Option Buttons */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-extrabold text-gray-700 tracking-wider block">
              Seleccionar Cantidad / Modalidad: <span className="text-[#FF5E14] font-bold">{selectedQtyOption === '1' ? '1 Unidad (Muestra / Detal +35%)' : `${selectedQtyOption} unidades (Por Mayor)`}</span>
            </label>

            <div className="flex flex-wrap gap-2.5">
              {qtyOptions.map((opt) => {
                const isSelected = selectedQtyOption === opt;
                const isSingle = opt === '1';

                if (isSingle) {
                  return (
                    <button
                      key="1-unit"
                      onClick={() => handleAttributeChange('Cantidad', '1')}
                      className={`px-4 py-3 rounded-xl text-xs transition-all border text-left ${
                        isSelected
                          ? 'bg-[#FF5E14] text-white border-[#FF5E14] shadow-md shadow-[#FF5E14]/25 scale-105 font-extrabold'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF5E14]'
                      }`}
                    >
                      <div className="font-bold">1 Unidad (Muestra)</div>
                      <div className={isSelected ? 'text-white/90 text-[11px]' : 'text-[#FF5E14] text-[11px] font-bold'}>
                        ${singleUnitPriceWith35.toFixed(2)}/ud (+35%)
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
                    className={`px-4 py-3 rounded-xl text-xs transition-all border text-left ${
                      isSelected
                        ? 'bg-[#FF5E14] text-white border-[#FF5E14] shadow-md shadow-[#FF5E14]/25 scale-105 font-extrabold'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF5E14]'
                    }`}
                  >
                    <div className="font-bold">{opt} unidades (Mayorista)</div>
                    <div className={isSelected ? 'text-white/90 text-[11px]' : 'text-gray-500 text-[11px]'}>
                      ${optUnit.toFixed(2)}/ud (${optTotal.toFixed(2)})
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Other Attributes Selectors (Color, etc.) */}
          {product.attributes
            .filter((a) => a.name.toLowerCase() !== 'cantidad')
            .map((attr) => (
              <div key={attr.name} className="space-y-2">
                <label className="text-xs uppercase font-extrabold text-gray-700 tracking-wider block">
                  Seleccionar {attr.name}: <span className="text-[#FF5E14] font-bold">{selectedAttributes[attr.name]}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {attr.options.map((opt) => {
                    const isSelected = selectedAttributes[attr.name] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleAttributeChange(attr.name, opt)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

          {/* Quantity Counter & Add to Cart */}
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
