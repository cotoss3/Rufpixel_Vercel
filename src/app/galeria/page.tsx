'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Camera, Layers, Zap, CheckCircle2, 
  ArrowRight, ExternalLink, Filter, MessageCircle, Ruler, ShoppingBag, Eye, X
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'grabados' | 'gran-formato' | 'uvdtf' | 'stickers' | 'textil' | 'papeleria';
  categoryLabel: string;
  image: string;
  description: string;
  materials: string;
  client: string;
  tags: string[];
}

const GALLERY_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Grabados Láser en Botellas Térmicas de Acero Inoxidable',
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: '/images/banners/banner-grabados-laser.jpg',
    description: 'Marcado y grabado láser de alta fidelidad con vectorizado limpio de logotipo corporativo sobre termo mate.',
    materials: 'Acero Inoxidable con pintura electrostática, grabado por fibra láser',
    client: 'Cliente Corporativo — Panamá',
    tags: ['Fibra Láser', 'Botellas Térmicas', 'Acabado Imborrable', 'Merchandising'],
  },
  {
    id: 'proj-2',
    title: 'Estructuras Roll-Up y Lonas Publicitarias para Evento Comercial',
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: '/images/banners/banner-gran-formato.jpg',
    description: 'Impresión de alta durabilidad en lona Frontlit de 13oz con tintas eco-solventes y estructura retráctil de aluminio reforzado.',
    materials: 'Lona Frontlit 13oz + Estructura Roll-Up de Aluminio',
    client: 'Feria Empresarial Panamá Oeste',
    tags: ['Roll-Up', 'Lona 13oz', 'Tintas Eco-Solventes', 'Publicidad Exterior'],
  },
  {
    id: 'proj-3',
    title: 'Transferencia UVDTF para Superficies Rígidas y Mugs',
    category: 'uvdtf',
    categoryLabel: 'UVDTF',
    image: '/images/banners/banner-uvdtf.jpg',
    description: 'Stickers de transferencia directa UV DTF con relieve táctil 3D, barniz transparente y adherencia permanente sin calor.',
    materials: 'Film UV DTF con adhesivo acrílico de alta resistencia y barniz brillante',
    client: 'Marca Creativa @rufpixel',
    tags: ['UVDTF', 'Relieve 3D', 'Barniz Brillante', 'Sin Calor'],
  },
  {
    id: 'proj-4',
    title: 'Stickers Troquelados Holográficos y Vinil Mate',
    category: 'stickers',
    categoryLabel: 'Stickers & Etiquetas',
    image: '/images/banners/banner-stickers.jpg',
    description: 'Troquelado computarizado milimétrico en vinil impermeable a prueba de agua y refrigeración con corte a la forma del arte.',
    materials: 'Vinil Adhesivo Laminado Resistente al Sol y Agua',
    client: 'Emprendimientos & Packaging',
    tags: ['Vinil Troquelado', 'Resistente al Agua', 'Stickers', 'Full Color'],
  },
  {
    id: 'proj-5',
    title: 'Estampados DTF Textil para Uniformes y Ropa de Marca',
    category: 'textil',
    categoryLabel: 'DTF Textil',
    image: '/images/banners/banner-dtf.jpg',
    description: 'Transferencia digital DTF textil de máxima elasticidad y suavidad al tacto en camisetas 100% algodón y poliéster.',
    materials: 'Film DTF + Poliamida Elástica + Tinta Textil CMYK + Blanco Puro',
    client: 'Marca de Ropa & Uniformes Corporativos',
    tags: ['DTF Textil', 'Suave al Tacto', 'Ultra Durable', 'Algodón y Sintéticos'],
  },
  {
    id: 'proj-6',
    title: 'Papelería Corporativa: Volantes, Talonarios y Tarjetas Soft-Touch',
    category: 'papeleria',
    categoryLabel: 'Papelería Comercial & POP',
    image: '/images/banners/banner-papeleria.jpg',
    description: 'Producción de papelería institucional con acabados satinados, plegados de precisión y talonarios autocopiativos.',
    materials: 'Papel Satinado 100 lbs + Cartulina Opalina 300g con Soft-Touch',
    client: 'Empresas Corporativas Panamá',
    tags: ['Soft-Touch', 'Talonarios Factura', 'Tarjetas Premium', 'Offset Digital'],
  },
  {
    id: 'proj-7',
    title: 'Grabados Láser en Bolígrafos Metálicos y Accesorios Ejecutivos',
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop',
    description: 'Personalización de bolígrafos de aluminio con micrograbado de nombres individuales y logotipos con nitidez total.',
    materials: 'Aluminio anodizado y acero inoxidable',
    client: 'Regalos Corporativos de Fin de Año',
    tags: ['Bolígrafos Metálicos', 'Micrograbado', 'Regalos Ejecutivos'],
  },
  {
    id: 'proj-8',
    title: 'Viniles Microperforados y Señalética para Fachadas',
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop',
    description: 'Rotulación de vitrinas comerciales con vinil microperforado que permite visibilidad desde el interior con privacidad exterior.',
    materials: 'Vinil Microperforado 60/40 de alta durabilidad exterior',
    client: 'Locales Comerciales Panamá Oeste',
    tags: ['Microperforados', 'Vitrinas', 'Señaléctica', 'Fachadas'],
  },
];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalItem, setActiveModalItem] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos los Trabajos' },
    { id: 'grabados', label: 'Grabados Láser' },
    { id: 'gran-formato', label: 'Gran Formato & Banners' },
    { id: 'uvdtf', label: 'UVDTF' },
    { id: 'stickers', label: 'Stickers & Etiquetas' },
    { id: 'textil', label: 'DTF Textil' },
    { id: 'papeleria', label: 'Papelería Comercial' },
  ];

  const filteredProjects = selectedCategory === 'todos' 
    ? GALLERY_PROJECTS 
    : GALLERY_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Header Banner */}
      <section className="bg-[#0D0D0D] text-white py-16 px-6 sm:px-12 rounded-3xl border border-gray-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5E14]/15 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4 text-center mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3.5 py-1 rounded-md inline-flex items-center space-x-1.5">
            <Camera className="w-3.5 h-3.5" />
            <span>Portafolio Real — @rufpixel</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit leading-tight">
            Nuestros Trabajos Realizados
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            Explora una muestra de los proyectos entregados a marcas, agencias y emprendedores en Panamá: desde grabados láser ultra precisos y banners de gran formato hasta stickers troquelados e impresiones UV DTF.
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
              href="/cotizador"
              className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-5 py-2 rounded-xl font-bold transition-all shadow-md shadow-[#FF5E14]/30 flex items-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Cotizar mi Proyecto (Pre-Orden)</span>
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
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Image Container with Hover Overlay */}
              <div 
                className="relative h-64 overflow-hidden bg-gray-900 cursor-pointer"
                onClick={() => setActiveModalItem(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <span className="absolute top-3 left-3 bg-[#0D0D0D]/90 backdrop-blur-sm text-[#FF5E14] text-[11px] font-extrabold uppercase px-3 py-1 rounded-md border border-gray-800">
                  {project.categoryLabel}
                </span>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 text-gray-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg backdrop-blur-sm">
                    <Eye className="w-4 h-4 text-[#FF5E14]" />
                    <span>Ver en Detalle</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <span className="text-[11px] text-gray-400 font-semibold block uppercase tracking-wider">
                  {project.client}
                </span>

                <h3 className="text-lg font-extrabold text-gray-900 font-outfit group-hover:text-[#FF5E14] transition-colors leading-snug">
                  {project.title}
                </h3>

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
                href="/cotizador"
                className="p-2 bg-gray-900 hover:bg-[#FF5E14] text-white rounded-xl transition-colors shadow-sm"
                title="Iniciar Pre-Orden"
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

            <div className="h-80 sm:h-96 relative bg-gray-900">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
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
                  href="/cotizador"
                  onClick={() => setActiveModalItem(null)}
                  className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-bold text-xs text-center"
                >
                  Cotizador Pre-Orden
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
