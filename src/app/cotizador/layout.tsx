import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cotizador Online de Impresión Digital & Zona Pixel | RufPixel Panamá',
  description: 'Cotiza al instante tus impresiones digitales en Panamá: DTF Textil, UV DTF, Stickers personalizados en vinil, Banners y Papelería comercial con entrega rápida.',
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
    title: 'Cotizador Online de Impresión Digital | RufPixel Panamá',
    description: 'Calcula tu cotización online en segundos y añade directamente al carrito con pago por Yappy o ACH.',
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
