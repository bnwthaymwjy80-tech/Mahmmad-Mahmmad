import { OrderRecord, Product } from '../types/shop';

export const FREE_SHIPPING_THRESHOLD_IQD = 75000;
export const STANDARD_SHIPPING_IQD = 5000;

export const ADMIN_PASSCODE = '304922';
export const STORE_INSTAGRAM_USERNAME = 'elianah_shop2026';
export const STORE_INSTAGRAM_URL = `https://www.instagram.com/${STORE_INSTAGRAM_USERNAME}/`;

export const PROMO_CODES: Record<string, { percent: number; label: string }> = {
  XMAS20: { percent: 20, label: 'خصم الكريسماس 20%' },
  ALIANS15: { percent: 15, label: 'خصم 15% من أليانز شوب' },
};

export const HERO_CHRISTMAS_IMAGE =
  '/src/assets/images/hero_christmas_alians_1795628311642.jpg';

export interface StudioPreset {
  id: string;
  label: string;
  url: string;
}

export const STUDIO_IMAGE_PRESETS: StudioPreset[] = [
  {
    id: 'xmas',
    label: 'هدايا الكريسماس',
    url: '/src/assets/images/hero_christmas_alians_1795628311642.jpg',
  },
  {
    id: 'blazer',
    label: 'بليزر كتان',
    url: '/src/assets/images/prod_linen_blazer_1795627911250.jpg',
  },
  {
    id: 'dress',
    label: 'فستان ساتان',
    url: '/src/assets/images/prod_silk_maxi_1795627911844.jpg',
  },
  {
    id: 'bag',
    label: 'حقيبة جلدية',
    url: '/src/assets/images/prod_leather_tote_1795627912705.jpg',
  },
  {
    id: 'shoes',
    label: 'حذاء لوفر',
    url: '/src/assets/images/prod_chunky_loafers_1795627912687.jpg',
  },
  {
    id: 'jewelry',
    label: 'مجوهرات ذهبية',
    url: '/src/assets/images/prod_gold_jewelry_1795627913090.jpg',
  },
  {
    id: 'beauty',
    label: 'سيروم وعناية',
    url: '/src/assets/images/prod_beauty_serum_1795627913519.jpg',
  },
  {
    id: 'audio',
    label: 'سماعة لاسلكية',
    url: '/src/assets/images/prod_smart_earbuds_1795627914063.jpg',
  },
  {
    id: 'lamp',
    label: 'أباجورة ديكور',
    url: '/src/assets/images/prod_ceramic_lamp_1795627914971.jpg',
  },
];

// Default catalog is intentionally empty per store owner request; admin adds live products via Admin Panel.
export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_ORDERS: OrderRecord[] = [];
