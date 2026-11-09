import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Video, Camera, ShieldCheck, CheckCircle2, PhoneCall, ArrowRight, 
  Clock, MapPin, Building2, Home, Film, Sparkles, AlertCircle, 
  HelpCircle, ChevronDown, Check, Download, Zap, Award, Compass, Eye, Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tomas Aéreas y Drones en Panamá en 4K y 360° | RufPixel',
  description: 'Servicio de tomas aéreas, video con drones 4K y tours virtuales 360° en Panamá. Cobertura de bienes raíces, obras y eventos. Cotiza por WhatsApp.',
  alternates: {
    canonical: 'https://rufpixel.com/tomas-aereas-panama',
  },
  openGraph: {
    title: 'Tomas Aéreas y Drones en Panamá en 4K y 360° | RufPixel',
    description: 'Servicio profesional de video, fotografía aérea y panorámicas 360° con drones en Panamá. Resolución 4K a 60fps para bienes raíces, constructoras y turismo.',
    url: 'https://rufpixel.com/tomas-aereas-panama',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
    images: [
      {
        url: 'https://rufpixel.com/images/services/drone-moderno-tomas-aereas-panama.jpg',
        width: 1024,
        height: 576,
        alt: 'Tomas Aéreas, Video 4K y Panorámicas 360 con Drones en Panamá - RufPixel',
      },
    ],
  },
};

export default function TomasAereasPanamaPage() {
  const whatsappUrl = (plan: string = 'General') => 
    `https://wa.me/50764454084?text=${encodeURIComponent(
      `Hola RufPixel, me interesa cotizar el servicio de Tomas Aéreas con Drone en Panamá (Plan: ${plan}). Quisiera coordinar fecha, ubicación y requerimientos técnicos.`
    )}`;

  // Structured Data: Service + FAQPage + BreadcrumbList
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://rufpixel.com/tomas-aereas-panama#service',
    name: 'Tomas Aéreas, Grabación con Drones 4K y Tours 360° en Panamá',
    serviceType: 'Drone Video, Aerial Photography and 360 Virtual Tours',
    description: 'Servicio profesional de tomas aéreas, fotografía, video con drones en 4K y tours virtuales panorámicos en 360 grados para proyectos inmobiliarios, seguimiento de obras civiles, hoteles y eventos en Panamá.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'RufPixel',
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
      { '@type': 'AdministrativeArea', name: 'Ciudad de Panamá' },
      { '@type': 'AdministrativeArea', name: 'Panamá Oeste' },
      { '@type': 'AdministrativeArea', name: 'Colón' },
      { '@type': 'AdministrativeArea', name: 'Coclé' },
      { '@type': 'Country', name: 'Panamá' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Paquetes de Tomas Aéreas, Drones y Panorámicas 360 en Panamá',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Vuelo de Lote y Terreno 4K',
            description: 'Tomas fotográficas y paneo aéreo en 4K para delimitación de predios y fincas en venta.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Paquete Inmobiliario Residencial Pro',
            description: 'Fotografía aérea publicitaria y tomas orbitales de residencias, edificios y condominios.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Experiencia Inmersiva 360° & Tour Virtual Aéreo',
            description: 'Fotografía esférica interactiva 360° en el aire para Google Street View, sitios web y recorrido inmersivo.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seguimiento de Avance de Obra Civil',
            description: 'Monitoreo aéreo periódico con puntos de control fijos e informe para inversores.',
          },
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo funciona el servicio de fotos y videos aéreos en 360 grados con dron?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Utilizamos tecnología de captura esférica aérea 360°. El dron toma capturas panorámicas completas en el aire que permiten al usuario final girar la vista en 360 grados (arriba, abajo y a los lados). Se entrega en formato compatible para incrustar en sitios web, portales inmobiliarios, Google Street View o reproducir en visores VR.',
        },
      },
      {
        '@type': 'Question',
        name: '¿En qué resolución y formatos entregan las tomas aéreas y fotografías?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Grabamos video en ultra alta definición 4K hasta a 60 cuadros por segundo (fps) con perfiles de color cinemático D-Log (o perfil estándar listo para usar). Las fotografías aéreas se entregan en formato RAW (DNG) de 48 megapíxeles junto con versiones JPEG procesadas de alta resolución.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cumplen con las normativas de vuelo de la Autoridad Aeronáutica Civil (AAC) de Panamá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Operamos con apego estricto a las regulaciones de espacio aéreo vigentes en la República de Panamá. No volamos sobre concentraciones no controladas de personas ni dentro de zonas de aproximación restringidas de aeropuertos (Albrook, Tocumen, Howard) sin la respectiva coordinación previa.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué sucede si el día programado llueve o hay vientos excesivos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Por seguridad del equipo y calidad de la imagen, los vuelos requieren condiciones meteorológicas seguras (sin lluvia y con vientos moderados). Si el clima impide el despegue en la fecha pactada, reanudamos o reprogramamos el vuelo en común acuerdo sin penalización.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Realizan seguimiento mensual de avance de obra para constructoras en Panamá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Ofrecemos paquetes corporativos para constructoras y desarrolladores inmobiliarios con visitas periódicas (quincenales o mensuales). Mantenemos alturas y ángulos de cámara consistentes para que la directiva y los inversores puedan apreciar la evolución temporal exacta de la construcción.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuáles son los métodos de pago y emiten factura fiscal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aceptamos pagos a través de Yappy Comercial, transferencia bancaria ACH directa y efectivo. Emitimos Factura Fiscal panameña con RUC y DV para deducción contable de empresas e independientes.',
        },
      },
    ],
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
        name: 'Tomas Aéreas y Drones en Panamá',
        item: 'https://rufpixel.com/tomas-aereas-panama',
      },
    ],
  };

  const useCases = [
    {
      title: 'Bienes Raíces & Inmobiliarias',
      desc: 'Destaca propiedades residenciales, torres de apartamentos, condominios de playa y casas campestres con ángulos aéreos que muestran la ubicación, entorno natural y amenidades. Aumenta drásticamente las consultas en Encuentra24 y portales B2B.',
      image: '/images/services/drone-bienes-raices-panama.webp',
      badge: 'Mayor Conversión en Ventas',
      points: [
        'Fotografías panorámicas en 48MP',
        'Tomas en órbita y paneo 4K a 60fps',
        'Perspectiva de accesos viales y vecindario'
      ]
    },
    {
      title: 'Panorámicas Aéreas 360° & Tour Virtual',
      desc: 'Esferas interactivas en 360 grados tomadas desde el aire. Permite a compradores locales e internacionales girar la vista en todas las direcciones para apreciar la vista al mar, la ciudad y el entorno como si estuvieran flotando en el lugar.',
      image: '/images/services/drone-moderno-tomas-aereas-panama.jpg',
      badge: 'Exclusivo en Panamá: 360° VR',
      points: [
        'Fotografía esférica completa en 360°',
        'Compatible con Google Street View y sitios web',
        'Experiencia inmersiva para celulares y gafas VR'
      ]
    },
    {
      title: 'Avance de Obras & Construcción',
      desc: 'Monitoreo aéreo programado para constructoras, arquitectos e inversionistas. Documentamos cimentaciones, estructuras, acabados y techos con ángulos repetibles para reportes de avance ejecutivo y fiscalización técnica en Panamá.',
      image: '/images/services/drone-construccion-obras-panama.webp',
      badge: 'Control de Proyecto B2B',
      points: [
        'Visitas mensuales o quincenales fijas',
        'Inspección de cubiertas y zonas de difícil acceso',
        'Video comparativo temporal para directores'
      ]
    },
    {
      title: 'Eventos Corporativos & Exteriores',
      desc: 'Filmación cinematográfica para convenciones, aniversarios empresariales, eventos deportivos al aire libre, conciertos y activaciones de marca. Tomas dinámicas y planos de establecimiento que transmiten magnitud y asistencia masiva.',
      image: '/images/services/drone-eventos-costa-panama.webp',
      badge: 'Impacto Visual Masivo',
      points: [
        'Grabación con baterías continuas para cobertura total',
        'Planos generales y barridos aéreos fluidos',
        'Archivos listos para postproducción y reels'
      ]
    }
  ];

  const packages = [
    {
      name: 'Plan Lote & Terreno',
      target: 'Venta de Fincas y Terrenos',
      desc: 'Ideal para corredores y particulares que necesitan delimitar y mostrar un terreno para venta rápida.',
      features: [
        '1 sesión de vuelo puntual en sitio',
        '10 a 15 fotos aéreas en alta resolución (RAW + JPEG)',
        'Tomas de video 4K en paneo y cenital',
        'Entrega de archivos en bruto por Google Drive',
        'Tiempo de entrega digital: 24 a 48 horas'
      ],
      highlight: false,
      ctaText: 'Cotizar Plan Terreno'
    },
    {
      name: 'Plan Inmobiliario Pro',
      target: 'Casas, Playas y Apartamentos',
      desc: 'El paquete preferido por agencias inmobiliarias y propietarios para anuncios de alto impacto comercial.',
      features: [
        'Sesión completa de vuelo con múltiples ángulos',
        '20 a 25 fotos aéreas editadas profesionalmente',
        'Video 4K a 60fps con tomas orbitales y de aproximación',
        'Reel o video corto musicalizado listo para Instagram / TikTok',
        'Entrega de todos los archivos originales en bruto',
        'Despacho digital prioritario'
      ],
      highlight: true,
      badge: 'Más Vendido en Panamá',
      ctaText: 'Cotizar Plan Inmobiliario'
    },
    {
      name: 'Plan Experiencia 360° VR',
      target: 'Bienes Raíces VIP, Hoteles y Proyectos',
      desc: 'Tours virtuales aéreos y esferas 360° interactivas para destacar proyectos exclusivos en la web.',
      features: [
        'Fotografías esféricas aéreas en 360 grados',
        'Archivo interactivo listo para incrustar en tu web',
        'Subida opcional a Google Maps / Street View',
        'Tomas de video 360° inmersivas',
        'Pack de fotos aéreas fijas 4K de respaldo',
        'Compatibilidad total con móviles y visores VR'
      ],
      highlight: false,
      badge: 'Tecnología Exclusiva',
      ctaText: 'Cotizar Tour Aéreo 360°'
    },
    {
      name: 'Plan Avance de Obra B2B',
      target: 'Constructoras e Inversionistas',
      desc: 'Seguimiento técnico periódico con registro visual ordenado para informes de junta directiva.',
      features: [
        'Visitas programadas periódicas (mensuales o por hitos)',
        'Mismos puntos cardinales y alturas en cada vuelo',
        'Inspección de cubiertas, losas y accesos de maquinaria',
        'Video resumen de evolución en 4K con rotulación',
        'Factura Fiscal panameña con RUC y DV',
        'Descuento especial por contrato trimestral o semestral'
      ],
      highlight: false,
      ctaText: 'Cotizar Seguimiento de Obra'
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen selection:bg-[#FF5E14] selection:text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. HERO SECTION (Luminoso, fondo claro y moderno) */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-gray-50/40 border-b border-gray-200">
        {/* Subtle Ambient Light Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-100/60 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-blue-100/50 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-[#FF5E14] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/servicios" className="hover:text-[#FF5E14] transition-colors">Servicios</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Tomas Aéreas con Drones</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Status Badge */}
              <div className="inline-flex items-center space-x-2.5 bg-white border border-gray-200/90 shadow-sm rounded-full px-4 py-1.5 text-xs text-gray-800">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-semibold tracking-wide text-gray-900">Operaciones de Vuelo Activas en Todo Panamá</span>
              </div>

              {/* H1 Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-gray-950 tracking-tight leading-[1.12]">
                Tomas Aéreas, Video 4K y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E14] via-[#E04700] to-amber-600">Drones 360°</span> en Panamá
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                Fotografía y video cinematográfico en 4K y <strong>panorámicas esféricas 360° interactivas</strong>. Capturamos perspectivas de alto impacto para <strong>bienes raíces</strong>, <strong>tours virtuales</strong>, <strong>avance de obras civiles</strong> y <strong>eventos</strong> en Ciudad de Panamá, Panamá Oeste y Provincias.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href={whatsappUrl('Hero Principal')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#FF5E14] hover:bg-[#E04700] text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl shadow-[#FF5E14]/25 hover:shadow-[#FF5E14]/40 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2.5 group"
                >
                  <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Cotizar Vuelo por WhatsApp</span>
                </a>

                <a
                  href="#paquetes"
                  className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-gray-400 px-7 py-4 rounded-2xl font-semibold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <span>Ver Planes & Tarifas</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gray-200 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Video 4K / 60fps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Panorámicas 360° VR</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Factura Fiscal RUC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Yappy & ACH directo</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Frame con la Foto del Drone Moderno */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-gray-200/90 shadow-2xl bg-white p-2.5">
                <div className="relative rounded-2xl overflow-hidden h-[360px] sm:h-[440px] bg-slate-900">
                  <img
                    src="/images/services/drone-moderno-tomas-aereas-panama.jpg"
                    alt="Tomas Aéreas, Video 4K y Drones 360 en Panamá - RufPixel"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  
                  {/* Floating Overlay Pill */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-xl">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF5E14]">
                        Drones 4K y Captura Esférica 360°
                      </span>
                      <h3 className="text-gray-950 font-bold text-sm font-outfit">
                        Estabilización Giroscópica 3 Ejes
                      </h3>
                      <p className="text-[11px] text-gray-600">
                        Tomas fluidas, vuelos cinemáticos y tours virtuales en Panamá
                      </p>
                    </div>
                    <div className="p-2.5 bg-[#FF5E14] text-white rounded-xl shadow-md">
                      <Compass className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. STATS & SPECS COUNTER (Fondo claro y limpio) */}
      <section className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-100 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF5E14] font-outfit">4K / 60fps</div>
              <div className="text-xs text-gray-600 mt-1 uppercase font-bold tracking-wider">Ultra Alta Definición</div>
            </div>

            <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-outfit">360° VR</div>
              <div className="text-xs text-gray-600 mt-1 uppercase font-bold tracking-wider">Tours Aéreos Interactivos</div>
            </div>

            <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-100 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF5E14] font-outfit">100% Legal</div>
              <div className="text-xs text-gray-600 mt-1 uppercase font-bold tracking-wider">Normativa AAC Panamá</div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">24-48h</div>
              <div className="text-xs text-gray-600 mt-1 uppercase font-bold tracking-wider">Entrega Digital Express</div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5 BLOQUE DESTACADO EXCLUSIVO: TECNOLOGÍA 360° (Novedad de Mercado) */}
      <section className="py-16 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-slate-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                <Globe className="w-3.5 h-3.5" />
                <span>Ventaja Exclusiva en Panamá</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 font-outfit leading-tight">
                Tours Virtuales Aéreos en 360°: Tu Proyecto Visto desde Cualquier Ángulo
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                A diferencia de una foto tradicional estática, nuestro dron con captura 360° genera una <strong>esfera interactiva completa suspendida en el aire</strong>. El usuario puede mover su celular, arrastrar el cursor en tu página web o usar gafas de Realidad Virtual (VR) para explorar la vista panorámica en 360 grados exactos.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2.5 text-xs text-gray-800 bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Google Street View:</strong> Posiciona tu negocio o terreno en Google Maps en 360°.</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-gray-800 bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Incrustación Web:</strong> Código HTML listo para tu página de venta o portal.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-center p-8 bg-white rounded-3xl border border-blue-200 shadow-lg text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Eye className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-gray-950 font-outfit">
                ¿Vendes un Proyecto Inmobiliario o Terreno?
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Permite a compradores de Estados Unidos, Europa o el interior de Panamá explorar el entorno antes de viajar.
              </p>
              <a
                href={whatsappUrl('Tour Aéreo 360')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Cotizar Fotografía Aérea 360°</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. USE CASES & SECTORS (Fondo suave y tarjetas blancas) */}
      <section className="py-20 bg-slate-50/60 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
              Sectores & Aplicaciones
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 font-outfit">
              ¿Para qué proyectos necesitas tomas aéreas?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Adaptamos la altura de vuelo, óptica y perfil de color a los requerimientos específicos de tu industria en Panamá.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((uc, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 hover:border-[#FF5E14]/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 sm:h-72 overflow-hidden bg-gray-100">
                    <img
                      src={uc.image}
                      alt={uc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#FF5E14] text-[11px] font-bold px-3 py-1 rounded-full border border-gray-200 shadow-sm uppercase tracking-wider">
                      {uc.badge}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-950 font-outfit">
                      {uc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {uc.desc}
                    </p>

                    <ul className="space-y-2.5 pt-2 border-t border-gray-100 text-xs text-gray-700">
                      {uc.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-[#FF5E14] shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <a
                    href={whatsappUrl(uc.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-900 hover:bg-[#FF5E14] text-white py-3 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-2 text-center shadow-sm"
                  >
                    <span>Cotizar {uc.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PACKAGES & PRICING (Fondo blanco y contrastes luminosos) */}
      <section id="paquetes" className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
              Paquetes de Vuelo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 font-outfit">
              Planes Adaptados a tu Presupuesto
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Desde vuelos individuales para lotes y casas de playa hasta experiencias inmersivas 360° y seguimiento de obras corporativas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  pkg.highlight
                    ? 'bg-gradient-to-b from-orange-50/60 to-white border-2 border-[#FF5E14] shadow-xl shadow-orange-500/10 scale-100 lg:-translate-y-2'
                    : 'bg-slate-50/70 border border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                {pkg.badge && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-md ${
                    pkg.highlight ? 'bg-[#FF5E14]' : 'bg-blue-600'
                  }`}>
                    {pkg.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    {pkg.target}
                  </span>
                  
                  <h3 className="text-xl font-bold text-gray-950 font-outfit">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed min-h-[3rem]">
                    {pkg.desc}
                  </p>

                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-2">
                      Incluye:
                    </span>
                    <ul className="space-y-2 text-xs text-gray-700">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pkg.highlight ? 'text-[#FF5E14]' : 'text-emerald-600'}`} />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href={whatsappUrl(pkg.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 text-center ${
                      pkg.highlight
                        ? 'bg-[#FF5E14] hover:bg-[#E04700] text-white shadow-orange-500/30'
                        : 'bg-gray-900 hover:bg-[#FF5E14] text-white'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{pkg.ctaText}</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-xs text-gray-600 bg-slate-50 border border-gray-200 rounded-2xl p-4 max-w-2xl mx-auto shadow-sm">
            💡 <strong>¿Requieres un paquete a la medida o fuera de Panamá Oeste / Ciudad?</strong> Contáctanos indicando las coordenadas o ubicación de Google Maps y te armamos una propuesta inmediata.
          </div>

        </div>
      </section>

      {/* 5. WORKFLOW IN 3 STEPS (Fondo suave) */}
      <section className="py-20 bg-slate-50/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
              Metodología Segura
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-outfit">
              ¿Cómo coordinamos tu vuelo en Panamá?
            </h2>
            <p className="text-gray-600 text-sm">
              Proceso ágil y estructurado desde la reserva hasta la entrega digital de tus archivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative space-y-4 hover:shadow-md transition-shadow">
              <span className="text-4xl font-extrabold text-[#FF5E14]/30 font-outfit">01</span>
              <h3 className="text-xl font-bold text-gray-950 font-outfit">Planificación & Validación</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Nos envías la ubicación del proyecto (pin de Google Maps) y los requerimientos específicos (fotos, video, tour 360° o avance de obra). Verificamos el espacio aéreo según directrices de la AAC y confirmamos el pronóstico del tiempo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative space-y-4 hover:shadow-md transition-shadow">
              <span className="text-4xl font-extrabold text-[#FF5E14]/30 font-outfit">02</span>
              <h3 className="text-xl font-bold text-gray-950 font-outfit">Despegue & Rodaje 4K / 360°</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                El piloto se traslada al sitio acordado. Realizamos la inspección de seguridad, calibración de sensores y ejecutamos la sesión de vuelo capturando fotos en 48MP, esferas 360° y video a 60fps con maniobras cinemáticas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative space-y-4 hover:shadow-md transition-shadow">
              <span className="text-4xl font-extrabold text-[#FF5E14]/30 font-outfit">03</span>
              <h3 className="text-xl font-bold text-gray-950 font-outfit">Entrega Digital Inmediata</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Procesamos los archivos y te compartimos un enlace privado en la nube (Google Drive o WeTransfer) con todo el material en su resolución original completa y sin compresión, listo para tu web o uso ejecutivo.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. COBERTURA GEOGRÁFICA EN PANAMÁ */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Cobertura Territorial</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
                Vuelos en Ciudad de Panamá, Panamá Oeste y Provincias
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Operamos habitualmente en <strong>Costa del Este, Santa María, Casco Antiguo, San Francisco, Panamá Pacífico, La Chorrera, Arraiján, Coronado, San Carlos, Penonomé y Colón</strong>. También nos trasladamos a fincas o proyectos en el interior del país con viáticos pactados.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href={whatsappUrl('Consulta de Cobertura')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-[#FF5E14] hover:bg-[#E04700] text-white px-7 py-4 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2 text-center"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Consultar Disponibilidad de Fecha</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES (FAQ) (Fondo claro con acordeones pulidos) */}
      <section className="py-20 bg-slate-50/60 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-orange-100 border border-orange-200 px-3 py-1 rounded-full">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-outfit">
              Todo lo que necesitas saber antes de contratar
            </h2>
          </div>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 transition-all open:border-[#FF5E14]/60 open:shadow-md"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#FF5E14] transition-colors">
                  <span className="pr-4">{faq.name}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA BANNER (Luminoso, cálido y persuasivo) */}
      <section className="py-20 bg-gradient-to-b from-white via-orange-50/30 to-orange-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex p-4 bg-orange-100 rounded-3xl border border-orange-200 text-[#FF5E14] shadow-sm">
            <Video className="w-10 h-10" />
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-950 font-outfit leading-tight">
              ¿Listo para elevar la perspectiva de tu proyecto?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Envíanos los detalles de tu ubicación o evento por WhatsApp. Te confirmamos disponibilidad de agenda, requerimientos técnicos y presupuesto el mismo día.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={whatsappUrl('Cierre Final')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#FF5E14] hover:bg-[#E04700] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#FF5E14]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2.5"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Chatear con un Piloto (+507 6445-4084)</span>
            </a>

            <a
              href="tel:+50764454084"
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-8 py-4 rounded-2xl font-semibold text-base shadow-sm transition-all flex items-center justify-center space-x-2"
            >
              <span>Llamada Directa</span>
            </a>
          </div>

          {/* Payment Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600 border-t border-gray-200 max-w-xl mx-auto">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Pagos con <strong>Yappy Comercial</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Transferencia <strong>ACH Directa</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
              <span>Factura Fiscal con <strong>RUC / DV</strong></span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
