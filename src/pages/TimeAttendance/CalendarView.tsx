import { useEffect, useMemo, useState } from 'react';
import { fetchEmployees } from '../../api/mockClockApi';
import type { Employee } from '../../types/managerLiveView';

type CalendarMode = 'month' | 'week' | 'day';

interface CalendarEvent {
  id: string;
  employeeName: string;
  dateKey: string;
  kind: 'shift' | 'pto';
  label: string;
  startMinutes?: number;
  endMinutes?: number;
  allDay: boolean;
}

interface DayCell {
  date: Date;
  key: string;
  inCurrentMonth: boolean;
  events: CalendarEvent[];
}

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function startOfWeekSunday(date: Date): Date {
  const copy = startOfDay(date);
  copy.setDate(copy.getDate() - copy.getDay());
  return copy;
}

function endOfWeekSaturday(date: Date): Date {
  const copy = startOfWeekSunday(date);
  copy.setDate(copy.getDate() + 6);
  return copy;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

function parseTimeToMinutes(value: string): number | null {
  const normalized = value.trim().toUpperCase();
  const amPmMatch = normalized.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (amPmMatch) {
    const hour = Number(amPmMatch[1]);
    const minute = Number(amPmMatch[2]);
    const meridiem = amPmMatch[3];
    if (Number.isNaN(hour) || Number.isNaN(minute) || minute > 59) return null;
    const adjusted = meridiem === 'PM' && hour < 12 ? hour + 12 : meridiem === 'AM' && hour === 12 ? 0 : hour;
    return adjusted * 60 + minute;
  }

  const twentyFourHourMatch = normalized.match(/^(\d{1,2}):(\d{2})$/);
  if (!twentyFourHourMatch) return null;

  const hour = Number(twentyFourHourMatch[1]);
  const minute = Number(twentyFourHourMatch[2]);
  if (Number.isNaN(hour) || Number.isNaN(minute) || hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

function formatMinuteLabel(totalMinutes: number): string {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const meridiem = hour24 < 12 ? 'AM' : 'PM';
  if (minute === 0) {
    return `${hour12} ${meridiem}`;
  }
  return `${hour12}:${String(minute).padStart(2, '0')} ${meridiem}`;
}

function formatDurationLabel(startMinutes: number, endMinutes: number): string {
  const duration = Math.max(0, endMinutes - startMinutes);
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
}

function buildEvents(employees: Employee[], start: Date, end: Date): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  for (const employee of employees) {
    for (let cursor = startOfDay(start); cursor <= end; cursor = addDays(cursor, 1)) {
      if (!isWeekday(cursor)) continue;

      const dateKey = toDateKey(cursor);

      if (employee.status === 'pto') {
        events.push({
          id: `${employee.id}-${dateKey}-pto`,
          employeeName: employee.name,
          dateKey,
          label: 'PTO',
          kind: 'pto',
          allDay: true,
        });
        continue;
      }

      if (!employee.scheduledStart || !employee.scheduledEnd) continue;

      const startMinutes = parseTimeToMinutes(employee.scheduledStart);
      const endMinutes = parseTimeToMinutes(employee.scheduledEnd);
      if (startMinutes === null || endMinutes === null || endMinutes <= startMinutes) continue;

      events.push({
        id: `${employee.id}-${dateKey}-shift`,
        employeeName: employee.name,
        dateKey,
        kind: 'shift',
        label: `${employee.scheduledStart}-${employee.scheduledEnd}`,
        startMinutes,
        endMinutes,
        allDay: false,
      });
    }
  }

  return events;
}

function getRange(anchorDate: Date, mode: CalendarMode): { start: Date; end: Date } {
  if (mode === 'day') {
    const start = startOfDay(anchorDate);
    return { start, end: start };
  }

  if (mode === 'week') {
    const start = startOfWeekSunday(anchorDate);
    return { start, end: addDays(start, 6) };
  }

  const monthStart = startOfMonth(anchorDate);
  const monthEnd = endOfMonth(anchorDate);
  return {
    start: startOfWeekSunday(monthStart),
    end: endOfWeekSaturday(monthEnd),
  };
}

function formatHeaderLabel(anchorDate: Date, mode: CalendarMode): string {
  if (mode === 'day') {
    return anchorDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  if (mode === 'month') {
    return anchorDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  const { start, end } = getRange(anchorDate, mode);
  const startLabel = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endLabel = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startLabel} - ${endLabel}`;
}

function shiftAnchorDate(anchorDate: Date, mode: CalendarMode, direction: -1 | 1): Date {
  if (mode === 'month') {
    return new Date(anchorDate.getFullYear(), anchorDate.getMonth() + direction, 1);
  }

  const days = mode === 'week' ? 7 : 1;
  return addDays(anchorDate, days * direction);
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarView() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<CalendarMode>('month');
  const [anchorDate, setAnchorDate] = useState(() => startOfDay(new Date()));

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      const result = await fetchEmployees();
      if (!mounted) return;
      setEmployees(result);
      setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const { start, end } = useMemo(() => getRange(anchorDate, mode), [anchorDate, mode]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    const events = buildEvents(employees, start, end);

    for (const event of events) {
      map.set(event.dateKey, [...(map.get(event.dateKey) ?? []), event]);
    }

    return map;
  }, [employees, start, end]);

  const days: DayCell[] = useMemo(() => {
    const cells: DayCell[] = [];
    const month = anchorDate.getMonth();

    for (let cursor = startOfDay(start); cursor <= end; cursor = addDays(cursor, 1)) {
      const key = toDateKey(cursor);
      cells.push({
        date: cursor,
        key,
        inCurrentMonth: mode !== 'month' || cursor.getMonth() === month,
        events: eventsByDay.get(key) ?? [],
      });
    }

    return cells;
  }, [anchorDate, end, eventsByDay, mode, start]);

  const title = formatHeaderLabel(anchorDate, mode);

  const timeGridStartMinutes = 5 * 60;
  const timeGridEndMinutes = 22 * 60;
  const pxPerHour = 56;
  const timeGridHeight = ((timeGridEndMinutes - timeGridStartMinutes) / 60) * pxPerHour;
  const hourTicks = Array.from({ length: (timeGridEndMinutes - timeGridStartMinutes) / 60 + 1 }, (_, index) => timeGridStartMinutes + index * 60);

  const dayHeaders = mode === 'day'
    ? [anchorDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })]
    : days.map((cell) => `${dayNames[cell.date.getDay()]} ${cell.date.getDate()}`);

  return (
    <div className="mt-4 rounded-[var(--radius-small)] bg-[var(--surface-neutral-white)] p-4" style={{ boxShadow: '2px 2px 0px 2px rgba(56, 49, 47, 0.05)' }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            className="h-9 rounded-full border border-[var(--border-neutral-medium)] px-3 text-sm"
            onClick={() => setAnchorDate((current) => shiftAnchorDate(current, mode, -1))}
          >
            Prev
          </button>
          <button
            className="h-9 rounded-full border border-[var(--border-neutral-medium)] px-3 text-sm"
            onClick={() => setAnchorDate(startOfDay(new Date()))}
          >
            Today
          </button>
          <button
            className="h-9 rounded-full border border-[var(--border-neutral-medium)] px-3 text-sm"
            onClick={() => setAnchorDate((current) => shiftAnchorDate(current, mode, 1))}
          >
            Next
          </button>
          <span className="ml-2 text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{title}</span>
        </div>

        <div className="inline-flex rounded-full border border-[var(--border-neutral-medium)] p-1">
          {([
            { key: 'month', label: 'Month' },
            { key: 'week', label: 'Week' },
            { key: 'day', label: 'Day' },
          ] as Array<{ key: CalendarMode; label: string }>).map((option) => (
            <button
              key={option.key}
              className={`rounded-full px-3 py-1 text-xs font-medium ${mode === option.key ? 'bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]' : 'text-[var(--text-neutral-medium)]'}`}
              onClick={() => setMode(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-[var(--text-neutral-medium)]">Loading schedules...</p>
      ) : mode === 'month' ? (
        <div className="mt-4 overflow-auto rounded-xl border border-[var(--border-neutral-x-weak)]">
          <div className="grid min-w-[980px]" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
            {dayNames.map((day) => (
              <div key={day} className="border-b border-r border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] px-2 py-2 text-xs font-semibold text-[var(--text-neutral-medium)] last:border-r-0">
                {day}
              </div>
            ))}

            {days.map((day) => {
              const visibleEvents = day.events.slice(0, 4);
              const hiddenCount = Math.max(0, day.events.length - visibleEvents.length);

              return (
                <div
                  key={day.key}
                  className={`min-h-[140px] border-r border-b border-[var(--border-neutral-x-weak)] px-2 py-2 last:border-r-0 ${day.inCurrentMonth ? 'bg-white' : 'bg-[var(--surface-neutral-xx-weak)]/50'}`}
                >
                  <p className={`text-xs font-semibold ${day.inCurrentMonth ? 'text-[var(--text-neutral-xx-strong)]' : 'text-[var(--text-neutral-weak)]'}`}>
                    {day.date.getDate()}
                  </p>

                  <div className="mt-2 space-y-1">
                    {visibleEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`rounded-md px-2 py-1 text-[11px] leading-[14px] ${event.kind === 'pto' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'}`}
                        title={`${event.employeeName} - ${event.label}`}
                      >
                        <span className="font-semibold">{event.employeeName.split(' ')[0]}</span>: {event.label}
                      </div>
                    ))}
                    {hiddenCount > 0 && (
                      <div className="text-[11px] font-medium text-[var(--text-neutral-medium)]">+{hiddenCount} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-4 overflow-auto rounded-xl border border-[var(--border-neutral-x-weak)]">
          <div className="min-w-[980px]">
            <div className="grid" style={{ gridTemplateColumns: `72px repeat(${dayHeaders.length}, minmax(0, 1fr))` }}>
              <div className="border-b border-r border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] px-2 py-2 text-[11px] font-semibold text-[var(--text-neutral-medium)]">
                All day
              </div>
              {dayHeaders.map((header, index) => (
                <div key={`${header}-${index}`} className="border-b border-r border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] px-2 py-2 text-xs font-semibold text-[var(--text-neutral-medium)] last:border-r-0">
                  {header}
                </div>
              ))}

              <div className="border-r border-[var(--border-neutral-x-weak)] bg-white" />
              {days.map((day) => {
                const allDayEvents = day.events.filter((event) => event.allDay).slice(0, 2);
                const extraCount = Math.max(0, day.events.filter((event) => event.allDay).length - allDayEvents.length);

                return (
                  <div key={`all-day-${day.key}`} className="border-r border-[var(--border-neutral-x-weak)] bg-white p-2 last:border-r-0">
                    <div className="space-y-1">
                      {allDayEvents.map((event) => (
                        <div key={event.id} className="rounded-md bg-sky-100 px-2 py-1 text-[11px] font-medium text-sky-800">
                          {event.employeeName.split(' ')[0]}: PTO
                        </div>
                      ))}
                      {extraCount > 0 && <div className="text-[11px] text-[var(--text-neutral-medium)]">+{extraCount} more</div>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid" style={{ gridTemplateColumns: `72px repeat(${dayHeaders.length}, minmax(0, 1fr))` }}>
              <div className="relative border-r border-[var(--border-neutral-x-weak)] bg-white" style={{ height: `${timeGridHeight}px` }}>
                {hourTicks.map((tick) => {
                  const top = ((tick - timeGridStartMinutes) / 60) * pxPerHour;
                  return (
                    <div key={`axis-${tick}`} className="absolute left-1 right-1" style={{ top: `${top}px` }}>
                      <span className="-translate-y-1/2 bg-white pr-1 text-[11px] text-[var(--text-neutral-medium)]">
                        {formatMinuteLabel(tick)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {days.map((day) => {
                const timedEvents = day.events
                  .filter((event) => !event.allDay && event.startMinutes !== undefined && event.endMinutes !== undefined)
                  .sort((a, b) => (a.startMinutes ?? 0) - (b.startMinutes ?? 0));

                return (
                  <div key={`timed-${day.key}`} className="relative border-r border-[var(--border-neutral-x-weak)] bg-white last:border-r-0" style={{ height: `${timeGridHeight}px` }}>
                    {hourTicks.map((tick) => {
                      const top = ((tick - timeGridStartMinutes) / 60) * pxPerHour;
                      return <div key={`line-${day.key}-${tick}`} className="absolute left-0 right-0 border-t border-[var(--border-neutral-x-weak)]/70" style={{ top: `${top}px` }} />;
                    })}

                    {timedEvents.map((event) => {
                      const startMinutes = Math.max(timeGridStartMinutes, event.startMinutes ?? timeGridStartMinutes);
                      const endMinutes = Math.min(timeGridEndMinutes, event.endMinutes ?? timeGridEndMinutes);
                      const top = ((startMinutes - timeGridStartMinutes) / 60) * pxPerHour;
                      const height = Math.max(28, ((endMinutes - startMinutes) / 60) * pxPerHour);

                      return (
                        <div
                          key={event.id}
                          className="absolute left-1 right-1 overflow-hidden rounded-lg border border-emerald-300 bg-emerald-100/90 px-2 py-1"
                          style={{ top: `${top}px`, height: `${height}px` }}
                          title={`${event.employeeName}: ${event.label}`}
                        >
                          <p className="truncate text-[11px] font-semibold text-emerald-900">{event.employeeName}</p>
                          <p className="truncate text-[10px] text-emerald-800">{event.label}</p>
                          {event.startMinutes !== undefined && event.endMinutes !== undefined && (
                            <p className="truncate text-[10px] text-emerald-800">{formatDurationLabel(event.startMinutes, event.endMinutes)}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;
