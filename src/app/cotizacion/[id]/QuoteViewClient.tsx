'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { 
  Printer, ArrowLeft, CheckCircle2, ShieldCheck, 
  Smartphone, Landmark, Copy, ExternalLink, Send, CreditCard, Sparkles, Clock, Truck
} from 'lucide-react';
import { Quote } from '@/lib/types';

interface QuoteViewClientProps {
  quote: Quote;
  quoteUrl: string;
}

export default function QuoteViewClient({ quote, quoteUrl }: QuoteViewClientProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedYappy, setCopiedYappy] = useState(false);
  const [copiedAch, setCopiedAch] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'YAPPY' | 'ACH'>('YAPPY');
  const [paymentSent, setPaymentSent] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  const printableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate QR code pointing to this exact quotation URL
    if (quoteUrl) {
      QRCode.toDataURL(quoteUrl, {
        width: 220,
        margin: 1,
        color: {
          dark: '#0D0D0D',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Error generating QR:', err));
    }
  }, [quoteUrl]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(quoteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyYappy = () => {
    navigator.clipboard.writeText('@RufPixel');
    setCopiedYappy(true);
    setTimeout(() => setCopiedYappy(false), 2000);
  };

  const handleCopyAch = () => {
    navigator.clipboard.writeText('03-72-01-123456-7');
    setCopiedAch(true);
    setTimeout(() => setCopiedAch(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `¡Hola! 👋 Te comparto la cotización formal de *RufPixel Panamá*:\n\n` +
      `📄 *Cotización:* ${quote.quoteNumber}\n` +
      `👤 *Cliente:* ${quote.customer.fullName}${quote.customer.company ? ` (${quote.customer.company})` : ''}\n` +
      `💰 *Total:* $${quote.total.toFixed(2)} USD\n` +
      `⏱️ *Validez:* 15 días\n\n` +
      `👉 Puedes ver el desglose en PDF y pagarla directamente en línea aquí:\n${quoteUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleWhatsAppPaymentNotify = () => {
    const methodStr = selectedMethod === 'YAPPY' ? 'Yappy' : 'Transferencia Bancaria ACH';
    const text = encodeURIComponent(
      `¡Hola RufPixel! 👋 Deseo reportar el pago de mi cotización:\n\n` +
      `📄 *Cotización:* ${quote.quoteNumber}\n` +
      `👤 *Cliente:* ${quote.customer.fullName}\n` +
      `💰 *Monto Pagado:* $${quote.total.toFixed(2)} USD\n` +
      `💳 *Método:* ${methodStr}\n` +
      `🔢 *N° Transacción / Ref:* ${transactionRef || 'Adjunto comprobante'}\n` +
      `🔗 *Enlace:* ${quoteUrl}`
    );
    window.open(`https://wa.me/50765256015?text=${text}`, '_blank');
    setPaymentSent(true);
  };

  const formattedDate = new Date(quote.createdAt).toLocaleDateString('es-PA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const formattedValidUntil = new Date(quote.validUntil).toLocaleDateString('es-PA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F4F5F7] py-8 px-4 sm:px-6 print:bg-white print:p-0 print:m-0 font-sans text-gray-900">
      {/* =========================================================================
          TOP ACTION BAR (Screen Only - Hidden in Print)
      ========================================================================= */}
      <div className="max-w-4xl mx-auto mb-6 print:hidden">
        <div className="bg-[#0D0D0D] text-white p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-800">
          <div className="flex items-center space-x-3">
            <Link
              href="/tienda"
              className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors"
              title="Volver a la tienda"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#FF5E14]">
                  Cotización Formal
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Vigente (15 días)
                </span>
              </div>
              <h1 className="text-lg font-bold font-outfit text-white">
                {quote.quoteNumber}
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border border-gray-700"
            >
              <Printer className="w-4 h-4 text-[#FF5E14]" />
              <span>Descargar / Imprimir PDF</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-green-900/30"
            >
              <Send className="w-4 h-4" />
              <span>Enviar WhatsApp</span>
            </button>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#FF5E14] hover:bg-[#E04700] text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-[#FF5E14]/30"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pagar Cotización</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PRINTABLE QUOTATION CANVAS (A4 / Letter Standard Layout)
      ========================================================================= */}
      <div
        ref={printableRef}
        id="printable-quotation"
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl print:shadow-none border border-gray-200 print:border-none p-6 sm:p-12 space-y-8 relative overflow-hidden"
      >
        {/* Top Decorative RufPixel Orange Line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF5E14] via-[#FF8533] to-[#FF5E14]" />

        {/* 1. HEADER SECTION: BRANDING & QUOTE METADATA */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-gray-200 pb-8 pt-2">
          {/* Company Brand & Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="bg-[#0D0D0D] px-4 py-2.5 rounded-xl flex items-center space-x-2">
                <span className="font-outfit font-extrabold text-xl text-white tracking-tight">
                  RUF<span className="text-[#FF5E14]">PIXEL</span>
                </span>
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Panamá • Publicidad & Merchandising
              </span>
            </div>

            <div className="text-xs text-gray-500 space-y-0.5 leading-relaxed">
              <p className="font-bold text-gray-800">RufPixel Impresiones S.A.</p>
              <p>R.U.C.: 155708985-2-2022 D.V. 54</p>
              <p>WhatsApp / Ventas: <strong className="text-gray-700">+507 6525-6015</strong></p>
              <p>Email: <span className="text-gray-700">ventas@rufpixel.com</span> • Web: <strong className="text-gray-800">rufpixel.com</strong></p>
              <p>Ciudad de Panamá, República de Panamá</p>
            </div>
          </div>

          {/* Quotation Meta Badge */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-right w-full sm:w-auto min-w-[240px] space-y-2">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#FF5E14] block">
                Cotización Comercial
              </span>
              <p className="text-2xl font-black font-outfit text-gray-900 tracking-tight">
                {quote.quoteNumber}
              </p>
            </div>

            <div className="text-xs space-y-1 pt-2 border-t border-gray-200 text-gray-600">
              <p>
                <span className="text-gray-400">Fecha de Emisión:</span>{' '}
                <strong className="text-gray-800">{formattedDate}</strong>
              </p>
              <p>
                <span className="text-gray-400">Válido hasta:</span>{' '}
                <strong className="text-[#FF5E14]">{formattedValidUntil}</strong>
              </p>
              <p className="text-[11px] text-gray-500">
                Estado: <span className="text-emerald-600 font-bold uppercase">{quote.status}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. CLIENT / CUSTOMER DETAILS */}
        <div className="bg-[#0D0D0D] text-white rounded-2xl p-6 shadow-md border border-gray-800">
          <div className="flex items-center space-x-2 text-[#FF5E14] font-extrabold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Datos del Cliente / Empresa</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block text-[11px]">Cotizado a:</span>
              <strong className="text-white text-sm font-outfit block">{quote.customer.fullName}</strong>
              {quote.customer.company && (
                <span className="text-gray-300 block">{quote.customer.company}</span>
              )}
              {quote.customer.ruc && (
                <span className="text-gray-400 block text-[11px]">R.U.C.: {quote.customer.ruc}</span>
              )}
            </div>

            <div>
              <span className="text-gray-400 block text-[11px]">Contacto:</span>
              <p className="text-gray-200 font-medium">WhatsApp: {quote.customer.phone}</p>
              <p className="text-gray-200 font-medium">{quote.customer.email}</p>
            </div>

            <div>
              <span className="text-gray-400 block text-[11px]">Asignado por:</span>
              <p className="text-white font-bold">Ventas Corporativas RufPixel</p>
              <p className="text-gray-400 text-[11px]">Atención Personalizada 24/7</p>
            </div>
          </div>

          {quote.customer.notes && (
            <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-300">
              <span className="font-bold text-[#FF5E14]">Observaciones del cliente: </span>
              <span>{quote.customer.notes}</span>
            </div>
          )}
        </div>

        {/* 3. ITEMS TABLE */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase font-extrabold text-gray-500 tracking-wider">
            Detalle de Productos & Técnicas de Personalización
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100/80 text-gray-700 font-extrabold uppercase text-[11px] border-b border-gray-200">
                  <th className="py-3.5 px-4 w-14 text-center">Ítem</th>
                  <th className="py-3.5 px-4">Descripción Técnica</th>
                  <th className="py-3.5 px-4 text-center">Cantidad</th>
                  <th className="py-3.5 px-4 text-right">Precio Unit.</th>
                  <th className="py-3.5 px-4 text-right">Total USD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quote.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-4 text-center align-middle">
                      <div className="w-11 h-11 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center mx-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-0.5"
                        />
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3 px-4 align-middle">
                      <div className="space-y-1">
                        <span className="font-extrabold text-gray-900 font-outfit text-sm block">
                          {item.name}
                        </span>
                        
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          {item.technique && (
                            <span className="bg-[#FF5E14]/10 text-[#FF5E14] font-bold px-2 py-0.5 rounded-md border border-[#FF5E14]/20">
                              {item.technique}
                            </span>
                          )}
                          <span className="text-gray-500">
                            Categoría: {item.category}
                          </span>
                          {item.sku && (
                            <span className="text-gray-400 font-mono">
                              (SKU: {item.sku})
                            </span>
                          )}
                        </div>

                        {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                          <div className="text-[11px] text-gray-500 flex flex-wrap gap-2 pt-0.5">
                            {Object.entries(item.selectedAttributes).map(([k, v]) => (
                              <span key={k}>
                                <strong>{k}:</strong> {v}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="py-3 px-4 text-center align-middle font-bold text-gray-900 text-sm">
                      {item.quantityUnits}{' '}
                      <span className="text-xs text-gray-500 font-normal">uds</span>
                    </td>

                    {/* Unit Price */}
                    <td className="py-3 px-4 text-right align-middle font-mono font-medium text-gray-700">
                      ${item.unitPrice.toFixed(2)}
                    </td>

                    {/* Line Total */}
                    <td className="py-3 px-4 text-right align-middle font-mono font-extrabold text-gray-900 text-sm">
                      ${item.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. TOTALS & FINANCIAL SUMMARY */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-2">
          {/* Left: Notes & Guarantees */}
          <div className="w-full sm:max-w-md space-y-3 text-xs text-gray-600">
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-1.5">
              <span className="font-extrabold text-amber-900 flex items-center space-x-1.5 text-[11px] uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Condiciones de Entrega y Producción</span>
              </span>
              <p className="text-amber-950 text-[11px] leading-relaxed">
                • <strong>Tiempo de producción:</strong> 24 a 48 horas tras aprobación formal del montaje digital y confirmación de pago.
              </p>
              <p className="text-amber-950 text-[11px] leading-relaxed">
                • <strong>Muestra Digital:</strong> Se enviará simulación virtual de su diseño previo a la impresión final sin costo adicional.
              </p>
            </div>
          </div>

          {/* Right: Calculations */}
          <div className="w-full sm:w-72 bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2.5 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-mono font-bold text-gray-800">${quote.subtotal.toFixed(2)} USD</span>
            </div>

            <div className="flex justify-between text-gray-600 border-b border-gray-200 pb-2.5">
              <span>ITBMS (7%):</span>
              <span className="font-mono font-bold text-gray-800">${quote.tax.toFixed(2)} USD</span>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-sm font-extrabold text-gray-900 font-outfit uppercase">
                Total Cotización:
              </span>
              <span className="text-2xl font-black font-outfit text-[#FF5E14] font-mono">
                ${quote.total.toFixed(2)}{' '}
                <span className="text-xs font-normal text-gray-600">USD</span>
              </span>
            </div>
          </div>
        </div>

        {/* 5. INTERACTIVE PAYMENT & QR SECTION (Cross-device, works on mobile, PC, and paper!) */}
        <div className="bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] text-white p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left Column: CTA Button */}
            <div className="space-y-3 text-center sm:text-left flex-1">
              <div className="inline-flex items-center space-x-1.5 bg-[#FF5E14]/20 border border-[#FF5E14]/30 text-[#FF5E14] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Aprobación & Pago en Línea</span>
              </div>

              <h3 className="text-xl font-black font-outfit text-white">
                ¿Listo para procesar tu pedido?
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed max-w-lg">
                Haz clic en el botón de abajo o escanea el código QR con cualquier celular para pagar esta cotización directamente vía <strong>Yappy</strong> o <strong>Transferencia ACH Banco General</strong>.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="px-6 py-3.5 bg-[#FF5E14] hover:bg-[#E04700] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-xl shadow-[#FF5E14]/30 transition-all flex items-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>👉 Pagar esta Cotización Online</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border border-gray-700"
                >
                  <Copy className="w-4 h-4 text-[#FF5E14]" />
                  <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: QR Code */}
            {qrCodeDataUrl && (
              <div className="bg-white p-3 rounded-2xl shadow-xl border-2 border-white flex flex-col items-center space-y-1.5 shrink-0 text-center">
                <img
                  src={qrCodeDataUrl}
                  alt={`QR Cotización ${quote.quoteNumber}`}
                  className="w-32 h-32 object-contain"
                />
                <span className="text-[10px] font-bold text-gray-900 block font-outfit uppercase tracking-tighter">
                  Escanear para Pagar
                </span>
                <span className="text-[9px] text-gray-500 font-mono">
                  Yappy • ACH Banco General
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 6. BANKING INFO & CORPORATE TERMS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          {/* Yappy */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1.5">
            <div className="flex items-center space-x-2 text-gray-900 font-extrabold text-xs">
              <Smartphone className="w-4 h-4 text-[#FF5E14]" />
              <span>Pago Rápido vía Yappy Panamá</span>
            </div>
            <p className="text-gray-600 text-[11px]">
              Directorio Yappy: <strong className="text-gray-900 font-mono text-xs">@RufPixel</strong>
            </p>
            <p className="text-gray-500 text-[11px]">
              Teléfonos asociados: +507 6525-6015 / +507 6445-4084
            </p>
            <p className="text-gray-500 text-[10px]">
              Titular: <strong>RufPixel Impresiones S.A.</strong>
            </p>
          </div>

          {/* ACH */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1.5">
            <div className="flex items-center space-x-2 text-gray-900 font-extrabold text-xs">
              <Landmark className="w-4 h-4 text-[#FF5E14]" />
              <span>Transferencia Bancaria Directa (ACH)</span>
            </div>
            <p className="text-gray-600 text-[11px]">
              Banco: <strong className="text-gray-900">Banco General Panamá</strong>
            </p>
            <p className="text-gray-600 text-[11px]">
              Tipo de Cuenta: <strong className="text-gray-900">Cuenta Corriente</strong>
            </p>
            <p className="text-gray-500 text-[10px]">
              Beneficiario: <strong>RufPixel Impresiones S.A.</strong>
            </p>
          </div>
        </div>

        {/* 7. FOOTER */}
        <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-500 space-y-1">
          <p className="font-bold text-gray-700">
            RufPixel • Publicidad, Merchandising & Soluciones Gráficas
          </p>
          <p className="text-[11px] text-gray-400">
            Documento emitido electrónicamente desde <strong className="text-gray-600">rufpixel.com</strong>. Válido como cotización formal de precios y condiciones comerciales.
          </p>
        </div>
      </div>

      {/* =========================================================================
          PAYMENT MODAL (Opens when clicking "Pagar esta Cotización")
      ========================================================================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 print:hidden animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>

            {paymentSent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-outfit text-gray-900">
                  ¡Reporte de Pago Enviado!
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Tu comprobante ha sido canalizado con nuestro equipo de contabilidad. Te confirmaremos por WhatsApp e iniciaremos la producción de tu pedido en breve.
                </p>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-6 py-3 bg-[#FF5E14] text-white rounded-xl text-xs font-bold"
                >
                  Entendido, volver a la cotización
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-[#FF5E14] tracking-wider block">
                    Pagar Cotización {quote.quoteNumber}
                  </span>
                  <h3 className="text-xl font-bold font-outfit text-gray-900">
                    Total a Pagar: <span className="text-[#FF5E14]">${quote.total.toFixed(2)} USD</span>
                  </h3>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('YAPPY')}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      selectedMethod === 'YAPPY'
                        ? 'bg-[#FF5E14] text-white border-[#FF5E14]'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    Yappy Panamá
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('ACH')}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      selectedMethod === 'ACH'
                        ? 'bg-[#FF5E14] text-white border-[#FF5E14]'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    Transferencia ACH
                  </button>
                </div>

                {/* Method instructions */}
                {selectedMethod === 'YAPPY' ? (
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3 text-xs">
                    <p className="text-gray-600">
                      Envía <strong className="text-gray-900">${quote.total.toFixed(2)} USD</strong> desde tu app de Banco General a nuestro directorio:
                    </p>
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-300">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase block">Directorio Yappy</span>
                        <strong className="text-base font-mono text-gray-900">@RufPixel</strong>
                      </div>
                      <button
                        onClick={handleCopyYappy}
                        className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-bold"
                      >
                        {copiedYappy ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                    <p className="text-gray-600">
                      Transfiere <strong className="text-gray-900">${quote.total.toFixed(2)} USD</strong> vía ACH a:
                    </p>
                    <div className="bg-white p-3 rounded-xl border border-gray-300 space-y-1">
                      <p><strong>Banco:</strong> Banco General Panamá</p>
                      <p><strong>Tipo:</strong> Cuenta Corriente</p>
                      <p><strong>Beneficiario:</strong> RufPixel Impresiones S.A.</p>
                      <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                        <span className="font-mono text-gray-900 font-bold">03-72-01-123456-7</span>
                        <button
                          onClick={handleCopyAch}
                          className="px-2.5 py-1 bg-gray-900 text-white rounded-lg text-[11px] font-bold"
                        >
                          {copiedAch ? '¡Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirm step */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Número de Transacción / Confirmación (opcional):
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 984521"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-300 text-xs font-mono outline-none focus:border-[#FF5E14]"
                    />
                  </div>

                  <button
                    onClick={handleWhatsAppPaymentNotify}
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-green-900/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Reportar Pago por WhatsApp</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
