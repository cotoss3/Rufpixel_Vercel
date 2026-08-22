'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Layers, ChevronRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ProductCategory } from '@/lib/woocommerce';
import { getCachedProduct, setCachedProduct } from '@/lib/productCache';
import { MOCK_PRODUCTS } from '@/lib/mockData';

const DEFAULT_CATEGORIES: ProductCategory[] = [
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

interface ProductSearchProps {
  products?: Product[];
  categories?: ProductCategory[];
  placeholder?: string;
  className?: string;
  onSearchSubmit?: (term: string) => void;
}

export default function ProductSearch({
  products = [],
  categories = [],
  placeholder = 'Buscar productos o categorías (ej. tazas, bolsas, bolígrafos)...',
  className = '',
  onSearchSubmit,
}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-fetch products if parent hasn't passed them yet
  useEffect(() => {
    if ((!products || products.length === 0) && fetchedProducts.length === 0) {
      fetch('/api/products')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.products && Array.isArray(data.products) && data.products.length > 0) {
            setFetchedProducts(data.products);
          }
        })
        .catch(() => {});
    }
  }, [products, fetchedProducts]);

  const activeProducts = useMemo(() => {
    if (products && products.length > 0) return products;
    if (fetchedProducts && fetchedProducts.length > 0) return fetchedProducts;
    return MOCK_PRODUCTS;
  }, [products, fetchedProducts]);

  const activeCategories = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    return DEFAULT_CATEGORIES;
  }, [categories]);

  // Close preview dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close preview on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cleanTerm = searchTerm.toLowerCase().trim();
  const normalizedTerm = useMemo(() => {
    return cleanTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }, [cleanTerm]);

  const tokens = useMemo(() => {
    if (!normalizedTerm) return [];
    return normalizedTerm.split(/\s+/).filter(Boolean);
  }, [normalizedTerm]);

  // Smart Matching Categories (Accent insensitive + partial match)
  const matchedCategories = useMemo(() => {
    if (!normalizedTerm) return [];
    return activeCategories
      .filter((c) => {
        const catNorm = c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const slugNorm = c.slug.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return tokens.every((tok) => {
          const baseTok = tok.length > 3 && tok.endsWith('s') ? tok.slice(0, -1) : tok;
          return catNorm.includes(tok) || catNorm.includes(baseTok) || slugNorm.includes(tok) || slugNorm.includes(baseTok);
        });
      })
      .slice(0, 4);
  }, [activeCategories, normalizedTerm, tokens]);

  // Smart Matching Products (Accent-free, plural-free, multi-token matching)
  const allMatchedProducts = useMemo(() => {
    if (!tokens.length) return [];
    return activeProducts.filter((p) => {
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
  }, [activeProducts, tokens]);

  const matchedProducts = useMemo(() => {
    return allMatchedProducts.slice(0, 6);
  }, [allMatchedProducts]);

  const totalMatches = allMatchedProducts.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cleanTerm) return;
    setIsOpen(false);

    if (onSearchSubmit) {
      onSearchSubmit(cleanTerm);
    } else {
      window.location.href = `/tienda?search=${encodeURIComponent(cleanTerm)}`;
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-white text-gray-900 placeholder-gray-400 pl-11 pr-10 py-3 rounded-2xl border border-gray-300 focus:border-[#FF5E14] focus:ring-2 focus:ring-[#FF5E14]/20 outline-none text-xs sm:text-sm font-medium transition-all shadow-sm"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Floating Instant Live Preview Dropdown */}
      {isOpen && cleanTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden max-h-[80vh] overflow-y-auto divide-y divide-gray-100 animate-fade-in">
          {/* Category Matches */}
          {matchedCategories.length > 0 && (
            <div className="p-3 bg-gray-50/80 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block px-2">
                Categorías coincidentes
              </span>
              <div className="flex flex-wrap gap-2">
                {matchedCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/tienda/${cat.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center space-x-1.5 bg-white border border-gray-200 hover:border-[#FF5E14] px-3 py-1.5 rounded-xl text-xs font-bold text-gray-800 hover:text-[#FF5E14] shadow-sm transition-all"
                  >
                    <Tag className="w-3 h-3 text-[#FF5E14]" />
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-gray-400">({cat.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Product Matches */}
          {matchedProducts.length > 0 ? (
            <div className="p-2 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block px-3 py-1">
                Productos coincidentes ({totalMatches})
              </span>
              {matchedProducts.map((prod) => {
                const qtyAttr = prod.attributes.find((a) => a.name.toLowerCase() === 'cantidad');
                const baseQty = parseInt(qtyAttr?.options?.[0] || '50', 10) || 50;
                const unitPrice = prod.price / baseQty;

                return (
                  <Link
                    key={prod.id}
                    href={`/producto/${prod.slug}`}
                    onClick={() => {
                      setCachedProduct(prod);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setCachedProduct(prod)}
                    className="flex items-center space-x-3 p-2.5 hover:bg-gray-50 rounded-xl transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 p-1 shrink-0 flex items-center justify-center">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-extrabold uppercase text-[#FF5E14] bg-[#FF5E14]/10 px-1.5 py-0.5 rounded">
                        {prod.category}
                      </span>
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate group-hover:text-[#FF5E14] transition-colors font-outfit mt-0.5">
                        {prod.name}
                      </h4>
                      <div className="flex items-baseline space-x-1 mt-0.5">
                        <span className="text-xs font-extrabold text-gray-900 font-outfit">
                          ${unitPrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-bold text-gray-500">/ ud</span>
                        {baseQty > 1 && (
                          <span className="text-[10px] text-gray-400 ml-1">
                            (Pack x {baseQty})
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF5E14] transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center space-y-2">
              <p className="text-xs font-bold text-gray-600">No se encontraron productos para "{searchTerm}"</p>
              <p className="text-[11px] text-gray-400">Prueba buscando por categoría como bolígrafos, tazas o bolsas.</p>
            </div>
          )}

          {/* View All Search Results Footer CTA */}
          {totalMatches > 0 && (
            <div className="p-3 bg-gray-50 text-center">
              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-[#FF5E14] hover:bg-[#E04700] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1"
              >
                <span>Ver todos los {totalMatches} productos para "{searchTerm}"</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
