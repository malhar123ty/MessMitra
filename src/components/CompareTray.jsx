import React from 'react';
import { Columns3, ArrowLeftRight } from 'lucide-react';

export default function CompareTray({
  compareMesses,
  onClearCompare,
  onOpenCompareModal,
}) {
  if (!compareMesses.length) return null;

  return (
    <aside className="compare-tray fixed inset-x-3 bottom-4 z-40 mx-auto max-w-3xl rounded-2xl border border-blue-200 bg-white/95 p-3 shadow-2xl backdrop-blur-md sm:inset-x-5 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-blueLight text-brand-blue">
            <Columns3 size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-wider text-brand-blue">
              Compare messes
            </p>
            <p className="truncate text-sm font-bold text-slate-800">
              {compareMesses.map((m) => m.name).join(' · ')}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={onClearCompare}
            className="rounded-xl px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100"
          >
            Clear
          </button>
          <button
            onClick={onOpenCompareModal}
            className={`inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-orangeHover ${
              compareMesses.length < 2 ? 'opacity-60' : ''
            }`}
          >
            <ArrowLeftRight size={15} /> Compare {compareMesses.length}/3
          </button>
        </div>
      </div>
    </aside>
  );
}
