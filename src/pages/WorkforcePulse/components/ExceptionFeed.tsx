import type { WorkforceException } from '../types';
import { ExceptionCard } from './ExceptionCard';

interface ExceptionFeedProps {
  exceptions: WorkforceException[];
  compact?: boolean;
  onPrimaryAction: (exception: WorkforceException) => void;
  onSecondaryAction: (exception: WorkforceException) => void;
  onSnooze: (exception: WorkforceException, duration: '30m' | '2h' | 'today') => void;
  onDismiss: (exception: WorkforceException) => void;
  onViewDetails: (exception: WorkforceException) => void;
}

export function ExceptionFeed({
  exceptions,
  compact = false,
  onPrimaryAction,
  onSecondaryAction,
  onSnooze,
  onDismiss,
  onViewDetails,
}: ExceptionFeedProps) {
  return (
    <section aria-label="Needs attention feed" className={compact ? '' : 'mt-5'}>
      <div className="flex items-center justify-between">
        <h2 className={`${compact ? 'text-[18px] leading-[24px]' : 'text-[22px] leading-[30px]'} font-semibold text-[var(--color-primary-strong)]`} style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
          Needs attention
        </h2>
        {!compact && <p className="text-[13px] text-[var(--text-neutral-medium)]">Ranked by severity, impact, repetition, and recency</p>}
      </div>

      <div className={`${compact ? 'mt-2 space-y-2' : 'mt-3 space-y-3'}`}>
        {exceptions.length === 0 && (
          <div className="rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6 text-[15px] text-[var(--text-neutral-medium)]">
            No active exceptions. Workforce is stable.
          </div>
        )}

        {exceptions.map((item) => (
          <ExceptionCard
            key={item.id}
            exception={item}
            compact={compact}
            onPrimaryAction={onPrimaryAction}
            onSecondaryAction={onSecondaryAction}
            onSnooze={onSnooze}
            onDismiss={onDismiss}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </section>
  );
}

export default ExceptionFeed;
