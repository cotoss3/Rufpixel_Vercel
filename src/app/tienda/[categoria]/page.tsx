import React, { Suspense } from 'react';
import { getProducts, getCategories, resolveCategory, isProductInCategory } from '@/lib/woocommerce';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import ShopClientGrid from '@/components/shop/ShopClientGrid';
import { BreadcrumbListSchema } from '@/components/seo/SchemaOrg';

function buildCategoryTitle(catName: string): string {
  const clean = catName.trim();
  const candidate = `${clean} en Panamá al por Mayor | RufPixel`;
  if (candidate.length >= 50 && candidate.length <= 60) return candidate;
  if (candidate.length < 50) {
    const padded = `${clean} Personalizados en Panamá | RufPixel`;
    if (padded.length >= 50 && padded.length <= 60) return padded;
    return `${clean} al por Mayor en Panamá — RufPixel`.slice(0, 59);
  }
  return candidate.slice(0, 48) + ' | RufPixel';
}

function buildCategoryDescription(catName: string): string {
  const clean = catName.trim();
  const desc = `Compra ${clean.toLowerCase()} al por mayor en Panamá desde 50 unidades. Personalización con logo, entrega en 24-48h y pagos por Yappy y ACH. ¡Cotiza por WhatsApp!`;
  if (desc.length >= 120 && desc.length <= 155) return desc;
  if (desc.length > 155) return desc.slice(0, 151) + '...';
  return (desc + ' Envíos a todo el país.').slice(0, 155);
}

export async function generateMetadata({ params }: { params: { categoria: string } }) {
  const categories = await getCategories();
  const def = resolveCategory(params.categoria);
  const activeCat = def
    ? categories.find((c) => c.slug === def.canonicalSlug || c.id === def.id)
    : categories.find((c) => c.slug === params.categoria);
  const catName = def ? def.name : (activeCat ? activeCat.name : params.categoria.replace(/-/g, ' '));

  return {
    title: buildCategoryTitle(catName),
    description: buildCategoryDescription(catName),
    alternates: {
      canonical: `https://rufpixel.com/tienda/${params.categoria}`,
    },
  };
}

export default async function CategoriaTiendaPage({ params }: { params: { categoria: string } }) {
  const def = resolveCategory(params.categoria);
  const canonicalSlug = def ? def.canonicalSlug : params.categoria;

  const [{ products }, categories] = await Promise.all([
    getProducts('todos', 1, 100),
    getCategories(),
  ]);

  let catalogProducts = products && products.length > 0 ? products : MOCK_PRODUCTS;
  // If the category is not yet in the general catalog, fetch it directly and merge
  if (def && !catalogProducts.some((p) => isProductInCategory(p, canonicalSlug))) {
    const { products: catProducts } = await getProducts(canonicalSlug);
    if (catProducts && catProducts.length > 0) {
      catalogProducts = [...catProducts, ...catalogProducts];
    }
  }

  const activeCat = def
    ? categories.find((c) => c.slug === def.canonicalSlug || c.id === def.id)
    : categories.find((c) => c.slug === params.categoria);
  const catName = def ? def.name : (activeCat ? activeCat.name : params.categoria.replace(/-/g, ' '));

  const breadcrumbs = [
    { name: 'Inicio', url: 'https://rufpixel.com' },
    { name: 'Tienda', url: 'https://rufpixel.com/tienda' },
    { name: catName, url: `https://rufpixel.com/tienda/${params.categoria}` },
  ];

  return (
    <div className="py-10 space-y-8">
      <BreadcrumbListSchema items={breadcrumbs} />

      {/* Category Header */}
      <section className="bg-[#0D0D0D] text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
            Categoría Especializada
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold capitalize font-outfit">
            {catName}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm">
            Catálogo mayorista con personalización de alta resolución en Panamá.
          </p>
        </div>
      </section>

      {/* Main Container with Instant Shop Client Grid Wrapped in Suspense */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="py-24 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-[#FF5E14] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-gray-500 font-outfit">Cargando productos de {catName}...</p>
          </div>
        }>
          <ShopClientGrid initialProducts={catalogProducts} categories={categories} activeCategorySlug={canonicalSlug} />
        </Suspense>
      </div>
    </div>
  );
}
