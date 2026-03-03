import type { AlertSeverity } from '../../types/managerLiveView';

interface SeverityBadgeProps {
  severity: AlertSeverity;
}

const classMap: Record<AlertSeverity, string> = {
  high: 'bg-rose-600 text-white',
  medium: 'bg-amber-500 text-white',
  low: 'bg-slate-200 text-slate-700',
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const label = severity === 'high' ? 'High' : severity === 'medium' ? 'Med' : 'Low';
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${classMap[severity]}`}>{label}</span>;
}
