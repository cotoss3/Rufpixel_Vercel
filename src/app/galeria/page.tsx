'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Camera, Zap, ExternalLink, MessageCircle, ShoppingBag, Eye, X
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  imgTitle: string;
  alt: string;
  width: number;
  height: number;
  category: 'grabados' | 'gran-formato' | 'sets' | 'kits' | 'textiles';
  categoryLabel: string;
  image: string;
  description: string;
  materials: string;
  client: string;
  tags: string[];
}

const GALLERY_PROJECTS: ProjectItem[] = [
  {
    id: 'foto-11',
    title: 'Banderolas publicitarias tipo vela Stanley',
    imgTitle: 'Banderolas publicitarias para eventos y activaciones',
    alt: 'Banderolas publicitarias tipo vela con mástil y base para eventos exteriores en Panamá',
    width: 900,
    height: 1200,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banderolas',
    image: '/images/trabajos/banderolas-publicitarias-tipo-vela-eventos-panama.jpg',
    description: 'Impresión de banderolas publicitarias tipo vela en tela sublimada de alta tenacidad con mástil flexible de fibra y base de cruceta para eventos al aire libre.',
    materials: 'Tela bandera poliéster sublimada + Mástil articulado + Base de cruceta para exteriores',
    client: 'Activación de Marca Corporativa — Panamá',
    tags: ['Banderolas Publicitarias', 'Feather Flags', 'Eventos Exteriores', 'Gran Formato'],
  },
  {
    id: 'foto-12',
    title: 'Backing publicitario para eventos y ferias',
    imgTitle: 'Backing araña y mural fotográfico para ferias',
    alt: 'Backing publicitario telescópico para eventos corporativos y ferias en Panamá',
    width: 900,
    height: 1200,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banderolas',
    image: '/images/trabajos/backing-publicitario-para-eventos-y-ferias-panama.jpg',
    description: 'Estructura modular de backing telescópico para stands de ferias comerciales y fondos de prensa con lona mate anti-reflejo producida en taller RufPixel.',
    materials: 'Lona banner mate 13oz + Estructura metálica retráctil con bolso de transporte',
    client: 'Stands & Convenciones — Panamá',
    tags: ['Backing para Eventos', 'Mural de Prensa', 'Stands Comerciales', 'ATLAPA'],
  },
  {
    id: 'foto-13',
    title: 'Valla publicitaria en Costa Verde, Panamá Oeste',
    imgTitle: 'Gigantografía y valla publicitaria exterior',
    alt: 'Valla publicitaria de gran formato instalada en Costa Verde La Chorrera Panamá Oeste',
    width: 900,
    height: 1200,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banderolas',
    image: '/images/trabajos/valla-publicitaria-gigantografia-costa-verde-chorrera.jpg',
    description: 'Impresión y confección de lona para valla publicitaria residencial en gran formato con tintas UV resistentes a la intemperie tropical.',
    materials: 'Lona mesh y frontlight reforzada 13oz con costuras termoselladas y ojales',
    client: 'Proyecto Residencial Costa Verde — La Chorrera',
    tags: ['Vallas Publicitarias', 'Gigantografías', 'Panamá Oeste', 'La Chorrera'],
  },
  {
    id: 'foto-14',
    title: 'Termos grabados Autoridad Nacional de Descentralización (AND)',
    imgTitle: 'Termos de acero negro grabados AND con nombres individuales',
    alt: 'Termos térmicos negros con logo de la Autoridad Nacional de Descentralización y nombres individuales grabados a láser en Panamá',
    width: 900,
    height: 1200,
    category: 'grabados',
    categoryLabel: 'Grabados Láser & Termos',
    image: '/images/trabajos/agendas-ejecutivas-cuero-metro-de-panama-grabado-laser.jpg',
    description: 'Termos térmicos de acero inoxidable negro mate grabados a láser con el logo oficial de la Autoridad Nacional de Descentralización (AND) y nombres personalizados de colaboradores.',
    materials: 'Acero inoxidable 304 térmico + Grabado láser rotativo de alta definición',
    client: 'Autoridad Nacional de Descentralización (AND) — Dotación Institucional',
    tags: ['AND', 'Descentralización', 'Termos Grabados', 'Personalización Nominal', 'Regalos Institucionales'],
  },
  {
    id: 'foto-15',
    title: 'Bolígrafos metálicos rojos con grabado láser de nombres',
    imgTitle: 'Bolígrafos ejecutivos con personalización individual de nombres',
    alt: 'Bolígrafos metálicos de aluminio rojo con grip texturizado y nombres de colaboradores grabados a láser en Panamá',
    width: 900,
    height: 1200,
    category: 'grabados',
    categoryLabel: 'Bolígrafos & Grabados',
    image: '/images/trabajos/linternas-aluminio-banco-mercantil-grabado-laser-panama.jpg',
    description: 'Lote de bolígrafos ejecutivos de aluminio rojo con empuñadura facetada y grabado láser individual de nombres y códigos para reconocimiento de personal.',
    materials: 'Aluminio anodizado rojo con textura antideslizante + Marcado láser de fibra óptica',
    client: 'Dotación Corporativa con Personalización Nominal — Panamá',
    tags: ['Bolígrafos Metálicos', 'Grabado de Nombres', 'Reconocimiento de Personal', 'Merchandising B2B'],
  },
  {
    id: 'foto-16',
    title: 'Bolígrafos ejecutivos grabados Día del Docente APF-IPN',
    imgTitle: 'Bolígrafos con clip oro rosa grabados para Día del Docente',
    alt: 'Bolígrafos ejecutivos en colores surtidos con detalles oro rosa y grabado conmemorativo Feliz Día del Docente APF-IPN',
    width: 900,
    height: 1200,
    category: 'grabados',
    categoryLabel: 'Bolígrafos & Grabados',
    image: '/images/trabajos/botellas-aluminio-negras-grabadas-guess-panama.jpg',
    description: 'Colección de bolígrafos de aluminio en colores surtidos con herrajes en oro rosa y grabado láser conmemorativo para el Día del Docente.',
    materials: 'Aluminio con acabado suave y detalles rose gold + Grabado láser de precisión',
    client: 'APF-IPN — Conmemoración Día del Docente',
    tags: ['Día del Docente', 'Bolígrafos Ejecutivos', 'Grabado Láser', 'Regalos Institucionales'],
  },
  {
    id: 'foto-17',
    title: 'Termos grabados Contraloría General de Panamá',
    imgTitle: 'Termos cilíndricos con escudo grabado a láser',
    alt: 'Termos negros con escudo nacional grabado a láser para Contraloría General',
    width: 900,
    height: 1200,
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: '/images/trabajos/termos-deportivos-grabado-laser-contraloria-panama.jpg',
    description: 'Grabado del escudo oficial de la República de Panamá en alta resolución sobre termos cilíndricos térmicos de acero inoxidable.',
    materials: 'Acero inoxidable 304 doble pared al vacío + Grabado láser rotativo',
    client: 'Contraloría General de la República de Panamá',
    tags: ['Contraloría', 'Escudo de Panamá', 'Termos Térmicos', 'Grabado Láser'],
  },
  {
    id: 'foto-18',
    title: 'Vasos térmicos grabados Colegio Hebreo Unión 1980',
    imgTitle: 'Vasos térmicos cónicos azul eléctrico con grabado láser conmemorativo',
    alt: 'Vasos térmicos cónicos de acero azul brillante grabados a láser para el Colegio Hebreo Unión Sesentones Panamá',
    width: 900,
    height: 1200,
    category: 'grabados',
    categoryLabel: 'Vasos Térmicos & Grabados',
    image: '/images/trabajos/bolsas-ecologicas-cambrel-impresas-sterimar-panama.jpg',
    description: 'Vasos térmicos de acero inoxidable en acabado azul eléctrico brillante con grabado láser del escudo conmemorativo de promoción escolar.',
    materials: 'Acero inoxidable doble pared con recubrimiento brillante + Marcado láser rotativo',
    client: 'Colegio Hebreo Unión — Sesentones Panamá 2025',
    tags: ['Vasos Térmicos', 'Colegio Hebreo', 'Grabado Conmemorativo', 'Eventos Panamá'],
  },
  {
    id: 'foto-19',
    title: 'Set ejecutivo con libreta, bolígrafo y USB Casa de Dios Marazul',
    imgTitle: 'Set corporativo con agenda de broche magnético, pluma y memoria USB',
    alt: 'Set de regalo corporativo con libreta negra de broche magnético metálico, bolígrafo y memoria USB grabados Casa de Dios Marazul',
    width: 900,
    height: 1200,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/tazas-termicas-y-vasos-soft-botic-panama.jpg',
    description: 'Set ejecutivo premium compuesto por libreta de cuero PU con broche magnético metálico, bolígrafo a juego y memoria USB, todos personalizados con grabado láser a tono.',
    materials: 'Cuero PU texturizado con placa metálica + Bolígrafo metálico + USB ejecutiva + Grabado láser',
    client: 'Ministerio Internacional Casa de Dios Marazul',
    tags: ['Set Ejecutivo', 'Libreta con Broche', 'Bolígrafo Grabado', 'Memoria USB', 'Casa de Dios'],
  },
  {
    id: 'foto-20',
    title: 'Tazas térmicas para café grabadas Banco Mercantil',
    imgTitle: 'Mugs térmicas blancas con tapa hermética para café Banco Mercantil',
    alt: 'Tazas térmicas apilables de acero blanco con tapa hermética transparente y logo grabado de Banco Mercantil',
    width: 900,
    height: 1200,
    category: 'grabados',
    categoryLabel: 'Mugs & Vasos Térmicos',
    image: '/images/trabajos/scrubs-medicos-filipinas-bordadas-universidad-de-panama.jpg',
    description: 'Tazas térmicas de acero inoxidable blanco con base apilable, tapa transparente anti-derrames y grabado láser del logotipo de Banco Mercantil para colaboradores.',
    materials: 'Acero inoxidable blanco grado alimenticio + Tapa acrílica hermética + Grabado láser rotativo',
    client: 'Banco Mercantil — Dotación Corporativa',
    tags: ['Tazas para Café', 'Banco Mercantil', 'Mugs Térmicas', 'Grabado Láser', 'Merchandising B2B'],
  },
  {
    id: 'foto-21',
    title: 'Agendas ejecutivas en cuero Procuraduría General de la Nación',
    imgTitle: 'Agendas de cuero con escudo oficial grabado PGN Panamá',
    alt: 'Agenda ejecutiva de piel azul grabada en bajo relieve con el escudo de la Procuraduría General de la Nación Panamá',
    width: 900,
    height: 1200,
    category: 'sets',
    categoryLabel: 'Sets & Agendas',
    image: '/images/trabajos/agendas-ejecutivas-cuero-pgn-procuraduria-general-panama.jpg',
    description: 'Personalización de agendas ejecutivas en polipiel azul marino con termoestampado y grabado láser del escudo oficial de la Procuraduría General de la Nación.',
    materials: 'Cuero PU cosido al tono con separador de cinta + Grabado láser CO2 de alta precisión',
    client: 'Procuraduría General de la Nación (PGN) — Panamá',
    tags: ['PGN', 'Agendas Ejecutivas', 'Escudo Oficial', 'Regalos Institucionales'],
  },
  {
    id: 'foto-22',
    title: 'Kit de bienvenida residencial Arbú Costa Verde',
    imgTitle: 'Welcome kit residencial con termos y llavero acrílico',
    alt: 'Kit de bienvenida corporativo para entrega de llaves Arbú Costa Verde con 2 vasos térmicos y llavero',
    width: 900,
    height: 1200,
    category: 'kits',
    categoryLabel: 'Kits Corporativos & Welcome Packs',
    image: '/images/trabajos/kit-bienvenida-cerrado-arbu-costa-verde-termos-llavero-panama.jpg',
    description: 'Caja de presentación rígida para propietarios residenciales en Costa Verde, La Chorrera, incluyendo dos termos térmicos grabados, llavero acrílico y mousepad personalizado.',
    materials: 'Caja rígida con troquel interior + 2 vasos térmicos grabados a láser + Llavero acrílico de alta densidad',
    client: 'Arbú Residencial Costa Verde — Panamá Oeste',
    tags: ['Kit de Bienvenida', 'Costa Verde', 'Panamá Oeste', 'Bienes Raíces', 'Termos Grabados'],
  },
  {
    id: 'foto-23',
    title: 'Agenda ejecutiva grabada a láser Metro de Panamá',
    imgTitle: 'Grabado láser sobre agenda de cuero negro Metro de Panamá',
    alt: 'Agenda ejecutiva de cuero negro en máquina láser grabando el logo de Metro de Panamá y nombre Alberto',
    width: 900,
    height: 1200,
    category: 'sets',
    categoryLabel: 'Sets & Agendas',
    image: '/images/trabajos/paraguas-sombrillas-golf-personalizadas-panama.jpg',
    description: 'Grabado láser CO2 de precisión sobre agenda ejecutiva de cuero negro texturizado, con personalización del logo de Metro de Panamá y nombre nominal del directivo.',
    materials: 'Cuero sintético texturizado de alta densidad + Marcado láser CO2 en taller',
    client: 'Metro de Panamá — Dotación Ejecutiva',
    tags: ['Metro de Panamá', 'Agendas Ejecutivas', 'Grabado Láser en Taller', 'Personalización Nominal'],
  },
  {
    id: 'foto-24',
    title: 'Camisas Oxford corporativas con bordado de alta densidad',
    imgTitle: 'Bordados computarizados para camisas ejecutivas y uniformes',
    alt: 'Camisas ejecutivas tipo Oxford azul rey con bordado frontal computarizado para congreso empresarial',
    width: 900,
    height: 1200,
    category: 'textiles',
    categoryLabel: 'Bordados & Textiles',
    image: '/images/trabajos/camisas-oxford-uniformes-bordados-panama.jpg',
    description: 'Confección y bordado computarizado industrial en hilo Madeira de alta resistencia sobre camisas Oxford ejecutivas de manga larga.',
    materials: 'Tejido Oxford 60/40 algodón-poliéster + Bordado digital con estabilizador interior',
    client: 'Matrimonios con Propósito — Congreso Nacional',
    tags: ['Camisas Oxford', 'Bordados Computarizados', 'Uniformes Corporativos', 'Bordados Panamá'],
  },
  {
    id: 'foto-25',
    title: 'Marco photocall troquelado y rotulado en vinil Grease',
    imgTitle: 'Marco selfie de carro clásico troquelado en vinil para evento',
    alt: 'Marco photocall gigante troquelado en foamboard con forma de auto clásico rojo Grease rotulado en vinil para eventos en Panamá',
    width: 1200,
    height: 900,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: '/images/trabajos/boligrafos-metalicos-tribunal-electoral-panama.jpg',
    description: 'Marco fotográfico gigante (photocall selfie) troquelado con silueta de carro clásico de los años 50 para el musical Grease, rotulado en vinil adhesivo laminado de alta definición sobre base rígida.',
    materials: 'Foam board / coroplast troquelado con soporte trasero + Vinil adhesivo impreso y laminado mate',
    client: 'Producción para Eventos & Obras Musicales — Panamá',
    tags: ['Marco Photocall', 'Rotulado en Vinil', 'Grease Musical', 'Estructuras para Eventos', 'Troquelados'],
  },
  {
    id: 'foto-26',
    title: 'Activación de marca comercial con toldo y t-shirts Stanley',
    imgTitle: 'Stand de activación exterior con toldo y promotoras Stanley',
    alt: 'Staff y stand de activación exterior con toldo amarillo, t-shirts personalizadas y material promocional Stanley en Panamá',
    width: 900,
    height: 1200,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Activaciones',
    image: '/images/trabajos/taller-serigrafia-textil-en-vivo-panama.jpg',
    description: 'Producción y montaje de stand de activación comercial para exteriores: toldo retráctil amarillo institucional, t-shirts sublimadas para staff de promotoras, lanyards, botellas deportivas y material POP.',
    materials: 'Toldo plegable impermeable + T-shirts de algodón peinado + Artículos promocionales con logo',
    client: 'Stanley Black & Decker — Tour de Activaciones Panamá',
    tags: ['Activación Stanley', 'Toldos para Eventos', 'Camisetas para Staff', 'Merchandising B2B'],
  },
  {
    id: 'foto-27',
    title: 'Activación de marca con toldo y backing Stanley',
    imgTitle: 'Mobiliario de activación, juegos interactivos y banners para marca',
    alt: 'Activación de marca en evento comercial con juego strike baseball, backing gigante y staff promocional',
    width: 900,
    height: 1200,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Activaciones',
    image: '/images/trabajos/activacion-de-marca-toldos-y-promocionales-stanley-panama.jpg',
    description: 'Solución integral de activación de marca para exteriores: producción de backing de strike interactivo, toldo retráctil personalizado y rotulación de islas comerciales.',
    materials: 'Estructuras reforzadas de acero y aluminio + Lona frontlight anti-impacto + Rotulación vinil laminado',
    client: 'Stanley Black & Decker — Tour de Activaciones Panamá',
    tags: ['Activaciones de Marca', 'Toldos Personalizados', 'Backings Gigantes', 'Eventos B2B'],
  },
  {
    id: 'foto-28',
    title: 'Backing fotográfico y mural de marca DeWalt',
    imgTitle: 'Backing gigante para ferias y stands comerciales',
    alt: 'Estructura de backing publicitario gigante de alta definición instalado en feria de herramientas DeWalt Panamá',
    width: 900,
    height: 1200,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: '/images/trabajos/backing-publicitario-dewalt-eventos-panama.jpg',
    description: 'Mural escenográfico y fondo de escenario fotográfico de 3 metros de ancho con acabado mate de cero reflejos fotográficos para lanzamiento de línea DeWalt.',
    materials: 'Lona frontlight mate 13oz de alta densidad + Bastidor telescópico modular de aluminio',
    client: 'DeWalt — Lanzamiento de Producto Panamá',
    tags: ['Backing Gigante', 'DeWalt', 'Fondo de Escenario', 'Ferias y Congresos'],
  },
  {
    id: 'foto-3',
    title: 'Vasos térmicos grabados Canal de Panamá (Hechos de Cultura)',
    imgTitle: 'Vasos térmicos de acero con grabado láser Canal de Panamá',
    alt: 'Vasos térmicos de acero blanco, negro y plateado grabados a láser Hechos de Cultura Canal de Panamá',
    width: 1050,
    height: 1400,
    category: 'grabados',
    categoryLabel: 'Grabados Láser & Termos',
    image: '/images/trabajos/vasos-termicos-acero-grabado-laser-logo-corporativo-panama.jpg',
    description: 'Marcado láser de fibra óptica sobre vasos térmicos de acero inoxidable en acabado blanco, negro mate y acero cepillado para el programa Hechos de Cultura del Canal de Panamá.',
    materials: 'Acero inoxidable doble pared con recubrimiento en polvo + Grabado láser de fibra',
    client: 'Canal de Panamá — Hechos de Cultura',
    tags: ['Canal de Panamá', 'Grabado Láser', 'Vasos Térmicos', 'Acero Inoxidable', 'Cultura'],
  },
  {
    id: 'foto-10',
    title: 'Vasos térmicos, llavero y bolígrafo SENAN / CNI Panamá 2026',
    imgTitle: 'Kit institucional con vasos térmicos tipo huevo, llavero y pluma SENAN',
    alt: 'Vasos térmicos negros con escudo grabado del Servicio Nacional Aeronaval SENAN, llavero de cuero y bolígrafo CNI Panamá 2026',
    width: 1050,
    height: 1400,
    category: 'grabados',
    categoryLabel: 'Grabados Láser & Kits',
    image: '/images/trabajos/vasos-termicos-negros-grabado-laser-escudo-llavero-boligrafo-panama.jpg',
    description: 'Conjunto institucional compuesto por vasos térmicos tipo huevo negros con escudo oficial del SENAN (Dios Patria Honor), junto a llavero de cuero y bolígrafo conmemorativo CNI Panamá 2026.',
    materials: 'Vasos térmicos de acero con tapa hermética + Llavero metálico/cuero + Bolígrafo de aluminio grabado a láser',
    client: 'Servicio Nacional Aeronaval (SENAN) & CNI Panamá',
    tags: ['SENAN', 'Escudos Grabados', 'Vasos Térmicos', 'Llaveros', 'Bolígrafos', 'Regalos Institucionales'],
  },
  {
    id: 'foto-7',
    title: 'Set ejecutivo ecológico en bambú grabado Renueva 2026',
    imgTitle: 'Set de libreta de bambú, bolígrafo y llavero grabado Renueva',
    alt: 'Set ejecutivo con libreta de portada en bambú natural, bolígrafo y llavero de madera grabados a láser en caja negra conmemorativa',
    width: 1050,
    height: 1400,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/set-regalo-libreta-bambu-boligrafo-llavero-grabado-laser-panama.jpg',
    description: 'Estuche ejecutivo rígido con libreta ecológica en bambú natural seleccionado, bolígrafo a juego y llavero grabados a láser de precisión conmemorativos.',
    materials: 'Bambú natural seleccionado, madera noble y estuche rígido negro con cuna interior troquelada',
    client: 'Congreso Renueva 2026 — Panamá',
    tags: ['Set Ejecutivo', 'Libreta Bambú', 'Regalos de Fin de Año', 'Grabado Láser', 'Sustentable'],
  },
  {
    id: 'foto-6',
    title: 'Roll-Up banners impresos Congreso Recarga 2026',
    imgTitle: 'Banners roll-up retráctiles impresos para conferencia Casa de Dios',
    alt: 'Serie de roll-up banners retráctiles de aluminio impresos para el Congreso Recarga 2026 Casa de Dios en Panamá',
    width: 1400,
    height: 1050,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: '/images/trabajos/roll-up-banners-impresos-para-evento-panama.jpg',
    description: 'Producción de serie de estructuras Roll-Up retráctiles de aluminio anodizado con impresión en alta resolución sobre sustrato anti-curvatura para congreso anual.',
    materials: 'Estructuras Roll-Up de aluminio 0.85 × 2.00 m + Sustrato no-curl full color + Maletín de transporte',
    client: 'Ministerio Internacional Casa de Dios — Congreso Recarga 2026',
    tags: ['Roll-Up Banner', 'Gran Formato', 'Congresos y Conferencias', 'Estructuras Portátiles'],
  },
  {
    id: 'foto-2',
    title: 'Botellas térmicas con tapa/vaso grabadas a láser Seiko',
    imgTitle: 'Botellas térmicas negras con tapa y agarre ergonómico grabadas Seiko',
    alt: 'Botellas térmicas negras mate con vaso superior y grabado láser del logotipo Seiko en Panamá',
    width: 1050,
    height: 1400,
    category: 'grabados',
    categoryLabel: 'Grabados Láser & Botellas',
    image: '/images/trabajos/botellas-termicas-negras-grabado-laser-logo-panama.jpg',
    description: 'Lote de botellas térmicas de alta gama en acabado negro mate con tapa/vaso desenroscable y grabado láser permanente de precisión para la marca Seiko.',
    materials: 'Acero inoxidable doble pared al vacío con recubrimiento mate + Marcado láser perimetral',
    client: 'Seiko — Merchandising de Alta Gama',
    tags: ['Seiko', 'Botellas Térmicas', 'Grabado Láser', 'Merchandising Corporativo'],
  },
  {
    id: 'foto-4',
    title: 'Set de bolígrafo y llavero grabado Club de Leones La Chorrera',
    imgTitle: 'Set de regalo corporativo con pluma y llavero Club de Leones',
    alt: 'Set de bolígrafo metálico negro y llavero de cuero grabados a láser para Club de Leones La Chorrera Oeste',
    width: 1050,
    height: 1400,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/set-boligrafo-y-llavero-grabado-en-caja-de-regalo-panama.jpg',
    description: 'Estuche de regalo protocolar con bolígrafo de aluminio negro mate y llavero de cuero con herraje cromado, grabados a láser para condecoración institucional.',
    materials: 'Aluminio lacado, acero y cuero PU en estuche acolchado + Grabado láser de fibra',
    client: 'Club de Leones La Chorrera Oeste — Plácida Díaz Pacheco',
    tags: ['Club de Leones', 'Set de Regalo', 'Bolígrafo y Llavero', 'La Chorrera', 'Reconocimientos'],
  },
  {
    id: 'foto-5',
    title: 'Botellas deportivas y mochilas de cordón Panam Generating',
    imgTitle: 'Kit deportivo con botellas blancas y tula con logo Panam Generating',
    alt: 'Botellas deportivas blancas con tapa asa y mochila tula de cordón azul marino personalizadas para Panam Generating',
    width: 1050,
    height: 1400,
    category: 'kits',
    categoryLabel: 'Kits Promocionales & Onboarding',
    image: '/images/trabajos/botellas-blancas-y-bolsa-de-cordon-con-logo-corporativo-panama.jpg',
    description: 'Kit de bienvenida y actividades corporativas compuesto por botellas deportivas blancas de boca ancha con asa y mochilas tipo tula de cordón con estampado a full color.',
    materials: 'Botellas de aluminio blanco con tapa mosquetón + Tula de poliéster 210D con serigrafía textil',
    client: 'Panam Generating — Kit Deportivo y Bienestar',
    tags: ['Panam Generating', 'Kit de Bienvenida', 'Bolsa de Cordón', 'Botellas Deportivas', 'Panamá'],
  },
  {
    id: 'foto-9',
    title: 'Roll-Up banners institucionales AIG Panamá Conecta',
    imgTitle: 'Banners roll-up para Autoridad Nacional para la Innovación Gubernamental',
    alt: 'Roll-up banners institucionales de gran formato impresos para AIG Panamá Conecta y Gobierno Nacional',
    width: 1050,
    height: 1400,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: '/images/trabajos/roll-up-banners-institucionales-gran-formato-panama.jpg',
    description: 'Impresión fotográfica en gran formato y montaje en estructuras retráctiles Roll-Up para la Autoridad Nacional para la Innovación Gubernamental (AIG) y plataforma Panamá Conecta.',
    materials: 'Sustrato fotográfico mate anti-reflejo + Base retráctil de aluminio reforzada con bolso',
    client: 'Autoridad Nacional para la Innovación Gubernamental (AIG)',
    tags: ['AIG', 'Panamá Conecta', 'Roll-Up Institucional', 'Gran Formato Panamá', 'Gobierno'],
  },
  {
    id: 'foto-8',
    title: 'Organizador y carpeta ejecutiva de cuero Panam Generating',
    imgTitle: 'Portafolio de cuero con cierre y bolígrafo grabado nominalmente',
    alt: 'Carpeta organizadora de cuero color vino con cierre, placa metálica y bolígrafo grabados para Euclides Morales Panam Generating',
    width: 1050,
    height: 1400,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/organizador-de-cuero-personalizado-con-nombre-grabado-panama.jpg',
    description: 'Carpeta portafolio y organizador directivo en acabado cuero color vino con cremallera perimetral, bolsillo para tablet/documentos, placa con logo grabado y bolígrafo a tono con nombre personalizado.',
    materials: 'Cuero PU de grano fino con costura reforzada + Cierre metálico + Placa grabada a láser',
    client: 'Panam Generating — Regalo Directivo Personalizado',
    tags: ['Panam Generating', 'Organizador de Cuero', 'Portafolios Ejecutivos', 'Personalización Nominal'],
  },
  {
    id: 'foto-1',
    title: 'Vasos térmicos blancos y bolígrafos corporativos Cesarín',
    imgTitle: 'Vasos térmicos tipo tumbler y bolígrafos naranja con logo Cesarín',
    alt: 'Vasos térmicos de acero blanco con frase El valor de Cesarin está en su gente y bolígrafos naranja grabados a juego',
    width: 1050,
    height: 1400,
    category: 'kits',
    categoryLabel: 'Kits Promocionales & Regalos',
    image: '/images/trabajos/vasos-termicos-blancos-y-boligrafos-naranja-con-logo-panama.jpg',
    description: 'Dotación corporativa combinada para reconocimiento de colaboradores: vasos térmicos de acero blanco con grabado de lema corporativo y bolígrafos ejecutivos naranja a juego.',
    materials: 'Vasos térmicos de acero inoxidable blanco con tapa acrílica + Bolígrafos de aluminio con grabado láser',
    client: 'Cesarín — Campaña El Valor de Cesarín Está en su Gente',
    tags: ['Cesarín', 'Vasos Térmicos', 'Bolígrafos con Logo', 'Reconocimiento de Personal', 'Panamá'],
  },
];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalItem, setActiveModalItem] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'todos', label: `Todos los Trabajos (${GALLERY_PROJECTS.length})` },
    { id: 'grabados', label: 'Grabados Láser' },
    { id: 'gran-formato', label: 'Gran Formato & Banners' },
    { id: 'textiles', label: 'Bordados & Textiles' },
    { id: 'sets', label: 'Sets & Agendas Ejecutivas' },
    { id: 'kits', label: 'Kits Promocionales' },
  ];

  const filteredProjects = selectedCategory === 'todos'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header Banner */}
      <section className="bg-[#0D0D0D] text-white py-16 px-6 sm:px-12 rounded-3xl border border-gray-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5E14]/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4 text-center mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-3.5 py-1 rounded-md inline-flex items-center space-x-1.5">
            <Camera className="w-3.5 h-3.5" />
            <span>Portafolio Real en Taller — @rufpixel</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit leading-tight">
            Trabajos Realizados de Artículos Promocionales e Impresión de Banners
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            Muestra real de producciones entregadas en Panamá: vasos y botellas térmicas con grabado láser, sets ejecutivos en bambú y cuero, kits de bienvenida y estructuras Roll-Up impresas en gran formato.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="https://instagram.com/rufpixel"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold border border-white/20 transition-all flex items-center space-x-2"
            >
              <span>Seguir en Instagram @rufpixel</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FF5E14]" />
            </a>
            <Link
              href="/articulos-promocionales-panama"
              className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-5 py-2 rounded-xl font-bold transition-all shadow-md shadow-[#FF5E14]/30 flex items-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Ver Precios de Artículos Promocionales</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border ${
                active
                  ? 'bg-[#FF5E14] text-white border-[#FF5E14] shadow-md shadow-[#FF5E14]/25 scale-[1.02]'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Image Container with Hover Overlay */}
              <div
                className="relative h-72 overflow-hidden bg-gray-900 cursor-pointer"
                onClick={() => setActiveModalItem(project)}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  title={project.imgTitle}
                  width={project.width}
                  height={project.height}
                  loading={idx === 0 ? undefined : 'lazy'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-3 left-3 bg-[#0D0D0D]/90 backdrop-blur-sm text-[#FF5E14] text-[11px] font-extrabold uppercase px-3 py-1 rounded-md border border-gray-800">
                  {project.categoryLabel}
                </span>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 text-gray-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg backdrop-blur-sm">
                    <Eye className="w-4 h-4 text-[#FF5E14]" />
                    <span>Ver Foto Completa</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <span className="text-[11px] text-gray-400 font-semibold block uppercase tracking-wider">
                  {project.client}
                </span>

                <h2 className="text-lg font-extrabold text-gray-900 font-outfit group-hover:text-[#FF5E14] transition-colors leading-snug">
                  {project.title}
                </h2>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-500 block mb-1.5">Materiales & Técnica:</span>
                  <p className="text-xs text-gray-700 font-medium bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    {project.materials}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-4">
              <a
                href={`https://wa.me/50764454084?text=${encodeURIComponent(`Hola RufPixel, vi el trabajo de "${project.title}" en la Galería de la web y me interesa cotizar algo similar.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#FF5E14] hover:text-[#E04700] flex items-center space-x-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Cotizar por WhatsApp</span>
              </a>

              <Link
                href="/tienda"
                className="p-2 bg-gray-900 hover:bg-[#FF5E14] text-white rounded-xl transition-colors shadow-sm"
                title="Ver Catálogo de Productos"
              >
                <ShoppingBag className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram Spotlight Box */}
      <div className="bg-gradient-to-r from-[#0D0D0D] via-[#141414] to-[#070707] text-white p-8 sm:p-12 rounded-3xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase font-extrabold text-[#FF5E14] tracking-widest">
            Comunidad Creativa
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit">
            ¿Quieres ver más trabajos en tiempo real?
          </h3>
          <p className="text-gray-400 text-sm max-w-xl">
            Publicamos historias diarias, detrás de cámaras en taller y entregas recientes en nuestra cuenta oficial de Instagram <strong>@rufpixel</strong>.
          </p>
        </div>

        <a
          href="https://instagram.com/rufpixel"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FF5E14] hover:bg-[#E04700] text-white px-8 py-4 rounded-2xl font-extrabold text-sm shadow-xl shadow-[#FF5E14]/30 transition-all hover:scale-105 flex items-center space-x-2 shrink-0"
        >
          <span>Visitar @rufpixel</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-80 sm:h-[420px] relative bg-gray-900">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.alt}
                title={activeModalItem.imgTitle}
                width={activeModalItem.width}
                height={activeModalItem.height}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <span className="bg-[#FF5E14]/10 text-[#FF5E14] text-xs font-extrabold px-3 py-1 rounded-md uppercase">
                {activeModalItem.categoryLabel}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 font-outfit">
                {activeModalItem.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {activeModalItem.description}
              </p>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
                <strong className="text-gray-900 block mb-1">Materiales:</strong>
                <span className="text-gray-700">{activeModalItem.materials}</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/50764454084?text=${encodeURIComponent(`Hola RufPixel, vi en detalle el trabajo "${activeModalItem.title}" en la Galería y deseo cotizar algo similar.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#FF5E14] hover:bg-[#E04700] text-white py-3 px-6 rounded-xl font-bold text-xs text-center flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar Trabajo por WhatsApp (+507 6445-4084)</span>
                </a>
                <Link
                  href="/tienda"
                  onClick={() => setActiveModalItem(null)}
                  className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-bold text-xs text-center"
                >
                  Ver Catálogo Mayorista
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
