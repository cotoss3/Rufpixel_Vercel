'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Printer, Sparkles, Tag, Ruler, Upload, CheckCircle2, 
  ShieldCheck, Calculator, ArrowRight, ShoppingBag, Plus, Minus, Layers, Scissors, FileText, Zap
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

type PreOrderTab = 'DTF_TEXTIL' | 'UVDTF' | 'BANNERS_ESTRUCTURAS' | 'STICKERS' | 'PAPELERIA_COMERCIAL' | 'GRABADOS_LASER';

export default function CotizadorPage() {
  const { addToCart } = useCart();

  // Top Category Tabs (Exact match to PDF Page 3)
  const [activeTab, setActiveTab] = useState<PreOrderTab>('DTF_TEXTIL');
  const [stickerFilter, setStickerFilter] = useState<'ALL' | '2X2' | '3X3' | '4X4'>('ALL');
  const [papeleriaFilter, setPapeleriaFilter] = useState<'ALL' | 'VOLANTES' | 'LIBRETAS' | 'TARJETAS'>('ALL');
  const [laserFilter, setLaserFilter] = useState<'ALL' | 'TERMOS' | 'BOLIGRAFOS' | 'PLACAS'>('ALL');

  // Category Banners mapping (from uploaded media banners)
  const categoryBanners: Record<PreOrderTab, { image: string; title: string; subtitle: string }> = {
    DTF_TEXTIL: {
      image: '/images/banners/banner-dtf.jpg',
      title: 'IMPRESIÓN DTF TEXTIL',
      subtitle: 'Transfer digital textil de alta adherencia y elasticidad para prendas oscuras y claras',
    },
    UVDTF: {
      image: '/images/banners/banner-uvdtf.jpg',
      title: 'IMPRESIÓN UVDTF',
      subtitle: 'Transfer UV adhesivo con relieve 3D, barniz brillante y máxima resistencia en rígidos',
    },
    BANNERS_ESTRUCTURAS: {
      image: '/images/banners/banner-gran-formato.jpg',
      title: 'BANNERS Y ESTRUCTURAS',
      subtitle: 'Lonas publicitarias 13oz, Roll-Up retráctiles y estructuras arañita de gran impacto',
    },
    STICKERS: {
      image: '/images/banners/banner-stickers.jpg',
      title: 'STICKERS PERSONALIZADOS',
      subtitle: 'Vinil troquelado de alta precisión impermeable para marcas, packaging y empaques',
    },
    PAPELERIA_COMERCIAL: {
      image: '/images/banners/banner-papeleria.jpg',
      title: 'PAPELERÍA COMERCIAL',
      subtitle: 'Volantes publicitarios, talonarios de factura y tarjetas de presentación ejecutivas',
    },
    GRABADOS_LASER: {
      image: '/images/banners/banner-grabados-laser.jpg',
      title: 'GRABADOS LÁSER PERSONALIZADOS',
      subtitle: 'Grabado y marcado láser de máxima precisión en botellas, termos, metal y madera',
    },
  };

  // Preset Sizes
  const presetSizes: Record<PreOrderTab, SizeOption[]> = {
    DTF_TEXTIL: [
      { id: 'dtf-a4', name: 'Formato A4', dimensions: '8.27" × 11"', price: 2.94 },
      { id: 'dtf-yarda-lineal', name: 'Yarda Lineal DTF', dimensions: '11" × 36"', price: 6.42, promo: true, promoBadge: 'MÁS VENDIDO' },
      { id: 'dtf-metro-lineal', name: 'Metro Lineal DTF', dimensions: '22" × 39"', price: 11.50 },
    ],
    UVDTF: [
      { id: 'uv-a4', name: 'Formato A4 UV DTF', dimensions: '8.2" × 11"', price: 5.32 },
      { id: 'uv-yarda-lineal', name: 'Yarda Lineal UV DTF', dimensions: '11" × 36"', price: 10.70, promo: true, promoBadge: 'ALTA DURABILIDAD' },
      { id: 'uv-metro', name: 'Metro Lineal UV DTF', dimensions: '22" × 39"', price: 18.90 },
    ],
    BANNERS_ESTRUCTURAS: [
      { id: 'gf-3x2', name: 'Banner Lona 13oz 3 × 2 ft', dimensions: '36" × 24"', price: 9.63 },
      { id: 'gf-4x4', name: 'Banner Lona 13oz 4 × 4 ft', dimensions: '48" × 48"', price: 25.68 },
      { id: 'gf-6x4', name: 'Banner Lona 13oz 6 × 4 ft', dimensions: '72" × 48"', price: 38.52 },
      { id: 'gf-8x4', name: 'Banner Lona 13oz 8 × 4 ft', dimensions: '96" × 48"', price: 44.94, promo: true, promoBadge: 'MÁS POPULAR' },
      { id: 'gf-aranita', name: 'Estructura Arañita + Impresión', dimensions: '24" × 36"', price: 37.45 },
      { id: 'gf-rollup', name: 'Banner Roll-Up Standard Retráctil', dimensions: '33" × 79"', price: 69.55, promo: true, promoBadge: 'ESTRUCTURA + IMPRESIÓN' },
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
    PAPELERIA_COMERCIAL: [
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
    GRABADOS_LASER: [
      { id: 'gl-termo-1', name: 'Grabado en Termo / Botella', dimensions: '1 Unidad (Personal / Muestra)', price: 4.50 },
      { id: 'gl-termo-12', name: 'Grabado en Termos (Docena)', dimensions: 'Pack 12 unidades', price: 36.00, promo: true, promoBadge: 'DOCENA' },
      { id: 'gl-termo-50', name: 'Grabado en Termos Corporativos', dimensions: 'Pack 50 unidades', price: 125.00, promo: true, promoBadge: 'EMPRESARIAL' },
      { id: 'gl-boligrafos-50', name: 'Grabado Láser en Bolígrafos Metálicos', dimensions: 'Pack 50 unidades', price: 45.00 },
      { id: 'gl-boligrafos-100', name: 'Grabado Láser en Bolígrafos Metálicos', dimensions: 'Pack 100 unidades', price: 75.00, promo: true, promoBadge: 'MEJOR PRECIO' },
      { id: 'gl-placa-madera', name: 'Grabado en Placa / Madera / Acrílico', dimensions: 'Hasta 15 × 20 cm', price: 12.00 },
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

  const rawSizes = presetSizes[activeTab] || presetSizes.DTF_TEXTIL;

  // Filter stickers, papeleria, laser by sub-type
  const currentSizes = rawSizes.filter(s => {
    if (activeTab === 'STICKERS') {
      if (stickerFilter === '2X2') return s.id.includes('2x2');
      if (stickerFilter === '3X3') return s.id.includes('3x3');
      if (stickerFilter === '4X4') return s.id.includes('4x4');
    }
    if (activeTab === 'PAPELERIA_COMERCIAL') {
      if (papeleriaFilter === 'VOLANTES') return s.id.includes('volante');
      if (papeleriaFilter === 'LIBRETAS') return s.id.includes('factura');
      if (papeleriaFilter === 'TARJETAS') return s.id.includes('tarjetas');
    }
    if (activeTab === 'GRABADOS_LASER') {
      if (laserFilter === 'TERMOS') return s.id.includes('termo');
      if (laserFilter === 'BOLIGRAFOS') return s.id.includes('boligrafo');
      if (laserFilter === 'PLACAS') return s.id.includes('placa');
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

    const categoryInfo = categoryBanners[activeTab];
    const sizeLabel = isCustomSize 
      ? `Medida Personalizada (${customWidth} × ${customHeight} ${customUnit})` 
      : `${currentSelectedOption?.name} (${currentSelectedOption?.dimensions})`;

    const customProduct = {
      id: `preorder-${Date.now()}`,
      slug: `preorden-${activeTab.toLowerCase()}`,
      name: `${categoryInfo.title} — ${sizeLabel}`,
      price: unitPrice,
      description: `Pedido de pre-orden ${categoryInfo.title}. Archivo: ${fileName || 'Pendiente'}`,
      shortDescription: `Tamaño: ${sizeLabel}`,
      category: categoryInfo.title,
      categorySlug: activeTab.toLowerCase(),
      image: categoryInfo.image,
      gallery: [],
      stock: 999,
      attributes: [
        { name: 'Categoría', options: [categoryInfo.title] },
        { name: 'Medida', options: [sizeLabel] }
      ],
    };

    addToCart(customProduct, quantity, { Categoría: categoryInfo.title, Medida: sizeLabel }, fileName ? `Archivo: ${fileName}` : '');

    setSubmittedOrder({
      id: `PRE-${Math.floor(100000 + Math.random() * 900000)}`,
      type: categoryInfo.title,
      sizeLabel,
      quantity,
      unitPrice,
      totalPrice,
      fileName,
    });
  };

  const navTabs: { id: PreOrderTab; label: string; icon: React.ReactNode }[] = [
    { id: 'DTF_TEXTIL', label: 'DTF - TEXTIL', icon: <Printer className="w-4 h-4" /> },
    { id: 'UVDTF', label: 'UVDTF', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'BANNERS_ESTRUCTURAS', label: 'BANNERS Y ESTRUCTURAS', icon: <Ruler className="w-4 h-4" /> },
    { id: 'STICKERS', label: 'STICKERS', icon: <Scissors className="w-4 h-4" /> },
    { id: 'PAPELERIA_COMERCIAL', label: 'PAPELERIA COMERCIAL', icon: <FileText className="w-4 h-4" /> },
    { id: 'GRABADOS_LASER', label: 'GRABADOS LASER', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
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
              <span>Ir al Carrito & Pagar (YAPPY COMERCIAL & ACH)</span>
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
          
          {/* 1. TOP TAB CATEGORIES (Exact PDF Page 3 list of 6 buttons) */}
          <div className="bg-[#0D0D0D] p-2 rounded-2xl flex items-center justify-between border border-gray-800 shadow-xl overflow-x-auto gap-1">
            {navTabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    const firstSize = presetSizes[tab.id]?.[0];
                    if (firstSize) {
                      setSelectedSizeId(firstSize.id);
                      setIsCustomSize(false);
                    }
                  }}
                  className={`flex-1 min-w-[130px] sm:min-w-[150px] flex items-center justify-center space-x-1.5 py-3 px-3 rounded-xl text-xs font-extrabold transition-all text-center whitespace-nowrap ${
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
            
            {/* 2. CATEGORY BANNER FOR PRE-ORDER TITLES (Exact PDF Page 3 requirement) */}
            <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-800 relative bg-[#0D0D0D] group">
              <div className="relative w-full h-36 sm:h-48 md:h-52">
                <img
                  src={categoryBanners[activeTab].image}
                  alt={categoryBanners[activeTab].title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end p-5 sm:p-6">
                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-black/70 px-3 py-1 rounded-md border border-[#FF5E14]/40 inline-block backdrop-blur-sm">
                      Pre-Orden Activa
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-outfit">
                      {categoryBanners[activeTab].title}
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm max-w-xl font-light hidden sm:block">
                      {categoryBanners[activeTab].subtitle}
                    </p>
                  </div>
                </div>
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
            {activeTab === 'PAPELERIA_COMERCIAL' && (
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

            {/* GRABADOS LASER FILTER SUB-TABS */}
            {activeTab === 'GRABADOS_LASER' && (
              <div className="space-y-2">
                <label className="text-xs uppercase font-extrabold text-gray-500 tracking-wider block">
                  Filtrar por Artículo de Grabado:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'ALL', label: 'Todos los artículos' },
                    { id: 'TERMOS', label: 'Botellas & Termos' },
                    { id: 'BOLIGRAFOS', label: 'Bolígrafos Metálicos' },
                    { id: 'PLACAS', label: 'Placas & Madera' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setLaserFilter(f.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        laserFilter === f.id
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
                  : activeTab === 'PAPELERIA_COMERCIAL' 
                  ? 'SELECCIONA TU PRODUCTO DE PAPELERÍA' 
                  : activeTab === 'GRABADOS_LASER'
                  ? 'SELECCIONA TU PACK DE GRABADO LÁSER'
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
            </div>

            {/* CANTIDAD SELECTOR */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block">
                CANTIDAD DE PAQUETES / ÓRDENES
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
                  Total de paquetes u órdenes seleccionadas
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
                  accept="image/*,.pdf,.ai,.psd,.eps"
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
                  <span className="block font-bold text-white">Pagos seguros vía YAPPY COMERCIAL & ACH</span>
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
