import React from 'react';
import Link from 'next/link';
import { MOCK_SERVICES } from '@/lib/mockData';
import { CreditCard, Maximize2, FileText, Tag, Gift, CheckCircle2, ArrowRight, Sparkles, Printer, Shirt, Video } from 'lucide-react';

export const metadata = {
  title: 'Imprenta en Panamá al Por Mayor y Detal | RufPixel',
  description: 'Bordados en Panamá, impresión DTF textil, stickers UV DTF, grabado láser de termos y banners roll-up. Cotiza al detal o lotes mayoristas con envíos.',
  alternates: {
    canonical: 'https://rufpixel.com/servicios',
  },
  openGraph: {
    title: 'Imprenta en Panamá al Por Mayor y Detal | RufPixel',
    description: 'Bordados en Panamá, impresión DTF textil, stickers UV DTF, grabado láser de termos y banners roll-up. Cotiza al detal o lotes mayoristas con envíos.',
    url: 'https://rufpixel.com/servicios',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default function ServiciosPage() {
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
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <section className="bg-[#0D0D0D] text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            Producción en Panamá — Al Por Mayor & Detal
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit">
            Servicios de Impresión, DTF & Bordados en Panamá
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            Producción gráfica y personalización directa desde nuestro taller en La Chorrera con envíos a todo Panamá. Pide desde 1 sola pieza en Zona Pixel hasta grandes tirajes mayoristas con escala de descuentos.
          </p>
        </div>
      </section>

      {/* Services Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {MOCK_SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className={`bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden h-64 lg:h-80 relative border border-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex p-3 bg-[#FF5E14]/10 rounded-2xl">
                  {iconMap[service.iconName]}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.fullDesc}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Características Incluidas:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href={service.slug === 'tomas-aereas-drones' ? '/tomas-aereas-panama' : `/servicios/${service.slug}`}
                    className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md shadow-[#FF5E14]/20 transition-all flex items-center space-x-2"
                  >
                    <span>{service.slug === 'tomas-aereas-drones' ? 'Ver Landing Dedicada de Tomas Aéreas' : `Ver Detalles de ${service.title}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {service.slug === 'tomas-aereas-drones' ? (
                    <a
                      href="https://wa.me/50764454084?text=Hola%20RufPixel,%20quisiera%20cotizar%20un%20servicio%20de%20tomas%20aereas%20con%20drone%20en%20Panam%C3%A1."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-sm font-semibold border border-gray-800 transition-all flex items-center space-x-2"
                    >
                      Cotizar Vuelo en WhatsApp
                    </a>
                  ) : (
                    <Link
                      href="/cotizador"
                      className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-sm font-semibold border border-gray-800 transition-all"
                    >
                      Cotizar con Medidas
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Kits Ejecutivos & Merchandising Corporativo B2B */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-[#0A0A0A] rounded-3xl border border-gray-800 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#FF5E14]/15 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/15 border border-[#FF5E14]/30 px-3.5 py-1 rounded-full">
                Soluciones B2B & Regalos Corporativos
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white">
                Kits Ejecutivos, Onboarding & Merchandising para Empresas
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Personalizamos sets completos de oficina, bienvenida a colaboradores y regalos para clientes VIP combinando grabado láser, papelería institucional y vajilla promocional con acabados de primera clase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Kit Ejecutivo con Tarjeta RufPixel */}
              <div className="bg-[#141414] border border-gray-800 rounded-3xl overflow-hidden group hover:border-[#FF5E14]/60 transition-all flex flex-col justify-between shadow-lg">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img
                    src="/images/services/kit-ejecutivo-corporativo-rufpixel.webp"
                    alt="Kit Ejecutivo Corporativo con Bolígrafo Metálico, USB y Tarjeta RufPixel"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#0D0D0D]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#FF5E14] border border-[#FF5E14]/30 shadow-md">
                    Set de Oficina & Onboarding
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-xl font-bold font-outfit text-white group-hover:text-[#FF5E14] transition-colors">
                    Packs Ejecutivos y Regalos Institucionales
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Armamos kits con libreta ejecutiva, bolígrafo metálico grabado a láser, memorias USB corporativas y tarjetas de presentación de alto impacto.
                  </p>
                  <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                    <Link
                      href="/tienda"
                      className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:text-[#E04700] transition-colors"
                    >
                      <span>Ver modelos en catálogo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href="https://wa.me/50764454084?text=Hola%20RufPixel,%20deseo%20cotizar%20kits%20ejecutivos%20para%20mi%20empresa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                    >
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: Línea de Tazas y Drinkware */}
              <div className="bg-[#141414] border border-gray-800 rounded-3xl overflow-hidden group hover:border-[#FF5E14]/60 transition-all flex flex-col justify-between shadow-lg">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img
                    src="/images/services/tazas-personalizadas-sublimacion-panama.webp"
                    alt="Tazas Personalizadas con Logotipos Corporativos para Empresas y Eventos"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#0D0D0D]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#FF5E14] border border-[#FF5E14]/30 shadow-md">
                    Drinkware & Promocionales
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-xl font-bold font-outfit text-white group-hover:text-[#FF5E14] transition-colors">
                    Tazas Cerámicas y Mugs para Eventos
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Personalización en sublimación full color y UV DTF con acabado brillante resistente a lavados para campañas publicitarias, ferias y cafeterías.
                  </p>
                  <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                    <Link
                      href="/tienda/tazas"
                      className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:text-[#E04700] transition-colors"
                    >
                      <span>Ver tazas en la tienda</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href="https://wa.me/50764454084?text=Hola%20RufPixel,%20deseo%20cotizar%20tazas%20personalizadas%20al%20por%20mayor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                    >
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
