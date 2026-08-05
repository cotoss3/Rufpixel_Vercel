import { Product, ProductVariation } from './types';
import { MOCK_PRODUCTS } from './mockData';

const LIVE_DOMAIN = 'https://rufpixel.com';
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_ca97c633f96d52d6b7178f9bef3c1f20fbf21688';
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_cf44b18a5302efd0464436c21752fa8c0c56cefc1';

export async function getProducts(categorySlug?: string, page = 1, perPage = 15): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
  // Strategy 1: WooCommerce Store API
  try {
    const categoryParam = categorySlug && categorySlug !== 'todos' ? `&category=${categorySlug}` : '';
    const url = `${LIVE_DOMAIN}/wp-json/wc/store/v1/products?page=${page}&per_page=${perPage}${categoryParam}`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
      const totalProducts = parseInt(res.headers.get('x-wp-total') || '15', 10);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const products = data.map((prod: any) => {
          // Calculate prices (cents to dollars)
          const minAmount = prod.prices?.price_range?.min_amount ? parseFloat(prod.prices.price_range.min_amount) / 100 : undefined;
          const maxAmount = prod.prices?.price_range?.max_amount ? parseFloat(prod.prices.price_range.max_amount) / 100 : undefined;
          const rawPrice = minAmount ?? (prod.prices?.price ? parseFloat(prod.prices.price) / 100 : parseFloat(prod.price || '0'));
          const rawRegPrice = prod.prices?.regular_price ? parseFloat(prod.prices.regular_price) / 100 : (prod.regular_price ? parseFloat(prod.regular_price) : undefined);

          // Parse attributes (Cantidades and Colores)
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

        return { products, totalPages, totalProducts };
      }
    }
  } catch (err) {
    console.warn('Store API fetch error, attempting v3 REST API', err);
  }

  // Strategy 2: REST API v3 fallback
  try {
    const authParams = `consumer_key=${CK}&consumer_secret=${CS}`;
    const categoryParam = categorySlug && categorySlug !== 'todos' ? `&category=${categorySlug}` : '';
    const url = `${LIVE_DOMAIN}/wp-json/wc/v3/products?page=${page}&per_page=${perPage}&${authParams}${categoryParam}`;
    
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (res.ok) {
      const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
      const totalProducts = parseInt(res.headers.get('x-wp-total') || '15', 10);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const products = data.map((prod: any) => ({
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
          type: prod.type || 'simple',
          attributes: prod.attributes?.map((attr: any) => ({
            name: attr.name,
            options: attr.options || [],
          })) || [],
          featured: prod.featured || false,
        }));

        return { products, totalPages, totalProducts };
      }
    }
  } catch (err) {
    console.warn('REST API v3 fetch error', err);
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
