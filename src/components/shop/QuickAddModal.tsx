'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Product, ProductVariation } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { X, ShoppingBag, CheckCircle2, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { trackAddToCart, trackSelectQuantityTier, trackWhatsAppLead } from '@/lib/analytics';

interface QuickAddModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  source?: 'pdp_sticky_modal' | 'catalog_quick_modal';
}

export default function QuickAddModal({
  product,
  isOpen,
  onClose,
  source = 'catalog_quick_modal',
}: QuickAddModalProps) {
  const [mounted, setMounted] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
    } else {
      initial['Cantidad'] = '50';
    }
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!isOpen || !mounted) return null;

  const selectedQtyOption = selectedAttributes['Cantidad'] || '50';
  const isSingleUnit = false;

  const getSelectedVariation = (): ProductVariation | undefined => {
    if (!product.childVariations || product.childVariations.length === 0) return undefined;
    const match = product.childVariations.find(
      (v) => v.quantityOption === selectedQtyOption || v.name.includes(selectedQtyOption)
    );
    return match || product.childVariations[0];
  };

  const selectedVariation = getSelectedVariation();

  const defaultPackQty = 50;
  const baseQtyNum = parseInt(selectedQtyOption, 10) || defaultPackQty;
  const baseUnitPriceFrom50 = product.pricePacks?.pack50?.unit || product.price / defaultPackQty;
  const singleUnitPriceWith35 = baseUnitPriceFrom50 * 1.35;

  let basePackPrice = product.price;
  if (product.pricePacks) {
    if (baseQtyNum === 50 && product.pricePacks.pack50?.total) {
      basePackPrice = product.pricePacks.pack50.total;
    } else if (baseQtyNum === 100 && product.pricePacks.pack100?.total) {
      basePackPrice = product.pricePacks.pack100.total;
    } else if (baseQtyNum === 250 && product.pricePacks.pack250?.total) {
      basePackPrice = product.pricePacks.pack250.total;
    } else if (selectedVariation) {
      basePackPrice = selectedVariation.price;
    }
  } else if (selectedVariation) {
    basePackPrice = selectedVariation.price;
  } else if (baseQtyNum === 100) {
    basePackPrice = baseUnitPriceFrom50 * 100 * 0.95;
  } else if (baseQtyNum === 250) {
    basePackPrice = baseUnitPriceFrom50 * 250 * 0.9;
  } else if (baseQtyNum > 1 && baseQtyNum !== 50) {
    basePackPrice = baseUnitPriceFrom50 * baseQtyNum;
  }

  const displayUnitPrice = isSingleUnit ? singleUnitPriceWith35 : basePackPrice / baseQtyNum;
  const totalOrderPrice = basePackPrice * quantity;
  const totalUnits = baseQtyNum * quantity;

  const handleAttributeChange = (attrName: string, option: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrName]: option }));
    if (attrName === 'Cantidad') {
      const qNum = parseInt(option, 10) || 50;
      trackSelectQuantityTier(product, qNum, displayUnitPrice, basePackPrice);
    }
  };

  const handleAddToCartOnly = () => {
    const productToCart = {
      ...product,
      price: isSingleUnit ? singleUnitPriceWith35 : basePackPrice,
    };
    addToCart(productToCart, quantity, selectedAttributes);
    trackAddToCart(product, quantity, baseQtyNum, basePackPrice, source);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1500);
  };

  const handleBuyNow = () => {
    const productToCart = {
      ...product,
      price: isSingleUnit ? singleUnitPriceWith35 : basePackPrice,
    };
    addToCart(productToCart, quantity, selectedAttributes);
    trackAddToCart(product, quantity, baseQtyNum, basePackPrice, source);
    onClose();
    router.push('/carrito');
  };

  const qtyOptions = ['50', '100', '250'];
  const otherAttributes = product.attributes.filter((a) => {
    const n = a.name.toLowerCase();
    return (
      n !== 'cantidad' &&
      !n.includes('técnica') &&
      !n.includes('tecnica') &&
      !n.includes('personalización') &&
      !n.includes('personalizacion')
    );
  });

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/65 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-7 space-y-5 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all"
          aria-label="Cerrar selector de cantidad"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Header Info */}
        <div className="flex items-start space-x-3.5 pr-7">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 p-2 shrink-0 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF5E14] bg-[#FF5E14]/10 px-2 py-0.5 rounded-md">
              Selecciona Cantidad para Comprar
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 font-outfit line-clamp-2 leading-tight">
              {product.name}
            </h3>

            <div className="flex items-baseline space-x-1.5 pt-0.5">
              <span className="text-xl font-black text-[#FF5E14] font-outfit">
                ${displayUnitPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-gray-500">/ ud</span>
              <span className="text-xs text-gray-500 font-semibold ml-1">
                · Total ({totalUnits} uds): <strong className="text-gray-900">${totalOrderPrice.toFixed(2)}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Select Wholesale Pack Quantity (50, 100, 250) */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-extrabold text-gray-800 tracking-wider block">
            1. Elige el paquete de unidades: <span className="text-[#FF5E14]">{selectedQtyOption} unidades</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {qtyOptions.map((opt) => {
              const isSelected = selectedQtyOption === opt;
              const optQty = parseInt(opt, 10) || 50;
              let optTotal = product.price;
              let optUnit = optTotal / optQty;

              if (product.pricePacks) {
                if (optQty === 50 && product.pricePacks.pack50?.total) {
                  optTotal = product.pricePacks.pack50.total;
                  optUnit = product.pricePacks.pack50.unit || optTotal / 50;
                } else if (optQty === 100 && product.pricePacks.pack100?.total) {
                  optTotal = product.pricePacks.pack100.total;
                  optUnit = product.pricePacks.pack100.unit || optTotal / 100;
                } else if (optQty === 250 && product.pricePacks.pack250?.total) {
                  optTotal = product.pricePacks.pack250.total;
                  optUnit = product.pricePacks.pack250.unit || optTotal / 250;
                }
              } else {
                const optVar = product.childVariations?.find(
                  (v) => v.quantityOption === opt || v.name.includes(opt)
                );
                if (optVar) {
                  optTotal = optVar.price;
                  optUnit = optTotal / optQty;
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  data-ga-event="select_quantity_tier"
                  data-ga-category="Product Modal"
                  data-ga-label={`${product.name} - ${opt} uds`}
                  onClick={() => handleAttributeChange('Cantidad', opt)}
                  className={`p-3 rounded-xl text-xs transition-all border text-center ${
                    isSelected
                      ? 'bg-[#FF5E14] text-white border-[#FF5E14] shadow-md font-extrabold ring-2 ring-[#FF5E14]/30'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-[#FF5E14]'
                  }`}
                >
                  <div className="font-extrabold text-sm">{opt} uds</div>
                  <div className={isSelected ? 'text-white text-[11px] font-bold' : 'text-[#FF5E14] text-[11px] font-bold'}>
                    ${optUnit.toFixed(2)}/ud
                  </div>
                  <div className={isSelected ? 'text-white/85 text-[10px]' : 'text-gray-500 text-[10px]'}>
                    Total ${optTotal.toFixed(2)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Extra Attributes (Color, etc.) if available */}
        {otherAttributes.map((attr) => (
          <div key={attr.name} className="space-y-1.5">
            <label className="text-xs uppercase font-extrabold text-gray-800 tracking-wider block">
              Seleccionar {attr.name}: <span className="text-[#FF5E14]">{selectedAttributes[attr.name]}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {attr.options.map((opt) => {
                const isSelected = selectedAttributes[attr.name] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAttributeChange(attr.name, opt)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
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

        {/* Step 2: Number of Packs & Primary Buy Actions */}
        <div className="space-y-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
              2. Cantidad de paquetes ({baseQtyNum} uds c/u):
            </span>
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 font-extrabold text-sm"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-sm font-extrabold text-gray-900">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 font-extrabold text-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              data-ga-event="buy_now_click"
              data-ga-category="Ecommerce"
              data-ga-label={`${product.name} (${totalUnits} uds)`}
              data-ga-value={totalOrderPrice}
              onClick={handleBuyNow}
              className="w-full bg-[#FF5E14] hover:bg-[#E04700] text-white py-3.5 px-4 rounded-xl font-extrabold text-xs shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Comprar Ahora (${totalOrderPrice.toFixed(2)})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              data-ga-event="add_to_cart_click"
              data-ga-category="Ecommerce"
              data-ga-label={`${product.name} (${totalUnits} uds)`}
              data-ga-value={totalOrderPrice}
              onClick={handleAddToCartOnly}
              className="w-full bg-[#0D0D0D] hover:bg-gray-800 text-white py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#FF5E14]" />
              <span>Solo Agregar al Carrito</span>
            </button>
          </div>

          {/* Lower Quantity WhatsApp Option */}
          <a
            href={`https://wa.me/50764454084?text=${encodeURIComponent(
              `Hola RufPixel, me interesa "${product.name}" pero necesito menos de 50 unidades. ¿Me apoyan con una cotización?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppLead({
                source: 'quick_modal_custom_qty',
                productName: product.name,
                category: product.category,
                quantity: '<50 uds',
              })
            }
            className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>¿Necesitas menos de 50 unidades? Cotizar por WhatsApp</span>
          </a>

          {addedMessage && (
            <div className="bg-[#0D0D0D] text-white p-3 rounded-xl text-xs font-medium flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span>¡Agregado ({totalUnits} uds)!</span>
              </div>
              <Link href="/carrito" className="font-bold text-[#FF5E14] hover:underline text-xs">
                Ir al Carrito →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
