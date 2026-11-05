import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Galería de Trabajos Realizados en Panamá | RufPixel (@rufpixel)',
  description: 'Portafolio real de trabajos realizados por RufPixel en Panamá: Grabados láser en termos, banners roll-up, transfers UV DTF, stickers troquelados y señalética.',
  keywords: [
    'Galería RufPixel',
    'Portafolio imprenta Panamá',
    'Trabajos realizados @rufpixel',
    'Muestras impresión Panamá',
  ],
  alternates: {
    canonical: 'https://rufpixel.com/galeria',
  },
  openGraph: {
    title: 'Galería de Trabajos Realizados | RufPixel Panamá',
    description: 'Explora nuestros proyectos entregados a marcas, agencias y empresas en Panamá con acabados profesionales.',
    url: 'https://rufpixel.com/galeria',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
