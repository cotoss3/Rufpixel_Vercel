import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Video, Camera, ShieldCheck, CheckCircle2, PhoneCall, ArrowRight, 
  Clock, MapPin, Building2, Home, Film, Sparkles, AlertCircle, 
  HelpCircle, ChevronDown, Check, Download, Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tomas Aéreas y Drones en Panamá en 4K | RufPixel',
  description: 'Servicio de tomas aéreas y video con drones en Panamá en 4K. Cobertura de bienes raíces, obras civiles y eventos. Cotiza rápido por WhatsApp con RufPixel.',
  alternates: {
    canonical: 'https://rufpixel.com/tomas-aereas-panama',
  },
  openGraph: {
    title: 'Tomas Aéreas y Drones en Panamá en 4K | RufPixel',
    description: 'Servicio profesional de video y fotografía aérea con drones en Panamá. Resolución 4K a 60fps para bienes raíces, constructoras y eventos.',
    url: 'https://rufpixel.com/tomas-aereas-panama',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
    images: [
      {
        url: 'https://rufpixel.com/images/services/tomas-aereas-drones-panama.webp',
        width: 1200,
        height: 630,
        alt: 'Tomas Aéreas y Video con Drones en Panamá en 4K',
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
    name: 'Tomas Aéreas y Grabación con Drones en Panamá',
    serviceType: 'Drone Video and Aerial Photography',
    description: 'Servicio profesional de tomas aéreas, fotografía y filmación de video con drones en resolución 4K a 60fps para proyectos inmobiliarios, seguimiento de obras civiles, eventos corporativos y comerciales en Panamá.',
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
      name: 'Paquetes de Tomas Aéreas y Drones en Panamá',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Vuelo de Lote y Terreno',
            description: 'Tomas fotográficas y paneo aéreo en 4K para delimitación de predios y fincas en venta.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Paquete Inmobiliario y Bienes Raíces',
            description: 'Fotografía aérea publicitaria y tomas orbitales de residencias, edificios y condominios.',
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
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Jornada Cinematográfica y Comercial',
            description: 'Rodaje con perfiles D-Log a 60fps para comerciales, eventos y producciones audiovisuales.',
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
        name: 'Tomas Aéreas en Panamá',
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
    },
    {
      title: 'Inspección de Terrenos & Fincas',
      desc: 'Delimitación visual de linderos, topografía superficial y estado de la vegetación para venta o adquisición de fincas ganaderas, proyectos agrícolas y lotificaciones en Panamá Oeste, Coclé y Provincias Centrales.',
      image: '/images/services/tomas-aereas-drones-panama.webp',
      badge: 'Precisión Territorial',
      points: [
        'Vuelo cenital (90°) para visión ortogonal',
        'Revisión de accesos de agua y servidumbres',
        'Entrega rápida en nube para agrimensores'
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
      name: 'Plan Avance de Obra',
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
    },
    {
      name: 'Jornada Cinematográfica',
      target: 'Producciones, Comerciales y Eventos',
      desc: 'Disponibilidad de operador de dron profesional por media jornada o día completo en locación.',
      features: [
        'Piloto especializado en filmación aérea cinematográfica',
        'Baterías múltiples y estación de carga en sitio',
        'Grabación en perfiles planos D-Log para etalonaje / color',
        'Tomas a baja y alta velocidad (60fps ultra fluido)',
        'Entrega en bruto inmediata en disco o nube',
        'Facturación fiscal corporativa'
      ],
      highlight: false,
      ctaText: 'Cotizar Jornada de Rodaje'
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-gray-100 min-h-screen selection:bg-[#FF5E14] selection:text-white">
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

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden border-b border-gray-800/80">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF5E14]/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb minimal */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-[#FF5E14] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/servicios" className="hover:text-[#FF5E14] transition-colors">Servicios</Link>
            <span>/</span>
            <span className="text-white font-semibold">Tomas Aéreas con Drones</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Status Badge */}
              <div className="inline-flex items-center space-x-2.5 bg-gray-900/90 border border-gray-700/80 rounded-full px-4 py-1.5 text-xs text-gray-200 shadow-inner">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-semibold tracking-wide">Operaciones de Vuelo Activas en Todo Panamá</span>
              </div>

              {/* H1 Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-white tracking-tight leading-[1.12]">
                Servicio de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E14] via-[#FF7A3D] to-amber-400">Tomas Aéreas</span> y Drones en Panamá en 4K
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                Fotografía y video cinematográfico a 60fps con estabilización giroscópica. Capturamos perspectivas de alto impacto para <strong>bienes raíces</strong>, <strong>avance de obras de construcción</strong>, <strong>inspección de techos</strong> y <strong>eventos comerciales</strong> en Ciudad de Panamá, Panamá Oeste y Provincias.
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
                  className="w-full sm:w-auto bg-gray-900/90 hover:bg-gray-800 text-gray-200 border border-gray-700/80 hover:border-gray-500 px-7 py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all flex items-center justify-center space-x-2"
                >
                  <span>Ver Planes & Tarifas</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gray-800/80 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Video 4K / 60fps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Sensores de 48MP</span>
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

            {/* Right Column: Hero Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-gray-700/80 shadow-2xl bg-gradient-to-b from-gray-800 to-gray-950 p-2">
                <div className="relative rounded-2xl overflow-hidden h-[360px] sm:h-[440px]">
                  <img
                    src="/images/services/tomas-aereas-drones-panama.webp"
                    alt="Servicio de Tomas Aéreas con Drones en Panamá en 4K"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  {/* Floating Overlay Pill */}
                  <div className="absolute bottom-5 left-5 right-5 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF5E14]">
                        Tecnología Cinemática
                      </span>
                      <h3 className="text-white font-bold text-sm font-outfit">
                        Estabilización Giroscópica 3 Ejes
                      </h3>
                      <p className="text-[11px] text-gray-300">
                        Tomas fluidas en perfiles D-Log para gradación de color
                      </p>
                    </div>
                    <div className="p-2.5 bg-[#FF5E14] text-white rounded-xl shadow-md">
                      <Video className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. STATS & SPECS COUNTER */}
      <section className="bg-gradient-to-r from-gray-950 via-[#111] to-gray-950 border-b border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 bg-gray-900/40 rounded-2xl border border-gray-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF5E14] font-outfit">4K / 60fps</div>
              <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">Ultra Alta Definición</div>
            </div>

            <div className="p-4 bg-gray-900/40 rounded-2xl border border-gray-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">48 MP</div>
              <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">Fotos en RAW (DNG)</div>
            </div>

            <div className="p-4 bg-gray-900/40 rounded-2xl border border-gray-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF5E14] font-outfit">100% Legal</div>
              <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">Normativa AAC Panamá</div>
            </div>

            <div className="p-4 bg-gray-900/40 rounded-2xl border border-gray-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">24-48h</div>
              <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">Entrega Digital Express</div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. USE CASES & SECTORS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-full">
            Sectores & Aplicaciones
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-outfit">
            ¿Para qué proyectos necesitas tomas aéreas?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Adaptamos la altura de vuelo, óptica y perfil de color a los requerimientos específicos de tu industria en Panamá.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((uc, idx) => (
            <div
              key={idx}
              className="bg-gray-900/70 border border-gray-800 hover:border-[#FF5E14]/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 sm:h-72 overflow-hidden bg-gray-950">
                  <img
                    src={uc.image}
                    alt={uc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-[#FF5E14] text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                    {uc.badge}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-outfit">
                    {uc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {uc.desc}
                  </p>

                  <ul className="space-y-2.5 pt-2 border-t border-gray-800 text-xs text-gray-300">
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
                  className="w-full bg-gray-800 hover:bg-[#FF5E14] text-white py-3 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-2 text-center"
                >
                  <span>Cotizar {uc.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PACKAGES & PRICING */}
      <section id="paquetes" className="py-20 bg-gradient-to-b from-[#0D0D0D] to-[#070707] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-full">
              Paquetes de Vuelo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-outfit">
              Planes Adaptados a tu Presupuesto
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Desde vuelos individuales para lotes y casas de playa hasta seguimiento de obras corporativas y rodajes continuos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  pkg.highlight
                    ? 'bg-gradient-to-b from-gray-900 to-[#16120e] border-2 border-[#FF5E14] shadow-2xl shadow-[#FF5E14]/15 scale-100 lg:-translate-y-2'
                    : 'bg-gray-900/60 border border-gray-800 hover:border-gray-700'
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5E14] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
                    {pkg.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    {pkg.target}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white font-outfit">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed min-h-[3rem]">
                    {pkg.desc}
                  </p>

                  <div className="pt-3 border-t border-gray-800">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                      Incluye:
                    </span>
                    <ul className="space-y-2 text-xs text-gray-300">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pkg.highlight ? 'text-[#FF5E14]' : 'text-emerald-400'}`} />
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
                        ? 'bg-[#FF5E14] hover:bg-[#E04700] text-white shadow-[#FF5E14]/30'
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{pkg.ctaText}</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-xs text-gray-400 bg-gray-900/40 border border-gray-800 rounded-2xl p-4 max-w-2xl mx-auto">
            💡 <strong>¿Requieres un paquete a la medida o fuera de Panamá Oeste / Ciudad?</strong> Contáctanos indicando las coordenadas o ubicación de Google Maps y te armamos una propuesta inmediata.
          </div>

        </div>
      </section>

      {/* 5. WORKFLOW IN 3 STEPS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-full">
            Metodología Segura
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
            ¿Cómo coordinamos tu vuelo en Panamá?
          </h2>
          <p className="text-gray-400 text-sm">
            Proceso ágil y estructurado desde la reserva hasta la entrega digital de tus archivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 relative space-y-4">
            <span className="text-4xl font-extrabold text-[#FF5E14]/30 font-outfit">01</span>
            <h3 className="text-xl font-bold text-white font-outfit">Planificación & Validación</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Nos envías la ubicación del proyecto (pin de Google Maps) y los requerimientos específicos (fotos, video, avance de obra o ángulos específicos). Verificamos el espacio aéreo según directrices de la AAC y confirmamos el pronóstico del tiempo.
            </p>
          </div>

          <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 relative space-y-4">
            <span className="text-4xl font-extrabold text-[#FF5E14]/30 font-outfit">02</span>
            <h3 className="text-xl font-bold text-white font-outfit">Despegue & Rodaje 4K</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              El piloto se traslada al sitio acordado. Realizamos la inspección de seguridad, calibración de sensores y ejecutamos la sesión de vuelo capturando fotos en 48MP y video a 60fps con maniobras cinemáticas (órbita, cenital, reveal y seguimiento).
            </p>
          </div>

          <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 relative space-y-4">
            <span className="text-4xl font-extrabold text-[#FF5E14]/30 font-outfit">03</span>
            <h3 className="text-xl font-bold text-white font-outfit">Entrega Digital Inmediata</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Procesamos los archivos y te compartimos un enlace privado en la nube (Google Drive o WeTransfer) con todo el material en su resolución original completa y sin compresión, listo para edición publicitaria o uso ejecutivo.
            </p>
          </div>

        </div>
      </section>

      {/* 6. COBERTURA GEOGRÁFICA EN PANAMÁ */}
      <section className="py-16 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900 p-8 sm:p-12 rounded-3xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
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
                className="w-full md:w-auto bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-4 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-[#FF5E14]/20 transition-all flex items-center justify-center space-x-2 text-center"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Consultar Disponibilidad de Fecha</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-full">
            Preguntas Frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
            Todo lo que necesitas saber antes de contratar
          </h2>
        </div>

        <div className="space-y-4">
          {faqSchema.mainEntity.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6 transition-all open:border-[#FF5E14]/50 open:bg-gray-900"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none text-sm sm:text-base font-bold text-white group-hover:text-[#FF5E14] transition-colors">
                <span className="pr-4">{faq.name}</span>
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
              </summary>
              <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800/80 pt-3">
                {faq.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section className="py-20 bg-gradient-to-t from-black via-gray-950 to-[#0A0A0A] border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex p-4 bg-[#FF5E14]/10 rounded-3xl border border-[#FF5E14]/30 text-[#FF5E14]">
            <Video className="w-10 h-10" />
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit leading-tight">
              ¿Listo para elevar la perspectiva de tu proyecto?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
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
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 px-8 py-4 rounded-2xl font-semibold text-base transition-all flex items-center justify-center space-x-2"
            >
              <span>Llamada Directa</span>
            </a>
          </div>

          {/* Payment Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 border-t border-gray-900 max-w-xl mx-auto">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Pagos con <strong>Yappy Comercial</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
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
