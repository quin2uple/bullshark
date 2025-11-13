type RatingProps = {
  rating: number;
  showNumeric?: boolean;
  size?: "sm" | "md" | "lg";
};

type StarProps = {
  type: "full" | "half" | "empty";
  size: number;
};

function Star({ type, size }: StarProps) {
  if (type === "full") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-amber-400"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  if (type === "half") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="text-amber-400"
      >
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#half-fill)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-amber-400"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function Rating({
  rating,
  showNumeric = true,
  size = "md",
}: RatingProps) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  const starSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const numericSizeClasses = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-lg",
  };

  const starSize = starSizes[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} type="full" size={starSize} />
        ))}
        {hasHalfStar && <Star key="half" type="half" size={starSize} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} type="empty" size={starSize} />
        ))}
      </div>
      {showNumeric && (
        <span
          className={`font-bold text-slate-700 ${numericSizeClasses[size]}`}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
