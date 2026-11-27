import React from 'react';
import { Product, BlogPost } from '@/lib/types';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'AdvertisingAgency'],
    '@id': 'https://rufpixel.com/#organization',
    name: 'Artículos Promocionales - RUF PIXEL - CASA CREATIVA',
    alternateName: ['RufPixel - Casa Creativa', 'RufPixel Panamá', 'RufPixel Imprenta'],
    url: 'https://rufpixel.com',
    logo: 'https://rufpixel.com/logo.png',
    image: 'https://rufpixel.com/logo.png',
    description: 'Imprenta, fábrica de artículos promocionales y agencia de publicidad en Panamá. Especialistas en impresión DTF textil directo, transfer UV DTF para rígidos, bordados computarizados, grabado láser, gran formato y regalos corporativos con envíos a todo Panamá.',
    telephone: '+507 6445-4084',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '16',
      bestRating: '5',
      worstRating: '1',
    },
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
      'Fábrica de Artículos Promocionales en Panamá',
      'Artículos Publicitarios para Empresas',
      'Regalos Promocionales al por Mayor',
      'Merchandising Corporativo y Kits de Bienvenida',
      'Material POP para Eventos y Ferias',
      'Impresión de Volantes y Folletos Comerciales',
      'Impresión DTF Textil Directo',
      'Transfer UV DTF para Rígidos',
      'Bordados Computarizados y Ponchados',
      'Grabados Láser de Alta Precisión',
      'Impresión en Gran Formato y Banners Roll-Up',
      'Artículos Promocionales Corporativos al por Mayor',
      'Stickers Troquelados y Etiquetas Adhesivas',
      'Tomas Aéreas y Grabación con Drones 4K'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Impresión, Fábrica de Promocionales & Gran Formato',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fábrica de Artículos Promocionales y Regalos Publicitarios',
            url: 'https://rufpixel.com/articulos-promocionales-panama',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Regalos Corporativos y Merchandising para Empresas',
            url: 'https://rufpixel.com/regalos-corporativos-panama',
          },
        },
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
            name: 'Impresión Gran Formato, Banners & Material POP',
            url: 'https://rufpixel.com/servicios/impresion-gran-formato',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Impresión de Volantes, Folletos & Papelería Comercial',
            url: 'https://rufpixel.com/servicios/flyers-y-folletos',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tomas Aéreas y Grabación con Drones 4K',
            url: 'https://rufpixel.com/tomas-aereas-panama',
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
  const unit50 = Number(product.pricePacks?.pack50?.unit || (product.price > 0 ? (product.price / 50) : 0)) || 0;
  const unit100 = Number(product.pricePacks?.pack100?.unit || (unit50 * 0.95)) || 0;
  const unit250 = Number(product.pricePacks?.pack250?.unit || (unit50 * 0.90)) || 0;

  const toAbsoluteUrl = (imgUrl?: string) => {
    if (!imgUrl) return 'https://rufpixel.com/logo.png';
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) return imgUrl;
    return `https://rufpixel.com${imgUrl.startsWith('/') ? imgUrl : `/${imgUrl}`}`;
  };

  const imagesList = Array.from(new Set([
    toAbsoluteUrl(product.image),
    ...(product.gallery || []).map(toAbsoluteUrl)
  ])).filter(Boolean);

  const sellerObj = {
    '@type': 'LocalBusiness',
    name: 'RufPixel - Casa Creativa',
    telephone: '+507 6445-4084',
    url: 'https://rufpixel.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Arnoldo Cano, Barrio Colón, entrando por COMASA, Local 1',
      addressLocality: 'La Chorrera',
      addressRegion: 'Panamá Oeste',
      addressCountry: 'PA',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '16',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const returnPolicyObj = {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'PA',
    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
  };

  const shippingDetailsObj = {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: '0.00',
      currency: 'USD',
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'PA',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 5,
        maxValue: 7,
        unitCode: 'd',
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 2,
        unitCode: 'd',
      },
    },
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: imagesList,
    description: (product.shortDescription || product.description || '').replace(/<[^>]+>/g, '').trim(),
    sku: product.sku || product.id,
    mpn: product.sku || `RF-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'RufPixel',
    },
    category: product.category || 'Artículos Promocionales',
    offers: {
      '@type': 'AggregateOffer',
      url: `https://rufpixel.com/productos/${product.slug}`,
      priceCurrency: 'USD',
      lowPrice: unit250.toFixed(2),
      highPrice: unit50.toFixed(2),
      offerCount: '3',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      hasMerchantReturnPolicy: returnPolicyObj,
      shippingDetails: shippingDetailsObj,
      offers: [
        {
          '@type': 'Offer',
          name: `${product.name} — Escala 50 unidades ($${unit50.toFixed(2)}/ud)`,
          price: unit50.toFixed(2),
          priceCurrency: 'USD',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: 50,
            unitCode: 'C62',
          },
          url: `https://rufpixel.com/productos/${product.slug}`,
          seller: sellerObj,
          hasMerchantReturnPolicy: returnPolicyObj,
          shippingDetails: shippingDetailsObj,
        },
        {
          '@type': 'Offer',
          name: `${product.name} — Escala 100 unidades ($${unit100.toFixed(2)}/ud)`,
          price: unit100.toFixed(2),
          priceCurrency: 'USD',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: 100,
            unitCode: 'C62',
          },
          url: `https://rufpixel.com/productos/${product.slug}`,
          seller: sellerObj,
          hasMerchantReturnPolicy: returnPolicyObj,
          shippingDetails: shippingDetailsObj,
        },
        {
          '@type': 'Offer',
          name: `${product.name} — Escala 250 unidades ($${unit250.toFixed(2)}/ud)`,
          price: unit250.toFixed(2),
          priceCurrency: 'USD',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: 250,
            unitCode: 'C62',
          },
          url: `https://rufpixel.com/productos/${product.slug}`,
          seller: sellerObj,
          hasMerchantReturnPolicy: returnPolicyObj,
          shippingDetails: shippingDetailsObj,
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

export function ProductListSchema({
  name,
  description,
  url,
  products,
}: {
  name: string;
  description: string;
  url: string;
  products: {
    name: string;
    slug: string;
    image: string;
    unitPrice?: number;
    price?: number;
    category?: string;
    sku?: string;
  }[];
}) {
  const toAbsoluteUrl = (imgUrl?: string) => {
    if (!imgUrl) return 'https://rufpixel.com/logo.png';
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) return imgUrl;
    return `https://rufpixel.com${imgUrl.startsWith('/') ? imgUrl : `/${imgUrl}`}`;
  };

  const sellerObj = {
    '@type': 'LocalBusiness',
    name: 'RufPixel - Casa Creativa',
    telephone: '+507 6445-4084',
    url: 'https://rufpixel.com',
  };

  const returnPolicyObj = {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'PA',
    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
  };

  const shippingDetailsObj = {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: '0.00',
      currency: 'USD',
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'PA',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 5,
        maxValue: 7,
        unitCode: 'd',
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 2,
        unitCode: 'd',
      },
    },
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url,
    numberOfItems: products.length,
    itemListElement: products.map((prod, index) => {
      const uPrice = Number(prod.unitPrice || prod.price || 1.95);
      const absImg = toAbsoluteUrl(prod.image);
      const prodUrl = `https://rufpixel.com/productos/${prod.slug}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: prod.name,
        url: prodUrl,
        item: {
          '@type': 'Product',
          name: prod.name,
          url: prodUrl,
          image: [absImg],
          sku: prod.sku || `RF-${index + 1}`,
          brand: {
            '@type': 'Brand',
            name: 'RufPixel',
          },
          category: prod.category || 'Artículos Promocionales',
          offers: {
            '@type': 'Offer',
            price: uPrice > 0 ? uPrice.toFixed(2) : '1.95',
            priceCurrency: 'USD',
            priceValidUntil: '2027-12-31',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            eligibleQuantity: {
              '@type': 'QuantitativeValue',
              minValue: 50,
              unitCode: 'C62',
            },
            hasMerchantReturnPolicy: returnPolicyObj,
            shippingDetails: shippingDetailsObj,
            url: prodUrl,
            seller: sellerObj,
          },
        },
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({ post }: { post: BlogPost }) {
  const authorParts = post.author.split('·').map((s) => s.trim());
  const authorName = authorParts[0] || post.author;
  const authorJobTitle = authorParts[1] || undefined;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: [post.image.startsWith('http') ? post.image : `https://rufpixel.com${post.image}`],
    datePublished: '2026-11-25T08:00:00-05:00',
    dateModified: '2026-11-25T12:00:00-05:00',
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorJobTitle ? { jobTitle: authorJobTitle } : {}),
      worksFor: {
        '@type': 'Organization',
        name: 'RufPixel',
        url: 'https://rufpixel.com',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Artículos Promocionales - RUF PIXEL - CASA CREATIVA',
      url: 'https://rufpixel.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rufpixel.com/logo.png',
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rufpixel.com/blog/${post.slug}`,
    },
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
