import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contacto, Ubicación & Horario en Panamá | RufPixel',
  description: 'Comunícate con RufPixel: Imprenta y casa creativa en La Chorrera y Ciudad de Panamá. Cotizaciones inmediatas por WhatsApp (+507 6445-4084) y atención personalizada.',
  keywords: [
    'Contacto RufPixel',
    'Imprenta La Chorrera',
    'Imprenta Panamá WhatsApp',
    'Ubicación RufPixel Panamá',
  ],
  alternates: {
    canonical: 'https://rufpixel.com/contacto',
  },
  openGraph: {
    title: 'Contacto & Ubicación | RufPixel Panamá',
    description: 'Atención inmediata por WhatsApp para cotizaciones, validaciones de Yappy y consultas de producción gráfica.',
    url: 'https://rufpixel.com/contacto',
    siteName: 'RufPixel',
    locale: 'es_PA',
    type: 'website',
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
