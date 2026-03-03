import type { Employee } from '../types/managerLiveView';

export function getEmployeeAttentionScore(employee: Employee): number {
  let score = 0;

  if (employee.status === 'on_break') score += 20;
  if (employee.status === 'absent') score += 35;
  if (employee.status === 'clocked_out' && employee.scheduledStart && employee.scheduledEnd) score += 25;

  for (const exception of employee.exceptions ?? []) {
    if (exception.type === 'missed_punch') {
      score += 40;
    }

    if (exception.type === 'break_over') {
      score += 30 + Math.min(15, Math.round((exception.minutesOver ?? 0) * 1.5));
    }

    if (exception.type === 'meal_due') {
      const minutesToDue = exception.minutesOver ?? 30;
      score += Math.max(4, 18 - Math.floor(minutesToDue / 3));
    }

    if (exception.type === 'ot_soon') {
      score += 16;
    }

    if (exception.type === 'left_early') {
      score += Math.min(20, exception.minutesOver ?? 0);
    }
  }

  const latestPunch = employee.punches[employee.punches.length - 1];
  const lateMinutes = latestPunch?.minutesLate ?? 0;
  score += Math.min(25, lateMinutes);

  const lateOccurrences = employee.punches.filter((punch) => (punch.minutesLate ?? 0) > 5).length;
  score += Math.min(20, lateOccurrences * 5);

  return score;
}

export function sortByAttentionScore(a: Employee, b: Employee): number {
  const scoreA = getEmployeeAttentionScore(a);
  const scoreB = getEmployeeAttentionScore(b);

  if (scoreA !== scoreB) {
    return scoreB - scoreA;
  }

  const departmentSort = a.department.localeCompare(b.department);
  if (departmentSort !== 0) {
    return departmentSort;
  }

  return a.name.localeCompare(b.name);
}
