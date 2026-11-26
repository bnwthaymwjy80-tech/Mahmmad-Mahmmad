import { useState } from 'react';
import { Globe, Lock } from 'lucide-react';
import { UNIQUE_WORLD_CURRENCIES } from '../data/currencies';
import { STORE_INSTAGRAM_URL, STORE_INSTAGRAM_USERNAME } from '../data/products';
import { SUPPORTED_LANGUAGES, TranslationStrings } from '../i18n/translations';
import { LanguageCode } from '../types/shop';

interface TrustFooterProps {
  t: TranslationStrings;
  language: LanguageCode;
  onChangeLanguage: (lang: LanguageCode) => void;
  currency: string;
  onChangeCurrency: (currency: string) => void;
  onOpenWelcome: () => void;
  onOpenAdmin: () => void;
}

export function TrustFooter({
  t,
  language,
  onChangeLanguage,
  currency,
  onChangeCurrency,
  onOpenWelcome,
  onOpenAdmin,
}: TrustFooterProps) {
  const [currencySearch, setCurrencySearch] = useState('');

  const filteredCurrencies = currencySearch.trim()
    ? UNIQUE_WORLD_CURRENCIES.filter(
        (c) =>
          c.code.toLowerCase().includes(currencySearch.trim().toLowerCase()) ||
          c.nameAr.includes(currencySearch.trim()) ||
          c.countryAr.includes(currencySearch.trim()) ||
          c.nameEn.toLowerCase().includes(currencySearch.trim().toLowerCase())
      )
    : UNIQUE_WORLD_CURRENCIES;

  return (
    <footer className="bg-[#FFF8FB] border-t border-[#F1E8EE] pb-24 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-2">
          <p className="font-display text-xl font-bold text-[#18181B]">{t.brandName}</p>
          <p className="text-xs text-[#71717A] max-w-sm leading-relaxed">
            {t.footerDesc}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold text-[#C83E7D]">
            <button type="button" onClick={onOpenWelcome} className="hover:underline cursor-pointer">
              {t.welcomeTag}
            </button>
            <a
              href={STORE_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline inline-flex items-center gap-1"
            >
              <span>إنستغرام:</span>
              <span dir="ltr" className="font-mono">@{STORE_INSTAGRAM_USERNAME}</span>
            </a>
          </div>
        </div>

        {/* Languages, All World Country Currencies, and Discrete Lock Icon */}
        <div className="lg:col-span-8 flex flex-col sm:flex-row items-stretch sm:items-start gap-4">
          <div className="flex-1 space-y-1.5">
            <label
              htmlFor="language-select"
              className="text-xs font-semibold text-[#18181B] inline-flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-[#C83E7D]" />
              <span>{t.languageLabel}</span>
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value as LanguageCode)}
              className="w-full min-h-[40px] px-3.5 bg-white border border-[#E4E4E7] rounded-full text-xs font-medium text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#C83E7D] cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.englishName})
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 space-y-1.5">
            <label
              htmlFor="currency-select"
              className="text-xs font-semibold text-[#18181B] block"
            >
              {t.currencyLabel}
            </label>
            <div className="flex items-center gap-2">
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => onChangeCurrency(e.target.value)}
                className="flex-1 min-h-[40px] px-3.5 bg-white border border-[#E4E4E7] rounded-full text-xs font-medium text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#C83E7D] cursor-pointer"
              >
                {filteredCurrencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} · {c.countryAr} — {c.nameAr} ({c.symbol})
                  </option>
                ))}
              </select>

              {/* Lock icon only placed cleanly right beside Language & Currency */}
              <button
                type="button"
                onClick={onOpenAdmin}
                aria-label={t.adminSectionTitle}
                title={t.adminSectionTitle}
                className="w-[40px] h-[40px] rounded-full bg-white border border-[#E4E4E7] hover:border-[#C83E7D] hover:bg-[#FCEAF3] text-[#C83E7D] flex items-center justify-center transition-colors duration-150 shrink-0 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
              </button>
            </div>
            <input
              type="search"
              value={currencySearch}
              onChange={(e) => setCurrencySearch(e.target.value)}
              placeholder="ابحثي عن عملة أي بلد (IQD, USD, EUR...)"
              aria-label="Search world currencies"
              className="w-full min-h-[34px] px-3.5 bg-white border border-[#E4E4E7] rounded-full text-[11px] text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-1 focus:ring-[#C83E7D]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[#F1E8EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#71717A]">
          <p>© 2026 {t.brandName}. جميع الحقوق محفوظة.</p>
          <p>العملة الرئيسية: الدينار العراقي (IQD)</p>
        </div>
      </div>
    </footer>
  );
}
