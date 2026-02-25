import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { HeaderCounts } from '../types';
import { Icon } from '../../../components';
import { Button } from '../../../components';

interface HeaderSummaryProps {
  counts: HeaderCounts;
  statusSentence: string;
  lastUpdated: string;
}

type CardAction = 'staffing' | 'alerts' | 'schedules' | 'allocation';

interface ActionConfig {
  title: string;
  details: string;
  cta: string;
  route: string;
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function HeaderSummary({ counts, statusSentence, lastUpdated }: HeaderSummaryProps) {
  const navigate = useNavigate();
  const [activeAction, setActiveAction] = useState<CardAction | null>(null);
  const [isEditingStaffingPlan, setIsEditingStaffingPlan] = useState(false);
  const [staffingPlanDraft, setStaffingPlanDraft] = useState(
    '1) Reassign Ben Proctor to start 1 hour earlier (7:00 AM instead of 8:00 AM) to cover front-desk demand.\n2) Ask Liam Carter to stay 1 extra hour at end of shift to close the late coverage gap.\n3) Keep Ronald Richards as backup floater from 4:00 PM - 6:00 PM if breaks run long.',
  );
  const [staffingDecisionMessage, setStaffingDecisionMessage] = useState<string | null>(null);
  const activeHeadcount = counts.clockedIn + counts.onBreak;
  const coverageConfidence = Math.max(68, Math.min(98, Math.round((counts.clockedIn / Math.max(activeHeadcount, 1)) * 100)));
  const complianceAlerts = Math.max(1, counts.onBreak);
  const overtimeEmployees = Math.max(1, counts.approachingOvertime);
  const projectAllocation = Math.max(72, Math.min(95, Math.round((counts.clockedIn / Math.max(counts.clockedIn + counts.clockedOutRecently, 1)) * 100)));
  const actionConfig: Record<CardAction, ActionConfig> = {
    staffing: {
      title: 'Staffing Plan',
      details: 'Open Time & Attendance to review staffing coverage by shift and make staffing updates.',
      cta: 'Open Time & Attendance',
      route: '/time-attendance',
    },
    alerts: {
      title: 'Compliance Alerts',
      details: 'Open Reports to review policy and compliance alert trends with filtering options.',
      cta: 'Open Reports',
      route: '/reports',
    },
    schedules: {
      title: 'Adjust Schedules',
      details: 'Open Time & Attendance to rebalance coverage and reduce projected overtime.',
      cta: 'Adjust in Time & Attendance',
      route: '/time-attendance',
    },
    allocation: {
      title: 'Project Allocation',
      details: 'Open Reports to view allocation performance and project distribution detail.',
      cta: 'Open Allocation Report',
      route: '/reports',
    },
  };
  const modalData = activeAction ? actionConfig[activeAction] : null;
  const openAction = (action: CardAction) => {
    setActiveAction(action);
    if (action === 'staffing') {
      setIsEditingStaffingPlan(false);
      setStaffingDecisionMessage(null);
    }
  };

  const closeModal = () => {
    setActiveAction(null);
    setIsEditingStaffingPlan(false);
  };

  const acceptStaffingPlan = () => {
    setStaffingDecisionMessage('Staffing plan accepted and queued for application.');
    closeModal();
  };

  return (
    <>
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
            onClick={() => openAction('staffing')}
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
            onClick={() => openAction('alerts')}
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
            onClick={() => openAction('schedules')}
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
            onClick={() => openAction('allocation')}
          >
            Open allocation
          </Button>
        </div>
      </header>

      {staffingDecisionMessage && (
        <div className="mt-3 rounded-[12px] border border-[#c8e7c8] bg-[#eef8ee] px-3 py-2 text-[13px] text-[#1f6f2a]">
          {staffingDecisionMessage}
        </div>
      )}

      {modalData && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/35 p-4" role="dialog" aria-modal="true" aria-label={modalData.title}>
          <div className="w-full max-w-[560px] rounded-[20px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[24px] leading-[30px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                  {modalData.title}
                </h3>
                {activeAction !== 'staffing' && <p className="mt-1 text-[14px] text-[var(--text-neutral-medium)]">{modalData.details}</p>}
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close action modal"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-neutral-medium)] hover:bg-[var(--surface-neutral-xx-weak)]"
              >
                <Icon name="xmark" size={14} />
              </button>
            </div>

            {activeAction === 'staffing' ? (
              <>
                <p className="mt-2 text-[14px] text-[var(--text-neutral-medium)]">
                  Suggested coverage adjustment for this shift window.
                </p>
                <div className="mt-3 rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-3">
                  <p className="text-[12px] font-semibold text-[var(--text-neutral-medium)]">Proposed Plan</p>
                  {!isEditingStaffingPlan ? (
                    <pre className="mt-2 whitespace-pre-wrap text-[13px] leading-[20px] text-[var(--text-neutral-strong)]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {staffingPlanDraft}
                    </pre>
                  ) : (
                    <textarea
                      value={staffingPlanDraft}
                      onChange={(e) => setStaffingPlanDraft(e.target.value)}
                      className="mt-2 h-[140px] w-full resize-none rounded-[10px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] p-3 text-[13px] leading-[20px] text-[var(--text-neutral-strong)] outline-none"
                    />
                  )}
                </div>

                <div className="mt-5 flex flex-wrap justify-end gap-2">
                  <Button
                    size="small"
                    variant="standard"
                    onClick={() => {
                      setStaffingDecisionMessage('Suggested staffing plan ignored.');
                      closeModal();
                    }}
                  >
                    Ignore
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      if (!isEditingStaffingPlan) {
                        setIsEditingStaffingPlan(true);
                        return;
                      }
                      acceptStaffingPlan();
                    }}
                  >
                    {isEditingStaffingPlan ? 'Accept Edited Plan' : 'Edit & Accept'}
                  </Button>
                  <Button size="small" variant="primary" onClick={acceptStaffingPlan}>
                    Accept
                  </Button>
                </div>
              </>
            ) : (
              <div className="mt-5 flex justify-end gap-2">
                <Button size="small" variant="standard" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="primary"
                  onClick={() => {
                    navigate(modalData.route);
                    closeModal();
                  }}
                >
                  {modalData.cta}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderSummary;
