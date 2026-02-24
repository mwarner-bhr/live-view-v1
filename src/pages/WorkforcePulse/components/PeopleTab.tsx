import { Avatar } from '../../../components';
import type { EmployeeRecord } from '../types';

interface PeopleTabProps {
  employees: EmployeeRecord[];
  search: string;
  className?: string;
}

function statusPill(status: EmployeeRecord['status']) {
  if (status === 'CLOCKED_IN') return 'bg-[#dcfce7] text-[#166534]';
  if (status === 'ON_BREAK') return 'bg-[#fef3c7] text-[#92400e]';
  return 'bg-[#e5e7eb] text-[#374151]';
}

function scheduleTagPill(tag?: EmployeeRecord['scheduleTag']) {
  if (tag === 'PTO') return 'bg-[#e0e7ff] text-[#3730a3]';
  if (tag === 'UNSCHEDULED') return 'bg-[#f3f4f6] text-[#374151]';
  return '';
}

export function PeopleTab({ employees, search, className }: PeopleTabProps) {
  const needle = search.trim().toLowerCase();
  const filtered = employees.filter((employee) =>
    !needle || employee.name.toLowerCase().includes(needle) || employee.role.toLowerCase().includes(needle),
  );

  return (
    <section className={className ?? 'mt-4 rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4'}>
      <ul className="space-y-2">
        {filtered.map((employee) => (
          <li key={employee.id} className="flex items-center justify-between rounded-[12px] border border-[var(--border-neutral-x-weak)] px-3 py-2">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar src={employee.avatarUrl} alt={employee.name} size="small" />
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-[var(--text-neutral-xx-strong)]">{employee.name}</p>
                <p className="truncate text-[13px] text-[var(--text-neutral-medium)]">{employee.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {employee.scheduleTag && (
                <span className={`rounded-[1000px] px-2 py-1 text-[11px] font-semibold ${scheduleTagPill(employee.scheduleTag)}`}>
                  {employee.scheduleTag === 'PTO' ? 'PTO' : 'Not scheduled'}
                </span>
              )}
              <span className={`rounded-[1000px] px-2 py-1 text-[11px] font-semibold ${statusPill(employee.status)}`}>
                {employee.status === 'CLOCKED_IN' ? 'Clocked in' : employee.status === 'ON_BREAK' ? 'On break' : 'Clocked out'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PeopleTab;
