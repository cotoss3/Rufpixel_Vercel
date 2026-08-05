import React from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/wordpress';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `Artículos de ${params.slug} — Blog RufPixel`,
    description: `Publicaciones en la categoría ${params.slug}.`,
  };
}

export default async function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const { posts } = await getBlogPosts(1, 50);
  const filtered = posts.filter((p) => p.categorySlug === params.slug || p.category.toLowerCase().includes(params.slug));

  const categories = [
    { slug: 'todos', label: 'Todos los Artículos' },
    { slug: 'consejos', label: 'Consejos de Impresión' },
    { slug: 'materiales', label: 'Materiales & Acabados' },
    { slug: 'gran-formato', label: 'Gran Formato' },
  ];

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <Link href="/blog" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al blog completo</span>
        </Link>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-gray-200">
        {categories.map((cat) => {
          const active = cat.slug === params.slug;
          return (
            <Link
              key={cat.slug}
              href={cat.slug === 'todos' ? '/blog' : `/blog/categoria/${cat.slug}`}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 font-outfit capitalize">
        Categoría de Blog: {params.slug.replace('-', ' ')}
      </h1>

      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-gray-200 space-y-4">
          <p className="text-gray-500">No hay artículos publicados en esta categoría por ahora.</p>
          <Link href="/blog" className="inline-block bg-[#FF5E14] text-white px-6 py-2.5 rounded-xl font-bold text-xs">
            Ver Todos los Artículos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
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
                  <span>Leer artículo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
