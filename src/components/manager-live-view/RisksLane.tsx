import type { Insight } from '../../types/managerLiveView';
import { InsightCard } from './InsightCard';

interface RisksLaneProps {
  insights: Insight[];
  showRisks: boolean;
}

const trendOrder: Record<Insight['trend'], number> = {
  worsening: 0,
  stable: 1,
  improving: 2,
};

export function RisksLane({ insights, showRisks }: RisksLaneProps) {
  if (!showRisks) return null;

  const sortedInsights = [...insights].sort((a, b) => trendOrder[a.trend] - trendOrder[b.trend]);

  return (
    <section className="rounded-2xl border border-[var(--border-neutral-x-weak)] bg-white p-4">
      <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">Risks (Pattern recognition)</h2>
      <div className="mt-3 space-y-2">
        {sortedInsights.length === 0 && <p className="text-xs text-[var(--text-neutral-medium)]">No risks detected.</p>}
        {sortedInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </section>
  );
}
