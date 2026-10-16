import React from 'react';
import { ShieldCheck, IndianRupee, Heart } from 'lucide-react';

export default function BottomCta({ onOpenCompareModal, onScrollToResults }) {
  return (
    <section className="cta-pastel py-16 text-center sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Ready to Find Your<br />
          <span className="text-brand-blue">Everyday Table?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Shortlist up to 3 messes side-by-side, check walking directions from PICT gate, or leave a verified student review.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onScrollToResults}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-orangeHover"
          >
            Explore Messes <span>→</span>
          </button>
          <button
            type="button"
            onClick={onOpenCompareModal}
            className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/40 px-6 py-3.5 text-sm font-bold text-slate-900 backdrop-blur-sm transition hover:bg-white/70"
          >
            Compare Selected
          </button>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-brand-blue">
              <ShieldCheck size={15} />
            </span>{' '}
            Student Audited
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-brand-blue">
              <IndianRupee size={15} />
            </span>{' '}
            Real Local Rates
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-brand-blue">
              <Heart size={15} />
            </span>{' '}
            Built for PICTians
          </span>
        </div>
      </div>
    </section>
  );
}
