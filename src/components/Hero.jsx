import React, { useRef, useEffect } from 'react';
import { Navigation } from 'lucide-react';

export default function Hero({
  query,
  setQuery,
  food,
  setFood,
  cuisine,
  setCuisine,
  cuisinesList,
  onSelectMess,
  onScrollToResults,
}) {
  const debounceRef = useRef(null);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    clearTimeout(debounceRef.current);
    if (val.trim().length > 0) {
      debounceRef.current = setTimeout(() => {
        onScrollToResults();
      }, 450);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(debounceRef.current);
      onScrollToResults();
    }
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  return (
    <header className="hero-pastel relative pb-16 pt-4 sm:pb-24 sm:pt-6">
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:mt-14 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Left column */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#dbeafe] px-4 py-1.5 text-xs font-semibold text-brand-blue">
              <span className="text-brand-orange">★</span> Audited by PICT Students · 2026–27
            </div>

            <h1 className="font-display mt-6 text-5xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl">
              Discover Your<br />
              <span className="text-brand-blue">Everyday Mess</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-500 sm:text-[17px]">
              Explore 15 student-surveyed messes around PICT Dhankawadi. Check real plate prices, monthly passes, Sunday night timings, and hygiene ratings before you join.
            </p>

            {/* White search & filter bar */}
            <div className="mt-8 rounded-2xl bg-white p-3.5 shadow-[0_12px_35px_rgba(15,23,42,0.07)] sm:p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_auto] lg:items-center">
                <label className="block border-b border-slate-100 pb-2.5 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-3">
                  <span className="block text-[11px] font-medium text-slate-400">Where or what?</span>
                  <input
                    id="search"
                    type="search"
                    value={query}
                    onChange={handleQueryChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search mess, RO, thali..."
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                  />
                </label>

                <label className="block border-b border-slate-100 pb-2.5 sm:border-b-0 lg:border-r lg:pb-0 lg:pr-3">
                  <span className="block text-[11px] font-medium text-slate-400">Food type</span>
                  <select
                    id="food-filter"
                    value={food}
                    onChange={(e) => {
                      setFood(e.target.value);
                      onScrollToResults();
                    }}
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                  >
                    {['All food', 'Pure Veg', 'Veg & Non-Veg'].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block pb-1 sm:pb-0 lg:pr-2">
                  <span className="block text-[11px] font-medium text-slate-400">Cuisine</span>
                  <select
                    id="cuisine-filter"
                    value={cuisine}
                    onChange={(e) => {
                      setCuisine(e.target.value);
                      onScrollToResults();
                    }}
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                  >
                    {cuisinesList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={onScrollToResults}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-orange px-6 text-sm font-bold text-white shadow-sm transition hover:bg-brand-orangeHover"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Bottom 3 stats */}
            <div className="mt-9 flex flex-wrap items-center gap-8 sm:gap-12">
              <div>
                <div className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">15</div>
                <div className="mt-0.5 text-xs font-medium text-slate-500">Verified Messes</div>
              </div>
              <div>
                <div className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">₹80</div>
                <div className="mt-0.5 text-xs font-medium text-slate-500">Starting Plate</div>
              </div>
              <div>
                <div className="font-display flex items-center gap-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  <span className="text-brand-orange">★</span> 4.5
                </div>
                <div className="mt-0.5 text-xs font-medium text-slate-500">Avg Hygiene</div>
              </div>
            </div>
          </div>

          {/* Right column: 2x2 staggered image grid + floating card */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-44 overflow-hidden rounded-2xl shadow-md sm:h-52">
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
                    alt="Homestyle Indian Thali"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="h-48 overflow-hidden rounded-2xl shadow-md sm:h-56">
                  <img
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"
                    alt="Warm Maharashtrian Meal"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-4 sm:mt-8">
                <div className="h-48 overflow-hidden rounded-2xl shadow-md sm:h-56">
                  <img
                    src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80"
                    alt="North Indian Phulka and Dal"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="h-44 overflow-hidden rounded-2xl shadow-md sm:h-52">
                  <img
                    src="https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?w=800&auto=format&fit=crop&q=80"
                    alt="Sunday Feast Special"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Floating bottom-left badge */}
            <button
              type="button"
              onClick={() => onSelectMess(14)}
              className="group -bottom-5 -left-3 sm:-left-6 absolute flex items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 text-left shadow-[0_15px_35px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-orangeLight text-brand-orange">
                <Navigation size={19} />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900 group-hover:text-brand-blue">Closest to Gate</div>
                <div className="text-xs font-medium text-slate-500">Madhura Mess · 170m</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
