import { Avatar } from '../../../components';
import { Icon } from '../../../components';
import type { EmployeeRecord } from '../types';

interface PeopleTabProps {
  employees: EmployeeRecord[];
  search: string;
  className?: string;
  onEmployeeSelect?: (employee: EmployeeRecord) => void;
}

function scheduleTagPill(tag?: EmployeeRecord['scheduleTag']) {
  if (tag === 'PTO') return 'bg-[#e0e7ff] text-[#3730a3]';
  if (tag === 'UNSCHEDULED') return 'bg-[#f3f4f6] text-[#374151]';
  return '';
}

function toMinutes(iso?: string): number | null {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
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

type GroupKey = 'attention' | 'monitor' | 'stable';

interface EmployeeViewModel {
  employee: EmployeeRecord;
  group: GroupKey;
  headline: string;
  sublineClass: string;
  showOtBar: boolean;
  statusLabel: string;
  statusClass: string;
}

function formatStatusLabel(status: EmployeeRecord['status']): string {
  if (status === 'CLOCKED_IN') return 'Clocked In';
  if (status === 'ON_BREAK') return 'On Break';
  return 'Clocked Out';
}

function formatStatusClass(status: EmployeeRecord['status']): string {
  if (status === 'CLOCKED_IN') return 'bg-[#020617] text-white';
  return 'bg-[#e5e7eb] text-[#111827]';
}

function classifyEmployee(employee: EmployeeRecord): EmployeeViewModel {
  const overtimePct = Math.round((employee.overtime.workedThisWeekHours / employee.overtime.thresholdHours) * 100);
  const minsOnBreak = toMinutes(employee.currentSession.breakStartTime);
  const isScheduled = employee.scheduleTag !== 'UNSCHEDULED' && employee.scheduleTag !== 'PTO';
  const isLate = isScheduled && employee.status === 'CLOCKED_OUT' && !employee.currentSession.clockInTime;
  const breakRisk = employee.status === 'ON_BREAK' && minsOnBreak !== null && minsOnBreak > employee.baselines.breakLengthMinutes + 10;
  const approachingOt = overtimePct >= 85;
  const monitorOt = overtimePct >= 65;

  if (isLate) {
    return {
      employee,
      group: 'attention',
      headline: `Late start against scheduled window`,
      sublineClass: 'text-[#dc2626]',
      showOtBar: false,
      statusLabel: 'Late',
      statusClass: 'bg-[#e11d48] text-white',
    };
  }

  if (breakRisk) {
    return {
      employee,
      group: 'attention',
      headline: 'Break compliance risk',
      sublineClass: 'text-[#dc2626]',
      showOtBar: true,
      statusLabel: 'On Break',
      statusClass: 'bg-[#e5e7eb] text-[#111827]',
    };
  }

  if (approachingOt) {
    return {
      employee,
      group: 'attention',
      headline: `Approaching ${employee.overtime.thresholdHours}hr overtime limit`,
      sublineClass: 'text-[#dc2626]',
      showOtBar: true,
      statusLabel: formatStatusLabel(employee.status),
      statusClass: formatStatusClass(employee.status),
    };
  }

  if (monitorOt || employee.status === 'ON_BREAK') {
    return {
      employee,
      group: 'monitor',
      headline: monitorOt ? `${overtimePct}% likely to hit OT if shift extends` : 'Watch shift coverage and breaks',
      sublineClass: 'text-[var(--text-neutral-medium)] italic',
      showOtBar: true,
      statusLabel: formatStatusLabel(employee.status),
      statusClass: formatStatusClass(employee.status),
    };
  }

  return {
    employee,
    group: 'stable',
    headline: 'Consistent performer, low risk',
    sublineClass: 'text-[var(--text-neutral-medium)] italic',
    showOtBar: true,
    statusLabel: formatStatusLabel(employee.status),
    statusClass: formatStatusClass(employee.status),
  };
}

function groupHeader(group: GroupKey): { label: string; accent: string; pill: string } {
  if (group === 'attention') {
    return { label: 'Needs Attention Now', accent: 'bg-[#ef4444]', pill: 'bg-[#e11d48]' };
  }
  if (group === 'monitor') {
    return { label: 'Monitor', accent: 'bg-[#f59e0b]', pill: 'bg-[#f59e0b]' };
  }
  return { label: 'Stable', accent: 'bg-[#22c55e]', pill: 'bg-[#16a34a]' };
}

export function PeopleTab({ employees, search, className, onEmployeeSelect }: PeopleTabProps) {
  const needle = search.trim().toLowerCase();
  const filtered = employees.filter((employee) =>
    !needle || employee.name.toLowerCase().includes(needle) || employee.role.toLowerCase().includes(needle),
  );
  const viewModels = filtered.map(classifyEmployee);
  const grouped: Record<GroupKey, EmployeeViewModel[]> = {
    attention: viewModels.filter((item) => item.group === 'attention'),
    monitor: viewModels.filter((item) => item.group === 'monitor'),
    stable: viewModels.filter((item) => item.group === 'stable'),
  };

  return (
    <section className={className ?? 'mt-4 rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4'}>
      {(['attention', 'monitor', 'stable'] as GroupKey[]).map((group) => {
        const items = grouped[group];
        if (items.length === 0) return null;

        const header = groupHeader(group);

        return (
          <div key={group} className="mt-4">
            <div className="flex items-center gap-3">
              <span className={`h-7 w-1 rounded-[1000px] ${header.accent}`} />
              <h5 className="text-[22px] font-semibold text-[var(--text-neutral-xx-strong)]">{header.label}</h5>
              <span className={`inline-flex h-7 min-w-7 items-center justify-center rounded-[1000px] px-2 text-[13px] font-semibold text-white ${header.pill}`}>
                {items.length}
              </span>
            </div>

            <ul className="mt-3 space-y-3">
              {items.map(({ employee, headline, sublineClass, showOtBar, statusLabel, statusClass }) => {
                const overtimePct = Math.min(100, Math.round((employee.overtime.workedThisWeekHours / employee.overtime.thresholdHours) * 100));
                const shiftWindow = formatShiftWindow(employee);
                const iconName = employee.currentSession.method === 'KIOSK' ? 'computer' : 'location-dot';

                return (
                  <li key={employee.id} className="rounded-[16px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onEmployeeSelect?.(employee)}
                      className="w-full cursor-pointer text-left"
                    >
                      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <Avatar src={employee.avatarUrl} alt={employee.name} size="medium" />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate text-[15px] font-semibold leading-[22px] text-[var(--text-neutral-xx-strong)]">{employee.name}</p>
                              <span className={`rounded-[10px] px-2 py-1 text-[13px] font-semibold ${statusClass}`}>
                                {statusLabel}
                              </span>
                              {employee.scheduleTag && (
                                <span className={`rounded-[1000px] px-2 py-1 text-[13px] font-semibold ${scheduleTagPill(employee.scheduleTag)}`}>
                                  {employee.scheduleTag === 'PTO' ? 'PTO' : 'Not scheduled'}
                                </span>
                              )}
                            </div>
                            <p className="truncate text-[15px] text-[var(--text-neutral-medium)]">{employee.role}</p>
                            <p className={`mt-1 text-[14px] ${sublineClass}`}>{headline}</p>
                          </div>
                        </div>

                        <div className="flex w-full flex-wrap items-center justify-end gap-4 xl:w-auto">
                          <div className="inline-flex items-center gap-2 text-[15px] text-[var(--text-neutral-medium)]">
                            <Icon name="clock" size={15} />
                            <span>{shiftWindow}</span>
                          </div>
                          <div className="inline-flex items-center text-[15px] text-[#2563eb]">
                            <Icon name={iconName} size={15} />
                          </div>
                          {showOtBar && (
                            <div className="min-w-[140px]">
                              <div className="flex items-center justify-between text-[13px] text-[var(--text-neutral-medium)]">
                                <span>OT</span>
                                <span>{overtimePct}%</span>
                              </div>
                              <div className="mt-1 h-2 rounded-[1000px] bg-[#d1d5db]">
                                <div
                                  className="h-full rounded-[1000px] bg-[#020617]"
                                  style={{ width: `${overtimePct}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="mt-3 rounded-[12px] border border-[var(--border-neutral-x-weak)] p-4 text-[14px] text-[var(--text-neutral-medium)]">
          No people match your search.
        </div>
      )}
    </section>
  );
}

export default PeopleTab;
