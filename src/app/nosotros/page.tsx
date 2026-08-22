import React from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, ShieldCheck, Zap, Users, Printer } from 'lucide-react';

export const metadata = {
  title: 'Acerca de Nosotros — RufPixel Impresión & Diseño Panamá',
  description: 'Conoce la historia de RufPixel, nuestro equipamiento de impresión offset digital y el equipo detrás de cada trabajo corporativo.',
};

export default function NosotrosPage() {
  return (
    <div className="py-12 space-y-16">
      {/* Header Banner */}
      <section className="bg-[#0D0D0D] text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            Nuestra Historia
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit">
            Pasión por la Precisión en Cada Impreso
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            En RufPixel transformamos ideas gráficas en soluciones físicas de alto impacto visual para empresas y creativos en Panamá.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 font-outfit">
              Compromiso con la Calidad & Rapidez
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nacimos en Panamá con la misión de eliminar las complicaciones tradicionales en el proceso de impresión. Combinamos tecnología de prensa digital offset con acabados artesanales como laminados Soft-Touch, troquelados de precisión y tintas especiales de alta durabilidad.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Atendemos desde pequeñas emprendedores que buscan 100 tarjetas de presentación impecables hasta grandes agencias que requieren montajes de gran formato en vinil y estructuras Roll-Up para eventos masivos.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                <span className="text-2xl font-extrabold text-[#FF5E14] font-outfit">+10,000</span>
                <span className="text-xs text-gray-500 block">Proyectos Impresos</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                <span className="text-2xl font-extrabold text-[#FF5E14] font-outfit">24-48h</span>
                <span className="text-xs text-gray-500 block">Tiempo Estándar</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-96 relative">
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop"
              alt="Maquinaria RufPixel"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-3">
            <div className="p-3 bg-[#FF5E14]/10 rounded-2xl w-fit">
              <Printer className="w-6 h-6 text-[#FF5E14]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-outfit">Tecnología de Punta</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Equipos de impresión digital 1440 DPI y plotters de corte de alta definición para bordes limpios sin rebabas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-3">
            <div className="p-3 bg-[#FF5E14]/10 rounded-2xl w-fit">
              <ShieldCheck className="w-6 h-6 text-[#FF5E14]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-outfit">Garantía de Color</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Revisamos cada archivo enviado antes de imprimir para garantizar la conversión correcta a perfil CMYK.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-3">
            <div className="p-3 bg-[#FF5E14]/10 rounded-2xl w-fit">
              <Zap className="w-6 h-6 text-[#FF5E14]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-outfit">Agilidad con Yappy</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Pagos rápidos sin trámites bancarios complejos. Proceso directo de pago con validación humana prioritaria.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
