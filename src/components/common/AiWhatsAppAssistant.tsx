'use client';

import React, { useState } from 'react';
import { Sparkles, X, Send, CheckCircle2, Bot, Layers, Palette, Hash, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '50764454084';

export default function AiWhatsAppAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Form states
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [designStatus, setDesignStatus] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const productOptions = [
    'Bolígrafos y Plumas',
    'Bolsas y Totes',
    'Tazas y Termos',
    'Gorras y Textiles',
    'Stickers y Etiquetas',
    'Impresión Gran Formato / Banners',
    'Tarjetas / Carpetas Corporativas',
    'Otro Proyecto Personalizado',
  ];

  const quantityOptions = [
    '1 Unidad (Muestra / Detal)',
    '50 Unidades (Pack Mayorista)',
    '100 Unidades',
    '250+ Unidades (Volumen Alto)',
  ];

  const designOptions = [
    'Tengo mi diseño listo en PDF / AI / PNG',
    'Necesito servicio de diseño gráfico profesional',
    'Solo tengo el logo y deseo montaje digital',
  ];

  const handleNext = () => {
    setStep((s) => s + 1);
  };

  const handleReset = () => {
    setStep(1);
    setProductType('');
    setQuantity('');
    setDesignStatus('');
    setAdditionalNotes('');
  };

  // Clean, 100% universal WhatsApp URL text format
  const generateWhatsAppUrl = () => {
    const lines = [
      'Hola RufPixel, vengo de la web. Quiero cotizar con la ayuda del Asistente IA:',
      '',
      `- Producto/Servicio: ${productType || 'No especificado'}`,
      `- Cantidad requerida: ${quantity || 'No especificada'}`,
      `- Estado del diseño: ${designStatus || 'No especificado'}`,
      `- Notas adicionales: ${additionalNotes || 'Sin notas adicionales'}`,
      '',
      '¿Podrían indicarme precio total y tiempo de entrega? Gracias.',
    ];

    const messageText = lines.join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
  };

  const handleSendToWhatsApp = () => {
    const url = generateWhatsAppUrl();
    window.open(url, '_blank');
    setIsOpen(false);
    handleReset();
  };

  return (
    <>
      {/* Floating Trigger Button: Iconic WhatsApp Green (#25D366) with Subtle AI Accents */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
        {/* Helper Tooltip Badge */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center space-x-2 bg-[#0D0D0D] text-white px-4 py-2.5 rounded-2xl border border-gray-800 shadow-2xl text-xs font-bold cursor-pointer hover:border-[#25D366] transition-all group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
            <span className="group-hover:text-[#25D366] transition-colors">Cotizar por WhatsApp</span>
            <span className="bg-[#25D366]/20 text-[#25D366] text-[10px] px-1.5 py-0.5 rounded-md font-extrabold flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>IA</span>
            </span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(true)}
          className="relative group bg-[#25D366] hover:bg-[#1EBE57] text-white p-4 rounded-full shadow-2xl shadow-[#25D366]/30 border-2 border-white transition-all transform hover:scale-110 flex items-center justify-center"
          aria-label="Abrir WhatsApp Cotizaciones RufPixel"
        >
          {/* Subtle AI Sparkles Badge on Top Right */}
          <span className="absolute -top-1.5 -right-1.5 bg-[#0D0D0D] text-[#25D366] p-1 rounded-full border-2 border-white shadow-md flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </span>

          {/* Official WhatsApp Speech Bubble Icon */}
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </button>
      </div>

      {/* Interactive AI Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-[#25D366] text-white rounded-2xl shadow-md">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-extrabold text-gray-900 text-base font-outfit">Cotizador WhatsApp RufPixel</h3>
                    <span className="bg-[#25D366]/10 text-[#1EBE57] text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Asistente IA</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Filtrado rápido para atención vía WhatsApp (+507 6445-4084)</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between text-xs font-bold text-gray-400">
              <span className={step >= 1 ? 'text-[#25D366]' : ''}>1. Producto</span>
              <span className={step >= 2 ? 'text-[#25D366]' : ''}>2. Cantidad</span>
              <span className={step >= 3 ? 'text-[#25D366]' : ''}>3. Diseño</span>
              <span className={step >= 4 ? 'text-[#25D366]' : ''}>4. Resumen</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#25D366] h-full transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            {/* STEP 1: Product Selection */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm font-outfit flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-[#25D366]" />
                    <span>¿Qué producto o servicio deseas cotizar?</span>
                  </h4>
                  <p className="text-xs text-gray-500">Selecciona la opción que mejor describa tu pedido:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {productOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setProductType(opt);
                        handleNext();
                      }}
                      className={`p-3 rounded-2xl text-xs font-bold text-left border transition-all ${
                        productType === opt
                          ? 'bg-[#25D366] text-white border-[#25D366] shadow-md'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-[#25D366] hover:bg-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Quantity Selection */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm font-outfit flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-[#25D366]" />
                    <span>¿Qué cantidad aproximada necesitas?</span>
                  </h4>
                  <p className="text-xs text-gray-500">Producto seleccionado: <strong className="text-gray-900">{productType}</strong></p>
                </div>

                <div className="space-y-2">
                  {quantityOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setQuantity(opt);
                        handleNext();
                      }}
                      className={`w-full p-3.5 rounded-2xl text-xs font-bold text-left border transition-all ${
                        quantity === opt
                          ? 'bg-[#25D366] text-white border-[#25D366] shadow-md'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-[#25D366] hover:bg-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Design Status Selection */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm font-outfit flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-[#25D366]" />
                    <span>¿Cuentas con el diseño o logotipo listo?</span>
                  </h4>
                  <p className="text-xs text-gray-500">Indícanos si tienes el archivo impreso o si requieres diseño:</p>
                </div>

                <div className="space-y-2">
                  {designOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setDesignStatus(opt);
                        handleNext();
                      }}
                      className={`w-full p-3.5 rounded-2xl text-xs font-bold text-left border transition-all ${
                        designStatus === opt
                          ? 'bg-[#25D366] text-white border-[#25D366] shadow-md'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-[#25D366] hover:bg-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Summary & Extra Notes */}
            {step === 4 && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm font-outfit flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                    <span>Resumen de tu Cotización</span>
                  </h4>
                  <p className="text-xs text-gray-500">Revisa la información antes de enviar a nuestro WhatsApp (+507 6445-4084):</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Producto:</span>
                    <strong className="text-gray-900 font-bold">{productType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Cantidad:</span>
                    <strong className="text-gray-900 font-bold">{quantity}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Diseño:</span>
                    <strong className="text-gray-900 font-bold">{designStatus}</strong>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">
                    Notas adicionales o fecha de entrega deseada (opcional):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ej. Requiero entrega en Vía España este viernes a las 2:00 PM..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl border border-gray-300 focus:border-[#25D366] outline-none"
                  />
                </div>

                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE57] text-white py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar Cotización a WhatsApp (+507 6445-4084)</span>
                </button>
              </div>
            )}

            {/* Back Button */}
            {step > 1 && (
              <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="font-bold text-gray-500 hover:text-gray-900 underline"
                >
                  « Regresar al paso anterior
                </button>
                <button
                  onClick={handleReset}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Reiniciar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
