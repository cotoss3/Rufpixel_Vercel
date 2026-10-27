import { NextResponse } from 'next/server';
import { createNewQuote, getStoredQuotes } from '@/lib/quotes';
import { QuoteCustomer, QuoteItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, includeTax } = body as {
      customer: QuoteCustomer;
      items: QuoteItem[];
      includeTax?: boolean;
    };

    if (!customer || !customer.fullName || !customer.phone || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Datos incompletos para generar la cotización' },
        { status: 400 }
      );
    }

    const quote = createNewQuote(customer, items, includeTax ?? true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rufpixel.com';
    const quoteUrl = `${baseUrl}/cotizacion/${quote.id}?token=${quote.token}`;

    return NextResponse.json({
      success: true,
      quote,
      quoteUrl,
    });
  } catch (error) {
    console.error('Error generating quote:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno al generar cotización' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const quotes = getStoredQuotes();
    return NextResponse.json({ success: true, quotes: Object.values(quotes) });
  } catch (error) {
    return NextResponse.json({ success: false, quotes: [] }, { status: 500 });
  }
}
