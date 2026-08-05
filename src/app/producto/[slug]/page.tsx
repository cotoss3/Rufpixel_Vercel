import React from 'react';
import { getProductBySlug } from '@/lib/woocommerce';
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Producto — RufPixel' };
  return {
    title: `${product.name} — RufPixel Impresión`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  return <ProductDetailClient product={product || undefined} slug={params.slug} />;
}
