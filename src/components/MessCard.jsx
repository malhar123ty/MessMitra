import React from 'react';
import { MapPin, CheckSquare } from 'lucide-react';
import { formatMoney, formatDistance, mapsSearch, getAverageRating } from '../utils/helpers';

export default function MessCard({
  mess,
  inCompare,
  onToggleCompare,
  onSelectMess,
  reviews = [],
}) {
  const veg = mess.foodType === 'Pure Veg';
  const hasReviews = reviews && reviews.length > 0;
  const rating = hasReviews
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <article className="mess-card card flex flex-col overflow-hidden rounded-2xl">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={mess.images[0]}
          alt={`${mess.name} food`}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
          loading="lazy"
        />

        {/* Top bar: tags & rating pill with non-overlapping responsive layout */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-1.5">
          <div className="flex max-w-[calc(100%-3.75rem)] flex-wrap items-center gap-1.5">
            <span className="pill bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-sm">
              {veg ? '🌱 Pure Veg' : '🍗 Veg & Non-Veg'}
            </span>
            {mess.sundayNightOpen && (
              <span className="pill bg-brand-orange px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                Sun Night Open
              </span>
            )}
          </div>

          <div className="pill shrink-0 bg-white/95 px-2.5 py-1 text-xs font-extrabold text-slate-900 shadow-sm backdrop-blur-sm">
            {hasReviews ? (
              <>
                <span className="text-brand-orange">★</span> {rating}
              </>
            ) : (
              <span className="text-slate-400 font-bold text-[11px]">0 reviews</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-extrabold leading-snug text-slate-900">{mess.name}</h3>
            <p className="mt-0.5 text-xs font-medium text-slate-400">
              {mess.cuisineCategory} · {formatDistance(mess.distanceMeters)}
            </p>
          </div>
        </div>

        <p className="mt-2.5 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-slate-500">
          {mess.ownerSpecialty}
        </p>

        {/* Monthly & Serving mini strip */}
        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs">
          <span className="font-medium text-slate-500">
            Monthly (2x): <strong className="text-slate-800">{formatMoney(mess.pricing.monthlyPass2x)}</strong>
          </span>
          <span className="font-semibold text-brand-blue">{mess.category}</span>
        </div>

        {/* Bottom price & actions row */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
          <div>
            <span className="font-display text-xl font-extrabold text-brand-blue">
              {formatMoney(mess.pricing.dailyPlate)}
            </span>
            <span className="text-xs font-medium text-slate-400"> / plate</span>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={mapsSearch(mess)}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Google Maps"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-blue hover:bg-brand-blueLight hover:text-brand-blue"
            >
              <MapPin size={15} />
            </a>
            <button
              type="button"
              onClick={() => onToggleCompare(mess.id)}
              title={inCompare ? 'Remove from comparison' : 'Add to comparison'}
              aria-label={inCompare ? 'Remove from comparison' : 'Add to comparison'}
              className={`grid h-9 w-9 place-items-center rounded-full border transition ${
                inCompare
                  ? 'border-brand-blue bg-brand-blueLight text-brand-blue'
                  : 'border-slate-200 text-slate-500 hover:border-brand-blue hover:bg-brand-blueLight hover:text-brand-blue'
              }`}
            >
              <CheckSquare size={15} />
            </button>
            <button
              type="button"
              onClick={() => onSelectMess(mess.id)}
              className="rounded-xl bg-brand-blueLight px-3 py-2 text-xs font-bold text-brand-blue transition hover:bg-brand-blue hover:text-white"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
