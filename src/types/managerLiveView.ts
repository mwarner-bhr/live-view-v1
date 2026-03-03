export type EmployeeStatus = 'clocked_in' | 'on_break' | 'clocked_out' | 'absent' | 'pto';

export interface EmployeeException {
  type: 'break_over' | 'missed_punch' | 'meal_due' | 'ot_soon' | 'left_early';
  minutesOver?: number;
}

export interface EmployeePunch {
  date: string;
  minutesLate?: number;
}

export interface Employee {
  id: string;
  name: string;
  avatarUrl?: string | null;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
  scheduledStart?: string;
  scheduledEnd?: string;
  todayMinutes: number;
  weekMinutes: number;
  lastPunch?: string;
  exceptions?: EmployeeException[];
  punches: EmployeePunch[];
}

export type AlertSeverity = 'high' | 'medium' | 'low';
export type AlertCta = 'message' | 'acknowledge' | 'fix_punch';

export interface Alert {
  id: string;
  employeeId: string;
  message: string;
  timestamp: string;
  severity: AlertSeverity;
  type: 'break' | 'missed_clock_in' | 'overtime' | 'meal' | 'punch';
  cta: AlertCta;
}

export type InsightTrend = 'improving' | 'worsening' | 'stable';
export type InsightAction = 'send_reminder' | 'schedule_1_1' | 'add_private_note' | 'escalate_hr';

export interface InsightEvidence {
  date: string;
  note: string;
}

export interface Insight {
  id: string;
  employeeId: string;
  summary: string;
  trend: InsightTrend;
  impactNote: string;
  suggestedActions: InsightAction[];
  evidence: InsightEvidence[];
}
