import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  LogOut,
  Mail,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  User as UserIcon,
  X,
} from 'lucide-react';
import { formatPrice } from '../data/currencies';
import { STORE_INSTAGRAM_URL, STORE_INSTAGRAM_USERNAME } from '../data/products';
import { TranslationStrings } from '../i18n/translations';
import { OrderRecord, OrderStatus } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface AccountModalProps {
  t: TranslationStrings;
  isOpen: boolean;
  user: User | null;
  authLoading: boolean;
  authError: string | null;
  wishlistCount: number;
  city: string;
  currency: string;
  orders: OrderRecord[];
  ordersLoading: boolean;
  onClose: () => void;
  onGoogleSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onOpenWelcome: () => void;
}

export function AccountModal({
  t,
  isOpen,
  user,
  authLoading,
  authError,
  wishlistCount,
  city,
  currency,
  orders,
  ordersLoading,
  onClose,
  onGoogleSignIn,
  onSignOut,
  onOpenWelcome,
}: AccountModalProps) {
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

  const getStatusMeta = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.SHIPPED:
        return {
          label: t.statusShipped,
          step: 2,
          badgeClass: 'bg-[#FCEAF3] text-[#C83E7D] border-[#F3D2E3]',
          Icon: Truck,
        };
      case OrderStatus.DELIVERED:
        return {
          label: t.statusDelivered,
          step: 3,
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          Icon: CheckCircle2,
        };
      case OrderStatus.PREPARING:
      default:
        return {
          label: t.statusPreparing,
          step: 1,
          badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
          Icon: Clock,
        };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl border border-[#F3D2E3] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#F1E8EE] flex items-center justify-between bg-[#FFF8FB] shrink-0">
          <h2 id="account-modal-title" className="font-display text-lg font-bold text-[#18181B]">
            {t.bottomProfile}
          </h2>
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
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {authLoading ? (
            <div className="py-10 text-center text-sm text-[#71717A]">
              جاري التحقق من الحساب...
            </div>
          ) : !user ? (
            /* Required Google Account Gate */
            <div className="text-center space-y-5 py-2">
              <div className="w-16 h-16 rounded-full bg-[#FCEAF3] border border-[#F3D2E3] flex items-center justify-center mx-auto">
                <UserIcon className="w-7 h-7 text-[#C83E7D]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-[#18181B]">
                  {t.googleSignInTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  {t.googleSignInDesc}
                </p>
              </div>

              {authError && (
                <p className="text-xs text-[#C83E7D] bg-[#FCEAF3] border border-[#F3D2E3] p-3 rounded-2xl">
                  {authError}
                </p>
              )}

              <button
                type="button"
                disabled={signingIn}
                onClick={handleLoginClick}
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
                <span>تسجيل دخول آمن ومحمي بحساب Google</span>
              </p>
            </div>
          ) : (
            /* Signed-in Google Profile View + Order Tracking Panel */
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF8FB] border border-[#F3D2E3]">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C83E7D] bg-white shrink-0">
                  {user.photoURL ? (
                    <ResilientImage
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#C83E7D] font-bold text-lg">
                      {(user.displayName || user.email || 'A').charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-bold text-[#18181B] truncate">
                    {user.displayName || 'مستخدم أليانز شوب'}
                  </p>
                  <p className="text-xs text-[#71717A] truncate flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 shrink-0 text-[#C83E7D]" />
                    <span className="truncate">{user.email}</span>
                  </p>
                  <p className="text-[11px] text-[#52525B] mt-1">{city}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F6F6F8] flex items-center justify-between">
                <span className="text-xs font-medium text-[#52525B]">{t.wishlistLabel}</span>
                <span className="text-base font-bold text-[#C83E7D] tabular-nums">{wishlistCount}</span>
              </div>

              {/* Firestore-Backed Order Tracking Panel */}
              <section
                aria-label={t.orderTrackingTitle}
                className="rounded-2xl border border-[#F3D2E3] bg-[#FFF8FB] p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#F3D2E3] flex items-center justify-center text-[#C83E7D]">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#18181B]">
                        {t.orderTrackingTitle}
                      </h3>
                      <p className="text-[11px] text-[#71717A]">
                        حالة طلباتك المسجلة في الحساب
                      </p>
                    </div>
                  </div>
                  <span className="min-w-[26px] h-6 px-2 rounded-full bg-[#C83E7D] text-white text-xs font-bold inline-flex items-center justify-center tabular-nums">
                    {orders.length}
                  </span>
                </div>

                {ordersLoading ? (
                  <div className="py-6 text-center text-xs text-[#71717A]">
                    {t.loadingOrders}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-5 px-3 rounded-xl bg-white border border-[#F1E8EE] text-center text-xs text-[#71717A]">
                    {t.noTrackedOrders}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto pe-0.5">
                    {orders.map((order) => {
                      const statusMeta = getStatusMeta(order.status);
                      const StatusIcon = statusMeta.Icon;

                      return (
                        <div
                          key={order.id}
                          className="rounded-2xl bg-white border border-[#F1E8EE] p-3.5 space-y-3"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-xs font-bold font-mono text-[#18181B]">
                                #{order.id}
                              </p>
                              <p className="text-[11px] text-[#71717A] truncate">
                                {order.customer.city} · {order.customer.address}
                              </p>
                              {order.itemsSummary && (
                                <p className="text-[11px] text-[#3F3F46] line-clamp-1 mt-0.5">
                                  {order.itemsSummary}
                                </p>
                              )}
                            </div>
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${statusMeta.badgeClass}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              <span>{statusMeta.label}</span>
                            </span>
                          </div>

                          {/* 3-Step Order Progress */}
                          <div className="grid grid-cols-3 gap-1.5 text-[10px] font-medium">
                            <div
                              className={`py-1.5 px-2 rounded-lg text-center border ${
                                statusMeta.step >= 1
                                  ? 'border-[#C83E7D] bg-[#FCEAF3] text-[#C83E7D] font-semibold'
                                  : 'border-[#E4E4E7] bg-[#F6F6F8] text-[#71717A]'
                              }`}
                            >
                              {t.statusPreparing}
                            </div>
                            <div
                              className={`py-1.5 px-2 rounded-lg text-center border ${
                                statusMeta.step >= 2
                                  ? 'border-[#C83E7D] bg-[#FCEAF3] text-[#C83E7D] font-semibold'
                                  : 'border-[#E4E4E7] bg-[#F6F6F8] text-[#71717A]'
                              }`}
                            >
                              {t.statusShipped}
                            </div>
                            <div
                              className={`py-1.5 px-2 rounded-lg text-center border ${
                                statusMeta.step >= 3
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold'
                                  : 'border-[#E4E4E7] bg-[#F6F6F8] text-[#71717A]'
                              }`}
                            >
                              {t.statusDelivered}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#F6F6F8] tabular-nums">
                            <span className="text-[#71717A]">
                              {new Date(order.createdAt).toLocaleDateString('ar-IQ')}
                            </span>
                            <span className="font-bold text-[#C83E7D]">
                              {formatPrice(order.totalIqd, currency)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <div className="space-y-2.5">
                <a
                  href={STORE_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] px-4 rounded-full bg-[#C83E7D] hover:bg-[#B2326D] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>إنستغرام المتجر:</span>
                  <span dir="ltr" className="font-mono">@{STORE_INSTAGRAM_USERNAME}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenWelcome();
                  }}
                  className="w-full min-h-[44px] px-4 rounded-full bg-[#F6F6F8] hover:bg-[#FCEAF3] text-[#18181B] text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C83E7D]" />
                  <span>{t.welcomeTag}</span>
                </button>

                <button
                  type="button"
                  onClick={onSignOut}
                  className="w-full min-h-[44px] px-4 rounded-full border border-[#F3D2E3] hover:bg-[#FCEAF3] text-[#C83E7D] text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.signOutBtn}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
