import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070707] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/images/logo-blanco.png"
                alt="RufPixel Impresión & Diseño"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed">
              Imprenta, gran formato y fábrica de personalización de artículos promocionales en Panamá desde 50 unidades.
            </p>
            
            {/* Yappy Notice Pill */}
            <div className="inline-flex items-center space-x-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-[11px] text-gray-300">
              <ShieldCheck className="w-4 h-4 text-[#FF5E14] shrink-0" />
              <span>Pagos vía <strong className="text-white">YAPPY COMERCIAL & ACH</strong></span>
            </div>
          </div>

          {/* Col 2: Categorías de Promocionales con más demanda (SILO) */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-b-2 border-[#FF5E14] pb-1 inline-block">
              Promocionales B2B
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/articulos-promocionales-panama" className="font-bold text-[#FF5E14] hover:underline">
                  Artículos Promocionales en Panamá
                </Link>
              </li>
              <li>
                <Link href="/tienda/tazas-botellas-y-termos" className="hover:text-[#FF5E14] transition-colors">
                  Tazas, Vasos Térmicos y Termos
                </Link>
              </li>
              <li>
                <Link href="/tienda/boligrafos-y-plumas" className="hover:text-[#FF5E14] transition-colors">
                  Bolígrafos y Plumas con Logo
                </Link>
              </li>
              <li>
                <Link href="/tienda/textiles-y-ropa" className="hover:text-[#FF5E14] transition-colors">
                  Suéteres y Camisas Columbia
                </Link>
              </li>
              <li>
                <Link href="/tienda/bolsas-y-totes" className="hover:text-[#FF5E14] transition-colors">
                  Bolsas de Manta Sucia y Yute
                </Link>
              </li>
              <li>
                <Link href="/tienda/libretas-y-cuadernos" className="hover:text-[#FF5E14] transition-colors">
                  Agendas y Libretas Corporativas
                </Link>
              </li>
              <li>
                <Link href="/tienda/llaveros" className="hover:text-[#FF5E14] transition-colors">
                  Llaveros Personalizados
                </Link>
              </li>
              <li>
                <Link href="/tienda/identificacion-y-correas" className="hover:text-[#FF5E14] transition-colors">
                  Lanyards y Cintas Porta Carnet
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Servicios Principales */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-b-2 border-[#FF5E14] pb-1 inline-block">
              Taller e Imprenta
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/servicios/impresion-gran-formato" className="hover:text-[#FF5E14] transition-colors">
                  Banners, Roll-Up, Banderolas & Vinil
                </Link>
              </li>
              <li>
                <Link href="/servicios/bordados-computarizados" className="hover:text-[#FF5E14] transition-colors">
                  Bordados Computarizados en Panamá
                </Link>
              </li>
              <li>
                <Link href="/servicios/grabados-laser" className="hover:text-[#FF5E14] transition-colors">
                  Grabados Láser en Metal y Bambú
                </Link>
              </li>
              <li>
                <Link href="/servicios/dtf-textil" className="hover:text-[#FF5E14] transition-colors">
                  Impresión DTF Textil Directo
                </Link>
              </li>
              <li>
                <Link href="/servicios/uv-dtf" className="hover:text-[#FF5E14] transition-colors">
                  Stickers UV DTF Relieve 3D
                </Link>
              </li>
              <li>
                <Link href="/servicios/flyers-y-folletos" className="hover:text-[#FF5E14] transition-colors">
                  Flyers, Volantes y Tarjetas
                </Link>
              </li>
              <li>
                <Link href="/tomas-aereas-panama" className="hover:text-[#FF5E14] transition-colors">
                  Fotografía Aérea y Drones 360°
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Enlaces Rápidos */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-b-2 border-[#FF5E14] pb-1 inline-block">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/tienda" className="hover:text-[#FF5E14] transition-colors">Catálogo Completo (166 uds)</Link></li>
              <li><Link href="/regalos-corporativos-panama" className="hover:text-[#FF5E14] transition-colors">Regalos Corporativos en Panamá</Link></li>
              <li><Link href="/promocionales-panama-oeste" className="hover:text-[#FF5E14] transition-colors">Imprenta y Bordados La Chorrera</Link></li>
              <li><Link href="/cotizador" className="hover:text-[#FF5E14] transition-colors font-bold text-[#FF5E14]">Zona Pixel (Al Detal)</Link></li>
              <li><Link href="/blog" className="hover:text-[#FF5E14] transition-colors">Blog y Guías de Compra</Link></li>
              <li><Link href="/galeria" className="hover:text-[#FF5E14] transition-colors">Galería de Trabajos</Link></li>
              <li><Link href="/nosotros" className="hover:text-[#FF5E14] transition-colors">Acerca de RufPixel</Link></li>
              <li><Link href="/contacto" className="hover:text-[#FF5E14] transition-colors">Contacto & Ubicación</Link></li>
              <li><Link href="/mi-cuenta" className="hover:text-[#FF5E14] transition-colors">Consultar Pedido</Link></li>
            </ul>
          </div>

          {/* Col 5: Contacto & Redes */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-b-2 border-[#FF5E14] pb-1 inline-block">
              Contacto
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                <span>Calle Arnoldo Cano, Barrio Colón (entrando por COMASA, Local 1), La Chorrera, Panamá Oeste. Envíos a todo Panamá.</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#FF5E14] shrink-0" />
                <span>+507 6445-4084</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#FF5E14] shrink-0" />
                <span>ventas@rufpixel.com</span>
              </li>
            </ul>

            <div className="mt-5 flex space-x-3">
              <a href="https://www.instagram.com/rufpixel" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-900 hover:bg-[#FF5E14] text-white rounded-lg transition-colors border border-gray-800" aria-label="Instagram RufPixel">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/rufpixel" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-900 hover:bg-[#FF5E14] text-white rounded-lg transition-colors border border-gray-800" aria-label="Facebook RufPixel">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 space-y-4 md:space-y-0">
          <p>
            © {new Date().getFullYear()} RufPixel.com — Todos los derechos reservados. Desarrollado por{' '}
            <a
              href="https://datakorex.com"
              target="_blank"
              rel="noopener"
              title="DataKorex — Desarrollo Web y Software a Medida en Panamá"
              className="font-bold text-gray-300 hover:text-[#FF5E14] transition-colors underline decoration-gray-700 hover:decoration-[#FF5E14]"
            >
              DataKorex
            </a>
          </p>
          <div className="flex space-x-6">
            <Link href="/privacidad" className="hover:text-[#FF5E14] transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-[#FF5E14] transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
