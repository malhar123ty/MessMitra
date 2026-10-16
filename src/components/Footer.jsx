import React from 'react';

export default function Footer({ onSelectCuisine, onSelectFood, onSelectSort }) {
  return (
    <footer className="bg-brand-navy text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <img
                src="/logo-symbol.png"
                alt="MessMitra Logo"
                className="h-8 w-auto object-contain brightness-110"
              />
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                MessMitra
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Student-built directory of daily messes, tiffin services, and canteens around PICT Dhankawadi, Pune.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Cuisines</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCuisine('Maharashtrian')}
                  className="hover:text-white"
                >
                  Maharashtrian Messes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCuisine('North Indian')}
                  className="hover:text-white"
                >
                  North Indian Phulka
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCuisine('Multi-Cuisine')}
                  className="hover:text-white"
                >
                  Multi-Cuisine Thalis
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCuisine('Kokani Coastal')}
                  className="hover:text-white"
                >
                  Kokani Coastal
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Student Filters</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectFood('Pure Veg')}
                  className="hover:text-white"
                >
                  100% Pure Veg
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectFood('Veg & Non-Veg')}
                  className="hover:text-white"
                >
                  Veg & Non-Veg Schedule
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectSort('Closest first')}
                  className="hover:text-white"
                >
                  Closest to PICT Gate
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectSort('Lowest plate')}
                  className="hover:text-white"
                >
                  Budget Friendly (₹80)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">CEP Survey Info</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>Audited in August 2026</li>
              <li>PICT Dhankawadi, Pune</li>
              <li>15 Verified Local Messes</li>
              <li>Google Maps Walking Links</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 MessMitra CEP Project · Built for PICT Students</p>
        </div>
      </div>
    </footer>
  );
}
