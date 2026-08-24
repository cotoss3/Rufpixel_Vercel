import { NextResponse } from 'next/server';
import { getProducts, getCategories } from '@/lib/woocommerce';

export const revalidate = 900; // 15 minutes CDN caching

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'todos';

  try {
    const [{ products, totalPages, totalProducts }, categories] = await Promise.all([
      getProducts(category, 1, 100),
      getCategories(),
    ]);

    return NextResponse.json(
      { products, totalPages, totalProducts, categories },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ products: [], totalPages: 0, totalProducts: 0, categories: [] }, { status: 500 });
  }
}
