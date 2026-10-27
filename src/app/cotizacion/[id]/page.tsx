import React from 'react';
import type { Metadata } from 'next';
import { getQuoteById } from '@/lib/quotes';
import QuoteViewClient from './QuoteViewClient';
import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { token?: string };
}): Promise<Metadata> {
  const quote = getQuoteById(params.id, searchParams.token);

  if (!quote) {
    return {
      title: 'Cotización no encontrada | RufPixel',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Cotización ${quote.quoteNumber} | RufPixel Panamá`,
    description: `Cotización formal de productos promocionales e impresión corporativa para ${quote.customer.fullName}. Total: $${quote.total.toFixed(2)} USD.`,
    robots: { index: false, follow: false },
  };
}

export default async function CotizacionDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { token?: string };
}) {
  const quote = getQuoteById(params.id, searchParams.token);

  if (!quote) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-xl border border-gray-200">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600">
            <FileQuestion className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-outfit text-gray-900">
            Cotización no encontrada
          </h1>
          <p className="text-xs text-gray-500">
            El enlace de la cotización es inválido o ha expirado. Si crees que esto es un error, por favor comunícate directamente con un asesor de ventas de RufPixel.
          </p>
          <div className="pt-2">
            <Link
              href="/tienda"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#FF5E14] text-white rounded-xl text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ir a la tienda</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rufpixel.com';
  const quoteUrl = `${baseUrl}/cotizacion/${quote.id}${quote.token ? `?token=${quote.token}` : ''}`;

  return <QuoteViewClient quote={quote} quoteUrl={quoteUrl} />;
}
