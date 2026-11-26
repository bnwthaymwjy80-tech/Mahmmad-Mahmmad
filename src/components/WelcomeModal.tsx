import { ArrowLeft, Sparkles } from 'lucide-react';
import { HERO_CHRISTMAS_IMAGE } from '../data/products';
import { TranslationStrings } from '../i18n/translations';
import { ResilientImage } from './ResilientImage';

interface WelcomeModalProps {
  t: TranslationStrings;
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ t, isOpen, onClose }: WelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex flex-col justify-between overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={t.brandName}
    >
      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col justify-between px-6 py-6 sm:py-10">
        {/* Top Row: Brand & Skip */}
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-[#18181B]">
            {t.brandName}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-[#C83E7D] hover:underline px-2 py-1 cursor-pointer"
          >
            {t.welcomeSkip}
          </button>
        </div>

        {/* Center Organic Blush Showcase Card (Screen 1 Replica) */}
        <div className="my-6 relative">
          <div className="aspect-[4/4.3] rounded-[2rem] bg-gradient-to-b from-[#FCEAF3] to-[#F9D5E8] p-4 sm:p-6 relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden shadow-sm relative">
              <ResilientImage
                src={HERO_CHRISTMAS_IMAGE}
                alt={t.brandName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-x-4 bottom-4 flex justify-center pointer-events-none">
                <div className="bg-white/92 backdrop-blur-md border border-[#F3D2E3] rounded-2xl px-5 py-1.5 shadow-md text-center">
                  <p className="font-display text-base font-bold text-[#18181B]">أليانز شوب</p>
                </div>
              </div>
            </div>

            <div className="absolute top-6 end-6 bg-white/95 backdrop-blur-xs rounded-2xl px-3.5 py-2 shadow-sm border border-[#F3D2E3] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C83E7D]" />
              <span className="text-xs font-semibold text-[#18181B]">{t.welcomeTag}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copy & Full-Width Pill CTA */}
        <div className="space-y-5">
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold leading-tight text-[#18181B]">
              {t.welcomeHeadlineTop}
              <br />
              <span className="text-[#C83E7D]">{t.welcomeHeadlineAccent}</span>
            </h1>
            <p className="text-sm text-[#71717A] leading-relaxed">
              {t.welcomeDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[52px] rounded-full bg-gradient-to-r from-[#C83E7D] to-[#D94C8D] hover:from-[#B2326D] hover:to-[#C83E7D] text-white text-base font-semibold shadow-md shadow-[#C83E7D]/25 flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer"
          >
            <span>{t.welcomeCta}</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
          </button>

          <div className="flex items-center justify-center gap-1.5 pt-1">
            <span className="w-5 h-1.5 rounded-full bg-[#C83E7D]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E4E4E7]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E4E4E7]" />
          </div>
        </div>
      </div>
    </div>
  );
}
