import React from 'react';

export const metadata = {
  title: 'Términos y Condiciones — RufPixel.com',
  description: 'Términos y condiciones de uso y servicio de RufPixel.',
};

export default function TerminosPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900 font-outfit">Términos y Condiciones</h1>
      <p className="text-xs text-gray-500">Última actualización: 4 de agosto de 2026</p>

      <div className="prose prose-sm text-gray-700 space-y-4 leading-relaxed font-sans bg-white p-8 rounded-3xl border border-gray-200">
        <p>
          Bienvenido a <strong>RufPixel.com</strong>. Al utilizar nuestros servicios de impresión e e-commerce aceptas los siguientes términos de servicio.
        </p>

        <h3 className="text-lg font-bold text-gray-900 font-outfit">1. Proceso de Pago vía Yappy</h3>
        <p>
          Los pedidos quedarán en estado <em>"Pendiente de Validación"</em> hasta que un operador de RufPixel verifique la recepción efectiva del pago en la plataforma Yappy. La producción del material iniciará una vez confirmado el pago.
        </p>

        <h3 className="text-lg font-bold text-gray-900 font-outfit">2. Verificación de Artes Gráficas</h3>
        <p>
          El cliente es responsable de verificar la ortografía y resolución de los archivos enviados. RufPixel ofrece una revisión técnica preliminar, pero no se hace responsable por errores en el diseño original enviado por el cliente.
        </p>

        <h3 className="text-lg font-bold text-gray-900 font-outfit">3. Tiempos de Entrega</h3>
        <p>
          Los tiempos estándar de producción oscilan entre 24 a 48 horas hábiles contadas a partir de la confirmación del pago en Yappy y la aprobación del arte digital.
        </p>
      </div>
    </div>
  );
}
