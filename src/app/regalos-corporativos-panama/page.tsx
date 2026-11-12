import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Gift, CheckCircle2, ArrowRight, PhoneCall, ShieldCheck,
  Sparkles, HelpCircle, AlertTriangle, Check, Tag, Layers, Award
} from 'lucide-react';
import { BreadcrumbListSchema, FAQPageSchema } from '@/components/seo/SchemaOrg';

export const metadata: Metadata = {
  title: 'Regalos Corporativos en Panamá con tu Logo | RufPixel',
  description: 'Regalos corporativos y empresariales personalizados en Panamá desde 50 uds: kits de bienvenida, sets ejecutivos y fin de año. Pagos Yappy y ACH.',
  alternates: {
    canonical: 'https://rufpixel.com/regalos-corporativos-panama',
  },
  openGraph: {
    title: 'Regalos Corporativos en Panamá con tu Logo | RufPixel',
    description: 'Regalos corporativos y empresariales personalizados en Panamá desde 50 uds: kits de bienvenida, sets ejecutivos y fin de año. Pagos Yappy y ACH.',
    url: 'https://rufpixel.com/regalos-corporativos-panama',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
    images: [
      {
        url: 'https://rufpixel.com/images/services/grabado-laser-termos-vasos-panama.webp',
        width: 1200,
        height: 630,
        alt: 'Regalos Corporativos y Empresariales Personalizados en Panamá - RufPixel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regalos Corporativos en Panamá con tu Logo | RufPixel',
    description: 'Regalos corporativos y empresariales personalizados en Panamá desde 50 uds: kits de bienvenida, sets ejecutivos y fin de año. Pagos Yappy y ACH.',
  },
};

export default function RegalosCorporativosPanamaPage() {
  const breadcrumbs = [
    { name: 'Inicio', url: 'https://rufpixel.com' },
    { name: 'Artículos Promocionales en Panamá', url: 'https://rufpixel.com/articulos-promocionales-panama' },
    { name: 'Regalos Corporativos en Panamá', url: 'https://rufpixel.com/regalos-corporativos-panama' },
  ];

  const occasions = [
    {
      title: 'Kits de Bienvenida para Nuevos Empleados (Onboarding)',
      desc: 'Causa una primera impresión memorable el primer día de trabajo. Armamos kits con agenda corporativa, bolígrafo metálico grabado, vaso térmico de acero, lanyard porta carnet y mochila o bolsa de manta sucia.',
      links: [
        { href: '/tienda/sets-y-regalos', label: 'Ver Sets y Regalos' },
        { href: '/tienda/libretas-y-cuadernos', label: 'Agendas Corporativas' },
      ],
    },
    {
      title: 'Regalos de Fin de Año para Empresas y Clientes VIP',
      desc: 'Agradece la lealtad de tus clientes estratégicos, junta directiva y colaboradores en noviembre y diciembre con obsequios durables: tablas de quesos y sets de vino en bambú grabados a láser, termos de acero y plumas de lujo.',
      links: [
        { href: '/tienda/cocina-y-hogar', label: 'Tablas de Bambú y Sets de Vino' },
        { href: '/tienda/tazas-botellas-y-termos', label: 'Termos Personalizados' },
      ],
    },
    {
      title: 'Obsequios para Congresos, Clínicas, Bancos y Colegios',
      desc: 'Dotación para seminarios médicos, aniversarios institucionales, graduaciones y ferias financieras en Panamá. Paquetes de 50, 100 y 250 unidades con control de calidad pieza por pieza.',
      links: [
        { href: '/tienda/boligrafos-y-plumas', label: 'Plumas Ejecutivas' },
        { href: '/tienda/bolsas-y-totes', label: 'Bolsas de Yute y Canvas' },
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cuál es la diferencia entre regalos corporativos ejecutivos y artículos promocionales masivos?',
      answer: 'Los artículos promocionales masivos están pensados para alto alcance en ferias (bolígrafos económicos, llaveros o bolsas de cambrel). Los regalos corporativos ejecutivos buscan fidelizar a un cliente VIP, directivo o colaborador mediante piezas de mayor valor percibido (sets en estuche, termos de acero inoxidable, tablas de bambú o plumas metálicas grabadas a láser).'
    },
    {
      question: '¿Puedo pedir menos de 50 regalos corporativos si son solo para mi junta directiva?',
      answer: 'En nuestro catálogo web los paquetes mayoristas inician en 50, 100 y 250 unidades. Sin embargo, si necesitas personalizar entre 5 y 30 regalos ejecutivos con grabado láser o UV DTF, podemos cotizarlos de forma personalizada en nuestro taller vía WhatsApp al +507 6445-4084.'
    },
    {
      question: '¿Con cuánta anticipación debo pedir los regalos corporativos de fin de año en Panamá?',
      answer: 'Para entregas de noviembre y diciembre en Panamá, recomendamos confirmar tu pedido entre septiembre y principios de noviembre. Así aseguras el stock exacto de colores y modelos antes de la alta demanda estacional.'
    },
    {
      question: '¿Qué métodos de pago y facturación manejan para empresas?',
      answer: 'Aceptamos pagos directos vía Yappy Comercial (+507 6445-4084) y transferencia bancaria ACH en Panamá. Emitimos cotización formal en PDF y factura para tu departamento de compras.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <BreadcrumbListSchema items={breadcrumbs} />
      <FAQPageSchema questions={faqs} />

      {/* HERO */}
      <section className="bg-[#0D0D0D] text-white py-14 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-[#FF5E14] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/articulos-promocionales-panama" className="hover:text-[#FF5E14] transition-colors">
              Artículos Promocionales en Panamá
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Regalos Corporativos en Panamá</span>
          </nav>

          <div className="max-w-4xl space-y-5">
            <span className="inline-flex items-center space-x-2 text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3.5 py-1.5 rounded-lg">
              <Gift className="w-3.5 h-3.5" />
              <span>Obsequios Empresariales · Kits de Bienvenida · Fin de Año</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit leading-tight">
              Regalos Corporativos y Empresariales Personalizados en Panamá
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Diseñamos y personalizamos <strong>regalos corporativos en Panamá</strong> que tus clientes y colaboradores sí conservan en su escritorio y su hogar: sets ejecutivos en estuche, termos de acero grabados a láser, agendas en cuero PU, tablas de quesos en bambú y kits de bienvenida con envío a todo el país.
            </p>

            <div className="flex flex-wrap gap-3.5 pt-2">
              <Link
                href="/tienda/sets-y-regalos"
                className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3.5 rounded-xl text-sm font-extrabold shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center space-x-2"
              >
                <span>Ver Categoría de Sets y Regalos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/50764454084?text=Hola%20RufPixel,%20quisiera%20cotizar%20regalos%20corporativos%20personalizados%20para%20mi%20empresa%20en%20Panam%C3%A1."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-xl text-sm font-extrabold shadow-md transition-all flex items-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Asesoría de Regalos en WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* REGLA 9 & REGLA 8 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-amber-50/80 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-extrabold uppercase tracking-wider text-xs">
              <Tag className="w-4 h-4 text-[#FF5E14]" />
              <span>Lo esencial, por si no lees todo</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Acabado ejecutivo:</strong> Priorizamos el <strong>grabado láser permanente</strong> en metal, bambú y cuero PU para que el regalo se vea distinguido y no como publicidad desechable.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Kits a medida:</strong> Puedes elegir nuestros <Link href="/tienda/sets-y-regalos" className="text-[#FF5E14] font-bold underline">sets de regalo en caja</Link> o armar tu propia combinación de agenda + pluma + termo + bolsa.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Escalas de 50, 100 y 250 unidades</strong> en web, con atención especial por WhatsApp para lotes ejecutivos menores.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 bg-red-50/60 border border-red-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center space-x-2 text-red-900 font-extrabold uppercase tracking-wider text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Lo que este servicio NO incluye</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>No vendemos canastas navideñas de alimentos perecederos ni licores:</strong> Nos especializamos en artículos corporativos físicos personalizables (madera, metal, textil y escritorio).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Plazos sujetos a volumen y técnica:</strong> En temporada alta de fin de año no garantizamos entregas de un día para otro sin reserva previa de inventario.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FOTOS REALES DE SETS Y REGALOS CORPORATIVOS ENTREGADOS EN PANAMÁ */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14]">
                Producción Real en Taller
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-outfit">
                Sets y Regalos Corporativos Personalizados en Panamá
              </h2>
            </div>
            <Link href="/galeria" className="text-xs font-extrabold text-[#FF5E14] hover:underline">
              Ver los 10 trabajos en Galería →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src="/images/trabajos/set-regalo-libreta-bambu-boligrafo-llavero-grabado-laser-panama.jpg"
                alt="Set ejecutivo con libreta de bambú, bolígrafo y llavero de madera grabados a láser en caja negra"
                title="Set ejecutivo en bambú grabado"
                width={1050}
                height={1400}
                className="w-full h-80 object-cover"
              />
              <figcaption className="p-4 text-xs text-gray-700 font-medium">
                Set ejecutivo con libreta de bambú, bolígrafo y llavero de madera grabados a láser en caja negra de presentación.
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src="/images/trabajos/set-boligrafo-y-llavero-grabado-en-caja-de-regalo-panama.jpg"
                alt="Set de regalo corporativo con bolígrafo y llavero personalizados dentro de una caja negra"
                title="Set de bolígrafo y llavero en caja"
                width={1050}
                height={1400}
                loading="lazy"
                className="w-full h-80 object-cover"
              />
              <figcaption className="p-4 text-xs text-gray-700 font-medium">
                Set de regalo corporativo con bolígrafo y llavero personalizados dentro de estuche rígido.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* OCASIONES Y TIPOS DE REGALOS CORPORATIVOS */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
            Ideas de Regalos Empresariales según la Ocasión en Panamá
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {occasions.map((occ, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF5E14]/10 text-[#FF5E14] flex items-center justify-center font-extrabold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 font-outfit">
                    {occ.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {occ.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                  {occ.links.map((lnk) => (
                    <Link
                      key={lnk.href}
                      href={lnk.href}
                      className="inline-flex items-center space-x-1 text-xs font-extrabold text-[#FF5E14] bg-orange-50 px-3 py-1.5 rounded-xl hover:bg-[#FF5E14] hover:text-white transition-colors"
                    >
                      <span>{lnk.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ENLACE AL PILAR Y CATEGORÍAS */}
        <section className="bg-[#0D0D0D] text-white rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-extrabold font-outfit">
              Explora el Catálogo Completo de Artículos Promocionales en Panamá
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Consulta precios unitarios por escala en nuestra página pilar de{' '}
              <Link href="/articulos-promocionales-panama" className="text-[#FF5E14] font-extrabold underline">
                artículos promocionales en Panamá
              </Link>{' '}
              o visita directamente la categoría de{' '}
              <Link href="/tienda/sets-y-regalos" className="text-white font-bold underline">
                sets ejecutivos y regalos corporativos
              </Link>.
            </p>
          </div>
          <Link
            href="/articulos-promocionales-panama"
            className="shrink-0 bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center space-x-2"
          >
            <span>Ir al Pilar de Promocionales</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* FAQS */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-[#FF5E14]">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-2xl font-extrabold text-gray-900 font-outfit">
              Preguntas Frecuentes sobre Regalos Corporativos en Panamá
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
