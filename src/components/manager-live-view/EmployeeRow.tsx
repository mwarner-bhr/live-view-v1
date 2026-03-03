import { useMemo } from 'react';
import type { Employee } from '../../types/managerLiveView';
import { employeeInitials, formatScheduleDelta, formatScheduleWindow } from '../../utils/timeFormat';
import { ExceptionChip } from './ExceptionChip';
import { MinutesLabel } from './MinutesLabel';
import { StatusPill } from './StatusPill';

interface EmployeeRowProps {
  employee: Employee;
  attentionScore: number;
  onMessage: (employee: Employee) => void;
  onFixTime: (employee: Employee) => void;
  onView: (employee: Employee) => void;
}

export function EmployeeRow({ employee, attentionScore, onMessage, onFixTime, onView }: EmployeeRowProps) {
  const initials = useMemo(() => employeeInitials(employee.name), [employee.name]);

  return (
    <article className="rounded-2xl border border-[var(--border-neutral-x-weak)] bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-neutral-xx-weak)] text-sm font-semibold text-[var(--text-neutral-x-strong)]">
            {initials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{employee.name}</p>
              <span className="rounded-full bg-[var(--surface-neutral-xx-weak)] px-2 py-0.5 text-xs text-[var(--text-neutral-medium)]">
                {employee.role} · {employee.department}
              </span>
              <StatusPill status={employee.status} />
            </div>
            <p className="mt-1 text-xs text-[var(--text-neutral-medium)]">
              {formatScheduleWindow(employee)} · {formatScheduleDelta(employee)}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700">
          Score: {attentionScore}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <MinutesLabel label="Today" minutes={employee.todayMinutes} />
        <MinutesLabel label="Week" minutes={employee.weekMinutes} />
      </div>

      {(employee.exceptions?.length ?? 0) > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {employee.exceptions?.map((exception, index) => (
            <ExceptionChip key={`${employee.id}-${exception.type}-${index}`} exception={exception} />
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => onMessage(employee)} className="rounded-xl border border-[var(--border-neutral-medium)] px-3 py-1.5 text-xs font-medium">Message</button>
        <button onClick={() => onFixTime(employee)} className="rounded-xl border border-[var(--border-neutral-medium)] px-3 py-1.5 text-xs font-medium">Fix time</button>
        <button onClick={() => onView(employee)} className="rounded-xl bg-[var(--color-primary-medium)] px-3 py-1.5 text-xs font-medium text-white">View</button>
      </div>
    </article>
  );
}
