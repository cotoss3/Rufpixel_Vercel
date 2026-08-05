'use client';

import { Product } from './types';

// Global Client-Side Product Cache for 0ms Instant PDP Page Rendering
const clientProductMap = new Map<string, Product>();

export function setCachedProduct(product: Product) {
  if (product && product.slug) {
    clientProductMap.set(product.slug, product);
    clientProductMap.set(product.id, product);
  }
}

export function getCachedProduct(slugOrId: string): Product | undefined {
  return clientProductMap.get(slugOrId);
}

export function setCachedProducts(products: Product[]) {
  products.forEach(p => setCachedProduct(p));
}
