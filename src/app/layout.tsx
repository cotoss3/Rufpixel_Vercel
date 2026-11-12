import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cartContext';
import { OrganizationSchema } from '@/components/seo/SchemaOrg';
import NavigationLoader from '@/components/common/NavigationLoader';
import AiWhatsAppAssistant from '@/components/common/AiWhatsAppAssistant';
import GoogleAnalytics from '@/components/seo/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Artículos Promocionales e Impresión de Banners | RufPixel',
  description: 'Artículos promocionales al por mayor e impresión de banners, roll-up, DTF y bordados en Panamá. Precios desde 50 uds y desde 1 pieza en Zona Pixel.',
  keywords: [
    'Artículos promocionales Panamá', 'Impresión de banners Panamá', 'Banners roll-up Panamá',
    'Imprenta en La Chorrera', 'DTF textil Panamá', 'UV DTF Panamá', 'Bordados computarizados Panamá',
    'Grabado láser Panamá', 'Zona Pixel', 'Artículos promocionales Panamá Oeste', 'RufPixel'
  ],
  metadataBase: new URL('https://rufpixel.com'),
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Artículos Promocionales e Impresión de Banners | RufPixel',
    description: 'Artículos promocionales al por mayor e impresión de banners, roll-up, DTF y bordados en Panamá. Precios desde 50 uds y desde 1 pieza en Zona Pixel.',
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
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#FAFAFA] text-gray-900">
        <CartProvider>
          <Suspense fallback={null}>
            <NavigationLoader />
            <GoogleAnalytics />
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
