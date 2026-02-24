import { useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';

type TimesheetState = 'pre-shift' | 'clocked-in' | 'on-break';

export function Timesheet() {
  const [timesheetState, setTimesheetState] = useState<TimesheetState>('pre-shift');

  return (
    <section
      className="flex flex-col bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-small)] overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-300)',
        minHeight: timesheetState === 'on-break' ? '440px' : timesheetState === 'clocked-in' ? '375px' : '302px',
      }}
    >
      <header className="flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <Icon name="stopwatch" size={20} className="text-[var(--icon-neutral-x-strong)]" />
          <h3
            className="font-semibold text-[18px] leading-[24px] text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            My Time
          </h3>
        </div>
        <div className="h-px bg-[var(--border-neutral-x-weak)]" />
      </header>

      {timesheetState === 'on-break' ? (
        <div className="flex flex-1 flex-col items-center px-6 pt-5 pb-6">
          <p className="text-[16px] leading-[24px] font-semibold text-[var(--text-neutral-strong)]">Rest Break</p>

          <div
            className="mt-4 relative flex h-44 w-44 items-center justify-center rounded-full"
            style={{
              background:
                'conic-gradient(from 200deg, #1d6f13 0deg, #3f8d34 120deg, #70ac61 200deg, #bebbb8 200deg, #bebbb8 360deg)',
            }}
          >
            <div className="h-[158px] w-[158px] rounded-full bg-[var(--surface-neutral-white)]" />
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-primary-strong)]">
              <Icon name="mug-hot" size={72} />
            </div>
          </div>

          <p
            className="mt-4 text-[32px] leading-[38px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
          >
            8 min
          </p>
          <p className="mt-2 text-[15px] leading-[22px] text-[var(--color-primary-strong)]">Break ends at 10:45am</p>

          <Button
            variant="primary"
            icon="circle"
            className="mt-5 w-full justify-center"
            onClick={() => setTimesheetState('clocked-in')}
          >
            End Break
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center px-6 pt-6 pb-6">
          {timesheetState === 'clocked-in' ? (
            <>
              <div className="flex items-end gap-2">
                <Icon name="stopwatch" size={20} className="text-[var(--color-primary-strong)]" />
                <p
                  className="font-semibold text-[32px] leading-[38px] text-[var(--color-primary-strong)]"
                  style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
                >
                  2h 45m
                </p>
                <button className="text-[15px] leading-[22px] font-medium text-[#0b4fd1] cursor-pointer">
                  Edit
                </button>
              </div>

              <p className="mt-3 text-center text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">
                {'{Project Name} » {Task Name}'}
                <br />
                Shift Ends at 5:00PM (Front Desk)
              </p>

              <div className="mt-4 flex w-full items-center gap-2">
                <Button
                  variant="primary"
                  icon="face-smile"
                  className="flex-1 whitespace-nowrap"
                  onClick={() => setTimesheetState('on-break')}
                >
                  Take A Break
                </Button>
                <Button variant="outlined" icon="circle" className="flex-1 whitespace-nowrap">
                  Clock Out of Shift
                </Button>
              </div>

              <div className="mt-6 w-full">
                <p className="text-[13px] leading-[19px] font-semibold text-[var(--text-neutral-medium)]">Breaks</p>
                <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">
                  Lunch Break - Available in 2h 15m
                </p>
              </div>
            </>
          ) : (
            <>
              <p
                className="font-semibold text-[32px] leading-[38px] text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
              >
                0h 00m Today
              </p>
              <p className="mt-3 text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">
                Today • 8:00AM–5:00PM (Front Desk)
              </p>

              <div className="mt-4 flex w-full items-center gap-2">
                <Button
                  variant="primary"
                  icon="stopwatch"
                  className="flex-1 whitespace-nowrap"
                  onClick={() => setTimesheetState('clocked-in')}
                >
                  Start My Shift
                </Button>
                <Button variant="outlined" className="px-4" aria-label="More time actions">
                  <Icon name="caret-down" size={10} style={{ color: 'var(--color-primary-strong)' }} />
                </Button>
              </div>
            </>
          )}

          <div className="mt-6 h-px w-full bg-[var(--border-neutral-x-weak)]" />

          <div className="mt-4 flex w-full flex-wrap items-end gap-4">
            <div className="flex flex-wrap items-start gap-8">
              <div>
                <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">This Week</p>
                <p className="text-[13px] leading-[19px] font-bold text-[var(--text-neutral-medium)]">24h 20m</p>
              </div>
              <div>
                <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">Pay Period</p>
                <p className="text-[13px] leading-[19px] font-bold text-[var(--text-neutral-medium)]">24h 20m</p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="standard" size="small">Schedule</Button>
              <Button variant="standard" size="small">Timesheet</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Timesheet;
