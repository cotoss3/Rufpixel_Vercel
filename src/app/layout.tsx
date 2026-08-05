import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cartContext';
import { OrganizationSchema } from '@/components/seo/SchemaOrg';
import NavigationLoader from '@/components/common/NavigationLoader';

export const metadata: Metadata = {
  title: 'RufPixel — Servicios de Impresión Digital, Gran Formato & Diseño Gráfico en Panamá',
  description: 'Impresión corporativa en Panamá: Tarjetas de presentación soft-touch, Banners Roll-up, Flyers, Stickers troquelados, Gift cards y cotizaciones de pre-orden. Pagos por Yappy.',
  keywords: ['Impresión Panamá', 'Tarjetas de presentación', 'Banners Panamá', 'Imprenta Panamá', 'Stickers personalizados', 'Yappy', 'RufPixel'],
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
    title: 'RufPixel — Servicios de Impresión & Diseño Gráfico',
    description: 'Impresión de alta definición para tu marca en Panamá. Tarjetas premium, Gran Formato y cotizador online.',
    url: 'https://rufpixel.com',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
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
          </Suspense>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
