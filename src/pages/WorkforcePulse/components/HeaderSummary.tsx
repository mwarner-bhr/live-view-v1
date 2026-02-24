import type { HeaderCounts } from '../types';

interface HeaderSummaryProps {
  counts: HeaderCounts;
  statusSentence: string;
  lastUpdated: string;
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function HeaderSummary({ counts, statusSentence, lastUpdated }: HeaderSummaryProps) {
  return (
    <header
      className="rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6"
      style={{ boxShadow: 'var(--shadow-300)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3
          className="m-0 text-[var(--color-primary-strong)]"
          style={{ fontFamily: 'Fields, system-ui, sans-serif', fontWeight: 700, fontSize: '28px', lineHeight: '36px' }}
        >
          Workforce Now
        </h3>
        <div className="flex items-center gap-2 text-[13px] text-[var(--text-neutral-medium)]">
          <span className="inline-flex items-center gap-1 rounded-[1000px] bg-[var(--color-primary-weak)] px-2 py-1 text-[12px] font-semibold text-[var(--color-primary-strong)]">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-primary-strong)]" />
            Live
          </span>
          <span>Last updated: {formatTimestamp(lastUpdated)}</span>
        </div>
      </div>

      <p className="mt-1 text-[15px] font-medium text-[var(--text-neutral-xx-strong)]">{statusSentence}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-[12px] bg-[var(--surface-neutral-xx-weak)] p-3">
          <p className="text-[12px] text-[var(--text-neutral-medium)]">Clocked in</p>
          <p className="text-[24px] leading-[30px] font-semibold text-[var(--text-neutral-xx-strong)]">{counts.clockedIn}</p>
        </div>
        <div className="rounded-[12px] bg-[var(--surface-neutral-xx-weak)] p-3">
          <p className="text-[12px] text-[var(--text-neutral-medium)]">On break</p>
          <p className="text-[24px] leading-[30px] font-semibold text-[var(--text-neutral-xx-strong)]">{counts.onBreak}</p>
        </div>
        <div className="rounded-[12px] bg-[var(--surface-neutral-xx-weak)] p-3">
          <p className="text-[12px] text-[var(--text-neutral-medium)]">Clocked out recently</p>
          <p className="text-[24px] leading-[30px] font-semibold text-[var(--text-neutral-xx-strong)]">{counts.clockedOutRecently}</p>
        </div>
        <div className="rounded-[12px] bg-[var(--surface-neutral-xx-weak)] p-3">
          <p className="text-[12px] text-[var(--text-neutral-medium)]">Approaching overtime</p>
          <p className="text-[24px] leading-[30px] font-semibold text-[var(--text-neutral-xx-strong)]">{counts.approachingOvertime}</p>
        </div>
      </div>
    </header>
  );
}

export default HeaderSummary;
