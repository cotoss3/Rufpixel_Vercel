import React from 'react';
import type { Metadata } from 'next';
import { getProductBySlug } from '@/lib/woocommerce';
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Producto no encontrado | RufPixel',
      robots: { index: false, follow: false },
    };
  }

  const cleanDescription = (product.shortDescription || product.description || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Exact Yoast/RankMath WordPress meta description structure
  const seoDescription = cleanDescription.length > 5
    ? `Compra ${product.name} al mejor precio. ${cleanDescription}. Calidad premium en RufPixel. ¡Cotiza ahora!`
    : `Compra ${product.name} al por mayor en RufPixel Panamá. Personalización corporativa en alta definición con técnicas profesionales. ¡Cotiza ahora!`;

  const canonicalUrl = `https://rufpixel.com/productos/${product.slug}/`;

  return {
    title: `${product.name} | RufPixel`,
    description: seoDescription.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title: `${product.name} | RufPixel`,
      description: seoDescription.slice(0, 160),
      url: canonicalUrl,
      siteName: 'RufPixel',
      locale: 'es_PA',
      type: 'website',
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | RufPixel`,
      description: seoDescription.slice(0, 160),
      images: [product.image],
    },
    keywords: [
      product.name,
      product.category,
      'Impresión Panamá',
      'Artículos promocionales Panamá',
      'RufPixel',
      ...(product.techniques || []),
    ],
  };
}

export default async function ProductosDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  return <ProductDetailClient product={product || undefined} slug={params.slug} />;
}
