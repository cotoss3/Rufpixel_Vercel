'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Printer, Sparkles, Tag, Ruler, Upload, CheckCircle2, 
  ShieldCheck, Calculator, ArrowRight, ShoppingBag, Plus, Minus 
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

  // Top Category Tabs (DTF, UVDTF, Gran Formato, Promos)
  const [activeTab, setActiveTab] = useState<'DTF' | 'UVDTF' | 'GRAN_FORMATO' | 'PROMOS'>('DTF');

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
    ],
    PROMOS: [
      { id: 'p-yarda', name: 'Yarda Promo RufPixel', dimensions: '23" × 36"', price: 9.00, promo: true, promoBadge: 'ESPECIAL' },
      { id: 'p-pack-tarjetas', name: '100 Tarjetas Soft-Touch', dimensions: '3.5" × 2.0"', price: 25.00, promo: true, promoBadge: 'PACK POPULAR' },
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

  const currentSizes = presetSizes[activeTab] || presetSizes.DTF;
  const currentSelectedOption = currentSizes.find((s) => s.id === selectedSizeId);

  // Calculate Price
  const getUnitPrice = () => {
    if (isCustomSize) {
      // Calculate based on area
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
          Arma tu orden agregando varios ítems al carrito o seleccionando la medida predeterminada.
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
              <span className="text-gray-500">Medida Seleccionada:</span>
              <span className="font-bold text-[#FF5E14]">{submittedOrder.sizeLabel}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Cantidad:</span>
              <span className="font-bold">{submittedOrder.quantity} unidad(es)</span>
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
              className="bg-gray-900 text-white px-6 py-3.5 rounded-xl font-semibold text-sm border border-gray-800"
            >
              Agregar Otro Ítem
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleAddToCartOrOrder} className="space-y-8">
          
          {/* 1. TOP TAB CATEGORIES (Black Bar with Brand Orange Active Accent) */}
          <div className="bg-[#0D0D0D] p-2 rounded-2xl flex items-center justify-between border border-gray-800 shadow-xl">
            {[
              { id: 'DTF', label: 'DTF', icon: <Printer className="w-4 h-4" /> },
              { id: 'UVDTF', label: 'UVDTF', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'GRAN_FORMATO', label: 'Gran Formato', icon: <Ruler className="w-4 h-4" /> },
              { id: 'PROMOS', label: 'Ofertas', icon: <Tag className="w-4 h-4" /> },
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
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#FF5E14] text-white shadow-lg shadow-[#FF5E14]/30 scale-[1.02]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
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
                <span>{activeTab}</span>
              </div>
            </div>

            {/* TAMAÑO PRE-DETERMINADO GRID */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block">
                TAMAÑO PREDETERMINADO
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
                          {size.name} <span className="text-xs font-semibold text-gray-500 font-mono">({size.dimensions})</span>
                        </h3>
                      </div>

                      <div className="flex items-baseline justify-between border-t border-gray-200/60 pt-2">
                        <span className="text-xs text-gray-400 font-medium">Precio unitario:</span>
                        <span className="text-lg font-extrabold text-[#FF5E14] font-outfit">
                          US$ {size.price.toFixed(2)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* MEDIDA PERSONALIZADA BUTTON (DASHED BORDER) */}
              {!['DTF', 'UVDTF', 'GRAN_FORMATO'].includes(activeTab) && (
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
              {isCustomSize && !['DTF', 'UVDTF', 'GRAN_FORMATO'].includes(activeTab) && (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4 animate-fade-in text-xs">
                  <span className="font-bold text-gray-900 block">Especificar Dimensiones:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Ancho</label>
                      <input
                        type="number"
                        min="1"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Number(e.target.value))}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Alto</label>
                      <input
                        type="number"
                        min="1"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(Number(e.target.value))}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-600">Unidad</label>
                      <select
                        value={customUnit}
                        onChange={(e) => setCustomUnit(e.target.value as any)}
                        className="w-full p-3 rounded-xl border border-gray-300 font-bold bg-white"
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
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block">
                CANTIDAD
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-gray-300 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 text-base font-extrabold text-gray-900 font-outfit">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500 font-medium">unidad(es)</span>
              </div>
            </div>


            {/* FILE UPLOAD BOX */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block">
                SUBIR ARCHIVO DE ARTE (PDF, AI, PNG, JPG)
              </label>
              <div className="relative border-2 border-dashed border-gray-300 hover:border-[#FF5E14] rounded-2xl p-6 text-center cursor-pointer bg-gray-50 transition-colors">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-2 text-gray-600">
                  <Upload className="w-6 h-6 text-[#FF5E14]" />
                  <span className="text-xs font-bold text-gray-800">
                    {fileName ? `Archivo seleccionado: ${fileName}` : 'Haz clic o arrastra tu archivo aquí'}
                  </span>
                  <span className="text-[11px] text-gray-400">Revisión técnica de color CMYK incluida sin costo</span>
                </div>
              </div>
            </div>


            {/* TOTAL ESTIMATED BAR & BUTTON */}
            <div className="bg-[#0D0D0D] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-gray-800">
              <div>
                <span className="text-xs text-gray-400 block uppercase font-semibold">Total Estimado:</span>
                <span className="text-3xl font-extrabold text-[#FF5E14] font-outfit">
                  US$ {totalPrice.toFixed(2)} <span className="text-xs font-normal text-gray-400">USD</span>
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#FF5E14] hover:bg-[#E04700] text-white px-8 py-4 rounded-xl font-extrabold text-sm shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Agregar al Carrito / Pre-orden</span>
              </button>
            </div>

          </div>
        </form>
      )}
    </div>
  );
}
