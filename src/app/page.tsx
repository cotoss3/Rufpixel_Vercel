import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CreditCard, Maximize2, FileText, Tag, Gift, ArrowRight, ShieldCheck, 
  Sparkles, CheckCircle2, Clock, Truck, Calculator, Star, ShoppingBag, ArrowUpRight,
  Zap, Scissors, Printer, Layers, MessageCircle, Shirt, Video
} from 'lucide-react';
import { StickerIcon } from '@/components/icons/StickerIcon';
import { MOCK_SERVICES, MOCK_TESTIMONIALS } from '@/lib/mockData';
import { getProducts } from '@/lib/woocommerce';
import { getBlogPosts } from '@/lib/wordpress';
import { GeoFaqSchema } from '@/components/seo/SchemaOrg';

export const metadata: Metadata = {
  title: 'Artículos Promocionales e Impresión de Banners | RufPixel', // 57 chars
  description: 'Artículos promocionales al por mayor e impresión de banners, roll-up, DTF y bordados en Panamá. Precios desde 50 uds y desde 1 pieza en Zona Pixel.', // 148 chars
  alternates: {
    canonical: 'https://rufpixel.com',
  },
  openGraph: {
    title: 'Artículos Promocionales e Impresión de Banners | RufPixel',
    description: 'Artículos promocionales al por mayor e impresión de banners, roll-up, DTF y bordados en Panamá. Precios desde 50 uds y desde 1 pieza en Zona Pixel.',
    url: 'https://rufpixel.com',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default async function HomePage() {
  const { products } = await getProducts();
  const featuredSlugs = [
    'boligrafo-ejecutivo-de-aluminio-premium',
    'botella-de-acero-metalizada-con-tapa-rosca',
    'cordon-porta-id-satinado-con-clip-desprendible',
    'set-de-bbq-en-tela-con-tabla-y-utensilios-de-madera',
  ];
  const selectedFeatured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const featuredProducts = selectedFeatured.length === 4 ? selectedFeatured : products.slice(0, 4);

  const { posts } = await getBlogPosts();
  const recentPosts = posts.slice(0, 3);

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-8 h-8 text-[#FF5E14]" />,
    CreditCard: <CreditCard className="w-8 h-8 text-[#FF5E14]" />,
    Maximize2: <Maximize2 className="w-8 h-8 text-[#FF5E14]" />,
    FileText: <FileText className="w-8 h-8 text-[#FF5E14]" />,
    Tag: <Tag className="w-8 h-8 text-[#FF5E14]" />,
    Gift: <Gift className="w-8 h-8 text-[#FF5E14]" />,
    Printer: <Printer className="w-8 h-8 text-[#FF5E14]" />,
    Shirt: <Shirt className="w-8 h-8 text-[#FF5E14]" />,
    Video: <Video className="w-8 h-8 text-[#FF5E14]" />,
  };

  return (
    <div className="space-y-16 pb-20">
      <GeoFaqSchema />
      
      {/* 1. HERO SECTION - Vibrant Modern Agency Banner */}
      <section className="relative bg-gradient-to-br from-[#0D0D0D] via-[#141414] to-[#070707] text-white pt-12 pb-24 overflow-hidden border-b border-gray-800">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF5E14]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FF5E14]/10 border border-[#FF5E14]/30 rounded-full px-4 py-1.5 text-xs font-semibold text-[#FF5E14]">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Impresión Digital & Gran Formato en Panamá</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-outfit tracking-tight leading-tight text-white">
                Imprenta y Promocionales en Panamá: Al por Mayor y desde 1 Pieza en Zona Pixel
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-lg max-w-2xl font-light leading-relaxed">
                Taller gráfico en Panamá: DTF textil por metros, bordados, grabado láser, banners roll-up y catálogo corporativo al por mayor desde 50 uds o al detal sin mínimos en Zona Pixel.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/tienda"
                  className="w-full sm:w-auto bg-[#FF5E14] hover:bg-[#E04700] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-[#FF5E14]/30 transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Catálogo Mayorista (Packs)</span>
                </Link>

                <Link
                  href="/cotizador"
                  className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 hover:border-[#FF5E14] px-8 py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center space-x-2 group"
                >
                  <Zap className="w-5 h-5 text-[#FF5E14] group-hover:scale-110 transition-transform" />
                  <span>Zona Pixel — Impresiones Digitales</span>
                </Link>
              </div>

              {/* Features Micro-bar */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-800 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Prueba digital antes de imprimir</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Plazos según volumen y técnica</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Pagos seguros vía YAPPY COMERCIAL & TRANSFERENCIA ACH</span>
                </div>
              </div>

            </div>

            {/* Right Feature Card Image Preview */}
            <div className="lg:col-span-5 relative">
              <Link
                href="/articulos-promocionales-panama"
                className="block relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl bg-[#070707] group p-2 flex items-center justify-center"
              >
                <img
                  src="/images/hero-home.jpg"
                  alt="Grabados Láser Personalizados RufPixel"
                  className="w-full h-auto max-h-[480px] object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Floating Glass Accent Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0D0D0D]/90 backdrop-blur-md p-3.5 rounded-xl border border-gray-800 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#FF5E14]">Destacado de la Semana</span>
                    <h3 className="text-white font-bold text-sm font-outfit">GRABADOS LÁSER PERSONALIZADOS</h3>
                    <p className="text-xs text-gray-400">Botellas, Termos y Artículos Corporativos</p>
                  </div>
                  <div className="p-2 bg-[#FF5E14] text-white rounded-lg group-hover:bg-[#E04700] transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* 1.5 DUAL MONEY PILLAR HUB: ARTÍCULOS PROMOCIONALES & IMPRESIÓN DE BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Money Pillar 1: Artículos Promocionales en Panamá */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-gray-200 hover:border-[#FF5E14] shadow-md transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#FF5E14] bg-[#FF5E14]/10 px-3 py-1 rounded-full">
                Catálogo B2B · 166 Modelos en Stock
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit leading-tight">
                <Link href="/articulos-promocionales-panama" className="hover:text-[#FF5E14] transition-colors">
                  Artículos Promocionales en Panamá al por Mayor
                </Link>
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Precios transparentes por escala (<strong>50, 100 y 250 unidades</strong>) con grabado láser, UV DTF, serigrafía y bordado computarizado. Desde bolígrafos a <strong>$0.55/ud</strong> y bolsas de manta sucia hasta termos de acero doble pared y{' '}
                <Link href="/regalos-corporativos-panama" className="text-[#FF5E14] font-bold hover:underline">
                  regalos corporativos en Panamá
                </Link>.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold">
                <Link href="/tienda/boligrafos-y-plumas" className="bg-gray-100 hover:bg-[#FF5E14] hover:text-white text-gray-800 px-3 py-1.5 rounded-lg transition-colors">
                  Bolígrafos con Logo
                </Link>
                <Link href="/tienda/tazas-botellas-y-termos" className="bg-gray-100 hover:bg-[#FF5E14] hover:text-white text-gray-800 px-3 py-1.5 rounded-lg transition-colors">
                  Termos Personalizados
                </Link>
                <Link href="/tienda/libretas-y-cuadernos" className="bg-gray-100 hover:bg-[#FF5E14] hover:text-white text-gray-800 px-3 py-1.5 rounded-lg transition-colors">
                  Agendas y Libretas
                </Link>
                <Link href="/tienda/bolsas-y-totes" className="bg-gray-100 hover:bg-[#FF5E14] hover:text-white text-gray-800 px-3 py-1.5 rounded-lg transition-colors">
                  Bolsas de Manta y Yute
                </Link>
                <Link href="/tienda/gorras-y-accesorios-de-cabeza" className="bg-gray-100 hover:bg-[#FF5E14] hover:text-white text-gray-800 px-3 py-1.5 rounded-lg transition-colors">
                  Gorras Bordadas
                </Link>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/articulos-promocionales-panama"
                className="inline-flex items-center space-x-2 bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-md transition-all"
              >
                <span>Ver Catálogo y Tabla de Precios de Artículos Promocionales</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Money Pillar 2: Impresión de Banners y Gran Formato en Panamá */}
          <div className="bg-[#0D0D0D] text-white rounded-3xl p-7 sm:p-8 border-2 border-gray-800 hover:border-[#FF5E14] shadow-xl transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#FF5E14] bg-[#FF5E14]/15 border border-[#FF5E14]/30 px-3 py-1 rounded-full">
                Producción en Taller · Sin Mínimos desde 1 Unidad
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit leading-tight">
                <Link href="/servicios/impresion-gran-formato" className="hover:text-[#FF5E14] transition-colors">
                  Impresión de Banners, Roll-Up y Gran Formato en Panamá
                </Link>
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Impresión ecosolvente y UV en alta resolución (1440 DPI) para ferias, fachadas y puntos de venta: <strong>banners en lona 13oz</strong> con ojales desde <strong>$9.63</strong>, <strong>banner araña (X-Banner)</strong> a <strong>$37.45</strong>, <strong>roll-up retráctil de aluminio</strong> a <strong>$69.55</strong>, banderolas tipo vela, vinil adhesivo, microperforado y papel esmerilado.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold">
                <Link href="/servicios/impresion-gran-formato" className="bg-gray-900 border border-gray-700 hover:border-[#FF5E14] text-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                  Roll-Up Retráctil ($69.55)
                </Link>
                <Link href="/servicios/impresion-gran-formato" className="bg-gray-900 border border-gray-700 hover:border-[#FF5E14] text-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                  Banner Araña ($37.45)
                </Link>
                <Link href="/servicios/impresion-gran-formato" className="bg-gray-900 border border-gray-700 hover:border-[#FF5E14] text-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                  Banderolas Publicitarias
                </Link>
                <Link href="/servicios/impresion-gran-formato" className="bg-gray-900 border border-gray-700 hover:border-[#FF5E14] text-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                  Vinil Microperforado y Esmerilado
                </Link>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/servicios/impresion-gran-formato"
                className="inline-flex items-center space-x-2 bg-white hover:bg-[#FF5E14] text-gray-900 hover:text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-md transition-all"
              >
                <span>Ver Medidas y Precios de Banners y Gran Formato</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION - Printfix Card Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#FF5E14]">Nuestras Especialidades</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">
            Servicios de Impresión & Producción
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Cubrimos todas las necesidades gráficas de tu empresa con tecnología de punta y sustratos de primera calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_SERVICES.filter((s) => s.slug !== 'uv-dtf').map((rawService) => {
            const isDtfCombined = rawService.slug === 'dtf-textil';
            const service = isDtfCombined
              ? {
                  ...rawService,
                  title: 'Impresión DTF Textil y Stickers UV DTF 3D en Panamá',
                  shortDesc:
                    'Transfer DTF textil por metros/pliegos para estampar cualquier tela y stickers UV DTF con relieve 3D en frío para termos, vidrio, metal y acrílico.',
                  features: [
                    'DTF Textil con base blanca sólida y resistencia a +50 lavadas',
                    'Stickers UV DTF 3D con barniz brillante aplicados en frío sin plancha',
                    'Desde 1 pliego A4 sin mínimos hasta rollos por metro o yarda lineal',
                  ],
                }
              : rawService;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#FF5E14]/50 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF5E14]/10 flex items-center justify-center group-hover:bg-[#FF5E14] transition-colors">
                    {React.cloneElement((iconMap[service.iconName] || iconMap.Sparkles) as React.ReactElement, {
                      className: "w-7 h-7 text-[#FF5E14] group-hover:text-white transition-colors"
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF5E14] transition-colors font-outfit">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-gray-100">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-500 space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={service.slug === 'tomas-aereas-drones' ? '/tomas-aereas-panama' : `/servicios/${service.slug}`}
                    className="inline-flex items-center space-x-2 text-sm font-bold text-[#FF5E14] hover:text-[#E04700] transition-colors"
                  >
                    <span>{isDtfCombined ? 'Ver DTF Textil' : `Ver ${service.title.split(' en Panamá')[0]}`}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {isDtfCombined && (
                    <Link
                      href="/servicios/uv-dtf"
                      className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-gray-700 hover:text-[#FF5E14] bg-gray-100 hover:bg-[#FF5E14]/10 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <span>Ver UV DTF 3D</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 3. FEATURED PRODUCTS (WOOCOMMERCE) */}
      <section className="bg-gray-100 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF5E14]">Catálogo Mayorista para Empresas</span>
              <h2 className="text-3xl font-extrabold text-gray-900 font-outfit mt-1">
                Productos Populares en Catálogo
              </h2>
            </div>
            <Link
              href="/tienda"
              className="mt-4 md:mt-0 text-sm font-bold text-[#FF5E14] hover:text-[#E04700] flex items-center space-x-1"
            >
              <span>Ver catálogo completo (+{products.length || 170} productos)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#FF5E14]/50 hover:shadow-lg transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-52 bg-gray-200 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#0D0D0D] text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-[#FF5E14] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100">
                  <div>
                    {(() => {
                      const packs = product.pricePacks;
                      let minQty = 50;
                      let unitPrice = 0;

                      if (packs?.pack50?.total) {
                        minQty = 50;
                        unitPrice = packs.pack50.unit || (packs.pack50.total / 50);
                      } else if (packs?.pack100?.total) {
                        minQty = 100;
                        unitPrice = packs.pack100.unit || (packs.pack100.total / 100);
                      } else if (packs?.pack250?.total) {
                        minQty = 250;
                        unitPrice = packs.pack250.unit || (packs.pack250.total / 250);
                      } else {
                        unitPrice = product.price;
                      }

                      return (
                        <>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-xl font-extrabold text-gray-900 font-outfit">
                              ${unitPrice.toFixed(2)}
                            </span>
                            <span className="text-xs font-semibold text-gray-500">/ unidad</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#FF5E14] block mt-0.5">
                            Mínimo {minQty} unidades
                          </span>
                        </>
                      );
                    })()}
                  </div>
                  <span
                    className="p-2.5 bg-[#FF5E14] text-white rounded-xl group-hover:bg-[#E04700] transition-colors shadow-md shadow-[#FF5E14]/20"
                    aria-hidden="true"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* 4. ZONA PIXEL - IMPRESIONES DIGITALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A0A0A] rounded-3xl border-2 border-gray-800 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl space-y-8">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#FF5E14]/15 blur-3xl rounded-full pointer-events-none" />

          {/* Header of Zona Pixel */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-gray-800/80 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-[#FF5E14]/15 border border-[#FF5E14]/30 px-3.5 py-1 rounded-full text-xs font-extrabold text-[#FF5E14] tracking-wider uppercase">
                <Zap className="w-3.5 h-3.5 fill-[#FF5E14]" />
                <span>Zona Pixel · Impresiones Digitales</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-white leading-tight">
                ¿Solo necesitas 1 unidad o pocos metros? <span className="text-[#FF5E14]">Aquí no te exigimos paquetes de 100.</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                En nuestra tienda mayorista vendemos por volumen para empresas. Pero si estás probando una marca nueva, necesitas validar una muestra con tu cliente o te salió un evento este fin de semana, en <strong>Zona Pixel (Impresiones Digitales)</strong> compras por unidad, por metro lineal o por pliego exacto.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/cotizador"
                className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-7 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-[#FF5E14]/30 transition-all hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Entrar a Zona Pixel — Impresiones Digitales</span>
              </Link>
              <a
                href="https://wa.me/50764454084?text=Hola%20RufPixel,%20tengo%20una%20consulta%20para%20Zona%20Pixel%20Impresiones%20Digitales"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 px-6 py-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Zona Pixel Specialties - Clean Spacious 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            
            {/* Card 1: DTF Textil */}
            <div className="bg-[#141414] border border-gray-800 hover:border-[#FF5E14]/60 rounded-3xl p-6 sm:p-7 space-y-4 hover:bg-[#171717] transition-all group flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/10 text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-all flex items-center justify-center">
                    <Printer className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#FF5E14] font-bold bg-[#FF5E14]/10 px-3 py-1 rounded-full border border-[#FF5E14]/20">
                    Desde $2.94 USD
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-outfit group-hover:text-[#FF5E14] transition-colors">
                    DTF Textil Directo
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">
                    Impresión por pliego A4 o yarda lineal continua. Trae tu arte y estampa prendas al instante sin exigencia de paquetes de 100.
                  </p>
                </div>
              </div>
              <Link 
                href="/cotizador"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:text-[#E04700] pt-3 border-t border-gray-800/80 group-hover:translate-x-1 transition-all"
              >
                <span>Calcular precio en línea</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: UV DTF */}
            <div className="bg-[#141414] border border-gray-800 hover:border-[#FF5E14]/60 rounded-3xl p-6 sm:p-7 space-y-4 hover:bg-[#171717] transition-all group flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/10 text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-all flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#FF5E14] font-bold bg-[#FF5E14]/10 px-3 py-1 rounded-full border border-[#FF5E14]/20">
                    Desde $5.32 USD
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-outfit group-hover:text-[#FF5E14] transition-colors">
                    UV DTF para Rígidos
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">
                    Stickers de transferencia con relieve 3D táctil y barniz brillante. Pégalos en frío sobre termos, tazas o acrílico sin planchas.
                  </p>
                </div>
              </div>
              <Link 
                href="/cotizador"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:text-[#E04700] pt-3 border-t border-gray-800/80 group-hover:translate-x-1 transition-all"
              >
                <span>Calcular precio en línea</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Grabado Láser */}
            <div className="bg-[#141414] border border-gray-800 hover:border-[#FF5E14]/60 rounded-3xl p-6 sm:p-7 space-y-4 hover:bg-[#171717] transition-all group flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/10 text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-all flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#FF5E14] font-bold bg-[#FF5E14]/10 px-3 py-1 rounded-full border border-[#FF5E14]/20">
                    Desde 1 pieza
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-outfit group-hover:text-[#FF5E14] transition-colors">
                    Grabado Láser de Precisión
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">
                    Personalización imborrable para tu termo Stanley, vaso térmico o accesorio de madera y metal. Trae tu pieza o cotiza al detal.
                  </p>
                </div>
              </div>
              <Link 
                href="/servicios/grabados-laser"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:text-[#E04700] pt-3 border-t border-gray-800/80 group-hover:translate-x-1 transition-all"
              >
                <span>Ver detalles del servicio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 4: Stickers Personalizados */}
            <div className="bg-[#141414] border border-gray-800 hover:border-[#FF5E14]/60 rounded-3xl p-6 sm:p-7 space-y-4 hover:bg-[#171717] transition-all group flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/10 text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-all flex items-center justify-center">
                    <StickerIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#FF5E14] font-bold bg-[#FF5E14]/10 px-3 py-1 rounded-full border border-[#FF5E14]/20">
                    Packs desde $8.56
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-outfit group-hover:text-[#FF5E14] transition-colors">
                    Stickers Personalizados
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">
                    Vinil troquelado a la forma exacta de tu logo. Pide tirajes cortos para probar el empaque de tu marca antes de mandar a hacer millares.
                  </p>
                </div>
              </div>
              <Link 
                href="/cotizador"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:text-[#E04700] pt-3 border-t border-gray-800/80 group-hover:translate-x-1 transition-all"
              >
                <span>Calcular precio en línea</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 5: Papelería Comercial */}
            <div className="bg-[#141414] border border-gray-800 hover:border-[#FF5E14]/60 rounded-3xl p-6 sm:p-7 space-y-4 hover:bg-[#171717] transition-all group flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/10 text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-all flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#FF5E14] font-bold bg-[#FF5E14]/10 px-3 py-1 rounded-full border border-[#FF5E14]/20">
                    Desde 1 unidad
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-outfit group-hover:text-[#FF5E14] transition-colors">
                    Papelería Comercial
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">
                    Talonarios de factura autocopiativos desde 1 unidad, volantes satinados y tarjetas de presentación con acabado profesional para tu negocio.
                  </p>
                </div>
              </div>
              <Link 
                href="/servicios/flyers-y-folletos"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:text-[#E04700] pt-3 border-t border-gray-800/80 group-hover:translate-x-1 transition-all"
              >
                <span>Ver opciones de papelería</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 6: Banners & Roll-Ups */}
            <div className="bg-[#141414] border border-gray-800 hover:border-[#FF5E14]/60 rounded-3xl p-6 sm:p-7 space-y-4 hover:bg-[#171717] transition-all group flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/10 text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-all flex items-center justify-center">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#FF5E14] font-bold bg-[#FF5E14]/10 px-3 py-1 rounded-full border border-[#FF5E14]/20">
                    1 sola pieza lista
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-outfit group-hover:text-[#FF5E14] transition-colors">
                    Banners & Roll-Ups
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">
                    Lona gruesa de 13oz con ojales o estructura Roll-Up retráctil de aluminio con estuche de lona. Listo para armar en tu evento o stand.
                  </p>
                </div>
              </div>
              <Link 
                href="/servicios/impresion-gran-formato"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:text-[#E04700] pt-3 border-t border-gray-800/80 group-hover:translate-x-1 transition-all"
              >
                <span>Ver gran formato</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Micro Guarantee footer */}
          <div className="pt-4 border-t border-gray-800/80 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF5E14]" />
              <span>Calculas tu precio en segundos con tus medidas</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#FF5E14]" />
              <span>Despachos y retiros rápidos en taller</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
              <span>Pagos directos por Yappy Comercial y ACH Banco General</span>
            </div>
          </div>
        </div>
      </section>


      {/* 5. TESTIMONIALS & GOOGLE REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full text-xs font-bold text-amber-900">
            <span className="text-amber-500">★★★★★</span>
            <span>5,0 de 5 estrellas en <strong>Google Maps</strong> (7 Reseñas)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">
            Reseñas Reales de Clientes
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Opiniones de nuestros clientes verificados en el perfil de Google Business de <strong>RufPixel - Casa Creativa</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                    <span>Google</span>
                  </span>
                </div>
                <p className="text-gray-700 text-xs italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#FF5E14]" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 font-outfit">{t.name}</h4>
                  <span className="text-[10px] text-gray-400 flex items-center">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 mr-1" />
                    {t.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 6. GALERÍA DE TRABAJOS REALIZADOS (@rufpixel) */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF5E14]">Portafolio Real — @rufpixel</span>
              <h2 className="text-3xl font-extrabold text-gray-900 font-outfit mt-1">
                Galería de Trabajos Realizados
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Proyectos entregados con acabados profesionales en Panamá Oeste y Ciudad de Panamá.
              </p>
            </div>
            <Link
              href="/galeria"
              className="mt-4 md:mt-0 text-sm font-bold text-[#FF5E14] hover:text-[#E04700] flex items-center space-x-1"
            >
              <span>Ver galería completa de trabajos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Grabados Láser en Botellas & Termos',
                category: 'Grabados Láser',
                image: '/images/banners/banner-grabados-laser.webp',
                tag: 'Acabado Imborrable',
              },
              {
                title: 'Impresión Gran Formato & Roll-Up',
                category: 'Gran Formato',
                image: '/images/banners/banner-gran-formato.webp',
                tag: 'Lona 13oz & Tintas Eco-Solventes',
              },
              {
                title: 'Transfer UV DTF de Alta Resistencia',
                category: 'UVDTF',
                image: '/images/banners/banner-uvdtf.webp',
                tag: 'Relieve Táctil & Full Color',
              },
              {
                title: 'Stickers Troquelados Personalizados',
                category: 'Stickers',
                image: '/images/banners/banner-stickers.webp',
                tag: 'Vinil Impermeable',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 group hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0D0D0D]/90 backdrop-blur-sm text-[#FF5E14] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-gray-800">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-gray-400 font-medium">{item.tag}</span>
                  <h3 className="font-bold text-gray-900 text-sm font-outfit group-hover:text-[#FF5E14] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="p-5 pt-0">
                  <Link
                    href="/galeria"
                    className="text-xs font-bold text-[#FF5E14] hover:text-[#E04700] flex items-center space-x-1"
                  >
                    <span>Ver proyecto</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
