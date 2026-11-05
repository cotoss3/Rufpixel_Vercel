import { Product, Service, BlogPost } from './types';
import catalogData from './catalogData.json';

export const MOCK_SERVICES: Service[] = [
  {
    "id": "serv-bordados-computarizados",
    "slug": "bordados-computarizados",
    "metaTitle": "Bordados en Panamá al Por Mayor y Detal | RufPixel",
    "metaDesc": "Bordados de alta definición en polos, gorras y camisas de trabajo. Desde 1 unidad hasta volumen mayorista. Paga con Yappy y recibe en todo Panamá.",
    "title": "Bordados Computarizados en Panamá al Por Mayor y Detal",
    "shortDesc": "Bordamos suéteres tipo polo, gorras estructuradas y uniformes corporativos con hilos industriales de alta durabilidad que no pierden color.",
    "fullDesc": "Personalizamos tus prendas con matrices de ponchado computarizado de alta precisión. Reproducimos logotipos complejos, nombres corporativos y escudos sobre gorras modelo Panamá 7, suéteres polo, camisas tipo pescador/oxford, delantales y chalecos de seguridad. Si solo necesitas 1 suéter para ti o una muestra, te lo bordamos en Zona Pixel. Si requieres dotar a todo tu personal, aplicamos tarifas con escala de descuento por volumen y ponchado bonificado.",
    "iconName": "Shirt",
    "image": "/images/banners/banner-bordados.webp",
    "detalFeatures": [
      "Desde 1 sola pieza sin mínimos obligatorios.",
      "Ponchado y muestra previa aprobada antes de bordar.",
      "Ideal para emprendedores, muestras y uso personal."
    ],
    "wholesaleFeatures": [
      "Tarifas especiales para pedidos de 25, 50, 100 y 500+ piezas.",
      "Matrices de bordado bonificadas en pedidos mayoristas.",
      "Facturación fiscal y entregas corporativas en todo Panamá."
    ],
    "features": [
      "Hilos industriales resistentes al lavado rudo y sol tropical",
      "Bordado frontal y lateral en gorras estructuradas",
      "Digitalización y ponchado profesional de logotipos",
      "Entrega ágil y envíos a todo Panamá"
    ]
  },
  {
    "id": "serv-dtf-textil",
    "slug": "dtf-textil",
    "metaTitle": "Impresión DTF Textil en Panamá por Metros | RufPixel",
    "metaDesc": "Transfer DTF textil directo con base blanca sólida y colores vivos. Sin mínimos: pide desde 1 pliego o yardas al por mayor. Despachos a todo Panamá.",
    "title": "Impresión DTF Textil Directo en Panamá (Metros y Pliegos)",
    "shortDesc": "Transfer textil digital full color con base blanca de alta opacidad y máxima elasticidad. Pégalo en cualquier tela con tu plancha térmica.",
    "fullDesc": "La mejor tecnología de estampado textil en Panamá. Olvídate del vinil textil grueso que se cuartea o del descarte engorroso: el DTF (Direct to Film) reproduce degradados fotográficos, microtextos y líneas finas con tacto suave y gran elasticidad. Apto para algodón 100%, poliéster, dril o licra, tanto en telas claras como oscuras. Pide tus pliegos A4 sueltos o encarga yardas lineales continuas para producción masiva de tu marca de ropa o uniformes.",
    "iconName": "Printer",
    "image": "/images/banners/banner-dtf.webp",
    "detalFeatures": [
      "Pide desde 1 pliego A4 o medio metro para pruebas rápidas.",
      "Sin costo por número de colores ni cobro por plancha de corte.",
      "Listo para estampar con tu plancha térmica casera o taller."
    ],
    "wholesaleFeatures": [
      "Precio preferencial por yarda y metro lineal continuo para talleres.",
      "Rendimiento optimizado para marcas de ropa y uniformes.",
      "Entregas en rollos protegidos con despacho a todo el país."
    ],
    "features": [
      "Tacto suave, elástico y alta resistencia a más de 50 lavadas",
      "Base blanca sólida ultra opaca para telas negras o de color",
      "Compatible con algodón, poliéster, mezclas, canvas y dril",
      "Revisión y optimización técnica de tu archivo sin costo adicional"
    ]
  },
  {
    "id": "serv-uvdtf",
    "slug": "uv-dtf",
    "metaTitle": "Stickers UV DTF en Panamá: Relieve 3D | RufPixel",
    "metaDesc": "Personaliza termos, tazas y acrílico en frío sin plancha térmica. Relieve 3D con barniz brillante y adherencia ultra fuerte. Cotiza directo a WhatsApp.",
    "title": "Transfer UV DTF en Panamá: Stickers 3D para Superficies Rígidas",
    "shortDesc": "Calcomanías de transferencia directa en frío con relieve táctil 3D y barniz brillante curado UV. Pega tu logo en termos, vidrio y acrílico sin calor.",
    "fullDesc": "Revoluciona el marcaje de tus productos promocionales con la tecnología UV DTF. Generamos calcomanías de alta adherencia con tintas curadas instantáneamente por luz ultravioleta y un acabado con barniz protector transparente que crea un elegante efecto tridimensional al tacto. Se aplica en segundos por presión manual, sin necesidad de planchas térmicas ni hornos. Perfecto para termos de acero, tazas de cerámica, artículos de madera, estuches de plástico, acrílico y envases de vidrio.",
    "iconName": "Sparkles",
    "image": "/images/banners/banner-uvdtf.webp",
    "detalFeatures": [
      "Pide planchas de stickers desde 1 pliego para personalizar tus piezas.",
      "Fácil aplicación manual: desprende el film, presiona y retira.",
      "Excelente para regalos personalizados unitarios o prototipos."
    ],
    "wholesaleFeatures": [
      "Precios por pliegos múltiples al por mayor para empresas de promocionales.",
      "Marcaje masivo de termos y souvenirs sin riesgo de dañar el producto con calor.",
      "Ahorro sustancial en mano de obra y tiempos de armado."
    ],
    "features": [
      "Relieve táctil 3D con barniz brillante de alta durabilidad",
      "Adhesión ultra resistente al agua, grasa y rozamiento diario",
      "Aplicación en frío sobre metal, vidrio, cerámica, madera y acrílico",
      "Colores CMYK nítidos con base blanca y barniz localizado"
    ]
  },
  {
    "id": "serv-grabados-laser",
    "slug": "grabados-laser",
    "metaTitle": "Grabado Láser en Panamá: Termos y Metales | RufPixel",
    "metaDesc": "Personalización láser imborrable para termos Stanley, bolígrafos y regalos corporativos. Precios al detal y por lote para empresas. Envíos en Panamá.",
    "title": "Grabado y Marcado Láser de Precisión en Panamá",
    "shortDesc": "Marcado láser permanente e indestructible sobre acero inoxidable, aluminio, madera, cuero y acrílico. Detalles finos y logotipos corporativos.",
    "fullDesc": "El grabado láser es el estándar de máxima distinción y durabilidad para personalización corporativa y ejecutiva en Panamá. Mediante tecnología láser de fibra óptica y CO2, removemos microcapas superficiales para revelar el material base con una nitidez absoluta, garantizando que el grabado no se borre, no se despegue ni se deteriore con el uso intensivo ni el lavado. Grabamos desde 1 termo Stanley o botella individual hasta lotes de cientos de bolígrafos y libretas corporativas.",
    "iconName": "Sparkles",
    "image": "/images/banners/banner-grabados-laser.webp",
    "detalFeatures": [
      "Graba tu propio termo, vaso térmico o accesorio desde 1 pieza.",
      "Simulación digital previa para confirmar posición y tamaño del logo.",
      "Entrega rápida en taller para regalos y fechas especiales."
    ],
    "wholesaleFeatures": [
      "Tarifas preferenciales por lote para regalos corporativos de fin de año.",
      "Capacidad para tirajes de cientos o miles de piezas en tiempos pactados.",
      "Factura fiscal y control de calidad unitario antes de despachar."
    ],
    "features": [
      "Marcado limpio e imborrable que dura toda la vida útil del producto",
      "Microtextos, números de serie y vectores ultra definidos",
      "Apto para termos de acero, aluminio anodizado, madera, corcho y cuero",
      "Precisión milimétrica sin contacto mecánico ni desgaste de la pieza"
    ]
  },
  {
    "id": "serv-impresion-gran-formato",
    "slug": "impresion-gran-formato",
    "metaTitle": "Banners Roll-Up y Gran Formato en Panamá | RufPixel",
    "metaDesc": "Impresión de lonas banner 13oz, microperforados y estructuras Roll-Up de aluminio para ferias y eventos. Calidad resistente al exterior. Pide cotización.",
    "title": "Impresión en Gran Formato, Lonas y Banners Roll-Up en Panamá",
    "shortDesc": "Publicidad visual de gran impacto resistente al sol y lluvia de Panamá. Lona banner 13oz con ojales, vinil adhesivo, microperforado y Roll-Ups para eventos.",
    "fullDesc": "Haz visible tu marca con impresiones de gran escala que no se decoloran con el clima tropical de Panamá. Producimos lonas publicitarias reforzadas de 13oz con ojales perimetrales, microperforados para cristales de locales y vehículos, viniles adhesivos troquelados y estructuras portátiles Roll-Up de aluminio con estuche de lona. Si necesitas 1 banner para una inauguración o stand de feria, te lo entregamos listo para instalar; si eres agencia o cadena comercial, manejamos precios por volumen y metros cuadrados continuos.",
    "iconName": "Maximize2",
    "image": "/images/banners/banner-gran-formato.webp",
    "detalFeatures": [
      "Estructuras Roll-Up completas (impresión + estuche) desde 1 unidad.",
      "Lonas de cumpleaños, eventos o promociones temporales a medida.",
      "Revisión de resolución de imagen para evitar que salga pixelada."
    ],
    "wholesaleFeatures": [
      "Tarifas por volumen en m² para agencias de publicidad y remodelaciones.",
      "Despacho de lonas con refuerzo perimetral y ojales para cuadrillas de instalación.",
      "Envíos a proyectos en el interior y provincias centrales."
    ],
    "features": [
      "Lona banner reforzada de 13oz con tintas resistentes a rayos UV y lluvia",
      "Roll-Ups retráctiles de aluminio anodizado con bolso de transporte",
      "Viniles adhesivos brillantes, mate y microperforados para vidrieras",
      "Acabados con ojales de acero inoxidable y bolsillo para colgar"
    ]
  },
  {
    "id": "serv-flyers-folletos",
    "slug": "flyers-y-folletos",
    "metaTitle": "Flyers y Volantes en Panamá [Precios B2B] | RufPixel",
    "metaDesc": "Impresión digital de volantes satinados de 80 y 100 lbs, trípticos y afiches. Precios de imprenta por millares y tirajes cortos. Envíos a todo Panamá.",
    "title": "Impresión de Flyers, Volantes y Papelería Corporativa en Panamá",
    "shortDesc": "Impresión nítida en papel satinado brillante de 80 y 100 lbs. Volantes media carta, cartas, trípticos informativos y afiches para campañas efectivas.",
    "fullDesc": "Comunica las promociones y aperturas de tu negocio con material publicitario impreso en colores vivos y papel de excelente tacto. En RufPixel imprimimos volantes publicitarios, dípticos, trípticos corporativos, afiches y tarjetas de presentación con acabados de primera categoría. Ofrecemos tirajes cortos digitales para promociones puntuales sin inventario estancado, y producción masiva por millares con precios directos de imprenta para distribución masiva en Panamá.",
    "iconName": "FileText",
    "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    "detalFeatures": [
      "Tirajes cortos desde 100 o 250 volantes para probar promociones.",
      "Ideal para eventos locales, restaurantes, salones y nuevos negocios.",
      "Asesoría para ajustar sangrado y márgenes de corte antes de imprimir."
    ],
    "wholesaleFeatures": [
      "Precios de escala por millares (1.000, 2.500, 5.000+ unidades) con máximo ahorro.",
      "Papeles de 80 lbs y 100 lbs en acabado satinado o mate.",
      "Empacado en fajos etiquetados y listos para reparto."
    ],
    "features": [
      "Papel satinado de 80 lbs y 100 lbs con brillo o acabado mate",
      "Formatos Media Carta (5.5x8.5 pulgadas), Carta completa (8.5x11 pulgadas) y Trípticos plegados",
      "Impresión full color por una cara (tiro) o ambas caras (tiro y retiro)",
      "Cortes limpios y entrega puntual con envíos a todo Panamá"
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = catalogData as unknown as Product[];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'como-preparar-tus-archivos-para-impresion-sin-errores',
    title: 'Guía Definitiva: Cómo preparar tus archivos de diseño para impresión sin errores de color',
    excerpt: 'Descubre la diferencia entre CMYK y RGB, la importancia del sangrado (bleed) y cómo convertir fuentes a curvas para un resultado perfecto.',
    content: `<p>Uno de los problemas más comunes al enviar artes a la imprenta es encontrarse con variaciones de color no deseadas o imágenes pixeladas. En <strong>RufPixel</strong> queremos que tus proyectos queden exactamente como los imaginaste.</p>
    <h3>1. Modos de color: RGB vs CMYK</h3>
    <p>Las pantallas de las computadoras y celulares trabajan en <strong>RGB</strong> (Rojo, Verde, Azul), generando luz. Por el contrario, las impresoras profesionales utilizan <strong>CMYK</strong> (Cian, Magenta, Amarillo, Negro) usando pigmentos reales. Para evitar cambios drásticos en los tonos, configura tu archivo en modo CMYK desde el inicio.</p>
    <h3>2. Margen de Sangrado o Bleed</h3>
    <p>Agrega siempre 3 mm de sangrado por cada borde del diseño. Esto garantiza que al momento del guillotinado no queden filos blancos desalineados.</p>
    <h3>3. Convertir textos a curvas o contornos</h3>
    <p>Si envías un archivo editable en Illustrator o PDF, recuerda convertir todas las tipografías a curvas (Ctrl+Shift+O en Illustrator) para evitar sustituciones automáticas de tipografía.</p>`,
    category: 'Consejos de Impresión',
    categorySlug: 'consejos',
    date: '2 de Agosto, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    tags: ['Pre-prensa', 'CMYK', 'Diseño Gráfico', 'Tutorial']
  },
  {
    id: 'post-2',
    slug: 'acabados-premium-en-tarjetas-de-presentacion',
    title: 'Tarjetas de Presentación que Venden: Acabados Premium que Elevan tu Marca',
    excerpt: 'Conoce el laminado Soft-Touch, el barniz UV brillante localizado y el hot-stamping metálico para causar una primera impresión imborrable.',
    content: `<p>En el mundo empresarial, tu tarjeta de presentación sigue siendo uno de los puntos de contacto físico más relevantes. No se trata solo de entregar un papel con tus datos, sino de transmitir solidez y confianza en cuestión de segundos.</p>
    <h3>El poder del tacto: Laminado Soft-Touch</h3>
    <p>El acabado aterciopelado tipo Soft-Touch ofrece una experiencia táctil placentera que destaca inmediatamente frente a las tarjetas convencionales.</p>
    <h3>Brillo localizado (Spot UV)</h3>
    <p>Aplicar un barniz UV brillante exclusivamente sobre el logotipo o detalles clave genera un contraste elegante entre la superficie mate y las zonas reflectoras.</p>`,
    category: 'Papelería Corporativa',
    categorySlug: 'corporativo',
    date: '10 de Agosto, 2026',
    author: 'Equipo RufPixel',
    readTime: '3 min de lectura',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop',
    tags: ['Soft-Touch', 'Tarjetas', 'Branding']
  },
  {
    id: 'post-3',
    slug: 'rollup-vs-banner-arana-cual-elegir-para-tu-evento',
    title: 'Roll-Up Retráctil vs Banner Araña: ¿Cuál conviene más para tu evento o stand?',
    excerpt: 'Analizamos costos, durabilidad, facilidad de armado y portabilidad para que elijas la estructura publicitaria ideal para ferias.',
    content: `<p>Cuando organizas la presencia de tu empresa en una feria o evento corporativo en Panamá, la visibilidad es fundamental. Dos de las soluciones portátiles más populares son el Banner Roll-Up y la estructura tipo Araña.</p>
    <h3>Roll-Up Retráctil de Aluminio</h3>
    <p><strong>Ventajas:</strong> Su mecanismo retráctil protege la lona durante el transporte, se arma en menos de 30 segundos y ofrece una base elegante y estable con estuche de lona reforzado.</p>
    <h3>Banner tipo Araña (X-Banner)</h3>
    <p><strong>Ventajas:</strong> Es una opción sumamente económica y ligera, perfecta si cuentas con un presupuesto ajustado o necesitas renovar el arte con mucha frecuencia.</p>`,
    category: 'Gran Formato',
    categorySlug: 'gran-formato',
    date: '18 de Agosto, 2026',
    author: 'Equipo RufPixel',
    readTime: '5 min de lectura',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
    tags: ['Eventos', 'Banners', 'Publicidad']
  }
];

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
  googleVerified?: boolean;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Johaneth Amestoy',
    company: 'Reseña de Google Maps',
    quote: 'Excelente servicio, la atención es muy buena, recomendados 100%',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    googleVerified: true
  },
  {
    id: 't-2',
    name: 'Valentina G. Sanchez',
    company: 'Reseña de Google Maps',
    quote: 'Excelente trabajo muy impecable super recomendados 100%',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    googleVerified: true
  },
  {
    id: 't-3',
    name: 'Almacén de Cuadro',
    company: 'Reseña de Google Maps',
    quote: 'Excelente atención en sus productos y servicios',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    googleVerified: true
  },
  {
    id: 't-4',
    name: 'Fernando Balbontin',
    company: 'Reseña de Google Maps',
    quote: 'Trabajos de gran formato y acabados de primera calidad.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    googleVerified: true
  }
];

