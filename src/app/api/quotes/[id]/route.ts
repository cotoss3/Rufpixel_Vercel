import { NextResponse } from 'next/server';
import { getQuoteById } from '@/lib/quotes';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token') || undefined;

    const quote = getQuoteById(params.id, token);

    if (!quote) {
      return NextResponse.json(
        { success: false, error: 'Cotización no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, quote });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al consultar cotización' },
      { status: 500 }
    );
  }
}
