import React, { useState, useEffect, useMemo } from 'react';
import messesData from './data/messesData.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MessCard from './components/MessCard';
import DetailView from './components/DetailView';
import CompareTray from './components/CompareTray';
import CompareModal from './components/CompareModal';
import ReviewModal from './components/ReviewModal';
import WhyChooseUs from './components/WhyChooseUs';
import StudentVoices from './components/StudentVoices';
import BottomCta from './components/BottomCta';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { SearchX } from 'lucide-react';
import {
  getStoredReviews,
  saveStoredReviews,
  getAverageRating,
} from './utils/helpers';
import initialReviewsData from './data/initialReviews.json';
import { fetchSheetReviews, mergeReviews } from './services/reviewsService';

export default function App() {
  const [query, setQuery] = useState('');
  const [food, setFood] = useState('All food');
  const [cuisine, setCuisine] = useState('All cuisines');
  const [sort, setSort] = useState('Recommended');
  const [selectedMessId, setSelectedMessId] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [reviewModalMess, setReviewModalMess] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Store reviews in local component state synced with Google Sheets & localStorage
  const [reviewsMap, setReviewsMap] = useState(() => {
    const map = {};
    messesData.forEach((m) => {
      const initialSheet = initialReviewsData[m.id] || [];
      const local = getStoredReviews(m.id);
      map[m.id] = mergeReviews(initialSheet, local);
    });
    return map;
  });

  // Fetch live reviews from deployed Google Apps Script on mount
  useEffect(() => {
    let isMounted = true;
    fetchSheetReviews(messesData)
      .then((liveMap) => {
        if (!isMounted || !liveMap) return;
        setReviewsMap((prev) => {
          const next = { ...prev };
          messesData.forEach((m) => {
            const sheetList = liveMap[m.id] || [];
            const localList = getStoredReviews(m.id);
            next[m.id] = mergeReviews(sheetList, localList);
          });
          return next;
        });
      })
      .catch((err) => {
        console.warn('Could not fetch live reviews from Google Apps Script:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (message, tone = 'dark') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  };

  // Synchronize hash routing with selectedMessId (#mess-X)
  useEffect(() => {
    const handleHashChange = () => {
      const match = window.location.hash.match(/^#mess-(\d+)$/);
      if (match) {
        setSelectedMessId(Number(match[1]));
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setSelectedMessId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectMess = (id) => {
    window.location.hash = `mess-${id}`;
  };

  const handleGoHome = () => {
    window.location.hash = '';
    setSelectedMessId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cuisinesList = useMemo(() => {
    return ['All cuisines', ...new Set(messesData.map((m) => m.cuisineCategory))];
  }, []);

  const filteredMesses = useMemo(() => {
    const q = query.toLowerCase().trim();
    let result = messesData.filter((m) => {
      const haystack = [
        m.name,
        m.owner,
        m.foodType,
        m.cuisineCategory,
        m.category,
        ...m.specialtyTags,
        ...m.studentHighlights,
      ]
        .join(' ')
        .toLowerCase();
      const matchQuery = !q || haystack.includes(q);
      const matchFood = food === 'All food' || m.foodType === food;
      const matchCuisine = cuisine === 'All cuisines' || m.cuisineCategory === cuisine;
      return matchQuery && matchFood && matchCuisine;
    });

    if (sort === 'Closest first') {
      result.sort((a, b) => a.distanceMeters - b.distanceMeters);
    } else if (sort === 'Lowest plate') {
      result.sort((a, b) => a.pricing.dailyPlate - b.pricing.dailyPlate);
    } else if (sort === 'Highest rated') {
      result.sort((a, b) => {
        const aReviews = reviewsMap[a.id] || [];
        const bReviews = reviewsMap[b.id] || [];
        const aRating = aReviews.length
          ? aReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / aReviews.length
          : 0;
        const bRating = bReviews.length
          ? bReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / bReviews.length
          : 0;
        return bRating - aRating;
      });
    }
    return result;
  }, [query, food, cuisine, sort, reviewsMap]);

  const toggleCompare = (id) => {
    if (compareIds.includes(id)) {
      setCompareIds((prev) => prev.filter((cId) => cId !== id));
    } else if (compareIds.length >= 3) {
      showToast('Compare up to three messes at a time.', 'dark');
    } else {
      setCompareIds((prev) => [...prev, id]);
      showToast('Added to comparison.', 'green');
    }
  };

  const removeCompare = (id) => {
    setCompareIds((prev) => prev.filter((cId) => cId !== id));
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  const scrollToResults = () => {
    const el = document.querySelector('#explore-messes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetFilters = () => {
    setQuery('');
    setFood('All food');
    setCuisine('All cuisines');
    setSort('Recommended');
  };

  const handleReviewSubmit = (messId, review) => {
    const currentLocal = getStoredReviews(messId);
    const updatedLocal = [...currentLocal, review];
    saveStoredReviews(messId, updatedLocal);

    setReviewsMap((prev) => {
      const currentMessReviews = prev[messId] || [];
      return {
        ...prev,
        [messId]: mergeReviews(currentMessReviews, [review]),
      };
    });
  };

  const compareMesses = useMemo(() => {
    return compareIds
      .map((id) => messesData.find((m) => m.id === id))
      .filter(Boolean);
  }, [compareIds]);

  const selectedMess = useMemo(() => {
    if (!selectedMessId) return null;
    return messesData.find((m) => m.id === selectedMessId) || null;
  }, [selectedMessId]);

  const hasActiveFilters =
    query || food !== 'All food' || cuisine !== 'All cuisines' || sort !== 'Recommended';

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isDetailView={Boolean(selectedMess)}
        onGoHome={handleGoHome}
        compareCount={compareIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onShowAbout={() =>
          showToast(
            'Every listing is based on an in-person PICT student survey — compare prices, hygiene, and timings easily.',
            'green'
          )
        }
      />

      {selectedMess ? (
        <DetailView
          mess={selectedMess}
          inCompare={compareIds.includes(selectedMess.id)}
          onToggleCompare={toggleCompare}
          onOpenReviewModal={() => setReviewModalMess(selectedMess)}
          reviews={reviewsMap[selectedMess.id] || []}
        />
      ) : (
        <>
          <Hero
            query={query}
            setQuery={setQuery}
            food={food}
            setFood={setFood}
            cuisine={cuisine}
            setCuisine={setCuisine}
            cuisinesList={cuisinesList}
            onSelectMess={handleSelectMess}
            onScrollToResults={scrollToResults}
          />

          <main
            id="explore-messes"
            className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16"
          >
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                  EXPLORE
                </p>
                <h2 className="font-display mt-1.5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Popular <span className="text-brand-blue">Messes</span>
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  Showing {filteredMesses.length} of {messesData.length} verified places near PICT
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm">
                  <span className="text-slate-400">Sort:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-transparent font-bold text-slate-800 outline-none"
                  >
                    {['Recommended', 'Closest first', 'Lowest plate', 'Highest rated'].map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      )
                    )}
                  </select>
                </label>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-brand-blue hover:text-brand-blue"
                  >
                    View All Messes
                  </button>
                )}
              </div>
            </div>

            {filteredMesses.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMesses.map((mess) => (
                  <MessCard
                    key={mess.id}
                    mess={mess}
                    inCompare={compareIds.includes(mess.id)}
                    onToggleCompare={toggleCompare}
                    onSelectMess={handleSelectMess}
                    reviews={reviewsMap[mess.id] || []}
                  />
                ))}
              </div>
            ) : (
              <div className="card rounded-2xl px-6 py-16 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-blueLight text-brand-blue">
                  <SearchX size={26} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-slate-900">
                  No messes match that search
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try searching a mess name, “North Indian”, “RO”, or reset your filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-orangeHover"
                >
                  Reset filters
                </button>
              </div>
            )}
          </main>

          <WhyChooseUs />
          <StudentVoices
            onSelectMess={handleSelectMess}
            reviewsMap={reviewsMap}
            messesData={messesData}
          />
          <BottomCta
            onOpenCompareModal={() => setIsCompareOpen(true)}
            onScrollToResults={scrollToResults}
          />
        </>
      )}

      <Footer
        onSelectCuisine={(c) => {
          setCuisine(c);
          handleGoHome();
          setTimeout(scrollToResults, 100);
        }}
        onSelectFood={(f) => {
          setFood(f);
          handleGoHome();
          setTimeout(scrollToResults, 100);
        }}
        onSelectSort={(s) => {
          setSort(s);
          handleGoHome();
          setTimeout(scrollToResults, 100);
        }}
      />

      <CompareTray
        compareMesses={compareMesses}
        onClearCompare={clearCompare}
        onOpenCompareModal={() => setIsCompareOpen(true)}
      />

      {isCompareOpen && (
        <CompareModal
          compareMesses={compareMesses}
          onClose={() => setIsCompareOpen(false)}
          onRemoveFromCompare={removeCompare}
          reviewsMap={reviewsMap}
        />
      )}

      {reviewModalMess && (
        <ReviewModal
          mess={reviewModalMess}
          onClose={() => setReviewModalMess(null)}
          onSubmitReview={handleReviewSubmit}
          showToast={showToast}
        />
      )}

      <Toast toasts={toasts} />
    </div>
  );
}
