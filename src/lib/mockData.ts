import { Product, Service, BlogPost } from './types';

export const MOCK_SERVICES: Service[] = [
  {
    id: 'serv-grabados-laser',
    slug: 'grabados-laser',
    title: 'Grabados Láser de Alta Precisión & Personalización Premium',
    shortDesc: 'Grabado y marcado láser de máxima precisión sobre una amplia gama de materiales rígidos y orgánicos con acabados limpios e imborrables.',
    fullDesc: 'Ofrecemos un servicio de grabado y marcado láser de máxima precisión, diseñado para plasmar logotipos, nombres, vectores e ilustraciones personalizadas sobre una amplia gama de materiales rígidos y orgánicos. Utilizando tecnología láser de punta, garantizamos acabados limpios, permanentes e imborrables que elevan la calidad estética y el valor percibido de tus productos, regalos ejecutivos o material publicitario.',
    iconName: 'Sparkles',
    image: '/images/banners/banner-grabados-laser.jpg',
    features: [
      'Detalles ultra finos, trazos delgados y microtextos sin alterar la integridad del producto base.',
      'Acabado Permanente e Imborrable.',
      'Flexibilidad para trabajar desde piezas unitarias exclusivas hasta grandes volúmenes para marcas o eventos corporativos.'
    ]
  },
  {
    id: 'serv-impresion-gran-formato',
    slug: 'impresion-gran-formato',
    title: 'Impresión Gran Formato & Banners',
    shortDesc: 'Soluciones publicitarias de gran impacto visual para interiores y exteriores resistentes al sol y la humedad de Panamá.',
    fullDesc: 'Soluciones publicitarias de gran impacto visual para interiores y exteriores. Utilizamos tintas solventes y eco-solventes de alta durabilidad resistentes al sol y la humedad de Panamá. Ideal para ferias, eventos comerciales, señaléctica corporativa y remodelación de fachadas.',
    iconName: 'Maximize2',
    image: '/images/banners/banner-gran-formato.jpg',
    features: [
      'Lona Mesh y Lona Baner de 13oz',
      'Estructuras Roll-Up y banner arañas.',
      'Vinil adhesivos y Microperforados',
      'Rotulaciones Comerciales',
      'Letreros Publicitarios.'
    ]
  },
  {
    id: 'serv-flyers-folletos',
    slug: 'flyers-y-folletos',
    title: 'Flyers & Folletos Publicitarios',
    shortDesc: 'Comunica tus ofertas y lanzamientos de forma directa e impactante. Imprimimos volantes en papel satinado de 80 y 100 lbs.',
    fullDesc: 'Comunica tus ofertas y lanzamientos de forma directa e impactante. Imprimimos volantes en papel satinado de 80 y 100 lbs. Perfectos para distribución en eventos masivos y material corporativo de ventas.',
    iconName: 'FileText',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Formatos Media Carta, Carta, Trípticos',
      'Afiches',
      'Volantes',
      'Saltarines Publicitarios'
    ]
  },
  {
    id: 'serv-material-promocional-pop',
    slug: 'material-promocional-pop',
    title: 'Material Promocional & POP Premium',
    shortDesc: 'Soluciones corporativas y exhibidores de Punto de Venta (POP) diseñados para destacar tu marca con acabados de alta fidelidad.',
    fullDesc: 'Impulsa el posicionamiento e impacto de tu marca con soluciones corporativas y exhibidores de Punto de Venta (POP) diseñados para destacar. Desarrollamos merchandising exclusivo, regalos ejecutivos y elementos de exhibición comercial con acabados de alta fidelidad que transmiten profesionalismo, elegancia y funcionalidad en cada evento, campaña o punto de venta.',
    iconName: 'Gift',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Variedad de Catálogo Corporativo: Amplia gama de artículos de merchandising (libretas, bolígrafos metálicos, termos, memorias USB y accesorios de oficina).',
      'Integración de marcas corporativas mediante grabado láser, tampografía, serigrafía y estampado digital según las necesidades del producto.',
      'Capacidad de respuesta y producción tanto para entregas corporativas exclusivas de bajo tiraje como para campañas masivas.'
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = [];

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
