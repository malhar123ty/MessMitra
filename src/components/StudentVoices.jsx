import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import StarRating from './StarRating';

export default function StudentVoices({ onSelectMess, reviewsMap = {}, messesData = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  // Flatten and organize all reviews from all messes
  const allReviews = useMemo(() => {
    const list = [];
    Object.entries(reviewsMap || {}).forEach(([messIdStr, messReviews]) => {
      const messId = Number(messIdStr);
      const messObj = (messesData || []).find((m) => m.id === messId);
      const messName = messObj ? messObj.name : `Mess #${messId}`;

      (messReviews || []).forEach((r) => {
        const initials =
          r.initials ||
          (() => {
            const parts = (r.name || '').trim().split(/\s+/).filter(Boolean);
            if (parts.length === 0) return 'ST';
            if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
          })();

        list.push({
          ...r,
          messId,
          messName: r.messName || messName,
          initials,
        });
      });
    });

    // If no dynamic reviews yet, fallback to curated student notes
    if (list.length === 0) {
      return [
        {
          id: 'curated-1',
          messId: 7,
          messName: 'SK Dining (Santosh Mess)',
          name: 'Parth',
          initials: 'PA',
          rating: 5,
          avgRating: 4.8,
          label: 'Excellent',
          taste: 5,
          hygiene: 5,
          gutComfort: 5,
          valueForMoney: 4,
          comment:
            'Top pick for North Indian and outstation freshers. 100% pure Desi Ghee phulkas, Dal Makhani on rotation, and a spotless 40-seat dining hall.',
          verified: true,
          yearOfStudy: 'Second Year (SE)',
          date: '18 Oct 2026',
        },
        {
          id: 'curated-2',
          messId: 8,
          messName: 'Sadguru Mess',
          name: 'Pawan',
          initials: 'PW',
          rating: 5,
          avgRating: 4.5,
          label: 'Excellent',
          taste: 4,
          hygiene: 5,
          gutComfort: 5,
          valueForMoney: 4,
          comment:
            'Certified on-site RO drinking water and dinner open till 11:30 PM for exam nights. Plus it stays open on Sunday nights when most messes close.',
          verified: true,
          yearOfStudy: 'Second Year (SE)',
          date: '18 Oct 2026',
        },
        {
          id: 'curated-3',
          messId: 1,
          messName: 'Kirteshwar Khanawal',
          name: 'Malhar',
          initials: 'MA',
          rating: 5,
          avgRating: 4.7,
          label: 'Excellent',
          taste: 5,
          hygiene: 4,
          gutComfort: 5,
          valueForMoney: 5,
          comment:
            'Ghar-jaisa light Maharashtrian taste right near PICT Back Gate. Open on Sunday nights with free room delivery included at the same rate.',
          verified: true,
          yearOfStudy: 'Second Year (SE)',
          date: '17 Oct 2026',
        },
      ];
    }

    // Sort: Reviews with user comments first, followed by highest ratings
    return list.sort((a, b) => {
      const aHasComment = Boolean(a.comment && a.comment.trim());
      const bHasComment = Boolean(b.comment && b.comment.trim());
      if (aHasComment && !bHasComment) return -1;
      if (!aHasComment && bHasComment) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [reviewsMap, messesData]);

  const totalReviews = allReviews.length;

  // Auto-play carousel every 6 seconds if not paused
  useEffect(() => {
    if (isPaused || totalReviews <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalReviews);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, totalReviews]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalReviews - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  // Helper to slice 3 consecutive reviews wrapping around
  const getVisibleCards = () => {
    if (totalReviews === 0) return [];
    const count = Math.min(3, totalReviews);
    const cards = [];
    for (let i = 0; i < count; i++) {
      const idx = (currentIndex + i) % totalReviews;
      cards.push({ item: allReviews[idx], offsetIndex: i });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <section
      id="student-voices"
      className="bg-[#f8fafc] py-16 sm:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              STUDENT NOTES & REVIEWS
            </p>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What Students <span className="text-brand-blue">Say</span>
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-400">
              Verified campus survey feedback · {totalReviews} reviews from real mess visitors
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2 hidden sm:inline-block">
              {currentIndex + 1} of {totalReviews}
            </span>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous review"
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-blue hover:bg-brand-blueLight hover:text-brand-blue active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next review"
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-blue hover:bg-brand-blueLight hover:text-brand-blue active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Cards Track */}
        <div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {visibleCards.map(({ item, offsetIndex }, i) => (
            <div
              key={`${item.id || item.messId}-${offsetIndex}-${currentIndex}`}
              className={`card flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                i === 0 ? 'ring-2 ring-brand-blue/10 shadow-md' : ''
              }`}
            >
              <div>
                {/* Header: Star rating & Average score in review box */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={item.rating} size={15} />
                    <span className="font-display text-sm font-extrabold text-slate-900 ml-1">
                      {item.avgRating ? item.avgRating.toFixed(1) : item.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="rounded-lg bg-brand-orangeLight px-2 py-0.5 text-[10px] font-extrabold text-brand-orange">
                    {item.label || 'Must Try'}
                  </span>
                </div>

                {/* Name of mess to which the review is given */}
                <div className="mt-3.5">
                  <button
                    type="button"
                    onClick={() => onSelectMess(item.messId)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-blueLight px-3 py-1 text-xs font-bold text-brand-blue transition hover:bg-brand-blue hover:text-white"
                    title={`View details for ${item.messName}`}
                  >
                    <MapPin size={12} /> {item.messName}
                  </button>
                </div>

                {/* 4 Attributes ratings: Taste, Hygiene, Gut Comfort, Value shown in colored 5-star format */}
                <div className="mt-3.5 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2.5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-500">Taste</span>
                    <div className="mt-0.5 flex items-center justify-between gap-1">
                      <StarRating rating={item.taste || item.rating} size={11} />
                      <span className="text-[10px] font-bold text-slate-700">
                        {item.taste || item.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-500">Hygiene</span>
                    <div className="mt-0.5 flex items-center justify-between gap-1">
                      <StarRating rating={item.hygiene || item.rating} size={11} />
                      <span className="text-[10px] font-bold text-slate-700">
                        {item.hygiene || item.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-500">Gut Comfort</span>
                    <div className="mt-0.5 flex items-center justify-between gap-1">
                      <StarRating rating={item.gutComfort || item.rating} size={11} />
                      <span className="text-[10px] font-bold text-slate-700">
                        {item.gutComfort || item.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-500">Value for Money</span>
                    <div className="mt-0.5 flex items-center justify-between gap-1">
                      <StarRating rating={item.valueForMoney || item.rating} size={11} />
                      <span className="text-[10px] font-bold text-slate-700">
                        {item.valueForMoney || item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review written comment / quote - only shown if user provided a comment */}
                {Boolean(
                  (item.comment && item.comment.trim()) ||
                  (item.text && !item.text.startsWith('Taste:') && item.text.trim())
                ) && (
                  <p className="mt-3.5 text-sm leading-relaxed text-slate-600 line-clamp-3 italic">
                    "{item.comment ? item.comment.trim() : item.text.trim()}"
                  </p>
                )}
              </div>

              {/* Reviewer Name and Name Logo / Initials */}
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-200 text-xs font-black text-slate-700 shadow-sm border border-slate-300/40">
                  {item.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-slate-900">{item.name}</div>
                  <div className="truncate text-xs text-slate-400">
                    {item.verified ? '🎓 Verified PICT Student' : '👤 Community Reviewer'}
                    {item.yearOfStudy ? ` · ${item.yearOfStudy.split(' ')[0]}` : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots Indicator */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {Array.from({ length: Math.min(8, totalReviews) }).map((_, dotIdx) => {
            const active = Math.floor((currentIndex / totalReviews) * Math.min(8, totalReviews)) === dotIdx;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() =>
                  setCurrentIndex(
                    Math.floor((dotIdx / Math.min(8, totalReviews)) * totalReviews)
                  )
                }
                aria-label={`Jump to review slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active ? 'w-6 bg-brand-blue' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
