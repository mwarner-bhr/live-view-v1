import type { Alert, Employee } from '../../types/managerLiveView';
import { AlertTile } from './AlertTile';

interface AlertsLaneProps {
  alerts: Alert[];
  employeesById: Record<string, Employee>;
  onAlertCta: (alert: Alert) => void;
  onIgnoreAll: () => void;
}

const severityOrder: Record<Alert['severity'], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function AlertsLane({ alerts, employeesById, onAlertCta, onIgnoreAll }: AlertsLaneProps) {
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severitySort = severityOrder[a.severity] - severityOrder[b.severity];
    if (severitySort !== 0) return severitySort;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <section className="rounded-2xl border border-[var(--border-neutral-x-weak)] bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Alerts (Needs attention now)</h2>
        {sortedAlerts.length > 0 && (
          <button
            onClick={onIgnoreAll}
            className="text-xs font-semibold text-[var(--color-primary-medium)] hover:underline"
          >
            Ignore All
          </button>
        )}
      </div>
      <div className="mt-3 space-y-2">
        {sortedAlerts.length === 0 && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm font-semibold text-emerald-900">All systems good</p>
            <p className="mt-1 text-xs text-emerald-800">No active issues right now.</p>
          </div>
        )}
        {sortedAlerts.map((alert) => (
          <AlertTile
            key={alert.id}
            alert={alert}
            employee={employeesById[alert.employeeId]}
            onCta={onAlertCta}
          />
        ))}
      </div>
    </section>
  );
}
