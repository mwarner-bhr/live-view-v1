import { getEmployeeAttentionScore, sortByAttentionScore } from '../utils/attentionScore';
import type { Employee } from '../types/managerLiveView';

function makeEmployee(overrides: Partial<Employee>): Employee {
  return {
    id: 'e-1',
    name: 'Sample User',
    role: 'Role',
    department: 'Ops',
    location: 'HQ',
    status: 'clocked_in',
    todayMinutes: 300,
    weekMinutes: 1500,
    punches: [{ date: '2026-03-01', minutesLate: 0 }],
    ...overrides,
  };
}

describe('attention score', () => {
  test('ranks missed punch as high urgency', () => {
    const baseline = makeEmployee({ id: 'base', name: 'Baseline' });
    const withMissedPunch = makeEmployee({
      id: 'risk',
      name: 'Risk',
      exceptions: [{ type: 'missed_punch' }],
    });

    expect(getEmployeeAttentionScore(withMissedPunch)).toBeGreaterThan(getEmployeeAttentionScore(baseline));
  });

  test('adds extra weight for long breaks', () => {
    const shortBreak = makeEmployee({ id: 'short', name: 'Short', status: 'on_break', exceptions: [{ type: 'break_over', minutesOver: 2 }] });
    const longBreak = makeEmployee({ id: 'long', name: 'Long', status: 'on_break', exceptions: [{ type: 'break_over', minutesOver: 9 }] });

    expect(getEmployeeAttentionScore(longBreak)).toBeGreaterThan(getEmployeeAttentionScore(shortBreak));
  });

  test('sort tie breaks by department then name', () => {
    const a = makeEmployee({ id: 'a', name: 'Alex', department: 'Alpha' });
    const b = makeEmployee({ id: 'b', name: 'Bri', department: 'Beta' });

    expect(sortByAttentionScore(a, b)).toBeLessThan(0);
  });
});
