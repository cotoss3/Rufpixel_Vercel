import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cartContext';
import { OrganizationSchema, GeoFaqSchema } from '@/components/seo/SchemaOrg';
import NavigationLoader from '@/components/common/NavigationLoader';
import AiWhatsAppAssistant from '@/components/common/AiWhatsAppAssistant';

export const metadata: Metadata = {
  title: 'RufPixel — Imprenta Digital, Gran Formato, DTF & Bordados en Panamá',
  description: 'Taller de impresión y personalización en La Chorrera, Panamá Oeste. Especialistas en DTF textil, UV DTF para rígidos, bordados computarizados, grabado láser, banners publicitarios y artículos promocionales con envíos a todo Panamá.',
  keywords: [
    'Impresión Panamá', 'Imprenta en La Chorrera', 'DTF textil Panamá', 'UV DTF Panamá',
    'Bordados computarizados Panamá', 'Grabado láser Panamá', 'Stickers personalizados Panamá',
    'Banners roll-up Panamá', 'Zona Pixel', 'Artículos promocionales Panamá Oeste', 'Yappy Comercial', 'RufPixel'
  ],
  metadataBase: new URL('https://rufpixel.com'),
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'RufPixel — Imprenta Digital, DTF, Bordados & Gran Formato en Panamá',
    description: 'Taller de producción e impresión gráfica en La Chorrera, Panamá Oeste. DTF textil, UV DTF, bordados computarizados, grabado láser, banners y artículos promocionales con envíos a todo Panamá.',
    url: 'https://rufpixel.com',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
  other: {
    'geo.region': 'PA-13',
    'geo.placename': 'La Chorrera, Panamá Oeste, Panamá',
    'geo.position': '8.8803;-79.7833',
    'ICBM': '8.8803, -79.7833',
  },
  verification: {
    google: 'NRrRFsZ5D8GG2H_6kq8-FAwC-HWgrB6w_TO18jBufUY',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <OrganizationSchema />
        <GeoFaqSchema />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#FAFAFA] text-gray-900">
        <CartProvider>
          <Suspense fallback={null}>
            <NavigationLoader />
          </Suspense>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          {/* Floating AI Assistant & WhatsApp Order Generator (+507 6445-4084) */}
          <AiWhatsAppAssistant />
        </CartProvider>
      </body>
    </html>
  );
}
