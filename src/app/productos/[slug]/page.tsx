import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, VERIFIED_LOCAL_PRODUCTS, isProductInCategory } from '@/lib/woocommerce';
import ProductDetailClient from './ProductDetailClient';

/**
 * Generador matemático de títulos SEO (Regla 1: 50 a 60 caracteres exactos)
 * Fórmula: [Keyword Principal]: [Ángulo Concreto / Precios] | RufPixel
 */
function buildSeoTitle(name: string): string {
  const brand = ' | RufPixel'; // 11 chars
  const availableLength = 59 - brand.length; // 48 chars max for body

  // Base options based on length
  const option1 = `${name}: Precios al Mayor${brand}`;
  if (option1.length >= 50 && option1.length <= 60) return option1;

  const option2 = `${name} al Mayor en Panamá${brand}`;
  if (option2.length >= 50 && option2.length <= 60) return option2;

  const option3 = `${name}: Paquetes por Mayor${brand}`;
  if (option3.length >= 50 && option3.length <= 60) return option3;

  if (name.length + brand.length >= 50 && name.length + brand.length <= 60) {
    return `${name}${brand}`;
  }

  // If too short, pad
  if (name.length + brand.length < 50) {
    const padded = `${name} Personalizado en Panamá${brand}`;
    if (padded.length >= 50 && padded.length <= 60) return padded;
    const padded2 = `${name}: Impresión Corporativa${brand}`;
    if (padded2.length >= 50 && padded2.length <= 60) return padded2;
    return `${name} - Catálogo Mayorista${brand}`.slice(0, 59);
  }

  // If too long, truncate name with ellipsis
  const trimmedName = name.slice(0, availableLength - 3).trim();
  return `${trimmedName}...${brand}`;
}

/**
 * Generador de meta description (Regla 2: 120 a 155 caracteres exactos)
 * Incluye keyword al inicio, precios/datos numéricos reales y CTA directo. Cero clichés.
 */
function buildSeoDescription(name: string, unitPrice: number, techniques: string[]): string {
  const priceStr = unitPrice > 0 ? `$${unitPrice.toFixed(2)}/ud` : 'precio mayorista';
  const techStr = techniques && techniques.length > 0 ? techniques[0] : 'personalizado';

  // Construct target message
  let desc = `Compra ${name} desde ${priceStr} en paquetes de 50 a 250 uds. Impresión en ${techStr}. Plazos según volumen y técnica. ¡Cotiza por WhatsApp!`;

  if (desc.length > 155) {
    desc = `Compra ${name} desde ${priceStr} en paquetes de 50 a 250 uds. Plazos según volumen y técnica. ¡Cotiza por WhatsApp!`;
  }

  if (desc.length > 155) {
    const maxNameLen = 155 - `Compra  desde ${priceStr} por mayor en Panamá. ¡Cotiza por WhatsApp!`.length;
    desc = `Compra ${name.slice(0, maxNameLen)} desde ${priceStr} por mayor en Panamá. ¡Cotiza por WhatsApp!`;
  }

  // If too short (< 120)
  if (desc.length < 120) {
    desc = `Compra ${name} desde ${priceStr} en paquetes de 50 a 250 uds. Plazos según volumen y técnica en taller. ¡Cotiza por WhatsApp ahora!`;
  }

  return desc.slice(0, 155);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Producto no encontrado | RufPixel',
      robots: { index: false, follow: false },
    };
  }

  const seoTitle = buildSeoTitle(product.name);
  const unitPrice = product.pricePacks?.pack50?.unit || (product.price > 0 ? product.price / 50 : 0);
  const seoDescription = buildSeoDescription(product.name, unitPrice, product.techniques || []);
  const canonicalUrl = `https://rufpixel.com/productos/${product.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
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
      title: seoTitle,
      description: seoDescription,
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
      title: seoTitle,
      description: seoDescription,
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

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const catTarget = product.categorySlug || product.category;
  const relatedProducts = VERIFIED_LOCAL_PRODUCTS
    .filter((p) => p.slug !== product.slug && isProductInCategory(p, catTarget))
    .slice(0, 4);

  return (
    <>
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
