import React, { useState } from 'react';
import { X, Send, BadgeCheck, MailCheck } from 'lucide-react';

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
  const [otpStep, setOtpStep] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');

  const normalizeEmail = (str) => String(str || '').trim().toLowerCase();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast('Please fill in your name and email address.', 'dark');
      return;
    }
    const cleanEmail = normalizeEmail(email);
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtpStep(true);
    showToast(`Browser preview OTP generated: ${code}`, 'green');
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!enteredOtp.trim()) {
      showToast('Please enter the 6-digit OTP.', 'dark');
      return;
    }
    if (enteredOtp.trim() !== generatedOtp) {
      showToast('That OTP is incorrect. Check the code and try again.', 'dark');
      return;
    }

    const cleanEmail = normalizeEmail(email);
    const verified = /@pict\.edu$/i.test(cleanEmail) || cleanEmail.includes('pict');

    const newReview = {
      name: name.trim(),
      email: cleanEmail,
      emailKey: cleanEmail,
      emailVerified: true,
      rating: Number(rating),
      label: ['', 'Not Recommended', 'Needs Improvement', 'Average', 'Must Try', 'Excellent'][rating],
      text: text.trim(),
      verified,
      date: new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date()),
    };

    onSubmitReview(mess.id, newReview);
    showToast(
      verified
        ? 'Email verified. Review published with PICT badge.'
        : 'Email verified. Review published as a community reviewer.',
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
              VERIFIED LOCAL REVIEW
            </p>
            <h2 className="font-display mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              How was <span className="text-brand-blue">{mess.name}</span>?
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Verify your email first. Each email can rate this mess only once.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={otpStep ? handlePublish : handleSendOtp} className="mt-6 space-y-4">
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
              disabled={otpStep}
              required
              maxLength={120}
              placeholder="you@pict.edu or personal email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 disabled:bg-slate-50"
            />
          </label>

          {otpStep && (
            <div className="rounded-2xl border border-orange-200 bg-brand-orangeLight p-4">
              <div className="flex items-start gap-3">
                <div className="text-brand-orange">
                  <MailCheck size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-slate-900">
                    Enter your one-time password
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-700">
                    Browser preview OTP:{' '}
                    <strong className="tracking-[.2em] text-brand-orange">{generatedOtp}</strong>
                  </p>
                  <input
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="6-digit OTP"
                    className="mt-3 w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm font-bold tracking-[.35em] outline-none focus:border-brand-orange"
                  />
                </div>
              </div>
            </div>
          )}

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

          {!otpStep ? (
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-blueHover"
            >
              <Send size={16} /> Send OTP to verify email
            </button>
          ) : (
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-orangeHover"
            >
              <BadgeCheck size={16} /> Verify OTP & publish review
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
