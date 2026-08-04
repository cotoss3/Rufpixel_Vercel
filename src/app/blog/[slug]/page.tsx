import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/wordpress';
import { ArrowLeft, Clock, User, Tag, Share2 } from 'lucide-react';
import { ArticleSchema } from '@/components/seo/SchemaOrg';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Artículo no encontrado — RufPixel Blog' };
  return {
    title: `${post.title} — RufPixel Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <ArticleSchema post={post} />

      <div>
        <Link href="/blog" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al blog</span>
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
      <div className="rounded-3xl overflow-hidden shadow-lg h-96 relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Main HTML Content */}
      <div
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer Share & Tag Callout */}
      <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs">
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
          className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md shadow-[#FF5E14]/20"
        >
          ¿Quieres imprimir un proyecto similar? Cotiza aquí
        </Link>
      </div>
    </article>
  );
}
