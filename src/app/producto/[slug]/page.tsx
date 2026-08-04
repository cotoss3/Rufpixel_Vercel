import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/woocommerce';
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Producto no encontrado — RufPixel' };
  return {
    title: `${product.name} — RufPixel Impresión`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
