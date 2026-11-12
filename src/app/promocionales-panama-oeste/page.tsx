import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  MapPin, PhoneCall, Clock, CheckCircle2, ArrowRight,
  Sparkles, HelpCircle, AlertTriangle, Check, Tag, Printer, Shirt, Maximize2
} from 'lucide-react';
import { BreadcrumbListSchema, FAQPageSchema } from '@/components/seo/SchemaOrg';

export const metadata: Metadata = {
  title: 'Imprenta, Bordados y Promocionales La Chorrera | RufPixel',
  description: 'Imprenta en La Chorrera y Panamá Oeste: bordados, banners, DTF y artículos promocionales con logo en Barrio Colón (COMASA). Pagos por Yappy y ACH.',
  alternates: {
    canonical: 'https://rufpixel.com/promocionales-panama-oeste',
  },
  openGraph: {
    title: 'Imprenta, Bordados y Promocionales La Chorrera | RufPixel',
    description: 'Imprenta en La Chorrera y Panamá Oeste: bordados, banners, DTF y artículos promocionales con logo en Barrio Colón (COMASA). Pagos por Yappy y ACH.',
    url: 'https://rufpixel.com/promocionales-panama-oeste',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imprenta, Bordados y Promocionales La Chorrera | RufPixel',
    description: 'Imprenta en La Chorrera y Panamá Oeste: bordados, banners, DTF y artículos promocionales con logo en Barrio Colón (COMASA). Pagos por Yappy y ACH.',
  },
};

export default function PromocionalesPanamaOestePage() {
  const breadcrumbs = [
    { name: 'Inicio', url: 'https://rufpixel.com' },
    { name: 'Artículos Promocionales en Panamá', url: 'https://rufpixel.com/articulos-promocionales-panama' },
    { name: 'Imprenta y Promocionales en La Chorrera y Panamá Oeste', url: 'https://rufpixel.com/promocionales-panama-oeste' },
  ];

  const faqs = [
    {
      question: '¿Dónde queda exactamente el taller de RufPixel en La Chorrera?',
      answer: 'Nuestro taller y punto de atención está ubicado en Calle Arnoldo Cano, Barrio Colón, entrando por COMASA, Local 1, La Chorrera, provincia de Panamá Oeste. Contamos con fácil acceso para retiro de pedidos o recepción de prendas.'
    },
    {
      question: '¿Puedo retirar mis pedidos directamente en el local de La Chorrera sin pagar envío?',
      answer: 'Sí. Si tu negocio o residencia está en La Chorrera, Costa Verde, Arraiján, Vista Alegre o Capira, puedes retirar tus impresiones DTF, bordados, banners, Roll-Up o artículos promocionales directamente en nuestro taller de Barrio Colón.'
    },
    {
      question: '¿Hacen bordados y estampados desde 1 sola pieza en La Chorrera?',
      answer: 'Sí. En nuestro taller de La Chorrera atendemos tanto pedidos unitarios al detal (bordar 1 polo o gorra, imprimir 1 pliego de DTF o grabar 1 termo Stanley a láser) como lotes mayoristas de 50, 100 y 250 unidades para empresas, colegios y clínicas de Panamá Oeste.'
    },
    {
      question: '¿Cuáles son los horarios de atención y métodos de pago en el taller?',
      answer: 'Atendemos de lunes a viernes de 9:00 AM a 5:00 PM y sábados de 9:00 AM a 2:00 PM. Aceptamos pagos vía Yappy Comercial (+507 6445-4084) y transferencia bancaria ACH.'
    }
  ];

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://rufpixel.com/promocionales-panama-oeste#localbusiness',
    name: 'RufPixel — Imprenta, Bordados y Artículos Promocionales en La Chorrera',
    telephone: '+507 6445-4084',
    url: 'https://rufpixel.com/promocionales-panama-oeste',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Arnoldo Cano, Barrio Colón, entrando por COMASA, Local 1',
      addressLocality: 'La Chorrera',
      addressRegion: 'Panamá Oeste',
      addressCountry: 'PA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.8803,
      longitude: -79.7833,
    },
    areaServed: ['La Chorrera', 'Arraiján', 'Costa Verde', 'Vista Alegre', 'Capira', 'Chame', 'San Carlos', 'Panamá Oeste'],
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <BreadcrumbListSchema items={breadcrumbs} />
      <FAQPageSchema questions={faqs} />

      {/* HERO LOCAL */}
      <section className="bg-[#0D0D0D] text-white py-14 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-[#FF5E14] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/articulos-promocionales-panama" className="hover:text-[#FF5E14] transition-colors">
              Artículos Promocionales en Panamá
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">La Chorrera y Panamá Oeste</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="inline-flex items-center space-x-2 text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3.5 py-1.5 rounded-lg">
                <MapPin className="w-3.5 h-3.5" />
                <span>Taller Propio en Barrio Colón (Entrando por COMASA) · La Chorrera</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit leading-tight">
                Imprenta, Bordados, Banners y Artículos Promocionales en La Chorrera y Panamá Oeste
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Evita el tráfico hacia la capital: produce directamente en nuestro taller de <strong>La Chorrera, Panamá Oeste</strong>. Atendemos comercios, plazas de Costa Verde, colegios, clínicas e industrias en Arraiján, La Chorrera, Capira y Chame con <strong>impresión de banners en gran formato, bordados computarizados, DTF textil, grabado láser y 166 artículos promocionales con logo</strong>.
              </p>

              <div className="flex flex-wrap gap-3.5 pt-2">
                <a
                  href="https://wa.me/50764454084?text=Hola%20RufPixel,%20estoy%20en%20La%20Chorrera%20/%20Panam%C3%A1%20Oeste%20y%20quiero%20cotizar%20un%20pedido."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-xl text-sm font-extrabold shadow-lg transition-all flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Escribir al Taller (+507 6445-4084)</span>
                </a>
                <Link
                  href="/articulos-promocionales-panama"
                  className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3.5 rounded-xl text-sm font-extrabold shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Ver Catálogo de Promocionales</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-gray-900 border border-gray-800 rounded-3xl p-6 space-y-3 text-xs text-gray-300">
              <div className="text-[#FF5E14] font-extrabold uppercase tracking-wider text-xs border-b border-gray-800 pb-2">
                Datos del Taller en La Chorrera
              </div>
              <p className="leading-relaxed">
                <strong className="text-white block">Dirección Física:</strong>
                Calle Arnoldo Cano, Barrio Colón, entrando por COMASA, Local 1, La Chorrera, Panamá Oeste.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white block">Horario de Atención:</strong>
                Lun - Vie: 9:00 AM a 5:00 PM | Sáb: 9:00 AM a 2:00 PM.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white block">Cobertura Local Directa:</strong>
                La Chorrera Centro, Costa Verde, Market Plaza, Arraiján, Vista Alegre, Brisas del Golf Arraiján, Capira, Chame y Coronado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* SERVICIOS LOCALES EN LA CHORRERA */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
            ¿Qué Producimos en Nuestro Taller de La Chorrera?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-3 shadow-sm">
              <Shirt className="w-7 h-7 text-[#FF5E14]" />
              <h3 className="text-lg font-extrabold text-gray-900 font-outfit">
                Bordados en La Chorrera
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bordado computarizado de polos, camisas tipo Columbia, gorras y uniformes escolares o empresariales desde 1 pieza o por lote.
              </p>
              <Link href="/servicios/bordados-computarizados" className="inline-flex items-center space-x-1 text-xs font-extrabold text-[#FF5E14] hover:underline">
                <span>Ver Bordados</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-3 shadow-sm">
              <Maximize2 className="w-7 h-7 text-[#FF5E14]" />
              <h3 className="text-lg font-extrabold text-gray-900 font-outfit">
                Banners, Roll-Up y Viniles
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Lonas banner 13oz con ojales, estructuras Roll-Up, banderolas publicitarias y vinil adhesivo, microperforado o esmerilado para locales en Costa Verde y La Chorrera.
              </p>
              <Link href="/servicios/impresion-gran-formato" className="inline-flex items-center space-x-1 text-xs font-extrabold text-[#FF5E14] hover:underline">
                <span>Ver Gran Formato</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-3 shadow-sm">
              <Printer className="w-7 h-7 text-[#FF5E14]" />
              <h3 className="text-lg font-extrabold text-gray-900 font-outfit">
                DTF Textil y UV DTF 3D
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Impresión de pliegos y metros lineales de DTF textil y stickers UV DTF en relieve 3D listos para retirar en taller el mismo día o al día siguiente según cola.
              </p>
              <Link href="/servicios/dtf-textil" className="inline-flex items-center space-x-1 text-xs font-extrabold text-[#FF5E14] hover:underline">
                <span>Ver Impresión DTF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-3 shadow-sm">
              <Sparkles className="w-7 h-7 text-[#FF5E14]" />
              <h3 className="text-lg font-extrabold text-gray-900 font-outfit">
                Grabado Láser y Promocionales
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Grabado láser en termos, vasos térmicos, plumas y tablas de bambú, más 166 artículos promocionales al por mayor desde 50 unidades.
              </p>
              <Link href="/articulos-promocionales-panama" className="inline-flex items-center space-x-1 text-xs font-extrabold text-[#FF5E14] hover:underline">
                <span>Ver Promocionales</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQS LOCALES */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-[#FF5E14]">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-2xl font-extrabold text-gray-900 font-outfit">
              Preguntas Frecuentes — Taller en La Chorrera, Panamá Oeste
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-sm text-gray-900 font-outfit">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
