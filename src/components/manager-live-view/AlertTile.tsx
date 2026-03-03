import type { Alert, Employee } from '../../types/managerLiveView';
import { formatAlertTimestamp } from '../../utils/timeFormat';
import { SeverityBadge } from './SeverityBadge';

interface AlertTileProps {
  alert: Alert;
  employee?: Employee;
  onCta: (alert: Alert) => void;
}

function ctaLabel(cta: Alert['cta']): string {
  if (cta === 'message') return 'Message';
  if (cta === 'fix_punch') return 'Fix punch';
  return 'Acknowledge';
}

export function AlertTile({ alert, employee, onCta }: AlertTileProps) {
  return (
    <article className="rounded-2xl border border-rose-200 bg-rose-50/60 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{alert.message}</p>
        <SeverityBadge severity={alert.severity} />
      </div>
      <p className="mt-1 text-xs text-[var(--text-neutral-medium)]">
        {employee?.name ?? 'Unknown'} · {formatAlertTimestamp(alert.timestamp)}
      </p>
      <button
        onClick={() => onCta(alert)}
        className="mt-3 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-[var(--text-neutral-x-strong)]"
      >
        {ctaLabel(alert.cta)}
      </button>
    </article>
  );
}
