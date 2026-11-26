import { LanguageCode, ProductCategory } from '../types/shop';

export interface LanguageOption {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  dir: 'rtl' | 'ltr';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl' },
  { code: 'ku', nativeName: 'کوردی', englishName: 'Kurdish', dir: 'rtl' },
  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr' },
  { code: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', dir: 'ltr' },
  { code: 'fa', nativeName: 'فارسی', englishName: 'Persian', dir: 'rtl' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr' },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr' },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr' },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr' },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese', dir: 'ltr' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr' },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean', dir: 'ltr' },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr' },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu', dir: 'rtl' },
  { code: 'id', nativeName: 'Bahasa Indonesia', englishName: 'Indonesian', dir: 'ltr' },
];

export function getLanguageMeta(code: LanguageCode): LanguageOption {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
}

export interface TranslationStrings {
  brandName: string;
  greetingTitle: string;
  greetingSub: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDesc: string;
  heroSearchPlaceholder: string;
  heroCta: string;
  popularPicks: string;
  seeAll: string;
  welcomeSkip: string;
  welcomeTag: string;
  welcomeHeadlineTop: string;
  welcomeHeadlineAccent: string;
  welcomeDesc: string;
  welcomeCta: string;
  bottomHome: string;
  bottomExplore: string;
  bottomWishlist: string;
  bottomProfile: string;
  bagButton: string;
  wishlistLabel: string;
  searchPlaceholder: string;
  sortBest: string;
  sortRated: string;
  sortLow: string;
  sortHigh: string;
  emptyStoreTitle: string;
  emptyStoreDesc: string;
  emptyStoreBtn: string;
  emptyFilterTitle: string;
  emptyFilterBtn: string;
  quickAdd: string;
  soldSuffix: string;
  footerDesc: string;
  languageLabel: string;
  currencyLabel: string;
  adminSectionTitle: string;
  adminLockedHint: string;
  adminUnlockBtn: string;
  adminLockBtn: string;
  adminPinPrompt: string;
  adminPinError: string;
  adminSubmitPin: string;
  adminAddProduct: string;
  adminManageProducts: string;
  adminManageOrders: string;
  cartEmptyTitle: string;
  cartEmptyDesc: string;
  cartContinue: string;
  cartCheckoutBtn: string;
  ordersModalTitle: string;
  ordersEmpty: string;
  addToCartCta: string;
  sizeGuide: string;
  descriptionLabel: string;
  colorLabel: string;
  sizeLabel: string;
  offLabel: string;
  googleSignInTitle: string;
  googleSignInDesc: string;
  googleSignInBtn: string;
  signOutBtn: string;
  orderTrackingTitle: string;
  statusPreparing: string;
  statusShipped: string;
  statusDelivered: string;
  loadingOrders: string;
  noTrackedOrders: string;
  checkoutAuthRequiredTitle: string;
  checkoutAuthRequiredDesc: string;
  reviewsTitle: string;
  writeReviewTitle: string;
  reviewPlaceholder: string;
  submitReviewBtn: string;
  reviewAuthRequired: string;
  noReviewsYet: string;
  reviewsCountLabel: string;
  promoBannerText: string;
  promoCodeLabel: string;
  promoDays: string;
  promoHours: string;
  promoMinutes: string;
  promoSeconds: string;
  promoDismissLabel: string;
  promoCopiedToast: string;
  quickViewLabel: string;
  fullDetailsBtn: string;
  myOrdersBtn: string;
  activeDeliveryBannerTitle: string;
  viewAllOrdersBtn: string;
  deliveryStepConfirmed: string;
  deliveryStepOnTheWay: string;
  deliveryStepDelivered: string;
  orderedItemsLabel: string;
  deliveryAddressLabel: string;
  estimatedDeliveryLabel: string;
  categories: Record<ProductCategory, string>;
}

const AR: TranslationStrings = {
  brandName: 'أليانز شوب',
  greetingTitle: 'أهلاً بكِ في أليانز شوب',
  greetingSub: 'اكتشفي إطلالتك المثالية اليوم!',
  heroEyebrow: 'تشكيلة الكريسماس الجديدة',
  heroTitle: 'أجواء الكريسماس وصلت!',
  heroDesc: 'إطلالات دافئة وهدايا مختارة بالدينار العراقي وعملات العالم.',
  heroSearchPlaceholder: 'ابحثي عن الأزياء، الحقائب، الماركات...',
  heroCta: 'تسوقي الآن',
  popularPicks: 'الاختيارات الرائجة',
  seeAll: 'عرض الكل',
  welcomeSkip: 'تخطي',
  welcomeTag: 'أسلوب عصري',
  welcomeHeadlineTop: 'رحلتك في عالم الأناقة',
  welcomeHeadlineAccent: 'تبدأ من هنا',
  welcomeDesc: 'اكتشفي أحدث الصيحات والمجموعات الحصرية التي تناسب ذوقك في كل موسم.',
  welcomeCta: 'ابدئي التسوق',
  bottomHome: 'الرئيسية',
  bottomExplore: 'استكشاف',
  bottomWishlist: 'المفضلة',
  bottomProfile: 'حسابي',
  bagButton: 'السلة',
  wishlistLabel: 'المفضلة',
  searchPlaceholder: 'ابحثي عن الأزياء، الحقائب، الماركات...',
  sortBest: 'الأكثر مبيعاً',
  sortRated: 'الأعلى تقييماً',
  sortLow: 'السعر: من الأقل',
  sortHigh: 'السعر: من الأعلى',
  emptyStoreTitle: 'لا توجد منتجات مضافة حالياً',
  emptyStoreDesc: 'تم حذف المنتجات الافتراضية. يمكنكِ فتح قائمة الإدارة في الأسفل برمز القفل لإضافة منتجات الكريسماس الجديدة.',
  emptyStoreBtn: 'فتح قائمة الإدارة بالأسفل',
  emptyFilterTitle: 'لم نجد منتجات مطابقة لبحثك',
  emptyFilterBtn: 'عرض الكل',
  quickAdd: 'إضافة',
  soldSuffix: 'مبيعاً',
  footerDesc: 'متجر أليانز شوب — أزياء وإكسسوارات عصرية بأجواء الكريسماس، العملة الرئيسية الدينار العراقي.',
  languageLabel: 'اللغة',
  currencyLabel: 'العملة',
  adminSectionTitle: 'قائمة الإدارة',
  adminLockedHint: 'مقفلة برمز الحماية — أدخلي رمز الإدارة لإضافة وتعديل المنتجات والطلبات',
  adminUnlockBtn: 'فتح الإدارة',
  adminLockBtn: 'قفل الإدارة',
  adminPinPrompt: 'أدخلي رمز القفل',
  adminPinError: 'رمز القفل غير صحيح',
  adminSubmitPin: 'دخول',
  adminAddProduct: 'إضافة منتج جديد',
  adminManageProducts: 'المنتجات المضافة',
  adminManageOrders: 'الطلبات الواردة',
  cartEmptyTitle: 'سلة التسوق فارغة حالياً',
  cartEmptyDesc: 'أضيفي قطعك المفضلة لإتمام الطلب.',
  cartContinue: 'متابعة التسوق',
  cartCheckoutBtn: 'إتمام الطلب',
  ordersModalTitle: 'الطلبات والتتبع',
  ordersEmpty: 'لا توجد طلبات مسجلة حتى الآن.',
  addToCartCta: 'أضف إلى السلة',
  sizeGuide: 'دليل المقاسات',
  descriptionLabel: 'الوصف',
  colorLabel: 'اللون',
  sizeLabel: 'المقاس',
  offLabel: 'خصم',
  googleSignInTitle: 'تسجيل الدخول بحساب Google مطلوب',
  googleSignInDesc: 'للدخول إلى قائمة حسابي، متابعة طلباتك، وحفظ بياناتك، يرجى تسجيل الدخول بحساب Google الخاص بك.',
  googleSignInBtn: 'المتابعة باستخدام Google',
  signOutBtn: 'تسجيل الخروج',
  orderTrackingTitle: 'تتبع الطلبات',
  statusPreparing: 'قيد المعالجة',
  statusShipped: 'تم الشحن',
  statusDelivered: 'تم التسليم',
  loadingOrders: 'جاري تحميل طلباتك...',
  noTrackedOrders: 'لا توجد طلبات مسجلة في حسابك حتى الآن.',
  checkoutAuthRequiredTitle: 'يجب تسجيل الدخول لإتمام الطلب',
  checkoutAuthRequiredDesc: 'لضمان حفظ ومتابعة طلبك، لا يمكن إرسال أي طلب إلا بعد تسجيل الدخول بحساب Google.',
  reviewsTitle: 'التقييمات والآراء',
  writeReviewTitle: 'أضيفي تقييمك للمنتج',
  reviewPlaceholder: 'اكتبي تعليقك وتجربتك مع المنتج...',
  submitReviewBtn: 'نشر التقييم',
  reviewAuthRequired: 'إضافة التقييم متاحة للمستخدمين المسجلين بحساب Google فقط.',
  noReviewsYet: 'لا توجد تقييمات بعد — كوني أول من يقيّم هذا المنتج.',
  reviewsCountLabel: 'تقييم',
  promoBannerText: 'خصم 20% على جميع منتجات الكريسماس',
  promoCodeLabel: 'كود الخصم',
  promoDays: 'ي',
  promoHours: 'س',
  promoMinutes: 'د',
  promoSeconds: 'ث',
  promoDismissLabel: 'إغلاق الإعلان',
  promoCopiedToast: 'تم نسخ كود الخصم XMAS20',
  quickViewLabel: 'عرض سريع',
  fullDetailsBtn: 'عرض كامل',
  myOrdersBtn: 'طلباتي',
  activeDeliveryBannerTitle: 'متابعة التوصيل المباشر',
  viewAllOrdersBtn: 'عرض تفاصيل التوصيل',
  deliveryStepConfirmed: 'تأكيد وتجهيز',
  deliveryStepOnTheWay: 'في الطريق إليك',
  deliveryStepDelivered: 'تم التسليم',
  orderedItemsLabel: 'المنتجات',
  deliveryAddressLabel: 'عنوان التوصيل',
  estimatedDeliveryLabel: 'موعد الوصول المتوقع',
  categories: {
    [ProductCategory.ALL]: 'الكل',
    [ProductCategory.DRESSES]: 'فساتين',
    [ProductCategory.MAKEUP]: 'ميكب',
    [ProductCategory.SKINCARE]: 'سكنكير',
    [ProductCategory.LENSES]: 'لنزز',
    [ProductCategory.PERFUMES]: 'عطور',
    [ProductCategory.TOYS]: 'العاب',
    [ProductCategory.PANTS]: 'بنطلون',
    [ProductCategory.BAGS]: 'حقائب',
  },
};

const KU: TranslationStrings = {
  ...AR,
  brandName: 'ئەلیانز شۆپ',
  greetingTitle: 'بەخێربێیت بۆ ئەلیانز شۆپ',
  greetingSub: 'ستایلی تایبەتی خۆت ئەمڕۆ بدۆزەرەوە!',
  heroEyebrow: 'کۆمەڵەی نوێی کریسمس',
  heroTitle: 'کەشوهەوای کریسمس گەیشت!',
  heroDesc: 'جلوبەرگ و دیاری ناوازە بە دیناری عێراقی و هەموو دراوەکان.',
  heroSearchPlaceholder: 'بگەڕێ بۆ جلوبەرگ، جانتا، براندەکان...',
  heroCta: 'ئێستا بکڕە',
  popularPicks: 'هەڵبژاردە بەناوبانگەکان',
  seeAll: 'هەمووی ببینە',
  welcomeSkip: 'تێپەڕاندن',
  welcomeTag: 'ستایلی نوێ',
  welcomeHeadlineTop: 'گەشتی فاشنی تۆ',
  welcomeHeadlineAccent: 'لێرەوە دەست پێدەکات',
  welcomeCta: 'دەست پێبکە',
  bottomHome: 'سەرەکی',
  bottomExplore: 'گەڕان',
  bottomWishlist: 'دڵخوازەکان',
  bottomProfile: 'پرۆفایل',
  bagButton: 'سەبەتە',
  wishlistLabel: 'دڵخوازەکان',
  emptyStoreTitle: 'هیچ کاڵایەک زیاد نەکراوە',
  emptyStoreBtn: 'چوون بۆ بەڕێوەبردن لە خوارەوە',
  languageLabel: 'زمان',
  currencyLabel: 'دراو',
  adminSectionTitle: 'لیستی بەڕێوەبردن',
  adminLockBtn: 'قفڵکردن',
  adminSubmitPin: 'چوونەژوورەوە',
  addToCartCta: 'زیادکردن بۆ سەبەتە',
  sizeGuide: 'ڕێنمایی قەبارە',
  descriptionLabel: 'وەسف',
  colorLabel: 'ڕەنگ',
  sizeLabel: 'قەبارە',
  googleSignInTitle: 'چوونەژوورەوە بە هەژماری Google پێویستە',
  googleSignInDesc: 'بۆ کردنەوەی لیستی هەژمارەکەم و بەدواداچوونی داواکارییەکان، تکایە بە Google بچۆ ژوورەوە.',
  googleSignInBtn: 'بەردەوامبوون بە Google',
  signOutBtn: 'چوونەدەرەوە',
  orderTrackingTitle: 'بەدواداچوونی داواکارییەکان',
  statusPreparing: 'لە ژێر ئامادەکردندایە',
  statusShipped: 'نێردرا',
  statusDelivered: 'گەیشت',
  loadingOrders: 'بارکردنی داواکارییەکان...',
  noTrackedOrders: 'هیچ داواکارییەک تۆمار نەکراوە.',
  checkoutAuthRequiredTitle: 'چوونەژوورەوە پێویستە بۆ داواکاری',
  checkoutAuthRequiredDesc: 'ناتوانیت داواکاری بنێریت تا بە هەژماری Google نەچیتە ژوورەوە.',
  reviewsTitle: 'هەڵسەنگاندنەکان',
  writeReviewTitle: 'هەڵسەنگاندنی خۆت بنووسە',
  reviewPlaceholder: 'بۆچوونی خۆت لەسەر کاڵاکە بنووسە...',
  submitReviewBtn: 'بڵاوکردنەوە',
  reviewAuthRequired: 'تەنها بەکارهێنەرانی تۆمارکراو دەتوانن هەڵسەنگاندن بنووسن.',
  noReviewsYet: 'هێشتا هیچ هەڵسەنگاندنێک نییە.',
  reviewsCountLabel: 'هەڵسەنگاندن',
  promoBannerText: 'داشکاندنی 20% بۆ هەموو بەرهەمەکانی کریسمس',
  promoCodeLabel: 'کۆد',
  promoDays: 'ڕ',
  promoHours: 'ک',
  promoMinutes: 'خ',
  promoSeconds: 'چ',
  promoDismissLabel: 'داخستن',
  promoCopiedToast: 'کۆدی XMAS20 کۆپی کرا',
  quickViewLabel: 'بینینی خێرا',
  fullDetailsBtn: 'وردەکاری تەواو',
  myOrdersBtn: 'داواکارییەکانم',
  activeDeliveryBannerTitle: 'بەدواداچوونی گەیاندن',
  viewAllOrdersBtn: 'وردەکاری گەیاندن',
  deliveryStepConfirmed: 'ئامادەکردن',
  deliveryStepOnTheWay: 'لە ڕێگادایە',
  deliveryStepDelivered: 'گەیشت',
  orderedItemsLabel: 'کاڵاکان',
  deliveryAddressLabel: 'ناونیشانی گەیاندن',
  estimatedDeliveryLabel: 'کاتی گەیشتن',
  categories: {
    [ProductCategory.ALL]: 'هەموو',
    [ProductCategory.DRESSES]: 'عەزی و فستان',
    [ProductCategory.MAKEUP]: 'مەیکەپ',
    [ProductCategory.SKINCARE]: 'چاودێری پێست',
    [ProductCategory.LENSES]: 'لێنز',
    [ProductCategory.PERFUMES]: 'بۆن',
    [ProductCategory.TOYS]: 'یاری',
    [ProductCategory.PANTS]: 'پانتۆڵ',
    [ProductCategory.BAGS]: 'جانتا',
  },
};

const EN: TranslationStrings = {
  brandName: 'Alians Shop',
  greetingTitle: 'Hello, Welcome',
  greetingSub: 'Find your perfect style today!',
  heroEyebrow: 'New Christmas Collection',
  heroTitle: 'Christmas Vibes Are Here!',
  heroDesc: 'Festive styles for a brighter you, priced in IQD & world currencies.',
  heroSearchPlaceholder: 'Search for outfits, brands...',
  heroCta: 'Shop Now',
  popularPicks: 'Popular Picks',
  seeAll: 'See All',
  welcomeSkip: 'Skip',
  welcomeTag: 'Trendy Style',
  welcomeHeadlineTop: 'Your Fashion Journey',
  welcomeHeadlineAccent: 'Starts Here',
  welcomeDesc: 'Discover the latest trends, exclusive collections and styles that match your vibe.',
  welcomeCta: 'Get Started',
  bottomHome: 'Home',
  bottomExplore: 'Explore',
  bottomWishlist: 'Wishlist',
  bottomProfile: 'Profile',
  bagButton: 'Cart',
  wishlistLabel: 'Wishlist',
  searchPlaceholder: 'Search for outfits, brands...',
  sortBest: 'Best Selling',
  sortRated: 'Top Rated',
  sortLow: 'Price: Low to High',
  sortHigh: 'Price: High to Low',
  emptyStoreTitle: 'No products added yet',
  emptyStoreDesc: 'Default items are cleared. Unlock the Admin Panel at the bottom to publish your products.',
  emptyStoreBtn: 'Open Admin Panel below',
  emptyFilterTitle: 'No matching products found',
  emptyFilterBtn: 'Show All',
  quickAdd: 'Add',
  soldSuffix: 'sold',
  footerDesc: 'Alians Shop — Fashion & lifestyle storefront with Christmas atmosphere and Iraqi Dinar primary currency.',
  languageLabel: 'Language',
  currencyLabel: 'Currency',
  adminSectionTitle: 'Admin Panel',
  adminLockedHint: 'PIN-locked — Enter admin passcode to manage products & orders',
  adminUnlockBtn: 'Unlock Admin',
  adminLockBtn: 'Lock Admin',
  adminPinPrompt: 'Enter passcode',
  adminPinError: 'Incorrect passcode',
  adminSubmitPin: 'Unlock',
  adminAddProduct: 'Add New Product',
  adminManageProducts: 'Manage Products',
  adminManageOrders: 'Customer Orders',
  cartEmptyTitle: 'Your bag is empty',
  cartEmptyDesc: 'Add your favorite pieces to proceed to checkout.',
  cartContinue: 'Continue Shopping',
  cartCheckoutBtn: 'Checkout',
  ordersModalTitle: 'Orders & Tracking',
  ordersEmpty: 'No orders placed yet.',
  addToCartCta: 'Add to Cart',
  sizeGuide: 'Size Guide',
  descriptionLabel: 'Description',
  colorLabel: 'Color',
  sizeLabel: 'Size',
  offLabel: 'OFF',
  googleSignInTitle: 'Google Account Required',
  googleSignInDesc: 'To access your account profile and sync your orders, please sign in with your Google account.',
  googleSignInBtn: 'Continue with Google',
  signOutBtn: 'Sign Out',
  orderTrackingTitle: 'Order Tracking',
  statusPreparing: 'Processing',
  statusShipped: 'Shipped',
  statusDelivered: 'Delivered',
  loadingOrders: 'Loading your orders...',
  noTrackedOrders: 'No orders recorded in your account yet.',
  checkoutAuthRequiredTitle: 'Account Sign-In Required',
  checkoutAuthRequiredDesc: 'You must sign in with a Google account before placing an order.',
  reviewsTitle: 'Customer Reviews',
  writeReviewTitle: 'Add Your Rating & Review',
  reviewPlaceholder: 'Share your thoughts about this product...',
  submitReviewBtn: 'Post Review',
  reviewAuthRequired: 'Only signed-in users can add a star rating and review.',
  noReviewsYet: 'No reviews yet — be the first to review this item.',
  reviewsCountLabel: 'reviews',
  promoBannerText: '20% OFF all Christmas products',
  promoCodeLabel: 'Code',
  promoDays: 'd',
  promoHours: 'h',
  promoMinutes: 'm',
  promoSeconds: 's',
  promoDismissLabel: 'Dismiss banner',
  promoCopiedToast: 'Promo code XMAS20 copied',
  quickViewLabel: 'Quick View',
  fullDetailsBtn: 'Full View',
  myOrdersBtn: 'My Orders',
  activeDeliveryBannerTitle: 'Live Delivery Tracker',
  viewAllOrdersBtn: 'Track Orders',
  deliveryStepConfirmed: 'Preparing',
  deliveryStepOnTheWay: 'On the Way',
  deliveryStepDelivered: 'Delivered',
  orderedItemsLabel: 'Items',
  deliveryAddressLabel: 'Delivery Address',
  estimatedDeliveryLabel: 'Estimated Arrival',
  categories: {
    [ProductCategory.ALL]: 'All',
    [ProductCategory.DRESSES]: 'Dresses',
    [ProductCategory.MAKEUP]: 'Makeup',
    [ProductCategory.SKINCARE]: 'Skincare',
    [ProductCategory.LENSES]: 'Lenses',
    [ProductCategory.PERFUMES]: 'Perfumes',
    [ProductCategory.TOYS]: 'Toys',
    [ProductCategory.PANTS]: 'Pants',
    [ProductCategory.BAGS]: 'Bags',
  },
};

const TR: TranslationStrings = {
  ...EN,
  greetingTitle: 'Merhaba, Hoş Geldiniz',
  greetingSub: 'Bugün tarzınızı keşfedin!',
  heroEyebrow: 'Yeni Noel Koleksiyonu',
  heroTitle: 'Noel Ruhu Burada!',
  heroCta: 'Alışverişe Başla',
  popularPicks: 'Popüler Seçimler',
  seeAll: 'Tümünü Gör',
  welcomeSkip: 'Atla',
  welcomeHeadlineTop: 'Moda Yolculuğun',
  welcomeHeadlineAccent: 'Burada Başlıyor',
  welcomeCta: 'Başla',
  bottomHome: 'Ana Sayfa',
  bottomExplore: 'Keşfet',
  bottomWishlist: 'Favoriler',
  bottomProfile: 'Profil',
  languageLabel: 'Dil',
  currencyLabel: 'Para Birimi',
  adminSectionTitle: 'Yönetici Paneli',
  addToCartCta: 'Sepete Ekle',
  sizeGuide: 'Beden Rehberi',
  descriptionLabel: 'Açıklama',
  colorLabel: 'Renk',
  sizeLabel: 'Beden',
};

const FA: TranslationStrings = {
  ...AR,
  brandName: 'آلیانز شاپ',
  greetingTitle: 'سلام، خوش آمدید',
  greetingSub: 'امروز استایل ایده‌آل خود را پیدا کنید!',
  heroEyebrow: 'کلکسیون جدید کریسمس',
  heroTitle: 'حال و هوای کریسمس رسید!',
  heroCta: 'خرید کنید',
  popularPicks: 'انتخاب‌های محبوب',
  seeAll: 'مشاهده همه',
  welcomeSkip: 'رد کردن',
  welcomeHeadlineTop: 'سفر مد و استایل شما',
  welcomeHeadlineAccent: 'از اینجا شروع می‌شود',
  welcomeCta: 'شروع کنید',
  bottomHome: 'خانه',
  bottomExplore: 'کاوش',
  bottomWishlist: 'علاقه‌مندی',
  bottomProfile: 'پروفایل',
  languageLabel: 'زبان',
  currencyLabel: 'واحد پول',
  adminSectionTitle: 'پنل مدیریت',
  addToCartCta: 'افزودن به سبد خرید',
  sizeGuide: 'راهنمای سایز',
  descriptionLabel: 'توضیحات',
  colorLabel: 'رنگ',
  sizeLabel: 'سایز',
};

const FR: TranslationStrings = {
  ...EN,
  greetingTitle: 'Bonjour, Bienvenue',
  heroEyebrow: 'Collection de Noël',
  heroTitle: 'L’esprit de Noël est là !',
  heroCta: 'Acheter',
  popularPicks: 'Sélections populaires',
  seeAll: 'Tout voir',
  welcomeSkip: 'Passer',
  welcomeHeadlineTop: 'Votre style commence',
  welcomeHeadlineAccent: 'Ici',
  welcomeCta: 'Commencer',
  bottomHome: 'Accueil',
  bottomExplore: 'Explorer',
  bottomWishlist: 'Favoris',
  bottomProfile: 'Profil',
  languageLabel: 'Langue',
  currencyLabel: 'Devise',
  addToCartCta: 'Ajouter au panier',
  sizeGuide: 'Guide des tailles',
  descriptionLabel: 'Description',
  colorLabel: 'Couleur',
  sizeLabel: 'Taille',
};

const DE: TranslationStrings = {
  ...EN,
  greetingTitle: 'Hallo, Willkommen',
  heroEyebrow: 'Weihnachtskollektion',
  heroTitle: 'Weihnachtsstimmung ist da!',
  heroCta: 'Jetzt shoppen',
  popularPicks: 'Beliebte Picks',
  seeAll: 'Alle ansehen',
  welcomeSkip: 'Überspringen',
  bottomHome: 'Start',
  bottomExplore: 'Entdecken',
  bottomWishlist: 'Merkliste',
  bottomProfile: 'Profil',
  languageLabel: 'Sprache',
  currencyLabel: 'Währung',
  addToCartCta: 'In den Warenkorb',
};

const ES: TranslationStrings = {
  ...EN,
  greetingTitle: 'Hola, Bienvenida',
  heroEyebrow: 'Nueva Colección Navidad',
  heroTitle: '¡Llegó la Navidad!',
  heroCta: 'Comprar ahora',
  popularPicks: 'Populares',
  seeAll: 'Ver todo',
  welcomeSkip: 'Saltar',
  bottomHome: 'Inicio',
  bottomExplore: 'Explorar',
  bottomWishlist: 'Favoritos',
  bottomProfile: 'Perfil',
  languageLabel: 'Idioma',
  currencyLabel: 'Moneda',
  addToCartCta: 'Añadir al carrito',
};

const IT: TranslationStrings = {
  ...EN,
  greetingTitle: 'Ciao, Benvenuta',
  heroEyebrow: 'Collezione Natale',
  heroTitle: 'L’atmosfera di Natale è qui!',
  heroCta: 'Acquista ora',
  popularPicks: 'Scelte popolari',
  seeAll: 'Vedi tutto',
  bottomHome: 'Home',
  bottomExplore: 'Esplora',
  bottomWishlist: 'Preferiti',
  bottomProfile: 'Profilo',
  languageLabel: 'Lingua',
  currencyLabel: 'Valuta',
  addToCartCta: 'Aggiungi al carrello',
};

const PT: TranslationStrings = {
  ...EN,
  greetingTitle: 'Olá, Bem-vinda',
  heroEyebrow: 'Coleção de Natal',
  heroTitle: 'O clima de Natal chegou!',
  heroCta: 'Comprar agora',
  popularPicks: 'Destaques',
  seeAll: 'Ver tudo',
  bottomHome: 'Início',
  bottomExplore: 'Explorar',
  bottomWishlist: 'Favoritos',
  bottomProfile: 'Perfil',
  languageLabel: 'Idioma',
  currencyLabel: 'Moeda',
  addToCartCta: 'Adicionar ao carrinho',
};

const RU: TranslationStrings = {
  ...EN,
  greetingTitle: 'Привет, добро пожаловать',
  heroEyebrow: 'Рождественская коллекция',
  heroTitle: 'Время Рождества настало!',
  heroCta: 'В магазин',
  popularPicks: 'Популярное',
  seeAll: 'Смотреть все',
  bottomHome: 'Главная',
  bottomExplore: 'Поиск',
  bottomWishlist: 'Избранное',
  bottomProfile: 'Профиль',
  languageLabel: 'Язык',
  currencyLabel: 'Валюта',
  addToCartCta: 'В корзину',
};

const ZH: TranslationStrings = {
  ...EN,
  greetingTitle: '你好，欢迎光临',
  heroEyebrow: '全新圣诞系列',
  heroTitle: '圣诞氛围已上线！',
  heroCta: '立即选购',
  popularPicks: '热门推荐',
  seeAll: '查看全部',
  bottomHome: '首页',
  bottomExplore: '发现',
  bottomWishlist: '心愿单',
  bottomProfile: '我的',
  languageLabel: '语言',
  currencyLabel: '货币',
  addToCartCta: '加入购物袋',
};

const JA: TranslationStrings = {
  ...EN,
  greetingTitle: 'こんにちは、ようこそ',
  heroEyebrow: 'クリスマス新作',
  heroTitle: 'クリスマスの季節が到来！',
  heroCta: '今すぐ見る',
  popularPicks: '人気アイテム',
  seeAll: 'すべて見る',
  bottomHome: 'ホーム',
  bottomExplore: '探す',
  bottomWishlist: 'お気に入り',
  bottomProfile: 'プロフィール',
  languageLabel: '言語',
  currencyLabel: '通貨',
  addToCartCta: 'カートに追加',
};

const KO: TranslationStrings = {
  ...EN,
  greetingTitle: '안녕하세요, 환영합니다',
  heroEyebrow: '새 크리스마스 컬렉션',
  heroTitle: '크리스마스 무드가 왔어요!',
  heroCta: '지금 쇼핑하기',
  popularPicks: '인기 추천',
  seeAll: '전체 보기',
  bottomHome: '홈',
  bottomExplore: '탐색',
  bottomWishlist: '위시리스트',
  bottomProfile: '프로필',
  languageLabel: '언어',
  currencyLabel: '통화',
  addToCartCta: '장바구니 담기',
};

const HI: TranslationStrings = {
  ...EN,
  greetingTitle: 'नमस्ते, स्वागत है',
  heroEyebrow: 'नया क्रिसमस कलेक्शन',
  heroTitle: 'क्रिसमस का जश्न शुरू!',
  heroCta: 'अभी खरीदें',
  popularPicks: 'लोकप्रिय पसंद',
  seeAll: 'सभी देखें',
  bottomHome: 'होम',
  bottomExplore: 'खोजें',
  bottomWishlist: 'पसंदीदा',
  bottomProfile: 'प्रोफ़ाइल',
  languageLabel: 'भाषा',
  currencyLabel: 'मुद्रा',
  addToCartCta: 'कार्ट में जोड़ें',
};

const UR: TranslationStrings = {
  ...AR,
  greetingTitle: 'خوش آمدید',
  heroEyebrow: 'نئی کرسمس کلیکشن',
  heroTitle: 'کرسمس کی خوشیاں آ گئیں!',
  heroCta: 'ابھی خریدیں',
  popularPicks: 'مقبول انتخاب',
  seeAll: 'سب دیکھیں',
  bottomHome: 'ہوم',
  bottomExplore: 'تلاش',
  bottomWishlist: 'پسندیدہ',
  bottomProfile: 'پروفائل',
  languageLabel: 'زبان',
  currencyLabel: 'کرنسی',
  addToCartCta: 'کارٹ میں شامل کریں',
};

const ID: TranslationStrings = {
  ...EN,
  greetingTitle: 'Halo, Selamat Datang',
  heroEyebrow: 'Koleksi Natal Baru',
  heroTitle: 'Suasana Natal Telah Tiba!',
  heroCta: 'Belanja Sekarang',
  popularPicks: 'Pilihan Populer',
  seeAll: 'Lihat Semua',
  bottomHome: 'Beranda',
  bottomExplore: 'Jelajah',
  bottomWishlist: 'Favorit',
  bottomProfile: 'Profil',
  languageLabel: 'Bahasa',
  currencyLabel: 'Mata Uang',
  addToCartCta: 'Tambah ke Keranjang',
};

const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  ar: AR,
  ku: KU,
  en: EN,
  tr: TR,
  fa: FA,
  fr: FR,
  de: DE,
  es: ES,
  it: IT,
  pt: PT,
  ru: RU,
  zh: ZH,
  ja: JA,
  ko: KO,
  hi: HI,
  ur: UR,
  id: ID,
};

export function getTranslations(lang: LanguageCode): TranslationStrings {
  return TRANSLATIONS[lang] || AR;
}
