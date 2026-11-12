'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Camera, Zap, ExternalLink, MessageCircle, ShoppingBag, Eye, X
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  imgTitle: string;
  alt: string;
  width: number;
  height: number;
  category: 'grabados' | 'gran-formato' | 'sets' | 'kits';
  categoryLabel: string;
  image: string;
  description: string;
  materials: string;
  client: string;
  tags: string[];
}

const GALLERY_PROJECTS: ProjectItem[] = [
  {
    id: 'foto-3',
    title: 'Vasos térmicos con grabado láser',
    imgTitle: 'Vasos térmicos con grabado láser',
    alt: 'Vasos térmicos de acero negro, blanco y plateado con logo corporativo grabado a láser',
    width: 1050,
    height: 1400,
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: '/images/trabajos/vasos-termicos-acero-grabado-laser-logo-corporativo-panama.jpg',
    description: 'Marcado láser de fibra óptica sobre vasos térmicos de acero inoxidable en acabado negro mate, blanco y acero cepillado con contraste metálico permanente.',
    materials: 'Acero inoxidable doble pared con recubrimiento en polvo + Grabado láser de fibra',
    client: 'Pedido Corporativo — Panamá',
    tags: ['Grabado Láser', 'Vasos Térmicos', 'Acero Inoxidable', 'Promocionales'],
  },
  {
    id: 'foto-10',
    title: 'Vasos térmicos con escudo grabado',
    imgTitle: 'Vasos térmicos con escudo grabado',
    alt: 'Vasos térmicos negros con escudo grabado a láser, llavero y bolígrafo personalizados',
    width: 1050,
    height: 1400,
    category: 'grabados',
    categoryLabel: 'Grabados Láser & Kits',
    image: '/images/trabajos/vasos-termicos-negros-grabado-laser-escudo-llavero-boligrafo-panama.jpg',
    description: 'Conjunto institucional compuesto por vasos térmicos negros, llavero metálico y bolígrafo ejecutivo personalizados con escudo de alta definición.',
    materials: 'Vasos térmicos de acero + Llavero metálico + Bolígrafo de aluminio grabado a láser',
    client: 'Dotación Institucional — Panamá',
    tags: ['Escudos Grabados', 'Vasos Térmicos', 'Llaveros', 'Bolígrafos'],
  },
  {
    id: 'foto-7',
    title: 'Set ejecutivo en bambú grabado',
    imgTitle: 'Set ejecutivo en bambú grabado',
    alt: 'Set ejecutivo con libreta de bambú, bolígrafo y llavero de madera grabados a láser en caja negra',
    width: 1050,
    height: 1400,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/set-regalo-libreta-bambu-boligrafo-llavero-grabado-laser-panama.jpg',
    description: 'Estuche ejecutivo de presentación con libreta ecológica de portada en bambú, bolígrafo y llavero grabados a láser listos para entrega directiva.',
    materials: 'Bambú natural seleccionado, madera y estuche rígido negro con cuna interior',
    client: 'Regalos Corporativos — Panamá',
    tags: ['Set Ejecutivo', 'Libreta Bambú', 'Regalos de Fin de Año', 'Grabado Láser'],
  },
  {
    id: 'foto-6',
    title: 'Roll-up banners para evento',
    imgTitle: 'Roll-up banners para evento',
    alt: 'Cuatro roll-up banners impresos para un evento, impresión de gran formato en Panamá',
    width: 1400,
    height: 1050,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: '/images/trabajos/roll-up-banners-impresos-para-evento-panama.jpg',
    description: 'Producción de serie de cuatro estructuras Roll-Up retráctiles de aluminio con impresión en alta resolución para feria y congreso empresarial.',
    materials: 'Estructura Roll-Up de aluminio 0.85 × 2.00 m + Impresión full color con maletín',
    client: 'Evento Corporativo — Panamá',
    tags: ['Roll-Up Banner', 'Gran Formato', 'Eventos y Ferias', 'Estructuras Portátiles'],
  },
  {
    id: 'foto-2',
    title: 'Botellas térmicas con grabado láser',
    imgTitle: 'Botellas térmicas con grabado láser',
    alt: 'Botellas térmicas negras con logo grabado a láser para empresa en Panamá',
    width: 1050,
    height: 1400,
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: '/images/trabajos/botellas-termicas-negras-grabado-laser-logo-panama.jpg',
    description: 'Lote de botellas térmicas negras mate personalizadas con logotipo corporativo mediante grabado láser imborrable resistente al uso diario.',
    materials: 'Botella térmica de acero inoxidable con tapa hermética + Marcado láser',
    client: 'Empresa en Panamá',
    tags: ['Botellas Térmicas', 'Grabado Láser', 'Merchandising Corporativo'],
  },
  {
    id: 'foto-4',
    title: 'Set de bolígrafo y llavero en caja',
    imgTitle: 'Set de bolígrafo y llavero en caja',
    alt: 'Set de regalo corporativo con bolígrafo y llavero personalizados dentro de una caja negra',
    width: 1050,
    height: 1400,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/set-boligrafo-y-llavero-grabado-en-caja-de-regalo-panama.jpg',
    description: 'Set de regalo empresarial en estuche negro acolchado con bolígrafo metálico y llavero corporativo grabados con precisión milimétrica.',
    materials: 'Metal anodizado y acero inoxidable en estuche de regalo corporativo',
    client: 'Reconocimientos y Aniversarios — Panamá',
    tags: ['Set de Regalo', 'Bolígrafo y Llavero', 'Regalos Corporativos'],
  },
  {
    id: 'foto-5',
    title: 'Botellas y bolsa de cordón con logo',
    imgTitle: 'Botellas y bolsa de cordón con logo',
    alt: 'Botellas blancas y bolsa de cordón azul con logo de empresa, kit promocional en Panamá',
    width: 1050,
    height: 1400,
    category: 'kits',
    categoryLabel: 'Kits de Bienvenida & Promocionales',
    image: '/images/trabajos/botellas-blancas-y-bolsa-de-cordon-con-logo-corporativo-panama.jpg',
    description: 'Kit promocional para jornadas deportivas, onboarding e integración empresarial con botellas blancas personalizadas y mochila tipo tula de cordón.',
    materials: 'Botellas deportivas blancas + Bolsa de cordón en poliéster resistente',
    client: 'Kit de Bienvenida y Eventos — Panamá',
    tags: ['Kit de Bienvenida', 'Bolsa de Cordón', 'Botellas con Logo', 'Activaciones'],
  },
  {
    id: 'foto-9',
    title: 'Roll-up banners institucionales',
    imgTitle: 'Roll-up banners institucionales',
    alt: 'Dos roll-up banners institucionales impresos en gran formato, Panamá',
    width: 1050,
    height: 1400,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: '/images/trabajos/roll-up-banners-institucionales-gran-formato-panama.jpg',
    description: 'Impresión y montaje en taller de estructuras Roll-Up institucionales de 85 × 200 cm listas para exhibición en recepciones, conferencias y stands.',
    materials: 'Lona/Pet banner en alta resolución + Base retráctil de aluminio con bolso',
    client: 'Comunicación Institucional — Panamá',
    tags: ['Roll-Up', 'Impresión de Banners', 'Gran Formato Panamá', 'Stands'],
  },
  {
    id: 'foto-8',
    title: 'Organizador de cuero personalizado',
    imgTitle: 'Organizador de cuero personalizado',
    alt: 'Organizador de cuero guinda con nombre grabado y bolígrafo azul, regalo ejecutivo personalizado',
    width: 1050,
    height: 1400,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/organizador-de-cuero-personalizado-con-nombre-grabado-panama.jpg',
    description: 'Carpeta y organizador ejecutivo en acabado cuero color vino personalizado con nombre grabado en placa y bolígrafo metálico a juego.',
    materials: 'Cuero sintético ejecutivo con cierre magnético, placa metálica y bolígrafo',
    client: 'Regalo Ejecutivo Personalizado — Panamá',
    tags: ['Organizador de Cuero', 'Libretas Ejecutivas', 'Personalización Nominal'],
  },
  {
    id: 'foto-1',
    title: 'Vasos térmicos y bolígrafos con logo',
    imgTitle: 'Vasos térmicos y bolígrafos con logo',
    alt: 'Vasos térmicos blancos y bolígrafos naranja personalizados con logo de empresa en Panamá',
    width: 1050,
    height: 1400,
    category: 'kits',
    categoryLabel: 'Kits de Bienvenida & Promocionales',
    image: '/images/trabajos/vasos-termicos-blancos-y-boligrafos-naranja-con-logo-panama.jpg',
    description: 'Producción combinada de vasos térmicos blancos grabados a láser y bolígrafos corporativos color naranja para entrega a clientes y equipo.',
    materials: 'Vasos térmicos de acero inoxidable + Bolígrafos promocionales con logo',
    client: 'Merchandising Empresarial — Panamá',
    tags: ['Bolígrafos con Logo', 'Vasos Térmicos', 'Artículos Promocionales'],
  },
];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalItem, setActiveModalItem] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos los Trabajos (10)' },
    { id: 'grabados', label: 'Grabados Láser' },
    { id: 'gran-formato', label: 'Gran Formato & Roll-Up' },
    { id: 'sets', label: 'Sets & Regalos Ejecutivos' },
    { id: 'kits', label: 'Kits Promocionales' },
  ];

  const filteredProjects = selectedCategory === 'todos'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header Banner */}
      <section className="bg-[#0D0D0D] text-white py-16 px-6 sm:px-12 rounded-3xl border border-gray-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5E14]/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4 text-center mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3.5 py-1 rounded-md inline-flex items-center space-x-1.5">
            <Camera className="w-3.5 h-3.5" />
            <span>Portafolio Real en Taller — @rufpixel</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit leading-tight">
            Trabajos Realizados de Artículos Promocionales e Impresión de Banners
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            Muestra real de producciones entregadas en Panamá: vasos y botellas térmicas con grabado láser, sets ejecutivos en bambú y cuero, kits de bienvenida y estructuras Roll-Up impresas en gran formato.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="https://instagram.com/rufpixel"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold border border-white/20 transition-all flex items-center space-x-2"
            >
              <span>Seguir en Instagram @rufpixel</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FF5E14]" />
            </a>
            <Link
              href="/articulos-promocionales-panama"
              className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-5 py-2 rounded-xl font-bold transition-all shadow-md shadow-[#FF5E14]/30 flex items-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Ver Precios de Artículos Promocionales</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border ${
                active
                  ? 'bg-[#FF5E14] text-white border-[#FF5E14] shadow-md shadow-[#FF5E14]/25 scale-[1.02]'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Image Container with Hover Overlay */}
              <div
                className="relative h-72 overflow-hidden bg-gray-900 cursor-pointer"
                onClick={() => setActiveModalItem(project)}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  title={project.imgTitle}
                  width={project.width}
                  height={project.height}
                  loading={idx === 0 ? undefined : 'lazy'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-3 left-3 bg-[#0D0D0D]/90 backdrop-blur-sm text-[#FF5E14] text-[11px] font-extrabold uppercase px-3 py-1 rounded-md border border-gray-800">
                  {project.categoryLabel}
                </span>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 text-gray-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg backdrop-blur-sm">
                    <Eye className="w-4 h-4 text-[#FF5E14]" />
                    <span>Ver Foto Completa</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <span className="text-[11px] text-gray-400 font-semibold block uppercase tracking-wider">
                  {project.client}
                </span>

                <h2 className="text-lg font-extrabold text-gray-900 font-outfit group-hover:text-[#FF5E14] transition-colors leading-snug">
                  {project.title}
                </h2>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-500 block mb-1.5">Materiales & Técnica:</span>
                  <p className="text-xs text-gray-700 font-medium bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    {project.materials}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-4">
              <a
                href={`https://wa.me/50764454084?text=${encodeURIComponent(`Hola RufPixel, vi el trabajo de "${project.title}" en la Galería de la web y me interesa cotizar algo similar.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#FF5E14] hover:text-[#E04700] flex items-center space-x-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Cotizar por WhatsApp</span>
              </a>

              <Link
                href="/tienda"
                className="p-2 bg-gray-900 hover:bg-[#FF5E14] text-white rounded-xl transition-colors shadow-sm"
                title="Ver Catálogo de Productos"
              >
                <ShoppingBag className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram Spotlight Box */}
      <div className="bg-gradient-to-r from-[#0D0D0D] via-[#141414] to-[#070707] text-white p-8 sm:p-12 rounded-3xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase font-extrabold text-[#FF5E14] tracking-widest">
            Comunidad Creativa
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit">
            ¿Quieres ver más trabajos en tiempo real?
          </h3>
          <p className="text-gray-400 text-sm max-w-xl">
            Publicamos historias diarias, detrás de cámaras en taller y entregas recientes en nuestra cuenta oficial de Instagram <strong>@rufpixel</strong>.
          </p>
        </div>

        <a
          href="https://instagram.com/rufpixel"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-8 py-4 rounded-2xl font-extrabold text-sm shadow-xl shadow-[#FF5E14]/30 transition-all hover:scale-105 flex items-center space-x-2 shrink-0"
        >
          <span>Visitar @rufpixel</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-80 sm:h-[420px] relative bg-gray-900">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.alt}
                title={activeModalItem.imgTitle}
                width={activeModalItem.width}
                height={activeModalItem.height}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <span className="bg-[#FF5E14]/10 text-[#FF5E14] text-xs font-extrabold px-3 py-1 rounded-md uppercase">
                {activeModalItem.categoryLabel}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 font-outfit">
                {activeModalItem.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {activeModalItem.description}
              </p>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
                <strong className="text-gray-900 block mb-1">Materiales:</strong>
                <span className="text-gray-700">{activeModalItem.materials}</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/50764454084?text=${encodeURIComponent(`Hola RufPixel, vi en detalle el trabajo "${activeModalItem.title}" en la Galería y deseo cotizar algo similar.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#FF5E14] hover:bg-[#E04700] text-white py-3 px-6 rounded-xl font-bold text-xs text-center flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar Trabajo por WhatsApp (+507 6445-4084)</span>
                </a>
                <Link
                  href="/tienda"
                  onClick={() => setActiveModalItem(null)}
                  className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-bold text-xs text-center"
                >
                  Ver Catálogo Mayorista
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
