import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_SERVICES } from '@/lib/mockData';
import { CheckCircle2, ArrowLeft, PhoneCall, Calculator, ShieldCheck } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = MOCK_SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Servicio no encontrado — RufPixel' };
  return {
    title: `${service.title} — RufPixel Impresión Panamá`,
    description: service.shortDesc,
  };
}

export default function ServicioDetailPage({ params }: { params: { slug: string } }) {
  const service = MOCK_SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb / Back button */}
      <div>
        <Link href="/servicios" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a todos los servicios</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Image & Details */}
        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-96 relative">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4 bg-white p-8 rounded-3xl border border-gray-200">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF5E14]">Servicio Especializado</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">
              {service.title}
            </h1>
            <p className="text-gray-700 text-base leading-relaxed">
              {service.fullDesc}
            </p>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 font-outfit">¿Qué incluye este servicio?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-[#FF5E14] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Inquiry & Pre-order Widget */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0D0D0D] text-white p-8 rounded-3xl border border-gray-800 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold font-outfit text-white">¿Necesitas una cotización?</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Si conoces las dimensiones aproximadas o tienes tu archivo listo, puedes cotizarlo inmediatamente en nuestro sistema de pre-orden.
            </p>

            <div className="space-y-3">
              <Link
                href="/cotizador"
                className="w-full bg-[#FF5E14] hover:bg-[#E04700] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Cotizar con Tamaño & Archivo</span>
              </Link>

              <a
                href="https://wa.me/50760000000?text=Hola,%20quisiera%20cotizar%20el%20servicio%20de%20"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 px-4 rounded-xl font-semibold text-sm border border-gray-700 flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-5 h-5 text-[#FF5E14]" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-gray-800 text-xs text-gray-400 space-y-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
                <span>Pagos vía <strong>Yappy Panamá</strong></span>
              </div>
              <p>Revisión técnica de archivos antes de imprimir sin costo adicional.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
