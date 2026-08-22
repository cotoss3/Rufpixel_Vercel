import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/woocommerce';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'todos';

  try {
    const data = await getProducts(category, 1, 300);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ products: [], totalPages: 0, totalProducts: 0 }, { status: 500 });
  }
}
