import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/wordpress';
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { BreadcrumbListSchema } from '@/components/seo/SchemaOrg';

export const metadata: Metadata = {
  title: 'Guías de Promocionales, Banners e Imprenta | RufPixel', // 53 chars
  description: 'Guías de compra en Panamá: precios de artículos promocionales al por mayor, banners roll-up vs araña, vinil para vidrieras, grabado láser y DTF.', // 144 chars
  alternates: {
    canonical: 'https://rufpixel.com/blog',
  },
  openGraph: {
    title: 'Guías de Promocionales, Banners e Imprenta | RufPixel',
    description: 'Guías de compra en Panamá: precios de artículos promocionales al por mayor, banners roll-up vs araña, vinil para vidrieras, grabado láser y DTF.',
    url: 'https://rufpixel.com/blog',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default async function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = parseInt(searchParams?.page || '1', 10);
  const { posts, totalPages, totalPosts } = await getBlogPosts(page, 15);

  const categories = [
    { slug: 'todos', label: 'Todos los Artículos' },
    { slug: 'consejos', label: 'Consejos de Impresión' },
    { slug: 'materiales', label: 'Materiales & Acabados' },
    { slug: 'gran-formato', label: 'Gran Formato' },
  ];

  const breadcrumbs = [
    { name: 'Inicio', url: 'https://rufpixel.com' },
    { name: 'Blog y Guías', url: 'https://rufpixel.com/blog' },
  ];

  return (
    <div className="py-12 space-y-10">
      <BreadcrumbListSchema items={breadcrumbs} />
      {/* Blog Banner */}
      <section className="bg-[#0D0D0D] text-white py-14 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            Centro de Guías B2B RufPixel Panamá
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit">
            Guías de Artículos Promocionales, Impresión de Banners y Personalización en Panamá
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            Aprende a elegir entre técnicas de taller, escalas de precios mayoristas para{' '}
            <Link href="/articulos-promocionales-panama" className="text-[#FF5E14] underline font-bold">
              artículos promocionales en Panamá
            </Link>{' '}
            y estructuras de{' '}
            <Link href="/servicios/impresion-gran-formato" className="text-white underline font-bold hover:text-[#FF5E14]">
              impresión de banners, roll-up y gran formato
            </Link>.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 border-b border-gray-200">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === 'todos' ? '/blog' : `/blog/categoria/${cat.slug}`}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                cat.slug === 'todos'
                  ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#FF5E14] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-md">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-[#FF5E14]" />
                    <span>{post.date} · {post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#FF5E14] transition-colors font-outfit line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#FF5E14] hover:text-[#E04700] flex items-center space-x-1"
                >
                  <span>Leer artículo completo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 pt-8 border-t border-gray-200">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}`}
                className="p-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 font-bold text-xs flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </Link>
            )}

            {[...Array(totalPages)].map((_, i) => {
              const pNum = i + 1;
              const isCurrent = pNum === page;
              return (
                <Link
                  key={pNum}
                  href={`/blog?page=${pNum}`}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all ${
                    isCurrent
                      ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pNum}
                </Link>
              );
            })}

            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}`}
                className="p-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 font-bold text-xs flex items-center space-x-1"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
