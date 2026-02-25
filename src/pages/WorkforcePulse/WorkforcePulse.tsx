import { useState } from 'react';
import { useWorkforcePulseLive } from './hooks/useWorkforcePulseLive';
import { HeaderSummary } from './components/HeaderSummary';
import { SearchInput } from './components/SearchInput';
import { PeopleTab } from './components/PeopleTab';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { EmployeeDetailsModal } from './components/EmployeeDetailsModal';
import { TimeOffRequestsPanel } from './components/TimeOffRequestsPanel';
import type { EmployeeRecord } from './types';

interface WorkforcePulseProps {
  embedded?: boolean;
}

export function WorkforcePulse({ embedded = false }: WorkforcePulseProps) {
  const live = useWorkforcePulseLive();
  const [search, setSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null);

  return (
    <div className={embedded ? '' : 'min-h-full bg-[var(--surface-neutral-xx-weak)] p-8'}>
      <HeaderSummary
        counts={live.counts}
        statusSentence={live.statusSentence}
        lastUpdated={live.lastUpdated}
      />

      <section className="mt-4">
        <div className="grid gap-4 xl:grid-cols-[3fr_1fr]">
          <div className="rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                  People
                </h3>
                <span className="inline-flex items-center gap-1 rounded-[1000px] bg-[var(--color-primary-weak)] px-2 py-1 text-[12px] font-semibold text-[var(--color-primary-strong)]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-primary-strong)]" />
                  Live {new Date(live.lastUpdated).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </span>
              </div>
              <SearchInput value={search} onChange={setSearch} ariaLabel="Search direct reports" />
            </div>
            <PeopleTab
              employees={live.employees}
              search={search}
              onEmployeeSelect={setSelectedEmployee}
              className="mt-3 bg-[var(--surface-neutral-white)]"
            />
          </div>

          <div className="space-y-4">
            <AIInsightsPanel exceptions={live.exceptions} counts={live.counts} lastUpdated={live.lastUpdated} />
            <TimeOffRequestsPanel />
          </div>
        </div>
      </section>

      <EmployeeDetailsModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
    </div>
  );
}

export default WorkforcePulse;
