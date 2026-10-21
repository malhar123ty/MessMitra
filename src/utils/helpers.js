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

/**
 * Safely extracts and validates numeric geographic coordinates from a mess object.
 * Returns { lat, lng } if both coordinates are valid finite numbers within geographical bounds, or null.
 */
export const getMessCoordinates = (mess) => {
  if (!mess || typeof mess !== 'object') return null;

  const rawLat = mess.lat ?? mess.latitude ?? mess.location?.latitude;
  const rawLng = mess.lng ?? mess.longitude ?? mess.location?.longitude;

  if (rawLat == null || rawLng == null || rawLat === '' || rawLng === '') {
    return null;
  }

  const lat = Number(rawLat);
  const lng = Number(rawLng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  // Latitude must be between -90 and 90 degrees
  if (lat < -90 || lat > 90) {
    return null;
  }

  // Longitude must be between -180 and 180 degrees
  if (lng < -180 || lng > 180) {
    return null;
  }

  return { lat, lng };
};

export const mapsDirections = (mess) => {
  const coords = getMessCoordinates(mess);
  if (!coords) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}&travelmode=walking`;
};

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
