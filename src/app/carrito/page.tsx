'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-outfit">Tu carrito está vacío</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Explora nuestro catálogo de tienda o solicita una pre-orden con tus medidas personalizadas.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/tienda"
            className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-[#FF5E14]/20"
          >
            Ir a la Tienda
          </Link>
          <Link
            href="/cotizador"
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold text-sm border border-gray-800"
          >
            Cotizar Pre-orden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Link href="/tienda" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Seguir comprando</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit mt-2">
          Carrito de Compras
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover border border-gray-200 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-base font-outfit">
                    {item.product.name}
                  </h3>
                  {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                    <div className="text-xs text-gray-500 mt-1 space-x-2">
                      {Object.entries(item.selectedAttributes).map(([k, v]) => (
                        <span key={k} className="bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                          {k}: <strong>{v}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="text-sm font-bold text-[#FF5E14] block mt-1">
                    ${item.product.price.toFixed(2)} c/u
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto space-x-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                {/* Quantity adjuster */}
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>

                <span className="text-base font-extrabold text-gray-900 font-outfit min-w-[70px] text-right">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>

                <button
                  onClick={() => removeFromCart(index)}
                  className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                  aria-label="Eliminar producto"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-xs text-gray-500 hover:text-rose-600 font-semibold underline"
            >
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-lg space-y-6">
            <h2 className="text-xl font-bold text-gray-900 font-outfit border-b border-gray-100 pb-4">
              Resumen del Pedido
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} ítems)</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío / Retiro</span>
                <span className="font-semibold text-emerald-600">Por coordinar</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t border-gray-100 font-outfit">
                <span>Total a Pagar</span>
                <span className="text-[#FF5E14] text-xl">${subtotal.toFixed(2)} USD</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-[#FF5E14] hover:bg-[#E04700] text-white py-4 px-6 rounded-xl font-extrabold text-center block shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Proceder al Checkout (Yappy)</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-2">
              <div className="flex items-center space-x-2 text-gray-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
                <span>Instrucciones de Pago Yappy</span>
              </div>
              <p>
                En el siguiente paso completarás tus datos y se mostrará el QR y número telefónico de Yappy RufPixel para realizar tu pago.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
