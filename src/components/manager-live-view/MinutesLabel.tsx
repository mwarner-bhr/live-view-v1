import { formatMinutes } from '../../utils/timeFormat';

interface MinutesLabelProps {
  label: 'Today' | 'Week';
  minutes: number;
}

export function MinutesLabel({ label, minutes }: MinutesLabelProps) {
  return (
    <span className="text-xs text-[var(--text-neutral-medium)]">
      {label}: <strong className="text-[var(--text-neutral-strong)]">{formatMinutes(minutes)}</strong>
    </span>
  );
}
