import initialReviewsData from '../data/initialReviews.json';

// Helper utilities for MessMitra

export const formatMoney = (value) => {
  if (value == null) return "—";
  return `₹${Number(value).toLocaleString("en-IN")}`;
};

export const formatDistance = (meters) => {
  if (meters === 0) return "On campus";
  return `${meters}m away`;
};

export const mapsSearch = (mess) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${mess.name}, ${mess.address}`)}`;

export const mapsDirections = (mess) =>
  `https://www.google.com/maps/dir/?api=1&destination=${mess.lat},${mess.lng}&travelmode=walking`;

export const getReviewsStorageKey = (id) => `messmitra-reviews-${id}`;

export const getStoredReviews = (id) => {
  try {
    return JSON.parse(localStorage.getItem(getReviewsStorageKey(id)) || "[]");
  } catch {
    return [];
  }
};

export const saveStoredReviews = (id, reviews) => {
  try {
    localStorage.setItem(getReviewsStorageKey(id), JSON.stringify(reviews));
  } catch (e) {
    console.error("Failed to save reviews", e);
  }
};

export const getAverageRating = (mess, customReviews = []) => {
  let reviews = customReviews;
  if (!reviews || !reviews.length) {
    const stored = getStoredReviews(mess.id);
    const initial = initialReviewsData?.[mess.id] || [];
    reviews = stored.length ? stored : initial;
  }
  if (!reviews.length) return mess.hygieneRating;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
};
