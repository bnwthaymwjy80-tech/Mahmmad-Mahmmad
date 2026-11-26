import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  ArrowLeft,
  Eye,
  Heart,
  Lock,
  Maximize2,
  MessageSquarePlus,
  Send,
  Star,
  X,
} from 'lucide-react';
import { formatPrice } from '../data/currencies';
import { TranslationStrings } from '../i18n/translations';
import { Product, ProductReview } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface QuickViewDrawerProps {
  t: TranslationStrings;
  product: Product | null;
  currency: string;
  user: User | null;
  isWishlisted: boolean;
  extraReviews: ProductReview[];
  onClose: () => void;
  onOpenFullProduct: (product: Product) => void;
  onGoogleSignIn: () => Promise<void>;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (
    product: Product,
    colorName: string,
    colorHex: string,
    size: string,
    quantity: number,
    openCheckoutDirectly?: boolean
  ) => void;
  onAddReview: (productId: string, review: ProductReview) => Promise<void> | void;
}

export function QuickViewDrawer({
  t,
  product,
  currency,
  user,
  isWishlisted,
  extraReviews,
  onClose,
  onOpenFullProduct,
  onGoogleSignIn,
  onToggleWishlist,
  onAddToCart,
  onAddReview,
}: QuickViewDrawerProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [signingInForReview, setSigningInForReview] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColorIndex(0);
      setSelectedSize(product.sizes[0] || '');
      setReviewRating(5);
      setHoverRating(null);
      setReviewComment('');
      setReviewError(null);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const allReviews = [...extraReviews, ...product.reviews];
  const totalReviewCount = allReviews.length;
  const averageRating =
    totalReviewCount > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewCount
      : 0;
  const discountPercent = product.originalPriceIqd
    ? Math.round(
        ((product.originalPriceIqd - product.priceIqd) / product.originalPriceIqd) * 100
      )
    : 0;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.emailVerified) {
      setReviewError(t.reviewAuthRequired);
      return;
    }
    const cleanComment = reviewComment.trim();
    if (!cleanComment) {
      setReviewError('يرجى كتابة تعليق نصي مع التقييم.');
      return;
    }

    setReviewError(null);
    setSubmittingReview(true);
    try {
      const newReview: ProductReview = {
        id: `rev_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        author: (user.displayName || 'مستخدم أليانز شوب').slice(0, 100),
        rating: reviewRating,
        date: new Date().toISOString().slice(0, 10),
        comment: cleanComment.slice(0, 500),
        verifiedSize: selectedSize || undefined,
      };
      await onAddReview(product.id, newReview);
      setReviewComment('');
      setReviewRating(5);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleSignInReviewClick = async () => {
    setSigningInForReview(true);
    try {
      await onGoogleSignIn();
    } finally {
      setSigningInForReview(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-[#F1E8EE] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Eye className="w-4 h-4 text-[#C83E7D] shrink-0" />
            <span className="font-display text-sm font-bold text-[#18181B] truncate">
              {t.quickViewLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={t.wishlistLabel}
              className="w-9 h-9 rounded-full bg-[#F6F6F8] hover:bg-[#FCEAF3] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-[#C83E7D] text-[#C83E7D]' : 'text-[#18181B]'
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenFullProduct(product);
              }}
              title={t.fullDetailsBtn}
              aria-label={t.fullDetailsBtn}
              className="w-9 h-9 rounded-full bg-[#F6F6F8] hover:bg-[#FCEAF3] flex items-center justify-center text-[#18181B] transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full bg-[#F6F6F8] hover:bg-[#FCEAF3] flex items-center justify-center text-[#18181B] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Product Details & Reviews */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Single Product Image */}
          <div className="relative aspect-[4/4.2] rounded-2xl bg-[#F6F6F8] overflow-hidden">
            <ResilientImage
              src={product.image}
              alt={product.name}
              fallbackTitle={product.name}
              className="w-full h-full object-cover object-center"
            />
            {discountPercent > 0 && (
              <span className="absolute bottom-3 start-3 bg-[#27272A] text-white text-[11px] font-bold px-2.5 py-1 rounded-full tabular-nums">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Product Meta, Title & Rating */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#71717A]">
              <span>{t.categories[product.category]}</span>
              {product.material && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{product.material}</span>
                </>
              )}
            </div>

            <h2
              id="quick-view-title"
              className="font-display text-xl font-bold text-[#18181B] leading-snug"
            >
              {product.name}
            </h2>

            {product.subtitle && (
              <p className="text-xs text-[#71717A]">{product.subtitle}</p>
            )}

            <div className="flex items-center gap-1.5 text-xs text-[#71717A] tabular-nums pt-0.5">
              <div className="inline-flex items-center gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <Star
                    key={starVal}
                    className={`w-3.5 h-3.5 ${
                      totalReviewCount > 0 && starVal <= Math.round(averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-transparent text-[#D4D4D8]'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-[#18181B]">
                {totalReviewCount > 0 ? averageRating.toFixed(1) : '0.0'}
              </span>
              <span>
                ({totalReviewCount} {t.reviewsCountLabel})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2.5 tabular-nums">
            <span className="text-2xl font-bold text-[#C83E7D]">
              {formatPrice(product.priceIqd, currency)}
            </span>
            {product.originalPriceIqd && (
              <span className="text-sm text-[#A1A1AA] line-through">
                {formatPrice(product.originalPriceIqd, currency)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          {product.colors.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#18181B]">
                {t.colorLabel}:{' '}
                <span className="text-[#71717A] font-normal">{activeColor?.name}</span>
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {product.colors.map((color, idx) => {
                  const active = idx === selectedColorIndex;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColorIndex(idx)}
                      title={color.name}
                      aria-label={color.name}
                      className={`w-8 h-8 rounded-full p-0.5 transition-all cursor-pointer ${
                        active ? 'ring-2 ring-[#C83E7D] ring-offset-2' : 'ring-1 ring-[#E4E4E7]'
                      }`}
                    >
                      <span
                        className="block w-full h-full rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#18181B]">
                {t.sizeLabel}: <span className="text-[#71717A] font-normal">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-h-[36px] min-w-[44px] px-3 py-1 rounded-full text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#C83E7D] text-white'
                          : 'bg-white border border-[#E4E4E7] text-[#18181B] hover:border-[#C83E7D]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-1.5 pt-1 border-t border-[#F1E8EE]">
            <p className="text-xs font-semibold text-[#18181B]">{t.descriptionLabel}</p>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Reviews Section inside Quick View Drawer */}
          <div className="pt-4 border-t border-[#F1E8EE] space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-4 h-4 text-[#C83E7D]" />
                <h3 className="font-display text-sm font-bold text-[#18181B]">
                  {t.reviewsTitle} ({totalReviewCount})
                </h3>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#18181B] tabular-nums">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{totalReviewCount > 0 ? averageRating.toFixed(1) : '0.0'}</span>
              </div>
            </div>

            {user && user.emailVerified ? (
              <form
                onSubmit={handleSubmitReview}
                className="p-3.5 rounded-2xl bg-[#FFF8FB] border border-[#F3D2E3] space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[#18181B]">{t.writeReviewTitle}</p>
                  <div className="flex items-center gap-0.5" role="radiogroup" aria-label="Star rating">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= (hoverRating ?? reviewRating);
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          aria-label={`${star} stars`}
                          className="p-0.5 cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              active ? 'fill-amber-400 text-amber-400' : 'fill-white text-[#D4D4D8]'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <textarea
                  rows={2}
                  maxLength={500}
                  value={reviewComment}
                  onChange={(e) => {
                    setReviewComment(e.target.value);
                    if (reviewError) setReviewError(null);
                  }}
                  placeholder={t.reviewPlaceholder}
                  className="w-full p-2.5 bg-white border border-[#E4E4E7] rounded-xl text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#C83E7D] resize-none"
                />

                {reviewError && <p className="text-xs text-[#C83E7D] font-medium">{reviewError}</p>}

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="min-h-[34px] px-4 py-1 rounded-full bg-[#C83E7D] hover:bg-[#B2326D] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-3 h-3" />
                    <span>{submittingReview ? '...' : t.submitReviewBtn}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 rounded-2xl bg-[#FFF8FB] border border-[#F3D2E3] flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 text-[11px] text-[#52525B]">
                  <Lock className="w-3.5 h-3.5 text-[#C83E7D] shrink-0" />
                  <span>{t.reviewAuthRequired}</span>
                </div>
                <button
                  type="button"
                  disabled={signingInForReview}
                  onClick={handleSignInReviewClick}
                  className="min-h-[34px] px-3 py-1 rounded-full bg-white border border-[#E4E4E7] hover:border-[#C83E7D] text-[#18181B] text-[11px] font-semibold shrink-0 cursor-pointer"
                >
                  {signingInForReview ? '...' : t.googleSignInBtn}
                </button>
              </div>
            )}

            {allReviews.length === 0 ? (
              <p className="text-xs text-[#71717A] text-center py-2">{t.noReviewsYet}</p>
            ) : (
              <div className="space-y-2">
                {allReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3 rounded-2xl bg-[#F6F6F8] border border-[#EFEFF2] space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#18181B] truncate">
                        {rev.author}
                      </span>
                      <div className="flex items-center gap-0.5 shrink-0">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-transparent text-[#D4D4D8]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#3F3F46] leading-relaxed">{rev.comment}</p>
                    <p className="text-[10px] text-[#A1A1AA] tabular-nums">{rev.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom CTA Footer */}
        <div className="p-4 border-t border-[#F1E8EE] bg-white shrink-0 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              onAddToCart(
                product,
                activeColor?.name || 'أساسي',
                activeColor?.hex || '#18181B',
                selectedSize || 'مقاس موحد',
                1,
                false
              );
              onClose();
            }}
            className="flex-1 min-h-[46px] rounded-full bg-gradient-to-r from-[#C83E7D] to-[#D94C8D] hover:from-[#B2326D] hover:to-[#C83E7D] text-white text-sm font-semibold shadow-md shadow-[#C83E7D]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.addToCartCta}</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenFullProduct(product);
            }}
            className="min-h-[46px] px-4 rounded-full border border-[#E4E4E7] hover:border-[#C83E7D] text-xs font-semibold text-[#18181B] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            {t.fullDetailsBtn}
          </button>
        </div>
      </aside>
    </div>
  );
}
