import { Product, ProductVariation, Order } from './types';
import { MOCK_PRODUCTS } from './mockData';

const LIVE_DOMAIN = 'https://rufpixel.com';
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_ca97c633f96d52d6b7178f9bef3c1f20fbf21688';
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_cf44b18a5302efd0464436c21752fa8c0c56cefc1';

const HEADLESS_HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 RufPixel-Headless/1.0',
};

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// In-Memory Global Server Caches
const productCache = new Map<string, { data: Product; timestamp: number }>();
let globalCatalogCache: { products: Product[]; timestamp: number } | null = null;
let globalCategoriesCache: { categories: ProductCategory[]; timestamp: number } | null = null;
let isFetchingBackgroundCatalog = false;

const CATALOG_CACHE_TTL = 30 * 60 * 1000; // 30 minutes memory TTL
const FETCH_TIMEOUT_MS = 12000; // 12 seconds safe timeout for WordPress REST API

export async function getCategories(): Promise<ProductCategory[]> {
  // 1. Serve from Server Memory Cache if valid (< 1ms)
  if (globalCategoriesCache && Date.now() - globalCategoriesCache.timestamp < CATALOG_CACHE_TTL) {
    return globalCategoriesCache.categories;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const res = await fetch(`${LIVE_DOMAIN}/wp-json/wc/store/v1/products/categories?per_page=100`, {
      next: { revalidate: 1800 },
      headers: HEADLESS_HEADERS,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const categories = data
          .filter((c: any) => c.slug !== 'sin-categorizar' && c.count > 0)
          .map((c: any) => ({
            id: String(c.id),
            name: c.name,
            slug: c.slug,
            count: c.count,
          }));

        globalCategoriesCache = { categories, timestamp: Date.now() };
        return categories;
      }
    }
  } catch (err) {
    console.warn('Error fetching live categories, using cache/fallback:', err);
  }

  // Fallback category list if API times out
  const fallbackCategories: ProductCategory[] = [
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

  return fallbackCategories;
}

// ULTRA-FAST & RESILIENT PRODUCT CATALOG FETCHING
export async function getProducts(
  categorySlug?: string,
  page = 1,
  perPage = 100
): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
  // 1. Return from In-Memory Server Cache instantly (< 1ms) if available and fresh
  if (globalCatalogCache && Date.now() - globalCatalogCache.timestamp < CATALOG_CACHE_TTL) {
    const allCached = globalCatalogCache.products;
    const filtered = filterProductsByCategory(allCached, categorySlug);
    return {
      products: filtered,
      totalPages: Math.ceil(filtered.length / 32) || 1,
      totalProducts: filtered.length,
    };
  }

  try {
    const categoryParam = categorySlug && categorySlug !== 'todos' ? `&category=${categorySlug}` : '';

    // Fetch Page 1 first (100 items) with generous 12s timeout
    const controllerP1 = new AbortController();
    const timeoutP1 = setTimeout(() => controllerP1.abort(), FETCH_TIMEOUT_MS);

    const p1Url = `${LIVE_DOMAIN}/wp-json/wc/store/v1/products?per_page=100&page=1${categoryParam}`;
    const p1Res = await fetch(p1Url, {
      next: { revalidate: 1800 },
      headers: HEADLESS_HEADERS,
      signal: controllerP1.signal,
    });
    clearTimeout(timeoutP1);

    if (p1Res.ok) {
      const p1Data = await p1Res.json();
      if (Array.isArray(p1Data) && p1Data.length > 0) {
        const formattedP1 = formatRawProducts(p1Data);

        // Save Page 1 to cache immediately
        globalCatalogCache = { products: formattedP1, timestamp: Date.now() };

        // Asynchronously fetch remaining pages (Pages 2 to 6) in background
        if (!isFetchingBackgroundCatalog && (!categorySlug || categorySlug === 'todos')) {
          isFetchingBackgroundCatalog = true;
          fetchRemainingPages(formattedP1).finally(() => {
            isFetchingBackgroundCatalog = false;
          });
        }

        const filtered = filterProductsByCategory(formattedP1, categorySlug);
        return {
          products: filtered,
          totalPages: Math.ceil(filtered.length / 32) || 1,
          totalProducts: filtered.length,
        };
      }
    }
  } catch (err) {
    console.warn('Store API page 1 fetch warning:', err);
  }

  // If live fetch failed, use stale cache if available
  if (globalCatalogCache) {
    const staleProducts = filterProductsByCategory(globalCatalogCache.products, categorySlug);
    return { products: staleProducts, totalPages: Math.ceil(staleProducts.length / 32) || 1, totalProducts: staleProducts.length };
  }

  // Fallback Mock Data as absolute safety net
  let filteredMock = filterProductsByCategory(MOCK_PRODUCTS, categorySlug);
  return { products: filteredMock, totalPages: 1, totalProducts: filteredMock.length };
}

// Background worker to fetch Pages 2 to 6 without blocking user requests
async function fetchRemainingPages(initialP1Products: Product[]) {
  try {
    const remainingPages = [2, 3, 4, 5, 6];
    const promises = remainingPages.map(async (pNum) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
        const url = `${LIVE_DOMAIN}/wp-json/wc/store/v1/products?per_page=100&page=${pNum}`;
        const res = await fetch(url, {
          next: { revalidate: 1800 },
          headers: HEADLESS_HEADERS,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          return Array.isArray(data) ? formatRawProducts(data) : [];
        }
      } catch (e) {}
      return [];
    });

    const results = await Promise.all(promises);
    const allProducts = [initialP1Products, ...results].flat();

    // Deduplicate by ID
    const uniqueMap = new Map<string, Product>();
    allProducts.forEach((p) => uniqueMap.set(p.id, p));
    const fullCatalog = Array.from(uniqueMap.values());

    globalCatalogCache = { products: fullCatalog, timestamp: Date.now() };
  } catch (e) {
    console.warn('Error fetching background pages:', e);
  }
}

// Helper to format raw WooCommerce store products
function formatRawProducts(rawData: any[]): Product[] {
  return rawData.map((prod: any) => {
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
}

// Helper to filter products by category slug
function filterProductsByCategory(products: Product[], categorySlug?: string): Product[] {
  if (!categorySlug || categorySlug === 'todos') return products;
  const cleanSlug = categorySlug.toLowerCase().trim();
  return products.filter((p) => {
    if (p.categories && p.categories.some((c) => c.slug.toLowerCase() === cleanSlug)) return true;
    if (p.categorySlug && p.categorySlug.toLowerCase() === cleanSlug) return true;
    return false;
  });
}

// ULTRA-FAST PDP LOOKUP WITH MEMORY CACHE & UNFILTERED SLUG FALLBACK
export async function getProductBySlug(slug: string): Promise<Product | null> {
  // 1. Check memory cache for instant response (< 1ms)
  const cached = productCache.get(slug);
  if (cached && Date.now() - cached.timestamp < CATALOG_CACHE_TTL) {
    return cached.data;
  }

  // 2. Check if product exists in global catalog cache
  if (globalCatalogCache) {
    const foundInCatalog = globalCatalogCache.products.find(p => p.slug === slug);
    if (foundInCatalog) {
      productCache.set(slug, { data: foundInCatalog, timestamp: Date.now() });
      return foundInCatalog;
    }
  }

  // 3. Fast search in local mock data
  const localMock = MOCK_PRODUCTS.find(p => p.slug === slug);
  if (localMock) return localMock;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const res = await fetch(`${LIVE_DOMAIN}/wp-json/wc/store/v1/products?slug=${slug}`, {
      next: { revalidate: 1800 },
      headers: HEADLESS_HEADERS,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const formatted = formatRawProducts(data)[0];
        if (formatted) {
          productCache.set(slug, { data: formatted, timestamp: Date.now() });
          return formatted;
        }
      }
    }
  } catch (err) {
    console.warn('Error in getProductBySlug timeout/abort:', err);
  }

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
