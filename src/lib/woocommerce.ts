import { Product, ProductVariation } from './types';
import { MOCK_PRODUCTS } from './mockData';

const LIVE_DOMAIN = 'https://rufpixel.com';
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY || 'ck_ca97c633f96d52d6b7178f9bef3c1f20fbf21688';
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET || 'cs_cf44b18a5302efd0464436c21752fa8c0c56cefc1';

// Helper to determine product family name
function getProductFamilyName(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('llavero')) return 'Llaveros Promocionales';
  if (lower.includes('mouse pad')) return 'Mouse Pads Personalizados';
  if (lower.includes('taza') || lower.includes('vaso') || lower.includes('mug')) return 'Tazas, Vasos & Mugs Corporativos';
  if (lower.includes('botella') || lower.includes('cilindro')) return 'Botellas & Cilindros Térmicos';
  if (lower.includes('gorra') || lower.includes('visera') || lower.includes('sombrero') || lower.includes('bandana')) return 'Gorras, Viseras & Headwear';
  if (lower.includes('delantal')) return 'Delantales Promocionales';
  if (lower.includes('bolsa') || lower.includes('mochila') || lower.includes('cangurera') || lower.includes('lonchera')) return 'Bolsas, Mochilas & Loncheras';
  if (lower.includes('cuaderno') || lower.includes('libreta')) return 'Cuadernos & Libretas Corporativas';
  if (lower.includes('set de accesorios para vino') || lower.includes('caja') || lower.includes('tabla para queso')) return 'Sets de Regalo, Vino & Quesos';
  return name;
}

export async function getProducts(categorySlug?: string, page = 1, perPage = 15): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
  try {
    const categoryParam = categorySlug && categorySlug !== 'todos' ? `&category=${categorySlug}` : '';
    // Fetch 100 products from Store API to perform smart family consolidation
    const url = `${LIVE_DOMAIN}/wp-json/wc/store/v1/products?per_page=100${categoryParam}`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        // Collect all child IDs referenced in grouped_products
        const allChildIds = new Set<number>();
        data.forEach(p => {
          (p.grouped_products || []).forEach((id: number) => allChildIds.add(id));
        });

        // Filter out individual child variation items
        const rootProducts = data.filter(p => !allChildIds.has(p.id));

        // Group root products into product family cards
        const familyMap = new Map<string, { mainProduct: any; subProducts: any[] }>();

        rootProducts.forEach((prod: any) => {
          const familyName = getProductFamilyName(prod.name);
          if (!familyMap.has(familyName)) {
            familyMap.set(familyName, { mainProduct: prod, subProducts: [prod] });
          } else {
            familyMap.get(familyName)!.subProducts.push(prod);
          }
        });

        // Convert grouped family map into Product array
        const consolidatedProducts: Product[] = Array.from(familyMap.entries()).map(([familyName, group]) => {
          const main = group.mainProduct;
          const isGroupFamily = group.subProducts.length > 1;

          // Price calculation
          const minAmount = main.prices?.price_range?.min_amount ? parseFloat(main.prices.price_range.min_amount) / 100 : undefined;
          const rawPrice = minAmount ?? (main.prices?.price ? parseFloat(main.prices.price) / 100 : parseFloat(main.price || '0'));
          const rawRegPrice = main.prices?.regular_price ? parseFloat(main.prices.regular_price) / 100 : undefined;

          // Build attributes (Quantity and Model/Estilo)
          const models = group.subProducts.map(sp => sp.name.replace(familyName, '').replace(/^-/, '').trim() || sp.name);
          const attributes: { name: string; options: string[] }[] = [];

          if (isGroupFamily) {
            attributes.push({
              name: 'Modelo / Estilo',
              options: models.filter(Boolean),
            });
          }

          // Main product attributes (e.g. Cantidad)
          main.attributes?.forEach((attr: any) => {
            const rawOpts = attr.options && attr.options.length > 0
              ? attr.options
              : attr.terms?.map((t: any) => typeof t === 'string' ? t : t.name) || [];
            if (rawOpts.length > 0) {
              attributes.push({
                name: attr.name,
                options: rawOpts,
              });
            }
          });

          // Build child variations list for detail page
          const childVariations: ProductVariation[] = group.subProducts.map(sp => {
            const pPrice = sp.prices?.price ? parseFloat(sp.prices.price) / 100 : parseFloat(sp.price || '0');
            return {
              id: String(sp.id),
              name: sp.name,
              price: pPrice > 0 ? pPrice : rawPrice,
              regularPrice: sp.prices?.regular_price ? parseFloat(sp.prices.regular_price) / 100 : undefined,
              attributes: { 'Modelo / Estilo': sp.name },
              image: sp.images?.[0]?.src,
            };
          });

          return {
            id: String(main.id),
            slug: isGroupFamily ? familyName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : main.slug,
            name: isGroupFamily ? familyName : main.name,
            price: rawPrice > 0 ? rawPrice : 5.00,
            regularPrice: rawRegPrice && rawRegPrice > rawPrice ? rawRegPrice : undefined,
            priceMin: minAmount,
            description: main.description || main.short_description || '',
            shortDescription: isGroupFamily 
              ? `Familia de ${group.subProducts.length} modelos de ${familyName} listos para personalizar.`
              : (main.short_description || main.description || '').replace(/<[^>]+>/g, '').slice(0, 150),
            category: main.categories?.[0]?.name || 'Productos RufPixel',
            categorySlug: main.categories?.[0]?.slug || 'general',
            image: main.images?.[0]?.src || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
            gallery: main.images?.map((img: any) => img.src) || [],
            stock: main.is_in_stock ?? 100,
            type: isGroupFamily ? 'variable' : (main.type || 'simple'),
            attributes,
            childVariations,
            featured: main.is_featured || false,
          };
        });

        // Apply pagination (15 per page)
        const totalProducts = consolidatedProducts.length;
        const totalPages = Math.ceil(totalProducts / perPage) || 1;
        const startIndex = (page - 1) * perPage;
        const paginatedProducts = consolidatedProducts.slice(startIndex, startIndex + perPage);

        return { products: paginatedProducts, totalPages, totalProducts };
      }
    }
  } catch (err) {
    console.warn('Store API family consolidation fetch error', err);
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
  if (found) return found;

  // Fallback search by slug or ID
  const allProductsRes = await getProducts('todos', 1, 100);
  return allProductsRes.products.find(p => p.slug.includes(slug) || slug.includes(p.slug)) || null;
}
