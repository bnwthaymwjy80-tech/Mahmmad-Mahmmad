export enum ProductCategory {
  ALL = 'all',
  DRESSES = 'dresses',
  MAKEUP = 'makeup',
  SKINCARE = 'skincare',
  LENSES = 'lenses',
  PERFUMES = 'perfumes',
  TOYS = 'toys',
  PANTS = 'pants',
  BAGS = 'bags',
}

export enum SortOption {
  BEST_SELLING = 'best_selling',
  PRICE_LOW = 'price_low',
  PRICE_HIGH = 'price_high',
  TOP_RATED = 'top_rated',
}

export enum PaymentMethod {
  COD = 'cod',
  CARD = 'card',
}

export enum OrderStatus {
  PREPARING = 'preparing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

export type LanguageCode =
  | 'ar'
  | 'ku'
  | 'en'
  | 'tr'
  | 'fa'
  | 'fr'
  | 'de'
  | 'es'
  | 'it'
  | 'pt'
  | 'ru'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'hi'
  | 'ur'
  | 'id';

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedSize?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  priceIqd: number;
  originalPriceIqd?: number;
  tag?: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  image: string;
  colors: ColorVariant[];
  sizes: string[];
  hasSizeGuide?: boolean;
  shippingEstimate: string;
  material: string;
  description: string;
  specs: Array<{ label: string; value: string }>;
  reviews: ProductReview[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  image: string;
  priceIqd: number;
  color: string;
  colorHex: string;
  size: string;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  instagramUsername?: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotalIqd: number;
  discountIqd: number;
  shippingIqd: number;
  totalIqd: number;
  promoCode?: string;
  itemsSummary?: string;
  ownerUid?: string;
  customer: CustomerDetails;
  estimatedDelivery: string;
}
