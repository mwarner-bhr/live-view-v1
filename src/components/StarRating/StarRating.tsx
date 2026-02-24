import { Icon } from '../Icon';

interface StarRatingProps {
  rating: number; // 1-5
  className?: string;
}

export function StarRating({ rating, className = '' }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars.map((star) => {
        const isFilled = star <= rating;
        return (
          <Icon
            key={star}
            name="star"
            size={16}
            className={isFilled ? 'text-[#fcc400]' : 'text-[var(--border-neutral-x-weak)]'}
            variant="solid"
          />
        );
      })}
    </div>
  );
}

export default StarRating;
