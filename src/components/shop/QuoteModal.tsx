'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, Sparkles, Send, ShieldCheck, X, Loader2, ArrowRight
} from 'lucide-react';
import { QuoteCustomer, QuoteItem } from '@/lib/types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
}

export default function QuoteModal({ isOpen, onClose, items }: QuoteModalProps) {
  const router = useRouter();

  const [customer, setCustomer] = useState<QuoteCustomer>({
    fullName: '',
    company: '',
    ruc: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = Number((subtotal * 0.07).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customer.fullName.trim() || !customer.phone.trim() || !customer.email.trim()) {
      setErrorMsg('Por favor completa tu nombre, teléfono y correo electrónico.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items,
          includeTax: true,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error al generar la cotización');
      }

      // Redirect to the newly generated quote page
      router.push(`/cotizacion/${data.quote.id}?token=${data.quote.token}`);
    } catch (err: any) {
      console.error('Error submitting quote:', err);
      setErrorMsg(err.message || 'No se pudo generar la cotización. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-[#FF5E14]/10 text-[#FF5E14] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Cotización Formal Inmediata</span>
          </div>
          <h2 className="text-2xl font-black font-outfit text-gray-900">
            Generar Cotización en PDF
          </h2>
          <p className="text-xs text-gray-500">
            Recibe un documento oficial membretado con precios mayoristas, validez de 15 días y botón de pago directo online.
          </p>
        </div>

        {/* Quick Items Summary */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
          <span className="font-bold text-gray-700 block uppercase text-[10px] tracking-wider">
            Resumen de Ítems a Cotizar ({items.length}):
          </span>
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
            {items.map((it, idx) => (
              <div key={idx} className="flex justify-between items-center text-gray-600">
                <span className="truncate max-w-[260px]">
                  <strong>{it.quantityUnits}x</strong> {it.name}
                </span>
                <span className="font-mono font-bold text-gray-900">${it.totalPrice.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline font-bold text-gray-900">
            <span>Total Estimado (con ITBMS 7%):</span>
            <span className="text-sm font-extrabold text-[#FF5E14] font-mono">${total.toFixed(2)} USD</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">
              Nombre Completo / Contacto *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Juan Pérez"
              value={customer.fullName}
              onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">
                Empresa (opcional)
              </label>
              <input
                type="text"
                placeholder="Ej. Corporación ABC"
                value={customer.company}
                onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">
                R.U.C. o Cédula (opcional)
              </label>
              <input
                type="text"
                placeholder="Ej. 155708985-2-2022"
                value={customer.ruc}
                onChange={(e) => setCustomer({ ...customer, ruc: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">
                WhatsApp / Teléfono *
              </label>
              <input
                type="tel"
                required
                placeholder="+507 6525-6015"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                placeholder="compras@empresa.com"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">
              Notas adicionales o requerimientos (opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Indica si requieres muestras físicas, colores especiales o fecha límite de entrega."
              value={customer.notes}
              onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#FF5E14] hover:bg-[#E04700] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-[#FF5E14]/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generando Cotización Formal...</span>
                </>
              ) : (
                <>
                  <span>👉 Generar Cotización Oficial en PDF</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
