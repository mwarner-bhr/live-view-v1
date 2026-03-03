import type { EmployeeException } from '../../types/managerLiveView';
import { formatException } from '../../utils/timeFormat';

interface ExceptionChipProps {
  exception: EmployeeException;
}

export function ExceptionChip({ exception }: ExceptionChipProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border-neutral-x-weak)] bg-white px-2 py-1 text-[11px] font-medium text-[var(--text-neutral-x-strong)]">
      {formatException(exception)}
    </span>
  );
}
