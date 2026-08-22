import React from 'react';
import Link from 'next/link';
import { MOCK_SERVICES } from '@/lib/mockData';
import { CreditCard, Maximize2, FileText, Tag, Gift, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Servicios de Impresión Digital & Gran Formato — RufPixel Panamá',
  description: 'Descubre nuestros servicios de impresión: Tarjetas de presentación, Banners Roll-up, Volantes, Stickers troquelados y Gift cards.',
};

export default function ServiciosPage() {
  const iconMap: Record<string, React.ReactNode> = {
    CreditCard: <CreditCard className="w-8 h-8 text-[#FF5E14]" />,
    Maximize2: <Maximize2 className="w-8 h-8 text-[#FF5E14]" />,
    FileText: <FileText className="w-8 h-8 text-[#FF5E14]" />,
    Tag: <Tag className="w-8 h-8 text-[#FF5E14]" />,
    Gift: <Gift className="w-8 h-8 text-[#FF5E14]" />,
  };

  return (
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <section className="bg-[#0D0D0D] text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            Catálogo Corporativo
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit">
            Nuestros Servicios de Impresión
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            Soluciones completas de impresión offset digital y publicidad exterior adaptadas a las exigencias de tu empresa.
          </p>
        </div>
      </section>

      {/* Services Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {MOCK_SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className={`bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden h-64 lg:h-80 relative border border-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex p-3 bg-[#FF5E14]/10 rounded-2xl">
                  {iconMap[service.iconName]}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-outfit">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.fullDesc}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Características Incluidas:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md shadow-[#FF5E14]/20 transition-all flex items-center space-x-2"
                  >
                    <span>Ver Detalles de {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/cotizador"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-sm font-semibold border border-gray-800 transition-all"
                  >
                    Cotizar con Medidas
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
