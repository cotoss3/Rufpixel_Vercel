'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order } from './types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedAttributes?: Record<string, string>, notes?: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  ordersHistory: Order[];
  createYappyOrder: (customer: Order['customer'], proof: { transactionId: string; receiptImageUrl?: string }) => Order;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ordersHistory, setOrdersHistory] = useState<Order[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('rufpixel_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from storage', e);
      }
    }

    const savedOrders = localStorage.getItem('rufpixel_orders');
    if (savedOrders) {
      try {
        setOrdersHistory(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Error loading orders history', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rufpixel_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rufpixel_orders', JSON.stringify(ordersHistory));
  }, [ordersHistory]);

  const addToCart = (product: Product, quantity = 1, selectedAttributes = {}, customNotes = '') => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, selectedAttributes, customNotes }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const createYappyOrder = (customer: Order['customer'], proof: { transactionId: string; receiptImageUrl?: string }): Order => {
    const orderNumber = `RUF-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customer,
      items: [...cart],
      subtotal,
      shippingFee: 0,
      total: subtotal,
      paymentMethod: 'YAPPY_HUMAN_VALIDATION',
      paymentProof: {
        transactionId: proof.transactionId,
        receiptImageUrl: proof.receiptImageUrl || '',
        uploadedAt: new Date().toISOString(),
      },
      status: 'PENDIENTE_VALIDACION',
      createdAt: new Date().toISOString(),
    };

    setOrdersHistory((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        ordersHistory,
        createYappyOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
