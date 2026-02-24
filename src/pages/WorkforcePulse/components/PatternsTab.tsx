import type { OrgSettings } from '../types';

interface PatternsTabProps {
  settings: OrgSettings;
}

function InsightBlock({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
      <p className="text-[13px] text-[var(--text-neutral-medium)]">{title}</p>
      <p className="mt-1 text-[24px] leading-[30px] font-semibold text-[var(--text-neutral-xx-strong)]">{value}</p>
      <div className="mt-3 h-2 rounded-[1000px] bg-[var(--surface-neutral-x-weak)]">
        <div className="h-full w-2/3 rounded-[1000px] bg-[var(--color-primary-strong)]" />
      </div>
      <p className="mt-2 text-[12px] text-[var(--text-neutral-medium)]">{detail}</p>
    </div>
  );
}

export function PatternsTab({ settings }: PatternsTabProps) {
  return (
    <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <InsightBlock title="Overtime velocity trend" value="+12%" detail="Risk velocity rising over last 7 days" />
      <InsightBlock title="Behavior drift count" value="9" detail="Start-window and break deviations this week" />
      <InsightBlock title="Time integrity health" value="86%" detail="Unassigned time + edit stability" />

      {settings.schedulingEnabled && (
        <>
          <InsightBlock title="Late/absence signal" value="4" detail="Late-vs-schedule anomalies today" />
          <InsightBlock title="Coverage pressure" value="Moderate" detail="Projected risk windows in afternoon" />
        </>
      )}
    </section>
  );
}

export default PatternsTab;
