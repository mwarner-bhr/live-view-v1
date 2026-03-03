import type { Alert, Employee } from '../../types/managerLiveView';
import { AlertTile } from './AlertTile';

interface AlertsLaneProps {
  alerts: Alert[];
  employeesById: Record<string, Employee>;
  onAlertCta: (alert: Alert) => void;
}

const severityOrder: Record<Alert['severity'], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function AlertsLane({ alerts, employeesById, onAlertCta }: AlertsLaneProps) {
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severitySort = severityOrder[a.severity] - severityOrder[b.severity];
    if (severitySort !== 0) return severitySort;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <section className="rounded-2xl border border-[var(--border-neutral-x-weak)] bg-white p-4">
      <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Alerts (Needs attention now)</h2>
      <div className="mt-3 space-y-2">
        {sortedAlerts.length === 0 && <p className="text-xs text-[var(--text-neutral-medium)]">No active alerts.</p>}
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
