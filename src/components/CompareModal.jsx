import React from 'react';
import { X, Map } from 'lucide-react';
import {
  formatMoney,
  formatDistance,
  mapsSearch,
  getAverageRating,
} from '../utils/helpers';

export default function CompareModal({
  compareMesses,
  onClose,
  onRemoveFromCompare,
  reviewsMap = {},
}) {
  if (compareMesses.length < 2) return null;

  const rows = [
    ['Food type', (m) => m.foodType],
    ['Cuisine', (m) => m.cuisineCategory],
    ['Distance', (m) => formatDistance(m.distanceMeters)],
    ['Student rating', (m) => `★ ${getAverageRating(m, reviewsMap[m.id]).toFixed(1)}`],
    ['Single plate', (m) => formatMoney(m.pricing.dailyPlate)],
    ['Monthly · 1x', (m) => formatMoney(m.pricing.monthlyPass1x)],
    ['Monthly · 2x', (m) => formatMoney(m.pricing.monthlyPass2x)],
    ['Sunday feast', (m) => formatMoney(m.pricing.sundayFeast)],
    ['Lunch', (m) => m.timings.lunch],
    ['Dinner', (m) => m.timings.dinner],
    ['Sunday night', (m) => (m.sundayNightOpen ? 'Open' : 'Closed')],
    ['Water', (m) => m.waterFacility],
    ['Seating', (m) => `${m.seatingCapacity} seats`],
    ['Delivery', (m) => m.pricing.delivery || 'Ask at counter'],
  ];

  return (
    <div
      id="compare-modal"
      className="modal-backdrop fixed inset-0 z-50 grid items-end justify-center p-0 sm:items-center sm:p-5"
    >
      <div className="max-h-[92vh] w-full overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-w-5xl sm:rounded-[2rem]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 sm:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              SIDE-BY-SIDE SHORTLIST
            </p>
            <h2 className="font-display mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
              Compare Your <span className="text-brand-blue">Messes</span>
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              A clear look at prices, timings, and facilities across your shortlisted places.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X size={19} />
          </button>
        </div>

        <div className="compare-scroll max-h-[60vh] overflow-auto overscroll-contain">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-40 border-b border-slate-100 bg-slate-50 p-4 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Feature
                </th>
                {compareMesses.map((mess) => (
                  <th key={mess.id} className="border-b border-slate-100 p-4 align-top">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-display text-lg font-extrabold leading-tight text-slate-900">
                          {mess.name}
                        </div>
                        <div className="mt-1 text-xs font-semibold text-slate-400">
                          {mess.address}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCompare(mess.id)}
                        className="text-slate-400 hover:text-rose-600"
                        aria-label={`Remove ${mess.name} from comparison`}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, getter], index) => (
                <tr key={label} className={index % 2 ? 'bg-slate-50/60' : ''}>
                  <th className="border-b border-slate-100 p-4 text-xs font-extrabold text-slate-500">
                    {label}
                  </th>
                  {compareMesses.map((mess) => (
                    <td
                      key={mess.id}
                      className="border-b border-slate-100 p-4 text-sm font-bold text-slate-800"
                    >
                      {getter(mess)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 p-5 sm:flex-row sm:justify-end sm:p-7">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Keep browsing
          </button>
          {compareMesses[0] && (
            <a
              href={mapsSearch(compareMesses[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-orangeHover"
            >
              <Map size={16} /> Open first result in Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
