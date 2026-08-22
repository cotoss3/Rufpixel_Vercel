import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CreditCard, Maximize2, FileText, Tag, Gift, ArrowRight, ShieldCheck, 
  Sparkles, CheckCircle2, Clock, Truck, Calculator, Star, ShoppingBag, ArrowUpRight
} from 'lucide-react';
import { MOCK_SERVICES, MOCK_TESTIMONIALS } from '@/lib/mockData';
import { getProducts } from '@/lib/woocommerce';
import { getBlogPosts } from '@/lib/wordpress';

export default async function HomePage() {
  const { products } = await getProducts();
  const featuredProducts = products.slice(0, 4);

  const { posts } = await getBlogPosts();
  const recentPosts = posts.slice(0, 3);

  const iconMap: Record<string, React.ReactNode> = {
    CreditCard: <CreditCard className="w-8 h-8 text-[#FF5E14]" />,
    Maximize2: <Maximize2 className="w-8 h-8 text-[#FF5E14]" />,
    FileText: <FileText className="w-8 h-8 text-[#FF5E14]" />,
    Tag: <Tag className="w-8 h-8 text-[#FF5E14]" />,
    Gift: <Gift className="w-8 h-8 text-[#FF5E14]" />,
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION - Vibrant Modern Agency Banner */}
      <section className="relative bg-gradient-to-br from-[#0D0D0D] via-[#141414] to-[#070707] text-white pt-12 pb-24 overflow-hidden border-b border-gray-800">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF5E14]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FF5E14]/10 border border-[#FF5E14]/30 rounded-full px-4 py-1.5 text-xs font-semibold text-[#FF5E14]">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Impresión Digital & Gran Formato en Panamá</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-outfit tracking-tight leading-tight">
                Impresión Corporativa de <span className="text-[#FF5E14] underline decoration-[#FF5E14]/40">Máxima Calidad</span> para tu Marca
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-lg max-w-2xl font-light leading-relaxed">
                Desde tarjetas de presentación con acabado Soft-Touch fino hasta Banners Roll-Up y viniles de gran formato. Transforma tus artes digitales en productos físicos impecables.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/tienda"
                  className="w-full sm:w-auto bg-[#FF5E14] hover:bg-[#E04700] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-[#FF5E14]/30 transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Ver Catálogo de Tienda</span>
                </Link>

                <Link
                  href="/cotizador"
                  className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 hover:border-[#FF5E14] px-8 py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-5 h-5 text-[#FF5E14]" />
                  <span>Cotizar Medidas (Pre-Orden)</span>
                </Link>
              </div>

              {/* Features Micro-bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-800 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Calidad de Impresión 1440 DPI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Entregas Rápida 24 - 48h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span>Pagos Seguros vía Yappy</span>
                </div>
              </div>

            </div>

            {/* Right Feature Card Image Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl bg-gray-900 group">
                <img
                  src="/images/hero-home.jpg"
                  alt="Impresión Digital & Gran Formato RufPixel"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Glass Accent Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0D0D0D]/90 backdrop-blur-md p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#FF5E14]">Destacado de la semana</span>
                    <h3 className="text-white font-bold text-base font-outfit">Tarjetas Soft-Touch Premium</h3>
                  </div>
                  <Link href="/producto/tarjetas-premium-soft-touch-100u" className="p-2.5 bg-[#FF5E14] text-white rounded-lg hover:bg-[#E04700]">
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. SERVICES SECTION - Printfix Card Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#FF5E14]">Nuestras Especialidades</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">
            Servicios de Impresión & Producción
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Cubrimos todas las necesidades gráficas de tu empresa con tecnología de punta y sustratos de primera calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#FF5E14]/50 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FF5E14]/10 flex items-center justify-center group-hover:bg-[#FF5E14] transition-colors">
                  {React.cloneElement(iconMap[service.iconName] as React.ReactElement, {
                    className: "w-7 h-7 text-[#FF5E14] group-hover:text-white transition-colors"
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF5E14] transition-colors font-outfit">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.shortDesc}
                </p>
                <ul className="space-y-2 pt-2 border-t border-gray-100">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-500 space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="inline-flex items-center space-x-2 text-sm font-bold text-[#FF5E14] hover:text-[#E04700] transition-colors"
                >
                  <span>Saber más sobre este servicio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. FEATURED PRODUCTS (WOOCOMMERCE) */}
      <section className="bg-gray-100 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF5E14]">Tienda WooCommerce</span>
              <h2 className="text-3xl font-extrabold text-gray-900 font-outfit mt-1">
                Productos Populares en Catálogo
              </h2>
            </div>
            <Link
              href="/tienda"
              className="mt-4 md:mt-0 text-sm font-bold text-[#FF5E14] hover:text-[#E04700] flex items-center space-x-1"
            >
              <span>Ver todos los productos ({featuredProducts.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 bg-gray-200 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#0D0D0D] text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-[#FF5E14] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 block">Precio desde:</span>
                    <span className="text-xl font-extrabold text-gray-900 font-outfit">
                      ${product.price.toFixed(2)} <span className="text-xs font-normal text-gray-500">USD</span>
                    </span>
                  </div>
                  <Link
                    href={`/producto/${product.slug}`}
                    className="p-2.5 bg-[#FF5E14] text-white rounded-xl hover:bg-[#E04700] transition-colors shadow-md shadow-[#FF5E14]/20"
                    aria-label={`Ver ${product.name}`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. PRE-ORDER BANNER (FASE 6 SCALABILITY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0D0D0D] to-[#1F1F1F] rounded-3xl p-8 sm:p-12 text-white border border-gray-800 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF5E14]/10 blur-3xl rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
                Cotizador en Línea
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit leading-tight">
                ¿Tienes un archivo con dimensiones específicas?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-xl">
                Envía tu arte (PDF, AI, PNG) con las medidas en centímetros o metros. El sistema calculará una estimación de precio y creará tu <strong>pre-orden</strong> para revisión inmediata.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href="/cotizador"
                className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-8 py-4 rounded-2xl font-extrabold text-base shadow-xl shadow-[#FF5E14]/30 transition-all hover:scale-105 flex items-center space-x-3"
              >
                <Calculator className="w-6 h-6" />
                <span>Iniciar Pre-Orden</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 5. TESTIMONIALS & GOOGLE REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full text-xs font-bold text-amber-900">
            <span className="text-amber-500">★★★★★</span>
            <span>5,0 de 5 estrellas en <strong>Google Maps</strong> (7 Reseñas)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">
            Reseñas Reales de Clientes
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Opiniones de nuestros clientes verificados en el perfil de Google Business de <strong>RufPixel - Casa Creativa</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                    <span>Google</span>
                  </span>
                </div>
                <p className="text-gray-700 text-xs italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#FF5E14]" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 font-outfit">{t.name}</h4>
                  <span className="text-[10px] text-gray-400 flex items-center">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 mr-1" />
                    {t.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 6. RECENT BLOG POSTS (WORDPRESS) */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF5E14]">Blog & Artículos</span>
              <h2 className="text-3xl font-extrabold text-gray-900 font-outfit mt-1">
                Consejos de Impresión & Diseño
              </h2>
            </div>
            <Link
              href="/blog"
              className="mt-4 md:mt-0 text-sm font-bold text-[#FF5E14] hover:text-[#E04700] flex items-center space-x-1"
            >
              <span>Ver todos los artículos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.id} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 flex flex-col justify-between group">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#FF5E14] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-xs text-gray-400">{post.date} · {post.readTime}</span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF5E14] transition-colors font-outfit line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3">
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
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
