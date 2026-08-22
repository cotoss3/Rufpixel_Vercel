import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Send, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070707] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/images/logo-blanco.png"
                alt="RufPixel Impresión & Diseño"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Soluciones profesionales de impresión digital, gran formato y diseño gráfico en Panamá. Calidad superior en cada pixel e impreso corporativo.
            </p>
            
            {/* Yappy Notice Pill */}
            <div className="inline-flex items-center space-x-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
              <span>Aceptamos <strong className="text-white">Yappy & Transferencia ACH</strong> con validación humana instantánea</span>
            </div>
          </div>

          {/* Col 2: Servicios Principales */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-[#FF5E14] pb-1 inline-block">
              Servicios
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/servicios/tarjetas-de-presentacion" className="hover:text-[#FF5E14] transition-colors flex items-center">
                  <span>Tarjetas de Presentación</span>
                </Link>
              </li>
              <li>
                <Link href="/servicios/impresion-gran-formato" className="hover:text-[#FF5E14] transition-colors flex items-center">
                  <span>Banners & Gran Formato</span>
                </Link>
              </li>
              <li>
                <Link href="/servicios/flyers-y-folletos" className="hover:text-[#FF5E14] transition-colors flex items-center">
                  <span>Flyers & Volantes</span>
                </Link>
              </li>
              <li>
                <Link href="/servicios/stickers-y-etiquetas" className="hover:text-[#FF5E14] transition-colors flex items-center">
                  <span>Stickers & Etiquetas</span>
                </Link>
              </li>
              <li>
                <Link href="/servicios/material-promocional-pop" className="hover:text-[#FF5E14] transition-colors flex items-center">
                  <span>Gift Cards & POP</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-[#FF5E14] pb-1 inline-block">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link href="/tienda" className="hover:text-[#FF5E14] transition-colors">Catálogo de Productos</Link></li>
              <li><Link href="/cotizador" className="hover:text-[#FF5E14] transition-colors">Cotizador de Pre-orden</Link></li>
              <li><Link href="/blog" className="hover:text-[#FF5E14] transition-colors">Artículos del Blog</Link></li>
              <li><Link href="/nosotros" className="hover:text-[#FF5E14] transition-colors">Acerca de RufPixel</Link></li>
              <li><Link href="/contacto" className="hover:text-[#FF5E14] transition-colors">Contacto & Ubicación</Link></li>
              <li><Link href="/mi-cuenta" className="hover:text-[#FF5E14] transition-colors">Consultar Pedido</Link></li>
            </ul>
          </div>

          {/* Col 4: Contacto & Redes */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-[#FF5E14] pb-1 inline-block">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#FF5E14] shrink-0 mt-0.5" />
                <span>Ciudad de Panamá, Vía España, Edificio RufPixel</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#FF5E14] shrink-0" />
                <span>+507 6525-6015 / 6445-4084</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#FF5E14] shrink-0" />
                <span>ventas@rufpixel.com</span>
              </li>
            </ul>

            <div className="mt-6 flex space-x-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-900 hover:bg-[#FF5E14] text-white rounded-lg transition-colors border border-gray-800">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-900 hover:bg-[#FF5E14] text-white rounded-lg transition-colors border border-gray-800">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} RufPixel.com — Todos los derechos reservados. Desarrollado con Next.js Headless.</p>
          <div className="flex space-x-6">
            <Link href="/privacidad" className="hover:text-[#FF5E14] transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-[#FF5E14] transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
