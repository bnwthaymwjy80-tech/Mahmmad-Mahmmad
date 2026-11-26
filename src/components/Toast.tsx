import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#18181B] text-white px-4 py-2.5 rounded-xl shadow-lg border border-white/10 flex items-center gap-2 text-sm font-medium transition-all duration-150"
    >
      <CheckCircle2 className="w-4 h-4 text-[#FDA4AF] shrink-0" />
      <span className="whitespace-nowrap">{message}</span>
    </div>
  );
}
