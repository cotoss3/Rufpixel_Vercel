import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  CheckCircle2, ArrowRight, PhoneCall, Calculator, ShieldCheck,
  Truck, Layers, Sparkles, HelpCircle, AlertTriangle, Check,
  Gift, Tag, Printer, Shirt, Maximize2, Building2, FileText
} from 'lucide-react';
import { BreadcrumbListSchema, FAQPageSchema } from '@/components/seo/SchemaOrg';

export const metadata: Metadata = {
  title: 'Artículos Promocionales en Panamá al por Mayor | RufPixel',
  description: 'Catálogo de 166 artículos promocionales en Panamá desde 50 unidades. Tazas, termos, bolígrafos, agendas y bolsas con logo. Pagos por Yappy y ACH.',
  alternates: {
    canonical: 'https://rufpixel.com/articulos-promocionales-panama',
  },
  openGraph: {
    title: 'Artículos Promocionales en Panamá al por Mayor | RufPixel',
    description: 'Catálogo de 166 artículos promocionales en Panamá desde 50 unidades. Tazas, termos, bolígrafos, agendas y bolsas con logo. Pagos por Yappy y ACH.',
    url: 'https://rufpixel.com/articulos-promocionales-panama',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
    images: [
      {
        url: 'https://rufpixel.com/images/services/grabado-laser-termos-vasos-panama.webp',
        width: 1200,
        height: 630,
        alt: 'Artículos Promocionales en Panamá al por Mayor con Logo - RufPixel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artículos Promocionales en Panamá al por Mayor | RufPixel',
    description: 'Catálogo de 166 artículos promocionales en Panamá desde 50 unidades. Tazas, termos, bolígrafos, agendas y bolsas con logo. Pagos por Yappy y ACH.',
  },
};

export default function ArticulosPromocionalesPanamaPage() {
  const breadcrumbs = [
    { name: 'Inicio', url: 'https://rufpixel.com' },
    { name: 'Artículos Promocionales en Panamá', url: 'https://rufpixel.com/articulos-promocionales-panama' },
  ];

  const categoriesSilo = [
    {
      name: 'Tazas, Vasos Térmicos y Termos',
      anchor: 'tazas personalizadas y termos al por mayor en Panamá',
      slug: 'tazas-botellas-y-termos',
      count: '30 modelos',
      fromUnit: 'Desde $1.95/ud',
      tech: 'Grabado Láser / UV DTF 3D',
      desc: 'Mugs de cerámica, botellas de aluminio y vasos térmicos de acero inoxidable de doble pared aislada al vacío para oficinas y regalos ejecutivos.',
    },
    {
      name: 'Bolígrafos y Plumas con Logo',
      anchor: 'bolígrafos personalizados y plumas de lujo en Panamá',
      slug: 'boligrafos-y-plumas',
      count: '24 modelos',
      fromUnit: 'Desde $0.45/ud',
      tech: 'Grabado Láser / UV DTF',
      desc: 'Lapiceros retráctiles para ferias masivas, bolígrafos ecológicos de bambú y plumas ejecutivas metálicas con puntero táctil.',
    },
    {
      name: 'Suéteres, Polos y Camisas Tipo Columbia',
      anchor: 'suéteres personalizados y camisas tipo Columbia en Panamá',
      slug: 'textiles-y-ropa',
      count: '15 modelos',
      fromUnit: 'Cotización por lote',
      tech: 'Bordado Computarizado / DTF Textil',
      desc: 'Dotación de uniformes, suéteres de algodón y Dry-Fit deportivo, abrigos y camisas estilo Columbia bordadas o estampadas.',
    },
    {
      name: 'Bolsas de Manta Sucia, Yute y Loncheras',
      anchor: 'bolsas de manta sucia, yute y loncheras térmicas en Panamá',
      slug: 'bolsas-y-totes',
      count: '22 modelos',
      fromUnit: 'Desde $1.50/ud',
      tech: 'Impresión DTF Textil Full Color',
      desc: 'Tote bags en manta sucia (algodón crudo), bolsas de yute laminado, cambrel reutilizable y loncheras térmicas para colaboradores.',
    },
    {
      name: 'Llaveros Personalizados',
      anchor: 'llaveros personalizados en Panamá al por mayor',
      slug: 'llaveros',
      count: '9 modelos',
      fromUnit: 'Desde $1.10/ud',
      tech: 'Grabado Láser en Metal / Bambú',
      desc: 'Llaveros metálicos cromados para inmobiliarias y concesionarios, destapadores de aluminio y llaveros ecológicos en bambú.',
    },
    {
      name: 'Agendas y Libretas Corporativas',
      anchor: 'agendas y libretas personalizadas en Panamá',
      slug: 'libretas-y-cuadernos',
      count: '14 modelos',
      fromUnit: 'Desde $1.75/ud',
      tech: 'Grabado Láser / UV DTF',
      desc: 'Agendas ejecutivas en curpiel (PU), cuadernos de corcho y bambú con bolígrafo y libretas de bolsillo para congresos.',
    },
    {
      name: 'Lanyards y Cintas Porta Carnet',
      anchor: 'lanyards personalizados y cintas porta carnet en Panamá',
      slug: 'identificacion-y-correas',
      count: 'Identificación B2B',
      fromUnit: 'Desde $1.25/ud',
      tech: 'Sublimación / Transferencia',
      desc: 'Correas porta gafetes con mosquetón metálico o hebilla separable y porta carnets para empresas, clínicas, colegios y eventos.',
    },
    {
      name: 'Gorras Personalizadas y Trucker',
      anchor: 'gorras personalizadas y bordadas en Panamá',
      slug: 'gorras-y-accesorios-de-cabeza',
      count: '11 modelos',
      fromUnit: 'Desde $3.20/ud',
      tech: 'Bordado Computarizado / DTF',
      desc: 'Gorras Trucker de malla ventilada, gorras de algodón estructuradas de 5 y 6 paneles y sombreros para eventos al aire libre.',
    },
    {
      name: 'Memorias USB y Escritorio',
      anchor: 'memorias USB y accesorios de oficina en Panamá',
      slug: 'oficina-y-escritorio',
      count: '9 modelos',
      fromUnit: 'Desde $1.60/ud',
      tech: 'UV DTF 3D / Grabado Láser',
      desc: 'Porta celulares de escritorio, memorias USB corporativas, mouse pads y organizadores para mantener tu marca frente al cliente.',
    },
    {
      name: 'Madera, Bambú, Cocina y Hogar',
      anchor: 'artículos promocionales de madera, bambú y hogar',
      slug: 'cocina-y-hogar',
      count: '17 modelos',
      fromUnit: 'Desde $1.80/ud',
      tech: 'Grabado Láser CO2 / Fibra',
      desc: 'Tablas de quesos en bambú, sets de vino, portavasos y utensilios grabados a láser para obsequios ejecutivos y entregas inmobiliarias.',
    },
    {
      name: 'Mochilas, Maletines y Cangureras',
      anchor: 'mochilas y maletines personalizados en Panamá',
      slug: 'mochilas-y-maletines',
      count: '6 modelos',
      fromUnit: 'Desde $4.50/ud',
      tech: 'DTF Textil / Bordado',
      desc: 'Mochilas porta laptop ejecutivas, maletines para congresos y cangureras promocionales de alta resistencia.',
    },
    {
      name: 'Paraguas y Sombrillas con Logo',
      anchor: 'paraguas personalizados con logo en Panamá',
      slug: 'paraguas',
      count: '4 modelos',
      fromUnit: 'Desde $6.50/ud',
      tech: 'Transferencia Textil Impermeable',
      desc: 'Paraguas plegables y sombrillas corporativas de amplio diámetro diseñadas para los 8 meses de temporada lluviosa en Panamá.',
    },
    {
      name: 'Sets Ejecutivos y Regalos Corporativos',
      anchor: 'sets ejecutivos y regalos corporativos en Panamá',
      slug: 'sets-y-regalos',
      count: 'Kits B2B',
      fromUnit: 'En estuche de regalo',
      tech: 'Grabado Láser / UV DTF',
      desc: 'Cajas de presentación ejecutiva y kits de bienvenida (onboarding) para empleados, juntas directivas y regalos de fin de año.',
    },
  ];

  const faqs = [
    {
      question: '¿Cuál es el pedido mínimo de artículos promocionales al por mayor en Panamá?',
      answer: 'En nuestro catálogo mayorista en línea los precios están configurados en paquetes escalonados de 50, 100 y 250 unidades por referencia, lo que te permite obtener descuentos automáticos por volumen. Si necesitas personalizar menos de 50 unidades o piezas sueltas (como bordar 5 polos o grabar 10 termos), te atendemos directamente en nuestra modalidad al detal en Zona Pixel vía WhatsApp al +507 6445-4084.'
    },
    {
      question: '¿Los precios publicados en la web incluyen la personalización con el logo?',
      answer: 'Cada ficha de producto muestra de forma transparente el precio unitario y el total por paquete de 50, 100 y 250 unidades junto con las técnicas compatibles (Grabado Láser, DTF Textil o UV DTF 3D). Puedes generar tu cotización formal en PDF al instante o enviarla por WhatsApp para que nuestro equipo técnico valide tu logotipo sin costo adicional.'
    },
    {
      question: '¿Cuáles son los plazos de entrega en Ciudad de Panamá y provincias?',
      answer: 'Los plazos de producción se definen según el volumen de unidades y la técnica seleccionada una vez aprobado el boceto digital de tu logotipo. Despachamos directamente desde nuestro taller de producción en La Chorrera hacia Ciudad de Panamá, Panamá Oeste, Colón, Coclé, Chiriquí y todo el país.'
    },
    {
      question: '¿Qué métodos de pago aceptan para empresas e instituciones?',
      answer: 'Aceptamos pagos directos e instantáneos vía Yappy Comercial (+507 6445-4084) y transferencias bancarias ACH en Panamá. Emitimos cotización formal en PDF y factura para el departamento de compras o contabilidad de tu empresa.'
    },
    {
      question: '¿Puedo pedir tanto los artículos promocionales como los banners y el Roll-Up para mi stand de feria?',
      answer: 'Sí. A diferencia de intermediarios que solo revenden catálogos, en RufPixel producimos también toda la gráfica de gran formato para tu evento: estructuras Roll-Up de aluminio, Banner Araña, Banderolas tipo gota/vela, Backing publicitario, manteles impresos y viniles para stands.'
    },
    {
      question: '¿En qué formato debo enviar el logotipo de mi empresa?',
      answer: 'Recomendamos enviar tu logotipo en formato vectorial trazado a curvas (PDF editable, Adobe Illustrator .AI o .EPS) o en imagen PNG de alta resolución (mínimo 300 DPI) con fondo transparente.'
    }
  ];

  const catalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://rufpixel.com/articulos-promocionales-panama#collection',
    name: 'Artículos Promocionales en Panamá al por Mayor | RufPixel',
    description: 'Catálogo mayorista de 166 artículos promocionales personalizados con logo en Panamá: tazas, termos, bolígrafos, agendas, bolsas ecológicas, llaveros, lanyards y textiles desde 50 unidades.',
    url: 'https://rufpixel.com/articulos-promocionales-panama',
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
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />
      <BreadcrumbListSchema items={breadcrumbs} />
      <FAQPageSchema questions={faqs} />

      {/* HERO SECTION */}
      <section className="bg-[#0D0D0D] text-white py-14 sm:py-20 border-b border-gray-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#FF5E14] transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white font-semibold">Artículos Promocionales en Panamá</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="inline-flex items-center space-x-2 text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3.5 py-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>166 Productos en Stock · Escalas de 50, 100 y 250 Unidades</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit leading-tight">
                Artículos Promocionales en Panamá: Catálogo al por Mayor con tu Logo
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Cotiza en línea <strong>artículos promocionales personalizados en Panamá</strong> con precios transparentes por escala desde 50 unidades. Producimos en taller propio con <strong>Grabado Láser en metal y bambú, Transfer UV DTF con relieve 3D, Impresión DTF Textil y Bordado Computarizado</strong>, despachando desde La Chorrera hacia Ciudad de Panamá y todas las provincias.
              </p>

              <div className="flex flex-wrap gap-3.5 pt-2">
                <Link
                  href="/tienda"
                  className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3.5 rounded-xl text-sm font-extrabold shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center space-x-2"
                >
                  <span>Explorar los 166 Productos con Precios</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/50764454084?text=Hola%20RufPixel,%20quiero%20cotizar%20art%C3%ADculos%20promocionales%20al%20por%20mayor%20con%20logo%20en%20Panam%C3%A1."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-xl text-sm font-extrabold shadow-md transition-all flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Cotizar por WhatsApp (+507 6445-4084)</span>
                </a>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="lg:col-span-4 bg-gray-900/90 border border-gray-800 rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#FF5E14] border-b border-gray-800 pb-2">
                Ventajas para Compradores B2B
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-200">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                  <span><strong>Precios publicados:</strong> No esperes días por una cotización; ve el costo unitario en 50, 100 y 250 uds al instante.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                  <span><strong>Cotizador PDF en 1 clic:</strong> Descarga tu proforma formal para aprobación de gerencia o compras.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                  <span><strong>Taller propio en Panamá:</strong> Sin intermediarios en grabado láser, DTF, UV DTF, bordado y gran formato.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                  <span><strong>Pagos locales:</strong> Yappy Comercial directo y Transferencia Bancaria ACH.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-14">
        {/* REGLA 9 & REGLA 8: CAJA EJECUTIVA + HONESTIDAD RADICAL */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-amber-50/80 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-extrabold uppercase tracking-wider text-xs">
              <Tag className="w-4 h-4 text-[#FF5E14]" />
              <span>Lo esencial, por si no lees todo</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Qué hacemos:</strong> Suministramos y personalizamos 166 referencias de artículos promocionales y merchandising corporativo en Panamá desde <strong>50 unidades</strong>.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Escalas de ahorro:</strong> Cada producto ofrece 3 tramos mayoristas automáticos: <strong>50 uds</strong> (precio base), <strong>100 uds</strong> (-5% adicional) y <strong>250 uds</strong> (-10% adicional).</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Muestras y control:</strong> Ningún lote entra a máquina sin que antes apruebes el boceto digital con la ubicación y proporción exacta de tu logotipo.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Plazos y pagos:</strong> Plazos según volumen y técnica seleccionada. Pagos mediante <strong>Yappy Comercial y Transferencia ACH</strong> con envíos a todo Panamá.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 bg-red-50/60 border border-red-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center space-x-2 text-red-900 font-extrabold uppercase tracking-wider text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Lo que este catálogo mayorista NO resuelve</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>No vendemos artículos en blanco sin personalizar a precios de liquidación china:</strong> Nuestro valor está en entregar el producto terminado con tu marca impresa o grabada con calidad de taller.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Los precios de paquete web no aplican a compras de 1 a 10 unidades:</strong> Si necesitas pocas piezas, te las producimos en <Link href="/cotizador" className="text-[#FF5E14] font-bold underline">Zona Pixel</Link> con tarifa al detal.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>No imprimimos logotipos capturados de WhatsApp en baja resolución</strong> sin antes vectorizarlos o reconstruirlos para evitar bordes borrosos.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 1: LAS 13 CATEGORÍAS DEL SILO MAYORISTA */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14]">
              Arquitectura del Catálogo B2B
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
              Categorías de Productos Promocionales en Panamá (Desde 50 Unidades)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
              Selecciona la familia de productos que necesitas para tu evento, feria o dotación empresarial. En cada categoría podrás filtrar precios en vivo para 50, 100 y 250 unidades:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesSilo.map((cat) => (
              <div
                key={cat.slug}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-[#FF5E14]/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider bg-orange-50 text-[#FF5E14] border border-[#FF5E14]/20 px-2.5 py-1 rounded-lg">
                      {cat.count}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {cat.fromUnit}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-gray-900 font-outfit">
                    <Link href={`/tienda/${cat.slug}`} className="hover:text-[#FF5E14] transition-colors">
                      {cat.name}
                    </Link>
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-3">
                  <div className="text-[11px] text-gray-500 font-medium">
                    <strong className="text-gray-700">Técnica principal:</strong> {cat.tech}
                  </div>
                  <Link
                    href={`/tienda/${cat.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-[#FF5E14] hover:underline"
                  >
                    <span>Ver {cat.anchor}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: TABLA DE PRECIOS POR ESCALA MAYORISTA */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14]">
              Transparencia de Costos en Panamá
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
              Tabla Orientativa de Precios por Escala (50, 100 y 250 Unidades)
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
              En Panamá la mayoría de proveedores ocultan sus precios y te obligan a esperar días por un correo. En RufPixel trabajamos con tres escalas mayoristas claras para que planifiques tu presupuesto de marketing o recursos humanos al instante:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0D0D0D] text-white">
                  <th className="p-4 rounded-tl-2xl font-extrabold">Artículo Promocional</th>
                  <th className="p-4 font-extrabold">Escala 50 uds</th>
                  <th className="p-4 font-extrabold">Escala 100 uds (-5%)</th>
                  <th className="p-4 font-extrabold">Escala 250 uds (-10%)</th>
                  <th className="p-4 rounded-tr-2xl font-extrabold">Técnica Recomendada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">
                    <Link href="/tienda/boligrafos-y-plumas" className="hover:text-[#FF5E14] underline">
                      Bolígrafos promocionales y ecológicos
                    </Link>
                  </td>
                  <td className="p-4">Desde $0.50 / ud</td>
                  <td className="p-4">Desde $0.48 / ud</td>
                  <td className="p-4 font-extrabold text-emerald-700">Desde $0.45 / ud</td>
                  <td className="p-4">UV DTF / Impresión directa</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">
                    <Link href="/tienda/boligrafos-y-plumas" className="hover:text-[#FF5E14] underline">
                      Plumas ejecutivas metálicas de lujo
                    </Link>
                  </td>
                  <td className="p-4">Desde $1.50 / ud</td>
                  <td className="p-4">Desde $1.43 / ud</td>
                  <td className="p-4 font-extrabold text-emerald-700">Desde $1.35 / ud</td>
                  <td className="p-4">Grabado Láser de Fibra</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">
                    <Link href="/tienda/llaveros" className="hover:text-[#FF5E14] underline">
                      Llaveros personalizados (metal / bambú)
                    </Link>
                  </td>
                  <td className="p-4">Desde $1.25 / ud</td>
                  <td className="p-4">Desde $1.19 / ud</td>
                  <td className="p-4 font-extrabold text-emerald-700">Desde $1.12 / ud</td>
                  <td className="p-4">Grabado Láser permanente</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">
                    <Link href="/tienda/bolsas-y-totes" className="hover:text-[#FF5E14] underline">
                      Bolsas ecológicas, manta sucia y yute
                    </Link>
                  </td>
                  <td className="p-4">Desde $1.65 / ud</td>
                  <td className="p-4">Desde $1.57 / ud</td>
                  <td className="p-4 font-extrabold text-emerald-700">Desde $1.49 / ud</td>
                  <td className="p-4">DTF Textil Full Color</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">
                    <Link href="/tienda/libretas-y-cuadernos" className="hover:text-[#FF5E14] underline">
                      Agendas y libretas corporativas
                    </Link>
                  </td>
                  <td className="p-4">Desde $1.95 / ud</td>
                  <td className="p-4">Desde $1.85 / ud</td>
                  <td className="p-4 font-extrabold text-emerald-700">Desde $1.75 / ud</td>
                  <td className="p-4">Grabado Láser / UV DTF 3D</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">
                    <Link href="/tienda/tazas-botellas-y-termos" className="hover:text-[#FF5E14] underline">
                      Tazas personalizadas y termos de acero
                    </Link>
                  </td>
                  <td className="p-4">Desde $2.20 / ud</td>
                  <td className="p-4">Desde $2.09 / ud</td>
                  <td className="p-4 font-extrabold text-emerald-700">Desde $1.98 / ud</td>
                  <td className="p-4">Grabado Láser / UV DTF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">
            * Los precios exactos dependen del modelo seleccionado dentro de cada categoría. En todas las fichas del catálogo puedes descargar tu cotización formal en PDF.
          </p>
        </section>

        {/* SECCIÓN 3: FÁBRICAS Y TALLER DE PERSONALIZACIÓN (TÉCNICAS) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14]">
              Tecnología de Marcaje Propia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
              Fábricas y Taller de Promocionales en Panamá: ¿Qué Técnica Elegir para tu Logo?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
              El error más común al comprar productos promocionales en Panamá es aplicar la técnica equivocada sobre el material. Así trabajamos cada superficie en nuestro taller para garantizar que tu marca perdure:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-3 shadow-sm">
              <div className="inline-flex items-center space-x-2 text-xs font-extrabold text-[#FF5E14] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Metales, Acero, Madera y Bambú</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 font-outfit">
                1. Grabado Láser de Fibra y CO2 (Imborrable)
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Remueve microcapas superficiales del metal o la madera sin usar tintas que se pelen. Es la técnica obligatoria para <strong>termos de acero inoxidable, vasos térmicos, bolígrafos metálicos, llaveros cromados y tablas de bambú</strong>.
              </p>
              <Link href="/servicios/grabados-laser" className="inline-flex items-center space-x-1 text-xs font-extrabold text-[#FF5E14] hover:underline pt-1">
                <span>Conocer el servicio de Grabado Láser en Panamá</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-3 shadow-sm">
              <div className="inline-flex items-center space-x-2 text-xs font-extrabold text-[#FF5E14] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Superficies Rígidas a Todo Color</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 font-outfit">
                2. Transfer UV DTF con Relieve 3D y Barniz UV
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Cuando tu manual de marca exige colores corporativos exactos o degradados sobre rígidos (<strong>tazas, cuadernos, porta celulares, acrílico o vidrio</strong>), el UV DTF cura la tinta con luz ultravioleta y deposita una capa de barniz brillante tridimensional resistente al agua.
              </p>
              <Link href="/servicios/uv-dtf" className="inline-flex items-center space-x-1 text-xs font-extrabold text-[#FF5E14] hover:underline pt-1">
                <span>Ver detalles de Transfer UV DTF en Panamá</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-3 shadow-sm">
              <div className="inline-flex items-center space-x-2 text-xs font-extrabold text-[#FF5E14] uppercase">
                <Printer className="w-4 h-4" />
                <span>Bolsas, Suéteres, Mochilas y Paraguas</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 font-outfit">
                3. Impresión DTF Textil Directo Full Color
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Supera a la serigrafía tradicional cuando tienes logotipos policromáticos o necesitas estampar sobre <strong>bolsas de manta sucia, bolsas de yute, loncheras térmicas, cangureras y suéteres de algodón o Dry-Fit</strong> sin cobros por número de colores.
              </p>
              <Link href="/servicios/dtf-textil" className="inline-flex items-center space-x-1 text-xs font-extrabold text-[#FF5E14] hover:underline pt-1">
                <span>Explorar Impresión DTF Textil en Panamá</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-3 shadow-sm">
              <div className="inline-flex items-center space-x-2 text-xs font-extrabold text-[#FF5E14] uppercase">
                <Shirt className="w-4 h-4" />
                <span>Polos, Camisas Tipo Columbia y Gorras</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 font-outfit">
                4. Bordado Computarizado Industrial
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                El estándar ejecutivo para <strong>camisas estilo Columbia, suéteres tipo polo, gorras estructuradas y uniformes corporativos</strong> en Panamá. Utilizamos hilos industriales de poliéster que soportan sol tropical y lavado continuo sin desteñir.
              </p>
              <Link href="/servicios/bordados-computarizados" className="inline-flex items-center space-x-1 text-xs font-extrabold text-[#FF5E14] hover:underline pt-1">
                <span>Ver servicio de Bordados en Panamá</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: PUENTE B2B CON BANNERS, ROLL-UP Y GRAN FORMATO PARA FERIAS */}
        <section className="bg-[#0D0D0D] text-white rounded-3xl p-8 sm:p-12 border border-gray-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center space-x-2 text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Solución Integral para Ferias, Congresos y Eventos en Panamá</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit">
                ¿Vas a una Feria o Evento? Equipa tu Stand Completo: Banners, Roll-Up, Banderolas + Promocionales
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Unifica todo tu pedido con un solo proveedor responsable en Panamá. Además de tus <strong>bolígrafos, lanyards, bolsas ecológicas y termos con logo</strong>, en RufPixel fabricamos e imprimimos tus <strong>estructuras Roll-Up retráctiles de aluminio, Banners tipo Araña, Banderolas publicitarias (tipo gota y vela), Backing de prensa, manteles publicitarios para mesas plegables y viniles adhesivos o microperforados</strong>.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/servicios/impresion-gran-formato"
                  className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center space-x-2"
                >
                  <span>Ver Banners, Roll-Up, Banderolas y Gran Formato</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/servicios/flyers-y-folletos"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold border border-gray-700 transition-all"
                >
                  <span>Ver Flyers, Trípticos y Tarjetas de Presentación</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-3 text-xs text-gray-300">
              <div className="font-extrabold text-white text-sm font-outfit">
                Kit Recomendado para Stand de Feria en Panamá:
              </div>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>2 Estructuras Roll-Up de aluminio (0.85 × 2.00 m)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>1 Mantel publicitario o Banderola tipo Vela</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>250 Bolígrafos personalizados con logo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>100 Bolsas de manta sucia o cambrel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>50 Termos o Agendas para clientes clave</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECCIÓN 5: PREGUNTAS FRECUENTES */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-[#FF5E14]">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-2xl font-extrabold text-gray-900 font-outfit">
              Preguntas Frecuentes sobre Artículos Promocionales en Panamá
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-sm text-gray-900 font-outfit">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
