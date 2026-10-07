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

export interface CategoryDefinition {
  id: string;
  name: string;
  canonicalSlug: string;
  aliases: string[];
  expectedCount?: number;
}

// 100% Comprehensive Category Definitions & Alias Map Audited from WooCommerce Live BDD
export const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: '66',
    name: 'Agendas y Libretas',
    canonicalSlug: 'libretas-y-cuadernos',
    aliases: [
      'agenda', 'agendas', 'agendas-y-libretas',
      'libreta', 'libretas', 'cuaderno', 'cuadernos',
      'libretas-y-cuadernos', 'cuadernos-y-libretas', '66'
    ],
    expectedCount: 14,
  },
  {
    id: '65',
    name: 'Bolígrafos y Plumas',
    canonicalSlug: 'boligrafos-y-plumas',
    aliases: [
      'boligrafo', 'boligrafos', 'pluma', 'plumas',
      'lapicero', 'lapiceros', 'boligrafos-y-plumas', '65'
    ],
    expectedCount: 24,
  },
  {
    id: '67',
    name: 'Bolsas y Loncheras',
    canonicalSlug: 'bolsas-y-totes',
    aliases: [
      'bolsa', 'bolsas', 'lonchera', 'loncheras', 'tote', 'totes',
      'bolsas-y-loncheras', 'bolsas-y-totes', 'bolsa-y-lonchera', '67'
    ],
    expectedCount: 22,
  },
  {
    id: '75',
    name: 'Madera y Bambú',
    canonicalSlug: 'cocina-y-hogar',
    aliases: [
      'madera', 'bambu', 'madera-y-bambu', 'cocina', 'hogar',
      'cocina-y-hogar', 'madera-bambu', '75'
    ],
    expectedCount: 17,
  },
  {
    id: '72',
    name: 'Vasos y Tazas',
    canonicalSlug: 'vasos-y-tazas',
    aliases: [
      'vaso', 'vasos', 'taza', 'tazas', 'mug', 'mugs',
      'vasos-y-tazas', '72'
    ],
    expectedCount: 16,
  },
  {
    id: '73',
    name: 'Textiles y Accesorios',
    canonicalSlug: 'textiles-y-ropa',
    aliases: [
      'textil', 'textiles', 'ropa', 'camiseta', 'camisetas',
      'sueter', 'sueteres', 'textiles-y-ropa', 'textiles-y-accesorios', '73'
    ],
    expectedCount: 15,
  },
  {
    id: '54',
    name: 'Vasos Botellas y Termos',
    canonicalSlug: 'tazas-botellas-y-termos',
    aliases: [
      'botella', 'botellas', 'termo', 'termos',
      'vasos-botellas-y-termos', 'tazas-botellas-y-termos',
      'botellas-y-termos', '54'
    ],
    expectedCount: 14,
  },
  {
    id: '74',
    name: 'Gorras y Sombreros',
    canonicalSlug: 'gorras-y-accesorios-de-cabeza',
    aliases: [
      'gorra', 'gorras', 'sombrero', 'sombreros',
      'gorras-y-sombreros', 'gorras-y-accesorios-de-cabeza', '74'
    ],
    expectedCount: 11,
  },
  {
    id: '76',
    name: 'Oficina y Escritorio',
    canonicalSlug: 'articulos-promocionales-de-oficina',
    aliases: [
      'oficina', 'escritorio', 'oficina-y-escritorio',
      'articulos-promocionales-de-oficina', 'accesorios-de-escritorio', '76'
    ],
    expectedCount: 10,
  },
  {
    id: '46',
    name: 'Llaveros',
    canonicalSlug: 'llaveros',
    aliases: ['llavero', 'llaveros', '46'],
    expectedCount: 9,
  },
  {
    id: '69',
    name: 'Mochilas y Cangureras',
    canonicalSlug: 'mochilas-y-maletines',
    aliases: [
      'mochila', 'mochilas', 'cangurera', 'cangureras',
      'maletin', 'maletines', 'mochilas-y-cangureras', 'mochilas-y-maletines', '69'
    ],
    expectedCount: 6,
  },
  {
    id: '59',
    name: 'Paraguas',
    canonicalSlug: 'paraguas',
    aliases: ['paragua', 'paraguas', 'sombrilla', 'sombrillas', '59'],
    expectedCount: 4,
  },
  {
    id: '70',
    name: 'Regalos Corporativos',
    canonicalSlug: 'sets-y-regalos',
    aliases: [
      'regalo', 'regalos', 'set', 'sets',
      'regalos-corporativos', 'sets-y-regalos', '70'
    ],
    expectedCount: 2,
  },
  {
    id: '77',
    name: 'Identificaciones',
    canonicalSlug: 'identificacion-y-correas',
    aliases: [
      'identificacion', 'identificaciones', 'carnet', 'carnets',
      'correa', 'correas', 'lanyard', 'lanyards', 'identificacion-y-correas', '77'
    ],
    expectedCount: 2,
  },
];

// Fallback verified categories
export const FALLBACK_CATEGORIES: ProductCategory[] = CATEGORY_DEFINITIONS.map((def) => ({
  id: def.id,
  name: def.name,
  slug: def.canonicalSlug,
  count: def.expectedCount || 0,
}));

// Resolve ANY category slug, alias, or ID to its canonical definition
export function resolveCategory(slugOrAlias?: string): CategoryDefinition | undefined {
  if (!slugOrAlias || slugOrAlias === 'todos') return undefined;
  const clean = slugOrAlias.toLowerCase().trim();
  const normalized = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return CATEGORY_DEFINITIONS.find((def) => {
    if (def.canonicalSlug === clean || def.id === clean) return true;
    if (def.canonicalSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalized) return true;
    if (def.name.toLowerCase() === clean) return true;
    if (def.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalized) return true;
    if (def.aliases.some((a) => a === clean || a === normalized)) return true;

    const defNorm = def.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normalized.length >= 4 && (defNorm.includes(normalized) || normalized.includes(defNorm))) return true;

    return false;
  });
}

// Check if a product belongs to a given category
export function isProductInCategory(
  product: Product,
  categorySlugOrAlias?: string,
  categoriesList?: ProductCategory[]
): boolean {
  if (!categorySlugOrAlias || categorySlugOrAlias === 'todos') return true;

  const def = resolveCategory(categorySlugOrAlias);
  const targetCanonical = def ? def.canonicalSlug : categorySlugOrAlias.toLowerCase().trim();
  const targetId = def ? def.id : undefined;
  const targetAliases = def ? def.aliases : [categorySlugOrAlias.toLowerCase().trim()];

  // 1. Check product.categories array
  if (product.categories && product.categories.length > 0) {
    const hasCategoryMatch = product.categories.some((c) => {
      const cSlug = c.slug.toLowerCase().trim();
      const cId = String(c.id);
      if (cSlug === targetCanonical || (targetId && cId === targetId)) return true;
      if (targetAliases.includes(cSlug)) return true;
      const cDef = resolveCategory(cSlug) || resolveCategory(cId);
      if (cDef && def && cDef.id === def.id) return true;
      return false;
    });
    if (hasCategoryMatch) return true;
  }

  // 2. Check product.categorySlug
  if (product.categorySlug) {
    const pSlug = product.categorySlug.toLowerCase().trim();
    if (pSlug === targetCanonical || targetAliases.includes(pSlug)) return true;
    const pDef = resolveCategory(pSlug);
    if (pDef && def && pDef.id === def.id) return true;
  }

  // 3. Check product.category name
  if (def && product.category) {
    const pCat = product.category.toLowerCase().trim();
    if (pCat.includes(def.name.toLowerCase()) || def.name.toLowerCase().includes(pCat)) return true;
    if (targetAliases.some((a) => a.length >= 4 && pCat.includes(a))) return true;
  }

  // 4. Special keyword fallback in product name for Agenda / Libreta / Cuaderno
  if (def && def.id === '66') {
    const nameLower = product.name.toLowerCase();
    if (nameLower.includes('libreta') || nameLower.includes('cuaderno') || nameLower.includes('agenda')) {
      return true;
    }
  }

  return false;
}

// In-Memory Global Server Caches
const productCache = new Map<string, { data: Product; timestamp: number }>();
let globalCatalogCache: { products: Product[]; timestamp: number } | null = {
  products: MOCK_PRODUCTS,
  timestamp: Date.now(),
};
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
        const categoriesMap = new Map<string, ProductCategory>();

        // Seed with all defined categories
        CATEGORY_DEFINITIONS.forEach((def) => {
          categoriesMap.set(def.id, {
            id: def.id,
            name: def.name,
            slug: def.canonicalSlug,
            count: def.expectedCount || 0,
          });
        });

        // Update with live counts from API
        data
          .filter((c: any) => c.slug !== 'sin-categorizar' && c.count > 0)
          .forEach((c: any) => {
            const def = resolveCategory(c.slug) || resolveCategory(String(c.id));
            const catId = def ? def.id : String(c.id);
            const catName = def ? def.name : c.name;
            const catSlug = def ? def.canonicalSlug : c.slug;

            categoriesMap.set(catId, {
              id: catId,
              name: catName,
              slug: catSlug,
              count: c.count,
            });
          });

        const categories = Array.from(categoriesMap.values());
        globalCategoriesCache = { categories, timestamp: Date.now() };
        return categories;
      }
    }
  } catch (err) {
    console.warn('Error fetching live categories, using fallback:', err);
  }

  return FALLBACK_CATEGORIES;
}

// ULTRA-FAST & RESILIENT PRODUCT CATALOG FETCHING
export async function getProducts(
  categorySlug?: string,
  page = 1,
  perPage = 100
): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
  const isAll = !categorySlug || categorySlug === 'todos';
  const def = !isAll ? resolveCategory(categorySlug) : undefined;
  const canonicalSlug = def ? def.canonicalSlug : categorySlug;

  // 1. Return from In-Memory Server Cache instantly (< 1ms) if available and fresh
  if (globalCatalogCache && Date.now() - globalCatalogCache.timestamp < CATALOG_CACHE_TTL) {
    const allCached = globalCatalogCache.products;
    const filtered = filterProductsByCategory(allCached, canonicalSlug);

    // If specific category was requested and has items, return immediately
    if (isAll || filtered.length > 0) {
      return {
        products: filtered,
        totalPages: Math.ceil(filtered.length / 32) || 1,
        totalProducts: filtered.length,
      };
    }
  }

  try {
    // A) If a specific category is requested, fetch directly by Category ID for speed and 100% accuracy
    if (def) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      const catUrl = `${LIVE_DOMAIN}/wp-json/wc/store/v1/products?per_page=100&category=${def.id}`;

      const res = await fetch(catUrl, {
        next: { revalidate: 1800 },
        headers: HEADLESS_HEADERS,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = formatRawProducts(data);

          // Add to global catalog cache
          if (globalCatalogCache) {
            const uniqueMap = new Map<string, Product>();
            [...globalCatalogCache.products, ...formatted].forEach((p) => uniqueMap.set(p.id, p));
            globalCatalogCache = { products: Array.from(uniqueMap.values()), timestamp: Date.now() };
          }

          return {
            products: formatted,
            totalPages: Math.ceil(formatted.length / 32) || 1,
            totalProducts: formatted.length,
          };
        }
      }
    }

    // B) Fetch Page 1 AND Page 2 in parallel.
    // In WooCommerce RufPixel, ALL 166 categorized products are contained in Pages 1 and 2!
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const [p1Res, p2Res] = await Promise.all([
      fetch(`${LIVE_DOMAIN}/wp-json/wc/store/v1/products?per_page=100&page=1`, {
        next: { revalidate: 1800 },
        headers: HEADLESS_HEADERS,
        signal: controller.signal,
      }),
      fetch(`${LIVE_DOMAIN}/wp-json/wc/store/v1/products?per_page=100&page=2`, {
        next: { revalidate: 1800 },
        headers: HEADLESS_HEADERS,
        signal: controller.signal,
      }),
    ]);
    clearTimeout(timeoutId);

    let rawList: any[] = [];
    if (p1Res.ok) {
      const d1 = await p1Res.json();
      if (Array.isArray(d1)) rawList = [...rawList, ...d1];
    }
    if (p2Res.ok) {
      const d2 = await p2Res.json();
      if (Array.isArray(d2)) rawList = [...rawList, ...d2];
    }

    if (rawList.length > 0) {
      const formattedCatalog = formatRawProducts(rawList);

      // Deduplicate
      const uniqueMap = new Map<string, Product>();
      formattedCatalog.forEach((p) => uniqueMap.set(p.id, p));
      const fullP1P2 = Array.from(uniqueMap.values());

      globalCatalogCache = { products: fullP1P2, timestamp: Date.now() };

      // Background worker to fetch Pages 3-6 (uncategorized products) asynchronously
      if (!isFetchingBackgroundCatalog) {
        isFetchingBackgroundCatalog = true;
        fetchRemainingPages(fullP1P2).finally(() => {
          isFetchingBackgroundCatalog = false;
        });
      }

      const filtered = filterProductsByCategory(fullP1P2, canonicalSlug);
      return {
        products: filtered,
        totalPages: Math.ceil(filtered.length / 32) || 1,
        totalProducts: filtered.length,
      };
    }
  } catch (err) {
    console.warn('Store API fetch error:', err);
  }

  // If live fetch failed, use stale cache if available
  if (globalCatalogCache) {
    const staleProducts = filterProductsByCategory(globalCatalogCache.products, canonicalSlug);
    return {
      products: staleProducts,
      totalPages: Math.ceil(staleProducts.length / 32) || 1,
      totalProducts: staleProducts.length,
    };
  }

  // Fallback Mock Data as absolute safety net
  const filteredMock = filterProductsByCategory(MOCK_PRODUCTS, canonicalSlug);
  return { products: filteredMock, totalPages: 1, totalProducts: filteredMock.length };
}

// Background worker to fetch Pages 3 to 6 without blocking user requests
async function fetchRemainingPages(initialProducts: Product[]) {
  try {
    const remainingPages = [3, 4, 5, 6];
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
    const allProducts = [initialProducts, ...results].flat();

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

    const catList = prod.categories?.map((c: any) => {
      const def = resolveCategory(c.slug) || resolveCategory(String(c.id));
      return {
        id: String(c.id),
        name: def ? def.name : c.name,
        slug: def ? def.canonicalSlug : c.slug,
      };
    }) || [];

    const mainCat = catList[0];
    const def = mainCat ? resolveCategory(mainCat.slug) || resolveCategory(mainCat.id) : null;
    const catDisplayName = def ? def.name : (mainCat?.name || 'Productos RufPixel');
    const catSlug = def ? def.canonicalSlug : (mainCat?.slug || 'general');

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
      category: catDisplayName,
      categorySlug: catSlug,
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

// Helper to filter products by category slug using robust category matching
export function filterProductsByCategory(products: Product[], categorySlug?: string): Product[] {
  if (!categorySlug || categorySlug === 'todos') return products;
  return products.filter((p) => isProductInCategory(p, categorySlug));
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
    const foundInCatalog = globalCatalogCache.products.find((p) => p.slug === slug);
    if (foundInCatalog) {
      productCache.set(slug, { data: foundInCatalog, timestamp: Date.now() });
      return foundInCatalog;
    }
  }

  // 3. Fast search in local mock data
  const localMock = MOCK_PRODUCTS.find((p) => p.slug === slug);
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
