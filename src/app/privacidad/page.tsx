import React from 'react';

export const metadata = {
  title: 'Política de Privacidad — RufPixel.com',
  description: 'Política de privacidad y protección de datos personales de RufPixel.',
};

export default function PrivacidadPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900 font-outfit">Política de Privacidad</h1>
      <p className="text-xs text-gray-500">Última actualización: 4 de agosto de 2026</p>

      <div className="prose prose-sm text-gray-700 space-y-4 leading-relaxed font-sans bg-white p-8 rounded-3xl border border-gray-200">
        <p>
          En <strong>RufPixel.com</strong> respetamos profundamente la privacidad de nuestros clientes y visitantes. Esta Política explica cómo recopilamos, utilizamos y protegemos la información personal y los archivos de diseño que compartes con nosotros.
        </p>

        <h3 className="text-lg font-bold text-gray-900 font-outfit">1. Información que recopilamos</h3>
        <p>
          Recopilamos únicamente los datos necesarios para procesar tus pedidos de impresión y pre-órdenes: nombre completo, dirección de correo electrónico, número telefónico/WhatsApp, dirección de envío y comprobantes de transferencia de Yappy.
        </p>

        <h3 className="text-lg font-bold text-gray-900 font-outfit">2. Propiedad de los Archivos de Diseño</h3>
        <p>
          Todos los archivos de arte, logotipos e imágenes subidas a nuestro cotizador o enviadas para impresión siguen siendo propiedad exclusiva del cliente. No comercializamos, cedemos ni reutilizamos tus diseños para otros fines.
        </p>

        <h3 className="text-lg font-bold text-gray-900 font-outfit">3. Seguridad en Pagos Yappy</h3>
        <p>
          No almacenamos información bancaria confidencial. Las transacciones se realizan directamente dentro de la aplicación Yappy y únicamente verificamos el número de referencia y captura del comprobante adjunto.
        </p>
      </div>
    </div>
  );
}
