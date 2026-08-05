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
  // Bolígrafos y Plumas
  {
    id: 'prod-boligrafos-1',
    slug: 'boligrafos-metalicos-ejecutivos-50u',
    name: 'Pack 50 Bolígrafos Metálicos Ejecutivos con Logo',
    price: 95.00,
    regularPrice: 110.00,
    shortDescription: 'Bolígrafos metálicos de giro con grabado láser o serigrafía de tu marca.',
    description: 'Bolígrafo ejecutivo de cuerpo metálico mate con clip cromado. Tinta azul o negra indeleble de escritura suave.',
    category: 'Bolígrafos y Plumas',
    categorySlug: 'boligrafos-y-plumas',
    categories: [{ id: '2', name: 'Bolígrafos y Plumas', slug: 'boligrafos-y-plumas' }],
    image: 'https://images.unsplash.com/photo-1585336261026-875a60a1c96b?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1585336261026-875a60a1c96b?q=80&w=1000&auto=format&fit=crop'],
    stock: 100,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Color', options: ['Negro Matte', 'Plateado', 'Azul Marino'] }]
  },

  // Bolsas y Totes
  {
    id: 'prod-bolsas-1',
    slug: 'tote-bag-algodon-ecologico-50u',
    name: 'Pack 50 Tote Bags de Algodón Ecológico 100% Personalizadas',
    price: 135.00,
    regularPrice: 150.00,
    shortDescription: 'Bolsas ecológicas de algodón crudo lavable con estampado serigráfico full color.',
    description: 'Bolsas reutilizables para eventos, marcas de moda e institucionales. Asas reforzadas de 65cm ideales para hombro.',
    category: 'Bolsas y Totes',
    categorySlug: 'bolsas-y-totes',
    categories: [{ id: '3', name: 'Bolsas y Totes', slug: 'bolsas-y-totes' }],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop'],
    stock: 80,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Color', options: ['Algodón Natural', 'Negro', 'Beige'] }]
  },

  // Botellas y Termos
  {
    id: 'prod-botellas-1',
    slug: 'termo-acero-inoxidable-termico-50u',
    name: 'Pack 50 Termos de Acero Inoxidable (500 ml)',
    price: 245.00,
    regularPrice: 280.00,
    shortDescription: 'Botellas térmicas de doble pared al vacío. Mantiene frío 24h y caliente 12h.',
    description: 'Termo reutilizable de acero inoxidable de grado alimentario 18/8. Grabado láser de alta fidelidad con tu logo corporativo.',
    category: 'Botellas y Termos',
    categorySlug: 'botellas-y-termos',
    categories: [{ id: '4', name: 'Botellas y Termos', slug: 'botellas-y-termos' }],
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop'],
    stock: 60,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Color', options: ['Negro Mate', 'Blanco', 'Acero'] }]
  },

  // Vasos y Tazas
  {
    id: 'prod-vasos-1',
    slug: 'tazas-ceramica-blanca-350ml-50u',
    name: 'Pack 50 Tazas de Cerámica Blanca (11 oz / 325 ml)',
    price: 120.00,
    regularPrice: 140.00,
    shortDescription: 'Tazas publicitarias de cerámica brillante aptas para microondas y lavavajillas.',
    description: 'Impresión por sublimación digital full color de alta nitidez sin límite de tonos. Calidad fotográfica.',
    category: 'Vasos y Tazas',
    categorySlug: 'vasos-y-tazas',
    categories: [{ id: '13', name: 'Vasos y Tazas', slug: 'vasos-y-tazas' }],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop'],
    stock: 90,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Color', options: ['Blanca Clásica', 'Interior Negro', 'Interior Naranja'] }]
  },

  // Libretas y Cuadernos
  {
    id: 'prod-libretas-1',
    slug: 'libreta-cuero-ecologico-50u',
    name: 'Pack 50 Libretas Ejecutivas A5 de Cuerina con Elástico',
    price: 175.00,
    regularPrice: 195.00,
    shortDescription: 'Libretas tamaño A5 con portada de cuero sintético, elástico separador y cinta marcadora.',
    description: 'Cuaderno notas de 80 hojas de papel crema de 80g. Grabado en relieve o impresión UV de tu logo corporativo en portada.',
    category: 'Libretas y Cuadernos',
    categorySlug: 'libretas-y-cuadernos',
    categories: [{ id: '7', name: 'Libretas y Cuadernos', slug: 'libretas-y-cuadernos' }],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop'],
    stock: 75,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Color', options: ['Negro', 'Azul Noche', 'Marrón'] }]
  },

  // Llaveros
  {
    id: 'prod-llaveros-1',
    slug: 'llaveros-metalicos-acero-50u',
    name: 'Pack 50 Llaveros Metálicos Grabados con Logo',
    price: 85.00,
    regularPrice: 100.00,
    shortDescription: 'Llaveros metálicos con estuche individual y grabado láser inalterable.',
    description: 'Llaveros de aleación de zinc de alta resistencia con argolla reforzada. Regalo publicitario de gran recordación.',
    category: 'Llaveros',
    categorySlug: 'llaveros',
    categories: [{ id: '8', name: 'Llaveros', slug: 'llaveros' }],
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1000&auto=format&fit=crop'],
    stock: 120,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Estilo', options: ['Rectangular', 'Redondo'] }]
  },

  // Gorras y Accesorios de Cabeza
  {
    id: 'prod-gorras-1',
    slug: 'gorras-gabardina-bordadas-50u',
    name: 'Pack 50 Gorras Gabardina de Algodón con Bordado 3D',
    price: 195.00,
    regularPrice: 220.00,
    shortDescription: 'Gorras tipo beisbolera de 6 paneles con ajuste de hebilla metálica y bordado frontal.',
    description: 'Gorras corporativas de alta calidad textil. Bordado frontal de alta densidad con relieve para resaltar tu marca.',
    category: 'Gorras y Accesorios de Cabeza',
    categorySlug: 'gorras-y-accesorios-de-cabeza',
    categories: [{ id: '6', name: 'Gorras y Accesorios de Cabeza', slug: 'gorras-y-accesorios-de-cabeza' }],
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop'],
    stock: 50,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Color', options: ['Negro', 'Azul Marino', 'Rojo'] }]
  },

  // Textiles y Ropa
  {
    id: 'prod-textiles-1',
    slug: 'camisetas-polo-bordadas-50u',
    name: 'Pack 50 Camisetas Polo Piqué 100% Algodón Bordadas',
    price: 325.00,
    regularPrice: 360.00,
    shortDescription: 'Camisetas tipo Polo corporativas con bordado de logo en pecho.',
    description: 'Textil de 220g transpirable de excelente confección. Disponibles en corte de dama y caballero con cuello tejido reforzado.',
    category: 'Textiles y Ropa',
    categorySlug: 'textiles-y-ropa',
    categories: [{ id: '12', name: 'Textiles y Ropa', slug: 'textiles-y-ropa' }],
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop'],
    stock: 40,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Color', options: ['Negro', 'Blanco', 'Azul'] }]
  },

  // Cocina y Hogar
  {
    id: 'prod-cocina-1',
    slug: 'delantales-gabardina-cocina-50u',
    name: 'Pack 50 Delantales de Cocina en Gabardina con Estampado',
    price: 185.00,
    regularPrice: 210.00,
    shortDescription: 'Delantales gastronómicos ajustables con bolsillo frontal doble.',
    description: 'Delantal de gabardina de alta durabilidad para restaurantes, eventos culinarios y regalos promocionales de cocina.',
    category: 'Cocina y Hogar',
    categorySlug: 'cocina-y-hogar',
    categories: [{ id: '5', name: 'Cocina y Hogar', slug: 'cocina-y-hogar' }],
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop'],
    stock: 45,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Color', options: ['Negro', 'Rojo', 'Marrón'] }]
  },

  // Mochilas y Maletines
  {
    id: 'prod-mochilas-1',
    slug: 'mochila-ejecutiva-portatil-50u',
    name: 'Pack 50 Mochilas Ejecutivas para Laptop con Estampado',
    price: 495.00,
    regularPrice: 550.00,
    shortDescription: 'Mochila acolchada impermeable con compartimento para laptop de 15.6" y puerto USB.',
    description: 'Mochila corporativa de poliéster Oxford impermeable con varios bolsillos organizadores. Impresión de logo sutil y elegante.',
    category: 'Mochilas y Maletines',
    categorySlug: 'mochilas-y-maletines',
    categories: [{ id: '10', name: 'Mochilas y Maletines', slug: 'mochilas-y-maletines' }],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'],
    stock: 30,
    featured: true,
    attributes: [{ name: 'Cantidad', options: ['50', '100', '250'] }, { name: 'Color', options: ['Gris Oscuro', 'Negro'] }]
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
