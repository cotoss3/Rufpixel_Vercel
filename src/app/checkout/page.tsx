'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { ShieldCheck, Upload, CheckCircle2, QrCode, Phone, Copy, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Order } from '@/lib/types';

export default function CheckoutPage() {
  const { cart, subtotal, createYappyOrder } = useCart();

  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: 'Ciudad de Panamá',
    city: 'Panamá',
    notes: '',
  });

  const [transactionId, setTransactionId] = useState('');
  const [receiptFileName, setReceiptFileName] = useState('');
  const [copiedYappy, setCopiedYappy] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (createdOrder) {
    return (
      <div className="py-16 max-w-3xl mx-auto px-4 space-y-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
              Pedido Recibido Exitosa
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 font-outfit">
              ¡Gracias por tu pedido, {createdOrder.customer.fullName.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 text-sm max-w-lg mx-auto">
              Tu pedido ha sido creado con éxito bajo el número de referencia <strong className="text-gray-900 font-mono font-bold">{createdOrder.orderNumber}</strong>.
            </p>
          </div>

          {/* Status Badge */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 text-xs space-y-1">
            <div className="font-bold uppercase tracking-wider flex items-center justify-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Estado: Pendiente de Validación Humana</span>
            </div>
            <p>
              Un operador de RufPixel revisará tu transferencia Yappy y actualizará el estado de tu orden en breve. Te notificaremos a tu correo: <strong>{createdOrder.customer.email}</strong>.
            </p>
          </div>

          {/* Details breakdown */}
          <div className="bg-gray-50 p-6 rounded-2xl text-left text-xs text-gray-700 space-y-2 border border-gray-200">
            <div className="flex justify-between border-b border-gray-200 pb-2 font-bold text-gray-900">
              <span>Detalles de Transacción Yappy</span>
              <span>Ref: {createdOrder.paymentProof?.transactionId}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>Total Pagado:</span>
              <span className="font-extrabold text-gray-900 text-sm font-outfit">${createdOrder.total.toFixed(2)} USD</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/mi-cuenta"
              className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-[#FF5E14]/20"
            >
              Consultar Estado del Pedido
            </Link>
            <Link
              href="/"
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3.5 rounded-xl font-semibold text-sm border border-gray-800"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-xl mx-auto text-center space-y-4 px-4">
        <h1 className="text-2xl font-bold text-gray-900">No hay productos en el carrito</h1>
        <Link href="/tienda" className="inline-block bg-[#FF5E14] text-white px-6 py-3 rounded-xl font-bold text-sm">
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  const handleCopyYappy = () => {
    navigator.clipboard.writeText('60000000');
    setCopiedYappy(true);
    setTimeout(() => setCopiedYappy(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFileName(e.target.files[0].name);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customer.fullName || !customer.email || !customer.phone) {
      setErrorMsg('Por favor completa tu nombre, correo y número telefónico.');
      return;
    }

    if (!transactionId) {
      setErrorMsg('Por favor ingresa el número de referencia o transacción de Yappy.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder = createYappyOrder(customer, {
        transactionId,
        receiptImageUrl: receiptFileName ? `/uploads/${receiptFileName}` : '',
      });
      setCreatedOrder(newOrder);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Link href="/carrito" className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5E14] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al carrito</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit mt-2">
          Checkout — Pago vía Yappy
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Customer Form & Yappy Instructions */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Customer Contact Data */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900 font-outfit border-b border-gray-100 pb-3 flex items-center justify-between">
              <span>1. Datos del Cliente & Entrega</span>
              <span className="text-xs font-normal text-gray-500">Paso 1 de 2</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-gray-700">Nombre Completo / Empresa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Fernando Contreras / RufPixel PA"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  placeholder="cliente@ejemplo.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+507 6000-0000"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-gray-700">Dirección de Entrega o Sucursal de Retiro</label>
                <textarea
                  rows={2}
                  placeholder="Indica si deseas envío a domicilio en Panamá o retirar en nuestra imprenta."
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] outline-none"
                />
              </div>
            </div>
          </div>


          {/* Step 2: Yappy Payment Box & Receipt Attachment */}
          <div className="bg-[#0D0D0D] text-white p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-xl font-bold font-outfit text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#FF5E14]" />
                <span>2. Instrucciones de Pago por Yappy</span>
              </h2>
              <span className="text-xs text-[#FF5E14] font-bold">Validación Humana</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Abre la aplicación de tu banco en tu celular, ingresa a la sección <strong>Yappy</strong> y realiza la transferencia por el total exacto de la orden:
            </p>

            {/* Yappy Account Card */}
            <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-400 block uppercase font-semibold">Directorio / Número Yappy</span>
                  <span className="text-lg font-extrabold text-white font-mono tracking-wider">
                    @RufPixel <span className="text-xs text-gray-400 font-sans">(+507 6000-0000)</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyYappy}
                  className="p-2.5 bg-gray-800 hover:bg-[#FF5E14] text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedYappy ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <div className="text-[11px] text-gray-400 border-t border-gray-800 pt-2 flex items-center justify-between">
                <span>Titular de la cuenta: <strong>RufPixel Impresiones S.A.</strong></span>
                <span>Banco: <strong>Banco General</strong></span>
              </div>
            </div>

            {/* Receipt & Transaction ID inputs */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1 text-xs">
                <label className="font-bold text-white block">
                  Número de Transacción / Referencia Yappy *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. YAP-9847201 o número de confirmación"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:border-[#FF5E14] outline-none font-mono"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-white block">
                  Adjuntar Comprobante de Pago (Captura de Yappy - Opcional)
                </label>
                <div className="relative border-2 border-dashed border-gray-700 hover:border-[#FF5E14] rounded-2xl p-4 text-center cursor-pointer bg-gray-900 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center space-y-1">
                    <Upload className="w-6 h-6 text-[#FF5E14]" />
                    <span className="text-gray-300 font-medium">
                      {receiptFileName ? `Archivo seleccionado: ${receiptFileName}` : 'Haz clic para subir la captura del pago'}
                    </span>
                    <span className="text-[10px] text-gray-500">Formatos permitidos: JPG, PNG, PDF (Máx. 5MB)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* Right Column: Order Summary & Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-lg space-y-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 font-outfit border-b border-gray-100 pb-3">
              Resumen de la Orden
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-gray-700">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#FF5E14]">{item.quantity}x</span>
                    <span className="font-semibold text-gray-900 line-clamp-1">{item.product.name}</span>
                  </div>
                  <span className="font-extrabold text-gray-900 font-outfit">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Método de Pago:</span>
                <span className="font-bold text-[#FF5E14]">Yappy (Validación Humana)</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-100 font-outfit">
                <span>Total a Pagar:</span>
                <span className="text-[#FF5E14] text-xl">${subtotal.toFixed(2)} USD</span>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-bold">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF5E14] hover:bg-[#E04700] disabled:bg-gray-400 text-white py-4 px-6 rounded-xl font-extrabold text-center block shadow-lg shadow-[#FF5E14]/30 transition-all text-sm flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Procesando pedido...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Confirmar Pedido vía Yappy</span>
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
