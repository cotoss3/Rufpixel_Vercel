import { Product, Service, BlogPost } from './types';
import catalogData from './catalogData.json';

export const MOCK_SERVICES: Service[] = [
  {
    id: 'serv-grabados-laser',
    slug: 'grabados-laser',
    title: 'Grabados Láser de Alta Precisión & Personalización Premium',
    shortDesc: 'Grabado y marcado láser de máxima precisión sobre una amplia gama de materiales rígidos y orgánicos con acabados limpios e imborrables.',
    fullDesc: 'Ofrecemos un servicio de grabado y marcado láser de máxima precisión, diseñado para plasmar logotipos, nombres, vectores e ilustraciones personalizadas sobre una amplia gama de materiales rígidos y orgánicos. Utilizando tecnología láser de punta, garantizamos acabados limpios, permanentes e imborrables que elevan la calidad estética y el valor percibido de tus productos, regalos ejecutivos o material publicitario.',
    iconName: 'Sparkles',
    image: '/images/banners/banner-grabados-laser.webp',
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
    image: '/images/banners/banner-gran-formato.webp',
    features: [
      'Lona Mesh y Lona Baner de 13oz',
      'Estructuras Roll-Up y banner arañas.',
      'Vinil adhesivos y Microperforados',
      'Rotulaciones Comerciales',
      'Letreros Publicitarios.'
    ]
  },
  {
    id: 'serv-dtf-textil',
    slug: 'dtf-textil',
    title: 'Impresión DTF Textil Directo',
    shortDesc: 'Transfer textil digital por pliegos o yardas lineales de alta elasticidad, colores vibrantes y máxima resistencia al lavado.',
    fullDesc: 'El servicio de DTF Textil (Direct to Film) es la tecnología líder para estampado de prendas en Panamá. Permite transferir gráficos full color con base blanca sólida sobre cualquier tipo de tela (algodón, poliéster, mezclas o dril) sin necesidad de descarte ni cortes complejos. Perfecto para uniformes de empresas, marcas de ropa y eventos.',
    iconName: 'Printer',
    image: '/images/banners/banner-dtf.webp',
    features: [
      'Impresión por pliego A4 o yarda lineal continua.',
      'Tacto suave, elástico y alta durabilidad tras múltiples lavadas.',
      'Apto para telas claras y oscuras en algodón o sintéticos.'
    ]
  },
  {
    id: 'serv-uvdtf',
    slug: 'uv-dtf',
    title: 'Transfer UV DTF para Rígidos',
    shortDesc: 'Stickers de transferencia directa con relieve 3D táctil, barniz brillante y adherencia ultra fuerte sin calor.',
    fullDesc: 'La tecnología UV DTF revoluciona el marcaje de productos rígidos y promocionales. Combina tintas UV curadas instantáneamente con barniz transparente que genera un elegante relieve 3D. Se adhiere en frío por presión directa sobre termos de acero, tazas, acrílico, vidrio, madera y plástico sin necesidad de planchas térmicas.',
    iconName: 'Sparkles',
    image: '/images/banners/banner-uvdtf.webp',
    features: [
      'Relieve táctil 3D y acabado con barniz brillante protector.',
      'Aplicación en frío sin plancha ni calor directo.',
      'Resistente al agua, rozamiento diario y uso rudo en termos y tazas.'
    ]
  },
  {
    id: 'serv-bordados-computarizados',
    slug: 'bordados-computarizados',
    title: 'Bordados Computarizados & Ponchados',
    shortDesc: 'Bordado industrial de logotipos de alta definición en suéteres polo, gorras panamá, camisas de trabajo y uniformes.',
    fullDesc: 'Personalización textil mediante bordado computarizado industrial de máxima durabilidad y prestigio visual. Digitalizamos tu matriz o logotipo para reproducirlo con hilos de alta resistencia al desgaste y decoloración en gorras estructuradas, suéteres tipo polo, camisas tipo pescador, delantales y chalecos corporativos.',
    iconName: 'Shirt',
    image: '/images/banners/banner-bordados.webp',
    features: [
      'Digitalización y conversión de logotipos a matriz de bordado.',
      'Bordado frontal en gorras modelo Panamá 7 y clásicas.',
      'Acabado elegante e indestructible para uniformes corporativos.'
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
      'Afiches publicitarios de alto impacto',
      'Volantes en papel satinado de 80 y 100 lbs',
      'Talonarios de factura y notas de entrega'
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

