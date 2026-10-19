import React from 'react';
import {
  Phone,
  Navigation,
  CheckSquare,
  MapPin,
  Map,
  Bike,
  Check,
  Sun,
  Moon,
  Droplets,
  CalendarDays,
  PenLine,
  MessageCircle,
} from 'lucide-react';
import {
  formatMoney,
  formatDistance,
  mapsSearch,
  mapsDirections,
  getAverageRating,
} from '../utils/helpers';
import StarRating from './StarRating';

export default function DetailView({
  mess,
  inCompare,
  onToggleCompare,
  onOpenReviewModal,
  reviews = [],
}) {
  const hasReviews = reviews && reviews.length > 0;
  const rating = hasReviews
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : null;
  const verifiedReviewCount = reviews.filter((r) => r.verified).length;

  const reviewsWithAttrs = reviews.filter(
    (r) => r.taste || r.hygiene || r.gutComfort || r.valueForMoney
  );
  const avgTaste = reviewsWithAttrs.length
    ? (reviewsWithAttrs.reduce((sum, r) => sum + (r.taste || r.rating || 0), 0) / reviewsWithAttrs.length).toFixed(1)
    : rating;
  const avgHygiene = reviewsWithAttrs.length
    ? (reviewsWithAttrs.reduce((sum, r) => sum + (r.hygiene || r.rating || 0), 0) / reviewsWithAttrs.length).toFixed(1)
    : rating;
  const avgGut = reviewsWithAttrs.length
    ? (reviewsWithAttrs.reduce((sum, r) => sum + (r.gutComfort || r.rating || 0), 0) / reviewsWithAttrs.length).toFixed(1)
    : rating;
  const avgValue = reviewsWithAttrs.length
    ? (reviewsWithAttrs.reduce((sum, r) => sum + (r.valueForMoney || r.rating || 0), 0) / reviewsWithAttrs.length).toFixed(1)
    : rating;

  const p = mess.pricing;
  const pricingRows = [
    ['Veg plate', p.dailyPlate],
    ['Egg plate', p.dailyEgg],
    ['Non-veg plate', p.dailyNonVeg],
    ['Monthly · 1 meal/day', p.monthlyPass1x],
    ['Monthly · 2 meals/day', p.monthlyPass2x],
    ['Monthly non-veg · 1x', p.monthlyNonVeg1x],
    ['Monthly non-veg · 2x', p.monthlyNonVeg2x],
    ['Sunday feast', p.sundayFeast],
  ].filter(([, v]) => v != null);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="hero-pastel pb-12 pt-4 sm:pb-16 sm:pt-6">
        <div className="mx-auto mt-8 max-w-6xl px-4 sm:mt-10 sm:px-6">
          <div className="grid items-center gap-8 rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill bg-brand-blueLight px-3 py-1 text-xs font-bold text-brand-blue">
                  {mess.foodType === 'Pure Veg' ? '🌱 Pure Veg' : `🍗 ${mess.foodType}`}
                </span>
                <span className="pill bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  {mess.cuisineCategory} · {mess.category}
                </span>
                {mess.sundayNightOpen && (
                  <span className="pill bg-brand-orangeLight px-3 py-1 text-xs font-extrabold text-brand-orange">
                    <Moon size={13} /> Open Sunday Night
                  </span>
                )}
              </div>

              <h1 className="font-display mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                {mess.name}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                {mess.ownerSpecialty}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="font-display text-xl font-extrabold text-brand-blue sm:text-2xl">
                    {formatMoney(mess.pricing.dailyPlate)}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">Daily Plate</div>
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {hasReviews ? (
                      <>
                        <span className="text-brand-orange">★</span> {rating}
                      </>
                    ) : (
                      <span className="text-slate-400 text-lg">0 reviews</span>
                    )}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">
                    {hasReviews
                      ? verifiedReviewCount
                        ? `${verifiedReviewCount} verified reviews`
                        : `${reviews.length} reviews`
                      : 'No student ratings yet'}
                  </div>
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {formatDistance(mess.distanceMeters)}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">
                    {mess.seatingCapacity} seats inside
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={`tel:${mess.contact.replace(/[^+\d]/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-orangeHover"
                >
                  <Phone size={16} /> Call {mess.owner.split(' ').slice(0, 2).join(' ')}
                </a>
                <a
                  href={mapsDirections(mess)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-blueHover"
                >
                  <Navigation size={16} /> Walking directions
                </a>
                <button
                  type="button"
                  onClick={() => onToggleCompare(mess.id)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    inCompare
                      ? 'border-brand-blue bg-brand-blueLight text-brand-blue'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-brand-blue hover:text-brand-blue'
                  }`}
                >
                  <CheckSquare size={16} /> {inCompare ? 'In Comparison' : 'Compare'}
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
              <img
                src={mess.images[0]}
                alt={`${mess.name} food`}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {/* Location & Google Maps card */}
            <section className="card rounded-2xl p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-blueLight text-brand-blue">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                      WHERE TO FIND IT
                    </p>
                    <p className="mt-1 text-base font-bold text-slate-900">{mess.address}</p>
                  </div>
                </div>
                <a
                  href={mapsSearch(mess)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-extrabold text-slate-700 transition hover:border-brand-blue hover:bg-brand-blueLight hover:text-brand-blue"
                >
                  <Map size={15} /> Open in Google Maps
                </a>
              </div>
            </section>

            {/* Pricing & portions card */}
            <section className="card rounded-2xl p-6">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    TRANSPARENT RATES
                  </p>
                  <h2 className="font-display mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                    Prices & <span className="text-brand-blue">Portions</span>
                  </h2>
                </div>
                <span className="rounded-xl bg-brand-orangeLight px-3 py-1.5 text-xs font-bold text-brand-orange">
                  {mess.servingRule}
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {pricingRows.map(([label, value], idx) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"
                  >
                    <span
                      className={`text-sm ${
                        idx === 0 ? 'font-bold text-slate-800' : 'text-slate-500'
                      }`}
                    >
                      {label}
                    </span>
                    <span className="font-display text-lg font-extrabold text-brand-blue">
                      {formatMoney(value)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-3 text-xs font-semibold text-slate-600">
                <Bike size={15} /> Delivery: {mess.pricing.delivery || 'Ask at the counter'}
              </div>
            </section>

            {/* Student highlights card */}
            <section className="card rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                STUDENT HIGHLIGHTS
              </p>
              <h2 className="font-display mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                Why Students <span className="text-brand-blue">Come Back</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{mess.ownerSpecialty}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {mess.studentHighlights.map((x) => (
                  <div
                    key={x}
                    className="rounded-xl bg-brand-blueLight/70 p-3.5 text-xs font-bold leading-5 text-slate-800"
                  >
                    <span className="text-brand-blue mr-1 inline-block">
                      <Check size={14} className="inline" />
                    </span>
                    {x}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* Hours & facilities */}
            <section className="card rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                PLAN YOUR VISIT
              </p>
              <h2 className="font-display mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                Hours & <span className="text-brand-blue">Facilities</span>
              </h2>
              <div className="mt-5 space-y-3">
                <div className="flex gap-3.5 rounded-xl bg-slate-50 p-3.5">
                  <div className="text-brand-orange">
                    <Sun size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Lunch</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">{mess.timings.lunch}</p>
                  </div>
                </div>
                <div className="flex gap-3.5 rounded-xl bg-slate-50 p-3.5">
                  <div className="text-brand-blue">
                    <Moon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Dinner</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">{mess.timings.dinner}</p>
                  </div>
                </div>
                <div
                  className={`flex gap-3.5 rounded-xl ${
                    mess.waterFacility.toLowerCase().includes('ro')
                      ? 'bg-brand-blueLight/60'
                      : 'bg-slate-50'
                  } p-3.5`}
                >
                  <div className="text-brand-blue">
                    <Droplets size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Water facility
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">
                      {mess.waterFacility}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex gap-3.5 rounded-xl ${
                    mess.sundayNightOpen ? 'bg-brand-orangeLight/70' : 'bg-slate-50'
                  } p-3.5`}
                >
                  <div className={mess.sundayNightOpen ? 'text-brand-orange' : 'text-slate-400'}>
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Sunday night
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">
                      {mess.sundayNightOpen ? 'Open for dinner' : 'Closed for dinner'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  On site facilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {mess.facilities.map((x) => (
                    <span
                      key={x}
                      className="pill border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"
                    >
                      <Check size={13} /> {x}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Student reviews */}
            <section className="card rounded-2xl p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    COMMUNITY FEEDBACK
                  </p>
                  <h2 className="font-display mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                    Student <span className="text-brand-blue">Reviews</span>
                  </h2>
                </div>
                {hasReviews ? (
                  <span className="rounded-xl bg-brand-orangeLight px-3 py-1.5 text-sm font-extrabold text-brand-orange">
                    ★ {rating}
                  </span>
                ) : (
                  <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-400">
                    0 reviews
                  </span>
                )}
              </div>

              {/* Average Ratings Box for Taste, Hygiene, Gut Comfort, Value */}
              {hasReviews && (
                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                        Average Student Rating
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <StarRating rating={rating} size={16} />
                        <span className="font-display text-lg font-black text-slate-900">
                          {rating} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      Based on {reviews.length} review{reviews.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    <div className="rounded-xl bg-white p-2.5 shadow-sm border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500">Taste</span>
                      <div className="mt-1 flex items-center justify-between gap-1">
                        <StarRating rating={avgTaste} size={11} />
                        <span className="text-xs font-bold text-slate-800">{avgTaste}</span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-2.5 shadow-sm border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500">Hygiene</span>
                      <div className="mt-1 flex items-center justify-between gap-1">
                        <StarRating rating={avgHygiene} size={11} />
                        <span className="text-xs font-bold text-slate-800">{avgHygiene}</span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-2.5 shadow-sm border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500">Gut Comfort</span>
                      <div className="mt-1 flex items-center justify-between gap-1">
                        <StarRating rating={avgGut} size={11} />
                        <span className="text-xs font-bold text-slate-800">{avgGut}</span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-2.5 shadow-sm border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500">Value for Money</span>
                      <div className="mt-1 flex items-center justify-between gap-1">
                        <StarRating rating={avgValue} size={11} />
                        <span className="text-xs font-bold text-slate-800">{avgValue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5">
                {reviews.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
                    <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-orange shadow-sm">
                      <MessageCircle size={19} />
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-700">
                      0 reviews recorded yet.
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Be the first student to review this mess and guide others.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviews
                      .slice()
                      .reverse()
                      .map((r, i) => (
                        <article key={i} className="rounded-2xl border border-slate-200 bg-white p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-extrabold text-slate-700">
                                {r.initials || (r.name ? r.name.slice(0, 2).toUpperCase() : 'ST')}
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <strong className="text-sm text-slate-900">{r.name}</strong>
                                  <span
                                    className={`pill ${
                                      r.verified
                                        ? 'bg-brand-blueLight text-brand-blue'
                                        : 'bg-slate-100 text-slate-500'
                                    } px-2.5 py-0.5 text-[10px] font-extrabold`}
                                  >
                                    {r.verified
                                      ? '🎓 Verified PICT Student'
                                      : '👤 Community Student Reviewer'}
                                    {r.emailVerified ? ' · Email verified' : ''}
                                  </span>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                  <StarRating rating={r.rating} size={13} />
                                  <span className="text-xs font-bold text-slate-800">
                                    {r.avgRating ? r.avgRating.toFixed(1) : r.rating}
                                  </span>
                                  <span className="text-xs font-medium text-slate-400">· {r.label}</span>
                                </div>
                              </div>
                            </div>
                            <time className="text-[10px] font-semibold text-slate-400 shrink-0">{r.date}</time>
                          </div>

                          {/* 4 attributes shown with colored 5-star rating instead of 4/5 or 3/5 */}
                          <div className="mt-3.5 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2.5 sm:grid-cols-4">
                            <div>
                              <div className="text-[10px] font-semibold text-slate-500">Taste</div>
                              <StarRating rating={r.taste || r.rating} size={11} />
                            </div>
                            <div>
                              <div className="text-[10px] font-semibold text-slate-500">Hygiene</div>
                              <StarRating rating={r.hygiene || r.rating} size={11} />
                            </div>
                            <div>
                              <div className="text-[10px] font-semibold text-slate-500">Gut Comfort</div>
                              <StarRating rating={r.gutComfort || r.rating} size={11} />
                            </div>
                            <div>
                              <div className="text-[10px] font-semibold text-slate-500">Value</div>
                              <StarRating rating={r.valueForMoney || r.rating} size={11} />
                            </div>
                          </div>

                          {/* User written comment if present */}
                          {Boolean(
                            (r.comment && r.comment.trim()) ||
                            (r.text && !r.text.startsWith('Taste:') && r.text.trim())
                          ) ? (
                            <p className="mt-3 text-sm leading-6 text-slate-700 font-medium italic">
                              "{r.comment ? r.comment.trim() : r.text.trim()}"
                            </p>
                          ) : null}
                        </article>
                      ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onOpenReviewModal}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-orangeHover"
              >
                <PenLine size={16} /> Write a student review
              </button>
            </section>
          </div>
        </div>

        <p className="mt-8 text-center text-xs font-medium text-slate-400">{mess.surveyDetails}</p>
      </main>
    </div>
  );
}
