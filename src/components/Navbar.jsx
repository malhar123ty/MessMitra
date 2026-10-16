import React from 'react';
import { ArrowLeft, ArrowLeftRight } from 'lucide-react';

export default function Navbar({
  isDetailView,
  onGoHome,
  compareCount,
  onOpenCompare,
  onShowAbout,
}) {
  return (
    <div className="sticky top-4 z-30 mx-auto w-full max-w-6xl px-4 sm:px-6">
      <nav className="floating-nav flex items-center justify-between px-5 py-3.5 sm:px-7">
        <button
          className="flex items-center text-left transition hover:opacity-95"
          onClick={onGoHome}
          aria-label="Go to all messes"
        >
          <img
            src="/logo-horizontal.png"
            alt="MessMitra Logo"
            className="h-9 sm:h-10 w-auto object-contain transition-transform hover:scale-[1.02]"
          />
        </button>

        <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <a
            href="#explore-messes"
            onClick={isDetailView ? onGoHome : undefined}
            className="transition hover:text-brand-blue"
          >
            Messes
          </a>
          <a
            href="#why-messmitra"
            onClick={isDetailView ? onGoHome : undefined}
            className="transition hover:text-brand-blue"
          >
            Why Us
          </a>
          <a
            href="#student-voices"
            onClick={isDetailView ? onGoHome : undefined}
            className="transition hover:text-brand-blue"
          >
            Reviews
          </a>
          <button
            type="button"
            onClick={onShowAbout}
            className="transition hover:text-brand-blue"
          >
            About
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blueLight px-3.5 py-2.5 text-xs font-bold text-brand-blue transition hover:bg-blue-100"
            >
              <ArrowLeftRight size={15} />
              <span>Compare ({compareCount})</span>
            </button>
          )}

          {isDetailView ? (
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-orangeHover"
            >
              <ArrowLeft size={16} /> All Messes
            </button>
          ) : (
            <a
              href="#explore-messes"
              className="inline-flex items-center justify-center rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-orangeHover"
            >
              Find Your Mess
            </a>
          )}
        </div>
      </nav>
    </div>
  );
}
