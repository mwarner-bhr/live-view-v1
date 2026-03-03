import type { Alert, Employee, Insight } from '../../types/managerLiveView';
import { AlertsLane } from './AlertsLane';
import { RisksLane } from './RisksLane';

interface TeamHealthPanelProps {
  alerts: Alert[];
  insights: Insight[];
  employeesById: Record<string, Employee>;
  showRisks: boolean;
  onAlertCta: (alert: Alert) => void;
  onIgnoreAllAlerts: () => void;
}

export function TeamHealthPanel({
  alerts,
  insights,
  employeesById,
  showRisks,
  onAlertCta,
  onIgnoreAllAlerts,
}: TeamHealthPanelProps) {
  return (
    <aside className="space-y-3" aria-label="Team health panel">
      <AlertsLane alerts={alerts} employeesById={employeesById} onAlertCta={onAlertCta} onIgnoreAll={onIgnoreAllAlerts} />
      <RisksLane insights={insights} showRisks={showRisks} />
    </aside>
  );
}
