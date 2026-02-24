interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValues?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  showValues = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {(label || showValues) && (
        <div className="flex items-center justify-between text-[14px] leading-[20px]">
          {label && (
            <span className="text-[var(--text-neutral-strong)]">{label}</span>
          )}
          {showValues && (
            <span className="text-[var(--text-neutral-medium)] ml-auto">
              {value} of {max}
            </span>
          )}
        </div>
      )}
      <div className="h-2 bg-[var(--surface-neutral-xx-weak)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-primary-strong)] transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
