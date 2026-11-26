import { useEffect, useRef, useState } from 'react';
import { User } from 'firebase/auth';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  Lock,
  Minus,
  Plus,
  Send,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { formatPrice } from '../data/currencies';
import {
  FREE_SHIPPING_THRESHOLD_IQD,
  PROMO_CODES,
  STANDARD_SHIPPING_IQD,
  STORE_INSTAGRAM_URL,
  STORE_INSTAGRAM_USERNAME,
} from '../data/products';
import { TranslationStrings } from '../i18n/translations';
import {
  CartItem,
  CustomerDetails,
  OrderRecord,
  OrderStatus,
  PaymentMethod,
} from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  t: TranslationStrings;
  isOpen: boolean;
  initialStep: 'cart' | 'checkout';
  items: CartItem[];
  currency: string;
  user: User | null;
  authLoading: boolean;
  authError: string | null;
  onGoogleSignIn: () => Promise<void>;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onPlaceOrder: (order: OrderRecord) => void;
}

function buildInstagramOrderText(order: OrderRecord, currency: string): string {
  const itemLines = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.color} · ${item.size}) × ${item.quantity} — ${formatPrice(
          item.priceIqd * item.quantity,
          currency
        )}`
    )
    .join('\n');

  const paymentLabel =
    order.paymentMethod === PaymentMethod.COD ? 'الدفع عند الاستلام' : 'بطاقة مصرفية / زين كاش';

  const lines = [
    `طلب جديد - متجر أليانز شوب`,
    `رقم الطلب: #${order.id}`,
    `إنستغرام المتجر: @${STORE_INSTAGRAM_USERNAME}`,
    `----------------`,
    `الاسم: ${order.customer.fullName}`,
    `الهاتف: ${order.customer.phone}`,
    ...(order.customer.instagramUsername
      ? [`إنستغرام العميل: ${order.customer.instagramUsername}`]
      : []),
    `المحافظة: ${order.customer.city}`,
    `العنوان: ${order.customer.address}`,
    ...(order.customer.postalCode ? [`نقطة دالة: ${order.customer.postalCode}`] : []),
    `طريقة الدفع: ${paymentLabel}`,
    `----------------`,
    `المنتجات:`,
    itemLines,
    `----------------`,
    `المجموع الفرعي: ${formatPrice(order.subtotalIqd, currency)}`,
    ...(order.discountIqd > 0 ? [`الخصم: -${formatPrice(order.discountIqd, currency)}`] : []),
    `التوصيل: ${order.shippingIqd === 0 ? 'مجاني' : formatPrice(order.shippingIqd, currency)}`,
    `الإجمالي النهائي: ${formatPrice(order.totalIqd, currency)}`,
  ];

  return lines.join('\n');
}

export function CartDrawer({
  t,
  isOpen,
  initialStep,
  items,
  currency,
  user,
  authLoading,
  authError,
  onGoogleSignIn,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>(initialStep);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [orderSummaryText, setOrderSummaryText] = useState('');
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const instaAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    instagramUsername: '',
    city: 'بغداد',
    address: '',
    postalCode: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setFormError(null);
    }
  }, [isOpen, initialStep]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotalIqd = items.reduce((sum, item) => sum + item.priceIqd * item.quantity, 0);
  const promoPercent = appliedPromo ? PROMO_CODES[appliedPromo]?.percent ?? 0 : 0;
  const discountIqd = Math.round((subtotalIqd * promoPercent) / 100);
  const afterDiscountIqd = Math.max(0, subtotalIqd - discountIqd);
  const qualifiesFreeShipping =
    afterDiscountIqd >= FREE_SHIPPING_THRESHOLD_IQD || items.length === 0;
  const shippingIqd = qualifiesFreeShipping ? 0 : STANDARD_SHIPPING_IQD;
  const totalIqd = afterDiscountIqd + shippingIqd;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_IQD - afterDiscountIqd);
  const progressPercent = Math.min(
    100,
    Math.round((afterDiscountIqd / FREE_SHIPPING_THRESHOLD_IQD) * 100)
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError(null);
    } else {
      setPromoError('كود الخصم غير صالح. جربي XMAS20 أو ALIANS15');
    }
  };

  const copyOrderSummary = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedReceipt(true);
      window.setTimeout(() => setCopiedReceipt(false), 3000);
    } catch {
      setCopiedReceipt(false);
    }
  };

  const handleLoginInCheckout = async () => {
    setSigningIn(true);
    try {
      await onGoogleSignIn();
    } finally {
      setSigningIn(false);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.emailVerified) {
      setFormError(t.checkoutAuthRequiredDesc);
      return;
    }
    if (
      !customer.fullName.trim() ||
      customer.phone.trim().length < 8 ||
      !customer.city.trim() ||
      !customer.address.trim()
    ) {
      setFormError('يرجى تعبئة الاسم ورقم الهاتف والمحافظة والعنوان لإتمام الطلب.');
      return;
    }

    const orderNumber = `AL-${Math.floor(1100 + Math.random() * 8800)}`;
    const normalizedCustomer: CustomerDetails = {
      ...customer,
      fullName: customer.fullName.trim(),
      phone: customer.phone.trim(),
      instagramUsername: customer.instagramUsername?.trim() || undefined,
      city: customer.city.trim(),
      address: customer.address.trim(),
      postalCode: customer.postalCode.trim(),
    };

    const newOrder: OrderRecord = {
      id: orderNumber,
      createdAt: new Date().toISOString(),
      status: OrderStatus.PREPARING,
      paymentMethod,
      items: [...items],
      subtotalIqd,
      discountIqd,
      shippingIqd,
      totalIqd,
      promoCode: appliedPromo ?? undefined,
      customer: normalizedCustomer,
      estimatedDelivery: 'خلال 24–72 ساعة لجميع محافظات العراق',
    };

    const formattedText = buildInstagramOrderText(newOrder, currency);
    setOrderSummaryText(formattedText);
    await copyOrderSummary(formattedText);

    onPlaceOrder(newOrder);
    setConfirmedOrder(newOrder);
    setAppliedPromo(null);
    setPromoInput('');
    setStep('confirmed');

    window.setTimeout(() => {
      instaAnchorRef.current?.click();
    }, 150);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={t.bagButton}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-md h-full flex flex-col border-s border-[#F1E8EE] shadow-2xl">
        <div className="px-5 py-4 border-b border-[#F1E8EE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Back"
                className="w-8 h-8 rounded-full hover:bg-[#FCEAF3] flex items-center justify-center text-[#18181B] cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
              </button>
            )}
            <h2 className="font-display text-lg font-bold text-[#18181B]">
              {step === 'cart' && `${t.bagButton} (${items.reduce((s, i) => s + i.quantity, 0)})`}
              {step === 'checkout' && 'تأكيد العنوان والدفع'}
              {step === 'confirmed' && 'إيصال تأكيد الطلب'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 rounded-full hover:bg-[#F6F6F8] flex items-center justify-center text-[#18181B] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'cart' && (
          <>
            {items.length > 0 && (
              <div className="px-5 py-3 bg-[#FFF8FB] border-b border-[#F1E8EE] shrink-0">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="inline-flex items-center gap-1.5 text-[#18181B] font-medium">
                    <Truck className="w-3.5 h-3.5 text-[#C83E7D]" />
                    {qualifiesFreeShipping
                      ? 'مبروك! طلبك مؤهل للتوصيل المجاني'
                      : `أضيفي بقيمة ${formatPrice(remainingForFreeShipping, currency)} للتوصيل المجاني`}
                  </span>
                  <span className="font-mono text-[11px] text-[#71717A] tabular-nums">
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#F3D2E3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C83E7D] transition-all duration-200"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#FCEAF3] flex items-center justify-center text-[#C83E7D] mb-4">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="font-display text-base font-semibold text-[#18181B] mb-1">
                    {t.cartEmptyTitle}
                  </p>
                  <p className="text-xs text-[#52525B] max-w-xs mb-6">
                    {t.cartEmptyDesc}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[42px] px-6 py-2 bg-[#C83E7D] text-white text-sm font-semibold rounded-full hover:bg-[#B2326D] transition-colors cursor-pointer"
                  >
                    {t.cartContinue}
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-3.5 pb-4 border-b border-[#F6F6F8] last:border-b-0"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F6F6F8] shrink-0">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-[#18181B] line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#71717A] mt-0.5">
                            {item.color} · {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#71717A] hover:text-[#C83E7D] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#E4E4E7] rounded-full h-8">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            aria-label="Decrease"
                            className="w-7 h-full flex items-center justify-center text-[#52525B] hover:text-[#18181B] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            aria-label="Increase"
                            className="w-7 h-full flex items-center justify-center text-[#52525B] hover:text-[#18181B] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#C83E7D] tabular-nums">
                          {formatPrice(item.priceIqd * item.quantity, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-[#F1E8EE] bg-[#FFF8FB] space-y-4 shrink-0">
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#71717A] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="كود الخصم (XMAS20 أو ALIANS15)"
                        className="w-full min-h-[38px] bg-white border border-[#E4E4E7] rounded-full ps-9 pe-3 text-xs text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="min-h-[38px] px-4 bg-[#18181B] text-white text-xs font-medium rounded-full hover:bg-[#C83E7D] cursor-pointer"
                    >
                      تطبيق
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-xs text-[#C83E7D] font-medium">
                      تم تفعيل {PROMO_CODES[appliedPromo].label} ({appliedPromo})
                    </p>
                  )}
                  {promoError && <p className="text-xs text-[#C83E7D]">{promoError}</p>}
                </form>

                <div className="space-y-1.5 text-xs text-[#52525B] tabular-nums">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span className="font-medium text-[#18181B]">
                      {formatPrice(subtotalIqd, currency)}
                    </span>
                  </div>
                  {discountIqd > 0 && (
                    <div className="flex justify-between text-[#C83E7D]">
                      <span>الخصم</span>
                      <span>-{formatPrice(discountIqd, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>رسوم التوصيل</span>
                    <span className="font-medium text-[#18181B]">
                      {shippingIqd === 0 ? 'مجاني' : formatPrice(shippingIqd, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#F3D2E3] text-sm font-bold text-[#18181B]">
                    <span>الإجمالي المستحق</span>
                    <span className="text-[#C83E7D]">{formatPrice(totalIqd, currency)}</span>
                  </div>
                </div>

                {!user && (
                  <p className="text-[11px] text-[#C83E7D] font-medium flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.checkoutAuthRequiredTitle}</span>
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full min-h-[48px] bg-gradient-to-r from-[#C83E7D] to-[#D94C8D] text-white text-sm font-semibold rounded-full shadow-md shadow-[#C83E7D]/25 cursor-pointer"
                >
                  {user ? t.cartCheckoutBtn : t.googleSignInBtn}
                </button>
              </div>
            )}
          </>
        )}

        {step === 'checkout' && !user && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#FCEAF3] border border-[#F3D2E3] flex items-center justify-center">
              <Lock className="w-7 h-7 text-[#C83E7D]" />
            </div>

            <div className="space-y-2 max-w-xs">
              <h3 className="font-display text-lg font-bold text-[#18181B]">
                {t.checkoutAuthRequiredTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                {t.checkoutAuthRequiredDesc}
              </p>
            </div>

            {authError && (
              <p className="text-xs text-[#C83E7D] bg-[#FCEAF3] border border-[#F3D2E3] p-3 rounded-2xl w-full">
                {authError}
              </p>
            )}

            <button
              type="button"
              disabled={signingIn || authLoading}
              onClick={handleLoginInCheckout}
              className="w-full min-h-[50px] px-5 py-2.5 rounded-full bg-white hover:bg-[#FFF8FB] text-[#18181B] border border-[#E4E4E7] hover:border-[#C83E7D] text-sm font-semibold shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-60"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>{signingIn ? 'جاري فتح حساب Google...' : t.googleSignInBtn}</span>
            </button>

            <p className="text-[11px] text-[#71717A] inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C83E7D]" />
              <span>لا يمكن إرسال الطلب بدون حساب مسجل</span>
            </p>
          </div>
        )}

        {step === 'checkout' && user && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-[#18181B]">طريقة الدفع</p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod(PaymentMethod.COD)}
                    className={`p-3 rounded-2xl border text-start transition-colors cursor-pointer ${
                      paymentMethod === PaymentMethod.COD
                        ? 'border-[#C83E7D] bg-[#FCEAF3]'
                        : 'border-[#E4E4E7] bg-white hover:bg-[#FFF8FB]'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#C83E7D] mb-1.5" />
                    <p className="text-xs font-semibold text-[#18181B]">الدفع عند الاستلام</p>
                    <p className="text-[11px] text-[#71717A] mt-0.5">نقداً للمندوب</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod(PaymentMethod.CARD)}
                    className={`p-3 rounded-2xl border text-start transition-colors cursor-pointer ${
                      paymentMethod === PaymentMethod.CARD
                        ? 'border-[#C83E7D] bg-[#FCEAF3]'
                        : 'border-[#E4E4E7] bg-white hover:bg-[#FFF8FB]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#C83E7D] mb-1.5" />
                    <p className="text-xs font-semibold text-[#18181B]">بطاقة مصرفية</p>
                    <p className="text-[11px] text-[#71717A] mt-0.5">ماستر / زين كاش</p>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#18181B]">بيانات التوصيل</p>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="الاسم الكامل"
                  className="w-full min-h-[42px] px-4 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                />
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="رقم الهاتف (077XXXXXXXX)"
                  className="w-full min-h-[42px] px-4 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="المحافظة"
                    className="w-full min-h-[42px] px-4 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                  />
                  <input
                    type="text"
                    value={customer.postalCode}
                    onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                    placeholder="أقرب نقطة دالة"
                    className="w-full min-h-[42px] px-4 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                  />
                </div>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="المنطقة والشارع"
                  className="w-full min-h-[42px] px-4 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                />
                <input
                  type="text"
                  value={customer.instagramUsername || ''}
                  onChange={(e) => setCustomer({ ...customer, instagramUsername: e.target.value })}
                  placeholder="يوزر إنستغرام الخاص بكِ (اختياري)"
                  dir="ltr"
                  className="w-full min-h-[42px] px-4 bg-[#F6F6F8] border border-[#E4E4E7] rounded-xl text-sm font-mono text-start focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF8FB] border border-[#F3D2E3] text-xs text-[#52525B] flex items-center justify-between gap-3">
                <span>سيتم قبول طلبكِ وإرسال تفاصيله إلى الإنستغرام:</span>
                <span dir="ltr" className="font-mono font-bold text-[#C83E7D] shrink-0">
                  @{STORE_INSTAGRAM_USERNAME}
                </span>
              </div>

              {formError && (
                <p className="text-xs text-[#C83E7D] bg-[#FCEAF3] p-3 rounded-xl">
                  {formError}
                </p>
              )}
            </div>

            <div className="p-5 border-t border-[#F1E8EE] bg-[#FFF8FB] space-y-3 shrink-0">
              <div className="flex items-center justify-between text-sm font-bold tabular-nums">
                <span>الإجمالي النهائي</span>
                <span className="text-[#C83E7D]">{formatPrice(totalIqd, currency)}</span>
              </div>
              <button
                type="submit"
                className="w-full min-h-[48px] bg-gradient-to-r from-[#C83E7D] to-[#D94C8D] text-white text-sm font-semibold rounded-full shadow-md shadow-[#C83E7D]/25 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>تأكيد وإرسال الطلب إلى إنستغرام @{STORE_INSTAGRAM_USERNAME}</span>
              </button>
            </div>
          </form>
        )}

        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between gap-5">
            <a
              ref={instaAnchorRef}
              href={STORE_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden"
              aria-hidden="true"
            >
              Instagram
            </a>

            <div className="space-y-4">
              <div className="p-5 bg-[#FCEAF3] border border-[#F3D2E3] rounded-3xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#C83E7D] mx-auto" />
                <p className="font-display text-lg font-bold text-[#18181B]">
                  تم قبول الطلب <span className="font-mono">#{confirmedOrder.id}</span>
                </p>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  {copiedReceipt
                    ? 'تم نسخ كافة معلومات الطلب تلقائياً! افتحي الإنستغرام الآن وأرسليها إلى اليوزر:'
                    : 'اضغطي لفتح الإنستغرام وإرسال تفاصيل الطلب إلى اليوزر:'}
                </p>
                <p dir="ltr" className="font-mono text-sm font-bold text-[#C83E7D]">
                  @{STORE_INSTAGRAM_USERNAME}
                </p>
              </div>

              <div className="border border-[#F1E8EE] rounded-2xl p-4 space-y-2.5 text-xs bg-white">
                <div className="flex justify-between text-[#52525B]">
                  <span>المستلم</span>
                  <span className="font-medium text-[#18181B]">{confirmedOrder.customer.fullName}</span>
                </div>
                <div className="flex justify-between text-[#52525B]">
                  <span>الهاتف</span>
                  <span className="font-mono font-medium text-[#18181B]">{confirmedOrder.customer.phone}</span>
                </div>
                <div className="flex justify-between text-[#52525B]">
                  <span>الوجهة</span>
                  <span className="font-medium text-[#18181B]">
                    {confirmedOrder.customer.city} · {confirmedOrder.customer.address}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#F1E8EE] flex justify-between text-sm font-bold tabular-nums">
                  <span>المبلغ الإجمالي</span>
                  <span className="text-[#C83E7D]">{formatPrice(confirmedOrder.totalIqd, currency)}</span>
                </div>
              </div>

              {orderSummaryText && (
                <pre
                  dir="rtl"
                  className="p-3.5 rounded-2xl bg-[#FFF8FB] border border-[#F3D2E3] text-[11px] text-[#3F3F46] whitespace-pre-wrap font-sans leading-relaxed max-h-40 overflow-y-auto"
                >
                  {orderSummaryText}
                </pre>
              )}
            </div>

            <div className="space-y-2.5">
              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] px-4 bg-[#C83E7D] hover:bg-[#B2326D] text-white text-sm font-semibold rounded-full inline-flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#C83E7D]/25"
              >
                <ExternalLink className="w-4 h-4" />
                <span>إرسال الطلب عبر إنستغرام @{STORE_INSTAGRAM_USERNAME}</span>
              </a>
              <button
                type="button"
                onClick={() => copyOrderSummary(orderSummaryText)}
                className="w-full min-h-[44px] px-4 bg-[#FCEAF3] hover:bg-[#F8D8E8] text-[#C83E7D] text-xs font-semibold rounded-full inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedReceipt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedReceipt ? 'تم نسخ تفاصيل الطلب' : 'نسخ تفاصيل الطلب للإنستغرام'}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[44px] bg-[#F6F6F8] text-[#18181B] text-sm font-medium rounded-full cursor-pointer"
              >
                {t.cartContinue}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
