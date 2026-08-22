'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product } from '@/lib/types';
import { ProductCategory } from '@/lib/woocommerce';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import { ChevronLeft, ChevronRight, Grid, Filter, Check, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const pageParam = searchParams ? searchParams.get('page') : null;
  const searchQueryParam = searchParams ? searchParams.get('search') : null;

  const initialPageFromUrl = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;

  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategorySlug);
  const [currentPage, setCurrentPage] = useState<number>(initialPageFromUrl);
  const [searchTerm, setSearchTerm] = useState<string>(searchQueryParam || '');
  
  // Category Collapsible Drawer State: Closed by default on start as requested
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  const perPage = 32;
  const mainGridRef = useRef<HTMLDivElement>(null);

  // Sync state if URL query params change
  useEffect(() => {
    if (pageParam) {
      const p = Math.max(1, parseInt(pageParam, 10) || 1);
      setCurrentPage(p);
    }
    if (searchQueryParam !== null) {
      setSearchTerm(searchQueryParam);
    }
  }, [pageParam, searchQueryParam]);

  // 100% Synchronous Instant Client-Side Category & Search Filtering
  const filteredProducts = useMemo(() => {
    let result = initialProducts;

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'todos') {
      const cleanSlug = selectedCategory.toLowerCase().trim();
      result = result.filter((p) => {
        if (p.categories && p.categories.some((c) => c.slug.toLowerCase() === cleanSlug)) return true;
        if (p.categorySlug && p.categorySlug.toLowerCase() === cleanSlug) return true;
        const targetCat = categories.find((c) => c.slug === cleanSlug);
        if (targetCat && p.category && p.category.toLowerCase().includes(targetCat.name.toLowerCase())) return true;
        return false;
      });
    }

    // 2. Search Term Filter
    if (searchTerm.trim()) {
      const cleanTerm = searchTerm.toLowerCase().trim();
      const normTerm = cleanTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const tokens = normTerm.split(/\s+/).filter(Boolean);

      if (tokens.length > 0) {
        result = result.filter((p) => {
          const nameNorm = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const descNorm = (p.shortDescription || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const catNorm = (p.category || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const slugNorm = (p.slug || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

          return tokens.every((tok) => {
            const baseTok = tok.length > 3 && tok.endsWith('s') ? tok.slice(0, -1) : tok;
            return (
              nameNorm.includes(tok) || nameNorm.includes(baseTok) ||
              descNorm.includes(tok) || descNorm.includes(baseTok) ||
              catNorm.includes(tok) || catNorm.includes(baseTok) ||
              slugNorm.includes(tok) || slugNorm.includes(baseTok)
            );
          });
        });
      }
    }

    return result;
  }, [initialProducts, selectedCategory, categories, searchTerm]);

  // Instant Client-Side Pagination (32 products per page)
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / perPage) || 1;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, currentPage, perPage]);

  // Update Page Number & Sync URL (`?page=X`)
  const goToPage = (pageNumber: number) => {
    const validPage = Math.max(1, Math.min(totalPages, pageNumber));
    setCurrentPage(validPage);

    const baseUrl = selectedCategory === 'todos' ? '/tienda' : `/tienda/${selectedCategory}`;
    const queryParts: string[] = [];
    if (validPage > 1) queryParts.push(`page=${validPage}`);
    if (searchTerm) queryParts.push(`search=${encodeURIComponent(searchTerm)}`);

    const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    window.history.pushState({}, '', `${baseUrl}${queryString}`);

    if (mainGridRef.current) {
      mainGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Search Submit Handler
  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);

    const baseUrl = selectedCategory === 'todos' ? '/tienda' : `/tienda/${selectedCategory}`;
    const queryString = term ? `?search=${encodeURIComponent(term)}` : '';
    window.history.pushState({}, '', `${baseUrl}${queryString}`);
  };

  // Category Switch Handler
  const handleCategorySelect = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory(slug);
    setCurrentPage(1);
    setIsCategoryOpen(false); // Close category accordion after selecting

    const baseUrl = slug === 'todos' ? '/tienda' : `/tienda/${slug}`;
    const queryString = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
    window.history.pushState({}, '', `${baseUrl}${queryString}`);
  };

  // Dynamic Sliding / Centering Pagination Window Generator
  const paginationItems = useMemo(() => {
    if (totalPages <= 1) return [];

    const delta = 1;
    const items: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        items.push(i);
      } else if (
        (i === currentPage - delta - 1 && i > 1) ||
        (i === currentPage + delta + 1 && i < totalPages)
      ) {
        items.push('...');
      }
    }

    return items.filter((item, index, arr) => item !== '...' || arr[index - 1] !== '...');
  }, [totalPages, currentPage]);

  const activeCategoryObj = categories.find((c) => c.slug === selectedCategory);

  return (
    <div ref={mainGridRef} className="flex flex-col lg:flex-row gap-8 items-start scroll-mt-28">
      {/* Collapsible Left Sidebar Categories Navigation (Closed by Default) */}
      <aside className="w-full lg:w-72 bg-white rounded-3xl border border-gray-200 shadow-sm shrink-0 sticky top-28 overflow-hidden transition-all">
        {/* Accordion Toggle Header */}
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 text-left"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#0D0D0D] text-[#FF5E14] rounded-xl">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-sm font-outfit">
                Categorías de Productos
              </h2>
              <span className="text-[11px] text-gray-500 font-medium">
                {selectedCategory === 'todos' ? 'Todas las categorías' : activeCategoryObj?.name || selectedCategory}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
              {isCategoryOpen ? 'Ocultar' : 'Ver Categorías'}
            </span>
            {isCategoryOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </button>

        {/* Collapsible Category List (Closed by Default) */}
        {isCategoryOpen && (
          <div className="p-5 space-y-1.5 bg-gray-50/50 max-h-96 overflow-y-auto animate-fade-in border-t border-gray-100">
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
          </div>
        )}
      </aside>

      {/* Right Area: Intelligent Search Bar + Product Grid (3 Columns) + Dynamic URL Pagination */}
      <main className="flex-1 w-full space-y-6">
        {/* Intelligent Live Search Bar */}
        <ProductSearch
          products={initialProducts}
          categories={categories}
          onSearchSubmit={handleSearchSubmit}
        />

        <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-gray-200">
          <span className="text-xs font-bold text-gray-600">
            Mostrando <strong>{paginatedProducts.length}</strong> de <strong>{totalProducts}</strong> productos (Página {currentPage} de {totalPages})
            {selectedCategory !== 'todos' && (
              <span className="text-[#FF5E14] font-extrabold ml-1">
                en {activeCategoryObj?.name || selectedCategory}
              </span>
            )}
            {searchTerm && (
              <span className="text-[#FF5E14] font-bold ml-1">
                coincidentes con "{searchTerm}"
              </span>
            )}
          </span>
          {(selectedCategory !== 'todos' || searchTerm) && (
            <button
              onClick={(e) => {
                handleCategorySelect('todos', e);
                setSearchTerm('');
              }}
              className="text-[11px] font-extrabold text-[#FF5E14] hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
            <h3 className="text-lg font-bold text-gray-900">No hay productos disponibles</h3>
            <p className="text-xs text-gray-500">Prueba buscando por otro término o limpiando los filtros.</p>
            <button
              onClick={(e) => {
                handleCategorySelect('todos', e);
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-[#FF5E14] text-white rounded-xl font-bold text-xs"
            >
              Ver todos los productos
            </button>
          </div>
        )}

        {/* Dynamic Centered URL Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 pt-8 border-t border-gray-200">
            {/* Previous Button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-xl font-bold text-xs flex items-center space-x-1 border transition-all ${
                currentPage === 1
                  ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            {/* Dynamic Centered Sliding Window Pages */}
            <div className="flex items-center space-x-1.5">
              {paginationItems.map((item, idx) => {
                if (item === '...') {
                  return (
                    <span key={`dots-${idx}`} className="w-9 text-center text-gray-400 font-bold text-xs select-none">
                      ...
                    </span>
                  );
                }

                const pageNum = Number(item);
                const isCurrent = pageNum === currentPage;

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all ${
                      isCurrent
                        ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/30 scale-105 ring-2 ring-[#FF5E14]/20'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-xl font-bold text-xs flex items-center space-x-1 border transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
