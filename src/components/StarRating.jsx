import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({
  rating = 0,
  max = 5,
  size = 14,
  className = '',
  showNumber = false,
}) {
  const numericScore = Number(rating) || 0;
  const rounded = Math.max(0, Math.min(max, Math.round(numericScore)));

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5" aria-label={`${rounded} out of ${max} stars`}>
        {Array.from({ length: max }).map((_, i) => {
          const isFilled = i < rounded;
          return (
            <Star
              key={i}
              size={size}
              className={`${
                isFilled
                  ? 'fill-brand-orange text-brand-orange'
                  : 'fill-slate-100 text-slate-200'
              } shrink-0 transition-colors`}
            />
          );
        })}
      </div>
      {showNumber && numericScore > 0 && (
        <span className="text-xs font-bold text-slate-700 ml-1">
          {numericScore.toFixed(1)}
        </span>
      )}
    </div>
  );
}
