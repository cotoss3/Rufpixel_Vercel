import React from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/wordpress';
import { Clock, ArrowRight, ArrowLeft, PhoneCall } from 'lucide-react';

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
    { slug: 'tomas-aereas', label: 'Tomas Aéreas & Drones' },
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

      {/* WhatsApp Express Quote Callout */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-gray-800">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-[#FF5E14] font-extrabold uppercase tracking-wider text-xs flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Atención Directa por WhatsApp</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-outfit">
            ¿Buscas asesoría técnica o presupuesto inmediato?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Escríbenos directamente a WhatsApp y te ayudamos a cotizar tus impresiones, promocionales o tomas aéreas al instante.
          </p>
        </div>
        <a
          href={`https://wa.me/50764454084?text=${encodeURIComponent(
            `Hola RufPixel, estoy explorando el blog en la categoría ${params.slug} y quisiera cotizar.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-[#25D366] hover:bg-[#20ba5a] text-white px-7 py-4 rounded-2xl text-sm font-extrabold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all flex items-center space-x-2"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Cotizar por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
