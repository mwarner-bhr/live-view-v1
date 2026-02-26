import { Avatar, Button, Icon } from '../../../components';
import type { EmployeeRecord } from '../types';

interface EmployeeDetailsModalProps {
  employee: EmployeeRecord | null;
  onClose: () => void;
}

function formatClockIn(iso?: string) {
  if (!iso) return 'No clock-in recorded';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function hoursLabel(hours: number) {
  return `${hours.toFixed(1)} hrs`;
}

function statusLabel(status: EmployeeRecord['status']) {
  if (status === 'CLOCKED_IN') return 'Clocked In';
  if (status === 'ON_BREAK') return 'On Break';
  return 'Clocked Out';
}

function statusClass(status: EmployeeRecord['status']) {
  if (status === 'CLOCKED_IN') return 'bg-[#020617] text-white';
  return 'bg-[#e5e7eb] text-[#111827]';
}

function scheduleTagLabel(tag?: EmployeeRecord['scheduleTag']) {
  if (tag === 'PTO') return 'PTO';
  if (tag === 'UNSCHEDULED') return 'Not scheduled';
  return null;
}

function scheduleTagClass(tag?: EmployeeRecord['scheduleTag']) {
  if (tag === 'PTO') return 'bg-[#e0e7ff] text-[#3730a3]';
  if (tag === 'UNSCHEDULED') return 'bg-[#f3f4f6] text-[#374151]';
  return '';
}

function addMinutesToHHMM(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(':').map(Number);
  const start = h * 60 + m;
  const total = (start + minutes) % (24 * 60);
  const endH = Math.floor(total / 60);
  const endM = total % 60;
  const period = endH >= 12 ? 'PM' : 'AM';
  const twelveHour = endH % 12 || 12;
  return `${twelveHour}:${String(endM).padStart(2, '0')} ${period}`;
}

function formatShiftWindow(employee: EmployeeRecord): string {
  const [h, m] = employee.baselines.startWindow.start.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const twelveHour = h % 12 || 12;
  const start = `${twelveHour}:${String(m).padStart(2, '0')} ${period}`;
  const end = addMinutesToHHMM(employee.baselines.startWindow.start, employee.baselines.shiftLengthMinutes);
  return `${start} - ${end}`;
}

function minutesSince(iso?: string): number | null {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
}

function riskHeadline(employee: EmployeeRecord, overtimePct: number): { text: string; className: string } {
  const minsOnBreak = minutesSince(employee.currentSession.breakStartTime);
  const isScheduled = employee.scheduleTag !== 'UNSCHEDULED' && employee.scheduleTag !== 'PTO';
  const isLate = isScheduled && employee.status === 'CLOCKED_OUT' && !employee.currentSession.clockInTime;
  const breakRisk = employee.status === 'ON_BREAK' && minsOnBreak !== null && minsOnBreak > employee.baselines.breakLengthMinutes + 10;

  if (isLate) return { text: 'Late start against scheduled window', className: 'text-[#dc2626]' };
  if (breakRisk) return { text: 'Break compliance risk', className: 'text-[#dc2626]' };
  if (overtimePct >= 85) return { text: `Approaching ${employee.overtime.thresholdHours}hr overtime limit`, className: 'text-[#dc2626]' };
  if (overtimePct >= 65) return { text: `${overtimePct}% likely to hit OT if shift extends`, className: 'text-[var(--text-neutral-medium)] italic' };
  return { text: 'Consistent performer, low risk', className: 'text-[var(--text-neutral-medium)] italic' };
}

export function EmployeeDetailsModal({ employee, onClose }: EmployeeDetailsModalProps) {
  if (!employee) return null;

  const location = employee.currentSession.location;
  const weeklyHours = employee.overtime.workedThisWeekHours;
  const payPeriodHours = employee.timeIntegrity.submittedHours;
  const overtimePct = Math.min(100, Math.round((employee.overtime.workedThisWeekHours / employee.overtime.thresholdHours) * 100));
  const shiftWindow = formatShiftWindow(employee);
  const note = riskHeadline(employee, overtimePct);
  const scheduleLabel = scheduleTagLabel(employee.scheduleTag);
  const googleMapEmbedUrl = location
    ? `https://www.google.com/maps?q=${encodeURIComponent(`${location.lat},${location.lng}`)}&z=13&output=embed`
    : null;
  const googleMapLink = location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.lat},${location.lng}`)}`
    : null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/35 p-4" role="dialog" aria-modal="true" aria-label="Employee details">
      <div className="w-full max-w-[760px] rounded-[20px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar src={employee.avatarUrl} alt={employee.name} size="medium" />
            <div>
              <h3
                className="text-[24px] leading-[30px] font-semibold text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
              >
                {employee.name}
              </h3>
              <p className="text-[14px] text-[var(--text-neutral-medium)]">{employee.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close employee details"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-neutral-medium)] hover:bg-[var(--surface-neutral-xx-weak)]"
          >
            <Icon name="xmark" size={14} />
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] p-3 sm:col-span-2">
            <p className="text-[12px] text-[var(--text-neutral-medium)]">Current Shift Status</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`rounded-[10px] px-2 py-1 text-[13px] font-semibold ${statusClass(employee.status)}`}>
                {statusLabel(employee.status)}
              </span>
              {scheduleLabel && (
                <span className={`rounded-[1000px] px-2 py-1 text-[13px] font-semibold ${scheduleTagClass(employee.scheduleTag)}`}>
                  {scheduleLabel}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[13px] text-[var(--text-neutral-medium)]">
                <Icon name="clock" size={12} />
                {shiftWindow}
              </span>
            </div>
            <p className={`mt-2 text-[14px] ${note.className}`}>{note.text}</p>
            <div className="mt-3 max-w-[220px]">
              <div className="flex items-center justify-between text-[13px] text-[var(--text-neutral-medium)]">
                <span>OT</span>
                <span>{overtimePct}%</span>
              </div>
              <div className="mt-1 h-2 rounded-[1000px] bg-[#d1d5db]">
                <div className="h-full rounded-[1000px] bg-[#020617]" style={{ width: `${overtimePct}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-3">
            <p className="text-[12px] text-[var(--text-neutral-medium)]">Total Hours This Week</p>
            <p className="mt-1 text-[26px] font-semibold text-[var(--text-neutral-xx-strong)]">{hoursLabel(weeklyHours)}</p>
          </div>
          <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-3">
            <p className="text-[12px] text-[var(--text-neutral-medium)]">Total Hours This Pay Period</p>
            <p className="mt-1 text-[26px] font-semibold text-[var(--text-neutral-xx-strong)]">{hoursLabel(payPeriodHours)}</p>
          </div>
        </div>

        <div className="mt-4 rounded-[12px] border border-[var(--border-neutral-x-weak)] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[14px] font-semibold text-[var(--text-neutral-xx-strong)]">Clock-in Location</p>
            <p className="inline-flex items-center gap-1 text-[13px] text-[var(--text-neutral-medium)]">
              <Icon name="clock" size={12} />
              {formatClockIn(employee.currentSession.clockInTime)}
            </p>
          </div>

          {location && googleMapEmbedUrl ? (
            <>
              <p className="mt-1 inline-flex items-center gap-1 text-[13px] text-[var(--text-neutral-medium)]">
                <Icon name="location-dot" size={12} />
                {location.label} ({location.lat.toFixed(3)}, {location.lng.toFixed(3)})
              </p>
              <div className="mt-3 overflow-hidden rounded-[10px] border border-[var(--border-neutral-x-weak)]">
                <iframe
                  title={`Map for ${employee.name} clock-in location`}
                  src={googleMapEmbedUrl}
                  className="h-[220px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {googleMapLink && (
                <a
                  href={googleMapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-[#0b4fd1] hover:underline"
                >
                  Open in Google Maps
                  <Icon name="arrow-up-from-bracket" size={11} />
                </a>
              )}
            </>
          ) : (
            <div className="mt-3 rounded-[10px] bg-[var(--surface-neutral-xx-weak)] p-3 text-[13px] text-[var(--text-neutral-medium)]">
              No location was recorded for this clock-in.
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <Button variant="standard" size="small" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetailsModal;
