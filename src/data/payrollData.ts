export interface PayrollDate {
  id: string;
  day: number;
  month: string;
  dayOfWeek: string;
  isSelected: boolean;
  badge?: number;
}

export interface PayrollStat {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export interface Reminder {
  id: string;
  text: string;
  completed: boolean;
}

export interface PayrollDetail {
  id: string;
  icon: string;
  label: string;
  value: string;
}

export const payrollDates: PayrollDate[] = [
  { id: '1', day: 19, month: 'January', dayOfWeek: 'Friday', isSelected: false },
  { id: '2', day: 26, month: 'January', dayOfWeek: 'Friday', isSelected: true },
  { id: '3', day: 2, month: 'February', dayOfWeek: 'Friday', isSelected: false, badge: 2 },
  { id: '4', day: 9, month: 'February', dayOfWeek: 'Friday', isSelected: false },
  { id: '5', day: 16, month: 'February', dayOfWeek: 'Friday', isSelected: false },
  { id: '6', day: 23, month: 'February', dayOfWeek: 'Friday', isSelected: false },
  { id: '7', day: 1, month: 'March', dayOfWeek: 'Friday', isSelected: false },
  { id: '8', day: 8, month: 'March', dayOfWeek: 'Friday', isSelected: false },
  { id: '9', day: 15, month: 'March', dayOfWeek: 'Friday', isSelected: false },
  { id: '10', day: 22, month: 'March', dayOfWeek: 'Friday', isSelected: false },
  { id: '11', day: 29, month: 'March', dayOfWeek: 'Friday', isSelected: false },
  { id: '12', day: 5, month: 'April', dayOfWeek: 'Friday', isSelected: false },
];

export const payrollStats: PayrollStat[] = [
  { id: 'people', icon: 'user-group', value: '88', label: 'People being paid' },
  { id: 'extra', icon: 'circle-dollar', value: '$1,234.00', label: 'Extra pay' },
  { id: 'timesheets', icon: 'clock', value: '113', label: 'Timesheets approved' },
];

export const reminders: Reminder[] = [
  { id: '1', text: 'Rebecca needs a paper check', completed: false },
  { id: '2', text: 'Check direct deposit info for Jonathan Berry (new employee)', completed: false },
];

export const payrollDetails: PayrollDetail[] = [
  { id: 'schedule', icon: 'calendar', label: 'Pay schedule', value: 'Vinyl Design Lab (Weekly)' },
  { id: 'period', icon: 'calendar', label: 'Pay period', value: 'Jan 13, 2024 - Jan 19, 2024' },
  { id: 'date', icon: 'building', label: 'Pay date', value: 'Friday, January 26, 2024' },
];

export const payrollTitle = 'January 26 Payroll';
export const dueDate = 'Due by Wed, Jan 4 at 1:00 PM';
export const payrollId = 'ID 9876-1234567';
export const updatesText = 'Having information of what changed since last payroll could help you feel confident to start this payroll. Check out the report to see updates since your last scheduled payroll that was paid on January 11, 2024.';
