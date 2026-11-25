import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/wordpress';
import { MOCK_BLOG_POSTS } from '@/lib/mockData';
import { ArrowLeft, Clock, User, PhoneCall, ArrowRight, BookOpen } from 'lucide-react';
import { ArticleSchema, BreadcrumbListSchema, FAQPageSchema } from '@/components/seo/SchemaOrg';

const FABRICA_FAQS = [
  {
    question: '¿Cuál es el pedido mínimo para cotizar con precios de fábrica en Panamá?',
    answer: 'En nuestro catálogo B2B en línea los paquetes inician en 50, 100 y 250 unidades por modelo. En taller también atendemos pedidos de menor volumen para regalos directivos o muestras previas (desde 1 sola pieza en grabado láser de termos, bordado de camisas o banners Roll-Up).'
  },
  {
    question: '¿Puedo llevar mis propios artículos o prendas para que hagan el bordado o grabado?',
    answer: 'Sí. Prestamos servicio de maquila gráfica directa: puedes traer tus propios termos Stanley, polos, camisas de trabajo o mochilas a nuestro taller de La Chorrera o coordinar la recepción en Ciudad de Panamá, cobrando únicamente la mano de obra del marcado.'
  },
  {
    question: '¿Cuáles son los tiempos habituales de producción y despacho?',
    answer: 'Un pedido estándar de 50 a 250 artículos personalizados toma entre 3 y 5 días hábiles tras aprobar la simulación digital. Para eventos con fecha cerrada contamos con servicio prioritario en taller sujeto a disponibilidad de máquina.'
  },
  {
    question: '¿Hacen envíos a Ciudad de Panamá, Panamá Oeste y provincias centrales?',
    answer: 'Sí. Realizamos entregas directas a oficinas corporativas en Ciudad de Panamá (Costa del Este, Obarrio, Punta Pacífica, Clayton), entregas en Panamá Oeste (Costa Verde, La Chorrera, Arraiján) y despachos nacionales por Uno Express, Fletes Chavale y Ferguson con número de guía rastreable.'
  }
];

const BLOG_SEO_TITLES: Record<string, string> = {
  'como-preparar-tus-archivos-para-impresion-sin-errores': 'Cómo Preparar Archivos para Impresión CMYK | RufPixel', // 53
  'dtf-vs-sublimacion-cual-es-mejor-para-tus-uniformes': 'DTF Textil vs Sublimación para Uniformes | RufPixel', // 51
  'tendencias-en-regalos-corporativos-para-este-ano': 'Tendencias en Regalos Corporativos Panamá | RufPixel', // 52
  'que-regalar-a-clientes-por-menos-de-3-dolares-panama': 'Regalos para Clientes por Menos de $3 Panamá | RufPixel', // 55
  'cuanto-cuesta-personalizar-100-boligrafos-en-panama': 'Cuánto Cuesta Personalizar 100 Bolígrafos PA | RufPixel', // 55
  'promocionales-para-feria-o-congreso-lista-y-cantidades': 'Artículos Promocionales para Ferias en Panamá | RufPixel', // 56
  'kit-de-bienvenida-para-nuevos-empleados-panama': 'Kit de Bienvenida para Empleados en Panamá | RufPixel', // 53
  'grabado-laser-uv-dtf-o-serigrafia-cual-conviene': 'Grabado Láser, UV DTF o Serigrafía en Panamá | RufPixel', // 55
  'termos-personalizados-materiales-y-que-marcado-aguantan': 'Termos Personalizados: Materiales y Grabado | RufPixel', // 54
  'regalos-de-fin-de-ano-para-empresas-en-panama': 'Regalos de Fin de Año para Empresas Panamá | RufPixel', // 53
  'bolsas-ecologicas-con-logo-algodon-yute-o-non-woven': 'Bolsas Ecológicas con Logo: Manta y Yute PA | RufPixel', // 54
  'gorras-con-logo-bordado-3d-o-dtf-cual-dura-mas': 'Gorras con Logo: Bordado 3D vs DTF en Panamá | RufPixel', // 55
  'promocionales-para-colegios-clinicas-y-bancos-panama': 'Promocionales para Clínicas, Colegios y Bancos | RufPixel', // 57
  'que-pedir-cuando-necesitas-50-unidades-entrega-rapida': 'Promocionales desde 50 Unidades en Panamá | RufPixel', // 52
  'rollup-vs-banner-arana-cual-elegir-para-tu-evento': 'Roll-Up vs Banner Araña para Eventos Panamá | RufPixel', // 54
  'vinil-adhesivo-microperforado-o-esmerilado-vidrieras-panama': 'Vinil Adhesivo, Microperforado y Esmerilado | RufPixel', // 54
  'fabrica-de-articulos-promocionales-vs-revendedores-panama': 'Fábrica de Artículos Promocionales en Panamá: Ahorra 30% | RufPixel',
};

function buildBlogTitle(title: string, slug?: string): string {
  if (slug && BLOG_SEO_TITLES[slug]) return BLOG_SEO_TITLES[slug];
  const brand = ' | RufPixel';
  const candidate = `${title}${brand}`;
  if (candidate.length >= 50 && candidate.length <= 60) return candidate;
  if (candidate.length < 50) {
    const padded = `${title} en Panamá${brand}`;
    if (padded.length >= 50 && padded.length <= 60) return padded;
    return `${title} — Guía RufPixel Panamá`.slice(0, 59);
  }
  const maxBody = 60 - brand.length;
  const words = title.split(' ');
  let acc = '';
  for (const w of words) {
    if ((acc ? acc + ' ' + w : w).length <= maxBody) {
      acc = acc ? acc + ' ' + w : w;
    } else break;
  }
  return `${acc.replace(/[:;,.]+$/, '')}${brand}`;
}

function buildBlogDescription(excerpt: string): string {
  const clean = excerpt.replace(/<[^>]+>/g, '').trim();
  if (clean.length >= 120 && clean.length <= 155) return clean;
  if (clean.length > 155) return clean.slice(0, 151).trim() + '...';
  return `${clean} Cotiza con precios por escala en RufPixel Panamá.`.slice(0, 155);
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Artículo no encontrado | RufPixel' };

  const seoTitle = buildBlogTitle(post.title, post.slug);
  const seoDesc = buildBlogDescription(post.excerpt);
  const canonicalUrl = `https://rufpixel.com/blog/${post.slug}`;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: canonicalUrl,
      siteName: 'RufPixel',
      locale: 'es_PA',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
    },
  };
}

export default async function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Inicio', url: 'https://rufpixel.com' },
    { name: 'Blog y Guías', url: 'https://rufpixel.com/blog' },
    { name: post.title, url: `https://rufpixel.com/blog/${post.slug}` },
  ];

  return (
    <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <ArticleSchema post={post} />
      <BreadcrumbListSchema items={breadcrumbs} />

      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-500 flex-wrap">
        <Link href="/" className="hover:text-[#FF5E14] transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[#FF5E14] transition-colors">Blog y Guías</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-xs">{post.title}</span>
      </nav>

      <div>
        <Link href="/blog" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a todas las guías del blog</span>
        </Link>
      </div>

      <div className="space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 font-outfit leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-y border-gray-200 py-3">
          <div className="flex items-center space-x-1.5">
            <User className="w-4 h-4 text-[#FF5E14]" />
            <span>Por <strong>{post.author}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-[#FF5E14]" />
            <span>{post.date} · {post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured Header Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg h-80 sm:h-96 relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Main HTML Content */}
      <div
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Schema FAQPage si aplica */}
      {post.slug === 'fabrica-de-articulos-promocionales-vs-revendedores-panama' && (
        <FAQPageSchema questions={FABRICA_FAQS} />
      )}

      {/* Único bloque CTA final limpio y directo (B2B + WhatsApp) */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-gray-800">
        <div className="space-y-2 text-xs sm:text-sm text-gray-300 max-w-xl">
          <span className="text-[#FF5E14] font-extrabold uppercase tracking-wider text-xs flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Atención Directa de Fábrica en Panamá</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-outfit m-0">
            ¿Deseas cotizar este servicio o material con tu logo?
          </h3>
          <p className="leading-relaxed text-gray-300 m-0">
            Explora nuestro catálogo en línea con precios por escala o escríbenos directamente a nuestro WhatsApp oficial para recibir asesoría técnica y una propuesta formal el mismo día.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Link
            href="/articulos-promocionales-panama"
            className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3.5 rounded-2xl text-xs font-black shadow-md transition-all text-center flex items-center justify-center space-x-2"
          >
            <span>Ver Catálogo B2B en Línea</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`https://wa.me/50764454084?text=${encodeURIComponent(
              `Hola RufPixel, estuve leyendo el artículo "${post.title}" y quisiera solicitar una cotización formal.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-2xl text-xs font-black shadow-lg shadow-emerald-500/25 transition-all text-center flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Cotizar por WhatsApp Ahora</span>
          </a>
        </div>
      </div>

      {/* Módulo de Guías Relacionadas del Blog (Retención y Topic Authority) */}
      <section className="pt-8 border-t border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#FF5E14]" />
            <h3 className="text-lg font-extrabold text-gray-900 font-outfit m-0">
              Guías y Artículos Relacionados
            </h3>
          </div>
          <Link href="/blog" className="text-xs font-bold text-[#FF5E14] hover:underline flex items-center space-x-1">
            <span>Ver todo el blog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(() => {
            if (post.slug === 'fabrica-de-articulos-promocionales-vs-revendedores-panama') {
              const promoSlugs = [
                'grabado-laser-uv-dtf-o-serigrafia-cual-conviene',
                'gorras-con-logo-bordado-computarizado-o-dtf',
                'termos-personalizados-materiales-y-que-marcado-aguantan'
              ];
              const matches = promoSlugs
                .map(s => MOCK_BLOG_POSTS.find(p => p.slug === s))
                .filter(Boolean) as typeof MOCK_BLOG_POSTS;
              if (matches.length > 0) return matches;
            }
            return MOCK_BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
          })().map((rPost) => (
            <Link
              key={rPost.id}
              href={`/blog/${rPost.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#FF5E14]/40 transition-all flex flex-col"
            >
              <div className="h-36 overflow-hidden bg-gray-100 relative">
                <img
                  src={rPost.image}
                  alt={rPost.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  {rPost.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#FF5E14] transition-colors line-clamp-2 leading-snug">
                  {rPost.title}
                </h4>
                <div className="text-[11px] text-gray-500 flex items-center justify-between pt-2 border-t border-gray-100">
                  <span>{rPost.readTime}</span>
                  <span className="text-[#FF5E14] font-bold group-hover:translate-x-0.5 transition-transform">Leer →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
