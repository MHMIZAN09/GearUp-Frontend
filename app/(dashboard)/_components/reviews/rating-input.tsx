'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

type Props = {
  value?: number;
  onChange: (rating: number) => void;
};

export default function RatingInput({ value = 0, onChange }: Props) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            className={`h-7 w-7 transition ${
              star <= (hover || value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
