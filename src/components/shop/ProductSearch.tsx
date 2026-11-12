'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronRight, Tag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ProductCategory, FALLBACK_CATEGORIES, resolveCategory } from '@/lib/woocommerce';
import { setCachedProduct } from '@/lib/productCache';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { trackEvent } from '@/lib/analytics';

export interface SearchableServiceItem {
  id: string;
  name: string;
  category: string;
  priceLabel: string;
  subLabel: string;
  href: string;
  image: string;
  keywords: string;
}

export const SEARCHABLE_SERVICES_AND_BANNERS: SearchableServiceItem[] = [
  {
    id: 'srv-gran-formato-main',
    name: 'Impresión de Banners, Roll-Up, Banderolas y Gran Formato',
    category: 'Gran Formato & Banners',
    priceLabel: 'Desde $9.63',
    subLabel: 'Catálogo de medidas y estructuras',
    href: '/servicios/impresion-gran-formato',
    image: '/images/banners/banner-gran-formato.webp',
    keywords: 'impresion de banners banner baner lonas 13oz gran formato roll up rollup arana aranita x-banner banderolas feather flag vinil adhesivo microperforado esmerilado letreros pendones backing',
  },
  {
    id: 'srv-banner-rollup',
    name: 'Banner Roll-Up Standard Retráctil Aluminio (33" × 79" / 85×200 cm)',
    category: 'Banners & Estructuras',
    priceLabel: '$69.55',
    subLabel: 'Estructura + Impresión + Maletín',
    href: '/servicios/impresion-gran-formato',
    image: '/images/banners/banner-gran-formato.webp',
    keywords: 'banner roll up rollup retractil aluminio pendon enrollable 85x200 33x79 impresion de banners',
  },
  {
    id: 'srv-banner-arana',
    name: 'Banner Araña / X-Banner (24" × 36" / 60×160 cm) + Impresión',
    category: 'Banners & Estructuras',
    priceLabel: '$37.45',
    subLabel: 'Estructura + Lona tensada con ojales',
    href: '/servicios/impresion-gran-formato',
    image: '/images/banners/banner-gran-formato.webp',
    keywords: 'banner arana aranita x-banner porta banner estructura impresion de banners',
  },
  {
    id: 'srv-lona-8x4',
    name: 'Banner Lona 13oz con Ojales (3×2 ft, 4×4 ft, 6×4 ft y 8×4 ft)',
    category: 'Banners en Lona',
    priceLabel: '$9.63 – $44.94',
    subLabel: 'Lona 13oz resistente a sol y lluvia',
    href: '/cotizador',
    image: '/images/banners/banner-gran-formato.webp',
    keywords: 'banner lona 13oz ojales pasacalles fachada exterior 3x2 4x4 6x4 8x4 impresion de banners',
  },
  {
    id: 'srv-banderolas',
    name: 'Banderolas Publicitarias (Tipo Vela, Gota y Rectangulares)',
    category: 'Gran Formato Exterior',
    priceLabel: 'Desde 1 ud',
    subLabel: 'Tela sublimada + asta + base',
    href: '/servicios/impresion-gran-formato',
    image: '/images/banners/banner-gran-formato.webp',
    keywords: 'banderolas publicitarias tipo vela gota feather flag playas eventos exteriores banners',
  },
  {
    id: 'srv-vinil-vidrieras',
    name: 'Vinil Adhesivo, Microperforado y Papel Esmerilado (Frosted)',
    category: 'Viniles & Vidrieras',
    priceLabel: 'Desde $18.00/m²',
    subLabel: 'Para vidrios, fachadas y oficinas',
    href: '/servicios/impresion-gran-formato',
    image: '/images/banners/banner-gran-formato.webp',
    keywords: 'vinil adhesivo microperforado esmerilado frosted sandblasting vidrieras ventanas paredes gran formato',
  },
  {
    id: 'srv-dtf-textil',
    name: 'Impresión DTF Textil Directo (Formato A4 y Yarda Lineal)',
    category: 'Estampado Textil',
    priceLabel: '$2.94 – $6.42',
    subLabel: 'Sin mínimos desde 1 pliego',
    href: '/servicios/dtf-textil',
    image: '/images/banners/banner-dtf.webp',
    keywords: 'dtf textil impresion por metro yarda lineal pliego a4 transfer estampado sueteres camisetas',
  },
  {
    id: 'srv-uv-dtf',
    name: 'Impresión UV DTF Relieve 3D para Rígidos y Termos',
    category: 'Stickers 3D en Frío',
    priceLabel: '$5.32 – $10.70',
    subLabel: 'Pega en frío sin plancha térmica',
    href: '/servicios/uv-dtf',
    image: '/images/banners/banner-uvdtf.webp',
    keywords: 'uv dtf uvdtf stickers 3d relieve barniz termos rigidos vidrio acrilico metal',
  },
  {
    id: 'srv-stickers',
    name: 'Stickers Personalizados Troquelados en Vinil (2×2", 3×3", 4×4")',
    category: 'Zona Pixel · Stickers',
    priceLabel: 'Desde $8.56',
    subLabel: 'Paquetes de 100, 500 y 1,000 uds',
    href: '/cotizador',
    image: '/images/banners/banner-stickers.webp',
    keywords: 'stickers personalizados etiquetas calcomanias vinil troquelados 2x2 3x3 4x4',
  },
  {
    id: 'srv-bordados',
    name: 'Bordados Computarizados en Gorras, Polos y Camisas',
    category: 'Taller de Bordado',
    priceLabel: 'Al Mayor y Detal',
    subLabel: 'Desde 1 pieza hasta grandes lotes',
    href: '/servicios/bordados-computarizados',
    image: '/images/services/bordados-computarizados-polo-panama.webp',
    keywords: 'bordados computarizados gorras polos camisas columbia oxford uniformes ponchado',
  },
  {
    id: 'srv-grabado-laser',
    name: 'Grabado Láser de Precisión en Metal, Acero, Bambú y Cuero',
    category: 'Taller Láser',
    priceLabel: 'Al Mayor y Detal',
    subLabel: 'Termos, bolígrafos, placas y madera',
    href: '/servicios/grabados-laser',
    image: '/images/hero-home.jpg',
    keywords: 'grabado laser grabados termos acero metal madera bambu cuero placas',
  },
  {
    id: 'srv-flyers-papeleria',
    name: 'Volantes, Flyers, Tarjetas de Presentación y Libretas de Factura',
    category: 'Papelería Comercial',
    priceLabel: 'Desde $9.95',
    subLabel: 'Paquetes desde 100 uds',
    href: '/servicios/flyers-y-folletos',
    image: '/images/banners/banner-papeleria.webp',
    keywords: 'volantes flyers folletos tarjetas de presentacion libretas de factura recibos talonarios papeleria',
  },
  {
    id: 'srv-tomas-aereas',
    name: 'Fotografía y Tomas Aéreas con Drones en Panamá (Video 4K y 360°)',
    category: 'Producción Audiovisual',
    priceLabel: 'Cotizar Proyecto',
    subLabel: 'Inmobiliaria, terrenos, obras y eventos',
    href: '/tomas-aereas-panama',
    image: '/images/services/tomas-aereas-drone-panama.webp',
    keywords: 'fotografia aerea tomas aereas drones panama video 4k 360 terrenos obras inspeccion',
  },
];

const STOP_WORDS = new Set([
  'de', 'del', 'la', 'las', 'el', 'los', 'en', 'con', 'para', 'por', 'un', 'una', 'unos', 'unas', 'al', 'y', 'o', 'e', 'panama',
]);

const GENERIC_MODIFIERS = new Set([
  'impresion', 'impresiones', 'personalizado', 'personalizados', 'personalizada', 'personalizadas', 'servicio', 'servicios', 'comprar', 'cotizar', 'precio', 'precios', 'logo',
]);

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
  placeholder = 'Buscar banners, roll-up, termos, gorras, bolsas, bolígrafos...',
  className = '',
  onSearchSubmit,
}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

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
    return FALLBACK_CATEGORIES;
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    const raw = normalizedTerm.split(/\s+/).filter((t) => t && !STOP_WORDS.has(t));
    if (raw.length === 0) return [];
    const withoutGeneric = raw.filter((t) => !GENERIC_MODIFIERS.has(t));
    return withoutGeneric.length > 0 ? withoutGeneric : raw;
  }, [normalizedTerm]);

  // Match Services, Banners & Zona Pixel items
  const matchedServices = useMemo(() => {
    if (!tokens.length) return [];
    return SEARCHABLE_SERVICES_AND_BANNERS.filter((srv) => {
      const haystack = `${srv.name} ${srv.category} ${srv.keywords}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return tokens.every((tok) => {
        const baseTok = tok.length > 3 && tok.endsWith('s') ? tok.slice(0, -1) : tok;
        return haystack.includes(tok) || haystack.includes(baseTok);
      });
    }).slice(0, 5);
  }, [tokens]);

  // Smart Matching Categories
  const matchedCategories = useMemo(() => {
    if (!tokens.length) return [];
    return activeCategories
      .filter((c) => {
        const catNorm = c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const slugNorm = c.slug.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const def = resolveCategory(c.slug) || resolveCategory(String(c.id));
        const aliases = def ? def.aliases : [];

        return tokens.every((tok) => {
          const baseTok = tok.length > 3 && tok.endsWith('s') ? tok.slice(0, -1) : tok;
          const matchAlias = aliases.some((a) => a.includes(tok) || a.includes(baseTok));
          return (
            matchAlias ||
            catNorm.includes(tok) ||
            catNorm.includes(baseTok) ||
            slugNorm.includes(tok) ||
            slugNorm.includes(baseTok)
          );
        });
      })
      .slice(0, 4);
  }, [activeCategories, tokens]);

  // Smart Matching Products
  const allMatchedProducts = useMemo(() => {
    if (!tokens.length) return [];
    return activeProducts.filter((p) => {
      const nameNorm = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const descNorm = (p.shortDescription || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const catNorm = (p.category || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const slugNorm = (p.slug || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      return tokens.every((tok) => {
        const baseTok = tok.length > 3 && tok.endsWith('s') ? tok.slice(0, -1) : tok;

        const matchAlias = p.categories?.some((c) => {
          const def = resolveCategory(c.slug) || resolveCategory(String(c.id));
          return def && def.aliases.some((a) => a.includes(tok) || a.includes(baseTok));
        });

        return (
          matchAlias ||
          nameNorm.includes(tok) ||
          nameNorm.includes(baseTok) ||
          descNorm.includes(tok) ||
          descNorm.includes(baseTok) ||
          catNorm.includes(tok) ||
          catNorm.includes(baseTok) ||
          slugNorm.includes(tok) ||
          slugNorm.includes(baseTok)
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

    trackEvent('search', {
      search_term: cleanTerm,
      results_count: totalMatches + matchedServices.length,
    });

    // If user searched specifically for a service/banner and there are no product matches, navigate straight to the service page
    if (matchedServices.length > 0 && totalMatches === 0) {
      window.location.href = matchedServices[0].href;
      return;
    }

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
          {/* Services, Banners & Gran Formato Matches */}
          {matchedServices.length > 0 && (
            <div className="p-2.5 bg-orange-50/40 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF5E14] flex items-center space-x-1 px-2.5 py-1">
                <Sparkles className="w-3 h-3" />
                <span>Banners, Gran Formato e Impresión Digital ({matchedServices.length})</span>
              </span>
              {matchedServices.map((srv) => (
                <Link
                  key={srv.id}
                  href={srv.href}
                  onClick={() => {
                    trackEvent('select_content', {
                      content_type: 'search_service_result',
                      item_id: srv.id,
                      search_term: cleanTerm,
                    });
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 p-2.5 bg-white hover:bg-orange-50/60 border border-gray-200/80 hover:border-[#FF5E14] rounded-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-900 border border-gray-200 shrink-0 flex items-center justify-center">
                    <img src={srv.image} alt={srv.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-extrabold uppercase text-white bg-[#0D0D0D] px-1.5 py-0.5 rounded">
                      {srv.category}
                    </span>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate group-hover:text-[#FF5E14] transition-colors font-outfit mt-0.5">
                      {srv.name}
                    </h4>
                    <div className="flex items-baseline space-x-1.5 mt-0.5">
                      <span className="text-xs font-extrabold text-[#FF5E14] font-outfit">
                        {srv.priceLabel}
                      </span>
                      <span className="text-[10px] text-gray-500 truncate">· {srv.subLabel}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF5E14] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          )}

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
                Artículos Promocionales coincidentes ({totalMatches})
              </span>
              {matchedProducts.map((prod) => {
                const qtyAttr = prod.attributes.find((a) => a.name.toLowerCase() === 'cantidad');
                const baseQty = parseInt(qtyAttr?.options?.[0] || '50', 10) || 50;
                const unitPrice = prod.pricePacks?.pack50?.unit || prod.price / baseQty;

                return (
                  <Link
                    key={prod.id}
                    href={`/productos/${prod.slug}`}
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
                          <span className="text-[10px] text-gray-400 ml-1">(Pack x {baseQty})</span>
                        )}
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF5E14] transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          ) : matchedServices.length === 0 ? (
            <div className="p-6 text-center space-y-2">
              <p className="text-xs font-bold text-gray-600">
                No se encontraron resultados para "{searchTerm}"
              </p>
              <p className="text-[11px] text-gray-400">
                Prueba buscando banners, roll-up, termos, agendas, bolígrafos, gorras o bolsas.
              </p>
            </div>
          ) : null}

          {/* View All Search Results Footer CTA */}
          {totalMatches > 0 && (
            <div className="p-3 bg-gray-50 text-center">
              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-[#FF5E14] hover:bg-[#E04700] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1"
              >
                <span>
                  Ver todos los {totalMatches} productos para "{searchTerm}"
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
