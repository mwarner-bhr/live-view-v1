import { Icon } from '../../../components';
import type { EmployeeRecord, OrgSettings, WorkforceException } from '../types';

interface DrawerDetailsProps {
  exception: WorkforceException | null;
  employee: EmployeeRecord | null;
  settings: OrgSettings;
  onClose: () => void;
}

function formatTime(iso?: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function DrawerDetails({ exception, employee, settings, onClose }: DrawerDetailsProps) {
  if (!exception || !employee) return null;

  return (
    <aside
      className="fixed right-0 top-0 z-40 h-full w-full max-w-[420px] border-l border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-5 shadow-[0_0_20px_rgba(56,49,47,0.12)]"
      aria-label="Exception details drawer"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] text-[var(--text-neutral-medium)]">{exception.type}</p>
          <h3 className="text-[24px] leading-[32px] text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif', fontWeight: 600 }}>
            {exception.employee.name}
          </h3>
          <p className="text-[14px] text-[var(--text-neutral-strong)]">{employee.role} · {employee.status.replace('_', ' ')}</p>
        </div>
        <button
          onClick={onClose}
          className="h-9 w-9 rounded-full border border-[var(--border-neutral-medium)] bg-white focus-visible:ring-2 focus-visible:ring-[var(--color-primary-medium)]"
          aria-label="Close details drawer"
        >
          <Icon name="xmark" size={14} className="mx-auto" />
        </button>
      </div>

      <div className="mt-5 rounded-[12px] bg-[var(--surface-neutral-xx-weak)] p-3">
        <h4 className="text-[15px] font-semibold text-[var(--text-neutral-xx-strong)]">Today timeline</h4>
        <ul className="mt-2 space-y-1 text-[13px] text-[var(--text-neutral-strong)]">
          <li>Clock in: {formatTime(employee.currentSession.clockInTime)}</li>
          <li>Break start: {formatTime(employee.currentSession.breakStartTime)}</li>
          <li>Method: {employee.currentSession.method}</li>
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="text-[15px] font-semibold text-[var(--text-neutral-xx-strong)]">Clock-in evidence</h4>
        <div className="mt-2 rounded-[12px] border border-[var(--border-neutral-x-weak)] p-3">
          <div className="rounded-[10px] bg-[var(--surface-neutral-xx-weak)] p-3 text-[13px] text-[var(--text-neutral-strong)]">
            <p className="font-medium">Location preview</p>
            <p className="mt-1">{employee.currentSession.location?.label ?? 'No location available'}</p>
            <div className="mt-2 h-[72px] rounded-[8px] border border-dashed border-[var(--border-neutral-medium)] bg-white px-2 py-1 text-[12px] text-[var(--text-neutral-medium)]">
              Map placeholder ({employee.currentSession.location?.lat.toFixed(3) ?? '—'}, {employee.currentSession.location?.lng.toFixed(3) ?? '—'})
            </div>
          </div>

          {settings.kioskPhotoEnabled && employee.currentSession.photoUrl && (
            <div className="mt-3">
              <p className="mb-1 text-[13px] font-medium text-[var(--text-neutral-strong)]">Kiosk photo evidence</p>
              <img src={employee.currentSession.photoUrl} alt={`${employee.name} kiosk check-in`} className="h-[120px] w-[120px] rounded-[12px] object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-[15px] font-semibold text-[var(--text-neutral-xx-strong)]">Why this was flagged</h4>
        <ul className="mt-2 list-disc pl-5 text-[13px] text-[var(--text-neutral-strong)]">
          {exception.triggers.map((trigger) => (
            <li key={trigger}>{trigger}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="text-[15px] font-semibold text-[var(--text-neutral-xx-strong)]">History (last 30 days)</h4>
        <ul className="mt-2 space-y-1 text-[13px] text-[var(--text-neutral-strong)]">
          {employee.history.recentAnomalies.length === 0 && <li>No similar anomalies recorded.</li>}
          {employee.history.recentAnomalies.map((entry, idx) => (
            <li key={`${entry.type}-${idx}`}>
              {entry.type} · {formatDate(entry.happenedAt)}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default DrawerDetails;
