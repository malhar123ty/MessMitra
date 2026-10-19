// Google Apps Script Endpoint for Student Reviews
export const GOOGLE_SCRIPT_REVIEWS_URL =
  'https://script.google.com/macros/s/AKfycbx4A60409-MZgqvbq0_CbwqEUiwdtjvDm2hiDoV5yOgN0VUL3lZmBAr3Pqcv7-tzaN3KQ/exec';

export const ratingLabels = [
  '',
  'Not Recommended',
  'Needs Improvement',
  'Average',
  'Must Try',
  'Excellent',
];

/**
 * Match a mess name from Google Form responses to the project's messesData.json
 */
export function findMessByName(name, messesList = []) {
  if (!name) return null;
  const clean = name.trim().toLowerCase();

  return (
    messesList.find((m) => {
      const mName = m.name.toLowerCase();
      if (mName === clean) return true;
      if (clean.includes('sk dining') && m.id === 7) return true;
      if (clean.includes('santosh') && m.id === 7) return true;
      if (clean.includes('pict') && clean.includes('canteen') && m.id === 15) return true;
      if (clean.includes('annapurna') && m.id === 13) return true;
      if (clean.includes('jay shankar') && m.id === 6) return true;
      if (clean.includes('shankar maharaj') && m.id === 12) return true;
      if (clean.includes('abhiruchi') && m.id === 5) return true;
      if (clean.includes('kashi') && m.id === 4) return true;
      if (clean.includes('kirteshwar') && m.id === 1) return true;
      if (clean.includes('deep') && m.id === 2) return true;
      if (clean.includes('aai') && m.id === 3) return true;
      if (clean.includes('sadguru') && m.id === 8) return true;
      if (clean.includes('sujata') && m.id === 9) return true;
      if (clean.includes('maitri') && m.id === 10) return true;
      if (clean.includes('kokan') && m.id === 11) return true;
      if (clean.includes('madhura') && m.id === 14) return true;
      return false;
    }) || null
  );
}

/**
 * Format timestamp to e.g. "18 Oct 2026"
 */
export function formatDate(isoStr) {
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) throw new Error();
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return 'Recent';
  }
}

/**
 * Transforms raw Google Sheet JSON rows into the standardized Review objects grouped by messId
 */
export function transformSheetData(rows = [], messesList = []) {
  const result = {};
  messesList.forEach((m) => {
    result[m.id] = [];
  });

  if (!Array.isArray(rows)) return result;

  rows.forEach((row, rowIndex) => {
    const name = (row['Enter Your Name'] || '').trim() || 'PICT Student';
    const email1 = (row['Enter Your Email - ID'] || '').trim().toLowerCase();
    const email2 = (row['Email address'] || '').trim().toLowerCase();
    const email = email1 || email2;
    const college = (row['College / Institute'] || '').toLowerCase();
    const isPict = college.includes('pict') || email1.includes('pict') || email2.includes('pict');
    const date = formatDate(row['Timestamp']);
    const year = (row['Current Year of Study'] || '').trim();

    const initials = (() => {
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return 'ST';
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    })();

    // Slot 1
    const m1 = findMessByName(row['Select Mess #1 to Review'], messesList);
    if (m1) {
      const taste = Number(row['Attribute Ratings   [Food Taste & Homeliness]']) || 0;
      const hygiene = Number(row['Attribute Ratings   [Hygiene & Cleanliness]']) || 0;
      const gut = Number(row['Attribute Ratings   [Gut Comfort & Digestion]']) || 0;
      const vfm = Number(row['Attribute Ratings   [Value for Money]']) || 0;
      const overall = Number(row['Overall Experience Rating']) || 0;
      const comment = (row['Quick Comment'] || '').trim();

      const attrs = [taste, hygiene, gut, vfm].filter((v) => v > 0);
      if (overall > 0 || attrs.length > 0 || comment) {
        let ratingNum = 0;
        let avgScore = 0;
        if (overall > 0) {
          avgScore = overall;
          ratingNum = Math.max(1, Math.min(5, Math.round(overall)));
        } else if (attrs.length > 0) {
          avgScore = attrs.reduce((a, b) => a + b, 0) / attrs.length;
          ratingNum = Math.max(1, Math.min(5, Math.round(avgScore)));
        } else {
          avgScore = 4;
          ratingNum = 4;
        }

        result[m1.id].push({
          id: `sheet-${rowIndex}-1`,
          messId: m1.id,
          messName: m1.name,
          name,
          initials,
          email,
          emailKey: email || `sheet-${rowIndex}-1`,
          emailVerified: true,
          rating: ratingNum,
          avgRating: Number(avgScore.toFixed(1)),
          label: ratingLabels[ratingNum] || 'Good',
          taste: taste || null,
          hygiene: hygiene || null,
          gutComfort: gut || null,
          valueForMoney: vfm || null,
          comment: comment || '',
          text: comment || '',
          verified: isPict,
          date,
          yearOfStudy: year,
          source: 'google-sheets',
        });
      }
    }

    // Slot 2
    const m2 = findMessByName(row['Select Mess #2 to Review'], messesList);
    if (m2) {
      const taste = Number(row['Attribute Ratings [Food Taste & Homeliness]']) || 0;
      const hygiene = Number(row['Attribute Ratings [Hygiene & Cleanliness]']) || 0;
      const gut = Number(row['Attribute Ratings [Gut Comfort & Digestion]']) || 0;
      const vfm = Number(row['Attribute Ratings [Value for Money]']) || 0;

      const attrs = [taste, hygiene, gut, vfm].filter((v) => v > 0);
      if (attrs.length > 0) {
        const avgScore = attrs.reduce((a, b) => a + b, 0) / attrs.length;
        const ratingNum = Math.max(1, Math.min(5, Math.round(avgScore)));

        result[m2.id].push({
          id: `sheet-${rowIndex}-2`,
          messId: m2.id,
          messName: m2.name,
          name,
          initials,
          email,
          emailKey: email || `sheet-${rowIndex}-2`,
          emailVerified: true,
          rating: ratingNum,
          avgRating: Number(avgScore.toFixed(1)),
          label: ratingLabels[ratingNum] || 'Good',
          taste: taste || null,
          hygiene: hygiene || null,
          gutComfort: gut || null,
          valueForMoney: vfm || null,
          comment: '',
          text: '',
          verified: isPict,
          date,
          yearOfStudy: year,
          source: 'google-sheets',
        });
      }
    }
  });

  return result;
}

/**
 * Fetch latest reviews live from deployed Google Apps Script
 */
export async function fetchSheetReviews(messesList = []) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(GOOGLE_SCRIPT_REVIEWS_URL, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Google Apps Script returned status ${res.status}`);
    }

    const data = await res.json();
    const transformed = transformSheetData(data, messesList);

    // Save to localStorage cache for offline resilience
    try {
      localStorage.setItem('messmitra-sheet-cache', JSON.stringify(transformed));
    } catch {
      // ignore storage quota issues
    }

    return transformed;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Could not fetch live reviews from Google Apps Script, checking cache:', err);

    try {
      const cached = localStorage.getItem('messmitra-sheet-cache');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // ignore
    }

    return null;
  }
}

/**
 * Merge two lists of reviews, deduplicating by emailKey or id
 */
export function mergeReviews(primary = [], secondary = []) {
  const seen = new Set();
  const combined = [];

  // Add primary reviews first
  (primary || []).forEach((r) => {
    const key = r.emailKey || r.id || `${r.name}-${r.date}`;
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(r);
    }
  });

  // Add secondary reviews (e.g. locally submitted reviews)
  (secondary || []).forEach((r) => {
    const key = r.emailKey || r.id || `${r.name}-${r.date}`;
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(r);
    }
  });

  return combined;
}
