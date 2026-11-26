import { ArrowLeft, CheckCircle2, Clock, Package, Truck } from 'lucide-react';
import { formatPrice } from '../data/currencies';
import { TranslationStrings } from '../i18n/translations';
import { OrderRecord, OrderStatus } from '../types/shop';

interface ActiveOrderBarProps {
  t: TranslationStrings;
  orders: OrderRecord[];
  currency: string;
  onOpenMyOrders: () => void;
}

export function ActiveOrderBar({
  t,
  orders,
  currency,
  onOpenMyOrders,
}: ActiveOrderBarProps) {
  const activeOrders = orders.filter((o) => o.status !== OrderStatus.DELIVERED);
  const latestActive = activeOrders[0];

  if (!latestActive) return null;

  const isShipped = latestActive.status === OrderStatus.SHIPPED;
  const activeStep = isShipped ? 2 : 1;

  return (
    <section
      aria-label={t.activeDeliveryBannerTitle}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1"
    >
      <div className="rounded-2xl bg-[#FFF8FB] border border-[#F3D2E3] p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#FCEAF3] border border-[#F3D2E3] flex items-center justify-center text-[#C83E7D] shrink-0">
              {isShipped ? <Truck className="w-5 h-5" /> : <Package className="w-5 h-5" />}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-sm sm:text-base font-bold text-[#18181B]">
                  {isShipped ? t.deliveryStepOnTheWay : t.statusPreparing}
                </p>
                <span className="text-xs font-mono font-semibold text-[#C83E7D]">
                  #{latestActive.id}
                </span>
              </div>
              <p className="text-xs text-[#52525B] truncate">
                {latestActive.itemsSummary || `${latestActive.customer.city} · ${latestActive.customer.address}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs sm:text-sm font-bold text-[#C83E7D] tabular-nums">
              {formatPrice(latestActive.totalIqd, currency)}
            </span>

            <button
              type="button"
              onClick={onOpenMyOrders}
              className="min-h-[38px] px-4 py-1.5 rounded-full bg-[#C83E7D] hover:bg-[#B2326D] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t.viewAllOrdersBtn}</span>
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
            </button>
          </div>
        </div>

        {/* 3-Step Visual Delivery Progress */}
        <div className="grid grid-cols-3 gap-2 text-[11px]">
          <div
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl border ${
              activeStep >= 1
                ? 'bg-white border-[#C83E7D] text-[#C83E7D] font-semibold'
                : 'bg-[#F6F6F8] border-[#E4E4E7] text-[#71717A]'
            }`}
          >
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.deliveryStepConfirmed}</span>
          </div>

          <div
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl border ${
              activeStep >= 2
                ? 'bg-white border-[#C83E7D] text-[#C83E7D] font-semibold'
                : 'bg-[#F6F6F8] border-[#E4E4E7] text-[#71717A]'
            }`}
          >
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.deliveryStepOnTheWay}</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl border bg-[#F6F6F8] border-[#E4E4E7] text-[#71717A]">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.deliveryStepDelivered}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
