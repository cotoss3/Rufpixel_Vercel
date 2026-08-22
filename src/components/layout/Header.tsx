'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Phone, Mail, Clock, Calculator, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import ProductSearch from '../shop/ProductSearch';
import { Product } from '@/lib/types';
import { ProductCategory } from '@/lib/woocommerce';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Pre-fetch lightweight catalog for global Header Search bar
  useEffect(() => {
    async function loadSearchData() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.products) setProducts(data.products);
          if (data.categories) setCategories(data.categories);
        }
      } catch (e) {}
    }
    loadSearchData();
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/tienda', label: 'Tienda' },
    { href: '/cotizador', label: 'Cotizador (Pre-Orden)' },
    { href: '/blog', label: 'Blog' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 shadow-2xl">
      {/* Top Bar - Black with White text and Orange accents */}
      <div className="bg-[#070707] text-xs text-gray-300 border-b border-gray-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#FF5E14]" />
              <span>+507 6525-6015 / 6445-4084</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#FF5E14]" />
              <span>ventas@rufpixel.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-[#FF5E14]" />
              <span>Lun - Vie: 8:00 AM - 6:00 PM | Sáb: 9:00 AM - 2:00 PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF5E14] mr-1" />
              Pagos seguros vía <strong className="text-white ml-1">Yappy Panamá</strong>
            </span>
            <Link href="/mi-cuenta" className="hover:text-[#FF5E14] transition-colors text-white font-medium">
              Consultar Pedido
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header - Jet Black Header */}
      <div className="bg-[#0D0D0D] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex justify-between items-center gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group h-full py-0 my-0 -ml-1 shrink-0">
            <img
              src="/images/logo-blanco.png"
              alt="RufPixel Impresión & Diseño"
              className="h-full max-h-28 w-auto object-contain py-0 my-0 p-0 m-0 group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Intelligent Live Product Search Bar in Navbar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <ProductSearch
              products={products}
              categories={categories}
              placeholder="Buscar tazas, gorras, bolsas, bolígrafos..."
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 shrink-0">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'text-[#FF5E14] bg-white/5 font-extrabold'
                      : 'text-white hover:text-[#FF5E14] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Quick Pre-order CTA */}
            <Link
              href="/cotizador"
              className="flex items-center space-x-1.5 bg-[#FF5E14] hover:bg-[#E04700] text-white px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-extrabold shadow-md shadow-[#FF5E14]/25 transition-all"
            >
              <Calculator className="w-4 h-4 shrink-0" />
              <span className="hidden xs:inline sm:inline">Pre-orden</span>
            </Link>

            {/* Cart Icon */}
            <Link
              href="/carrito"
              className="relative p-2.5 text-white hover:text-[#FF5E14] bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF5E14] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0D0D0D] animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#FF5E14] focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0D] border-b border-gray-800 px-4 pt-4 pb-6 space-y-4">
          <ProductSearch
            products={products}
            categories={categories}
            placeholder="Buscar productos..."
          />

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#FF5E14] text-white font-bold'
                    : 'text-white hover:bg-gray-900 hover:text-[#FF5E14]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
            <Link
              href="/cotizador"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-[#FF5E14] text-white py-3 rounded-lg font-bold text-xs"
            >
              <Calculator className="w-4 h-4" />
              <span>Cotizar Arte / Pre-orden</span>
            </Link>
            <div className="text-xs text-gray-400 text-center space-y-1">
              <p>📞 WhatsApp: +507 6525-6015 / 6445-4084</p>
              <p>💳 Pago Yappy con validación humana</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
