import { Avatar, Button } from '../../../components';
import type { WorkforceException } from '../types';

interface ExceptionCardProps {
  exception: WorkforceException;
  compact?: boolean;
  onPrimaryAction: (exception: WorkforceException) => void;
  onSecondaryAction?: (exception: WorkforceException) => void;
  onSnooze: (exception: WorkforceException, duration: '30m' | '2h' | 'today') => void;
  onDismiss: (exception: WorkforceException) => void;
  onViewDetails: (exception: WorkforceException) => void;
}

function severityStyles(severity: WorkforceException['severity']) {
  if (severity === 'HIGH') return 'bg-[#fee2e2] text-[#991b1b]';
  if (severity === 'MED') return 'bg-[#fef3c7] text-[#92400e]';
  return 'bg-[#dcfce7] text-[#166534]';
}

function confidenceStyles(confidence: WorkforceException['confidence']) {
  if (confidence === 'HIGH') return 'bg-[#dcfce7] text-[#166534]';
  if (confidence === 'MED') return 'bg-[#fef3c7] text-[#92400e]';
  return 'bg-[#e5e7eb] text-[#374151]';
}

export function ExceptionCard({
  exception,
  compact = false,
  onPrimaryAction,
  onSecondaryAction,
  onSnooze,
  onDismiss,
  onViewDetails,
}: ExceptionCardProps) {
  const [primary, secondary] = exception.actions;

  return (
    <article
      className={`rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] ${compact ? 'p-3' : 'p-4'}`}
      style={{ boxShadow: 'var(--shadow-100)' }}
      aria-label={`${exception.severity} exception for ${exception.employee.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar src={exception.employee.avatarUrl} alt={exception.employee.name} size="small" />
          <div className="min-w-0">
            <p className={`${compact ? 'text-[14px]' : 'text-[15px]'} font-semibold text-[var(--text-neutral-xx-strong)] truncate`}>{exception.title}</p>
            <p className="text-[13px] text-[var(--text-neutral-medium)]">{exception.employee.name} · {exception.employee.role}</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <span className={`rounded-[1000px] px-2 py-1 text-[11px] font-semibold ${severityStyles(exception.severity)}`}>{exception.severity}</span>
          <span className={`rounded-[1000px] px-2 py-1 text-[11px] font-semibold ${confidenceStyles(exception.confidence)}`}>Conf: {exception.confidence}</span>
        </div>
      </div>

      <p className={`text-[var(--text-neutral-strong)] ${compact ? 'mt-2 text-[13px] leading-[18px]' : 'mt-3 text-[14px] leading-[20px]'}`}>{exception.summary}</p>

      <div className={`${compact ? 'mt-2' : 'mt-3'} flex flex-wrap gap-2`}>
        {exception.impactTags.map((tag) => (
          <span key={tag} className="rounded-[1000px] border border-[var(--border-neutral-medium)] px-2 py-0.5 text-[11px] text-[var(--text-neutral-medium)]">
            {tag}
          </span>
        ))}
      </div>

      <div className={`${compact ? 'mt-3' : 'mt-4'} flex flex-wrap items-center gap-2`}>
        {primary && (
          <Button size="small" variant="primary" onClick={() => onPrimaryAction(exception)}>
            {primary.label}
          </Button>
        )}
        {secondary && (
          <Button size="small" variant="standard" onClick={() => (onSecondaryAction ? onSecondaryAction(exception) : undefined)}>
            {secondary.label}
          </Button>
        )}

        <label className="inline-flex items-center gap-2 text-[13px] text-[var(--text-neutral-medium)]">
          Snooze
          <select
            className="h-8 rounded-[1000px] border border-[var(--border-neutral-medium)] bg-white px-2 text-[12px]"
            defaultValue=""
            aria-label="Snooze exception"
            onChange={(e) => {
              const value = e.target.value as '' | '30m' | '2h' | 'today';
              if (value) onSnooze(exception, value);
              e.currentTarget.value = '';
            }}
          >
            <option value="" disabled>Choose</option>
            <option value="30m">30m</option>
            <option value="2h">2h</option>
            <option value="today">Today</option>
          </select>
        </label>

        <button
          className="h-8 rounded-[1000px] border border-[var(--border-neutral-medium)] px-3 text-[12px] text-[var(--text-neutral-medium)] hover:bg-[var(--surface-neutral-xx-weak)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary-medium)]"
          onClick={() => onDismiss(exception)}
        >
          Dismiss
        </button>

        <button
          className="ml-auto h-8 rounded-[1000px] px-3 text-[12px] font-medium text-[#0b4fd1] hover:bg-[var(--surface-neutral-xx-weak)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary-medium)]"
          onClick={() => onViewDetails(exception)}
        >
          View details
        </button>
      </div>
    </article>
  );
}

export default ExceptionCard;
