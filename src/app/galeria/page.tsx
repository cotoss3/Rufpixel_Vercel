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
    title: 'Agendas ejecutivas grabadas a láser Metro de Panamá',
    imgTitle: 'Agendas de cuero con grabado láser para Metro de Panamá',
    alt: 'Agenda ejecutiva de cuero negro grabada a láser en taller para Metro de Panamá',
    width: 900,
    height: 1200,
    category: 'sets',
    categoryLabel: 'Sets & Agendas',
    image: '/images/trabajos/agendas-ejecutivas-cuero-metro-de-panama-grabado-laser.jpg',
    description: 'Grabado láser de precisión sobre agendas ejecutivas en polipiel negra con personalización individual de nombre y logotipo corporativo institucional.',
    materials: 'Cuero PU térmico de alta densidad + Marcado láser CO2 de precisión',
    client: 'Metro de Panamá — Dotación Ejecutiva',
    tags: ['Agendas Personalizadas', 'Metro de Panamá', 'Grabado Láser', 'Regalos Corporativos'],
  },
  {
    id: 'foto-15',
    title: 'Linternas de aluminio grabadas Banco Mercantil',
    imgTitle: 'Linternas de aluminio anodizado grabadas a láser',
    alt: 'Linternas de aluminio azul grabadas a láser para Banco Mercantil 100 años',
    width: 900,
    height: 1200,
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: '/images/trabajos/linternas-aluminio-banco-mercantil-grabado-laser-panama.jpg',
    description: 'Lote corporativo de linternas metálicas en aluminio anodizado azul con grabado láser de alta definición para conmemoración bancaria.',
    materials: 'Aluminio anodizado grado aeronáutico + Grabado láser de fibra óptica',
    client: 'Banco Mercantil — Conmemoración Aniversario',
    tags: ['Banco Mercantil', 'Linternas de Aluminio', 'Grabado Láser', 'Merchandising B2B'],
  },
  {
    id: 'foto-16',
    title: 'Botellas térmicas Guess con grabado láser',
    imgTitle: 'Botellas de acero negro grabadas Guess',
    alt: 'Botellas de aluminio negro mate con mosquetón grabadas a láser para Guess',
    width: 900,
    height: 1200,
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: '/images/trabajos/botellas-aluminio-negras-grabadas-guess-panama.jpg',
    description: 'Personalización de botellas deportivas en aluminio negro mate con mosquetón superior mediante marcado láser perimetral permanente.',
    materials: 'Aluminio negro mate con mosquetón metálico + Marcado láser de fibra',
    client: 'Guess — Merchandising Corporativo',
    tags: ['Guess', 'Botellas de Aluminio', 'Grabado Láser', 'Marcas Internacionales'],
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
    title: 'Bolsas ecológicas cambrel impresas Stérimar',
    imgTitle: 'Bolsas de tela no tejida cambrel impresas a color',
    alt: 'Bolsas ecológicas de tela no tejida cambrel impresas para Stérimar 50 años',
    width: 900,
    height: 1200,
    category: 'kits',
    categoryLabel: 'Bolsas & Promocionales',
    image: '/images/trabajos/bolsas-ecologicas-cambrel-impresas-sterimar-panama.jpg',
    description: 'Producción de bolsas ecológicas reutilizables en cambrel termosellado con impresión de marca a full color para congresos y eventos farmacéuticos.',
    materials: 'Polipropileno no tejido (cambrel / non-woven) 80g + Serigrafía textil directa',
    client: 'Stérimar — Campaña 50 Años Panamá',
    tags: ['Bolsas Ecológicas', 'Cambrel', 'Stérimar', 'Eventos Farmacéuticos'],
  },
  {
    id: 'foto-19',
    title: 'Tazas térmicas y vasos ejecutivos Soft Botic',
    imgTitle: 'Mugs térmicas con asa y vasos de acero corporativos',
    alt: 'Colección de tazas térmicas con asa y vasos personalizados para Soft Botic',
    width: 900,
    height: 1200,
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: '/images/trabajos/tazas-termicas-y-vasos-soft-botic-panama.jpg',
    description: 'Juego de tazas térmicas ejecutivas con asa ergonómica y tapa transparente hermética con grabado de logotipo corporativo.',
    materials: 'Acero inoxidable con aislamiento térmico + Tapa acrílica hermética',
    client: 'Soft Botic & Contáblika — Welcome Kit',
    tags: ['Tazas Térmicas', 'Mugs Corporativas', 'Grabado Láser', 'Empresas Tech'],
  },
  {
    id: 'foto-20',
    title: 'Scrubs y filipinas médicas bordadas Universidad de Panamá',
    imgTitle: 'Uniformes médicos y batas bordadas de alta definición',
    alt: 'Scrubs médicos y filipinas con escudo bordado de la Universidad de Panamá Facultad de Medicina',
    width: 900,
    height: 1200,
    category: 'textiles',
    categoryLabel: 'Bordados & Textiles',
    image: '/images/trabajos/scrubs-medicos-filipinas-bordadas-universidad-de-panama.jpg',
    description: 'Bordado computarizado industrial de alta densidad del escudo de la Facultad de Medicina sobre uniformes médicos tipo scrub y filipinas.',
    materials: 'Tela antifluido de grado médico + Bordado computarizado con hilos de poliéster resistentes al cloro',
    client: 'Universidad de Panamá — Facultad de Medicina',
    tags: ['Bordados Computarizados', 'Scrubs Médicos', 'Universidad de Panamá', 'Uniformes'],
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
    title: 'Paraguas y sombrillas de golf personalizadas IDEC',
    imgTitle: 'Paraguas grandes de golf con mango ergonómico y serigrafía',
    alt: 'Paraguas de golf con serigrafía conmemorativa 90 años IDEC Panamá',
    width: 900,
    height: 1200,
    category: 'kits',
    categoryLabel: 'Promocionales & Paraguas',
    image: '/images/trabajos/paraguas-sombrillas-golf-personalizadas-panama.jpg',
    description: 'Producción de paraguas de golf antiviento con varillaje de fibra de vidrio y estampación serigráfica resistente al agua para conmemoración de 90 años.',
    materials: 'Poliéster pongee impermeable 190T + Varillas de fibra flexible + Serigrafía textil curada',
    client: 'IDEC Panamá — 90 Años Conmemoración',
    tags: ['Paraguas de Golf', 'Sombrillas Personalizadas', 'Promocionales Panamá', 'Artículos Publicitarios'],
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
    title: 'Bolígrafos metálicos ejecutivos Tribunal Electoral',
    imgTitle: 'Bolígrafos ejecutivos con tampografía y grabado láser',
    alt: 'Bolígrafos de aluminio azul con clip cromado impresos para Ciudadanía Joven Tribunal Electoral Panamá',
    width: 1200,
    height: 900,
    category: 'grabados',
    categoryLabel: 'Bolígrafos & Grabados',
    image: '/images/trabajos/boligrafos-metalicos-tribunal-electoral-panama.jpg',
    description: 'Bolígrafos metálicos de mecanismo retráctil en acabado azul mate con puntero cromado y personalización de campaña cívica juvenil.',
    materials: 'Cuerpo de aluminio con laca mate + Mecanismo de giro suave + Marcado tampográfico y láser',
    client: 'Tribunal Electoral & Fundación Konrad Adenauer Panamá',
    tags: ['Bolígrafos Metálicos', 'Tribunal Electoral', 'Plumas Promocionales', 'Material P.O.P.'],
  },
  {
    id: 'foto-26',
    title: 'Taller de estampado y serigrafía textil en vivo',
    imgTitle: 'Producción de t-shirts serigrafiadas en taller RufPixel',
    alt: 'Operador de taller en Panamá estampando camisetas negras en mesa de serigrafía textil',
    width: 900,
    height: 1200,
    category: 'textiles',
    categoryLabel: 'Taller & Serigrafía Textil',
    image: '/images/trabajos/taller-serigrafia-textil-en-vivo-panama.jpg',
    description: 'Taller directo de estampado serigráfico y DTF textil en Panamá: personalización masiva de suéteres y t-shirts con curado térmico de larga duración.',
    materials: 'Tintas plastisol ecológicas curadas al horno + Algodón peinado 100% 180g',
    client: 'DeWalt Industrial Power Tools — Evento Técnico',
    tags: ['Taller Serigrafía', 'Estampado de Suéteres', 'DTF Textil', 'Taller Directo Panamá'],
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
    title: 'Vasos térmicos con grabado láser',
    imgTitle: 'Vasos térmicos con grabado láser',
    alt: 'Vasos térmicos de acero negro, blanco y plateado con logo corporativo grabado a láser',
    width: 1050,
    height: 1400,
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: '/images/trabajos/vasos-termicos-acero-grabado-laser-logo-corporativo-panama.jpg',
    description: 'Marcado láser de fibra óptica sobre vasos térmicos de acero inoxidable en acabado negro mate, blanco y acero cepillado con contraste metálico permanente.',
    materials: 'Acero inoxidable doble pared con recubrimiento en polvo + Grabado láser de fibra',
    client: 'Pedido Corporativo — Panamá',
    tags: ['Grabado Láser', 'Vasos Térmicos', 'Acero Inoxidable', 'Promocionales'],
  },
  {
    id: 'foto-10',
    title: 'Vasos térmicos con escudo grabado',
    imgTitle: 'Vasos térmicos con escudo grabado',
    alt: 'Vasos térmicos negros con escudo grabado a láser, llavero y bolígrafo personalizados',
    width: 1050,
    height: 1400,
    category: 'grabados',
    categoryLabel: 'Grabados Láser & Kits',
    image: '/images/trabajos/vasos-termicos-negros-grabado-laser-escudo-llavero-boligrafo-panama.jpg',
    description: 'Conjunto institucional compuesto por vasos térmicos negros, llavero metálico y bolígrafo ejecutivo personalizados con escudo de alta definición.',
    materials: 'Vasos térmicos de acero + Llavero metálico + Bolígrafo de aluminio grabado a láser',
    client: 'Dotación Institucional — Panamá',
    tags: ['Escudos Grabados', 'Vasos Térmicos', 'Llaveros', 'Bolígrafos'],
  },
  {
    id: 'foto-7',
    title: 'Set ejecutivo en bambú grabado',
    imgTitle: 'Set ejecutivo en bambú grabado',
    alt: 'Set ejecutivo con libreta de bambú, bolígrafo y llavero de madera grabados a láser en caja negra',
    width: 1050,
    height: 1400,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/set-regalo-libreta-bambu-boligrafo-llavero-grabado-laser-panama.jpg',
    description: 'Estuche ejecutivo de presentación con libreta ecológica de portada en bambú, bolígrafo y llavero grabados a láser listos para entrega directiva.',
    materials: 'Bambú natural seleccionado, madera y estuche rígido negro con cuna interior',
    client: 'Regalos Corporativos — Panamá',
    tags: ['Set Ejecutivo', 'Libreta Bambú', 'Regalos de Fin de Año', 'Grabado Láser'],
  },
  {
    id: 'foto-6',
    title: 'Roll-up banners para evento',
    imgTitle: 'Roll-up banners para evento',
    alt: 'Cuatro roll-up banners impresos para un evento, impresión de gran formato en Panamá',
    width: 1400,
    height: 1050,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: '/images/trabajos/roll-up-banners-impresos-para-evento-panama.jpg',
    description: 'Producción de serie de cuatro estructuras Roll-Up retráctiles de aluminio con impresión en alta resolución para feria y congreso empresarial.',
    materials: 'Estructura Roll-Up de aluminio 0.85 × 2.00 m + Impresión full color con maletín',
    client: 'Evento Corporativo — Panamá',
    tags: ['Roll-Up Banner', 'Gran Formato', 'Eventos y Ferias', 'Estructuras Portátiles'],
  },
  {
    id: 'foto-2',
    title: 'Botellas térmicas con grabado láser',
    imgTitle: 'Botellas térmicas con grabado láser',
    alt: 'Botellas térmicas negras con logo grabado a láser para empresa en Panamá',
    width: 1050,
    height: 1400,
    category: 'grabados',
    categoryLabel: 'Grabados Láser',
    image: '/images/trabajos/botellas-termicas-negras-grabado-laser-logo-panama.jpg',
    description: 'Lote de botellas térmicas negras mate personalizadas con logotipo corporativo mediante grabado láser imborrable resistente al uso diario.',
    materials: 'Botella térmica de acero inoxidable con tapa hermética + Marcado láser',
    client: 'Empresa en Panamá',
    tags: ['Botellas Térmicas', 'Grabado Láser', 'Merchandising Corporativo'],
  },
  {
    id: 'foto-4',
    title: 'Set de bolígrafo y llavero en caja',
    imgTitle: 'Set de bolígrafo y llavero en caja',
    alt: 'Set de regalo corporativo con bolígrafo y llavero personalizados dentro de una caja negra',
    width: 1050,
    height: 1400,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/set-boligrafo-y-llavero-grabado-en-caja-de-regalo-panama.jpg',
    description: 'Set de regalo empresarial en estuche negro acolchado con bolígrafo metálico y llavero corporativo grabados con precisión milimétrica.',
    materials: 'Metal anodizado y acero inoxidable en estuche de regalo corporativo',
    client: 'Reconocimientos y Aniversarios — Panamá',
    tags: ['Set de Regalo', 'Bolígrafo y Llavero', 'Regalos Corporativos'],
  },
  {
    id: 'foto-5',
    title: 'Botellas y bolsa de cordón con logo',
    imgTitle: 'Botellas y bolsa de cordón con logo',
    alt: 'Botellas blancas y bolsa de cordón azul con logo de empresa, kit promocional en Panamá',
    width: 1050,
    height: 1400,
    category: 'kits',
    categoryLabel: 'Kits de Bienvenida & Promocionales',
    image: '/images/trabajos/botellas-blancas-y-bolsa-de-cordon-con-logo-corporativo-panama.jpg',
    description: 'Kit promocional para jornadas deportivas, onboarding e integración empresarial con botellas blancas personalizadas y mochila tipo tula de cordón.',
    materials: 'Botellas deportivas blancas + Bolsa de cordón en poliéster resistente',
    client: 'Kit de Bienvenida y Eventos — Panamá',
    tags: ['Kit de Bienvenida', 'Bolsa de Cordón', 'Botellas con Logo', 'Activaciones'],
  },
  {
    id: 'foto-9',
    title: 'Roll-up banners institucionales',
    imgTitle: 'Roll-up banners institucionales',
    alt: 'Dos roll-up banners institucionales impresos en gran formato, Panamá',
    width: 1050,
    height: 1400,
    category: 'gran-formato',
    categoryLabel: 'Gran Formato & Banners',
    image: '/images/trabajos/roll-up-banners-institucionales-gran-formato-panama.jpg',
    description: 'Impresión y montaje en taller de estructuras Roll-Up institucionales de 85 × 200 cm listas para exhibición en recepciones, conferencias y stands.',
    materials: 'Lona/Pet banner en alta resolución + Base retráctil de aluminio con bolso',
    client: 'Comunicación Institucional — Panamá',
    tags: ['Roll-Up', 'Impresión de Banners', 'Gran Formato Panamá', 'Stands'],
  },
  {
    id: 'foto-8',
    title: 'Organizador de cuero personalizado',
    imgTitle: 'Organizador de cuero personalizado',
    alt: 'Organizador de cuero guinda con nombre grabado y bolígrafo azul, regalo ejecutivo personalizado',
    width: 1050,
    height: 1400,
    category: 'sets',
    categoryLabel: 'Sets & Regalos Ejecutivos',
    image: '/images/trabajos/organizador-de-cuero-personalizado-con-nombre-grabado-panama.jpg',
    description: 'Carpeta y organizador ejecutivo en acabado cuero color vino personalizado con nombre grabado en placa y bolígrafo metálico a juego.',
    materials: 'Cuero sintético ejecutivo con cierre magnético, placa metálica y bolígrafo',
    client: 'Regalo Ejecutivo Personalizado — Panamá',
    tags: ['Organizador de Cuero', 'Libretas Ejecutivas', 'Personalización Nominal'],
  },
  {
    id: 'foto-1',
    title: 'Vasos térmicos y bolígrafos con logo',
    imgTitle: 'Vasos térmicos y bolígrafos con logo',
    alt: 'Vasos térmicos blancos y bolígrafos naranja personalizados con logo de empresa en Panamá',
    width: 1050,
    height: 1400,
    category: 'kits',
    categoryLabel: 'Kits de Bienvenida & Promocionales',
    image: '/images/trabajos/vasos-termicos-blancos-y-boligrafos-naranja-con-logo-panama.jpg',
    description: 'Producción combinada de vasos térmicos blancos grabados a láser y bolígrafos corporativos color naranja para entrega a clientes y equipo.',
    materials: 'Vasos térmicos de acero inoxidable + Bolígrafos promocionales con logo',
    client: 'Merchandising Empresarial — Panamá',
    tags: ['Bolígrafos con Logo', 'Vasos Térmicos', 'Artículos Promocionales'],
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
