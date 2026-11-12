import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { MOCK_SERVICES } from '@/lib/mockData';
import { CheckCircle2, ArrowLeft, ArrowRight, PhoneCall, Calculator, ShieldCheck, Truck, Layers, Building2, User, HelpCircle, AlertTriangle, Check, Sparkles } from 'lucide-react';
import { FAQPageSchema } from '@/components/seo/SchemaOrg';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = MOCK_SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Servicio no encontrado — RufPixel Panamá' };
  
  return {
    title: service.metaTitle || `${service.title} | RufPixel Panamá`,
    description: service.metaDesc || service.shortDesc,
    alternates: {
      canonical: `https://rufpixel.com/servicios/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDesc || service.shortDesc,
      url: `https://rufpixel.com/servicios/${service.slug}`,
      siteName: 'RufPixel',
      locale: 'es_PA',
      type: 'article',
      images: [
        {
          url: service.image.startsWith('http') ? service.image : `https://rufpixel.com${service.image}`,
          alt: service.title,
        },
      ],
    },
  };
}

export default function ServicioDetailPage({ params }: { params: { slug: string } }) {
  if (params.slug === 'tomas-aereas-drones') {
    redirect('/tomas-aereas-panama');
  }

  const service = MOCK_SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://rufpixel.com/servicios/${service.slug}#service`,
    name: service.title,
    description: service.metaDesc || service.shortDesc,
    serviceType: service.title,
    provider: {
      '@type': 'LocalBusiness',
      name: 'RufPixel - Casa Creativa',
      telephone: '+507 6445-4084',
      url: 'https://rufpixel.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Arnoldo Cano, Barrio Colón, entrando por COMASA, Local 1',
        addressLocality: 'La Chorrera',
        addressRegion: 'Panamá Oeste',
        addressCountry: 'PA',
      },
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Panamá Oeste' },
      { '@type': 'AdministrativeArea', name: 'Ciudad de Panamá' },
      { '@type': 'Country', name: 'Panamá' },
    ],
    offers: service.slug === 'impresion-gran-formato'
      ? {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '9.63',
          highPrice: '315.65',
          offerCount: '8',
          availability: 'https://schema.org/InStock',
          url: `https://rufpixel.com/servicios/${service.slug}`,
        }
      : {
          '@type': 'Offer',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `https://rufpixel.com/servicios/${service.slug}`,
        },
    ...(service.slug === 'impresion-gran-formato'
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Catálogo de Impresión de Banners y Gran Formato en Panamá',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Product', name: 'Banner Lona 13oz con Ojales (24" x 36")' },
                price: '9.63',
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Product', name: 'Banner Araña / X-Banner (24" x 63" / 60x160 cm) con Estructura' },
                price: '37.45',
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Product', name: 'Banner Roll-Up Standard Retráctil Aluminio (33" x 79" / 85x200 cm)' },
                price: '69.55',
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Product', name: 'Banderola Publicitaria Feather Flag 8.5ft con Estructura y Base' },
                price: '105.93',
                priceCurrency: 'USD',
              },
            ],
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://rufpixel.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Servicios',
        item: 'https://rufpixel.com/servicios',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://rufpixel.com/servicios/${service.slug}`,
      },
    ],
  };

  return (
    <div className="py-10 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#FF5E14] transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/servicios" className="hover:text-[#FF5E14] transition-colors">Servicios</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">{service.title}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image, Pitch, Dual Segments, Features */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Visual Banner */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-80 sm:h-96 relative bg-gray-900">
            <img 
              src={service.image} 
              alt={
                service.slug === 'grabados-laser'
                  ? 'Vasos térmicos de acero negro, blanco y plateado con logo corporativo grabado a láser'
                  : service.slug === 'impresion-gran-formato'
                  ? 'Cuatro roll-up banners impresos para un evento, impresión de gran formato en Panamá'
                  : service.title
              }
              title={
                service.slug === 'grabados-laser'
                  ? 'Vasos térmicos con grabado láser'
                  : service.slug === 'impresion-gran-formato'
                  ? 'Roll-up banners para evento'
                  : service.title
              }
              width={service.slug === 'impresion-gran-formato' ? 1400 : 1050}
              height={service.slug === 'impresion-gran-formato' ? 1050 : 1400}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="inline-block bg-[#FF5E14] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                Producción en Panamá
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-outfit leading-tight drop-shadow-sm">
                {service.title}
              </h1>
            </div>
          </div>

          {/* Core Service Narrative (Anti-AI Copy) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-extrabold text-gray-900 font-outfit">
              Solución Directa para tu Negocio o Marca
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* DUAL SEGMENT: Al Detal (Zona Pixel) vs Al Por Mayor (Corporativo) */}
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14]">
                Opciones de Compra Flexibles
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 font-outfit">
                Elige tu Modalidad de Pedido
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Al Detal & Pymes */}
              <div className="bg-gradient-to-br from-blue-50/50 to-white p-6 rounded-3xl border-2 border-blue-200 shadow-sm flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 mr-1" />
                      <span>Al Detal / Zona Pixel</span>
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Sin Mínimos
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 font-outfit">
                    Pedidos Unitarios & Muestras
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Ideal para probar materiales, personalizaciones personales, regalos exclusivos o pedidos de pocas piezas sin comprometer tu presupuesto.
                  </p>

                  <ul className="space-y-2 text-xs text-gray-700 pt-2 border-t border-blue-100">
                    {(service.detalFeatures || [
                      'Desde 1 sola pieza o pliego',
                      'Atención rápida y validación digital',
                      'Entrega o retiro en taller'
                    ]).map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/50764454084?text=${encodeURIComponent(`Hola RufPixel, necesito cotizar AL DETAL / POCAS UNIDADES el servicio de ${service.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 text-center"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Cotizar al Detal en WhatsApp</span>
                </a>
              </div>

              {/* Card 2: Al Por Mayor & Empresas */}
              <div className="bg-gradient-to-br from-amber-50/50 to-white p-6 rounded-3xl border-2 border-amber-200 shadow-sm flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#FF5E14] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5 mr-1" />
                      <span>Al Por Mayor / B2B</span>
                    </span>
                    <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                      Descuento por Volumen
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 font-outfit">
                    Producción por Lotes & Corporativo
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Diseñado para dotaciones de uniformes, marcas de moda, distribuidores y eventos corporativos con los costos unitarios más competitivos.
                  </p>

                  <ul className="space-y-2 text-xs text-gray-700 pt-2 border-t border-amber-100">
                    {(service.wholesaleFeatures || [
                      'Escalas de precios por volumen',
                      'Facturación fiscal panameña',
                      'Envíos programados a todo el país'
                    ]).map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/50764454084?text=${encodeURIComponent(`Hola RufPixel, necesito cotizar AL POR MAYOR / VOLUMEN para empresa el servicio de ${service.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FF5E14] hover:bg-[#E04700] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md shadow-[#FF5E14]/20 transition-all flex items-center justify-center space-x-2 text-center"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Cotizar Mayorista en WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 font-outfit flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#FF5E14]" />
              <span>Especificaciones y Garantía de Producción</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700 pt-2">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FOTOS REALES DE TRABAJOS EN TALLER (GRABADOS LÁSER) */}
          {service.slug === 'grabados-laser' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14]">
                  Portafolio en Taller
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 font-outfit">
                  Trabajos de Grabado Láser Realizados en Panamá
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <figure className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img
                    src="/images/trabajos/vasos-termicos-negros-grabado-laser-escudo-llavero-boligrafo-panama.jpg"
                    alt="Vasos térmicos negros con escudo grabado a láser, llavero y bolígrafo personalizados"
                    title="Vasos térmicos con escudo grabado"
                    width={1050}
                    height={1400}
                    loading="lazy"
                    className="w-full h-72 object-cover"
                  />
                  <figcaption className="p-3.5 text-xs text-gray-700 font-medium">
                    Vasos térmicos negros con escudo grabado a láser, llavero y bolígrafo personalizados.
                  </figcaption>
                </figure>
                <figure className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img
                    src="/images/trabajos/botellas-termicas-negras-grabado-laser-logo-panama.jpg"
                    alt="Botellas térmicas negras con logo grabado a láser para empresa en Panamá"
                    title="Botellas térmicas con grabado láser"
                    width={1050}
                    height={1400}
                    loading="lazy"
                    className="w-full h-72 object-cover"
                  />
                  <figcaption className="p-3.5 text-xs text-gray-700 font-medium">
                    Botellas térmicas negras con logo grabado a láser para empresa en Panamá.
                  </figcaption>
                </figure>
              </div>
            </div>
          )}

          {/* FOTO REAL SECUNDARIA EN TALLER (IMPRESIÓN GRAN FORMATO) */}
          {service.slug === 'impresion-gran-formato' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14]">
                    Producción Real en Taller
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900 font-outfit">
                    Roll-Up Banners Institucionales Entregados en Panamá
                  </h3>
                </div>
                <Link href="/galeria" className="text-xs font-extrabold text-[#FF5E14] hover:underline">
                  Ver más en Galería →
                </Link>
              </div>
              <figure className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src="/images/trabajos/roll-up-banners-institucionales-gran-formato-panama.jpg"
                  alt="Dos roll-up banners institucionales impresos en gran formato, Panamá"
                  title="Roll-up banners institucionales"
                  width={1050}
                  height={1400}
                  loading="lazy"
                  className="w-full max-h-[460px] object-cover"
                />
                <figcaption className="p-3.5 text-xs text-gray-700 font-medium">
                  Dos roll-up banners institucionales de 0.85 × 2.00 m impresos en gran formato listos para entrega.
                </figcaption>
              </figure>
            </div>
          )}

          {/* BLOQUE PROFUNDO EXCLUSIVO PARA GRAN FORMATO, BANNERS, BANDEROLAS, ROLL-UP Y VINILES (2,290 búsquedas/mes en Panamá) */}
          {service.slug === 'impresion-gran-formato' && (
            <div className="space-y-8">
              <FAQPageSchema
                questions={[
                  {
                    question: '¿Qué medidas estándar tienen los Roll-Up y los Banners tipo Araña en Panamá?',
                    answer: 'El Roll-Up retráctil estándar de aluminio mide 0.85 × 2.00 metros (también disponible en 1.00 × 2.00 m) e incluye la impresión instalada y maletín de lona acolchado. El Banner tipo Araña (X-Banner) se trabaja en medidas de 0.60 × 1.60 metros y 0.80 × 1.80 metros con 4 ojales esquineros.'
                  },
                  {
                    question: '¿Qué diferencia hay entre el vinil adhesivo normal, el microperforado y el vinil esmerilado para vidrios?',
                    answer: 'El vinil adhesivo (brillante o mate) cubre el cristal por completo con colores sólidos. El vinil microperforado permite ver la publicidad impresa desde afuera mientras conserva la visibilidad y paso de luz desde el interior del local o vehículo. El papel o vinil esmerilado (sandblasting) crea un efecto translúcido satinado de privacidad ideal para divisiones de vidrio en oficinas y clínicas en Panamá.'
                  },
                  {
                    question: '¿Producen banderolas publicitarias, backing y manteles para ferias en Panamá?',
                    answer: 'Sí. Producimos banderolas publicitarias tipo gota y tipo vela en tela sublimada resistente al viento con asta flexible y base, así como estructuras de backing publicitario y manteles impresos para mesas plegables de 6 pies ideales para stands de congresos y ferias.'
                  },
                  {
                    question: '¿En qué formato debo enviar el diseño para un banner o Roll-Up sin que salga pixelado?',
                    answer: 'Para impresión en gran formato recomendamos enviar archivos en PDF, TIFF o AI a tamaño real (escala 1:1) con una resolución entre 100 y 150 DPI en modo de color CMYK y textos convertidos a curvas.'
                  }
                ]}
              />

              {/* Regla 9 & Regla 8: Lo esencial + Honestidad Radical */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 text-amber-900 font-extrabold uppercase tracking-wider text-xs">
                    <Sparkles className="w-4 h-4 text-[#FF5E14]" />
                    <span>Lo esencial, por si no lees todo</span>
                  </div>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Todo para tu local o evento:</strong> Lonas banner 13oz con ojales, Roll-Up, Banner Araña, Banderolas, Backing, Manteles y Viniles.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Desde 1 unidad o por m²:</strong> Pide un solo Roll-Up para tu evento o cotiza tirajes mayoristas en pie² / m².</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Tintas para clima panameño:</strong> Alta resistencia a rayos UV, humedad y lluvia tropical.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50/60 border border-red-200 rounded-3xl p-6 space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 text-red-900 font-extrabold uppercase tracking-wider text-xs">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Lo que este servicio NO resuelve</span>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>No vendemos rollos de materia prima en blanco para otras imprentas:</strong> Entregamos la lona, el vinil o la estructura 100% impresa y terminada con tu diseño.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>No realizamos obra civil de herrería pesada ni vallas de carretera en altura</strong> con grúa; nos especializamos en impresión gráfica, displays portátiles y viniles.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Los 4 Sub-Clústeres de Gran Formato en Panamá */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-extrabold text-gray-900 font-outfit">
                  Soluciones de Gran Formato, Displays y Viniles en Panamá
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-gray-900 font-outfit">
                      1. Banderolas Publicitarias Tipo Gota y Vela en Panamá
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Las <strong>banderolas publicitarias</strong> (tipo pluma, vela o gota) de 2.5 m a 4.5 m de altura son el imán visual número uno para fachadas de negocios, ferias, concesionarios, playas y eventos deportivos en Panamá. Incluyen tela sublimada resistente al viento, asta desarmable de fibra/aluminio y base tipo estaca o cruceta.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-gray-900 font-outfit">
                      2. Roll-Up, Banner Araña, Backing y Manteles para Ferias
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Equipa tu stand para congresos y activaciones en minutos: <strong>estructuras Roll-Up retráctiles de aluminio</strong> (0.85 × 2.00 m), <strong>Banner Araña (X-Banner)</strong> económico, <strong>backing publicitario</strong> para fondos de fotos o ruedas de prensa y <strong>manteles personalizados para mesas plegables</strong> de 6 pies.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-gray-900 font-outfit">
                      3. Vinil Adhesivo, Microperforado y Esmerilado para Vidrios
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Transformamos las vidrieras de tu local u oficina en Panamá: <strong>vinil adhesivo brillante o mate</strong> de alta adherencia, <strong>vinil microperforado para vidrios</strong> (visibilidad unidireccional homologada para fachadas y flotas) y <strong>vinil o papel esmerilado para vidrios</strong> (efecto sandblasting de privacidad con corte de logotipo en plotter).
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-gray-900 font-outfit">
                      4. Impresión de Banners en Lona 13oz y Gigantografías
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Impresión de <strong>banners en Panamá</strong> sobre lona vinílica reforzada de 13 onzas con acabado brillante o mate, termosellado perimetral de refuerzo, <strong>ojales metálicos inoxidables</strong> cada 50 cm o bolsillos para tubo. Ideal para anuncios de "Se Vende / Se Alquila", aperturas comerciales y pasacalles.
                    </p>
                  </div>
                </div>

                {/* Tabla Técnica de Medidas y Materiales */}
                <div className="pt-2 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0D0D0D] text-white">
                        <th className="p-3.5 rounded-tl-xl font-extrabold">Producto / Estructura</th>
                        <th className="p-3.5 font-extrabold">Medida Estándar</th>
                        <th className="p-3.5 font-extrabold">Material e Impresión</th>
                        <th className="p-3.5 rounded-tr-xl font-extrabold">Acabado Incluido</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900">Banner Roll-Up Aluminio</td>
                        <td className="p-3.5">0.85 × 2.00 m (33" × 79")</td>
                        <td className="p-3.5">Lona lisa / Pet Banner anti-curling</td>
                        <td className="p-3.5">Casete retráctil + bolso de lona</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900">Banner Araña (X-Banner)</td>
                        <td className="p-3.5">0.60 × 1.60 m / 0.80 × 1.80 m</td>
                        <td className="p-3.5">Lona Banner 13oz full color</td>
                        <td className="p-3.5">4 ojales + estructura + funda</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900">Banderolas Publicitarias</td>
                        <td className="p-3.5">Alturas de 2.5 m, 3.5 m y 4.5 m</td>
                        <td className="p-3.5">Tela bandera sublimada lavable</td>
                        <td className="p-3.5">Mástil flexible + base + bolso</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900">Lona Banner Exterior</td>
                        <td className="p-3.5">A medida por pie² o m²</td>
                        <td className="p-3.5">Lona reforzada 13oz UV/Ecosolvente</td>
                        <td className="p-3.5">Refuerzo perimetral y ojales</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900">Vinil / Microperforado / Esmerilado</td>
                        <td className="p-3.5">A medida según vidriera</td>
                        <td className="p-3.5">Vinil PVC polimérico / Esmerilado</td>
                        <td className="p-3.5">Impresión HD o troquelado en plotter</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900">Mantel Publicitario de Feria</td>
                        <td className="p-3.5">Para mesa plegable de 6 pies (1.83 m)</td>
                        <td className="p-3.5">Tela poliéster sublimada full color</td>
                        <td className="p-3.5">Caída en 3 o 4 lados lavable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Preguntas Frecuentes visibles de Gran Formato */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 text-[#FF5E14]">
                  <HelpCircle className="w-5 h-5" />
                  <h2 className="text-xl font-extrabold text-gray-900 font-outfit">
                    Preguntas Frecuentes sobre Banners, Roll-Up y Viniles en Panamá
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
                    <h3 className="font-bold text-sm text-gray-900 font-outfit">
                      ¿Qué medidas estándar tienen los Roll-Up y los Banners tipo Araña?
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      El Roll-Up retráctil de aluminio mide 0.85 × 2.00 m e incluye la lona instalada y estuche de transporte. El Banner Araña se trabaja en 0.60 × 1.60 m y 0.80 × 1.80 m. También puedes leer nuestra comparativa:{' '}
                      <Link href="/blog/rollup-vs-banner-arana-cual-elegir-para-tu-evento" className="text-[#FF5E14] font-bold underline">
                        Roll-Up vs Banner Araña para eventos
                      </Link>.
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
                    <h3 className="font-bold text-sm text-gray-900 font-outfit">
                      ¿Qué diferencia hay entre vinil adhesivo, microperforado y esmerilado?
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      El vinil adhesivo es opaco (brillante o mate); el microperforado permite ver hacia afuera desde el interior del local o vehículo; y el vinil esmerilado da privacidad satinada elegante en divisiones de vidrio de oficinas y clínicas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bloque de Enlazado Interno SILO hacia Página Pilar de Artículos Promocionales */}
          <div className="bg-[#0D0D0D] text-white p-6 sm:p-8 rounded-3xl border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 text-xs sm:text-sm text-gray-300">
              <span className="text-[#FF5E14] font-extrabold uppercase tracking-wider text-xs block">
                Complementa tu Pedido Corporativo
              </span>
              <p className="leading-relaxed">
                ¿Necesitas también dotación con tu logo para tu evento o empresa? Explora nuestro catálogo de{' '}
                <Link href="/articulos-promocionales-panama" className="text-white font-extrabold underline decoration-[#FF5E14] hover:text-[#FF5E14]">
                  artículos promocionales en Panamá
                </Link>{' '}
                con 166 productos desde 50 unidades:{' '}
                <Link href="/tienda/tazas-botellas-y-termos" className="text-gray-200 underline hover:text-[#FF5E14]">termos</Link>,{' '}
                <Link href="/tienda/boligrafos-y-plumas" className="text-gray-200 underline hover:text-[#FF5E14]">bolígrafos</Link>,{' '}
                <Link href="/tienda/libretas-y-cuadernos" className="text-gray-200 underline hover:text-[#FF5E14]">agendas</Link>,{' '}
                <Link href="/tienda/bolsas-y-totes" className="text-gray-200 underline hover:text-[#FF5E14]">bolsas de manta sucia</Link> y{' '}
                <Link href="/tienda/identificacion-y-correas" className="text-gray-200 underline hover:text-[#FF5E14]">lanyards</Link>.
              </p>
            </div>
            <Link
              href="/articulos-promocionales-panama"
              className="shrink-0 bg-[#FF5E14] hover:bg-[#E04700] text-white px-5 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2"
            >
              <span>Ver Promocionales B2B</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Right Sidebar: Quick Contact & Trust Box */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-[#0D0D0D] text-white p-7 rounded-3xl border border-gray-800 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#FF5E14]">
                Atención Rápida
              </span>
              <h3 className="text-xl font-bold font-outfit text-white">
                ¿Tienes dudas con tu archivo o cotización?
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Envía tu logotipo o arte por WhatsApp para una revisión técnica gratuita de resolución y tamaño antes de imprimir.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={`https://wa.me/50764454084?text=${encodeURIComponent(`Hola RufPixel, quisiera asesoría técnica y cotización rápida para ${service.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FF5E14] hover:bg-[#E04700] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Hablar con un Asesor (+507 6445-4084)</span>
              </a>

              <Link
                href="/cotizador"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 px-4 rounded-xl font-semibold text-sm border border-gray-700 flex items-center justify-center space-x-2 transition-colors"
              >
                <Calculator className="w-5 h-5 text-gray-400" />
                <span>Calculadora Online Zona Pixel</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-800 text-xs text-gray-300 space-y-3">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-[#FF5E14] shrink-0" />
                <span>Pagos directos por <strong>Yappy Comercial</strong> o ACH</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Truck className="w-4 h-4 text-[#FF5E14] shrink-0" />
                <span>Envíos a <strong>Ciudad de Panamá y Provincias</strong></span>
              </div>
              <div className="text-[11px] text-gray-400 pt-2 border-t border-gray-800/80">
                📍 <strong>Taller:</strong> Calle Arnoldo Cano, Barrio Colón (entrando por COMASA, Local 1), La Chorrera, Panamá Oeste.
              </div>
            </div>
          </div>

          {/* Return link */}
          <div className="text-center">
            <Link
              href="/servicios"
              className="inline-flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-[#FF5E14] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver todos los servicios de impresión</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
