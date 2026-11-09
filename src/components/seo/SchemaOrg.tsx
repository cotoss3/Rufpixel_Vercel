import React from 'react';
import { Product, BlogPost } from '@/lib/types';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': 'https://rufpixel.com/#organization',
    name: 'RufPixel - Casa Creativa',
    alternateName: 'RufPixel Panamá',
    url: 'https://rufpixel.com',
    logo: 'https://rufpixel.com/logo.png',
    image: 'https://rufpixel.com/logo.png',
    description: 'Imprenta y taller de producción gráfica en Panamá. Especialistas en impresión DTF textil directo, transfer UV DTF para rígidos, bordados computarizados, grabado láser, gran formato y artículos promocionales con envíos a todo Panamá.',
    telephone: '+507 6445-4084',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+507 6445-4084',
      contactType: 'customer service',
      areaServed: 'PA',
      availableLanguage: 'Spanish',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Arnoldo Cano, Barrio Colón, entrando por COMASA, Local 1',
      addressLocality: 'La Chorrera',
      addressRegion: 'Panamá Oeste',
      addressCountry: 'PA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.8803,
      longitude: -79.7833,
    },
    hasMap: 'https://maps.google.com/?q=8.8803,-79.7833',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Panamá Oeste' },
      { '@type': 'AdministrativeArea', name: 'Ciudad de Panamá' },
      { '@type': 'Country', name: 'Panamá' },
    ],
    priceRange: '$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Yappy, Transferencia Bancaria, Efectivo',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '13:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/rufpixel',
      'https://www.facebook.com/rufpixel',
    ],
    knowsAbout: [
      'Impresión DTF Textil Directo',
      'Transfer UV DTF para Rígidos',
      'Bordados Computarizados y Ponchados',
      'Grabados Láser de Alta Precisión',
      'Impresión en Gran Formato y Banners Roll-Up',
      'Artículos Promocionales Corporativos al por Mayor',
      'Stickers Troquelados y Etiquetas Adhesivas',
      'Sublimación y Regalos Publicitarios'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Impresión & Catálogo Promocional',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Impresión DTF Textil Directo',
            url: 'https://rufpixel.com/servicios/dtf-textil',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Transfer UV DTF para Rígidos',
            url: 'https://rufpixel.com/servicios/uv-dtf',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bordados Computarizados & Ponchados',
            url: 'https://rufpixel.com/servicios/bordados-computarizados',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Grabados Láser de Alta Precisión',
            url: 'https://rufpixel.com/servicios/grabados-laser',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Impresión Gran Formato & Banners',
            url: 'https://rufpixel.com/servicios/impresion-gran-formato',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Flyers & Folletos Publicitarios',
            url: 'https://rufpixel.com/servicios/flyers-y-folletos',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function GeoFaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Dónde está ubicado el taller y local físico de RufPixel en Panamá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Estamos ubicados en Calle Arnoldo Cano, Barrio Colón, entrando por COMASA, Local 1, La Chorrera, Panamá Oeste, República de Panamá.',
        },
      },
      {
        '@type': 'Question',
        name: '¿RufPixel realiza envíos a Ciudad de Panamá y al interior del país?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, realizamos envíos y despachos a todo Panamá: Ciudad de Panamá, Panamá Oeste, Colón, Coclé, Chiriquí y todas las provincias centrales e interior del país.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué servicios de impresión y personalización ofrece RufPixel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ofrecemos impresión DTF textil directo por metros o pliegos, transfer UV DTF para artículos rígidos, bordados computarizados de logotipos, grabados láser de precisión, impresión en gran formato (banners, roll-ups, vinilos) y catálogo de artículos promocionales corporativos.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué métodos de pago aceptan en Panamá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aceptamos pagos directos e instantáneos mediante Yappy Comercial (+507 6445-4084), transferencia bancaria y efectivo en nuestro local.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Se pueden solicitar cantidades menores o pedidos personalizados?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, trabajamos tanto pedidos al por mayor con precios escalonados como solicitudes de menor cantidad o personalizaciones especiales vía WhatsApp directo al +507 6445-4084.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image, ...product.gallery].filter(Boolean),
    description: (product.shortDescription || product.description || '').replace(/<[^>]+>/g, '').trim(),
    sku: product.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: 'RufPixel',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '48',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      url: `https://rufpixel.com/productos/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        name: 'RufPixel - Casa Creativa',
        telephone: '+507 6445-4084',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Arnoldo Cano, Barrio Colón, entrando por COMASA, Local 1',
          addressLocality: 'La Chorrera',
          addressRegion: 'Panamá Oeste',
          addressCountry: 'PA',
        },
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({ post }: { post: BlogPost }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: [post.image],
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RufPixel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rufpixel.com/logo.png',
      },
    },
    description: post.excerpt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


export function BreadcrumbListSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageSchema({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
