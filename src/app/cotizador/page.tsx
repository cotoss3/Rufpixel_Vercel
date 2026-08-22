'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Printer, Sparkles, Tag, Ruler, Upload, CheckCircle2, 
  ShieldCheck, Calculator, ArrowRight, ShoppingBag, Plus, Minus, Layers, Scissors, FileText
} from 'lucide-react';
import { useCart } from '@/lib/cartContext';

interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
  price: number;
  promo?: boolean;
  promoBadge?: string;
  isCustom?: boolean;
}

export default function CotizadorPage() {
  const { addToCart } = useCart();

  // Top Category Tabs (DTF, UVDTF, Gran Formato, Stickers, Papelería)
  const [activeTab, setActiveTab] = useState<'DTF' | 'UVDTF' | 'GRAN_FORMATO' | 'STICKERS' | 'PAPELERIA'>('DTF');
  const [stickerFilter, setStickerFilter] = useState<'ALL' | '2X2' | '3X3' | '4X4'>('ALL');
  const [papeleriaFilter, setPapeleriaFilter] = useState<'ALL' | 'VOLANTES' | 'LIBRETAS' | 'TARJETAS'>('ALL');

  // Preset Sizes
  const presetSizes: Record<string, SizeOption[]> = {
    DTF: [
      { id: 'dtf-a4', name: 'A4', dimensions: '8.27" × 11"', price: 2.94 },
      { id: 'dtf-yarda-lineal', name: 'Yarda Lineal', dimensions: '11" × 36"', price: 6.42 },
    ],
    UVDTF: [
      { id: 'uv-a4', name: 'A4', dimensions: '8.2" × 11"', price: 5.32 },
      { id: 'uv-yarda-lineal', name: 'Yarda Lineal', dimensions: '11" × 36"', price: 10.70 },
    ],
    GRAN_FORMATO: [
      { id: 'gf-3x2', name: 'Banner 3 × 2 ft', dimensions: '36" × 24"', price: 9.63 },
      { id: 'gf-4x4', name: 'Banner 4 × 4 ft', dimensions: '48" × 48"', price: 25.68 },
      { id: 'gf-6x4', name: 'Banner 6 × 4 ft', dimensions: '72" × 48"', price: 38.52 },
      { id: 'gf-8x4', name: 'Banner 8 × 4 ft', dimensions: '96" × 48"', price: 44.94, promo: true, promoBadge: 'MÁS POPULAR' },
      { id: 'gf-aranita', name: 'Estructura Arañita', dimensions: '24" × 36"', price: 37.45 },
      { id: 'gf-rollup', name: 'Banner Roll-Up Standard', dimensions: '33" × 79"', price: 69.55, promo: true, promoBadge: 'ESTRUCTURA + IMPRESIÓN' },
    ],
    STICKERS: [
      { id: 'stk-2x2-100', name: 'Sticker 2" × 2"', dimensions: 'Pack 100 unidades', price: 8.56 },
      { id: 'stk-2x2-500', name: 'Sticker 2" × 2"', dimensions: 'Pack 500 unidades', price: 26.75, promo: true, promoBadge: 'POPULAR' },
      { id: 'stk-2x2-1000', name: 'Sticker 2" × 2"', dimensions: 'Pack 1,000 unidades', price: 48.15, promo: true, promoBadge: 'MEJOR PRECIO' },

      { id: 'stk-3x3-100', name: 'Sticker 3" × 3"', dimensions: 'Pack 100 unidades', price: 12.84 },
      { id: 'stk-3x3-500', name: 'Sticker 3" × 3"', dimensions: 'Pack 500 unidades', price: 42.80, promo: true, promoBadge: 'POPULAR' },
      { id: 'stk-3x3-1000', name: 'Sticker 3" × 3"', dimensions: 'Pack 1,000 unidades', price: 74.90, promo: true, promoBadge: 'MEJOR PRECIO' },

      { id: 'stk-4x4-100', name: 'Sticker 4" × 4"', dimensions: 'Pack 100 unidades', price: 14.98 },
      { id: 'stk-4x4-500', name: 'Sticker 4" × 4"', dimensions: 'Pack 500 unidades', price: 58.85, promo: true, promoBadge: 'POPULAR' },
      { id: 'stk-4x4-1000', name: 'Sticker 4" × 4"', dimensions: 'Pack 1,000 unidades', price: 96.30, promo: true, promoBadge: 'MEJOR PRECIO' },
    ],
    PAPELERIA: [
      // Volantes
      { id: 'pap-volante-quarter-100', name: 'Volante 1/4 de Página', dimensions: 'Pack 100 unidades', price: 9.95 },
      { id: 'pap-volante-quarter-500', name: 'Volante 1/4 de Página', dimensions: 'Pack 500 unidades', price: 24.95, promo: true, promoBadge: 'POPULAR' },

      { id: 'pap-volante-half-100', name: 'Volante 1/2 Página', dimensions: 'Pack 100 unidades', price: 12.95 },
      { id: 'pap-volante-half-500', name: 'Volante 1/2 Página', dimensions: 'Pack 500 unidades', price: 44.95, promo: true, promoBadge: 'POPULAR' },

      // Libretas de Factura 1/4 Página
      { id: 'pap-factura-quarter-1', name: 'Libreta de Factura 1/4 Página', dimensions: '1 Unidad', price: 9.95 },
      { id: 'pap-factura-quarter-2', name: 'Libretas de Factura 1/4 Página', dimensions: '2 Unidades', price: 14.95 },
      { id: 'pap-factura-quarter-4', name: 'Libretas de Factura 1/4 Página', dimensions: '4 Unidades', price: 24.95, promo: true, promoBadge: 'AHORRO' },

      // Libretas de Factura 1/2 Página
      { id: 'pap-factura-half-1', name: 'Libreta de Factura 1/2 Página', dimensions: '1 Unidad', price: 14.95 },
      { id: 'pap-factura-half-2', name: 'Libretas de Factura 1/2 Página', dimensions: '2 Unidades', price: 24.95 },
      { id: 'pap-factura-half-4', name: 'Libretas de Factura 1/2 Página', dimensions: '4 Unidades', price: 47.96, promo: true, promoBadge: 'AHORRO' },

      // Tarjetas de Presentación
      { id: 'pap-tarjetas-100', name: 'Tarjetas de Presentación', dimensions: 'Pack 100 unidades', price: 12.50 },
      { id: 'pap-tarjetas-300', name: 'Tarjetas de Presentación', dimensions: 'Pack 300 unidades', price: 21.50 },
      { id: 'pap-tarjetas-500', name: 'Tarjetas de Presentación', dimensions: 'Pack 500 unidades', price: 35.00, promo: true, promoBadge: 'PACK POPULAR' },
    ],
  };

  const [selectedSizeId, setSelectedSizeId] = useState<string>('dtf-a4');
  const [quantity, setQuantity] = useState<number>(1);
  
  // Custom Size State
  const [isCustomSize, setIsCustomSize] = useState<boolean>(false);
  const [customWidth, setCustomWidth] = useState<number>(100);
  const [customHeight, setCustomHeight] = useState<number>(100);
  const [customUnit, setCustomUnit] = useState<'cm' | 'pulgadas' | 'm'>('cm');

  // Artwork File
  const [fileName, setFileName] = useState<string>('');
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);

  const rawSizes = presetSizes[activeTab] || presetSizes.DTF;

  // Filter stickers or papeleria by sub-type
  const currentSizes = rawSizes.filter(s => {
    if (activeTab === 'STICKERS') {
      if (stickerFilter === '2X2') return s.id.includes('2x2');
      if (stickerFilter === '3X3') return s.id.includes('3x3');
      if (stickerFilter === '4X4') return s.id.includes('4x4');
    }
    if (activeTab === 'PAPELERIA') {
      if (papeleriaFilter === 'VOLANTES') return s.id.includes('volante');
      if (papeleriaFilter === 'LIBRETAS') return s.id.includes('factura');
      if (papeleriaFilter === 'TARJETAS') return s.id.includes('tarjetas');
    }
    return true;
  });

  const currentSelectedOption = rawSizes.find((s) => s.id === selectedSizeId);

  // Calculate Price
  const getUnitPrice = () => {
    if (isCustomSize) {
      let widthMeters = customUnit === 'cm' ? customWidth / 100 : customUnit === 'pulgadas' ? (customWidth * 2.54) / 100 : customWidth;
      let heightMeters = customUnit === 'cm' ? customHeight / 100 : customUnit === 'pulgadas' ? (customHeight * 2.54) / 100 : customHeight;
      let areaSqM = widthMeters * heightMeters;
      return Math.max(5.00, areaSqM * 18);
    }
    return currentSelectedOption ? currentSelectedOption.price : 9.00;
  };

  const unitPrice = getUnitPrice();
  const totalPrice = unitPrice * quantity;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSelectSize = (size: SizeOption) => {
    setSelectedSizeId(size.id);
    setIsCustomSize(false);
  };

  const handleSelectCustom = () => {
    setIsCustomSize(true);
    setSelectedSizeId('custom');
  };

  const handleAddToCartOrOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const sizeLabel = isCustomSize 
      ? `Medida Personalizada (${customWidth} × ${customHeight} ${customUnit})` 
      : `${currentSelectedOption?.name} (${currentSelectedOption?.dimensions})`;

    const customProduct = {
      id: `preorder-${Date.now()}`,
      slug: `preorden-${activeTab.toLowerCase()}`,
      name: `Impresión ${activeTab} — ${sizeLabel}`,
      price: unitPrice,
      description: `Pedido de pre-orden ${activeTab}. Archivo: ${fileName || 'Pendiente'}`,
      shortDescription: `Tamaño: ${sizeLabel}`,
      category: activeTab,
      categorySlug: activeTab.toLowerCase(),
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
      gallery: [],
      stock: 999,
      attributes: [
        { name: 'Tipo', options: [activeTab] },
        { name: 'Medida', options: [sizeLabel] }
      ],
    };

    addToCart(customProduct, quantity, { Tipo: activeTab, Medida: sizeLabel }, fileName ? `Archivo: ${fileName}` : '');

    setSubmittedOrder({
      id: `PRE-${Math.floor(100000 + Math.random() * 900000)}`,
      type: activeTab,
      sizeLabel,
      quantity,
      unitPrice,
      totalPrice,
      fileName,
    });
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
          Cotizador de Pre-Orden
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">
          Nuevo pedido
        </h1>
        <p className="text-gray-600 text-sm">
          Arma tu orden seleccionando la categoría y cantidad en paquetes predeterminados.
        </p>
      </div>

      {submittedOrder ? (
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-gray-900 font-outfit">
              ¡Agregado al Carrito & Pre-Orden Lista!
            </h2>
            <p className="text-gray-600 text-sm">
              Código de Pre-orden: <strong className="font-mono text-gray-900 font-bold">{submittedOrder.id}</strong>
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl text-left text-xs space-y-2 border border-gray-200 max-w-md mx-auto">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Tipo de Impresión:</span>
              <span className="font-bold text-gray-900">{submittedOrder.type}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Medida / Paquete Seleccionado:</span>
              <span className="font-bold text-[#FF5E14]">{submittedOrder.sizeLabel}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Cantidad de Paquetes:</span>
              <span className="font-bold">{submittedOrder.quantity} paquete(s)</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Archivo Adjunto:</span>
              <span className="font-bold font-mono text-gray-700">{submittedOrder.fileName || 'Pendiente por subir'}</span>
            </div>
            <div className="flex justify-between pt-2 text-sm font-extrabold font-outfit">
              <span>Total Estimado:</span>
              <span className="text-[#FF5E14] text-lg">${submittedOrder.totalPrice.toFixed(2)} USD</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/carrito"
              className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-[#FF5E14]/30 flex items-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ir al Carrito & Pagar (Yappy / ACH)</span>
            </Link>
            <button
              onClick={() => setSubmittedOrder(null)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3.5 rounded-xl font-bold text-sm"
            >
              Agregar Otro Ítem
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleAddToCartOrOrder} className="space-y-8">
          
          {/* 1. TOP TAB CATEGORIES (Black Bar with Brand Orange Active Accent) */}
          <div className="bg-[#0D0D0D] p-2 rounded-2xl flex items-center justify-between border border-gray-800 shadow-xl overflow-x-auto">
            {[
              { id: 'DTF', label: 'DTF', icon: <Printer className="w-4 h-4" /> },
              { id: 'UVDTF', label: 'UVDTF', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'GRAN_FORMATO', label: 'Gran Formato', icon: <Ruler className="w-4 h-4" /> },
              { id: 'STICKERS', label: 'Stickers', icon: <Scissors className="w-4 h-4" /> },
              { id: 'PAPELERIA', label: 'Papelería', icon: <FileText className="w-4 h-4" /> },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    const firstSize = presetSizes[tab.id]?.[0];
                    if (firstSize) {
                      setSelectedSizeId(firstSize.id);
                      setIsCustomSize(false);
                    }
                  }}
                  className={`flex-1 min-w-[75px] flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#FF5E14] text-white shadow-lg shadow-[#FF5E14]/30 scale-[1.02]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Card Container */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-8">
            
            {/* TIPO HEADER */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block">
                TIPO SELECCIONADO
              </label>
              <div className="w-full bg-[#0D0D0D] text-white font-extrabold py-3.5 px-6 rounded-2xl text-center text-lg font-outfit tracking-wider shadow-inner border border-gray-800 flex items-center justify-center space-x-2">
                <span className="text-[#FF5E14]">IMPRESIÓN</span>
                <span>{activeTab === 'STICKERS' ? 'STICKERS TROQUELADOS' : activeTab === 'PAPELERIA' ? 'PAPELERÍA CORPORATIVA' : activeTab}</span>
              </div>
            </div>

            {/* STICKERS SIZE FILTER SUB-TABS */}
            {activeTab === 'STICKERS' && (
              <div className="space-y-2">
                <label className="text-xs uppercase font-extrabold text-gray-500 tracking-wider block">
                  Filtrar por Medida de Sticker:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'ALL', label: 'Todas las medidas' },
                    { id: '2X2', label: 'Stickers 2" × 2"' },
                    { id: '3X3', label: 'Stickers 3" × 3"' },
                    { id: '4X4', label: 'Stickers 4" × 4"' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setStickerFilter(f.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        stickerFilter === f.id
                          ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PAPELERIA FILTER SUB-TABS */}
            {activeTab === 'PAPELERIA' && (
              <div className="space-y-2">
                <label className="text-xs uppercase font-extrabold text-gray-500 tracking-wider block">
                  Filtrar por Tipo de Papelería:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'ALL', label: 'Todos los productos' },
                    { id: 'VOLANTES', label: 'Volantes' },
                    { id: 'LIBRETAS', label: 'Libretas de Factura' },
                    { id: 'TARJETAS', label: 'Tarjetas de Presentación' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setPapeleriaFilter(f.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        papeleriaFilter === f.id
                          ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAMAÑO PRE-DETERMINADO GRID */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block">
                {activeTab === 'STICKERS' 
                  ? 'SELECCIONA TU PAQUETE DE STICKERS' 
                  : activeTab === 'PAPELERIA' 
                  ? 'SELECCIONA TU PRODUCTO DE PAPELERÍA' 
                  : 'TAMAÑO PREDETERMINADO'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentSizes.map((size) => {
                  const isSelected = selectedSizeId === size.id && !isCustomSize;
                  return (
                    <button
                      type="button"
                      key={size.id}
                      onClick={() => handleSelectSize(size)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between h-32 ${
                        isSelected
                          ? 'bg-[#FFF5F0] border-[#FF5E14] shadow-md shadow-[#FF5E14]/15 ring-2 ring-[#FF5E14]/20'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {size.promo && (
                        <span className="absolute -top-2.5 right-4 bg-[#FF5E14] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                          {size.promoBadge || 'PROMO'}
                        </span>
                      )}

                      <div className="space-y-1">
                        <h3 className="font-extrabold text-gray-900 text-base font-outfit">
                          {size.name}
                        </h3>
                        <span className="text-xs font-semibold text-gray-500 font-mono block">
                          {size.dimensions}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between border-t border-gray-200/60 pt-2">
                        <span className="text-xs text-gray-400 font-medium">Gran Total:</span>
                        <span className="text-lg font-extrabold text-[#FF5E14] font-outfit">
                          US$ {size.price.toFixed(2)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* MEDIDA PERSONALIZADA BUTTON (DASHED BORDER) */}
              {!['DTF', 'UVDTF', 'GRAN_FORMATO', 'STICKERS', 'PAPELERIA'].includes(activeTab) && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSelectCustom}
                    className={`w-full p-5 rounded-2xl border-2 border-dashed text-left transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      isCustomSize
                        ? 'bg-[#FFF5F0] border-[#FF5E14] ring-2 ring-[#FF5E14]/20'
                        : 'bg-gray-50 border-gray-300 hover:border-[#FF5E14] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-[#FF5E14]/10 rounded-xl text-[#FF5E14]">
                        <Ruler className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-gray-900 text-sm font-outfit">
                          📐 Medida Personalizada
                        </h4>
                        <span className="text-xs text-gray-500">
                          Ingresa tu ancho y alto exacto en cm, m o pulgadas
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#FF5E14] bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                      {isCustomSize ? '✓ Seleccionado' : 'Cotizar Medida'}
                    </span>
                  </button>
                </div>
              )}

              {/* CUSTOM DIMENSIONS EXPANDABLE INPUTS */}
              {isCustomSize && !['DTF', 'UVDTF', 'GRAN_FORMATO', 'STICKERS', 'PAPELERIA'].includes(activeTab) && (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4 animate-fade-in text-xs">
                  <span className="font-bold text-gray-900 block">Especificar Dimensiones:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Ancho</label>
                      <input
                        type="number"
                        min="1"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(parseFloat(e.target.value) || 1)}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none bg-white font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Alto</label>
                      <input
                        type="number"
                        min="1"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(parseFloat(e.target.value) || 1)}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none bg-white font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Unidad</label>
                      <select
                        value={customUnit}
                        onChange={(e) => setCustomUnit(e.target.value as any)}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none bg-white font-bold"
                      >
                        <option value="cm">Centímetros (cm)</option>
                        <option value="pulgadas">Pulgadas (in)</option>
                        <option value="m">Metros (m)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CANTIDAD SELECTOR */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block">
                CANTIDAD DE PAQUETES
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-2xl p-1.5 border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 bg-white hover:bg-gray-200 text-gray-800 rounded-xl shadow-sm transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-extrabold text-gray-900 font-outfit text-base">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 bg-white hover:bg-gray-200 text-gray-800 rounded-xl shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {['STICKERS', 'PAPELERIA'].includes(activeTab) ? `Total de paquetes seleccionados` : `Mínimo 1 paquete u orden`}
                </span>
              </div>
            </div>

            {/* SUBIR ARCHIVO DE ARTE */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block">
                ADJUNTAR DISEÑO / ARTE (OPCIONAL)
              </label>
              <div className="relative border-2 border-dashed border-gray-300 hover:border-[#FF5E14] rounded-2xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-[#FFF5F0] transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf,.ai,.psd,.pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="w-8 h-8 text-[#FF5E14]" />
                  <span className="text-sm text-gray-700 font-bold">
                    {fileName ? `Archivo seleccionado: ${fileName}` : 'Haz clic o arrastra tu archivo de diseño aquí'}
                  </span>
                  <span className="text-xs text-gray-400">Formatos recomendados: PDF, AI, PSD, PNG en alta definición (CMYK)</span>
                </div>
              </div>
            </div>

            {/* PRECIO FINAL & ACCIONES */}
            <div className="bg-[#0D0D0D] text-white p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xl border border-gray-800">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                  <span className="text-xs text-gray-400 font-medium block">Total Estimado de la Pre-Orden:</span>
                  <span className="text-3xl font-extrabold text-[#FF5E14] font-outfit">
                    ${totalPrice.toFixed(2)} USD
                  </span>
                </div>
                <div className="text-right text-xs text-gray-400">
                  <span className="block font-bold text-white">Pagos Yappy & ACH</span>
                  <span>Impuestos incluidos</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#FF5E14] hover:bg-[#E04700] text-white py-4 px-6 rounded-2xl font-extrabold text-sm shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Agregar Pre-Orden al Carrito</span>
                </button>
              </div>
            </div>

          </div>
        </form>
      )}

    </div>
  );
}
