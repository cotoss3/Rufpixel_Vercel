export interface ProductVariation {
  id: string;
  name: string;
  price: number;
  regularPrice?: number;
  attributes: Record<string, string>;
  image?: string;
  quantityOption?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  regularPrice?: number;
  priceMin?: number;
  priceMax?: number;
  description: string;
  shortDescription: string;
  category: string;
  categorySlug: string;
  categories?: { id: string; name: string; slug: string }[];
  image: string;
  gallery: string[];
  stock: number;
  type?: 'simple' | 'variable' | 'grouped';
  attributes: {
    name: string;
    options: string[];
  }[];
  childVariations?: ProductVariation[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAttributes: Record<string, string>;
  customNotes?: string;
  estimatedPrice?: number;
  selectedVariation?: ProductVariation;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  features: string[];
  gallery?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'YAPPY_HUMAN_VALIDATION';
  paymentProof?: {
    transactionId: string;
    receiptImageUrl?: string;
    uploadedAt: string;
  };
  status: 'PENDIENTE_VALIDACION' | 'PAGO_CONFIRMADO' | 'EN_PROCESO' | 'ENVIADO' | 'COMPLETADO' | 'CANCELADO';
  createdAt: string;
}

export interface PreOrderRequest {
  serviceType: string;
  widthCm: number;
  heightCm: number;
  quantity: number;
  material: string;
  fileName?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  estimatedPrice: number;
}
