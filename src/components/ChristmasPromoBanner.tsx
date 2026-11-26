import { useEffect, useState } from 'react';
import { Check, Copy, Snowflake, X } from 'lucide-react';
import { TranslationStrings } from '../i18n/translations';

interface ChristmasPromoBannerProps {
  t: TranslationStrings;
  onCopyPromoCode?: (code: string) => void;
  onExploreCatalog?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getChristmasSaleDeadline(): number {
  const now = new Date();
  let targetYear = now.getFullYear();
  let target = new Date(targetYear, 11, 26, 23, 59, 59, 999);
  if (now.getTime() >= target.getTime()) {
    targetYear += 1;
    target = new Date(targetYear, 11, 26, 23, 59, 59, 999);
  }
  return target.getTime();
}

function calculateRemaining(deadlineMs: number): TimeRemaining {
  const diff = Math.max(0, deadlineMs - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

export function ChristmasPromoBanner({
  t,
  onCopyPromoCode,
  onExploreCatalog,
}: ChristmasPromoBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deadlineMs] = useState<number>(() => getChristmasSaleDeadline());
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    calculateRemaining(deadlineMs)
  );

  useEffect(() => {
    if (dismissed) return;
    const timerId = window.setInterval(() => {
      setRemaining(calculateRemaining(deadlineMs));
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [deadlineMs, dismissed]);

  if (dismissed) return null;

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('XMAS20').catch(() => {});
    }
    setCopied(true);
    onCopyPromoCode?.('XMAS20');
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      role="region"
      aria-label={t.promoBannerText}
      className="relative z-20 bg-gradient-to-r from-[#B5316C] via-[#C83E7D] to-[#B5316C] text-white border-b border-[#A42960]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <Snowflake className="w-4 h-4 text-white/90 shrink-0" aria-hidden="true" />
          <button
            type="button"
            onClick={onExploreCatalog}
            className="text-xs sm:text-sm font-semibold text-white hover:underline text-start truncate cursor-pointer"
          >
            {t.promoBannerText}
          </button>

          <button
            type="button"
            onClick={handleCopyCode}
            title={t.promoCodeLabel}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/18 hover:bg-white/28 border border-white/25 text-[11px] font-mono font-bold tracking-wide text-white transition-colors shrink-0 cursor-pointer"
          >
            <span>XMAS20</span>
            {copied ? (
              <Check className="w-3 h-3 text-white" aria-hidden="true" />
            ) : (
              <Copy className="w-3 h-3 text-white/90" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div
            className="flex items-center gap-1 font-mono text-xs tabular-nums bg-black/20 border border-white/15 rounded-lg px-2.5 py-1"
            aria-live="off"
          >
            <span>
              {padTwo(remaining.days)}
              <span className="text-[10px] text-white/80 ms-0.5">{t.promoDays}</span>
            </span>
            <span className="text-white/60" aria-hidden="true">
              :
            </span>
            <span>
              {padTwo(remaining.hours)}
              <span className="text-[10px] text-white/80 ms-0.5">{t.promoHours}</span>
            </span>
            <span className="text-white/60" aria-hidden="true">
              :
            </span>
            <span>
              {padTwo(remaining.minutes)}
              <span className="text-[10px] text-white/80 ms-0.5">{t.promoMinutes}</span>
            </span>
            <span className="text-white/60" aria-hidden="true">
              :
            </span>
            <span>
              {padTwo(remaining.seconds)}
              <span className="text-[10px] text-white/80 ms-0.5">{t.promoSeconds}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label={t.promoDismissLabel}
            className="w-7 h-7 rounded-full hover:bg-white/15 flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
