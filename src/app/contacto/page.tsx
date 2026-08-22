'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
          Atención Inmediata
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-outfit">
          Contacto & Ubicación
        </h1>
        <p className="text-gray-600 max-w-md mx-auto text-xs sm:text-sm">
          Estamos listos para atender tus dudas sobre pedidos, materiales, envíos y validación de Yappy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Box */}
        <div className="lg:col-span-5 bg-[#0D0D0D] text-white p-8 rounded-3xl border border-gray-800 space-y-8 shadow-xl">
          <h2 className="text-2xl font-bold font-outfit text-white">Información de Contacto</h2>

          <div className="space-y-6 text-sm text-gray-300">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-[#FF5E14]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block font-outfit text-base">Ubicación física</strong>
                <span>Ciudad de Panamá, Vía España, Edificio RufPixel</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-[#FF5E14]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block font-outfit text-base">Teléfonos / WhatsApp</strong>
                <span>+507 6525-6015 / 6445-4084</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-[#FF5E14]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block font-outfit text-base">Correo electrónico</strong>
                <span>ventas@rufpixel.com</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-[#FF5E14]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block font-outfit text-base">Horario de atención</strong>
                <span>Lunes a Viernes: 8:00 AM - 6:00 PM</span>
                <span className="block">Sábados: 9:00 AM - 2:00 PM</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800 text-xs text-gray-400 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
            <span>Consultas sobre estado de pago Yappy respondidas en minutos</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-lg">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-outfit">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-gray-500 text-xs max-w-sm mx-auto">
                Gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo a la brevedad.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#FF5E14] text-white px-6 py-2.5 rounded-xl font-bold text-xs"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="text-xl font-bold text-gray-900 font-outfit mb-4">Envíanos un mensaje</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Tu Nombre *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+507 6525-6015"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Mensaje o Consulta *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detalla tu consulta sobre servicios, cotizaciones o estado de pedido..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FF5E14] outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-[#FF5E14]/20 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Consulta</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Google Maps Embed Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#FF5E14]">Google Maps Ubicación</span>
            <h3 className="text-xl font-extrabold text-gray-900 font-outfit">RUFPIXEL - CASA CREATIVA</h3>
          </div>
          <div className="flex items-center space-x-1 text-amber-500 font-bold text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <span>★★★★★</span>
            <span className="text-gray-900 text-xs ml-1">5,0 en Google Business</span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden h-96 border border-gray-200 relative shadow-inner">
          <iframe
            title="Ubicación RufPixel Casa Creativa en Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548!2d-79.52!3d8.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTgnNDguMCJOIDc5wrAzMScxMi4wIlc!5e0!3m2!1ses!2spa!4v1690000000000!5m2!1ses!2spa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
