import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Proyectos y Trabajos Realizados en Panamá | RufPixel (@rufpixel)',
  description: 'Portafolio de proyectos reales entregados por RufPixel en Panamá: Grabados láser en termos, bordados industriales, banners roll-up, sets ejecutivos y merchandising B2B.',
  keywords: [
    'Proyectos RufPixel',
    'Portafolio imprenta Panamá',
    'Trabajos realizados @rufpixel',
    'Muestras impresión Panamá',
    'Proyectos promocionales Panamá',
  ],
  alternates: {
    canonical: 'https://rufpixel.com/proyectos',
  },
  openGraph: {
    title: 'Proyectos y Trabajos Realizados | RufPixel Panamá',
    description: 'Explora nuestros proyectos entregados a marcas, agencias e instituciones en Panamá con acabados profesionales.',
    url: 'https://rufpixel.com/proyectos',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
