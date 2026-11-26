import { useEffect, useState } from 'react';
import {
  Check,
  Edit3,
  Eye,
  EyeOff,
  Lock,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
  Unlock,
  Upload,
  X,
} from 'lucide-react';
import { formatPrice } from '../data/currencies';
import { ADMIN_PASSCODE, STUDIO_IMAGE_PRESETS } from '../data/products';
import { TranslationStrings } from '../i18n/translations';
import { OrderRecord, OrderStatus, Product, ProductCategory } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface AdminSectionProps {
  t: TranslationStrings;
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: OrderRecord[];
  currency: string;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const DEFAULT_COLOR_OPTIONS = [
  { name: 'وردي أنيق', hex: '#C83E7D' },
  { name: 'بيج كريمي', hex: '#EAE5DA' },
  { name: 'أسود كلاسيك', hex: '#18181B' },
  { name: 'أبيض لؤلؤي', hex: '#F4F4F5' },
  { name: 'أحمر كريسماس', hex: '#9E1B32' },
];

export function AdminSection({
  t,
  isOpen,
  onClose,
  products,
  orders,
  currency,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
}: AdminSectionProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'add' | 'products' | 'orders'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.DRESSES);
  const [priceIqd, setPriceIqd] = useState('');
  const [originalPriceIqd, setOriginalPriceIqd] = useState('');
  const [tag, setTag] = useState('جديد الموسم');
  const [sizesInput, setSizesInput] = useState('XS, S, M, L, XL, XXL');
  const [material, setMaterial] = useState('قطن ناعم عالي الجودة');
  const [selectedColorNames, setSelectedColorNames] = useState<string[]>([
    'وردي أنيق',
    'أسود كلاسيك',
  ]);
  const [imageUrl, setImageUrl] = useState(STUDIO_IMAGE_PRESETS[0].url);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PASSCODE) {
      setIsUnlocked(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPinInput('');
    setPinError(false);
    setEditingId(null);
    onClose();
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setSubtitle('');
    setCategory(ProductCategory.DRESSES);
    setPriceIqd('');
    setOriginalPriceIqd('');
    setTag('جديد الموسم');
    setSizesInput('XS, S, M, L, XL, XXL');
    setMaterial('قطن ناعم عالي الجودة');
    setSelectedColorNames(['وردي أنيق', 'أسود كلاسيك']);
    setImageUrl(STUDIO_IMAGE_PRESETS[0].url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleColorChoice = (colorName: string) => {
    setSelectedColorNames((prev) =>
      prev.includes(colorName)
        ? prev.length > 1
          ? prev.filter((c) => c !== colorName)
          : prev
        : [...prev, colorName]
    );
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Number(priceIqd);
    if (!name.trim() || !Number.isFinite(numericPrice) || numericPrice <= 0) return;

    const numericOld = Number(originalPriceIqd);
    const parsedSizes = sizesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const colors = DEFAULT_COLOR_OPTIONS.filter((c) =>
      selectedColorNames.includes(c.name)
    );

    const productPayload: Product = {
      id: editingId || `al-${Date.now()}`,
      sku: editingId
        ? products.find((p) => p.id === editingId)?.sku || `AL-${Date.now().toString().slice(-4)}`
        : `AL-${Math.floor(1000 + Math.random() * 8999)}`,
      name: name.trim(),
      subtitle: subtitle.trim() || 'مريح وأنيق ومصمم للإطلالات اليومية',
      category,
      priceIqd: numericPrice,
      originalPriceIqd:
        Number.isFinite(numericOld) && numericOld > numericPrice ? numericOld : undefined,
      tag: tag.trim() || undefined,
      rating: 4.8,
      reviewCount: 0,
      soldCount: 0,
      image: imageUrl.trim() || STUDIO_IMAGE_PRESETS[0].url,
      colors: colors.length > 0 ? colors : [DEFAULT_COLOR_OPTIONS[0]],
      sizes: parsedSizes.length > 0 ? parsedSizes : ['مقاس موحد'],
      hasSizeGuide:
        category === ProductCategory.DRESSES || category === ProductCategory.PANTS,
      shippingEstimate: 'توصيل خلال 24–72 ساعة لجميع محافظات العراق',
      material: material.trim() || 'خامة ممتازة',
      description:
        subtitle.trim() ||
        'مريح وأنيق ومصمم للإطلالات اليومية الهادئة، قطعة مثالية لتشكيلة أليانز شوب.',
      specs: [
        { label: 'العملة الأساسية', value: 'الدينار العراقي (IQD)' },
        { label: 'التغليف', value: 'تغليف هدايا الكريسماس متاح' },
      ],
      reviews: [],
    };

    if (editingId) {
      onUpdateProduct(productPayload);
      setSaveFeedback('تم تحديث المنتج بنجاح');
    } else {
      onAddProduct(productPayload);
      setSaveFeedback('تمت إضافة المنتج إلى المتجر بنجاح');
    }

    resetForm();
    window.setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setSubtitle(product.subtitle);
    setCategory(product.category);
    setPriceIqd(String(product.priceIqd));
    setOriginalPriceIqd(product.originalPriceIqd ? String(product.originalPriceIqd) : '');
    setTag(product.tag || '');
    setSizesInput(product.sizes.join(', '));
    setMaterial(product.material);
    setSelectedColorNames(product.colors.map((c) => c.name));
    setImageUrl(product.image);
    setActiveTab('add');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.adminSectionTitle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {!isUnlocked ? (
        <div className="bg-white w-full max-w-sm rounded-3xl border border-[#F3D2E3] p-6 space-y-5 shadow-2xl relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full hover:bg-[#F6F6F8] flex items-center justify-center text-[#18181B] absolute top-4 end-4 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center gap-3 pt-2">
            <div className="w-12 h-12 rounded-2xl bg-[#FCEAF3] border border-[#F3D2E3] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#C83E7D]" />
            </div>
            <h2 className="font-display text-lg font-bold text-[#18181B]">
              {t.adminSectionTitle}
            </h2>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <div className="relative">
              <label htmlFor="admin-pin-input" className="sr-only">
                {t.adminPinPrompt}
              </label>
              <input
                id="admin-pin-input"
                type={showPin ? 'text' : 'password'}
                inputMode="numeric"
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (pinError) setPinError(false);
                }}
                placeholder="••••••"
                className="w-full min-h-[46px] bg-[#F6F6F8] border border-[#E4E4E7] rounded-full px-4 pe-11 text-center text-base font-mono tracking-widest text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
              />
              <button
                type="button"
                onClick={() => setShowPin((prev) => !prev)}
                aria-label="Toggle PIN visibility"
                className="absolute end-3.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#18181B] cursor-pointer"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {pinError && (
              <p className="text-xs text-center text-[#C83E7D] font-semibold">
                {t.adminPinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full min-h-[46px] px-6 py-2.5 bg-[#C83E7D] hover:bg-[#B2326D] text-white text-sm font-semibold rounded-full transition-colors duration-150 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>{t.adminSubmitPin}</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white w-full max-w-4xl max-h-[90vh] border border-[#F3D2E3] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-[#FCEAF3] px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#F3D2E3] shrink-0">
            <div className="flex items-center gap-3">
              <Unlock className="w-5 h-5 text-[#C83E7D]" />
              <div>
                <h2 className="font-display text-lg font-bold text-[#18181B]">
                  {t.adminSectionTitle}
                </h2>
                <p className="text-xs text-[#52525B]">
                  الأسعار الأساسية بالدينار العراقي (د.ع)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLock}
                className="min-h-[38px] px-4 py-1.5 bg-[#18181B] hover:bg-[#C83E7D] text-white text-xs font-semibold rounded-full transition-colors duration-150 inline-flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t.adminLockBtn}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#F6F6F8] flex items-center justify-center text-[#18181B] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-6 pt-3 border-b border-[#F1E8EE] flex flex-wrap items-center gap-2 bg-[#FFF8FB] shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('add')}
              className={`min-h-[40px] px-4 py-2 text-sm font-semibold rounded-t-2xl border-b-2 transition-colors inline-flex items-center gap-2 cursor-pointer ${
                activeTab === 'add'
                  ? 'border-[#C83E7D] bg-white text-[#C83E7D]'
                  : 'border-transparent text-[#52525B] hover:text-[#18181B]'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{editingId ? 'تعديل المنتج' : t.adminAddProduct}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`min-h-[40px] px-4 py-2 text-sm font-semibold rounded-t-2xl border-b-2 transition-colors inline-flex items-center gap-2 cursor-pointer tabular-nums ${
                activeTab === 'products'
                  ? 'border-[#C83E7D] bg-white text-[#C83E7D]'
                  : 'border-transparent text-[#52525B] hover:text-[#18181B]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {t.adminManageProducts} ({products.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`min-h-[40px] px-4 py-2 text-sm font-semibold rounded-t-2xl border-b-2 transition-colors inline-flex items-center gap-2 cursor-pointer tabular-nums ${
                activeTab === 'orders'
                  ? 'border-[#C83E7D] bg-white text-[#C83E7D]'
                  : 'border-transparent text-[#52525B] hover:text-[#18181B]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>
                {t.adminManageOrders} ({orders.length})
              </span>
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            {saveFeedback && (
              <div className="mb-5 p-3 rounded-2xl bg-[#FCEAF3] border border-[#F3D2E3] text-[#C83E7D] text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{saveFeedback}</span>
              </div>
            )}

            {activeTab === 'add' && (
              <form onSubmit={handleSubmitProduct} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prod-name" className="block text-xs font-medium text-[#18181B] mb-1">
                        اسم المنتج *
                      </label>
                      <input
                        id="prod-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثال: هودي أوفر سايز وردي"
                        className="w-full min-h-[42px] px-3.5 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                      />
                    </div>

                    <div>
                      <label htmlFor="prod-category" className="block text-xs font-medium text-[#18181B] mb-1">
                        القسم
                      </label>
                      <select
                        id="prod-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ProductCategory)}
                        className="w-full min-h-[42px] px-3.5 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                      >
                        <option value={ProductCategory.DRESSES}>
                          {t.categories[ProductCategory.DRESSES]}
                        </option>
                        <option value={ProductCategory.MAKEUP}>
                          {t.categories[ProductCategory.MAKEUP]}
                        </option>
                        <option value={ProductCategory.SKINCARE}>
                          {t.categories[ProductCategory.SKINCARE]}
                        </option>
                        <option value={ProductCategory.LENSES}>
                          {t.categories[ProductCategory.LENSES]}
                        </option>
                        <option value={ProductCategory.PERFUMES}>
                          {t.categories[ProductCategory.PERFUMES]}
                        </option>
                        <option value={ProductCategory.TOYS}>
                          {t.categories[ProductCategory.TOYS]}
                        </option>
                        <option value={ProductCategory.PANTS}>
                          {t.categories[ProductCategory.PANTS]}
                        </option>
                        <option value={ProductCategory.BAGS}>
                          {t.categories[ProductCategory.BAGS]}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="prod-subtitle" className="block text-xs font-medium text-[#18181B] mb-1">
                      الوصف
                    </label>
                    <input
                      id="prod-subtitle"
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="وصف الخامة أو تفاصيل القطعة..."
                      className="w-full min-h-[42px] px-3.5 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="prod-price" className="block text-xs font-medium text-[#18181B] mb-1">
                        السعر (د.ع) *
                      </label>
                      <input
                        id="prod-price"
                        type="number"
                        required
                        min={250}
                        step={250}
                        value={priceIqd}
                        onChange={(e) => setPriceIqd(e.target.value)}
                        placeholder="35000"
                        className="w-full min-h-[42px] px-3.5 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                      />
                    </div>

                    <div>
                      <label htmlFor="prod-old-price" className="block text-xs font-medium text-[#18181B] mb-1">
                        السعر قبل الخصم
                      </label>
                      <input
                        id="prod-old-price"
                        type="number"
                        min={0}
                        step={250}
                        value={originalPriceIqd}
                        onChange={(e) => setOriginalPriceIqd(e.target.value)}
                        placeholder="45000"
                        className="w-full min-h-[42px] px-3.5 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                      />
                    </div>

                    <div>
                      <label htmlFor="prod-sizes" className="block text-xs font-medium text-[#18181B] mb-1">
                        المقاسات
                      </label>
                      <input
                        id="prod-sizes"
                        type="text"
                        value={sizesInput}
                        onChange={(e) => setSizesInput(e.target.value)}
                        placeholder="XS, S, M, L, XL"
                        className="w-full min-h-[42px] px-3.5 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#18181B] mb-2">الألوان المتوفرة</p>
                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_COLOR_OPTIONS.map((c) => {
                        const active = selectedColorNames.includes(c.name);
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => toggleColorChoice(c.name)}
                            className={`min-h-[36px] px-3 py-1 rounded-full border text-xs font-medium inline-flex items-center gap-2 cursor-pointer ${
                              active
                                ? 'border-[#C83E7D] bg-[#FCEAF3] text-[#C83E7D]'
                                : 'border-[#E4E4E7] bg-white text-[#52525B]'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/15"
                              style={{ backgroundColor: c.hex }}
                            />
                            <span>{c.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F6F6F8] border border-[#E4E4E7]">
                    <ResilientImage
                      src={imageUrl}
                      alt={name || 'معاينة'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="min-h-[40px] px-4 py-2 bg-[#18181B] hover:bg-[#C83E7D] text-white text-xs font-semibold rounded-full inline-flex items-center gap-2 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>رفع صورة من الجهاز</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="url"
                      value={imageUrl.startsWith('data:') ? '' : imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="أو رابط الصورة..."
                      className="flex-1 min-h-[40px] px-3.5 bg-[#F6F6F8] border border-[#E4E4E7] rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                    />
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {STUDIO_IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
                        title={preset.label}
                        className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer ${
                          imageUrl === preset.url
                            ? 'border-[#C83E7D]'
                            : 'border-transparent hover:border-[#F3D2E3]'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 min-h-[46px] px-5 py-2.5 bg-[#C83E7D] hover:bg-[#B2326D] text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
                    >
                      {editingId ? 'حفظ التعديلات' : 'نشر المنتج في المتجر'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="min-h-[46px] px-4 py-2.5 bg-[#F6F6F8] text-sm font-medium rounded-full cursor-pointer"
                      >
                        إلغاء
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'products' && (
              <div>
                {products.length === 0 ? (
                  <div className="py-10 text-center text-sm text-[#52525B]">
                    لا توجد منتجات مضافة حتى الآن.
                  </div>
                ) : (
                  <div className="divide-y divide-[#F1E8EE]">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="py-3.5 flex flex-wrap items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F6F6F8] shrink-0">
                            <ResilientImage
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#18181B] truncate">{prod.name}</p>
                            <p className="text-xs text-[#C83E7D] font-semibold tabular-nums">
                              {formatPrice(prod.priceIqd, currency)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(prod)}
                            className="min-h-[36px] px-3.5 py-1.5 rounded-full border border-[#E4E4E7] text-xs font-medium text-[#18181B] hover:bg-[#F6F6F8] inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>تعديل</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteProduct(prod.id)}
                            className="min-h-[36px] px-3.5 py-1.5 rounded-full border border-[#F3D2E3] text-xs font-medium text-[#C83E7D] hover:bg-[#FCEAF3] inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                {orders.length === 0 ? (
                  <div className="py-10 text-center text-sm text-[#52525B]">
                    لا توجد طلبات واردة حتى الآن.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-2xl border border-[#F3D2E3] bg-[#FFF8FB] flex flex-wrap items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-bold font-mono text-[#18181B]">
                            #{order.id} — {order.customer.fullName}
                          </p>
                          <p className="text-xs text-[#52525B] tabular-nums">
                            {order.customer.city} · {order.customer.address} ({order.customer.phone}) ·{' '}
                            {formatPrice(order.totalIqd, currency)}
                          </p>
                          {order.customer.instagramUsername && (
                            <p className="text-xs text-[#C83E7D] font-mono">
                              إنستغرام العميل: {order.customer.instagramUsername}
                            </p>
                          )}
                          {order.items.length > 0 && (
                            <p className="text-[11px] text-[#71717A]">
                              {order.items.map((it) => `${it.name} (${it.size}) × ${it.quantity}`).join(' ، ')}
                            </p>
                          )}
                        </div>

                        <select
                          value={order.status}
                          onChange={(e) =>
                            onUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          aria-label={`Order status ${order.id}`}
                          className="min-h-[38px] px-3 bg-white border border-[#E4E4E7] rounded-full text-xs font-semibold text-[#18181B]"
                        >
                          <option value={OrderStatus.PREPARING}>قيد التجهيز</option>
                          <option value={OrderStatus.SHIPPED}>تم الشحن</option>
                          <option value={OrderStatus.DELIVERED}>تم التسليم</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
