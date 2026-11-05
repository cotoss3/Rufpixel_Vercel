import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Nosotros — Casa Creativa RufPixel en La Chorrera, Panamá',
  description: 'Conoce a RufPixel: Taller de producción gráfica, impresión digital de alta precisión, grabado láser y artículos corporativos personalizados en Panamá.',
  keywords: [
    'RufPixel nosotros',
    'Casa Creativa RufPixel',
    'Imprenta Panamá Oeste',
    'Taller de impresión La Chorrera',
  ],
  alternates: {
    canonical: 'https://rufpixel.com/nosotros',
  },
  openGraph: {
    title: 'Sobre RufPixel — Casa Creativa en Panamá',
    description: 'Transformamos ideas en productos físicos de impacto superior: lonas, grabados, UV DTF y papelería corporativa.',
    url: 'https://rufpixel.com/nosotros',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
