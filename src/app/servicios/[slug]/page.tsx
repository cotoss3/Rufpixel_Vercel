import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { MOCK_SERVICES } from '@/lib/mockData';
import { CheckCircle2, ArrowLeft, PhoneCall, Calculator, ShieldCheck, Truck, Layers, Building2, User } from 'lucide-react';

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
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://rufpixel.com/servicios/${service.slug}`,
    },
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
              alt={service.title} 
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
