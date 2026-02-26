import { Button, Icon } from '../../../components';
import type { HeaderCounts, WorkforceException } from '../types';

interface AIInsightsPanelProps {
  exceptions: WorkforceException[];
  counts: HeaderCounts;
  lastUpdated: string;
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

const CHAT_SEEDED_PROMPT_KEY = 'bhr-chat-seeded-prompt';
const CHAT_SEEDED_PROMPT_EVENT = 'bhr-chat-seeded-prompt';
const CHAT_SEEDED_AUTO_SEND_KEY = 'bhr-chat-seeded-auto-send';

interface InsightShortcut {
  id: string;
  text: string;
  prompt: string;
}

function summarizeInsight(exception: WorkforceException): InsightShortcut {
  if (exception.type === 'OVERTIME_RISK') {
    return {
      id: exception.id,
      text: `${exception.employee.name} may hit overtime soon.`,
      prompt: `Review overtime risk for ${exception.employee.name}. Suggest 2 scheduling adjustments for today and explain tradeoffs.`,
    };
  }
  if (exception.type === 'BREAK_RISK') {
    return {
      id: exception.id,
      text: `${exception.employee.name} is trending over break allowance.`,
      prompt: `Analyze break compliance risk for ${exception.employee.name} and recommend a manager action plan for the next 2 hours.`,
    };
  }
  if (exception.type === 'LATE_VS_SCHEDULE') {
    return {
      id: exception.id,
      text: `${exception.employee.name} missed scheduled start window.`,
      prompt: `Create a coverage recovery plan for a missed shift start by ${exception.employee.name}, with immediate and backup actions.`,
    };
  }
  if (exception.type === 'PRESENCE_CONFIDENCE') {
    return {
      id: exception.id,
      text: `Clock-in confidence is low for ${exception.employee.name}.`,
      prompt: `Investigate low clock-in confidence for ${exception.employee.name} and list verification steps with priority order.`,
    };
  }
  if (exception.type === 'TIME_INTEGRITY') {
    return {
      id: exception.id,
      text: `${exception.employee.name} has timecard integrity flags.`,
      prompt: `Summarize timecard integrity issues for ${exception.employee.name} and propose a corrective workflow for the manager.`,
    };
  }
  return {
    id: exception.id,
    text: exception.summary,
    prompt: `Provide manager guidance for this workforce signal: ${exception.summary}`,
  };
}

function openAskAI(prompt: string, autoSend = false) {
  localStorage.setItem(CHAT_SEEDED_PROMPT_KEY, prompt);
  localStorage.setItem(CHAT_SEEDED_AUTO_SEND_KEY, autoSend ? 'true' : 'false');
  window.dispatchEvent(new Event(CHAT_SEEDED_PROMPT_EVENT));
  localStorage.setItem('bhr-chat-expanded', 'false');
  localStorage.setItem('bhr-chat-panel-open', 'true');
}

export function AIInsightsPanel({ exceptions, counts, lastUpdated }: AIInsightsPanelProps) {
  const topInsights = exceptions.slice(0, 3).map(summarizeInsight);
  const coverageHeadcount = counts.clockedIn + counts.onBreak;

  return (
    <aside className="rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
      <div className="flex items-center justify-between gap-2">
        <h3
          className="text-[20px] leading-[28px] font-semibold text-[var(--color-primary-strong)]"
          style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
        >
          AI Insights
        </h3>
        <span className="inline-flex items-center gap-1 rounded-[1000px] bg-[var(--color-primary-weak)] px-2 py-1 text-[12px] font-semibold text-[var(--color-primary-strong)]">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-primary-strong)]" />
          Live
        </span>
      </div>

      <p className="mt-2 text-[13px] text-[var(--text-neutral-medium)]">
        Auto-summary based on active team signals. Updated {formatTimestamp(lastUpdated)}.
      </p>

      <div className="mt-4 rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-3">
        <p className="text-[13px] font-semibold text-[var(--text-neutral-xx-strong)]">Snapshot</p>
        <p className="mt-1 text-[13px] text-[var(--text-neutral-medium)]">
          {coverageHeadcount} active today, {counts.onBreak} on break, {counts.approachingOvertime} near overtime.
        </p>
      </div>

      <ul className="mt-4 space-y-2">
        {topInsights.length === 0 && (
          <li className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-3 text-[13px] text-[var(--text-neutral-medium)]">
            No urgent signals detected. Team activity is stable right now.
          </li>
        )}
        {topInsights.map((insight) => (
          <li key={insight.id}>
            <button
              type="button"
              onClick={() => openAskAI(insight.prompt, true)}
              className="flex w-full items-start gap-2 rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-3 text-left hover:bg-[var(--surface-neutral-xx-weak)]"
            >
              <Icon name="sparkles" size={14} className="mt-0.5 text-[var(--color-primary-strong)]" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-[18px] text-[var(--text-neutral-strong)]">{insight.text}</p>
                <p className="mt-1 text-[12px] font-medium text-[var(--color-primary-strong)]">Ask AI for recommendations</p>
              </div>
              <Icon name="chevron-right" size={12} className="mt-0.5 text-[var(--icon-neutral-medium)]" />
            </button>
          </li>
        ))}
      </ul>

      <Button
        variant="primary"
        size="small"
        className="mt-4 w-full"
        icon="sparkles"
        onClick={() => openAskAI('Summarize current team status and give the top 3 manager actions for the next shift window.')}
      >
        Ask AI About Team Status
      </Button>
    </aside>
  );
}

export default AIInsightsPanel;
