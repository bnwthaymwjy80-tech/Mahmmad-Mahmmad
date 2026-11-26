import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { formatPrice } from '../data/currencies';
import { STORE_INSTAGRAM_URL, STORE_INSTAGRAM_USERNAME } from '../data/products';
import { TranslationStrings } from '../i18n/translations';
import { OrderRecord, OrderStatus } from '../types/shop';

interface CustomerOrdersDrawerProps {
  t: TranslationStrings;
  isOpen: boolean;
  user: User | null;
  authLoading: boolean;
  orders: OrderRecord[];
  ordersLoading: boolean;
  currency: string;
  onClose: () => void;
  onGoogleSignIn: () => Promise<void>;
}

export function CustomerOrdersDrawer({
  t,
  isOpen,
  user,
  authLoading,
  orders,
  ordersLoading,
  currency,
  onClose,
  onGoogleSignIn,
}: CustomerOrdersDrawerProps) {
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginClick = async () => {
    setSigningIn(true);
    try {
      await onGoogleSignIn();
    } finally {
      setSigningIn(false);
    }
  };

  const getStepInfo = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return {
          step: 3,
          label: t.deliveryStepDelivered,
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          progressWidth: 'w-full',
          Icon: CheckCircle2,
        };
      case OrderStatus.SHIPPED:
        return {
          step: 2,
          label: t.deliveryStepOnTheWay,
          badgeClass: 'bg-[#FCEAF3] text-[#C83E7D] border-[#F3D2E3]',
          progressWidth: 'w-2/3',
          Icon: Truck,
        };
      case OrderStatus.PREPARING:
      default:
        return {
          step: 1,
          label: t.deliveryStepConfirmed,
          badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
          progressWidth: 'w-1/3',
          Icon: Clock,
        };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customer-orders-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Top Bar */}
        <div className="px-5 py-4 border-b border-[#F1E8EE] bg-[#FFF8FB] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white border border-[#F3D2E3] flex items-center justify-center text-[#C83E7D]">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="customer-orders-title"
                className="font-display text-base font-bold text-[#18181B]"
              >
                {t.orderTrackingTitle}
              </h2>
              <p className="text-[11px] text-[#71717A]">{t.activeDeliveryBannerTitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full hover:bg-white flex items-center justify-center text-[#18181B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {authLoading ? (
            <div className="py-12 text-center text-xs text-[#71717A]">{t.loadingOrders}</div>
          ) : !user ? (
            <div className="py-8 px-4 rounded-3xl bg-[#FFF8FB] border border-[#F3D2E3] text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-white border border-[#F3D2E3] flex items-center justify-center mx-auto text-[#C83E7D]">
                <Package className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-base font-bold text-[#18181B]">
                  {t.googleSignInTitle}
                </h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  {t.googleSignInDesc}
                </p>
              </div>
              <button
                type="button"
                disabled={signingIn}
                onClick={handleLoginClick}
                className="w-full min-h-[46px] px-5 py-2 rounded-full bg-[#C83E7D] hover:bg-[#B2326D] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{signingIn ? '...' : t.googleSignInBtn}</span>
              </button>
            </div>
          ) : ordersLoading ? (
            <div className="py-12 text-center text-xs text-[#71717A]">{t.loadingOrders}</div>
          ) : orders.length === 0 ? (
            <div className="py-10 px-5 rounded-3xl bg-[#FFF8FB] border border-[#F3D2E3] text-center space-y-2.5">
              <Package className="w-8 h-8 text-[#C83E7D] mx-auto" />
              <p className="text-sm font-semibold text-[#18181B]">{t.ordersEmpty}</p>
              <p className="text-xs text-[#71717A]">{t.noTrackedOrders}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const info = getStepInfo(order.status);
                const StatusIcon = info.Icon;
                const itemsText =
                  order.itemsSummary ||
                  (order.items.length > 0
                    ? order.items.map((it) => `${it.name} (${it.size}) × ${it.quantity}`).join(' ، ')
                    : '');

                return (
                  <article
                    key={order.id}
                    className="rounded-2xl border border-[#F3D2E3] bg-white p-4 space-y-3.5 shadow-2xs"
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold font-mono text-[#18181B]">
                          #{order.id}
                        </p>
                        <p className="text-[11px] text-[#71717A] tabular-nums mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('ar-IQ')}
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${info.badgeClass}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span>{info.label}</span>
                      </span>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="space-y-2">
                      <div className="h-1.5 w-full rounded-full bg-[#F6F6F8] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            info.step === 3 ? 'bg-emerald-500' : 'bg-[#C83E7D]'
                          } ${info.progressWidth}`}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                        <div
                          className={`text-start font-medium ${
                            info.step >= 1 ? 'text-[#C83E7D] font-semibold' : 'text-[#A1A1AA]'
                          }`}
                        >
                          1. {t.deliveryStepConfirmed}
                        </div>
                        <div
                          className={`text-center font-medium ${
                            info.step >= 2 ? 'text-[#C83E7D] font-semibold' : 'text-[#A1A1AA]'
                          }`}
                        >
                          2. {t.deliveryStepOnTheWay}
                        </div>
                        <div
                          className={`text-end font-medium ${
                            info.step >= 3 ? 'text-emerald-700 font-semibold' : 'text-[#A1A1AA]'
                          }`}
                        >
                          3. {t.deliveryStepDelivered}
                        </div>
                      </div>
                    </div>

                    {/* Ordered Items */}
                    {itemsText && (
                      <div className="p-2.5 rounded-xl bg-[#FFF8FB] border border-[#F3D2E3] space-y-0.5">
                        <p className="text-[10px] font-semibold text-[#71717A]">
                          {t.orderedItemsLabel}
                        </p>
                        <p className="text-xs text-[#18181B] leading-relaxed">{itemsText}</p>
                      </div>
                    )}

                    {/* Delivery Details & Total */}
                    <div className="space-y-1.5 text-xs pt-1 border-t border-[#F6F6F8]">
                      <div className="flex items-start gap-1.5 text-[#52525B]">
                        <MapPin className="w-3.5 h-3.5 text-[#C83E7D] shrink-0 mt-0.5" />
                        <span>
                          {order.customer.city} · {order.customer.address}
                        </span>
                      </div>
                      {order.estimatedDelivery && (
                        <div className="flex items-center gap-1.5 text-[#52525B]">
                          <Clock className="w-3.5 h-3.5 text-[#C83E7D] shrink-0" />
                          <span>
                            {t.estimatedDeliveryLabel}: {order.estimatedDelivery}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F1E8EE] text-xs tabular-nums">
                      <span className="text-[#71717A]">{order.customer.phone}</span>
                      <span className="font-bold text-sm text-[#C83E7D]">
                        {formatPrice(order.totalIqd, currency)}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Instagram Support */}
        <div className="p-4 border-t border-[#F1E8EE] bg-white shrink-0">
          <a
            href={STORE_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] px-4 rounded-full bg-[#FFF8FB] hover:bg-[#FCEAF3] border border-[#F3D2E3] text-[#C83E7D] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>تواصلي عبر إنستغرام:</span>
            <span dir="ltr" className="font-mono">
              @{STORE_INSTAGRAM_USERNAME}
            </span>
          </a>
        </div>
      </aside>
    </div>
  );
}
