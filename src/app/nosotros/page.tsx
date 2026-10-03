'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, CheckCircle2, ShieldCheck, Zap, Users, Printer, 
  Sparkles, Layers, Instagram, Phone, MapPin, Clock, ArrowRight, MessageCircle, Ruler, Cpu
} from 'lucide-react';

export default function NosotrosPage() {
  const [activePillar, setActivePillar] = useState<'IDENTIDAD' | 'MAQUINARIA' | 'PROCESO' | 'COMPROMISO'>('IDENTIDAD');

  const pillars = [
    { id: 'IDENTIDAD', label: '1. Esencia @rufpixel', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'MAQUINARIA', label: '2. Taller & Tecnología', icon: <Cpu className="w-4 h-4" /> },
    { id: 'PROCESO', label: '3. El Flujo de Trabajo', icon: <Layers className="w-4 h-4" /> },
    { id: 'COMPROMISO', label: '4. Calidad & Garantía', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="bg-[#0D0D0D] text-white py-16 px-6 sm:px-12 rounded-3xl border border-gray-800 relative overflow-hidden shadow-2xl text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FF5E14]/15 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Casa Creativa @rufpixel — La Chorrera, Panamá</span>
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-outfit leading-tight">
            Pasión por el Detalle, <br />
            <span className="text-[#FF5E14] underline decoration-[#FF5E14]/40">Precisión en Cada Pixel</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
            En <strong>@rufpixel</strong> transformamos tus ideas y diseños digitales en productos físicos de impacto visual superior: grabados láser imborrables, lonas de gran formato, transferencias UV DTF y papelería corporativa de alta gama.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://instagram.com/rufpixel"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold border border-white/20 transition-all flex items-center space-x-2"
            >
              <Instagram className="w-4 h-4 text-[#FF5E14]" />
              <span>@rufpixel en Instagram</span>
            </a>
            <a
              href="https://wa.me/50764454084?text=Hola%20RufPixel,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#FF5E14]/30 transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Directo (+507 6445-4084)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interactive Pillars Explorer */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold text-[#FF5E14] tracking-widest">
            Conoce Nuestro Ecosistema
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 font-outfit">
            ¿Cómo trabajamos en @rufpixel?
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-xl mx-auto">
            Haz clic en los pilares para descubrir nuestra filosofía, maquinaria y el proceso con el que cuidamos tu marca.
          </p>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="bg-gray-100 p-2 rounded-2xl flex flex-wrap sm:flex-nowrap items-center justify-between border border-gray-200 gap-2 max-w-3xl mx-auto">
          {pillars.map((p) => {
            const active = activePillar === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id as any)}
                className={`flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs font-extrabold transition-all ${
                  active
                    ? 'bg-[#0D0D0D] text-white shadow-lg border border-gray-800 scale-[1.02]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl max-w-5xl mx-auto">
          
          {activePillar === 'IDENTIDAD' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase font-extrabold text-[#FF5E14] bg-[#FF5E14]/10 px-3 py-1 rounded-md">
                  Nuestra Razón de Ser
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
                  De Panamá Oeste para todo el país: Calidad sin excusas
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <strong>RufPixel</strong> nació con el objetivo de elevar el estándar del material publicitario e impreso corporativo en Panamá. Entendemos que cada tarjeta, sticker, termo grabado o banner de gran formato es la cara visible de tu negocio ante tus clientes.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Por eso no escatimamos en calidad de sustratos, tintas de larga duración y calibración de color. Nos involucramos en cada proyecto como si fuera para nuestra propia marca.
                </p>
                <div className="pt-2 flex items-center space-x-3 text-xs text-gray-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14]" />
                  <span>Atención rápida y personalizada vía WhatsApp</span>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-[#0D0D0D] p-2">
                <img
                  src="/images/banners/banner-grabados-laser.jpg"
                  alt="Grabados Láser RufPixel"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          )}

          {activePillar === 'MAQUINARIA' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase font-extrabold text-[#FF5E14] bg-[#FF5E14]/10 px-3 py-1 rounded-md">
                  Tecnología Industrial
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
                  Equipamiento de Alta Precisión
                </h3>
                <div className="space-y-3 text-xs text-gray-700">
                  <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 space-y-1">
                    <strong className="text-gray-900 block text-sm font-outfit">🔥 Láser de Fibra & CO2:</strong>
                    <span>Grabado y corte milimétrico en acero, aluminio anodizado, acrílico, madera y cuero con líneas ultrafinas.</span>
                  </div>
                  <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 space-y-1">
                    <strong className="text-gray-900 block text-sm font-outfit">✨ UV DTF & DTF Textil Directo:</strong>
                    <span>Impresión con relieve 3D, barniz ultra brillante y transferencias textiles elásticas a prueba de lavado.</span>
                  </div>
                  <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 space-y-1">
                    <strong className="text-gray-900 block text-sm font-outfit">📐 Gran Formato Eco-Solvente:</strong>
                    <span>Plotters de alta fidelidad resistentes a la intemperie, lluvia y sol tropical de Panamá.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-[#0D0D0D] p-2">
                <img
                  src="/images/banners/banner-gran-formato.jpg"
                  alt="Maquinaria Gran Formato RufPixel"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          )}

          {activePillar === 'PROCESO' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-12 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-extrabold text-[#FF5E14] bg-[#FF5E14]/10 px-3 py-1 rounded-md">
                    Paso a Paso
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
                    El Flujo de Trabajo en @rufpixel
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                    <span className="w-7 h-7 bg-[#FF5E14] text-white rounded-full flex items-center justify-center font-extrabold text-xs">
                      1
                    </span>
                    <strong className="text-gray-900 block font-outfit text-sm">Recepción del Arte</strong>
                    <p className="text-gray-500">Envío de tu diseño o especificaciones por la web o WhatsApp.</p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                    <span className="w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center font-extrabold text-xs">
                      2
                    </span>
                    <strong className="text-gray-900 block font-outfit text-sm">Validación CMYK</strong>
                    <p className="text-gray-500">Revisión técnica de resolución, sangrado y conversión de color.</p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                    <span className="w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center font-extrabold text-xs">
                      3
                    </span>
                    <strong className="text-gray-900 block font-outfit text-sm">Producción & Grabado</strong>
                    <p className="text-gray-500">Impresión y acabado en maquinaria industrial con control de calidad.</p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                    <span className="w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center font-extrabold text-xs">
                      4
                    </span>
                    <strong className="text-gray-900 block font-outfit text-sm">Entrega 24-48h</strong>
                    <p className="text-gray-500">Retiro en local o envío a nivel nacional rápido y seguro.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePillar === 'COMPROMISO' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase font-extrabold text-[#FF5E14] bg-[#FF5E14]/10 px-3 py-1 rounded-md">
                  Garantía RufPixel
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
                  Tu Tranquilidad es Nuestra Prioridad
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Aceptamos <strong>YAPPY COMERCIAL & TRANSFERENCIA ACH</strong> con validación humana inmediata. Cada pedido genera un número de confirmación para que puedas consultar el estado de tu producción en todo momento.
                </p>
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5E14]" />
                    <span>Reimpresión garantizada si existe algún defecto de fabricación.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5E14]" />
                    <span>Asesoría gratuita previa para resolver dudas sobre materiales.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-[#0D0D0D] p-2">
                <img
                  src="/images/banners/banner-uvdtf.jpg"
                  alt="Compromiso de Calidad RufPixel"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 3. Numbers & Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-[#0D0D0D] text-white p-6 rounded-3xl border border-gray-800 text-center space-y-1">
          <span className="text-3xl font-extrabold text-[#FF5E14] font-outfit block">+10,000</span>
          <span className="text-xs text-gray-400">Proyectos Entregados</span>
        </div>
        <div className="bg-[#0D0D0D] text-white p-6 rounded-3xl border border-gray-800 text-center space-y-1">
          <span className="text-3xl font-extrabold text-[#FF5E14] font-outfit block">24-48h</span>
          <span className="text-xs text-gray-400">Tiempos de Producción</span>
        </div>
        <div className="bg-[#0D0D0D] text-white p-6 rounded-3xl border border-gray-800 text-center space-y-1">
          <span className="text-3xl font-extrabold text-[#FF5E14] font-outfit block">5.0 ★</span>
          <span className="text-xs text-gray-400">Reseñas en Google Maps</span>
        </div>
        <div className="bg-[#0D0D0D] text-white p-6 rounded-3xl border border-gray-800 text-center space-y-1">
          <span className="text-3xl font-extrabold text-[#FF5E14] font-outfit block">100%</span>
          <span className="text-xs text-gray-400">Garantía de Acabados</span>
        </div>
      </section>

      {/* 4. Local Taller Contact Card */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3">
          <span className="text-xs uppercase font-extrabold text-[#FF5E14] tracking-wider">
            Visítanos en Nuestro Taller
          </span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-outfit">
            RUFPIXEL - CASA CREATIVA
          </h3>
          <div className="space-y-1.5 text-xs text-gray-600">
            <p className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#FF5E14] shrink-0" />
              <span>Ciudad de La Chorrera - Panamá Oeste - Calle Arnoldo Cano - Barrio Colón - Local 1.</span>
            </p>
            <p className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#FF5E14] shrink-0" />
              <span>Lunes a Viernes: 9:00 AM - 5:00 PM | Sábados: 9:00 AM - 2:00 PM</span>
            </p>
            <p className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#FF5E14] shrink-0" />
              <span>Teléfono / WhatsApp: +507 6445-4084</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            href="/contacto"
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold text-xs text-center transition-all"
          >
            Ver Mapa & Contacto
          </Link>
          <Link
            href="/galeria"
            className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3 rounded-xl font-bold text-xs text-center shadow-md shadow-[#FF5E14]/25 transition-all"
          >
            Ver Galería de Trabajos
          </Link>
        </div>
      </section>

    </div>
  );
}
