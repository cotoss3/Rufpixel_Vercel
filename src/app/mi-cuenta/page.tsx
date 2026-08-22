'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { Search, ShieldCheck, Clock, CheckCircle2, PackageCheck, AlertCircle } from 'lucide-react';

export default function MiCuentaPage() {
  const { ordersHistory } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const filteredOrders = ordersHistory.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDIENTE_VALIDACION':
        return (
          <span className="inline-flex items-center space-x-1 bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>Pendiente de Validación Yappy</span>
          </span>
        );
      case 'PAGO_CONFIRMADO':
      case 'EN_PROCESO':
        return (
          <span className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 border border-blue-300 text-xs font-bold px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Pago Confirmado / En Impresión</span>
          </span>
        );
      case 'COMPLETADO':
        return (
          <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Entregado / Completado</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
          Atención al Cliente
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">
          Consulta tu Pedido Yappy
        </h1>
        <p className="text-gray-600 max-w-md mx-auto text-xs sm:text-sm">
          Ingresa tu número de orden (ej. RUF-123456) o tu correo para verificar la confirmación de tu pago.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto flex items-center bg-white p-2 rounded-2xl border border-gray-300 shadow-md">
        <Search className="w-5 h-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Número de orden (RUF-...) o correo..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSearched(true);
          }}
          className="w-full p-2.5 text-sm outline-none bg-transparent font-mono"
        />
      </div>

      {/* Results */}
      <div className="space-y-6 pt-4">
        {ordersHistory.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto" />
            <p className="text-gray-500 text-sm font-medium">No se han realizado pedidos en este navegador aún.</p>
          </div>
        ) : (
          (searched && searchQuery ? filteredOrders : ordersHistory).map((order) => (
            <div key={order.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
                <div>
                  <span className="text-xs text-gray-400 block font-mono">Orden #{order.orderNumber}</span>
                  <h3 className="text-lg font-bold text-gray-900 font-outfit">{order.customer.fullName}</h3>
                  <span className="text-xs text-gray-500">{order.customer.email} · {order.customer.phone}</span>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Items */}
              <div className="space-y-2 text-xs text-gray-700">
                <span className="font-bold text-gray-900 block">Productos solicitados:</span>
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl">
                    <span>{it.quantity}x {it.product.name}</span>
                    <span className="font-bold text-gray-900 font-outfit">${(it.product.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Yappy proof info */}
              <div className="bg-[#0D0D0D] text-white p-4 rounded-2xl text-xs flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
                  <span>Ref. Transacción Yappy: <strong className="font-mono text-[#FF5E14]">{order.paymentProof?.transactionId || 'N/A'}</strong></span>
                </div>
                <span className="font-extrabold text-sm font-outfit">${order.total.toFixed(2)} USD</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
