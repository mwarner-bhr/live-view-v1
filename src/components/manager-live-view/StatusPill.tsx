import type { EmployeeStatus } from '../../types/managerLiveView';
import { formatStatus } from '../../utils/timeFormat';

interface StatusPillProps {
  status: EmployeeStatus;
}

const classMap: Record<EmployeeStatus, string> = {
  clocked_in: 'bg-emerald-100 text-emerald-800',
  on_break: 'bg-amber-100 text-amber-900',
  clocked_out: 'bg-slate-100 text-slate-700',
  absent: 'bg-rose-100 text-rose-900',
  pto: 'bg-sky-100 text-sky-800',
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${classMap[status]}`}>
      {formatStatus(status)}
    </span>
  );
}
