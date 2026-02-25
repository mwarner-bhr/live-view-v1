import { useEffect, useMemo, useState } from 'react';
import { Button, Icon } from '../../components';
import { WorkforcePulse } from '../WorkforcePulse';

const tabs = ['My Team', 'Scheduler', 'Timesheets', 'Project Tracking'] as const;
type TabKey = typeof tabs[number];

type ShiftType = 'teal' | 'purple' | 'vacation';

interface Shift {
  id: string;
  label: string;
  subtitle?: string;
  type: ShiftType;
}

interface Employee {
  id: string;
  name: string;
  hours: string;
  cost: string;
}

type ScheduleMap = Record<string, Shift[]>;

const employees: Employee[] = [
  { id: 'open-shifts', name: 'Open Shifts', hours: '0h 0m', cost: '$0.00' },
  { id: 'ben-proctor', name: 'Ben Proctor', hours: '0h 0m', cost: '$0.00' },
  { id: 'albert-flores', name: 'Albert Flores', hours: '16h 0m', cost: '$0.00' },
  { id: 'janet-caldwell', name: 'Janet Caldwell', hours: '0h 0m', cost: '$0.00' },
  { id: 'devon-lane', name: 'Devon Lane', hours: '0h 0m', cost: '$0.00' },
  { id: 'ronald-richards', name: 'Ronald Richards', hours: '24h 0m', cost: '$0.00' },
  { id: 'wade-warren', name: 'Wade Warren', hours: '0h 0m', cost: '$0.00' },
  { id: 'brooklyn-simmons', name: 'Brooklyn Simmons', hours: '0h 0m', cost: '$0.00' },
  { id: 'darrell-steward', name: 'Darrell Steward', hours: '0h 0m', cost: '$0.00' },
  { id: 'esther-howard', name: 'Esther Howard', hours: '0h 0m', cost: '$0.00' },
  { id: 'jenny-wilson', name: 'Jenny Wilson', hours: '0h 0m', cost: '$0.00' },
  { id: 'kristin-watson', name: 'Kristin Watson', hours: '0h 0m', cost: '$0.00' },
];

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function startOfWeekMonday(date: Date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function formatDay(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function makeShift(id: string, label: string, type: ShiftType, subtitle?: string): Shift {
  return { id, label, type, subtitle };
}

function buildSeedSchedule(): ScheduleMap {
  const shifts: ScheduleMap = {};
  const add = (employeeId: string, dayIndex: number, shift: Shift) => {
    shifts[`${employeeId}:${dayIndex}`] = [...(shifts[`${employeeId}:${dayIndex}`] || []), shift];
  };

  add('open-shifts', 2, makeShift('s1', '8:00AM–5:00PM', 'purple'));
  add('open-shifts', 3, makeShift('s2', '8:00AM–5:00PM', 'teal'));
  add('open-shifts', 5, makeShift('s3', '8:00AM–5:00PM', 'purple'));

  add('ben-proctor', 0, makeShift('s4', '8:00AM–5:00PM', 'teal', 'Cashier'));
  add('ben-proctor', 4, makeShift('s5', '8:00AM–5:00PM', 'purple', 'Front Desk'));
  add('ben-proctor', 5, makeShift('s6', '8:00AM–5:00PM', 'purple', 'Front Desk'));

  add('albert-flores', 0, makeShift('s7', '8:00AM–5:00PM (8h...)', 'purple', '{Shift Name}'));
  add('albert-flores', 2, makeShift('s8', '8:00AM–5:00PM', 'purple'));

  add('janet-caldwell', 0, makeShift('s9', '8:00AM–5:00PM', 'teal'));
  add('janet-caldwell', 1, makeShift('s10', '8:00AM–5:00PM', 'teal'));
  add('janet-caldwell', 4, makeShift('s11', '8:00AM–5:00PM', 'purple'));
  add('janet-caldwell', 5, makeShift('s12', '8:00AM–5:00PM', 'purple'));

  add('devon-lane', 0, makeShift('s13', '8:00AM–5:00PM', 'teal'));
  add('devon-lane', 2, makeShift('s14', '8:00AM–5:00PM', 'purple'));

  add('ronald-richards', 0, makeShift('s15', '8:00AM–5:00PM', 'teal', 'Cashier'));
  add('ronald-richards', 1, makeShift('s16', '8:00AM–5:00PM', 'purple'));
  add('ronald-richards', 3, makeShift('s17', '8:00AM–5:00PM', 'purple', 'Front Desk'));

  add('wade-warren', 0, makeShift('s18', 'Vacation', 'vacation'));
  add('wade-warren', 1, makeShift('s19', 'Vacation', 'vacation'));
  add('wade-warren', 2, makeShift('s20', 'Vacation', 'vacation'));
  add('wade-warren', 3, makeShift('s21', '8:00AM–5:00PM', 'purple'));
  add('wade-warren', 4, makeShift('s22', '8:00AM–5:00PM (8h...)', 'teal'));
  add('wade-warren', 5, makeShift('s23', '8:00AM–5:00PM (8h...)', 'teal'));

  add('brooklyn-simmons', 1, makeShift('s24', '8:00AM–5:00PM', 'purple', 'Front Desk'));
  add('brooklyn-simmons', 2, makeShift('s25', '8:00AM–5:00PM', 'teal'));

  add('darrell-steward', 0, makeShift('s26', '8:00AM–5:00PM', 'teal'));
  add('darrell-steward', 1, makeShift('s27', '8:00AM–5:00PM', 'teal'));
  add('darrell-steward', 3, makeShift('s28', '8:00AM–5:00PM', 'purple'));
  add('darrell-steward', 4, makeShift('s29', '8:00AM–5:00PM', 'purple'));

  add('esther-howard', 0, makeShift('s30', '8:00AM–5:00PM', 'teal'));
  add('esther-howard', 1, makeShift('s31', '8:00AM–5:00PM', 'teal'));
  add('esther-howard', 3, makeShift('s32', '8:00AM–5:00PM', 'purple'));
  add('esther-howard', 4, makeShift('s33', '8:00AM–5:00PM', 'purple'));

  add('jenny-wilson', 1, makeShift('s34', '8:00AM–5:00PM', 'teal'));
  add('jenny-wilson', 2, makeShift('s35', '8:00AM–5:00PM', 'teal'));

  add('kristin-watson', 1, makeShift('s36', '8:00AM–5:00PM', 'purple'));
  add('kristin-watson', 2, makeShift('s37', '8:00AM–5:00PM', 'purple'));
  add('kristin-watson', 4, makeShift('s38', '8:00AM–5:00PM', 'purple'));
  add('kristin-watson', 5, makeShift('s39', '8:00AM–5:00PM', 'teal'));

  return shifts;
}

function ShiftCard({ shift }: { shift: Shift }) {
  if (shift.type === 'vacation') {
    return (
      <div className="rounded-[4px] bg-[#6f7073] px-2 py-0.5 text-[11px] leading-[15px] font-medium text-white">
        {shift.label}
      </div>
    );
  }

  const isPurple = shift.type === 'purple';
  const isPreview = shift.id === 'draft-preview';
  return (
    <div
      className={`rounded-[8px] border bg-white px-2 py-1 ${isPurple ? 'border-[#a76ae9] text-[#8c50d7]' : 'border-[#367e72] text-[#367e72]'} ${isPreview ? 'border-dashed opacity-80' : ''}`}
    >
      <p className="text-[13px] leading-[19px] font-bold">△ {shift.label}</p>
      {shift.subtitle && <p className="text-[11px] leading-[15px] font-medium">{shift.subtitle}</p>}
    </div>
  );
}

interface SchedulerProps {
  weekOffset: number;
  onWeekOffsetChange: (offset: number) => void;
}

interface AddShiftDialogProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  employees: Array<{ id: string; name: string }>;
  initialSelectedEmployeeIds: string[];
  onDraftChange: (payload: {
    shiftName: string;
    date: string;
    startTime: string;
    endTime: string;
    color: 'teal' | 'purple';
    employeeIds: string[];
  }) => void;
  onSubmit: (payload: {
    shiftName: string;
    date: string;
    startTime: string;
    endTime: string;
    color: 'teal' | 'purple';
    employeeIds: string[];
  }) => void;
  initialDate: string;
}

function AddShiftDialog({
  isOpen,
  onClose,
  position,
  employees,
  initialSelectedEmployeeIds,
  onDraftChange,
  onSubmit,
  initialDate,
}: AddShiftDialogProps) {
  const [shiftName, setShiftName] = useState('');
  const [date, setDate] = useState(initialDate);
  const [startTime, setStartTime] = useState('8:00 AM');
  const [endTime, setEndTime] = useState('5:00 PM');
  const [color, setColor] = useState<'teal' | 'purple'>('teal');
  const [repeat, setRepeat] = useState('Does not repeat');
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>(initialSelectedEmployeeIds);
  const [employeeQuery, setEmployeeQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setDate(initialDate);
      setSelectedEmployeeIds(initialSelectedEmployeeIds);
      setEmployeeQuery('');
    }
  }, [initialDate, isOpen, initialSelectedEmployeeIds]);

  useEffect(() => {
    if (!isOpen) return;
    onDraftChange({ shiftName, date, startTime, endTime, color, employeeIds: selectedEmployeeIds });
  }, [isOpen, shiftName, date, startTime, endTime, color, selectedEmployeeIds, onDraftChange]);

  if (!isOpen) return null;

  const dialogDate = new Date(`${date}T00:00:00`);
  const selectedEmployees = selectedEmployeeIds
    .map((id) => employees.find((e) => e.id === id))
    .filter((e): e is { id: string; name: string } => Boolean(e));
  const employeeSuggestions = employees.filter((employee) => {
    if (selectedEmployeeIds.includes(employee.id)) return false;
    if (!employeeQuery.trim()) return true;
    return employee.name.toLowerCase().includes(employeeQuery.toLowerCase());
  });

  return (
    <div
      className="fixed z-50"
      style={{ top: position.top, left: position.left }}
      role="dialog"
      aria-modal="false"
    >
      <div
        className="w-full max-w-[420px] overflow-hidden rounded-[16px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)]"
        style={{ boxShadow: '3px 3px 10px 2px rgba(56, 49, 47, 0.1)' }}
      >
        <div className="flex items-center justify-between bg-[var(--surface-neutral-xx-weak)] px-5 py-4">
          <h3
            className="text-[21px] leading-[26px] text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', fontWeight: 600 }}
          >
            Add Shift: {dialogDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h3>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)]"
            aria-label="Close dialog"
          >
            <Icon name="xmark" size={12} />
          </button>
        </div>

        <div className="space-y-3 px-5 py-6">
          <label className="block">
            <span className="mb-1 block text-[14px] leading-[20px] font-medium text-[var(--text-neutral-xx-strong)]">Shift Name</span>
            <div className="flex items-center gap-3">
              <input
                value={shiftName}
                onChange={(e) => setShiftName(e.target.value)}
                placeholder='e.g. "Morning Shift", "Cashier"...'
                className="h-10 w-full rounded-[8px] border border-[var(--border-neutral-medium)] px-3 text-[15px] outline-none"
              />
              <button
                type="button"
                onClick={() => setColor((prev) => (prev === 'teal' ? 'purple' : 'teal'))}
                className="inline-flex h-8 items-center gap-2 rounded-[1000px] border border-[var(--border-neutral-medium)] px-3"
                aria-label="Toggle shift color"
              >
                <span className={`h-4 w-4 rounded-[3px] ${color === 'teal' ? 'bg-[#367e72]' : 'bg-[#8c50d7]'}`} />
                <Icon name="caret-down" size={10} />
              </button>
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-[14px] leading-[20px] font-medium text-[var(--text-neutral-xx-strong)]">Date</span>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-10 w-full rounded-[8px] border border-[var(--border-neutral-medium)] px-3 text-[15px] outline-none"
              />
            </div>
          </label>

          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
            <label className="block">
              <span className="mb-1 block text-[14px] leading-[20px] font-medium text-[var(--text-neutral-xx-strong)]">Start Time</span>
              <input
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="h-10 w-full rounded-[8px] border border-[var(--border-neutral-medium)] px-3 text-[15px] outline-none"
              />
            </label>
            <span className="pb-2 text-[11px] leading-[15px] text-[var(--text-neutral-medium)]">To</span>
            <label className="block">
              <span className="mb-1 block text-[14px] leading-[20px] font-medium text-[var(--text-neutral-xx-strong)]">End Time</span>
              <input
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="h-10 w-full rounded-[8px] border border-[var(--border-neutral-medium)] px-3 text-[15px] outline-none"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-[14px] leading-[20px] font-medium text-[var(--text-neutral-xx-strong)]">Repeat?</span>
            <button
              type="button"
              onClick={() => setRepeat((prev) => (prev === 'Does not repeat' ? 'Weekly' : 'Does not repeat'))}
              className="flex h-10 w-full items-center justify-between rounded-[8px] border border-[var(--border-neutral-medium)] px-3 text-[15px] text-[var(--text-neutral-strong)]"
            >
              {repeat}
              <Icon name="caret-down" size={10} />
            </button>
          </label>

          <label className="block">
            <span className="mb-1 block text-[14px] leading-[20px] font-medium text-[var(--text-neutral-xx-strong)]">Employees</span>
            <div className="rounded-[8px] border border-[var(--border-neutral-medium)] bg-white px-2 py-1.5">
              <div className="flex flex-wrap items-center gap-2">
                {selectedEmployees.map((employee) => (
                  <span
                    key={employee.id}
                    className="inline-flex items-center gap-2 rounded-[1000px] bg-[var(--surface-neutral-x-weak)] px-3 py-1 text-[13px] leading-[19px]"
                  >
                    {employee.name}
                    <button
                      type="button"
                      onClick={() => setSelectedEmployeeIds((prev) => prev.filter((id) => id !== employee.id))}
                      aria-label={`Remove ${employee.name}`}
                    >
                      <Icon name="circle-x" size={12} />
                    </button>
                  </span>
                ))}
                <input
                  value={employeeQuery}
                  onChange={(e) => setEmployeeQuery(e.target.value)}
                  placeholder={selectedEmployees.length === 0 ? 'Add employee...' : 'Add more...'}
                  className="h-8 min-w-[120px] flex-1 border-0 px-1 text-[14px] outline-none"
                />
              </div>
              {employeeSuggestions.length > 0 && (
                <div className="mt-2 max-h-28 overflow-auto rounded-[8px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)]">
                  {employeeSuggestions.slice(0, 6).map((employee) => (
                    <button
                      key={employee.id}
                      type="button"
                      className="block w-full px-2 py-1.5 text-left text-[13px] hover:bg-[var(--surface-neutral-x-weak)]"
                      onClick={() => {
                        setSelectedEmployeeIds((prev) => [...prev, employee.id]);
                        setEmployeeQuery('');
                      }}
                    >
                      {employee.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </label>
        </div>

        <div className="flex gap-4 bg-[var(--surface-neutral-xx-weak)] px-5 py-4">
          <button
            className="h-12 flex-1 rounded-[1000px] bg-[var(--color-primary-strong)] px-5 text-[15px] font-semibold text-white"
            style={{ lineHeight: '22px' }}
            onClick={() => onSubmit({ shiftName, date, startTime, endTime, color, employeeIds: selectedEmployeeIds })}
          >
            Save As Draft
          </button>
          <button
            className="h-12 flex-1 rounded-[1000px] border border-[var(--border-neutral-medium)] bg-white px-5 text-[15px] font-semibold text-[var(--text-neutral-strong)]"
            style={{ lineHeight: '22px', boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
            onClick={() => onSubmit({ shiftName, date, startTime, endTime, color, employeeIds: selectedEmployeeIds })}
          >
            Save & Publish
          </button>
        </div>
      </div>
    </div>
  );
}

function Scheduler({ weekOffset, onWeekOffsetChange }: SchedulerProps) {
  const weekStart = useMemo(() => {
    const base = startOfWeekMonday(new Date());
    const shifted = new Date(base);
    shifted.setDate(base.getDate() + weekOffset * 7);
    return shifted;
  }, [weekOffset]);

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return { index: i, date };
    });
  }, [weekStart]);

  const weekRangeLabel = `${formatDay(days[0].date)}–${formatDay(days[6].date)}`;

  const [scheduleByWeek, setScheduleByWeek] = useState<Record<string, ScheduleMap>>(() => ({
    [weekStart.toISOString().slice(0, 10)]: buildSeedSchedule(),
  }));
  const [dialogTarget, setDialogTarget] = useState<{ employeeId: string; dayIndex: number } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 80, left: 80 });
  const [draftShiftPreview, setDraftShiftPreview] = useState<Array<{ employeeId: string; dayIndex: number; shift: Shift }>>([]);

  const weekKey = weekStart.toISOString().slice(0, 10);
  const weekSchedule = scheduleByWeek[weekKey] || {};

  const shiftsForCell = (employeeId: string, dayIndex: number) => weekSchedule[`${employeeId}:${dayIndex}`] || [];

  const addShift = (employeeId: string, dayIndex: number, payload: {
    shiftName: string;
    startTime: string;
    endTime: string;
    color: 'teal' | 'purple';
  }) => {
    setScheduleByWeek((prev) => {
      const currentWeek = prev[weekKey] || {};
      const cellKey = `${employeeId}:${dayIndex}`;
      const fmt = (time: string) => time.replace(/\s+/g, '').toUpperCase();
      const label = `${fmt(payload.startTime)}–${fmt(payload.endTime)}`;
      const subtitle = payload.shiftName.trim() ? payload.shiftName.trim() : undefined;
      const nextShift: Shift = makeShift(`new-${Date.now()}`, label, payload.color, subtitle);

      return {
        ...prev,
        [weekKey]: {
          ...currentWeek,
          [cellKey]: [...(currentWeek[cellKey] || []), nextShift],
        },
      };
    });
    setDialogOpen(false);
    setDialogTarget(null);
    setDraftShiftPreview([]);
  };

  return (
    <div
      className="mt-4 rounded-[var(--radius-small)] bg-[var(--surface-neutral-white)] p-4"
      style={{ boxShadow: '2px 2px 0px 2px rgba(56, 49, 47, 0.05)' }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="inline-flex items-center rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)]"
            style={{ boxShadow: '1px 1px 0px 0px rgba(56, 49, 47, 0.04)' }}
          >
            <button
              className="h-10 w-11 rounded-l-[var(--radius-full)] border-r border-[var(--border-neutral-medium)]"
              onClick={() => onWeekOffsetChange(weekOffset - 1)}
              aria-label="Previous week"
            >
              <Icon name="arrow-left" size={14} className="text-[var(--text-neutral-strong)]" />
            </button>
            <div className="h-10 min-w-[150px] px-3 text-[15px] leading-[40px] font-semibold text-[var(--text-neutral-strong)]">
              {weekRangeLabel}
            </div>
            <button
              className="h-10 w-11 rounded-r-[var(--radius-full)] border-l border-[var(--border-neutral-medium)]"
              onClick={() => onWeekOffsetChange(weekOffset + 1)}
              aria-label="Next week"
            >
              <Icon name="chevron-right" size={14} className="text-[var(--text-neutral-strong)]" />
            </button>
          </div>

          <button
            className="h-10 rounded-[var(--radius-full)] bg-[var(--surface-neutral-x-weak)] px-5 text-[15px] font-semibold text-[var(--text-neutral-weak)]"
            onClick={() => onWeekOffsetChange(0)}
          >
            Today
          </button>
        </div>

        <div className="flex items-end gap-4">
          <label className="flex flex-col gap-1 text-[14px] leading-[20px] font-medium text-[var(--text-neutral-xx-strong)]">
            Group by
            <span
              className="flex h-10 w-[126px] items-center justify-between rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] px-3 text-[15px] text-[var(--text-neutral-weak)]"
              style={{ boxShadow: '1px 1px 0px 0px rgba(56, 49, 47, 0.04)' }}
            >
              -Select-
              <Icon name="caret-down" size={12} className="text-[var(--text-neutral-weak)]" />
            </span>
          </label>

          <Button variant="standard" showCaret>Edit</Button>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto rounded-[8px] border border-[var(--border-neutral-x-weak)]">
        <div className="min-w-[980px]">
          <div className="grid" style={{ gridTemplateColumns: '160px repeat(7, minmax(120px, 1fr))' }}>
            <div className="bg-[var(--surface-neutral-xx-weak)] px-3 py-2 text-[13px] font-bold text-[var(--text-neutral-medium)]">Employees</div>
            {days.map((day, i) => (
              <div key={i} className="bg-[var(--surface-neutral-xx-weak)] px-2 py-2 text-center border-l border-[var(--border-neutral-x-weak)]">
                <p className="text-[13px] leading-[19px] font-bold text-[var(--text-neutral-xx-strong)]">{dayNames[i]}</p>
                <p className="text-[12px] leading-[15px] text-[var(--text-neutral-strong)]">{formatDay(day.date)}</p>
              </div>
            ))}
          </div>

          {employees.map((employee) => (
            <div key={employee.id} className="grid border-t border-[var(--border-neutral-x-weak)]" style={{ gridTemplateColumns: '160px repeat(7, minmax(120px, 1fr))' }}>
              <div className="px-3 py-2 border-r border-[var(--border-neutral-x-weak)]">
                <p className="text-[15px] leading-[22px] font-bold text-[var(--text-neutral-xx-strong)]">{employee.name}</p>
                <p className="text-[12px] leading-[15px] text-[var(--text-neutral-strong)]">{employee.hours}</p>
                <p className="text-[12px] leading-[15px] text-[var(--text-neutral-strong)]">{employee.cost}</p>
              </div>

              {days.map((day) => {
                const cellShifts = shiftsForCell(employee.id, day.index);
                const previewShift = draftShiftPreview
                  .filter((preview) => preview.employeeId === employee.id && preview.dayIndex === day.index)
                  .map((preview) => preview.shift);
                const visibleShifts = [...cellShifts, ...previewShift];

                return (
                  <div
                    key={`${employee.id}-${day.index}`}
                    className="group min-h-[50px] border-l border-[var(--border-neutral-x-weak)] bg-white p-1.5 hover:bg-[#eaf2e8]"
                  >
                    <div className="flex flex-col gap-1">
                      {visibleShifts.map((shift) => (
                        <ShiftCard key={shift.id} shift={shift} />
                      ))}

                      {visibleShifts.length === 0 && (
                        <button
                          className="h-[34px] rounded-[6px] border border-dashed border-[var(--border-neutral-medium)] text-[13px] font-medium text-[var(--text-neutral-strong)] opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                            const dialogWidth = 420;
                            const dialogHeight = 600;
                            const gap = 12;
                            const fitsRight = rect.right + gap + dialogWidth <= window.innerWidth - 16;
                            const fitsLeft = rect.left - gap - dialogWidth >= 16;
                            const fitsBelow = rect.bottom + gap + dialogHeight <= window.innerHeight - 16;

                            let left = rect.right + gap;
                            if (!fitsRight && fitsLeft) {
                              left = rect.left - gap - dialogWidth;
                            } else if (!fitsRight && !fitsLeft) {
                              left = Math.max(16, Math.min(rect.left, window.innerWidth - dialogWidth - 16));
                            }

                            let top = rect.top;
                            if (!fitsBelow) {
                              top = rect.bottom - dialogHeight;
                            }
                            top = Math.max(16, Math.min(top, window.innerHeight - dialogHeight - 16));
                            setDialogPosition({ top, left });
                            setDialogTarget({ employeeId: employee.id, dayIndex: day.index });
                            setDialogOpen(true);
                          }}
                        >
                          <span className="inline-flex items-center gap-1">
                            <Icon name="circle-plus" size={12} />
                            Add Shift
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <button className="mt-3 inline-flex items-center gap-2 text-[15px] leading-[22px] text-[#0b4fd1]">
        <Icon name="pen" size={14} />
        Edit Employees
      </button>

      <AddShiftDialog
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setDialogTarget(null);
          setDraftShiftPreview([]);
        }}
        employees={employees.map((employee) => ({ id: employee.id, name: employee.name }))}
        initialSelectedEmployeeIds={dialogTarget ? [dialogTarget.employeeId] : []}
        onDraftChange={(payload) => {
          if (!dialogTarget) return;
          const selectedDateKey = new Date(`${payload.date}T00:00:00`).toDateString();
          const matchedDay = days.find((d) => d.date.toDateString() === selectedDateKey);
          const targetDayIndex = matchedDay ? matchedDay.index : dialogTarget.dayIndex;
          const fmt = (time: string) => time.replace(/\s+/g, '').toUpperCase();
          const label = `${fmt(payload.startTime)}–${fmt(payload.endTime)}`;
          const subtitle = payload.shiftName.trim() ? payload.shiftName.trim() : undefined;
          const employeeIds = payload.employeeIds.length > 0 ? payload.employeeIds : [dialogTarget.employeeId];
          setDraftShiftPreview(
            employeeIds.map((employeeId) => ({
              employeeId,
              dayIndex: targetDayIndex,
              shift: makeShift(`draft-preview-${employeeId}`, label, payload.color, subtitle),
            })),
          );
        }}
        position={dialogPosition}
        initialDate={dialogTarget ? days[dialogTarget.dayIndex].date.toISOString().slice(0, 10) : days[0].date.toISOString().slice(0, 10)}
        onSubmit={(payload) => {
          if (!dialogTarget) return;
          const selectedDateKey = new Date(`${payload.date}T00:00:00`).toDateString();
          const matchedDay = days.find((d) => d.date.toDateString() === selectedDateKey);
          const targetDayIndex = matchedDay ? matchedDay.index : dialogTarget.dayIndex;
          const employeeIds = payload.employeeIds.length > 0 ? payload.employeeIds : [dialogTarget.employeeId];
          employeeIds.forEach((employeeId) => {
            addShift(employeeId, targetDayIndex, {
              shiftName: payload.shiftName,
              startTime: payload.startTime,
              endTime: payload.endTime,
              color: payload.color,
            });
          });
        }}
      />
    </div>
  );
}

export function TimeAttendance() {
  const [activeTab, setActiveTab] = useState<TabKey>('My Team');
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <div className="min-h-full bg-[var(--surface-neutral-xx-weak)]">
      <section className="px-8 pt-6 pb-4">
        <div className="flex items-end justify-between gap-8">
          <div>
            <h1
              className="text-[44px] leading-[52px] font-bold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
            >
              Time & Attendance
            </h1>
            <p className="mt-1 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">
              Track time, plan schedules, and keep work moving.
            </p>
          </div>

          <div className="flex items-end">
            {tabs.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`h-[43px] px-3 text-[16px] leading-[24px] border-b-[3px] transition-colors cursor-pointer ${
                    isActive
                      ? 'font-bold text-[var(--color-primary-strong)] border-[var(--color-primary-strong)]'
                      : 'font-medium text-[var(--text-neutral-strong)] border-transparent'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 h-px bg-[var(--border-neutral-x-weak)]" />

        {activeTab !== 'Scheduler' && activeTab !== 'My Team' && (
          <div className="mt-3 flex items-center justify-between">
            <Button variant="standard" size="small" icon="sliders" showCaret>
              Filters (2)
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="standard" className="px-4" aria-label="Edit">
                <Icon name="pen" size={16} />
              </Button>
              <Button variant="standard" className="px-4" aria-label="People">
                <Icon name="users" size={16} />
              </Button>
              <Button variant="standard" className="px-4" aria-label="Download">
                <Icon name="arrow-down-to-line" size={16} />
              </Button>
              <Button variant="standard" className="px-4" aria-label="More actions">
                <Icon name="ellipsis" size={16} />
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'My Team' ? (
          <div className="mt-4">
            <WorkforcePulse embedded />
          </div>
        ) : activeTab === 'Scheduler' ? (
          <Scheduler weekOffset={weekOffset} onWeekOffsetChange={setWeekOffset} />
        ) : (
          <div className="mt-4 rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6 text-[15px] text-[var(--text-neutral-medium)]">
            This tab is not yet configured.
          </div>
        )}
      </section>
    </div>
  );
}

export default TimeAttendance;
