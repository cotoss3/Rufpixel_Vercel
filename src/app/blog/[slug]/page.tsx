import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/wordpress';
import { ArrowLeft, Clock, User, Tag, PhoneCall, MessageCircle } from 'lucide-react';
import { ArticleSchema, BreadcrumbListSchema } from '@/components/seo/SchemaOrg';

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
  'fabrica-de-articulos-promocionales-vs-revendedores-panama': 'Fábrica de Artículos Promocionales en Panamá | RufPixel', // 55
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

      {/* Direct WhatsApp Quote Conversion Box */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-gray-800">
        <div className="space-y-2 text-xs sm:text-sm text-gray-300 max-w-xl">
          <span className="text-[#FF5E14] font-extrabold uppercase tracking-wider text-xs flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Atención Inmediata por WhatsApp</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-outfit">
            ¿Deseas cotizar este servicio o material con tu logo?
          </h3>
          <p className="leading-relaxed text-gray-300">
            Escríbenos directamente a nuestro WhatsApp oficial. Indícanos tu cantidad aproximada, medidas o requerimiento y te enviamos asesoría técnica con cotización formal el mismo día.
          </p>
        </div>
        <a
          href={`https://wa.me/50764454084?text=${encodeURIComponent(
            `Hola RufPixel, estuve leyendo el artículo "${post.title}" y quisiera solicitar una cotización formal.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-[#25D366] hover:bg-[#20ba5a] text-white px-7 py-4 rounded-2xl text-sm font-extrabold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all flex items-center space-x-2.5"
        >
          <PhoneCall className="w-5 h-5" />
          <span>Cotizar por WhatsApp Ahora</span>
        </a>
      </div>

      {/* Footer Share, Tags & Quick WhatsApp Action */}
      <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs flex-wrap">
          <Tag className="w-4 h-4 text-[#FF5E14]" />
          <span className="font-bold text-gray-900">Etiquetas:</span>
          {post.tags.map((t, idx) => (
            <span key={idx} className="bg-gray-100 px-2 py-0.5 rounded text-[11px] text-gray-600">
              #{t}
            </span>
          ))}
        </div>

        <a
          href={`https://wa.me/50764454084?text=${encodeURIComponent(
            `Hola RufPixel, me interesa cotizar: ${post.title}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 hover:bg-[#FF5E14] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md transition-colors flex items-center space-x-2"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span>Chatear con un Asesor</span>
        </a>
      </div>
    </article>
  );
}
