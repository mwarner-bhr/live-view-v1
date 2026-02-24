interface RatingCirclesProps {
  selectedRating: number; // 1-5
  className?: string;
}

export function RatingCircles({ selectedRating, className = '' }: RatingCirclesProps) {
  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-[9px] ${className}`}>
      {ratings.map((rating) => {
        const isSelected = rating === selectedRating;
        return (
          <div
            key={rating}
            className={`
              w-7 h-7 rounded-full flex items-center justify-center text-[14px] leading-[20px]
              ${
                isSelected
                  ? 'bg-[var(--color-primary-strong)] text-white'
                  : 'bg-white border border-[var(--border-neutral-medium)] text-[var(--text-neutral-medium)]'
              }
            `}
          >
            {rating}
          </div>
        );
      })}
    </div>
  );
}

export default RatingCircles;
