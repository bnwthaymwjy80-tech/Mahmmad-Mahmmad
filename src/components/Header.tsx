import { User } from 'firebase/auth';
import { MapPin, ShoppingBag, Sparkles, Truck, User as UserIcon } from 'lucide-react';
import { TranslationStrings } from '../i18n/translations';
import { ResilientImage } from './ResilientImage';

interface HeaderProps {
  t: TranslationStrings;
  city: string;
  onChangeCity: (city: string) => void;
  user: User | null;
  cartCount: number;
  activeOrderCount: number;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenWelcome: () => void;
  onOpenAccount: () => void;
}

const IRAQ_CITIES = [
  'بغداد، العراق',
  'أربيل، العراق',
  'البصرة، العراق',
  'النجف، العراق',
  'كربلاء، العراق',
  'الموصل، العراق',
];

export function Header({
  t,
  city,
  onChangeCity,
  user,
  cartCount,
  activeOrderCount,
  onOpenCart,
  onOpenOrders,
  onOpenWelcome,
  onOpenAccount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F1E8EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="w-4 h-4 text-[#C83E7D] shrink-0" />
          <label htmlFor="city-select" className="sr-only">
            Location
          </label>
          <select
            id="city-select"
            value={city}
            onChange={(e) => onChangeCity(e.target.value)}
            className="bg-transparent text-xs sm:text-sm font-medium text-[#18181B] focus:outline-none cursor-pointer truncate max-w-[130px] sm:max-w-none"
          >
            {IRAQ_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-lg sm:text-xl font-bold text-[#18181B] whitespace-nowrap shrink-0"
        >
          {t.brandName}
        </a>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onOpenWelcome}
            aria-label="Welcome screen"
            title={t.welcomeTag}
            className="w-9 h-9 rounded-full hover:bg-[#FCEAF3] flex items-center justify-center text-[#18181B] transition-colors duration-150 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C83E7D]" />
          </button>

          <button
            type="button"
            onClick={onOpenOrders}
            aria-label={t.myOrdersBtn}
            title={t.myOrdersBtn}
            className="relative w-9 h-9 rounded-full hover:bg-[#FCEAF3] flex items-center justify-center text-[#18181B] transition-colors duration-150 cursor-pointer"
          >
            <Truck className="w-4 h-4 text-[#C83E7D]" />
            {activeOrderCount > 0 && (
              <span className="absolute -top-0.5 -end-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#C83E7D] text-white text-[9px] font-bold font-mono flex items-center justify-center tabular-nums">
                {activeOrderCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenAccount}
            aria-label={t.bottomProfile}
            className="w-9 h-9 rounded-full border border-[#E4E4E7] hover:border-[#C83E7D] overflow-hidden flex items-center justify-center bg-[#FFF8FB] cursor-pointer"
          >
            {user?.photoURL ? (
              <ResilientImage
                src={user.photoURL}
                alt={user.displayName || 'Account'}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-4 h-4 text-[#C83E7D]" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="hidden sm:inline-flex min-h-[38px] px-3.5 py-1.5 rounded-full bg-[#C83E7D] hover:bg-[#B2326D] text-white text-xs font-semibold items-center gap-1.5 transition-colors duration-150 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.bagButton}</span>
            <span className="font-mono tabular-nums bg-white/20 px-1.5 py-0.5 rounded-full text-[11px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
