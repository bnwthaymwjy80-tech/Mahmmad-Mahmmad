import {
  ArrowLeft,
  Droplets,
  Eye,
  Flower2,
  Gamepad2,
  Layers,
  Palette,
  Search,
  Shirt,
  ShoppingBag,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
} from 'lucide-react';
import { HERO_CHRISTMAS_IMAGE } from '../data/products';
import { TranslationStrings } from '../i18n/translations';
import { ProductCategory } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  t: TranslationStrings;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onExploreCatalog: () => void;
  onToggleFilterSort: () => void;
}

const CIRCLE_CATEGORIES: Array<{
  id: ProductCategory;
  icon: typeof Shirt;
}> = [
  { id: ProductCategory.ALL, icon: Sparkles },
  { id: ProductCategory.DRESSES, icon: Shirt },
  { id: ProductCategory.MAKEUP, icon: Palette },
  { id: ProductCategory.SKINCARE, icon: Droplets },
  { id: ProductCategory.LENSES, icon: Eye },
  { id: ProductCategory.PERFUMES, icon: Flower2 },
  { id: ProductCategory.TOYS, icon: Gamepad2 },
  { id: ProductCategory.PANTS, icon: Layers },
  { id: ProductCategory.BAGS, icon: ShoppingBag },
];

export function HeroSection({
  t,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onExploreCatalog,
  onToggleFilterSort,
}: HeroSectionProps) {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreCatalog();
  };

  return (
    <section id="top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4 space-y-5">
      {/* Greeting Header matching Screen 2 */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#18181B]">
            {t.greetingTitle.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-[#C83E7D]">{t.greetingTitle.split(' ').slice(-1)}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-0.5">{t.greetingSub}</p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#C83E7D]">
          <Snowflake className="w-3.5 h-3.5" />
          <span>{t.heroEyebrow}</span>
        </span>
      </div>

      {/* Rounded Search Input + Filter Button matching Screen 2 */}
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <label htmlFor="hero-search" className="sr-only">
            {t.heroSearchPlaceholder}
          </label>
          <input
            id="hero-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.heroSearchPlaceholder}
            className="w-full min-h-[46px] bg-[#F6F6F8] border border-transparent focus:border-[#C83E7D] rounded-full ps-11 pe-4 text-sm text-[#18181B] placeholder:text-[#71717A] focus:outline-none focus:bg-white transition-all duration-150"
          />
          <Search className="w-4 h-4 text-[#71717A] absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          type="button"
          onClick={onToggleFilterSort}
          aria-label="Filter and Sort"
          className="w-[46px] h-[46px] rounded-2xl bg-[#F6F6F8] hover:bg-[#FCEAF3] text-[#18181B] flex items-center justify-center transition-colors duration-150 shrink-0 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </form>

      {/* Circular Category Icons Row */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-1.5">
        {CIRCLE_CATEGORIES.map(({ id, icon: Icon }) => {
          const isActive = selectedCategory === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                onSelectCategory(id);
                onExploreCatalog();
              }}
              className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
            >
              <span
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-150 ${
                  isActive
                    ? 'bg-[#C83E7D] text-white shadow-md shadow-[#C83E7D]/25'
                    : 'bg-white border border-[#E4E4E7] text-[#18181B] group-hover:border-[#C83E7D]'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </span>
              <span
                className={`text-xs whitespace-nowrap ${
                  isActive ? 'font-semibold text-[#C83E7D]' : 'font-medium text-[#52525B]'
                }`}
              >
                {t.categories[id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Soft Blush Gradient Promotional Banner Card matching Screen 2 */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FCEAF3] via-[#FADCEB] to-[#F6CBE0] border border-[#F3CFE0] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center gap-3">
            <span className="inline-block w-fit bg-white text-[#18181B] text-[11px] font-semibold px-3 py-1 rounded-full">
              {t.heroEyebrow}
            </span>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18181B] leading-tight">
              {t.heroTitle}
            </h2>

            <p className="text-xs sm:text-sm text-[#52525B] max-w-md leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="pt-1">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="min-h-[42px] px-6 py-2 rounded-full bg-[#C83E7D] hover:bg-[#B2326D] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm shadow-[#C83E7D]/20 transition-colors duration-150 cursor-pointer"
              >
                <span>{t.heroCta}</span>
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
              </button>
            </div>
          </div>

          <div className="md:col-span-5 relative min-h-[210px] sm:min-h-[240px] overflow-hidden">
            <ResilientImage
              src={HERO_CHRISTMAS_IMAGE}
              alt={`${t.brandName} — ${t.heroTitle}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-center pointer-events-none">
              <div className="bg-white/92 backdrop-blur-md border border-[#F3D2E3] rounded-2xl px-5 py-2 shadow-lg text-center">
                <p className="font-display text-lg sm:text-xl font-bold text-[#18181B]">
                  أليانز شوب
                </p>
                <p className="text-[10px] font-semibold text-[#C83E7D] tracking-widest uppercase">
                  ALIANS SHOP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots under Banner */}
      <div className="flex items-center justify-center gap-1.5">
        <span className="w-5 h-1.5 rounded-full bg-[#C83E7D]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#E4E4E7]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#E4E4E7]" />
      </div>
    </section>
  );
}
