import { Product, ProductVariation } from './types';
import { MOCK_PRODUCTS } from './mockData';

const LIVE_DOMAIN = 'https://rufpixel.com';
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_ca97c633f96d52d6b7178f9bef3c1f20fbf21688';
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_cf44b18a5302efd0464436c21752fa8c0c56cefc1';

export async function getProducts(categorySlug?: string, page = 1, perPage = 15): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
  try {
    const categoryParam = categorySlug && categorySlug !== 'todos' ? `&category=${categorySlug}` : '';
    // Fetch top 100 catalog products to filter out quantity sub-product duplicates
    const url = `${LIVE_DOMAIN}/wp-json/wc/store/v1/products?per_page=100${categoryParam}`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        // Collect all child quantity item IDs referenced in grouped_products
        const allChildIds = new Set<number>();
        data.forEach(p => {
          (p.grouped_products || []).forEach((id: number) => allChildIds.add(id));
        });

        // Keep ONLY the parent product models (eliminating 50/100/250 units duplicate cards)
        const rootProducts = data.filter(p => !allChildIds.has(p.id));

        const formattedProducts: Product[] = rootProducts.map((prod: any) => {
          const minAmount = prod.prices?.price_range?.min_amount ? parseFloat(prod.prices.price_range.min_amount) / 100 : undefined;
          const maxAmount = prod.prices?.price_range?.max_amount ? parseFloat(prod.prices.price_range.max_amount) / 100 : undefined;
          const rawPrice = minAmount ?? (prod.prices?.price ? parseFloat(prod.prices.price) / 100 : parseFloat(prod.price || '0'));
          const rawRegPrice = prod.prices?.regular_price ? parseFloat(prod.prices.regular_price) / 100 : (prod.regular_price ? parseFloat(prod.regular_price) : undefined);

          // Parse Cantidad & Color attributes
          const parsedAttributes = prod.attributes?.map((attr: any) => {
            const rawOptions = attr.options && attr.options.length > 0
              ? attr.options
              : attr.terms?.map((t: any) => typeof t === 'string' ? t : t.name) || [];
            return {
              name: attr.name,
              options: rawOptions,
            };
          }).filter((a: any) => a.options.length > 0) || [];

          return {
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
            image: prod.images?.[0]?.src || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
            gallery: prod.images?.map((img: any) => img.src) || [],
            stock: prod.is_in_stock ?? 100,
            type: prod.type || 'simple',
            attributes: parsedAttributes,
            featured: prod.is_featured || false,
          };
        });

        // Apply clean pagination
        const totalProducts = formattedProducts.length;
        const totalPages = Math.ceil(totalProducts / perPage) || 1;
        const startIndex = (page - 1) * perPage;
        const paginatedProducts = formattedProducts.slice(startIndex, startIndex + perPage);

        return { products: paginatedProducts, totalPages, totalProducts };
      }
    }
  } catch (err) {
    console.warn('Store API deduplication fetch error', err);
  }

  // Fallback Mock Data Paginated
  let filteredMock = MOCK_PRODUCTS;
  if (categorySlug && categorySlug !== 'todos') {
    filteredMock = MOCK_PRODUCTS.filter(p => p.categorySlug === categorySlug);
  }
  const startIndex = (page - 1) * perPage;
  const paginatedMock = filteredMock.slice(startIndex, startIndex + perPage);
  const totalPages = Math.ceil(filteredMock.length / perPage) || 1;

  return { products: paginatedMock, totalPages, totalProducts: filteredMock.length };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { products } = await getProducts('todos', 1, 100);
  const found = products.find(p => p.slug === slug);
  if (!found) return null;

  // Fetch child quantity/color variations for this product
  try {
    const res = await fetch(`${LIVE_DOMAIN}/wp-json/wc/store/v1/products?slug=${slug}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const prodData = data[0];
        const groupedIds: number[] = prodData.grouped_products || [];

        if (groupedIds.length > 0) {
          const childPromises = groupedIds.map(async (childId) => {
            const cRes = await fetch(`${LIVE_DOMAIN}/wp-json/wc/store/v1/products/${childId}`);
            if (cRes.ok) {
              const cData = await cRes.json();
              const cPrice = cData.prices?.price ? parseFloat(cData.prices.price) / 100 : parseFloat(cData.price || '0');
              const nameMatch = cData.name?.match(/(\d+)\s*(uds|unidades|piezas)?/i);
              const qtyOpt = nameMatch ? nameMatch[1] : undefined;

              return {
                id: String(cData.id),
                name: cData.name,
                price: cPrice,
                regularPrice: cData.prices?.regular_price ? parseFloat(cData.prices.regular_price) / 100 : undefined,
                attributes: qtyOpt ? { 'Cantidad': qtyOpt } : {},
                image: cData.images?.[0]?.src,
                quantityOption: qtyOpt,
              };
            }
            return null;
          });

          const fetchedChildren = (await Promise.all(childPromises)).filter(Boolean) as ProductVariation[];
          if (fetchedChildren.length > 0) {
            found.childVariations = fetchedChildren;
          }
        }
      }
    }
  } catch (err) {
    console.warn('Error loading child quantity variations:', err);
  }

  return found;
}
