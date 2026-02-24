import { useMemo, useState } from 'react';
import type { WorkforceException } from './types';
import { useWorkforcePulseLive } from './hooks/useWorkforcePulseLive';
import { HeaderSummary } from './components/HeaderSummary';
import { ExceptionFeed } from './components/ExceptionFeed';
import { DrawerDetails } from './components/DrawerDetails';
import { SearchInput } from './components/SearchInput';
import { PeopleTab } from './components/PeopleTab';
import { PatternsTab } from './components/PatternsTab';

function snoozeMs(duration: '30m' | '2h' | 'today') {
  if (duration === '30m') return 30 * 60 * 1000;
  if (duration === '2h') return 2 * 60 * 60 * 1000;
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end.getTime() - Date.now();
}

interface WorkforcePulseProps {
  embedded?: boolean;
}

export function WorkforcePulse({ embedded = false }: WorkforcePulseProps) {
  const live = useWorkforcePulseLive();
  const [selectedException, setSelectedException] = useState<WorkforceException | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(() => new Set());
  const [snoozedUntil, setSnoozedUntil] = useState<Record<string, number>>({});
  const [search, setSearch] = useState('');

  const visibleExceptions = useMemo(() => {
    const now = Date.now();
    return live.exceptions.filter((item) => !dismissed.has(item.id) && (!snoozedUntil[item.id] || snoozedUntil[item.id] < now));
  }, [live.exceptions, dismissed, snoozedUntil]);

  const selectedEmployee = selectedException
    ? live.employees.find((e) => e.id === selectedException.employee.id) ?? null
    : null;

  const handlePrimaryAction = (exception: WorkforceException) => {
    // TODO: call backend action endpoint for primary manager action.
    setSelectedException(exception);
  };

  const handleSecondaryAction = (exception: WorkforceException) => {
    // TODO: call backend action endpoint for secondary manager action.
    setSelectedException(exception);
  };

  const handleSnooze = (exception: WorkforceException, duration: '30m' | '2h' | 'today') => {
    setSnoozedUntil((prev) => ({ ...prev, [exception.id]: Date.now() + snoozeMs(duration) }));
  };

  const handleDismiss = (exception: WorkforceException) => {
    setDismissed((prev) => new Set(prev).add(exception.id));
  };

  return (
    <div className={embedded ? '' : 'min-h-full bg-[var(--surface-neutral-xx-weak)] p-8'}>
      <HeaderSummary
        counts={live.counts}
        statusSentence={live.statusSentence}
        lastUpdated={live.lastUpdated}
      />

      <section className="mt-4">
        <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
          <div className="rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                People
              </h3>
              <SearchInput value={search} onChange={setSearch} ariaLabel="Search direct reports" />
            </div>
            <PeopleTab
              employees={live.employees}
              search={search}
              className="mt-3 rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4"
            />
          </div>

          <div className="rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
            <div className="max-h-[620px] overflow-auto pr-1">
              <ExceptionFeed
                compact
                exceptions={visibleExceptions}
                onPrimaryAction={handlePrimaryAction}
                onSecondaryAction={handleSecondaryAction}
                onSnooze={handleSnooze}
                onDismiss={handleDismiss}
                onViewDetails={setSelectedException}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
          <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
            Patterns
          </h3>
          <PatternsTab settings={live.settings} />
          </div>
      </section>

      <DrawerDetails
        exception={selectedException}
        employee={selectedEmployee}
        settings={live.settings}
        onClose={() => setSelectedException(null)}
      />
    </div>
  );
}

export default WorkforcePulse;
