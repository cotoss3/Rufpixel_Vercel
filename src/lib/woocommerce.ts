import { Product, ProductVariation, Order } from './types';
import { MOCK_PRODUCTS } from './mockData';

const LIVE_DOMAIN = 'https://rufpixel.com';
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_ca97c633f96d52d6b7178f9bef3c1f20fbf21688';
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_cf44b18a5302efd0464436c21752fa8c0c56cefc1';

const HEADLESS_HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'RufPixel-Headless-Storefront/1.0 (Sincronizacion de Catalogo y Pedidos RufPixel Vercel)',
};

// In-Memory Cache Map for Instant PDP Loading
const productCache = new Map<string, { data: Product; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${LIVE_DOMAIN}/wp-json/wc/store/v1/products/categories?per_page=100`, {
      next: { revalidate: 300 },
      headers: HEADLESS_HEADERS,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data
          .filter((c: any) => c.slug !== 'sin-categorizar' && c.count > 0)
          .map((c: any) => ({
            id: String(c.id),
            name: c.name,
            slug: c.slug,
            count: c.count,
          }));
      }
    }
  } catch (err) {
    console.warn('Error fetching live categories:', err);
  }

  // Fallback category list
  return [
    { id: '1', name: 'Accesorios de Escritorio', slug: 'accesorios-de-escritorio', count: 9 },
    { id: '2', name: 'Bolígrafos y Plumas', slug: 'boligrafos-y-plumas', count: 24 },
    { id: '3', name: 'Bolsas y Totes', slug: 'bolsas-y-totes', count: 18 },
    { id: '4', name: 'Botellas y Termos', slug: 'botellas-y-termos', count: 14 },
    { id: '5', name: 'Cocina y Hogar', slug: 'cocina-y-hogar', count: 16 },
    { id: '6', name: 'Gorras y Accesorios de Cabeza', slug: 'gorras-y-accesorios-de-cabeza', count: 11 },
    { id: '7', name: 'Libretas y Cuadernos', slug: 'libretas-y-cuadernos', count: 14 },
    { id: '8', name: 'Llaveros', slug: 'llaveros', count: 9 },
    { id: '9', name: 'Loncheras Térmicas', slug: 'loncheras-termicas', count: 5 },
    { id: '10', name: 'Mochilas y Maletines', slug: 'mochilas-y-maletines', count: 6 },
    { id: '11', name: 'Sets y Regalos', slug: 'sets-y-regalos', count: 2 },
    { id: '12', name: 'Textiles y Ropa', slug: 'textiles-y-ropa', count: 15 },
    { id: '13', name: 'Vasos y Tazas', slug: 'vasos-y-tazas', count: 16 },
  ];
}

// Fetch all 598 products across Pages 1 to 6 in parallel to include 100% of all WordPress items and URLs
export async function getProducts(categorySlug?: string, page = 1, perPage = 100): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
  try {
    const categoryParam = categorySlug && categorySlug !== 'todos' ? `&category=${categorySlug}` : '';
    
    // Fetch all 6 pages (598 total items) in parallel
    const pagesToFetch = [1, 2, 3, 4, 5, 6];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    
    const pagePromises = pagesToFetch.map(async (pNum) => {
      try {
        const url = `${LIVE_DOMAIN}/wp-json/wc/store/v1/products?per_page=100&page=${pNum}${categoryParam}`;
        const res = await fetch(url, {
          next: { revalidate: 120 },
          headers: HEADLESS_HEADERS,
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          return Array.isArray(data) ? data : [];
        }
      } catch (e) {}
      return [];
    });

    const pageResults = await Promise.all(pagePromises);
    clearTimeout(timeoutId);
    const rawData = pageResults.flat();

    if (rawData.length > 0) {
      const formattedProducts: Product[] = rawData.map((prod: any) => {
        const minAmount = prod.prices?.price_range?.min_amount ? parseFloat(prod.prices.price_range.min_amount) / 100 : undefined;
        const maxAmount = prod.prices?.price_range?.max_amount ? parseFloat(prod.prices.price_range.max_amount) / 100 : undefined;
        const rawPrice = minAmount ?? (prod.prices?.price ? parseFloat(prod.prices.price) / 100 : parseFloat(prod.price || '0'));
        const rawRegPrice = prod.prices?.regular_price ? parseFloat(prod.prices.regular_price) / 100 : (prod.regular_price ? parseFloat(prod.regular_price) : undefined);

        const parsedAttributes = prod.attributes?.map((attr: any) => {
          const rawOptions = attr.options && attr.options.length > 0
            ? attr.options
            : attr.terms?.map((t: any) => typeof t === 'string' ? t : t.name) || [];
          return {
            name: attr.name,
            options: rawOptions,
          };
        }).filter((a: any) => a.options.length > 0) || [];

        const catList = prod.categories?.map((c: any) => ({
          id: String(c.id),
          name: c.name,
          slug: c.slug,
        })) || [];

        const formatted: Product = {
          id: String(prod.id),
          slug: prod.slug,
          name: prod.name,
          price: rawPrice > 0 ? rawPrice : 5.00,
          regularPrice: rawRegPrice && rawRegPrice > rawPrice ? rawRegPrice : undefined,
          priceMin: minAmount,
          priceMax: maxAmount,
          description: prod.description || prod.short_description || '',
          shortDescription: (prod.short_description || prod.description || '').replace(/<[^>]+>/g, '').slice(0, 150),
          category: prod.categories?.[0]?.name || 'Productos RufPixel',
          categorySlug: prod.categories?.[0]?.slug || 'general',
          categories: catList,
          image: prod.images?.[0]?.src || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
          gallery: prod.images?.map((img: any) => img.src) || [],
          stock: prod.is_in_stock ?? 100,
          type: prod.type || 'simple',
          attributes: parsedAttributes,
          featured: prod.is_featured || false,
        };

        // Cache product for instant slug lookups
        productCache.set(prod.slug, { data: formatted, timestamp: Date.now() });
        return formatted;
      });

      // Deduplicate products by id
      const uniqueProductsMap = new Map<string, Product>();
      formattedProducts.forEach(p => uniqueProductsMap.set(p.id, p));
      const uniqueProducts = Array.from(uniqueProductsMap.values());

      return { products: uniqueProducts, totalPages: Math.ceil(uniqueProducts.length / 32) || 1, totalProducts: uniqueProducts.length };
    }
  } catch (err) {
    console.warn('Store API multi-page fetch error', err);
  }

  // Fallback Mock Data
  let filteredMock = MOCK_PRODUCTS;
  if (categorySlug && categorySlug !== 'todos') {
    filteredMock = MOCK_PRODUCTS.filter(p => p.categorySlug === categorySlug || p.categories?.some(c => c.slug === categorySlug));
  }

  return { products: filteredMock, totalPages: 1, totalProducts: filteredMock.length };
}

// ULTRA-FAST PDP LOOKUP WITH MEMORY CACHE & UNFILTERED SLUG FALLBACK
export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Check memory cache for instant response (< 2ms)
  const cached = productCache.get(slug);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // Fast search in local mock data first if available
  const localMock = MOCK_PRODUCTS.find(p => p.slug === slug);
  if (localMock) return localMock;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${LIVE_DOMAIN}/wp-json/wc/store/v1/products?slug=${slug}`, {
      next: { revalidate: 300 },
      headers: HEADLESS_HEADERS,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const prod = data[0];
        const minAmount = prod.prices?.price_range?.min_amount ? parseFloat(prod.prices.price_range.min_amount) / 100 : undefined;
        const rawPrice = minAmount ?? (prod.prices?.price ? parseFloat(prod.prices.price) / 100 : parseFloat(prod.price || '0'));
        const rawRegPrice = prod.prices?.regular_price ? parseFloat(prod.prices.regular_price) / 100 : undefined;

        const parsedAttributes = prod.attributes?.map((attr: any) => {
          const rawOptions = attr.options && attr.options.length > 0
            ? attr.options
            : attr.terms?.map((t: any) => typeof t === 'string' ? t : t.name) || [];
          return {
            name: attr.name,
            options: rawOptions,
          };
        }).filter((a: any) => a.options.length > 0) || [];

        const catList = prod.categories?.map((c: any) => ({
          id: String(c.id),
          name: c.name,
          slug: c.slug,
        })) || [];

        const productObj: Product = {
          id: String(prod.id),
          slug: prod.slug,
          name: prod.name,
          price: rawPrice > 0 ? rawPrice : 5.00,
          regularPrice: rawRegPrice && rawRegPrice > rawPrice ? rawRegPrice : undefined,
          description: prod.description || prod.short_description || '',
          shortDescription: (prod.short_description || prod.description || '').replace(/<[^>]+>/g, '').slice(0, 150),
          category: prod.categories?.[0]?.name || 'Productos RufPixel',
          categorySlug: prod.categories?.[0]?.slug || 'general',
          categories: catList,
          image: prod.images?.[0]?.src || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
          gallery: prod.images?.map((img: any) => img.src) || [],
          stock: prod.is_in_stock ?? 100,
          type: prod.type || 'simple',
          attributes: parsedAttributes,
          featured: prod.is_featured || false,
        };

        // Cache result for subsequent instant hits
        productCache.set(slug, { data: productObj, timestamp: Date.now() });
        return productObj;
      }
    }
  } catch (err) {
    console.warn('Error in getProductBySlug timeout/abort:', err);
  }

  // Fallback: search in full products list if slug fetch produced no match
  try {
    const { products } = await getProducts('todos', 1, 300);
    const found = products.find((p) => p.slug === slug || p.id === slug);
    if (found) {
      productCache.set(slug, { data: found, timestamp: Date.now() });
      return found;
    }
  } catch (err) {}

  return null;
}

// Function to post new order directly to BDD
export async function createWooCommerceOrder(order: Order): Promise<{ success: boolean; wooOrderId?: number }> {
  try {
    const nameParts = order.customer.fullName.trim().split(' ');
    const firstName = nameParts[0] || 'Cliente';
    const lastName = nameParts.slice(1).join(' ') || 'RufPixel';

    const orderPayload = {
      payment_method: 'yappy_manual',
      payment_method_title: 'Yappy Panamá (Validación Humana)',
      set_paid: false,
      status: 'pending',
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: order.customer.address,
        city: order.customer.city || 'Ciudad de Panamá',
        state: 'Panamá',
        country: 'PA',
        email: order.customer.email,
        phone: order.customer.phone,
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: order.customer.address,
        city: order.customer.city || 'Ciudad de Panamá',
        state: 'Panamá',
        country: 'PA',
      },
      line_items: order.items.map((item) => ({
        product_id: parseInt(item.product.id, 10) || 10412,
        quantity: item.quantity,
      })),
      customer_note: `Número de Pedido RufPixel: ${order.orderNumber}. Transacción Yappy ID: ${order.paymentProof?.transactionId || 'Pendiente'}. Comprobante: ${order.paymentProof?.receiptImageUrl || 'No adjunto'}. Notas adicionales: ${order.customer.notes || 'Ninguna'}`,
    };

    const authParams = `consumer_key=${CK}&consumer_secret=${CS}`;
    const res = await fetch(`${LIVE_DOMAIN}/wp-json/wc/v3/orders?${authParams}`, {
      method: 'POST',
      headers: {
        ...HEADLESS_HEADERS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, wooOrderId: data.id };
    }
  } catch (err) {
    console.warn('Could not post order directly to BDD, order saved in local state', err);
  }

  return { success: false };
}
