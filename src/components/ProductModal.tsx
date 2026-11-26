import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Lock,
  MessageSquarePlus,
  Ruler,
  Send,
  Share2,
  Star,
} from 'lucide-react';
import { formatPrice } from '../data/currencies';
import { TranslationStrings } from '../i18n/translations';
import { Product, ProductReview } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  t: TranslationStrings;
  product: Product | null;
  currency: string;
  user: User | null;
  isWishlisted: boolean;
  extraReviews: ProductReview[];
  onClose: () => void;
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

export function ProductModal({
  t,
  product,
  currency,
  user,
  isWishlisted,
  extraReviews,
  onClose,
  onGoogleSignIn,
  onToggleWishlist,
  onAddToCart,
  onAddReview,
}: ProductModalProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

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
      setShowSizeGuide(false);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-0 sm:p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Screen 3 Exact Replica Layout */}
      <div className="bg-white w-full max-w-4xl h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl overflow-hidden flex flex-col">
        {/* Top Bar: Back Button + Heart & Share */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#F1E8EE] shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Back"
            className="w-10 h-10 rounded-full bg-[#F6F6F8] hover:bg-[#FCEAF3] flex items-center justify-center text-[#18181B] cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label="Wishlist"
              className="w-10 h-10 rounded-full bg-[#F6F6F8] hover:bg-[#FCEAF3] flex items-center justify-center cursor-pointer"
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
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href).catch(() => {});
                }
              }}
              aria-label="Share"
              className="w-10 h-10 rounded-full bg-[#F6F6F8] hover:bg-[#FCEAF3] flex items-center justify-center text-[#18181B] cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Single Product Image */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/4.3] rounded-2xl bg-[#F6F6F8] overflow-hidden">
                <ResilientImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product Details Column matching Screen 3 */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h2
                  id="pdp-title"
                  className="font-display text-2xl font-bold text-[#18181B] mb-1.5"
                >
                  {product.name}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-[#71717A] tabular-nums">
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

              {/* Price + Strikethrough + Soft Pink % OFF Pill */}
              <div className="flex items-center gap-3 tabular-nums">
                <span className="text-2xl font-bold text-[#C83E7D]">
                  {formatPrice(product.priceIqd, currency)}
                </span>
                {product.originalPriceIqd && (
                  <span className="text-sm text-[#A1A1AA] line-through">
                    {formatPrice(product.originalPriceIqd, currency)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-[#FDE8F2] text-[#C83E7D] text-xs font-bold px-2.5 py-1 rounded-full">
                    {discountPercent}% {t.offLabel}
                  </span>
                )}
              </div>

              {/* Circular Color Swatches */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-[#18181B]">
                  {t.colorLabel}: <span className="text-[#71717A] font-normal">{activeColor.name}</span>
                </p>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, idx) => {
                    const active = idx === selectedColorIndex;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColorIndex(idx)}
                        title={color.name}
                        aria-label={color.name}
                        className={`w-9 h-9 rounded-full p-0.5 transition-all cursor-pointer ${
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

              {/* Pill Size Selector + Size Guide */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#18181B]">
                    {t.sizeLabel}: <span className="text-[#71717A] font-normal">{selectedSize}</span>
                  </span>
                  {product.hasSizeGuide && (
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide((prev) => !prev)}
                      className="text-[#C83E7D] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{t.sizeGuide}</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const active = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-h-[38px] min-w-[46px] px-3.5 py-1.5 rounded-full text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
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

                {showSizeGuide && (
                  <div className="p-3 bg-[#FFF8FB] border border-[#F3D2E3] rounded-2xl text-xs tabular-nums">
                    <div className="flex justify-between py-1 border-b border-[#F3D2E3]">
                      <span>S / 36-37</span>
                      <span>84–88 سم</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#F3D2E3]">
                      <span>M / 38-39</span>
                      <span>90–94 سم</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>L / 40-41</span>
                      <span>96–102 سم</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#18181B]">{t.descriptionLabel}</p>
                <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Ratings & Reviews Section (Authenticated Users Only to Post) */}
          <div className="pt-5 border-t border-[#F1E8EE] space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-4 h-4 text-[#C83E7D]" />
                <h3 className="font-display text-base font-bold text-[#18181B]">
                  {t.reviewsTitle} ({totalReviewCount})
                </h3>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#18181B] tabular-nums">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{totalReviewCount > 0 ? averageRating.toFixed(1) : '0.0'}</span>
              </div>
            </div>

            {user && user.emailVerified ? (
              <form
                onSubmit={handleSubmitReview}
                className="p-4 rounded-2xl bg-[#FFF8FB] border border-[#F3D2E3] space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[#18181B]">{t.writeReviewTitle}</p>
                  <div className="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
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
                          className="p-0.5 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              active
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-white text-[#D4D4D8]'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="text-xs font-mono font-bold text-[#C83E7D] ms-1.5 tabular-nums">
                      {reviewRating}/5
                    </span>
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
                  className="w-full p-3 bg-white border border-[#E4E4E7] rounded-xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#C83E7D] resize-none"
                />

                {reviewError && (
                  <p className="text-xs text-[#C83E7D] font-medium">{reviewError}</p>
                )}

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] text-[#71717A] truncate">
                    {user.displayName || user.email}
                  </span>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="min-h-[38px] px-5 py-1.5 rounded-full bg-[#C83E7D] hover:bg-[#B2326D] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingReview ? '...' : t.submitReviewBtn}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-[#FFF8FB] border border-[#F3D2E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-[#52525B]">
                  <Lock className="w-4 h-4 text-[#C83E7D] shrink-0" />
                  <span>{t.reviewAuthRequired}</span>
                </div>
                <button
                  type="button"
                  disabled={signingInForReview}
                  onClick={handleSignInReviewClick}
                  className="min-h-[38px] px-4 py-1.5 rounded-full bg-white border border-[#E4E4E7] hover:border-[#C83E7D] text-[#18181B] text-xs font-semibold shrink-0 cursor-pointer"
                >
                  {signingInForReview ? '...' : t.googleSignInBtn}
                </button>
              </div>
            )}

            {allReviews.length === 0 ? (
              <p className="text-xs text-[#71717A] text-center py-3">
                {t.noReviewsYet}
              </p>
            ) : (
              <div className="space-y-2.5">
                {allReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-2xl bg-[#F6F6F8] border border-[#EFEFF2] space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-bold text-[#18181B] truncate">
                          {rev.author}
                        </span>
                        {rev.verifiedSize && (
                          <span className="text-[10px] bg-white border border-[#E4E4E7] px-2 py-0.5 rounded-full text-[#71717A]">
                            {rev.verifiedSize}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
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

        {/* Sticky Bottom Full-Width Magenta Pill CTA matching Screen 3 */}
        <div className="p-4 sm:px-8 border-t border-[#F1E8EE] bg-white shrink-0">
          <button
            type="button"
            onClick={() =>
              onAddToCart(product, activeColor.name, activeColor.hex, selectedSize, 1, false)
            }
            className="w-full min-h-[50px] rounded-full bg-gradient-to-r from-[#C83E7D] to-[#D94C8D] hover:from-[#B2326D] hover:to-[#C83E7D] text-white text-sm sm:text-base font-semibold shadow-md shadow-[#C83E7D]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.addToCartCta}</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
