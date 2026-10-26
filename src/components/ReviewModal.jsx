import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const ratingLabels = [
  '',
  '★☆☆☆☆ (1 Star) - Not Recommended',
  '★★☆☆☆ (2 Stars) - Needs Improvement',
  '★★★☆☆ (3 Stars) - Average',
  '★★★★☆ (4 Stars) - Must Try',
  '★★★★★ (5 Stars) - Excellent',
];

export default function ReviewModal({ mess, onClose, onSubmitReview, showToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const normalizeEmail = (str) => String(str || '').trim().toLowerCase();

  const handlePublish = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast('Please fill in your name and email address.', 'dark');
      return;
    }
    if (!text.trim()) {
      showToast('Please write a brief review before publishing.', 'dark');
      return;
    }

    const cleanEmail = normalizeEmail(email);
    const verified = /@pict\.edu$/i.test(cleanEmail) || cleanEmail.includes('pict');

    const trimmedName = name.trim();
    const initials = (() => {
      const parts = trimmedName.split(/\s+/).filter(Boolean);
      if (parts.length === 0) return 'ST';
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    })();

    const numRating = Number(rating);
    const newReview = {
      id: `local-${Date.now()}`,
      messId: mess.id,
      messName: mess.name,
      name: trimmedName,
      initials,
      email: cleanEmail,
      emailKey: cleanEmail,
      emailVerified: true,
      rating: numRating,
      avgRating: numRating,
      taste: numRating,
      hygiene: numRating,
      gutComfort: numRating,
      valueForMoney: numRating,
      comment: text.trim(),
      label: ['', 'Not Recommended', 'Needs Improvement', 'Average', 'Must Try', 'Excellent'][numRating] || 'Must Try',
      text: text.trim(),
      verified,
      date: new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date()),
      source: 'local',
    };

    onSubmitReview(mess.id, newReview);
    showToast(
      verified
        ? 'Review published with PICT student badge!'
        : 'Review published successfully!',
      'green'
    );
    onClose();
  };

  return (
    <div
      id="review-modal"
      className="modal-backdrop fixed inset-0 z-50 grid items-end justify-center p-0 sm:items-center sm:p-5"
    >
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-[2rem] bg-white p-5 shadow-2xl sm:max-w-xl sm:rounded-[2rem] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              STUDENT REVIEW
            </p>
            <h2 className="font-display mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              How was <span className="text-brand-blue">{mess.name}</span>?
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Share your genuine dining experience to help fellow students.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handlePublish} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Full name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={80}
              placeholder="e.g. Aditi Sharma"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Student email ID
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={120}
              placeholder="you@pict.edu or personal email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10"
            />
          </label>

          <div>
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Your rating
            </span>
            <div className="grid grid-cols-5 gap-1 rounded-xl bg-slate-50 p-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className={`rating-star rounded-lg py-2 text-center text-xl ${
                    n <= rating ? 'active' : 'text-slate-300'
                  }`}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                >
                  {n <= rating ? '★' : '☆'}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs font-bold text-brand-orange">{ratingLabels[rating]}</p>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Written review
            </span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              minLength={10}
              maxLength={600}
              rows={4}
              placeholder="Tell the next student about taste, hygiene, acidity, chapati softness…"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10"
            />
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-orangeHover"
          >
            <Send size={16} /> Publish Review
          </button>
        </form>
      </div>
    </div>
  );
}
