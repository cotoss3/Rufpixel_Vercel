import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cotizador de Impresión Digital: Zona Pixel | RufPixel', // 53 chars
  description: 'Cotiza al instante en Panamá desde 1 pieza: DTF textil, stickers en vinil, UV DTF, banners lona 13oz, roll-up y papelería. Pagos vía Yappy y ACH.', // 145 chars
  keywords: [
    'Cotizador imprenta Panamá',
    'Precios DTF Panamá',
    'Cotizar stickers Panamá',
    'Zona Pixel RufPixel',
    'Impresión digital Panamá',
  ],
  alternates: {
    canonical: 'https://rufpixel.com/cotizador',
  },
  openGraph: {
    title: 'Cotizador de Impresión Digital: Zona Pixel | RufPixel',
    description: 'Cotiza al instante en Panamá desde 1 pieza: DTF textil, stickers en vinil, UV DTF, banners lona 13oz, roll-up y papelería. Pagos vía Yappy y ACH.',
    url: 'https://rufpixel.com/cotizador',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default function CotizadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
