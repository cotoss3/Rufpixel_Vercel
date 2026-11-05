import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Zona Pixel — Impresiones Digitales Sin Mínimos en Panamá | RufPixel',
  description: 'Calcula y pide en línea impresiones digitales sin cantidades mínimas en Panamá: DTF Textil por pliego o yarda lineal, UV DTF para termos, stickers troquelados, lonas y combos.',
  keywords: [
    'Zona Pixel',
    'Impresiones Digitales Panamá',
    'DTF textil Panamá',
    'UV DTF Panamá',
    'Stickers personalizados Panamá',
    'Banners Panamá',
    'Impresión sin mínimos',
    'RufPixel',
  ],
  alternates: {
    canonical: 'https://rufpixel.com/zona-pixel',
  },
  openGraph: {
    title: 'Zona Pixel — Impresiones Digitales Sin Mínimos | RufPixel',
    description: 'Calcula tu precio en segundos y pide desde 1 sola pieza o yarda lineal: DTF Textil, UV DTF, Stickers y Banners en Panamá.',
    url: 'https://rufpixel.com/zona-pixel',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default function ZonaPixelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
