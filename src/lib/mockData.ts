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
    "image": "/images/services/bordados-computarizados-polo-panama.webp",
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
    "image": "/images/services/grabado-laser-termos-vasos-panama.webp",
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
    "metaTitle": "Impresión de Banners, Roll-Up y Gran Formato | RufPixel",
    "metaDesc": "Impresión de banners 13oz, Roll-Up, banderolas, backing publicitario y vinil adhesivo o esmerilado en Panamá. Pagos por Yappy y ACH. ¡Cotiza hoy!",
    "title": "Impresión de Banners en Gran Formato, Roll-Up, Banderolas y Viniles en Panamá",
    "shortDesc": "Lona banner 13oz con ojales, estructuras Roll-Up y Banner Araña, banderolas publicitarias, backing para eventos y vinil adhesivo, microperforado y esmerilado.",
    "fullDesc": "Producimos publicidad visual de gran formato resistente al sol y lluvia tropical de Panamá. Imprimimos lonas banner reforzadas de 13oz con ojales perimetrales, banderolas publicitarias tipo gota y vela con base para exterior, estructuras portátiles Roll-Up de aluminio y Banner Araña (X-Banner), backing publicitario, manteles impresos para mesas plegables de ferias y viniles para vidrieras (vinil adhesivo brillante/mate, microperforado homologado y vinil esmerilado para oficinas). Atendemos desde 1 estructura lista para tu evento hasta tirajes por metros cuadrados para agencias y cadenas comerciales en todo Panamá.",
    "iconName": "Maximize2",
    "image": "/images/banners/banner-gran-formato.webp",
    "detalFeatures": [
      "Estructuras Roll-Up, Banner Araña y Banderolas completas desde 1 unidad.",
      "Lonas banner de eventos, inauguraciones o alquiler/venta con ojales listos para colgar.",
      "Revisión gratuita de resolución y sangrado de tu archivo antes de imprimir."
    ],
    "wholesaleFeatures": [
      "Tarifas por volumen en m² y pie² para agencias, ferias y remodelaciones de locales.",
      "Combina tu stand (Roll-Up + Backing + Mantel) con artículos promocionales con logo.",
      "Facturación y despachos a Ciudad de Panamá, Panamá Oeste y provincias."
    ],
    "features": [
      "Lona banner 13oz de alta tenacidad con tintas ecosolventes/UV resistentes al exterior",
      "Roll-Up retráctil de aluminio (0.85x2.00m) y Banner Araña con bolso de transporte",
      "Banderolas publicitarias tipo Gota y Vela, Backing y Manteles para mesas de 6 pies",
      "Vinil adhesivo, microperforado para vidrios y papel/vinil esmerilado para oficinas"
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
    "image": "/images/services/papeleria-corporativa-libretas-panama.webp",
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
  },
  {
    "id": "serv-tomas-aereas-drones",
    "slug": "tomas-aereas-drones",
    "metaTitle": "Tomas Aéreas y Drones en Panamá en 4K | RufPixel",
    "metaDesc": "Servicio de tomas aéreas y video con drones en Panamá en 4K. Cobertura de eventos, bienes raíces y obras. Pagos por Yappy y ACH. ¡Cotiza por WhatsApp!",
    "title": "Tomas Aéreas y Grabación con Drones en Panamá",
    "shortDesc": "Fotografía y video aéreo en resolución 4K a 60fps para bienes raíces, avance de obras civiles, eventos corporativos y comerciales en Panamá.",
    "fullDesc": "Capturamos perspectivas aéreas de alto impacto para destacar proyectos residenciales, eventos corporativos, avance de obras civiles y producciones comerciales en Ciudad de Panamá, Panamá Oeste y provincias centrales. Operamos con drones profesionales equipados con sensores de video 4K a 60fps, perfiles planos D-Log para corrección de color y estabilización giroscópica de 3 ejes. Ofrecemos paquetes flexibles desde vuelos rápidos para terrenos hasta jornadas completas de grabación con entrega de archivos en bruto o reels editados listos para redes sociales.",
    "iconName": "Video",
    "image": "/images/services/tomas-aereas-drones-panama.webp",
    "detalFeatures": [
      "Vuelo puntual para fotografía de terrenos, casas o inspección de techos.",
      "Fotografías aéreas en alta resolución (RAW + JPEG) con retoque básico.",
      "Entrega rápida de archivos digitales en bruto por Google Drive o WeTransfer."
    ],
    "wholesaleFeatures": [
      "Jornadas de grabación media o completa para constructoras y eventos corporativos.",
      "Seguimiento periódico programado de avance de obra (mensual o quincenal).",
      "Video editado 4K con musicalización con derechos comerciales y factura fiscal panameña."
    ],
    "features": [
      "Grabación de video en 4K a 60fps con perfiles de color cinemático D-Log",
      "Estabilización giroscópica de 3 ejes para tomas fluidas sin vibraciones",
      "Cobertura en Ciudad de Panamá, Panamá Oeste y provincias centrales",
      "Operación responsable y cumplimiento de normativas de la AAC de Panamá"
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = catalogData as unknown as Product[];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'como-preparar-tus-archivos-para-impresion-sin-errores',
    title: 'Cómo preparar el logo para que se vea bien en un promocional o impresión',
    excerpt: 'Guía práctica en Panamá: diferencia entre CMYK y RGB, vectores en curvas (AI, PDF, EPS), sangrado y resolución mínima para grabados y DTF.',
    content: `<p>Uno de los problemas más frecuentes al encargar <a href="/articulos-promocionales-panama"><strong>artículos promocionales en Panamá</strong></a> o impresiones en gran formato es enviar logotipos descargados de WhatsApp o capturas de pantalla que pierden definición al ampliarse o grabarse. En <strong>RufPixel</strong> revisamos técnicamente tu archivo antes de producir, y con esta guía puedes prepararlo como un profesional.</p>
    <h2>1. Vectores en curvas vs imágenes de píxeles</h2>
    <p>Para técnicas de alta precisión como el <a href="/servicios/grabados-laser"><strong>grabado láser en metal y bambú</strong></a>, la serigrafía o el corte de vinil, el logotipo debe estar en formato vectorial (<strong>.AI, .EPS o .PDF editable</strong>) con todas las tipografías convertidas a curvas (<code>Ctrl+Shift+O</code> en Illustrator). Así las líneas quedan definidas a cualquier escala.</p>
    <h2>2. Modos de color: RGB vs CMYK y códigos Pantone</h2>
    <p>Las pantallas trabajan en <strong>RGB</strong> (luz), mientras que las prensas digitales, el <a href="/servicios/dtf-textil"><strong>DTF textil</strong></a> y el <a href="/servicios/uv-dtf"><strong>transfer UV DTF</strong></a> trabajan con pigmentos <strong>CMYK</strong> + tinta blanca. Diseña siempre en CMYK y a 300 DPI reales para evitar variaciones bruscas de tono.</p>
    <h2>3. ¿Quieres probar 1 sola pieza antes de tu lote mayorista?</h2>
    <p>En nuestra calculadora de <a href="/cotizador"><strong>Zona Pixel</strong></a> puedes cotizar pliegos sueltos de DTF, UV DTF o muestras unitarias antes de lanzar tu pedido corporativo de 50, 100 o 250 unidades.</p>`,
    category: 'Preparación de Archivos',
    categorySlug: 'consejos',
    date: '2 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: '/images/services/papeleria-corporativa-libretas-panama.webp',
    tags: ['Pre-prensa', 'CMYK', 'Vectores', 'Zona Pixel']
  },
  {
    id: 'post-2',
    slug: 'acabados-premium-en-tarjetas-de-presentacion',
    title: 'Tarjetas de Presentación y Papelería Corporativa en Panamá: Acabados que Venden',
    excerpt: 'Conoce el papel satinado de 100 lbs, laminado mate y barniz UV brillante para causar una primera impresión ejecutiva en tus reuniones.',
    content: `<p>En las reuniones de negocios y ferias comerciales en Panamá, entregar una tarjeta de presentación sólida sigue siendo el puente más rápido para cerrar una cotización. En nuestro servicio de <a href="/servicios/flyers-y-folletos"><strong>impresión de flyers, volantes y tarjetas de presentación en Panamá</strong></a> combinamos sustratos de alto gramaje con acabados limpios.</p>
    <h2>1. Gramaje firme y laminado protector</h2>
    <p>Trabajamos cartulinas y papeles satinados que resisten la humedad de Panamá sin doblarse en la billetera o tarjetero.</p>
    <h2>2. Combina tu papelería con agendas y plumas corporativas</h2>
    <p>Para ejecutivos de ventas y consultores, el complemento ideal de las tarjetas de presentación es contar con <a href="/tienda/libretas-y-cuadernos"><strong>agendas y libretas personalizadas en Panamá</strong></a> junto con <a href="/tienda/boligrafos-y-plumas"><strong>plumas metálicas grabadas a láser</strong></a>.</p>`,
    category: 'Papelería Corporativa',
    categorySlug: 'corporativo',
    date: '4 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '3 min de lectura',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop',
    tags: ['Tarjetas', 'Papelería', 'Branding']
  },
  {
    id: 'post-3',
    slug: 'rollup-vs-banner-arana-cual-elegir-para-tu-evento',
    title: 'Roll-Up Retráctil vs Banner Araña: ¿Cuál conviene más para tu evento o stand en Panamá?',
    excerpt: 'Analizamos medidas estándar (0.85x2.00m vs 0.80x1.80m), durabilidad, armado y cuándo combinarlos con banderolas y manteles publicitarios.',
    content: `<p>Cuando organizas la presencia de tu empresa en una feria, congreso o activación comercial en Panamá, la visibilidad del stand es fundamental. Dos de las estructuras portátiles más solicitadas en nuestro taller de <a href="/servicios/impresion-gran-formato"><strong>impresión de banners y gran formato en Panamá</strong></a> son el Banner Roll-Up de aluminio y la estructura tipo Araña (X-Banner).</p>
    <h2>1. Roll-Up Retráctil de Aluminio (0.85 × 2.00 metros)</h2>
    <p><strong>Ventajas:</strong> Su casete retráctil de aluminio anodizado enrolla y protege la gráfica durante el transporte, se arma en menos de 30 segundos sin herramientas y proyecta una imagen corporativa sólida en recepciones de hoteles, bancos y stands de ferias.</p>
    <h2>2. Banner tipo Araña o X-Banner (0.60 × 1.60 m y 0.80 × 1.80 m)</h2>
    <p><strong>Ventajas:</strong> Es una estructura ligera de fibra y aluminio que tensa la lona mediante 4 ojales en las esquinas. Resulta ideal cuando necesitas distribuir múltiples puntos visuales en sucursales o cambiar únicamente la lona impresa en cada promoción mensual.</p>
    <h2>3. ¿Cómo completar tu Stand de Feria en Panamá?</h2>
    <p>Para destacar frente a la competencia en centros de convenciones como Atlapa o el Panama Convention Center, recomendamos combinar tu Roll-Up con <strong>banderolas publicitarias tipo vela</strong>, <strong>manteles personalizados para mesas plegables</strong> y un lote de <a href="/articulos-promocionales-panama"><strong>artículos promocionales en Panamá</strong></a> (como bolígrafos, lanyards y bolsas reutilizables con tu logo).</p>`,
    category: 'Gran Formato',
    categorySlug: 'gran-formato',
    date: '5 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '5 min de lectura',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
    tags: ['Eventos', 'Banners', 'Roll-Up']
  },
  {
    id: 'post-4',
    slug: 'que-regalar-a-clientes-por-menos-de-3-dolares-panama',
    title: 'Qué regalar a tus clientes por menos de 3 dólares en Panamá (Compras al por Mayor)',
    excerpt: 'Ranking real de artículos promocionales útiles entre $0.45 y $2.95 USD por unidad en escalas de 50, 100 y 250 piezas con tu logotipo.',
    content: `<p>¿Tienes un presupuesto ajustado para una feria, apertura de sucursal o campaña de fin de año y necesitas maximizar la cantidad de impactos sin entregar algo que termine en la basura? En nuestro catálogo de <a href="/articulos-promocionales-panama"><strong>artículos promocionales en Panamá</strong></a> contamos con decenas de opciones por debajo de los <strong>$3.00 USD por unidad</strong> al pedir en escalas de 50, 100 o 250 piezas.</p>
    <h2>1. De $0.45 a $1.50 USD/ud: Bolígrafos personalizados y plumas metálicas</h2>
    <p>Dentro de la categoría de <a href="/tienda/boligrafos-y-plumas"><strong>bolígrafos personalizados en Panamá</strong></a> encontrarás desde lapiceros retráctiles y ecológicos en bambú por menos de $0.60/ud hasta plumas metálicas grabadas a láser con puntero táctil alrededor de $1.35–$1.50/ud.</p>
    <h2>2. De $1.10 a $1.90 USD/ud: Llaveros metálicos, destapadores y bolsas reutilizables</h2>
    <p>Los <a href="/tienda/llaveros"><strong>llaveros personalizados en Panamá</strong></a> (en metal, bambú o con destapador de botellas) y las <a href="/tienda/bolsas-y-totes"><strong>bolsas ecológicas y de manta sucia con logo</strong></a> se mantienen muy por debajo de los $3.00 USD y acompañan al cliente durante meses.</p>
    <h2>3. De $1.75 a $2.95 USD/ud: Libretas de bolsillo, tazas y porta celulares</h2>
    <p>Con menos de tres dólares por unidad también puedes entregar <a href="/tienda/libretas-y-cuadernos"><strong>libretas personalizadas de bolsillo</strong></a>, mugs de cerámica en <a href="/tienda/tazas-botellas-y-termos"><strong>tazas personalizadas en Panamá</strong></a> o soportes de escritorio para celular.</p>`,
    category: 'Guías de Compra B2B',
    categorySlug: 'promocionales',
    date: '6 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: '/images/services/grabado-laser-termos-vasos-panama.webp',
    tags: ['Presupuesto', 'Promocionales', 'Precios']
  },
  {
    id: 'post-5',
    slug: 'cuanto-cuesta-personalizar-100-boligrafos-en-panama',
    title: 'Cuánto cuesta personalizar 100 bolígrafos en Panamá: Precios y Técnicas',
    excerpt: 'Desglose real de precios para lotes de 50, 100 y 250 bolígrafos plásticos, ecológicos de bambú y metálicos grabados a láser en Panamá.',
    content: `<p>Una de las preguntas más frecuentes que recibimos de empresas, clínicas y organizadores de eventos es: <strong>¿cuánto cuesta personalizar 100 bolígrafos en Panamá?</strong> La respuesta depende del material del cuerpo del bolígrafo y de la técnica de marcado elegida.</p>
    <h2>1. Rango de precios reales por 100 unidades en RufPixel</h2>
    <ul>
      <li><strong>100 Bolígrafos plásticos o ecológicos en bambú:</strong> Entre <strong>$48.00 y $85.00 USD</strong> el paquete completo de 100 unidades ($0.48 a $0.85 por unidad).</li>
      <li><strong>100 Bolígrafos ejecutivos metálicos grabados a láser:</strong> Entre <strong>$135.00 y $195.00 USD</strong> el lote de 100 unidades ($1.35 a $1.95 por unidad), con un grabado permanente que no se borra jamás.</li>
    </ul>
    <h2>2. ¿Por qué conviene el tramo de 100 o 250 unidades?</h2>
    <p>En todas las fichas de nuestra categoría de <a href="/tienda/boligrafos-y-plumas"><strong>bolígrafos y plumas personalizadas en Panamá</strong></a> verás tres botones de escala: <strong>50, 100 y 250 unidades</strong>. Al pasar de 50 a 100 unidades obtienes un descuento automático del 5% en el costo unitario, y al subir a 250 unidades ahorras un 10% adicional.</p>`,
    category: 'Precios y Cotizaciones',
    categorySlug: 'promocionales',
    date: '7 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: '/images/services/papeleria-corporativa-libretas-panama.webp',
    tags: ['Bolígrafos', 'Precios', 'Panamá']
  },
  {
    id: 'post-6',
    slug: 'promocionales-para-feria-o-congreso-lista-y-cantidades',
    title: 'Promocionales para una feria o congreso en Panamá: Lista, cantidades y Stand',
    excerpt: 'Checklist completo para equipar tu stand en Atlapa, Panama Convention Center o ferias corporativas: desde Roll-Up y manteles hasta giveaways por nivel.',
    content: `<p>Participar con un stand en una feria comercial o congreso médico en Panamá implica competir por la atención de cientos de visitantes por hora. Para no quedarte sin material a mitad del segundo día ni malgastar presupuesto, te compartimos la fórmula de cantidades que recomendamos en nuestra guía de <a href="/articulos-promocionales-panama"><strong>artículos promocionales en Panamá</strong></a>.</p>
    <h2>1. Nivel Masivo (Rompehielos para tráfico de pasillo): 250 a 500 unidades</h2>
    <p>Ten siempre en el mostrador <a href="/tienda/boligrafos-y-plumas"><strong>bolígrafos personalizados con tu logo y teléfono</strong></a> y <a href="/tienda/bolsas-y-totes"><strong>bolsas ecológicas o de manta sucia</strong></a> donde el visitante guardará los folletos de toda la feria (convirtiéndose en publicidad ambulante para tu marca).</p>
    <h2>2. Nivel Prospecto Calificado (Quien deja sus datos): 50 a 100 unidades</h2>
    <p>Reserva debajo del mostrador <a href="/tienda/libretas-y-cuadernos"><strong>agendas y libretas personalizadas</strong></a>, <a href="/tienda/llaveros"><strong>llaveros metálicos grabados</strong></a> o <a href="/tienda/tazas-botellas-y-termos"><strong>tazas y vasos térmicos personalizados</strong></a> exclusivamente para los clientes potenciales con los que agendaste una reunión o cotización.</p>
    <h2>3. La gráfica del Stand: Roll-Up, Banderolas y Mantel Publicitario</h2>
    <p>Ningún promocional funciona si tu stand luce vacío. En nuestra división de <a href="/servicios/impresion-gran-formato"><strong>impresión de banners, Roll-Up y gran formato en Panamá</strong></a> producimos tus estructuras Roll-Up de aluminio, banderolas tipo vela, backing publicitario y manteles impresos para mesas plegables de 6 pies.</p>`,
    category: 'Ferias y Eventos',
    categorySlug: 'eventos',
    date: '8 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '5 min de lectura',
    image: '/images/banners/banner-gran-formato.webp',
    tags: ['Ferias', 'Congresos', 'Stands']
  },
  {
    id: 'post-7',
    slug: 'kit-de-bienvenida-para-nuevos-empleados-panama',
    title: 'Kit de bienvenida para nuevos empleados (Onboarding) en Panamá: Qué incluir',
    excerpt: 'Cómo armar un Welcome Kit corporativo memorable para recursos humanos en Panamá combinando termo, agenda, bolígrafo, lanyard y suéter.',
    content: `<p>El primer día de un colaborador define su sentido de pertenencia con la empresa. Cada vez más departamentos de Recursos Humanos en Panamá solicitan <a href="/regalos-corporativos-panama"><strong>regalos corporativos en Panamá</strong></a> enfocados en kits de bienvenida (<em>Welcome Kits</em> u <em>Onboarding Packs</em>).</p>
    <h2>Los 5 elementos esenciales de un Kit de Bienvenida en Panamá</h2>
    <ol>
      <li><strong>Hidratación en escritorio:</strong> Un termo de acero inoxidable o mug de nuestra línea de <a href="/tienda/tazas-botellas-y-termos"><strong>tazas, botellas y termos personalizados</strong></a>.</li>
      <li><strong>Toma de notas:</strong> Una libreta en cuero PU o bambú de <a href="/tienda/libretas-y-cuadernos"><strong>agendas y libretas personalizadas</strong></a> acompañada de una pluma metálica.</li>
      <li><strong>Identificación diaria:</strong> Una cinta institucional de <a href="/tienda/identificacion-y-correas"><strong>lanyards y cintas porta carnet en Panamá</strong></a>.</li>
      <li><strong>Vestimenta corporativa:</strong> Un polo bordado o camisa estilo Columbia de <a href="/tienda/textiles-y-ropa"><strong>suéteres personalizados y ropa corporativa</strong></a>.</li>
      <li><strong>Presentación:</strong> Puedes elegir estuches listos en <a href="/tienda/sets-y-regalos"><strong>sets ejecutivos y regalos</strong></a> o empacar todo dentro de una mochila porta laptop o tote bag de manta sucia.</li>
    </ol>`,
    category: 'Recursos Humanos B2B',
    categorySlug: 'corporativo',
    date: '8 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: '/images/services/grabado-laser-termos-vasos-panama.webp',
    tags: ['Onboarding', 'RRHH', 'Sets']
  },
  {
    id: 'post-8',
    slug: 'grabado-laser-uv-dtf-o-serigrafia-cual-conviene',
    title: 'Grabado láser, UV DTF o DTF textil: ¿Cuál conviene más para tus promocionales?',
    excerpt: 'Comparativa técnica de durabilidad, costo y acabado entre grabado láser de fibra, stickers UV DTF con relieve 3D e impresión DTF textil.',
    content: `<p>Elegir la técnica correcta de personalización es la diferencia entre un promocional que luce impecable durante años y uno cuyo logo se despega al mes. En el taller de <strong>RufPixel</strong> trabajamos las principales tecnologías modernas para <a href="/articulos-promocionales-panama"><strong>artículos promocionales en Panamá</strong></a>:</p>
    <h2>1. Grabado Láser (Acero inoxidable, aluminio, madera y bambú)</h2>
    <p>El <a href="/servicios/grabados-laser"><strong>grabado láser en Panamá</strong></a> no utiliza tinta: un haz láser talla directamente el metal o la madera. Es 100% permanente, elegante e indestructible, ideal para termos, plumas metálicas, llaveros y tablas de bambú.</p>
    <h2>2. Transfer UV DTF con Relieve 3D (Rígidos a todo color)</h2>
    <p>Cuando necesitas que tu logotipo conserve sus colores exactos o degradados sobre superficies duras (cerámica, plástico, acrílico, vidrio o cuadernos), el <a href="/servicios/uv-dtf"><strong>transfer UV DTF en Panamá</strong></a> deposita tinta curada con luz UV y barniz brillante con relieve tridimensional resistente al agua.</p>
    <h2>3. Impresión DTF Textil Directo (Telas, bolsas y ropa)</h2>
    <p>Para <a href="/tienda/bolsas-y-totes"><strong>bolsas de manta sucia y yute</strong></a>, paraguas, mochilas y suéteres, la <a href="/servicios/dtf-textil"><strong>impresión DTF textil en Panamá</strong></a> supera a la serigrafía tradicional al permitir diseños multicolores sin costo por pantallas y con elasticidad superior.</p>`,
    category: 'Técnicas de Taller',
    categorySlug: 'consejos',
    date: '9 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '5 min de lectura',
    image: '/images/banners/banner-uvdtf.webp',
    tags: ['Grabado Láser', 'UV DTF', 'DTF Textil']
  },
  {
    id: 'post-9',
    slug: 'termos-personalizados-materiales-y-que-marcado-aguantan',
    title: 'Termos personalizados en Panamá: Materiales, aislamiento y qué marcado aguantan',
    excerpt: 'Guía para elegir entre acero inoxidable de doble pared, aluminio y cerámica, y por qué el grabado láser es el rey para el clima panameño.',
    content: `<p>En el clima cálido y húmedo de Panamá, mantener el agua o el café a la temperatura correcta todo el día convierte a los termos en el regalo empresarial número uno. Antes de hacer tu pedido en nuestra categoría de <a href="/tienda/tazas-botellas-y-termos"><strong>tazas, vasos térmicos y termos personalizados en Panamá</strong></a>, revisa qué material se adapta mejor a tu audiencia:</p>
    <h2>1. Acero inoxidable de doble pared al vacío (Tumblers y Termos Térmicos)</h2>
    <p>Conservan el frío hasta por 12–18 horas y el calor por 6–8 horas sin condensar ("sudar") por fuera ni mojar los papeles del escritorio. Admiten <a href="/servicios/grabados-laser"><strong>grabado láser permanente</strong></a> que revela el acero brillante debajo del recubrimiento en polvo.</p>
    <h2>2. Botellas deportivas de aluminio y Tritán</h2>
    <p>Son más ligeras y económicas en escalas de 100 y 250 unidades, ideales para gimnasios, carreras corporativas, escuelas y activaciones al aire libre.</p>`,
    category: 'Guías de Producto',
    categorySlug: 'promocionales',
    date: '9 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: '/images/services/grabado-laser-termos-vasos-panama.webp',
    tags: ['Termos', 'Vasos Térmicos', 'Grabado Láser']
  },
  {
    id: 'post-10',
    slug: 'regalos-de-fin-de-ano-para-empresas-en-panama',
    title: 'Regalos de fin de año para empresas en Panamá: Qué pedir y cómo cotizar a tiempo',
    excerpt: 'Ideas de obsequios ejecutivos y navideños para clientes y colaboradores en Panamá: sets de vino, tablas de bambú, agendas y termos.',
    content: `<p>Entre octubre y diciembre se concentra la mayor demanda de <a href="/regalos-corporativos-panama"><strong>regalos corporativos en Panamá</strong></a>. Planificar tus obsequios de fin de año con anticipación te garantiza disponibilidad de colores corporativos y entregas sin estrés antes de las fiestas.</p>
    <h2>Los 4 regalos corporativos más pedidos a fin de año en Panamá</h2>
    <ul>
      <li><strong>Tablas de quesos y sets de vino en bambú:</strong> Disponibles en <a href="/tienda/cocina-y-hogar"><strong>artículos de madera, bambú y hogar</strong></a>, grabados a láser para que la familia de tu cliente los use en sus cenas de diciembre.</li>
      <li><strong>Agendas y cuadernos para el nuevo año:</strong> Explora <a href="/tienda/libretas-y-cuadernos"><strong>agendas y libretas personalizadas en Panamá</strong></a> en curpiel, corcho y bambú.</li>
      <li><strong>Vasos térmicos y termos grabados:</strong> Revisa los modelos en <a href="/tienda/tazas-botellas-y-termos"><strong>tazas, botellas y termos personalizados</strong></a>.</li>
      <li><strong>Estuches ejecutivos listos para entregar:</strong> Visita nuestra sección de <a href="/tienda/sets-y-regalos"><strong>sets ejecutivos y regalos corporativos</strong></a>.</li>
    </ul>`,
    category: 'Temporada Fin de Año',
    categorySlug: 'corporativo',
    date: '10 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: '/images/services/papeleria-corporativa-libretas-panama.webp',
    tags: ['Fin de Año', 'Regalos Corporativos', 'Bambú']
  },
  {
    id: 'post-11',
    slug: 'bolsas-ecologicas-con-logo-manta-sucia-yute-o-cambrel',
    title: 'Bolsas ecológicas con logo en Panamá: ¿Manta sucia, yute, canvas o cambrel?',
    excerpt: 'Conoce cómo llaman los compradores en Panamá a cada tela reutilizable y cuál elegir según tu presupuesto y el peso que soportará la bolsa.',
    content: `<p>En Panamá el comprador corporativo busca términos muy específicos al cotizar bolsas reutilizables. En nuestra categoría de <a href="/tienda/bolsas-y-totes"><strong>bolsas de manta sucia, yute, loncheras y totes en Panamá</strong></a> trabajamos los cuatro materiales principales:</p>
    <h2>1. Bolsa de Manta Sucia y Algodón Canvas</h2>
    <p>En Panamá llamamos <strong>manta sucia</strong> al lienzo de algodón crudo en tono beige natural con su textura orgánica característica. Es sumamente resistente, lavable y muy valorada en universidades, ferias del libro, boutiques y congresos.</p>
    <h2>2. Bolsas de Yute Natural</h2>
    <p>Fabricadas con fibra vegetal trenzada y fuelle amplio, las <strong>bolsas de yute con logo</strong> proyectan una estética eco-ejecutiva ideal para bancos, supermercados gourmet y regalos de fin de año.</p>
    <h2>3. Cambrel (Non-Woven) y Loncheras Térmicas</h2>
    <p>El cambrel termosellado es la alternativa más económica para repartir por cientos en ferias masivas, mientras que las <strong>loncheras térmicas personalizadas</strong> con interior de aluminio son el regalo favorito para empleados en empresas panameñas.</p>`,
    category: 'Guías de Producto',
    categorySlug: 'promocionales',
    date: '10 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: '/images/banners/banner-dtf.webp',
    tags: ['Manta Sucia', 'Yute', 'Bolsas Ecológicas']
  },
  {
    id: 'post-12',
    slug: 'gorras-con-logo-bordado-computarizado-o-dtf',
    title: 'Gorras con logo en Panamá: ¿Cuándo elegir bordado computarizado o DTF?',
    excerpt: 'Guía práctica para personalizar gorras Trucker de malla y gorras de algodón estructuradas para uniformes, agroindustria y eventos en Panamá.',
    content: `<p>Las <a href="/tienda/gorras-y-accesorios-de-cabeza"><strong>gorras personalizadas en Panamá</strong></a> son indispensables tanto para cuadrillas de trabajo y agroindustria como para torneos de pesca, golf y promociones de verano. ¿Cómo saber si debes bordarlas o estamparlas?</p>
    <h2>1. Cuándo elegir Bordado Computarizado</h2>
    <p>En gorras de 5 o 6 paneles de algodón peinado o dril, nuestro servicio de <a href="/servicios/bordados-computarizados"><strong>bordados computarizados en Panamá</strong></a> brinda un relieve tridimensional con hilos industriales que resiste años de sol y lavado rudo.</p>
    <h2>2. Cuándo elegir Impresión DTF en Gorras Trucker</h2>
    <p>En las <strong>gorras de malla estilo Trucker</strong> con panel frontal de espuma acolchada (foam) o cuando tu logotipo tiene letras diminutas y degradados fotográficos, la transferencia <a href="/servicios/dtf-textil"><strong>DTF textil</strong></a> logra una fidelidad milimétrica sin fruncir la espuma.</p>`,
    category: 'Textil y Bordados',
    categorySlug: 'consejos',
    date: '11 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: '/images/services/bordados-computarizados-polo-panama.webp',
    tags: ['Gorras', 'Bordados', 'Trucker']
  },
  {
    id: 'post-13',
    slug: 'promocionales-para-colegios-clinicas-y-bancos-panama',
    title: 'Artículos promocionales para colegios, clínicas y bancos en Panamá',
    excerpt: 'Qué piden las instituciones educativas, centros médicos y entidades financieras en Panamá: desde lanyards porta carnet hasta kits corporativos.',
    content: `<p>Cada sector institucional en Panamá tiene necesidades muy puntuales de identificación y recordación de marca. En nuestra página pilar de <a href="/articulos-promocionales-panama"><strong>artículos promocionales en Panamá</strong></a> agrupamos los productos más solicitados por estos tres sectores:</p>
    <h2>1. Colegios, Universidades y Academias</h2>
    <p>Solicitan principalmente <a href="/tienda/identificacion-y-correas"><strong>lanyards personalizados y cintas porta carnet</strong></a> para estudiantes y docentes, <a href="/tienda/tazas-botellas-y-termos"><strong>botellas deportivas y termos</strong></a> para regreso a clases, y <a href="/tienda/mochilas-y-maletines"><strong>mochilas y cangureras con escudo</strong></a>.</p>
    <h2>2. Clínicas, Hospitales, Laboratorios y Aseguradoras</h2>
    <p>Priorizan <a href="/tienda/boligrafos-y-plumas"><strong>bolígrafos personalizados</strong></a> para consultorios y mostradores, <a href="/tienda/bolsas-y-totes"><strong>loncheras térmicas y bolsas ecológicas</strong></a> para campañas de salud y <a href="/tienda/oficina-y-escritorio"><strong>porta celulares y accesorios de escritorio</strong></a> para médicos.</p>
    <h2>3. Bancos, Cooperativas y Financieras</h2>
    <p>Invierten en <a href="/tienda/libretas-y-cuadernos"><strong>agendas personalizadas en Panamá</strong></a>, <a href="/tienda/paraguas"><strong>paraguas corporativos con logo</strong></a> y sets ejecutivos para clientes empresariales.</p>`,
    category: 'Sectores B2B',
    categorySlug: 'corporativo',
    date: '11 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '4 min de lectura',
    image: '/images/services/papeleria-corporativa-libretas-panama.webp',
    tags: ['Colegios', 'Clínicas', 'Bancos']
  },
  {
    id: 'post-14',
    slug: 'que-pedir-cuando-necesitas-50-unidades-entrega-rapida',
    title: 'Qué pedir cuando necesitas 50 unidades con entrega rápida en Panamá',
    excerpt: 'Cómo resolver un evento corporativo próximo en Panamá eligiendo paquetes base de 50 unidades de rápida personalización en nuestro taller.',
    content: `<p>¿Te acaban de confirmar la participación de tu empresa en un evento la próxima semana y no necesitas 1.000 piezas, sino un lote ejecutivo de <strong>50 unidades</strong> bien presentado? En RufPixel todos nuestros <a href="/articulos-promocionales-panama"><strong>artículos promocionales en Panamá</strong></a> parten desde el tramo accesible de 50 unidades.</p>
    <h2>Los 3 productos más ágiles de producir en lotes de 50 unidades</h2>
    <ol>
      <li><strong>50 Libretas o Agendas con 50 Bolígrafos a juego:</strong> Revisa los modelos en stock en <a href="/tienda/libretas-y-cuadernos"><strong>agendas y libretas personalizadas</strong></a> y <a href="/tienda/boligrafos-y-plumas"><strong>bolígrafos personalizados</strong></a>.</li>
      <li><strong>50 Llaveros metálicos o destapadores grabados a láser:</strong> Disponibles en <a href="/tienda/llaveros"><strong>llaveros personalizados en Panamá</strong></a>.</li>
      <li><strong>50 Bolsas de manta sucia o cambrel estampadas en DTF:</strong> Visita <a href="/tienda/bolsas-y-totes"><strong>bolsas y totes personalizadas</strong></a>.</li>
    </ol>
    <p>Recuerda que los plazos se coordinan según el volumen y la técnica una vez aprobado tu boceto digital por WhatsApp al <strong>+507 6445-4084</strong>.</p>`,
    category: 'Pedidos Ágiles',
    categorySlug: 'promocionales',
    date: '11 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '3 min de lectura',
    image: '/images/services/grabado-laser-termos-vasos-panama.webp',
    tags: ['50 Unidades', 'Eventos', 'Promocionales']
  },
  {
    id: 'post-15',
    slug: 'vinil-adhesivo-microperforado-o-esmerilado-vidrieras-panama',
    title: 'Vinil adhesivo, microperforado o papel esmerilado: ¿Cuál elegir para los vidrios de tu negocio en Panamá?',
    excerpt: 'Guía completa para rotular fachadas de vidrio, oficinas y clínicas en Panamá: privacidad con vinil esmerilado, publicidad en microperforado y vinil adhesivo.',
    content: `<p>Las puertas y fachadas de vidrio de tu local comercial, clínica u oficina en Panamá son el espacio publicitario más valioso que tienes (y por el que no pagas alquiler extra). En nuestro servicio de <a href="/servicios/impresion-gran-formato"><strong>impresión de banners, viniles y gran formato en Panamá</strong></a> trabajamos tres soluciones distintas según necesites impacto visual, paso de luz o privacidad:</p>
    <h2>1. Papel o Vinil Esmerilado para Vidrios (Efecto Sandblasting)</h2>
    <p>Es el acabado satinado translúcido preferido en <strong>oficinas corporativas, salas de juntas, consultorios médicos y bancos en Panamá</strong>. Permite el paso de la luz natural pero impide que se vea nítidamente hacia adentro, brindando privacidad elegante. Se puede instalar liso, en franjas o troquelado con el logotipo de tu empresa en plotter de corte.</p>
    <h2>2. Vinil Microperforado para Vidrios (Visibilidad Unidireccional)</h2>
    <p>Gracias a sus microperforaciones calibradas con reverso negro, quien camina por fuera de tu local ve una gráfica publicitaria a todo color, mientras que quienes están dentro de la tienda u oficina conservan la vista hacia el exterior y reducen el calor solar.</p>
    <h2>3. Vinil Adhesivo Brillante o Mate (Bloqueo Total y Colores Vibrantes)</h2>
    <p>Cuando deseas cubrir por completo una pared lisa, mostrador, lámina de acrílico o vidriera con máxima saturación fotográfica, el vinil adhesivo impreso con tintas ecosolventes/UV de alta durabilidad es la elección ideal. Cotiza tus medidas directamente en nuestra sección de <a href="/servicios/impresion-gran-formato"><strong>gran formato y viniles en Panamá</strong></a>.</p>`,
    category: 'Gran Formato',
    categorySlug: 'gran-formato',
    date: '11 de Noviembre, 2026',
    author: 'Equipo RufPixel',
    readTime: '5 min de lectura',
    image: '/images/banners/banner-gran-formato.webp',
    tags: ['Vinil Adhesivo', 'Microperforado', 'Vinil Esmerilado']
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

