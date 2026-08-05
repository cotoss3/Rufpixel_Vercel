'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '@/lib/types';
import { ProductCategory } from '@/lib/woocommerce';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, Grid, Filter, Check, Loader2 } from 'lucide-react';

interface ShopClientGridProps {
  initialProducts: Product[];
  categories: ProductCategory[];
  activeCategorySlug?: string;
}

export default function ShopClientGrid({
  initialProducts,
  categories,
  activeCategorySlug = 'todos',
}: ShopClientGridProps) {
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategorySlug);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(false);
  const perPage = 15;

  // Robust Client-Side Category Filtering
  const filteredProducts = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'todos') {
      return allProducts;
    }

    const cleanSlug = selectedCategory.toLowerCase().trim();

    return allProducts.filter((p) => {
      // 1. Check array of categories
      if (p.categories && p.categories.some((c) => c.slug.toLowerCase() === cleanSlug)) {
        return true;
      }

      // 2. Check main categorySlug
      if (p.categorySlug && p.categorySlug.toLowerCase() === cleanSlug) {
        return true;
      }

      // 3. Fallback name match
      const targetCat = categories.find((c) => c.slug === cleanSlug);
      if (targetCat) {
        const catNameLower = targetCat.name.toLowerCase();
        if (p.category && p.category.toLowerCase().includes(catNameLower)) {
          return true;
        }
      }

      return false;
    });
  }, [allProducts, selectedCategory, categories]);

  // Fetch products for category dynamically if not found in preloaded set
  useEffect(() => {
    if (selectedCategory !== 'todos' && filteredProducts.length === 0 && !isLoadingCategory) {
      const fetchCategoryProducts = async () => {
        setIsLoadingCategory(true);
        try {
          const res = await fetch(`https://rufpixel.com/wp-json/wc/store/v1/products?category=${selectedCategory}&per_page=100`, {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'RufPixel-Headless-Storefront/1.0',
            },
          });

          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              const allChildIds = new Set<number>();
              data.forEach((p: any) => {
                (p.grouped_products || []).forEach((id: number) => allChildIds.add(id));
              });

              const rootProducts = data.filter((p: any) => !allChildIds.has(p.id));

              const fetched: Product[] = rootProducts.map((prod: any) => {
                const minAmount = prod.prices?.price_range?.min_amount ? parseFloat(prod.prices.price_range.min_amount) / 100 : undefined;
                const rawPrice = minAmount ?? (prod.prices?.price ? parseFloat(prod.prices.price) / 100 : parseFloat(prod.price || '0'));
                const rawRegPrice = prod.prices?.regular_price ? parseFloat(prod.prices.regular_price) / 100 : undefined;

                const catList = prod.categories?.map((c: any) => ({
                  id: String(c.id),
                  name: c.name,
                  slug: c.slug,
                })) || [];

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
                  categories: catList,
                  image: prod.images?.[0]?.src || '',
                  gallery: prod.images?.map((img: any) => img.src) || [],
                  stock: prod.is_in_stock ?? 100,
                  attributes: prod.attributes?.map((attr: any) => ({
                    name: attr.name,
                    options: attr.options || attr.terms?.map((t: any) => t.name) || [],
                  })) || [],
                };
              });

              // Merge fetched products into state deduplicated
              setAllProducts((prev) => {
                const existingIds = new Set(prev.map((p) => p.id));
                const newItems = fetched.filter((p) => !existingIds.has(p.id));
                return [...prev, ...newItems];
              });
            }
          }
        } catch (e) {
          console.warn('Error fetching category products dynamically:', e);
        } finally {
          setIsLoadingCategory(false);
        }
      };

      fetchCategoryProducts();
    }
  }, [selectedCategory, filteredProducts.length, isLoadingCategory]);

  // Instant Client-Side Pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / perPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, currentPage, perPage]);

  // Category Switch Handler
  const handleCategorySelect = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory(slug);
    setCurrentPage(1);

    const targetUrl = slug === 'todos' ? '/tienda' : `/tienda/${slug}`;
    window.history.pushState({}, '', targetUrl);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Left Sidebar Categories Navigation */}
      <aside className="w-full lg:w-72 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6 shrink-0 sticky top-28">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
          <Filter className="w-5 h-5 text-[#FF5E14]" />
          <h2 className="font-extrabold text-gray-900 text-base font-outfit">
            Categorías de Productos
          </h2>
        </div>

        <nav className="space-y-1.5">
          <button
            onClick={(e) => handleCategorySelect('todos', e)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left ${
              selectedCategory === 'todos'
                ? 'bg-[#0D0D0D] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-[#FF5E14]'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Grid className="w-4 h-4 text-[#FF5E14]" />
              <span>Todos los Productos</span>
            </div>
            {selectedCategory === 'todos' && <Check className="w-4 h-4 text-[#FF5E14]" />}
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={(e) => handleCategorySelect(cat.slug, e)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left group ${
                  isSelected
                    ? 'bg-[#FF5E14] text-white shadow-md font-extrabold'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-[#FF5E14]'
                }`}
              >
                <span className="truncate pr-2">{cat.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500 group-hover:bg-[#FF5E14]/10 group-hover:text-[#FF5E14]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Right Area: Product Grid + Pagination */}
      <main className="flex-1 w-full space-y-8">
        <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-gray-200">
          <span className="text-xs font-bold text-gray-600">
            Mostrando <strong>{paginatedProducts.length}</strong> de <strong>{totalProducts}</strong> productos
            {selectedCategory !== 'todos' && (
              <span className="text-[#FF5E14] font-extrabold ml-1">
                en {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
              </span>
            )}
          </span>
          {selectedCategory !== 'todos' && (
            <button
              onClick={(e) => handleCategorySelect('todos', e)}
              className="text-[11px] font-extrabold text-[#FF5E14] hover:underline"
            >
              Limpiar filtro
            </button>
          )}
        </div>

        {isLoadingCategory ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-200 space-y-3 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#FF5E14] animate-spin" />
            <h3 className="text-base font-bold text-gray-900">Cargando productos de la categoría...</h3>
            <p className="text-xs text-gray-500">Obteniendo catálogo completo desde WordPress...</p>
          </div>
        ) : paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
            <h3 className="text-lg font-bold text-gray-900">No hay productos en esta categoría</h3>
            <p className="text-xs text-gray-500">Prueba seleccionando otra categoría o limpiando los filtros.</p>
            <button
              onClick={(e) => handleCategorySelect('todos', e)}
              className="px-4 py-2 bg-[#FF5E14] text-white rounded-xl font-bold text-xs"
            >
              Ver todos los productos
            </button>
          </div>
        )}

        {/* Instant Pagination Controls */}
        {totalPages > 1 && !isLoadingCategory && (
          <div className="flex items-center justify-center space-x-2 pt-6 border-t border-gray-200">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 font-bold text-xs flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
            )}

            {[...Array(totalPages)].map((_, i) => {
              const pNum = i + 1;
              const isCurrent = pNum === currentPage;
              return (
                <button
                  key={pNum}
                  onClick={() => setCurrentPage(pNum)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all ${
                    isCurrent
                      ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30 scale-105'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pNum}
                </button>
              );
            })}

            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 font-bold text-xs flex items-center space-x-1"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
