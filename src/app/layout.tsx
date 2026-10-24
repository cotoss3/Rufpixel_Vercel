import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cartContext';
import { OrganizationSchema } from '@/components/seo/SchemaOrg';
import NavigationLoader from '@/components/common/NavigationLoader';
import AiWhatsAppAssistant from '@/components/common/AiWhatsAppAssistant';

export const metadata: Metadata = {
  title: 'RufPixel — Servicios de Impresión Digital, Gran Formato & Diseño Gráfico en Panamá',
  description: 'Impresión en Panamá: Catálogo mayorista para empresas y Zona Pixel para impresiones digitales sin mínimos. DTF textil por metros, stickers troquelados, banners roll-up y pagos por Yappy comercial.',
  keywords: ['Impresión Panamá', 'DTF textil Panamá', 'Stickers personalizados', 'Banners Panamá', 'Zona Pixel', 'Impresiones digitales Panamá', 'Yappy Comercial', 'RufPixel'],
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
          {/* Floating AI Assistant & WhatsApp Order Generator (+507 6445-4084) */}
          <AiWhatsAppAssistant />
        </CartProvider>
      </body>
    </html>
  );
}
