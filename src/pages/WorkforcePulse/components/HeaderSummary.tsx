import type { HeaderCounts } from '../types';
import { Icon } from '../../../components';
import { Button } from '../../../components';

interface HeaderSummaryProps {
  counts: HeaderCounts;
  statusSentence: string;
  lastUpdated: string;
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function HeaderSummary({ counts, statusSentence, lastUpdated }: HeaderSummaryProps) {
  const activeHeadcount = counts.clockedIn + counts.onBreak;
  const coverageConfidence = Math.max(68, Math.min(98, Math.round((counts.clockedIn / Math.max(activeHeadcount, 1)) * 100)));
  const complianceAlerts = Math.max(1, counts.onBreak);
  const overtimeEmployees = Math.max(1, counts.approachingOvertime);
  const projectAllocation = Math.max(72, Math.min(95, Math.round((counts.clockedIn / Math.max(counts.clockedIn + counts.clockedOutRecently, 1)) * 100)));

  return (
    <header className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-[20px] border border-[#d8e2d8] bg-[#f4f6f4] p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#e4ebe4] text-[#2f7d20]">
            <Icon name="bullseye" size={16} />
          </span>
          <span className="rounded-[999px] bg-[#e4ebe4] px-3 py-1 text-[12px] font-semibold text-[#2f7d20]">
            Excellent
          </span>
        </div>
        <p className="mt-4 text-[38px] leading-[38px] font-semibold text-[#2f7d20]">{coverageConfidence}<span className="ml-1 text-[24px] text-[#6f6c69]">%</span></p>
        <p className="mt-2 text-[24px] font-semibold text-[#3f3b39]">Coverage Confidence</p>
        <p className="mt-1 text-[14px] text-[#6f6c69]">{statusSentence}</p>
        <Button
          size="small"
          variant="outlined"
          className="mt-4 border-[#2f7d20] text-[#2f7d20] hover:bg-[#e4ebe4]"
          icon="users"
        >
          View staffing plan
        </Button>
      </div>

      <div className="rounded-[20px] border border-[#f3dac0] bg-[#faf7f3] p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#f4e7d8] text-[#f08f00]">
            <Icon name="temperature-half" size={16} />
          </span>
          <span className="rounded-[999px] bg-[#f4e7d8] px-3 py-1 text-[12px] font-semibold text-[#f08f00]">
            Monitor
          </span>
        </div>
        <p className="mt-4 text-[38px] leading-[38px] font-semibold text-[#eb980f]">{complianceAlerts}<span className="ml-2 text-[24px] text-[#6f6c69]">alerts</span></p>
        <p className="mt-2 text-[24px] font-semibold text-[#3f3b39]">Compliance Risk</p>
        <p className="mt-1 text-[14px] text-[#6f6c69]">Last checked at {formatTimestamp(lastUpdated)}</p>
        <Button
          size="small"
          variant="outlined"
          className="mt-4 border-[#eb980f] text-[#eb980f] hover:bg-[#f4e7d8]"
          icon="clipboard"
        >
          Review alerts
        </Button>
      </div>

      <div className="rounded-[20px] border border-[#f3d8dc] bg-[#faf5f6] p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#f6e2e5] text-[#ef4444]">
            <Icon name="clock" size={16} />
          </span>
          <span className="rounded-[999px] bg-[#f6e2e5] px-3 py-1 text-[12px] font-semibold text-[#ef4444]">
            High Risk
          </span>
        </div>
        <p className="mt-4 text-[38px] leading-[38px] font-semibold text-[#ef4444]">{overtimeEmployees}<span className="ml-2 text-[24px] text-[#6f6c69]">employees</span></p>
        <p className="mt-2 text-[24px] font-semibold text-[#3f3b39]">Overtime Forecast</p>
        <p className="mt-1 text-[14px] text-[#6f6c69]">Trending toward overtime this week</p>
        <Button
          size="small"
          variant="outlined"
          className="mt-4 border-[#ef4444] text-[#ef4444] hover:bg-[#f6e2e5]"
          icon="calendar-clock"
        >
          Adjust schedules
        </Button>
      </div>

      <div className="rounded-[20px] border border-[#d8e6f8] bg-[#f2f7fc] p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#e1eaf8] text-[#3b82f6]">
            <Icon name="chart-line" size={16} />
          </span>
          <span className="rounded-[999px] bg-[#e1eaf8] px-3 py-1 text-[12px] font-semibold text-[#2f6fda]">
            On Track
          </span>
        </div>
        <p className="mt-4 text-[38px] leading-[38px] font-semibold text-[#3b82f6]">{projectAllocation}<span className="ml-1 text-[24px] text-[#6f6c69]">%</span></p>
        <p className="mt-2 text-[24px] font-semibold text-[#3f3b39]">Project Allocation</p>
        <p className="mt-1 text-[14px] text-[#6f6c69]">Current staffing allocation is on pace</p>
        <Button
          size="small"
          variant="outlined"
          className="mt-4 border-[#3b82f6] text-[#2f6fda] hover:bg-[#e1eaf8]"
          icon="chart-line"
        >
          Open allocation
        </Button>
      </div>
    </header>
  );
}

export default HeaderSummary;
