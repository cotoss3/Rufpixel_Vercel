import { Product, Service, BlogPost } from './types';

export const MOCK_SERVICES: Service[] = [
  {
    id: 'serv-1',
    slug: 'tarjetas-de-presentacion',
    title: 'Tarjetas de Presentación Premium',
    shortDesc: 'Impresión de alta definición en papeles finos, con laminados mate, brillante, soft-touch o barniz UV sectorizado.',
    fullDesc: 'Destaca desde el primer contacto comercial con nuestras tarjetas corporativas de máxima calidad. Contamos con una amplia variedad de sustratos que van desde opalina 300g hasta cartulinas texturizadas ecológicas y plásticos durables. Opción de esquinas redondeadas, troquelados personalizados y detalles en pan de oro / plata.',
    iconName: 'CreditCard',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
    features: ['Papel Opalina 300g o Couclé 350g', 'Laminado Soft-Touch o Mate', 'Barniz UV Sectorizado', 'Corte Recto o Esquinas Redondeadas', 'Entrega rápida en 24-48 horas']
  },
  {
    id: 'serv-2',
    slug: 'impresion-gran-formato',
    title: 'Impresión Gran Formato & Banners',
    shortDesc: 'Banners en lona vinílica, viniles adhesivos para vitrinas, microperforados y estructuras en L o Roll-Up.',
    fullDesc: 'Soluciones publicitarias de gran impacto visual para interiores y exteriores. Utilizamos tintas solventes y eco-solventes de alta durabilidad resistentes al sol y la humedad de Panamá. Ideal para ferias, eventos comerciales, señaléctica corporativa y remodelación de fachadas.',
    iconName: 'Maximize2',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop',
    features: ['Lona Mesh y Lona Frontlit 13oz', 'Estructuras Roll-Up de Aluminio', 'Vinil Microperforado para vidrios', 'Ojales de bronce y bastillado reforzado', 'Impresión Full Color 1440 DPI']
  },
  {
    id: 'serv-3',
    slug: 'flyers-y-folletos',
    title: 'Flyers & Folletos Publicitarios',
    shortDesc: 'Volantes, dípticos y trípticos promocionales impresos a todo color en excelente resolución.',
    fullDesc: 'Comunica tus ofertas y lanzamientos de forma directa e impactante. Imprimimos volantes en papel glacé 115g, 150g o 200g con plegados precisos. Perfectos para buzoneo, eventos masivos y material corporativo de ventas.',
    iconName: 'FileText',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    features: ['Formatos Media Carta, Carta, Trípticos', 'Papel Glacé/Cuché 150g', 'Tirajes desde 100 hasta 50,000 unidades', 'Plegado automático de precisión', 'Calidad offset y digital rápida']
  },
  {
    id: 'serv-4',
    slug: 'stickers-y-etiquetas',
    title: 'Stickers Troquelados & Etiquetas',
    shortDesc: 'Adhesivos personalizados troquelados a la forma de tu logo en vinil impermeable o papel kraft.',
    fullDesc: 'Etiquetas para empaques de alimentos, botellas, packaging de envíos y stickers promocionales. Troquelado digital exacto sin necesidad de troqueles físicos costosos. Acabados mate, brillante o holográfico en vinil a prueba de agua.',
    iconName: 'Tag',
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?q=80&w=1000&auto=format&fit=crop',
    features: ['Vinil Blanco, Transparente u Holográfico', 'Resistentes al agua y refrigeración', 'Corte individual o en pliego', 'Aptos para envases y productos']
  },
  {
    id: 'serv-5',
    slug: 'material-promocional-pop',
    title: 'Material Promocional & POP',
    shortDesc: 'Gift cards, carpetas corporativas, talonarios, sellos y material personalizado para marcas.',
    fullDesc: 'Completa la identidad corporativa de tu empresa con carpetas institucionales con bolsillo, talonarios autocopiativos para facturación o entregas, gift cards en pvc rígido y bolígrafos / tazas impresas.',
    iconName: 'Gift',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    features: ['Carpetas institucionales con bolsillo', 'Talonarios Autocopiativos 2 o 3 vías', 'Gift Cards en PVC rígido tipo tarjeta de crédito', 'Diseño personalizado adaptado']
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    slug: 'tarjetas-premium-soft-touch-100u',
    name: 'Pack 100 Tarjetas de Presentación Soft-Touch',
    price: 25.00,
    regularPrice: 30.00,
    shortDescription: 'Tarjetas corporativas impresas a doble cara en Couclé 350g con acabado aterciopelado Soft-Touch.',
    description: 'Impresión offset digital de máxima nitidez. Incluye laminado Soft-Touch que brinda una textura suave tipo seda y mayor durabilidad contra dobleces y arañazos.',
    category: 'Tarjetas de Presentación',
    categorySlug: 'tarjetas',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 50,
    featured: true,
    attributes: [
      { name: 'Acabado', options: ['Soft-Touch Aterciopelado', 'Mate Clásico', 'Brillante UV'] },
      { name: 'Esquinas', options: ['Rectas', 'Redondeadas'] }
    ]
  },
  {
    id: 'prod-102',
    slug: 'banner-rollup-aluminio-85x200',
    name: 'Banner Roll-Up en Aluminio (85 x 200 cm)',
    price: 55.00,
    regularPrice: 65.00,
    shortDescription: 'Estructura retráctil de aluminio reforzado con lona impresas a 1440 DPI y estuche de transporte.',
    description: 'Ideal para exhibición rápida en eventos, conferencias y locales comerciales. La lona no se curva en las esquinas y se guarda fácilmente dentro de la base de aluminio.',
    category: 'Gran Formato',
    categorySlug: 'gran-formato',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 25,
    featured: true,
    attributes: [
      { name: 'Material Lona', options: ['Lona Anti-Curling 13oz', 'Lona Mate Premium'] }
    ]
  },
  {
    id: 'prod-103',
    slug: 'pack-500-flyers-media-carta',
    name: 'Pack 500 Flyers Media Carta (1/2 Carta)',
    price: 38.00,
    regularPrice: 45.00,
    shortDescription: '500 volantes full color a ambas caras en papel glacé de 150 gramos.',
    description: 'Imprime tus promociones con colores vibrantes y excelente definición de texto. Perfecto para promociones mensuales y difusión comercial.',
    category: 'Flyers & Folletos',
    categorySlug: 'flyers',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 100,
    featured: true,
    attributes: [
      { name: 'Impresión', options: ['Ambas Caras (4/4)', 'Una Sola Cara (4/0)'] }
    ]
  },
  {
    id: 'prod-104',
    slug: 'stickers-vinil-troquelados-100u',
    name: '100 Stickers Troquelados en Vinil Resistente',
    price: 22.00,
    regularPrice: 28.00,
    shortDescription: 'Stickers personalizados cortados a la silueta de tu diseño en vinil impermeabilizado.',
    description: 'Corte exacto mediante plotter digital. Resisten el lavaplatos, la intemperie y la fricción. Ideales para termos, laptops, packaging y regalos de marca.',
    category: 'Stickers & Etiquetas',
    categorySlug: 'stickers',
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?q=80&w=1000&auto=format&fit=crop'
    ],
    stock: 80,
    featured: true,
    attributes: [
      { name: 'Tamaño Aprox', options: ['5 x 5 cm', '7 x 7 cm', '10 x 10 cm'] },
      { name: 'Acabado Vinil', options: ['Brillante', 'Mate', 'Transparente'] }
    ]
  },
  {
    id: 'prod-105',
    slug: 'carpetas-corporativas-con-bolsillo-50u',
    name: '50 Carpetas Corporativas con Bolsillo Interior',
    price: 85.00,
    regularPrice: 95.00,
    shortDescription: 'Carpetas tamaño carta impresas a full color en Glacé 300g con ranura para tarjeta de presentación.',
    description: 'Presenta tus cotizaciones y contratos con elegancia. Incluye bolsillo ensamblado con ranura para sujetar tus tarjetas corporativas.',
    category: 'Promocional & POP',
    categorySlug: 'promocional',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    gallery: [],
    stock: 20,
    featured: false,
    attributes: [
      { name: 'Laminado', options: ['Mate Exterior', 'Brillante Exterior'] }
    ]
  },
  {
    id: 'prod-106',
    slug: 'gift-cards-pvc-100u',
    name: '100 Gift Cards / Tarjetas de Fidelización en PVC',
    price: 90.00,
    regularPrice: 110.00,
    shortDescription: 'Tarjetas plásticas rígidas tipo tarjeta de crédito impresas a todo color.',
    description: 'Tarjetas de regalo, membresías o pases VIP en PVC duradero. Puedes personalizar código de barras, numeración correlativa o panel de firma.',
    category: 'Promocional & POP',
    categorySlug: 'promocional',
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a458d?q=80&w=1000&auto=format&fit=crop',
    gallery: [],
    stock: 15,
    featured: false,
    attributes: [
      { name: 'Efectos Especiales', options: ['Sin Efecto', 'Banda Magnética Simular', 'Numeración Impresa'] }
    ]
  }
];

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
    slug: 'ventajas-del-laminado-soft-touch-en-tarjetas',
    title: '¿Qué es el acabado Soft-Touch y por qué revoluciona las tarjetas de presentación?',
    excerpt: 'El tacto es uno de los sentidos más potentes al hacer networking. Conoce cómo el laminado Soft-Touch le da un valor percibido de lujo a tu marca.',
    content: `<p>En un mundo saturado de tarjetas impresas en papeles delgados, la experiencia táctil se ha convertido en un diferenciador clave.</p>
    <p>El laminado <strong>Soft-Touch</strong> aplica una película microscópica que otorga una textura aterciopelada al tacto, similar a la piel de un melocotón o la gamuza fina.</p>
    <p>Además del aspecto táctil, este laminado protege el impreso de huellas dactilares, rayones ligeros y humedad, manteniendo tus tarjetas impecables en la billetera de tu cliente por meses.</p>`,
    category: 'Materiales & Acabados',
    categorySlug: 'materiales',
    date: '28 de Julio, 2026',
    author: 'Fernando (RufPixel)',
    readTime: '3 min de lectura',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
    tags: ['Soft-Touch', 'Tarjetas', 'Branding']
  },
  {
    id: 'post-3',
    slug: 'banners-rollup-vs-lona-simple-para-eventos',
    title: 'Roll-Up vs Lona Convencional: ¿Cuál elegir para tu próximo evento en Panamá?',
    excerpt: 'Comparamos costos, portabilidad y tiempos de montaje entre estructuras Roll-Up retráctiles y lonas con ojales tradicionales.',
    content: `<p>Al planificar tu presencia en una feria o evento corporativo en Panamá, la elección del material promocional en gran formato es decisiva.</p>
    <p>Los <strong>Banners Roll-Up</strong> ofrecen una presentación extremadamente profesional y se arman en menos de 30 segundos sin herramientas. Incluyen su propio estuche acolchado y protegen la gráfica durante el transporte.</p>
    <p>Por otro lado, las <strong>lonas con ojales</strong> son ideales para colgar en paredes externas, toldos o rejas donde el espacio vertical no cuenta con piso plano de apoyo.</p>`,
    category: 'Gran Formato',
    categorySlug: 'gran-formato',
    date: '15 de Julio, 2026',
    author: 'Equipo RufPixel',
    readTime: '5 min de lectura',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop',
    tags: ['Eventos', 'Banners', 'Publicidad']
  }
];

export const MOCK_TESTIMONIALS = [
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
