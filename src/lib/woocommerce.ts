import { Product } from './types';
import { MOCK_PRODUCTS } from './mockData';

const WOO_API_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL || 'https://cms.rufpixel.com/wp-json/wc/store/v1';

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const url = categorySlug 
      ? `${WOO_API_URL}/products?category=${categorySlug}` 
      : `${WOO_API_URL}/products`;
      
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch products from WooCommerce');
    const data = await res.json();
    return data.map((prod: any) => ({
      id: String(prod.id),
      slug: prod.slug,
      name: prod.name,
      price: parseFloat(prod.prices.price) / 100,
      regularPrice: parseFloat(prod.prices.regular_price) / 100,
      description: prod.description,
      shortDescription: prod.short_description,
      category: prod.categories[0]?.name || 'General',
      categorySlug: prod.categories[0]?.slug || 'general',
      image: prod.images[0]?.src || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
      gallery: prod.images.map((img: any) => img.src),
      stock: prod.is_in_stock ? 100 : 0,
      attributes: prod.attributes || [],
      featured: prod.is_featured || false,
    }));
  } catch (error) {
    if (categorySlug) {
      return MOCK_PRODUCTS.filter(p => p.categorySlug === categorySlug);
    }
    return MOCK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug) || null;
}
