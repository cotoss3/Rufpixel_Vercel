import { permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotizador y Zona Pixel | RufPixel Panamá',
  alternates: {
    canonical: 'https://rufpixel.com/cotizador',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ZonaPixelRedirect() {
  permanentRedirect('/cotizador');
}
