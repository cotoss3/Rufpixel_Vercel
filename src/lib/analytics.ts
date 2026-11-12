'use client';

import { Product, CartItem, Order, QuoteItem } from './types';

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
    });

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch (e) {
    // Non-blocking analytics
  }
}

export function trackViewItem(product: Product, unitPrice: number, packQty: number) {
  trackEvent('view_item', {
    currency: 'USD',
    value: Number((unitPrice * packQty).toFixed(2)),
    pack_quantity: packQty,
    unit_price: Number(unitPrice.toFixed(2)),
    items: [
      {
        item_id: product.sku || product.id,
        item_name: product.name,
        item_category: product.category,
        price: Number(unitPrice.toFixed(2)),
        quantity: packQty,
      },
    ],
  });
}

export function trackSelectQuantityTier(product: Product, packQty: number, unitPrice: number, packTotal: number) {
  trackEvent('select_quantity_tier', {
    item_id: product.sku || product.id,
    item_name: product.name,
    item_category: product.category,
    pack_quantity: packQty,
    unit_price: Number(unitPrice.toFixed(2)),
    pack_total: Number(packTotal.toFixed(2)),
    currency: 'USD',
  });
}

export function trackAddToCart(
  product: Product,
  packsCount: number,
  packQty: number,
  packPrice: number,
  source: 'pdp_main' | 'pdp_sticky_modal' | 'catalog_quick_modal' | 'zona_pixel' = 'pdp_main'
) {
  const totalValue = Number((packPrice * packsCount).toFixed(2));
  const unitPrice = Number((packPrice / (packQty || 1)).toFixed(2));

  trackEvent('add_to_cart', {
    currency: 'USD',
    value: totalValue,
    add_source: source,
    pack_quantity: packQty,
    packs_count: packsCount,
    total_units: packQty * packsCount,
    items: [
      {
        item_id: product.sku || product.id,
        item_name: product.name,
        item_category: product.category,
        price: packPrice,
        unit_price: unitPrice,
        quantity: packsCount,
      },
    ],
  });
}

export function trackBeginCheckout(cart: CartItem[], subtotal: number) {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: Number(subtotal.toFixed(2)),
    items: cart.map((item) => ({
      item_id: item.product.sku || item.product.id,
      item_name: item.product.name,
      item_category: item.product.category,
      price: Number(item.product.price.toFixed(2)),
      quantity: item.quantity,
    })),
  });
}

export function trackPurchase(order: Order) {
  trackEvent('purchase', {
    transaction_id: order.orderNumber,
    currency: 'USD',
    value: Number(order.total.toFixed(2)),
    payment_type: order.paymentMethod,
    items: order.items.map((item) => ({
      item_id: item.product.sku || item.product.id,
      item_name: item.product.name,
      item_category: item.product.category,
      price: Number(item.product.price.toFixed(2)),
      quantity: item.quantity,
    })),
  });
}

export function trackWhatsAppLead(params: {
  source: string;
  productName?: string;
  category?: string;
  quantity?: string | number;
  estimatedValue?: number;
}) {
  trackEvent('generate_lead', {
    lead_type: 'whatsapp',
    lead_source: params.source,
    item_name: params.productName || 'Consulta General',
    item_category: params.category || 'General',
    quantity: params.quantity || '',
    value: params.estimatedValue || 0,
    currency: 'USD',
  });

  trackEvent('whatsapp_click', {
    click_location: params.source,
    product_name: params.productName || 'Consulta General',
    estimated_value: params.estimatedValue || 0,
  });
}

export function trackQuotePdfGenerated(items: QuoteItem[], total: number, company?: string) {
  trackEvent('generate_lead', {
    lead_type: 'pdf_quote',
    lead_source: 'quote_modal',
    value: Number(total.toFixed(2)),
    currency: 'USD',
    customer_company: company || 'Particular',
    items_count: items.length,
  });

  trackEvent('quote_pdf_created', {
    value: Number(total.toFixed(2)),
    currency: 'USD',
    items: items.map((it) => ({
      item_id: it.sku || it.productId,
      item_name: it.name,
      item_category: it.category,
      quantity: it.quantityUnits,
      price: it.totalPrice,
    })),
  });
}
