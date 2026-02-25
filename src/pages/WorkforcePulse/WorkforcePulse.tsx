import { useState } from 'react';
import { useWorkforcePulseLive } from './hooks/useWorkforcePulseLive';
import { HeaderSummary } from './components/HeaderSummary';
import { SearchInput } from './components/SearchInput';
import { PeopleTab } from './components/PeopleTab';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { EmployeeDetailsModal } from './components/EmployeeDetailsModal';
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
              <h3 className="text-[20px] leading-[28px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                People
              </h3>
              <SearchInput value={search} onChange={setSearch} ariaLabel="Search direct reports" />
            </div>
            <PeopleTab
              employees={live.employees}
              search={search}
              onEmployeeSelect={setSelectedEmployee}
              className="mt-3 rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4"
            />
          </div>

          <AIInsightsPanel exceptions={live.exceptions} counts={live.counts} lastUpdated={live.lastUpdated} />
        </div>
      </section>

      <EmployeeDetailsModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
    </div>
  );
}

export default WorkforcePulse;
