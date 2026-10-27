import React from 'react';
import { Product, BlogPost } from '@/lib/types';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RufPixel',
    url: 'https://rufpixel.com',
    logo: 'https://rufpixel.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+507-6525-6015',
      contactType: 'customer service',
      areaServed: 'PA',
      availableLanguage: 'Spanish',
    },
    sameAs: [
      'https://www.facebook.com/rufpixel',
      'https://www.instagram.com/rufpixel',
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
    offers: {
      '@type': 'Offer',
      url: `https://rufpixel.com/productos/${product.slug}/`,
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'RufPixel',
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
