import type { Employee, EmployeeException, EmployeeStatus } from '../types/managerLiveView';

const statusLabelMap: Record<EmployeeStatus, string> = {
  clocked_in: 'Clocked In',
  on_break: 'On Break',
  clocked_out: 'Clocked Out',
  absent: 'Absent',
  pto: 'PTO',
};

export function formatMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

export function formatStatus(status: EmployeeStatus): string {
  return statusLabelMap[status];
}

export function formatScheduleWindow(employee: Employee): string {
  if (!employee.scheduledStart || !employee.scheduledEnd) {
    return 'No schedule today';
  }
  return `Scheduled ${employee.scheduledStart}-${employee.scheduledEnd}`;
}

export function formatScheduleDelta(employee: Employee): string {
  const latestPunch = employee.punches[employee.punches.length - 1];
  const late = latestPunch?.minutesLate ?? 0;
  if (late > 0) {
    return `Late ${late}m`;
  }

  const leftEarly = employee.exceptions?.find((exception) => exception.type === 'left_early')?.minutesOver ?? 0;
  if (leftEarly > 0) {
    return `Left early ${leftEarly}m`;
  }

  return 'On time';
}

export function formatException(exception: EmployeeException): string {
  if (exception.type === 'break_over') {
    return `Break over +${exception.minutesOver ?? 0}m`;
  }
  if (exception.type === 'missed_punch') {
    return 'Missed punch';
  }
  if (exception.type === 'meal_due') {
    return `Meal due in ${exception.minutesOver ?? 0}m`;
  }
  if (exception.type === 'ot_soon') {
    return 'OT soon';
  }
  if (exception.type === 'left_early') {
    return `Left early ${exception.minutesOver ?? 0}m`;
  }
  return exception.type;
}

export function employeeInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function formatAlertTimestamp(timestamp: string): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
}
