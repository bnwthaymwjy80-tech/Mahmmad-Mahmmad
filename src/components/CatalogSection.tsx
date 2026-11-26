import { ArrowLeft, Eye, Heart, Plus, Snowflake, Star } from 'lucide-react';
import { formatPrice } from '../data/currencies';
import { TranslationStrings } from '../i18n/translations';
import { Product, ProductCategory, SortOption } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  t: TranslationStrings;
  totalCatalogCount: number;
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  showSortControls: boolean;
  showWishlistOnly: boolean;
  onToggleWishlistOnly: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  currency: string;
}

export function CatalogSection({
  t,
  totalCatalogCount,
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  showSortControls,
  showWishlistOnly,
  onToggleWishlistOnly,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onOpenProduct,
  onQuickAdd,
  currency,
}: CatalogSectionProps) {
  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Popular Picks + See All Header matching Screen 2 */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#18181B]">
          {showWishlistOnly
            ? t.wishlistLabel
            : selectedCategory === ProductCategory.ALL
              ? t.popularPicks
              : t.categories[selectedCategory]}
        </h2>

        <div className="flex items-center gap-3">
          {showSortControls && (
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort"
              className="min-h-[36px] bg-[#F6F6F8] border border-[#E4E4E7] rounded-full px-3 text-xs font-medium text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#C83E7D]"
            >
              <option value={SortOption.BEST_SELLING}>{t.sortBest}</option>
              <option value={SortOption.TOP_RATED}>{t.sortRated}</option>
              <option value={SortOption.PRICE_LOW}>{t.sortLow}</option>
              <option value={SortOption.PRICE_HIGH}>{t.sortHigh}</option>
            </select>
          )}

          <button
            type="button"
            onClick={() => {
              if (showWishlistOnly) onToggleWishlistOnly();
              onSelectCategory(ProductCategory.ALL);
              onSearchChange('');
            }}
            className="text-xs sm:text-sm font-semibold text-[#C83E7D] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{t.seeAll}</span>
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
          </button>
        </div>
      </div>

      {/* Empty Store State (No Default Mock Products) OR Empty Filter State */}
      {totalCatalogCount === 0 ? (
        <div className="bg-[#FFF8FB] border border-[#F3D2E3] rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FCEAF3] text-[#C83E7D] flex items-center justify-center mx-auto">
            <Snowflake className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-[#18181B]">
            {t.emptyStoreTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
            {t.emptyStoreDesc}
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-[#F6F6F8] rounded-3xl p-10 text-center max-w-lg mx-auto">
          <p className="font-display text-base font-semibold text-[#18181B] mb-3">
            {t.emptyFilterTitle}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onSelectCategory(ProductCategory.ALL);
                if (showWishlistOnly) onToggleWishlistOnly();
              }}
              className="min-h-[40px] px-5 py-2 bg-[#C83E7D] text-white text-xs font-semibold rounded-full cursor-pointer"
            >
              {t.emptyFilterBtn}
            </button>
          )}
        </div>
      ) : (
        /* 2-Column Mobile / 3-4 Column Desktop Product Grid matching Screen 2 */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const discountPercent = product.originalPriceIqd
              ? Math.round(
                  ((product.originalPriceIqd - product.priceIqd) / product.originalPriceIqd) * 100
                )
              : 0;

            return (
              <article key={product.id} className="group flex flex-col gap-2.5">
                {/* Soft Rounded Image Card */}
                <div className="relative aspect-[4/4.4] rounded-2xl bg-[#F6F6F8] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => onQuickView(product)}
                    className="w-full h-full block cursor-pointer relative"
                    aria-label={`${t.quickViewLabel} - ${product.name}`}
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="pointer-events-none hidden sm:inline-flex items-center gap-1.5 bg-white/92 backdrop-blur-xs text-[#18181B] text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <Eye className="w-3.5 h-3.5 text-[#C83E7D]" />
                      <span>{t.quickViewLabel}</span>
                    </span>
                  </button>

                  {/* Wishlist Heart Circle Top Corner */}
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label={product.name}
                    className="absolute top-2.5 end-2.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-[#C83E7D] text-[#C83E7D]' : 'text-[#52525B]'
                      }`}
                    />
                  </button>

                  {/* Dark Charcoal Discount Pill Bottom Corner matching Screen 2 */}
                  {discountPercent > 0 && (
                    <span className="absolute bottom-2.5 start-2.5 bg-[#27272A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tabular-nums pointer-events-none">
                      -{discountPercent}%
                    </span>
                  )}

                  {/* Quick Add Circle Bottom End */}
                  <button
                    type="button"
                    onClick={() => onQuickAdd(product)}
                    aria-label={`${t.quickAdd} ${product.name}`}
                    className="absolute bottom-2.5 end-2.5 w-8 h-8 rounded-full bg-[#C83E7D] hover:bg-[#B2326D] text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Title, Quick Stars Rating & Price Row */}
                <div className="px-0.5 space-y-1">
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="text-start block w-full cursor-pointer"
                  >
                    <h3 className="font-display text-sm font-semibold text-[#18181B] group-hover:text-[#C83E7D] line-clamp-1">
                      {product.name}
                    </h3>
                  </button>

                  {/* 5-Star Quick Rating Row */}
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    aria-label={`${product.rating.toFixed(1)} stars (${product.reviewCount})`}
                    className="flex items-center gap-1.5 text-[11px] text-[#71717A] tabular-nums cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((starValue) => {
                        const filled =
                          product.reviewCount > 0 && starValue <= Math.round(product.rating);
                        return (
                          <Star
                            key={starValue}
                            className={`w-3 h-3 ${
                              filled
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-transparent text-[#D4D4D8]'
                            }`}
                          />
                        );
                      })}
                    </span>
                    <span className="font-semibold text-[#18181B]">
                      {product.reviewCount > 0 ? product.rating.toFixed(1) : '0.0'}
                    </span>
                    <span>({product.reviewCount})</span>
                  </button>

                  <div className="flex items-baseline gap-2 tabular-nums">
                    <span className="text-sm font-bold text-[#C83E7D]">
                      {formatPrice(product.priceIqd, currency)}
                    </span>
                    {product.originalPriceIqd && (
                      <span className="text-xs text-[#A1A1AA] line-through">
                        {formatPrice(product.originalPriceIqd, currency)}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
