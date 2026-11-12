import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/wordpress';
import { ArrowLeft, ArrowRight, Clock, User, Tag } from 'lucide-react';
import { ArticleSchema, BreadcrumbListSchema } from '@/components/seo/SchemaOrg';

function buildBlogTitle(title: string): string {
  const brand = ' | RufPixel';
  const candidate = `${title}${brand}`;
  if (candidate.length >= 50 && candidate.length <= 60) return candidate;
  if (candidate.length < 50) {
    const padded = `${title} en Panamá${brand}`;
    if (padded.length >= 50 && padded.length <= 60) return padded;
    return `${title} — Guía RufPixel Panamá`.slice(0, 59);
  }
  const maxBody = 59 - brand.length - 3;
  return `${title.slice(0, maxBody).trim()}...${brand}`;
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

  const seoTitle = buildBlogTitle(post.title);
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

      {/* SILO Authority Callout to Money Pillar */}
      <div className="bg-[#0D0D0D] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 text-xs sm:text-sm text-gray-300">
          <span className="text-[#FF5E14] font-extrabold uppercase tracking-wider text-xs block">
            Catálogo Mayorista en Panamá
          </span>
          <p className="leading-relaxed">
            Consulta los 166 modelos con precios por escala (50, 100 y 250 unidades) en nuestra página de{' '}
            <Link href="/articulos-promocionales-panama" className="text-white font-extrabold underline decoration-[#FF5E14] hover:text-[#FF5E14]">
              artículos promocionales en Panamá
            </Link>{' '}
            o cotiza tus estructuras de{' '}
            <Link href="/servicios/impresion-gran-formato" className="text-gray-200 underline hover:text-[#FF5E14]">
              banners, roll-up y gran formato
            </Link>.
          </p>
        </div>
        <Link
          href="/articulos-promocionales-panama"
          className="shrink-0 bg-[#FF5E14] hover:bg-[#E04700] text-white px-5 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2"
        >
          <span>Ver Precios por Escala</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Footer Share & Tag Callout */}
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

        <Link
          href="/cotizador"
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md"
        >
          ¿Necesitas desde 1 sola pieza? Cotiza en Zona Pixel
        </Link>
      </div>
    </article>
  );
}
