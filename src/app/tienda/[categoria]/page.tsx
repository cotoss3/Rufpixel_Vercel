import React, { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getProducts, getCategories, resolveCategory, isProductInCategory } from '@/lib/woocommerce';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import ShopClientGrid from '@/components/shop/ShopClientGrid';
import { BreadcrumbListSchema, FAQPageSchema } from '@/components/seo/SchemaOrg';
import { Check, HelpCircle, Sparkles, ArrowRight, Layers, ShieldCheck } from 'lucide-react';

interface CategorySeoConfig {
  metaTitle: string;
  metaDesc: string;
  h1: string;
  subtitle: string;
  takeaways: string[];
  introParagraphs: string[];
  sections: { h2: string; body: string }[];
  relatedCategory?: { slug: string; anchor: string };
  faqs: { question: string; answer: string }[];
}

const CATEGORY_SEO_MAP: Record<string, CategorySeoConfig> = {
  'tazas-botellas-y-termos': {
    metaTitle: 'Tazas, Botellas y Termos Personalizados Panamá | RufPixel',
    metaDesc: 'Tazas personalizadas, vasos térmicos y termos al por mayor en Panamá desde 50 uds. Grabado láser y UV DTF. Pagos por Yappy y ACH. ¡Cotiza ahora!',
    h1: 'Tazas, Vasos Térmicos y Termos Personalizados en Panamá',
    subtitle: 'Catálogo mayorista de tazas de cerámica, botellas deportivas y vasos térmicos de acero inoxidable desde 50 unidades con grabado láser o UV DTF.',
    takeaways: [
      'Precios por escala directa en paquetes de 50, 100 y 250 unidades con descuento progresivo.',
      'Grabado láser permanente en termos de acero inoxidable y transfer UV DTF 3D a todo color en cerámica y rígidos.',
      'Cobertura nacional desde nuestro taller en La Chorrera hacia Ciudad de Panamá y provincias.',
      'Plazos de producción definidos según volumen y técnica tras la aprobación del boceto digital.'
    ],
    introParagraphs: [
      'Las tazas personalizadas y los termos corporativos son el artículo de mayor retención diaria en escritorios, oficinas y vehículos en Panamá. En RufPixel unificamos nuestro catálogo de hidratación para que puedas cotizar en línea desde tazas de cerámica clásicas para café hasta botellas deportivas de aluminio y vasos térmicos de doble pared aislada al vacío.',
      'A diferencia de impresiones superficiales que se desprenden con los primeros lavados, seleccionamos la técnica exacta según el material de cada envase: aplicamos grabado láser de fibra óptica sobre acero inoxidable (acabado imborrable) y calcomanías UV DTF con barniz en relieve 3D para logotipos policromáticos.'
    ],
    sections: [
      {
        h2: 'Vasos térmicos y termos al por mayor en Panamá (Acero Inoxidable)',
        body: 'Los vasos térmicos tipo tumbler de 20 oz y 30 oz y los termos con tapa hermética mantienen bebidas frías o calientes durante horas frente al clima panameño. Al pedir en escalas de 50, 100 o 250 unidades, obtienes un costo unitario mayorista altamente competitivo ideal para kits de bienvenida, aniversarios de empresa y regalos de fin de año.'
      },
      {
        h2: 'Tazas personalizadas con logo para oficinas, eventos y cafeterías',
        body: 'Contamos con mugs de cerámica brillante, tazas con base de corcho y modelos bicolor listos para marcaje corporativo. Antes de iniciar el tiraje en máquinas, nuestro equipo te envía una muestra digital con la proporción exacta de tu logotipo en el área de impresión.'
      }
    ],
    relatedCategory: { slug: 'bolsas-y-totes', anchor: 'bolsas ecológicas y loncheras térmicas personalizadas' },
    faqs: [
      {
        question: '¿Qué técnica dura más en un termo personalizado: grabado láser o UV DTF?',
        answer: 'En termos y vasos de acero inoxidable, el grabado láser es 100% permanente e indestructible porque remueve la microcapa de pintura revelando el metal base. Si tu logotipo exige degradados o varios colores exactos, recomendamos UV DTF curado con luz ultravioleta, resistente al agua y al lavado manual.'
      },
      {
        question: '¿Cuál es el pedido mínimo de tazas y termos al por mayor en Panamá?',
        answer: 'En el catálogo web mayorista trabajamos paquetes escalonados desde 50, 100 y 250 unidades. Si necesitas una cantidad menor o personalizar termos unitarios, puedes cotizar directamente en nuestra modalidad al detal vía WhatsApp al +507 6445-4084.'
      },
      {
        question: '¿Cómo se realizan los pagos y envíos de tazas y botellas corporativas?',
        answer: 'Aceptamos pagos directos vía Yappy Comercial y transferencias bancarias ACH en Panamá. Despachamos pedidos protegidos a Ciudad de Panamá, Panamá Oeste y todo el interior del país.'
      }
    ]
  },
  'boligrafos-y-plumas': {
    metaTitle: 'Bolígrafos y Plumas Personalizadas en Panamá | RufPixel',
    metaDesc: 'Bolígrafos personalizados y plumas de lujo grabadas en metal en Panamá desde 50 unidades. Precios por escala, Yappy y ACH. ¡Cotiza por WhatsApp!',
    h1: 'Bolígrafos Personalizados y Plumas con Logo en Panamá',
    subtitle: 'Desde bolígrafos promocionales para ferias masivas hasta plumas ejecutivas metálicas grabadas a láser en paquetes de 50, 100 y 250 unidades.',
    takeaways: [
      'El costo por impacto más rentable para ferias, congresos, clínicas, bancos y mostradores de atención.',
      'Modelos plásticos, ecológicos en bambú/cartón reciclado y plumas metálicas con puntero táctil.',
      'Escalas transparentes de 50, 100 y 250 unidades visibles al instante en cada ficha de producto.',
      'Pagos seguros por Yappy Comercial y transferencia ACH con facturación para empresas.'
    ],
    introParagraphs: [
      'Los bolígrafos personalizados en Panamá siguen siendo el rey de la activación comercial y la papelería corporativa por su utilidad inmediata y bajo costo unitario. En RufPixel disponemos de más de 20 modelos en stock que abarcan desde lapiceros retráctiles de alto rendimiento para eventos masivos hasta bolígrafos metálicos de acabado satinado o soft-touch.',
      'Cada modelo especifica su área de marcado en el barril o clip para garantizar que el nombre de tu empresa, teléfono o sitio web sea perfectamente legible sin correrse ni borrarse con el roce de la mano.'
    ],
    sections: [
      {
        h2: 'Bolígrafos de lujo y plumas ejecutivas grabadas a láser en metal',
        body: 'Cuando buscas distinguir a un cliente VIP, firmar contratos o armar un set corporativo de gerencia, nuestras plumas metálicas grabadas con láser de fibra ofrecen un acabado sobrio y permanente. Muchos modelos incluyen punta stylus capacitiva para pantallas móviles y estuche de presentación.'
      },
      {
        h2: 'Bolígrafos ecológicos de bambú y promocionales por mayor para ferias',
        body: 'Para congresos, universidades y campañas de sostenibilidad en Panamá, los bolígrafos con cuerpo de bambú natural o fibra de trigo proyectan una imagen responsable a un precio por unidad sumamente accesible en tramos de 100 y 250 piezas.'
      }
    ],
    relatedCategory: { slug: 'libretas-y-cuadernos', anchor: 'agendas y libretas personalizadas en Panamá' },
    faqs: [
      {
        question: '¿Cuánto cuesta personalizar 50, 100 o 250 bolígrafos en Panamá?',
        answer: 'En cada ficha de nuestro catálogo puedes alternar entre los botones de 50, 100 y 250 unidades para ver el precio unitario exacto (con descuentos desde menos de $1.00 USD por unidad según el modelo) y el total del paquete.'
      },
      {
        question: '¿Puedo combinar los bolígrafos con libretas para armar un kit corporativo?',
        answer: 'Sí. Es la combinación más solicitada para congresos y capacitaciones. Puedes agregar ambos productos al carrito o generar una cotización formal en PDF al instante.'
      },
      {
        question: '¿En qué formato debo enviar mi logo para imprimir en bolígrafos?',
        answer: 'Dado que el barril de un bolígrafo tiene una altura reducida (usualmente de 6 a 7 mm), recomendamos enviar tu logotipo o texto en curvas vectoriales (PDF, AI o EPS) para conservar una nitidez perfecta.'
      }
    ]
  },
  'textiles-y-ropa': {
    metaTitle: 'Suéteres Personalizados y Camisas en Panamá | RufPixel',
    metaDesc: 'Suéteres personalizados, camisas tipo Columbia bordadas y ropa corporativa al por mayor en Panamá desde 50 uds. DTF y bordado. Pagos Yappy y ACH.',
    h1: 'Suéteres Personalizados, Polos y Camisas Corporativas en Panamá',
    subtitle: 'Dotación textil empresarial, suéteres en algodón y dry-fit, abrigos y camisas estilo Columbia con bordado computarizado o impresión DTF textil.',
    takeaways: [
      'Terminología y tallaje adaptado al mercado panameño: suéteres cuello redondo, polos, dry-fit y camisas de trabajo.',
      'Doble tecnología en taller propio: Bordado computarizado de alta densidad e Impresión DTF textil full color.',
      'Precios escalonados por lote (50, 100 y 250 unidades) o estampado desde 1 pieza en Zona Pixel.',
      'Ideal para uniformes de personal, cuadrillas técnicas, eventos deportivos y promociones de marca.'
    ],
    introParagraphs: [
      'En Panamá la ropa corporativa y los suéteres personalizados deben resistir tanto el calor húmedo como el lavado frecuente sin que el logotipo se cuartee ni pierda color. En RufPixel combinamos prendas y accesorios textiles seleccionados con tecnología propia de estampado DTF y máquinas de bordado industrial.',
      'Ya sea que necesites equipar a tu equipo de ventas, vestir a los participantes de una carrera corporativa o entregar textiles promocionales a tus clientes, te asesoramos sobre qué técnica rinde mejor según el gramaje y composición de la tela.'
    ],
    sections: [
      {
        h2: 'Camisas tipo Columbia y polos bordados para uniformes en Panamá',
        body: 'Las camisas estilo Columbia (manga corta o larga con ventilación en espalda) y los suéteres tipo polo piqué son el estándar ejecutivo para ingenieros, supervisores, agroindustria y fuerza de ventas en Panamá. Recomendamos aplicar bordado computarizado en pecho y mangas para una presencia institucional impecable.'
      },
      {
        h2: 'Suéteres personalizados en algodón y Dry-Fit con impresión DTF',
        body: 'Para activaciones de marca, promociones y eventos al aire libre, los suéteres de algodón y las camisetas deportivas Dry-Fit estampadas con DTF textil permiten reproducir ilustraciones a todo color, fotografías y degradados con tacto ligero y máxima elasticidad.'
      }
    ],
    relatedCategory: { slug: 'gorras-y-accesorios-de-cabeza', anchor: 'gorras personalizadas y bordadas en Panamá' },
    faqs: [
      {
        question: '¿Qué conviene más para suéteres personalizados: bordado o DTF textil?',
        answer: 'Para camisas tipo Columbia, polos de cuello y chalecos corporativos, el bordado computarizado aporta mayor prestigio y durabilidad extrema. Para suéteres cuello redondo de algodón o Dry-Fit deportivo con diseños grandes o multicolores, el DTF textil es más fresco, elástico y económico.'
      },
      {
        question: '¿Tienen plazos de entrega para dotaciones de uniformes urgentes?',
        answer: 'Los plazos se establecen según el volumen del lote y la complejidad del ponchado o estampado una vez aprobada la muestra digital. Escríbenos por WhatsApp para validar disponibilidad inmediata en taller.'
      },
      {
        question: '¿Puedo pedir menos de 50 suéteres si mi empresa es pequeña?',
        answer: 'Sí. Aunque los precios de esta sección corresponden a paquetes mayoristas desde 50 unidades, a través de nuestro servicio de Bordados y DTF en Zona Pixel atendemos pedidos desde 1 sola prenda.'
      }
    ]
  },
  'llaveros': {
    metaTitle: 'Llaveros Personalizados en Panamá al por Mayor | RufPixel',
    metaDesc: 'Llaveros personalizados en Panamá desde 50 unidades en metal, acrílico y bambú con grabado láser o UV DTF. Precios por escala, Yappy y ACH.',
    h1: 'Llaveros Personalizados en Panamá al por Mayor',
    subtitle: 'Llaveros metálicos ejecutivos, destapadores promocionales, modelos en madera bambú y multifuncionales desde 50 unidades con tu logotipo.',
    takeaways: [
      'Uno de los artículos promocionales de mayor vida útil: acompaña las llaves del cliente todos los días.',
      'Opciones en metal cromado con grabado láser, bambú ecológico, cinta tejida y destapadores de aluminio.',
      'Precios mayoristas por escala en 50, 100 y 250 unidades con cotizador PDF inmediato.',
      'Excelente para concesionarios de autos, inmobiliarias, hoteles, ferreterías y eventos en Panamá.'
    ],
    introParagraphs: [
      'Los llaveros personalizados en Panamá representan una inversión inteligente cuando buscas visibilidad constante sin que el artículo sea desechado. Cada vez que tu cliente abre su casa, oficina o vehículo, tu marca está presente en su mano.',
      'En RufPixel contamos con llaveros metálicos de peso sólido para entregas inmobiliarias y automotrices, así como llaveros con destapador de botellas, linterna o acabado en bambú natural para campañas masivas y ferias.'
    ],
    sections: [
      {
        h2: 'Llaveros metálicos grabados a láser para inmobiliarias y automotriz',
        body: 'El grabado láser de fibra sobre llaveros de acero o aleación metálica garantiza que el logotipo no se borre con la fricción constante de las llaves en el bolsillo. Es el detalle preferido por promotoras de vivienda, arrendadoras de autos y talleres en Panamá.'
      },
      {
        h2: 'Llaveros destapadores y ecológicos en bambú para activaciones',
        body: 'Si buscas un promocional funcional para distribuidoras, restaurantes o eventos masivos, los llaveros con destapador integrado y los modelos en madera bambú ofrecen un precio por unidad muy bajo en lotes de 100 y 250 piezas.'
      }
    ],
    relatedCategory: { slug: 'boligrafos-y-plumas', anchor: 'bolígrafos personalizados con logo en Panamá' },
    faqs: [
      {
        question: '¿El logo en los llaveros metálicos se borra con el roce de las llaves?',
        answer: 'No cuando se trabaja con grabado láser en metal, ya que el láser talla directamente la superficie metálica en lugar de usar tinta superficial.'
      },
      {
        question: '¿Cuál es el mínimo de compra para llaveros promocionales?',
        answer: 'En catálogo mayorista el primer tramo inicia en 50 unidades, con descuentos automáticos al subir a 100 o 250 unidades.'
      }
    ]
  },
  'bolsas-y-totes': {
    metaTitle: 'Bolsas de Manta Sucia, Yute y Totes en Panamá | RufPixel',
    metaDesc: 'Bolsas de manta sucia, loncheras térmicas, bolsas de yute y canvas personalizadas en Panamá desde 50 uds. Impresión DTF con logo. ¡Cotiza hoy!',
    h1: 'Bolsas Ecológicas, Manta Sucia, Yute y Loncheras Personalizadas en Panamá',
    subtitle: 'Bolsas reutilizables tipo Tote Bag en manta sucia, algodón canvas, yute laminado, cambrel y loncheras térmicas con logo desde 50 unidades.',
    takeaways: [
      'Alineadas con la Ley 1 de 2018 de Panamá que promueve el uso de bolsas reutilizables en comercios y eventos.',
      'Variedad real de materiales buscados en Panamá: manta sucia, yute natural, canvas de alto gramaje y non-woven.',
      'Incluye subcategoría de loncheras térmicas corporativas para colaboradores y promociones.',
      'Estampado de gran formato a todo color mediante DTF textil de alta adherencia.'
    ],
    introParagraphs: [
      'Desde la entrada en vigor de la regulación contra bolsas plásticas en Panamá, las bolsas ecológicas personalizadas se convirtieron en vallas publicitarias ambulantes en supermercados, centros comerciales, ferias y oficinas. En RufPixel ofrecemos el surtido más completo de bolsas reutilizables y térmicas listas para estampar con la identidad visual de tu empresa.',
      'Gracias a nuestra tecnología de impresión DTF textil directo, puedes estampar logotipos desde un solo color hasta diseños fotográficos complejos sobre tejidos rústicos donde la serigrafía tradicional suele perder definición.'
    ],
    sections: [
      {
        h2: 'Bolsas de manta sucia, canvas y algodón personalizadas en Panamá',
        body: 'La bolsa de manta sucia (algodón crudo natural) y el canvas grueso son las favoritas de marcas de moda, universidades, librerías y congresos médicos en Panamá. Sus costuras reforzadas soportan catálogos pesados, laptops y compras diarias manteniendo el estampado intacto tras decenas de usos.'
      },
      {
        h2: 'Bolsas de yute y loncheras térmicas corporativas con logo',
        body: 'Las bolsas con fuelle de yute combinan elegancia rústica y resistencia superior para regalos gourmet y eventos ejecutivos. Por su parte, nuestras loncheras térmicas con interior insolado de aluminio son el regalo número uno para recursos humanos y bienestar laboral en empresas panameñas.'
      }
    ],
    relatedCategory: { slug: 'tazas-botellas-y-termos', anchor: 'termos y vasos térmicos personalizados en Panamá' },
    faqs: [
      {
        question: '¿Qué diferencia hay entre una bolsa de cambrel (non-woven) y una de manta sucia o canvas?',
        answer: 'El cambrel (non-woven) es más ligero y económico, ideal para repartir por cientos en ferias masivas. La manta sucia, el algodón canvas y el yute son tejidos naturales de mayor grosor y resistencia, percibidos como un regalo corporativo de mayor valor.'
      },
      {
        question: '¿Se pueden imprimir diseños a todo color sobre bolsas de yute o manta sucia?',
        answer: 'Sí. Utilizamos transferencia DTF textil con base blanca de alta opacidad que se funde sobre la fibra de la bolsa, logrando colores vibrantes incluso sobre tonos beige o yute natural.'
      }
    ]
  },
  'libretas-y-cuadernos': {
    metaTitle: 'Agendas y Libretas Personalizadas en Panamá | RufPixel',
    metaDesc: 'Agendas personalizadas, libretas corporativas y de bolsillo con logo en Panamá desde 50 unidades. Grabado láser y UV DTF. Pagos por Yappy y ACH.',
    h1: 'Agendas y Libretas Personalizadas en Panamá al por Mayor',
    subtitle: 'Libretas ejecutivas tipo cuero PU, cuadernos ecológicos de corcho y bambú, agendas corporativas y libretas de bolsillo desde 50 unidades.',
    takeaways: [
      'Cubiertas en polipiel (PU), corcho natural, bambú, cartón rígido reciclado y acabados soft-touch.',
      'Modelos con banda elástica, cinta separadora, porta bolígrafo e incluso cargador inalámbrico integrado.',
      'Personalización mediante grabado láser bajo relieve o impresión UV DTF a todo color.',
      'Descuentos por escala en paquetes de 50, 100 y 250 unidades para empresas e instituciones.'
    ],
    introParagraphs: [
      'En el mercado corporativo panameño, las agendas personalizadas y las libretas ejecutivas son indispensables para juntas directivas, congresos, capacitaciones, bancos y kits de bienvenida (onboarding) de nuevos empleados.',
      'En RufPixel seleccionamos cuadernos y libretas con encuadernación cosida o espiral doble O, hojas en color marfil o blanco de gramaje cómodo para escritura y cubiertas diseñadas específicamente para resaltar tu logotipo institucional.'
    ],
    sections: [
      {
        h2: 'Agendas personalizadas y libretas ejecutivas en cuero PU y corcho',
        body: 'Las libretas con cubierta de poliuretano (curpiel) o combinadas con corcho natural ofrecen una presencia ejecutiva de alto nivel. Al aplicar grabado láser o UV DTF en la portada, tu marca acompaña al cliente durante meses de reuniones y toma de notas.'
      },
      {
        h2: 'Libretas de bolsillo y cuadernos ecológicos con bolígrafo para eventos',
        body: 'Para seminarios, talleres y ferias comerciales donde se requiere practicidad, disponemos de libretas de bolsillo compactas y cuadernos ecológicos con bolígrafo a juego e inclusión de notas adhesivas (post-it).'
      }
    ],
    relatedCategory: { slug: 'boligrafos-y-plumas', anchor: 'bolígrafos y plumas personalizadas en Panamá' },
    faqs: [
      {
        question: '¿Cómo se personalizan las agendas y libretas de cuero sintético o bambú?',
        answer: 'En portadas de bambú, madera, corcho y cuero PU bicapa aplicamos grabado láser para un acabado elegante en bajo relieve. Si requieres tu logotipo con sus colores corporativos exactos, aplicamos impresión UV DTF con relieve brillante.'
      },
      {
        question: '¿Cuándo conviene pedir las agendas corporativas de fin de año en Panamá?',
        answer: 'Recomendamos cotizar y reservar tus lotes entre septiembre y noviembre para asegurar disponibilidad del modelo y color deseado antes del pico de demanda corporativa de diciembre.'
      }
    ]
  },
  'identificacion-y-correas': {
    metaTitle: 'Lanyards y Cintas Porta Carnet en Panamá B2B | RufPixel',
    metaDesc: 'Lanyards personalizados, cintas porta carnet y porta gafetes con logo en Panamá desde 50 unidades. Sublimación full color. Pagos por Yappy y ACH.',
    h1: 'Lanyards Personalizados y Cintas Porta Carnet en Panamá',
    subtitle: 'Correas porta gafetes, lanyards corporativos y accesorios de identificación para empresas, colegios, clínicas, ferias y eventos en Panamá.',
    takeaways: [
      'Indispensables para control de acceso en oficinas, hospitales, planteles educativos y acreditación de congresos.',
      'Mosquetones metálicos resistentes, hebillas de liberación rápida y porta carnets rígidos o flexibles.',
      'Impresión nítida del logotipo a lo largo de la cinta en paquetes desde 50, 100 y 250 unidades.',
      'Complemento directo de nuestros carnets PVC y estructuras de ferias.'
    ],
    introParagraphs: [
      'Los lanyards personalizados (también conocidos en Panamá como cintas porta carnet o cordones para gafetes) cumplen una doble función: identifican de forma segura a tu personal o asistentes y mantienen tu marca visible a la altura del pecho durante toda la jornada.',
      'En RufPixel proveemos correas y accesorios de identificación cómodos al cuello, con herrajes duraderos y acabados limpios para empresas privadas, entidades públicas y organizadores de eventos.'
    ],
    sections: [
      {
        h2: 'Cintas porta carnet y lanyards con logo para empresas y eventos',
        body: 'Personalizamos lanyards en escalas mayoristas de 50, 100 y 250 unidades para que equipes desde una oficina corporativa hasta una convención internacional en Ciudad de Panamá o provincias.'
      }
    ],
    relatedCategory: { slug: 'oficina-y-escritorio', anchor: 'accesorios de oficina y escritorio personalizados' },
    faqs: [
      {
        question: '¿Cuál es el pedido mínimo de lanyards personalizados en Panamá?',
        answer: 'Nuestros paquetes mayoristas en línea inician desde 50 unidades, con reducción de precio unitario en los tramos de 100 y 250 piezas.'
      }
    ]
  },
  'gorras-y-accesorios-de-cabeza': {
    metaTitle: 'Gorras Personalizadas y Bordadas en Panamá | RufPixel',
    metaDesc: 'Gorras personalizadas, gorras de malla Trucker y sombreros bordados con logo en Panamá desde 50 unidades. Precios por escala, Yappy y ACH.',
    h1: 'Gorras Personalizadas, Trucker de Malla y Bordadas en Panamá',
    subtitle: 'Gorras estructuradas en algodón y poliéster, gorras de malla estilo Trucker y viseras personalizadas con bordado computarizado o DTF.',
    takeaways: [
      'Modelos frescos y resistentes para el sol de Panamá: Trucker con malla trasera, 5 y 6 paneles en algodón.',
      'Personalización con bordado computarizado frontal/lateral o estampado DTF de alta definición.',
      'Precios por escala en paquetes de 50, 100 y 250 unidades para uniformes, agroindustria y eventos.',
      'Si necesitas desde 1 sola gorra bordada, puedes solicitarla en nuestra sección de Bordados Computarizados.'
    ],
    introParagraphs: [
      'En un país tropical como Panamá, las gorras personalizadas con logo son uno de los artículos promocionales y de dotación más agradecidos tanto por el personal de campo como por los clientes en eventos deportivos, ferias agropecuarias, regatas y activaciones al aire libre.',
      'Ofrecemos gorras con cierre ajustable, visera precurvada y paneles frontales firmes listos para recibir el escudo o logotipo de tu marca sin deformarse.'
    ],
    sections: [
      {
        h2: 'Gorras Trucker de malla y gorras bordadas con logo corporativo',
        body: 'Las gorras de malla tipo Trucker garantizan ventilación continua en exteriores, mientras que las gorras de algodón peinado son las preferidas para uniformes corporativos y merchandising premium con bordado industrial.'
      }
    ],
    relatedCategory: { slug: 'textiles-y-ropa', anchor: 'suéteres personalizados y camisas corporativas' },
    faqs: [
      {
        question: '¿Es mejor bordar o estampar en DTF las gorras personalizadas?',
        answer: 'En gorras de algodón estructuradas recomendamos el bordado computarizado por su relieve y prestigio. En gorras Trucker con frente de espuma (foam) o diseños con detalles muy pequeños y degradados, el DTF ofrece una definición exacta.'
      }
    ]
  },
  'oficina-y-escritorio': {
    metaTitle: 'Memorias USB y Accesorios de Oficina Panamá | RufPixel',
    metaDesc: 'Memorias USB corporativas, porta celulares y accesorios de escritorio con logo en Panamá desde 50 unidades. Precios por escala, Yappy y ACH.',
    h1: 'Memorias USB, Porta Celulares y Accesorios de Oficina en Panamá',
    subtitle: 'Artículos tecnológicos y de escritorio personalizados: memorias USB, soportes para celular, mouse pads, calculadoras y organizadores corporativos.',
    takeaways: [
      'Presencia permanente a centímetros de la pantalla del cliente en su jornada de trabajo.',
      'Incluye soportes para celular, accesorios tecnológicos y organizadores de escritorio.',
      'Paquetes mayoristas de 50, 100 y 250 unidades con marcaje UV DTF o grabado láser.',
      'Cotización formal en PDF en segundos para departamentos de compras y licitaciones.'
    ],
    introParagraphs: [
      'Los accesorios de oficina y escritorio mantienen tu marca frente a los ojos de tomadores de decisión durante las 8 horas laborales. En esta categoría agrupamos soluciones prácticas para el entorno de trabajo moderno en Panamá: soportes ergonómicos para celular, organizadores y gadgets corporativos.'
    ],
    sections: [
      {
        h2: 'Porta celulares, memorias USB y artículos de escritorio con logo',
        body: 'Cada accesorio cuenta con una superficie plana ideal para aplicar impresión UV DTF en relieve o grabado láser, asegurando que tu logotipo destaque en videoconferencias y escritorios ejecutivos.'
      }
    ],
    relatedCategory: { slug: 'libretas-y-cuadernos', anchor: 'agendas y libretas personalizadas en Panamá' },
    faqs: [
      {
        question: '¿Qué métodos de pago aceptan para compras de oficina al por mayor?',
        answer: 'Aceptamos pagos por Yappy Comercial y transferencia bancaria ACH en Panamá, emitiendo cotización formal y factura para tu empresa.'
      }
    ]
  },
  'cocina-y-hogar': {
    metaTitle: 'Artículos de Madera, Bambú y Hogar en Panamá | RufPixel',
    metaDesc: 'Artículos promocionales de madera, bambú, cocina y hogar personalizados con grabado láser en Panamá desde 50 unidades. Pagos por Yappy y ACH.',
    h1: 'Artículos Promocionales de Madera, Bambú, Cocina y Hogar en Panamá',
    subtitle: 'Tablas de quesos en bambú, sets de vino, portavasos, utensilios y accesorios para el hogar grabados a láser desde 50 unidades.',
    takeaways: [
      'Acabados naturales en madera y bambú ecológico de alta distinción para regalos empresariales.',
      'Grabado láser CO2 y fibra de alta precisión que resalta las vetas naturales de la madera.',
      'Escalas mayoristas de 50, 100 y 250 unidades con despacho a todo Panamá.'
    ],
    introParagraphs: [
      'Cuando buscas salir del promocional tradicional y entrar al hogar de tus clientes o colaboradores, la línea de madera, bambú y cocina ofrece calidez y permanencia. Desde tablas para picadas y quesos hasta portavasos y accesorios de mesa, el grabado láser sobre bambú produce un contraste orgánico inigualable.'
    ],
    sections: [
      {
        h2: 'Regalos en bambú y accesorios de cocina grabados a láser',
        body: 'Ideales para inmobiliarias (regalo de entrega de llaves), bancos, aseguradoras y obsequios ejecutivos de fin de año en Panamá.'
      }
    ],
    relatedCategory: { slug: 'sets-y-regalos', anchor: 'sets ejecutivos y regalos corporativos en Panamá' },
    faqs: [
      {
        question: '¿Cómo queda el logotipo grabado sobre artículos de madera y bambú?',
        answer: 'El grabado láser quema de forma controlada una microcapa de la madera o bambú, creando un bajo relieve permanente en tono tostado oscuro muy elegante.'
      }
    ]
  },
  'mochilas-y-maletines': {
    metaTitle: 'Mochilas y Maletines Personalizados en Panamá | RufPixel',
    metaDesc: 'Mochilas corporativas, maletines porta laptop y cangureras personalizadas con logo en Panamá desde 50 unidades. DTF y bordado. ¡Cotiza ahora!',
    h1: 'Mochilas Corporativas, Maletines y Cangureras Personalizadas en Panamá',
    subtitle: 'Mochilas porta laptop, maletines para congresos, bolsos deportivos y cangureras con el logo de tu empresa desde 50 unidades.',
    takeaways: [
      'Alto valor percibido para dotación de personal técnico, fuerza de ventas y kits de bienvenida.',
      'Compartimentos acolchados y tejidos resistentes con marcaje en DTF textil o bordado.',
      'Paquetes mayoristas en escalas de 50, 100 y 250 unidades.'
    ],
    introParagraphs: [
      'Las mochilas personalizadas y los maletines porta laptop son uno de los regalos corporativos más valorados por empleados, ingenieros y asistentes a congresos en Panamá. Combinan amplia capacidad de carga con un área frontal visible para posicionar tu marca en el transporte diario.'
    ],
    sections: [
      {
        h2: 'Mochilas porta laptop y cangureras promocionales al por mayor',
        body: 'Disponemos de mochilas ejecutivas, morrales deportivos y cangureras prácticas para eventos al aire libre y promociones de verano en Panamá.'
      }
    ],
    relatedCategory: { slug: 'bolsas-y-totes', anchor: 'bolsas ecológicas y loncheras térmicas en Panamá' },
    faqs: [
      {
        question: '¿Qué técnica utilizan para personalizar mochilas y cangureras?',
        answer: 'Dependiendo del tejido y bolsillo frontal, aplicamos transferencia DTF textil de alta resistencia al roce o bordado computarizado.'
      }
    ]
  },
  'paraguas': {
    metaTitle: 'Paraguas Personalizados con Logo en Panamá | RufPixel',
    metaDesc: 'Paraguas personalizados y sombrillas corporativas con logo en Panamá desde 50 unidades. Resistentes al viento y lluvia. Pagos por Yappy y ACH.',
    h1: 'Paraguas Personalizados y Sombrillas Corporativas en Panamá',
    subtitle: 'Paraguas plegables, automáticos y de golf personalizados con tu logotipo institucional para la temporada de lluvias en Panamá.',
    takeaways: [
      'El promocional de mayor impacto visual durante los 8 meses de temporada lluviosa en Panamá.',
      'Amplia área de impresión en gajos para que tu logotipo se vea a metros de distancia.',
      'Estructuras resistentes con mango ergonómico en lotes de 50, 100 y 250 unidades.'
    ],
    introParagraphs: [
      'Con más de ocho meses de lluvias al año en Panamá, un paraguas personalizado de buena estructura nunca se queda guardado en un cajón: sale a la calle en manos de tus clientes y proyecta tu marca en avenidas, estacionamientos y zonas bancarias.'
    ],
    sections: [
      {
        h2: 'Sombrillas y paraguas corporativos al por mayor con logo',
        body: 'Estampamos tu logotipo en uno o varios paneles del paraguas mediante transferencia textil impermeable resistente al agua y al plegado continuo.'
      }
    ],
    relatedCategory: { slug: 'bolsas-y-totes', anchor: 'bolsas impermeables y ecológicas con logo' },
    faqs: [
      {
        question: '¿El estampado del paraguas resiste la lluvia constante y el sol?',
        answer: 'Sí. Utilizamos transferencia textil especializada para nylon y poliéster impermeable que no se despega ni se decolora con la humedad.'
      }
    ]
  },
  'sets-y-regalos': {
    metaTitle: 'Sets Ejecutivos y Regalos Corporativos Panamá | RufPixel',
    metaDesc: 'Sets de regalo corporativos y kits de bienvenida personalizados con grabado láser en Panamá desde 50 unidades. Precios por escala, Yappy y ACH.',
    h1: 'Sets Ejecutivos y Regalos Corporativos Personalizados en Panamá',
    subtitle: 'Estuches de regalo empresariales listos para entregar con grabado láser o UV DTF en lotes de 50, 100 y 250 unidades.',
    takeaways: [
      'Presentación en caja de regalo lista para entregar a clientes VIP, directivos y colaboradores.',
      'Personalización de alta precisión en cada pieza del set mediante grabado láser o UV DTF.',
      'Precios mayoristas por escala con facturación y despacho en todo Panamá.'
    ],
    introParagraphs: [
      'Nuestros sets ejecutivos y regalos corporativos en Panamá están diseñados para causar una impresión memorable desde el momento en que se abre el estuche. Además de los sets prearmados de esta categoría, puedes combinar cualquier libreta, bolígrafo metálico y termo de nuestro catálogo para crear tu propio kit de bienvenida.'
    ],
    sections: [
      {
        h2: 'Kits de bienvenida (Onboarding) y regalos de fin de año para empresas',
        body: 'Coordina con nuestro equipo la personalización de cada elemento del set con tu logotipo y recíbelos listos para tus eventos corporativos o entregas de diciembre en Panamá.'
      }
    ],
    relatedCategory: { slug: 'tazas-botellas-y-termos', anchor: 'termos y vasos térmicos personalizados' },
    faqs: [
      {
        question: '¿Puedo armar un set personalizado combinando productos de otras categorías?',
        answer: 'Por supuesto. Muchos clientes combinan una agenda de la categoría Libretas, una pluma metálica y un vaso térmico. Puedes cotizarlos juntos en nuestro generador PDF o por WhatsApp.'
      }
    ]
  }
};

function buildFallbackCategoryTitle(catName: string): string {
  const clean = catName.trim();
  const candidate = `${clean} en Panamá al por Mayor | RufPixel`;
  if (candidate.length >= 50 && candidate.length <= 60) return candidate;
  if (candidate.length < 50) {
    const padded = `${clean} Personalizados en Panamá | RufPixel`;
    if (padded.length >= 50 && padded.length <= 60) return padded;
    return `${clean} al por Mayor en Panamá — RufPixel`.slice(0, 59);
  }
  return candidate.slice(0, 48) + ' | RufPixel';
}

function buildFallbackCategoryDescription(catName: string): string {
  const clean = catName.trim();
  const desc = `Compra ${clean.toLowerCase()} al por mayor en Panamá desde 50 unidades. Personalización con logo, plazos según volumen y pagos por Yappy y ACH. ¡Cotiza!`;
  if (desc.length >= 120 && desc.length <= 155) return desc;
  if (desc.length > 155) return desc.slice(0, 151) + '...';
  return (desc + ' Envíos a todo el país.').slice(0, 155);
}

export async function generateMetadata({ params }: { params: { categoria: string } }) {
  const categories = await getCategories();
  const def = resolveCategory(params.categoria);
  const canonicalSlug = def ? def.canonicalSlug : params.categoria;
  const activeCat = def
    ? categories.find((c) => c.slug === def.canonicalSlug || c.id === def.id)
    : categories.find((c) => c.slug === params.categoria);
  const catName = def ? def.name : (activeCat ? activeCat.name : params.categoria.replace(/-/g, ' '));

  const seoConfig = CATEGORY_SEO_MAP[canonicalSlug];
  const title = seoConfig ? seoConfig.metaTitle : buildFallbackCategoryTitle(catName);
  const description = seoConfig ? seoConfig.metaDesc : buildFallbackCategoryDescription(catName);
  const canonicalUrl = `https://rufpixel.com/tienda/${canonicalSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'RufPixel',
      locale: 'es_PA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CategoriaTiendaPage({ params }: { params: { categoria: string } }) {
  const def = resolveCategory(params.categoria);
  const canonicalSlug = def ? def.canonicalSlug : params.categoria;

  // Redirect non-canonical alias slugs permanently to the canonical SILO category URL
  if (def && params.categoria.toLowerCase() !== def.canonicalSlug) {
    redirect(`/tienda/${def.canonicalSlug}`);
  }

  const [{ products }, categories] = await Promise.all([
    getProducts('todos', 1, 500),
    getCategories(),
  ]);

  let catalogProducts = products && products.length > 0 ? products : MOCK_PRODUCTS;
  // If the category is not yet in the general catalog, fetch it directly and merge
  if (def && !catalogProducts.some((p) => isProductInCategory(p, canonicalSlug))) {
    const { products: catProducts } = await getProducts(canonicalSlug, 1, 500);
    if (catProducts && catProducts.length > 0) {
      catalogProducts = [...catProducts, ...catalogProducts];
    }
  }

  const activeCat = def
    ? categories.find((c) => c.slug === def.canonicalSlug || c.id === def.id)
    : categories.find((c) => c.slug === params.categoria);
  const catName = def ? def.name : (activeCat ? activeCat.name : params.categoria.replace(/-/g, ' '));
  const seoConfig = CATEGORY_SEO_MAP[canonicalSlug];

  const breadcrumbs = [
    { name: 'Inicio', url: 'https://rufpixel.com' },
    { name: 'Artículos Promocionales en Panamá', url: 'https://rufpixel.com/articulos-promocionales-panama' },
    { name: catName, url: `https://rufpixel.com/tienda/${canonicalSlug}` },
  ];

  return (
    <div className="py-10 space-y-10">
      <BreadcrumbListSchema items={breadcrumbs} />
      {seoConfig && <FAQPageSchema questions={seoConfig.faqs} />}

      {/* Category Header */}
      <section className="bg-[#0D0D0D] text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center space-x-2 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-[#FF5E14] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/articulos-promocionales-panama" className="hover:text-[#FF5E14] transition-colors">
              Artículos Promocionales en Panamá
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">{catName}</span>
          </nav>

          <div className="text-center space-y-3">
            <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3 py-1 rounded-md">
              Catálogo Mayorista en Panamá · Desde 50 Unidades
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit max-w-4xl mx-auto leading-tight">
              {seoConfig ? seoConfig.h1 : `${catName} Personalizados en Panamá`}
            </h1>
            <p className="text-gray-300 max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed">
              {seoConfig
                ? seoConfig.subtitle
                : 'Catálogo mayorista con precios por escala en 50, 100 y 250 unidades y personalización de alta resolución en Panamá.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Container with Instant Shop Client Grid Wrapped in Suspense */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="py-24 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-[#FF5E14] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-gray-500 font-outfit">Cargando productos de {catName}...</p>
          </div>
        }>
          <ShopClientGrid initialProducts={catalogProducts} categories={categories} activeCategorySlug={canonicalSlug} />
        </Suspense>
      </div>

      {/* Rich Semantic Guide, H2 Secondary Intents, Internal SILO Links & Category FAQs */}
      {seoConfig && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8">
            {/* Key Takeaways Box (Regla 9) */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 text-amber-900 font-extrabold uppercase tracking-wider text-xs">
                <Sparkles className="w-4 h-4 text-[#FF5E14]" />
                <span>Lo esencial sobre {catName} en RufPixel</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-gray-700">
                {seoConfig.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intro Narrative */}
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              {seoConfig.introParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Secondary Intent H2 Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {seoConfig.sections.map((sec, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-2.5">
                  <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 font-outfit">
                    {sec.h2}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* SILO Internal Linking Bar to Money Pillar & Related Category */}
            <div className="bg-[#0D0D0D] text-white rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-1.5 text-xs sm:text-sm text-gray-300">
                <div className="text-[#FF5E14] font-extrabold uppercase tracking-wider text-xs flex items-center space-x-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Guía de Compra Mayorista B2B</span>
                </div>
                <p className="leading-relaxed">
                  Esta línea forma parte de nuestro catálogo general de{' '}
                  <Link href="/articulos-promocionales-panama" className="text-white font-extrabold underline decoration-[#FF5E14] hover:text-[#FF5E14] transition-colors">
                    artículos promocionales en Panamá
                  </Link>
                  {seoConfig.relatedCategory && (
                    <>
                      . Muchos clientes corporativos complementan su pedido con{' '}
                      <Link href={`/tienda/${seoConfig.relatedCategory.slug}`} className="text-[#FF5E14] font-bold hover:underline">
                        {seoConfig.relatedCategory.anchor}
                      </Link>
                    </>
                  )}
                  {' '}o con estructuras portátiles de{' '}
                  <Link href="/servicios/impresion-gran-formato" className="text-gray-200 underline hover:text-[#FF5E14]">
                    banners, roll-up y gran formato para ferias
                  </Link>.
                </p>
              </div>
              <Link
                href="/articulos-promocionales-panama"
                className="shrink-0 bg-[#FF5E14] hover:bg-[#E04700] text-white px-5 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 shadow-md"
              >
                <span>Ver Guía y Precios de Promocionales</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Category Specific FAQs */}
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <div className="flex items-center space-x-2 text-[#FF5E14]">
                <HelpCircle className="w-5 h-5" />
                <h2 className="text-xl font-extrabold text-gray-900 font-outfit">
                  Preguntas Frecuentes sobre {catName} en Panamá
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {seoConfig.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
                    <h3 className="font-bold text-sm text-gray-900 font-outfit">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
