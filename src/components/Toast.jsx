import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function Toast({ toasts }) {
  return (
    <div
      className="fixed right-4 bottom-4 z-[70] flex w-[min(380px,calc(100vw-2rem))] flex-col gap-3"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold shadow-xl ${
            t.tone === 'green' ? 'bg-brand-blue text-white' : 'bg-brand-navy text-white'
          }`}
        >
          {t.tone === 'green' ? <CheckCircle2 size={17} /> : <Sparkles size={17} />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
