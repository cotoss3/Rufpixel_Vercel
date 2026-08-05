import { Product } from './types';
import { MOCK_PRODUCTS } from './mockData';

const LIVE_DOMAIN = 'https://rufpixel.com';
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_ca97c633f96d52d6b7178f9bef3c1f20fbf21688';
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_cf44b18a5302efd0464436c21752fa8c0c56cefc1';

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  // Strategy 1: Try WooCommerce Store API (Public, high performance, native format)
  try {
    const categoryParam = categorySlug ? `?category=${categorySlug}` : '';
    const res = await fetch(`${LIVE_DOMAIN}/wp-json/wc/store/v1/products${categoryParam}`, {
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((prod: any) => {
          // Parse price from Store API (given in cents integer or float string)
          const rawPrice = prod.prices?.price ? parseFloat(prod.prices.price) / 100 : parseFloat(prod.price || '0');
          const rawRegPrice = prod.prices?.regular_price ? parseFloat(prod.prices.regular_price) / 100 : (prod.regular_price ? parseFloat(prod.regular_price) : undefined);

          return {
            id: String(prod.id),
            slug: prod.slug,
            name: prod.name,
            price: rawPrice > 0 ? rawPrice : 5.00,
            regularPrice: rawRegPrice && rawRegPrice > rawPrice ? rawRegPrice : undefined,
            description: prod.description || prod.short_description || '',
            shortDescription: (prod.short_description || prod.description || '').replace(/<[^>]+>/g, '').slice(0, 150),
            category: prod.categories?.[0]?.name || 'Productos RufPixel',
            categorySlug: prod.categories?.[0]?.slug || 'general',
            image: prod.images?.[0]?.src || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
            gallery: prod.images?.map((img: any) => img.src) || [],
            stock: prod.is_in_stock ?? 100,
            attributes: prod.attributes?.map((attr: any) => ({
              name: attr.name,
              options: attr.options || [],
            })) || [],
            featured: prod.is_featured || false,
          };
        });
      }
    }
  } catch (err) {
    console.warn('Store API fetch error, attempting v3 REST API', err);
  }

  // Strategy 2: Try REST API v3 with consumer key/secret
  try {
    const authParams = `consumer_key=${CK}&consumer_secret=${CS}`;
    const categoryParam = categorySlug ? `&category=${categorySlug}` : '';
    const res = await fetch(`${LIVE_DOMAIN}/wp-json/wc/v3/products?per_page=50&${authParams}${categoryParam}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((prod: any) => ({
          id: String(prod.id),
          slug: prod.slug,
          name: prod.name,
          price: parseFloat(prod.price || prod.regular_price || '0'),
          regularPrice: prod.regular_price ? parseFloat(prod.regular_price) : undefined,
          description: prod.description || prod.short_description || '',
          shortDescription: (prod.short_description || prod.description || '').replace(/<[^>]+>/g, '').slice(0, 150),
          category: prod.categories?.[0]?.name || 'Productos RufPixel',
          categorySlug: prod.categories?.[0]?.slug || 'general',
          image: prod.images?.[0]?.src || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
          gallery: prod.images?.map((img: any) => img.src) || [],
          stock: prod.stock_quantity ?? 100,
          attributes: prod.attributes?.map((attr: any) => ({
            name: attr.name,
            options: attr.options || [],
          })) || [],
          featured: prod.featured || false,
        }));
      }
    }
  } catch (err) {
    console.warn('REST API v3 fetch error', err);
  }

  // Fallback to rich mock data if no products are returned
  if (categorySlug) {
    return MOCK_PRODUCTS.filter(p => p.categorySlug === categorySlug);
  }
  return MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug) || null;
}
