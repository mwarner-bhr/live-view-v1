import { useState } from 'react';
import type { Insight } from '../../types/managerLiveView';

interface InsightCardProps {
  insight: Insight;
}

function actionLabel(action: Insight['suggestedActions'][number]): string {
  if (action === 'send_reminder') return 'Send reminder';
  if (action === 'schedule_1_1') return 'Schedule 1:1';
  if (action === 'add_private_note') return 'Add private note';
  return 'Escalate to HR';
}

const trendClassMap: Record<Insight['trend'], string> = {
  worsening: 'text-rose-700 bg-rose-100',
  improving: 'text-emerald-700 bg-emerald-100',
  stable: 'text-slate-700 bg-slate-100',
};

export function InsightCard({ insight }: InsightCardProps) {
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);

  return (
    <article className="rounded-2xl border border-[var(--border-neutral-x-weak)] bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{insight.summary}</p>
        <span className={`rounded-full px-2 py-1 text-[11px] font-semibold capitalize ${trendClassMap[insight.trend]}`}>
          {insight.trend}
        </span>
      </div>

      <p className="mt-2 text-xs text-[var(--text-neutral-medium)]">{insight.impactNote}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {insight.suggestedActions.map((action) => (
          <button
            key={action}
            className="rounded-lg border border-[var(--border-neutral-medium)] px-2 py-1 text-[11px] font-medium"
          >
            {actionLabel(action)}
          </button>
        ))}
      </div>

      <button
        className="mt-3 text-xs font-semibold text-[var(--color-primary-medium)]"
        onClick={() => setIsEvidenceOpen((current) => !current)}
      >
        View evidence
      </button>

      {isEvidenceOpen && (
        <ul className="mt-2 space-y-1 text-xs text-[var(--text-neutral-medium)]">
          {insight.evidence.map((item) => (
            <li key={`${insight.id}-${item.date}-${item.note}`}>{item.date}: {item.note}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
