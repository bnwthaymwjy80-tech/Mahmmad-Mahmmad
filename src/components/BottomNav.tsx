import { Compass, Heart, Home, ShoppingCart, User } from 'lucide-react';
import { TranslationStrings } from '../i18n/translations';

interface BottomNavProps {
  t: TranslationStrings;
  activeTab: 'home' | 'explore' | 'wishlist' | 'profile';
  cartCount: number;
  onSelectHome: () => void;
  onSelectExplore: () => void;
  onOpenCart: () => void;
  onSelectWishlist: () => void;
  onSelectProfile: () => void;
}

export function BottomNav({
  t,
  activeTab,
  cartCount,
  onSelectHome,
  onSelectExplore,
  onOpenCart,
  onSelectWishlist,
  onSelectProfile,
}: BottomNavProps) {
  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F1E8EE] h-16 px-2"
    >
      <div className="max-w-lg mx-auto h-full grid grid-cols-5 items-center">
        <button
          type="button"
          onClick={onSelectHome}
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium cursor-pointer ${
            activeTab === 'home' ? 'text-[#C83E7D]' : 'text-[#71717A] hover:text-[#18181B]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>{t.bottomHome}</span>
        </button>

        <button
          type="button"
          onClick={onSelectExplore}
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium cursor-pointer ${
            activeTab === 'explore' ? 'text-[#C83E7D]' : 'text-[#71717A] hover:text-[#18181B]'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>{t.bottomExplore}</span>
        </button>

        {/* Center Elevated Magenta Shopping Cart FAB matching Screen 2 */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={t.bagButton}
            className="relative -mt-6 w-14 h-14 rounded-full bg-gradient-to-tr from-[#C83E7D] to-[#DF5293] text-white shadow-lg shadow-[#C83E7D]/35 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -end-1 min-w-[20px] h-5 px-1 rounded-full bg-[#18181B] text-white text-[10px] font-bold font-mono flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onSelectWishlist}
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium cursor-pointer ${
            activeTab === 'wishlist' ? 'text-[#C83E7D]' : 'text-[#71717A] hover:text-[#18181B]'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>{t.bottomWishlist}</span>
        </button>

        <button
          type="button"
          onClick={onSelectProfile}
          className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium cursor-pointer ${
            activeTab === 'profile' ? 'text-[#C83E7D]' : 'text-[#71717A] hover:text-[#18181B]'
          }`}
        >
          <User className="w-5 h-5" />
          <span>{t.bottomProfile}</span>
        </button>
      </div>
    </nav>
  );
}
