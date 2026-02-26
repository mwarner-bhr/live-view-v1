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

interface ComplianceAlertItem {
  id: string;
  title: string;
  summary: string;
  actions: Array<{
    label: string;
    outcome: string;
  }>;
}

interface ProjectAllocationItem {
  id: string;
  project: string;
  loggedHours: number;
}

interface StaffingIssueItem {
  id: string;
  severity: 'High' | 'Medium';
  title: string;
  summary: string;
  actions: Array<{
    label: string;
    outcome: string;
  }>;
}

interface ScheduleActionItem {
  id: string;
  title: string;
  summary: string;
  actions: Array<{
    label: string;
    outcome: string;
  }>;
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
  const [staffingDecisionMessage, setStaffingDecisionMessage] = useState<string | null>(null);
  const [alertDecisionMessage, setAlertDecisionMessage] = useState<string | null>(null);
  const [scheduleDecisionMessage, setScheduleDecisionMessage] = useState<string | null>(null);
  const activeHeadcount = counts.clockedIn + counts.onBreak;
  const coverageConfidence = Math.max(68, Math.min(98, Math.round((counts.clockedIn / Math.max(activeHeadcount, 1)) * 100)));
  const complianceAlerts = Math.max(1, counts.onBreak);
  const overtimeEmployees = Math.max(1, counts.approachingOvertime);
  const projectAllocation = Math.max(72, Math.min(95, Math.round((counts.clockedIn / Math.max(counts.clockedIn + counts.clockedOutRecently, 1)) * 100)));
  const complianceAlertsList: ComplianceAlertItem[] = [
    {
      id: 'ca-1',
      title: 'Break violation risk at 12:45 PM',
      summary: 'Alicia Brown is 14 minutes over expected break duration.',
      actions: [
        { label: 'Send Return Reminder', outcome: 'Reminder sent to Alicia Brown to return from break now.' },
        { label: 'Approve Exception', outcome: 'Break exception approved and logged for today.' },
      ],
    },
    {
      id: 'ca-2',
      title: 'Missed meal window',
      summary: 'Ben Proctor is nearing meal-window compliance threshold.',
      actions: [
        { label: 'Reassign Coverage', outcome: 'Coverage reassigned so Ben can take meal break immediately.' },
        { label: 'Message Manager', outcome: 'Manager notified to resolve meal-window risk this shift.' },
      ],
    },
  ];
  const projectAllocationBreakdown: ProjectAllocationItem[] = [
    { id: 'pa-1', project: 'Community Care', loggedHours: 86 },
    { id: 'pa-2', project: 'Member Support', loggedHours: 54 },
    { id: 'pa-3', project: 'Implementation', loggedHours: 38 },
    { id: 'pa-4', project: 'Internal Training', loggedHours: 22 },
  ];
  const totalProjectHours = projectAllocationBreakdown.reduce((sum, item) => sum + item.loggedHours, 0);
  const staffingIssues: StaffingIssueItem[] = [
    {
      id: 'si-1',
      severity: 'High',
      title: 'Front desk under-covered from 8:00 AM - 10:00 AM',
      summary: 'Ben Proctor starts too late for expected morning check-ins.',
      actions: [
        { label: 'Move Ben Earlier', outcome: 'Ben Proctor reassigned to start at 7:00 AM today.' },
        { label: 'Assign Backup Coverage', outcome: 'Backup associate assigned to front desk for 8:00 AM - 10:00 AM.' },
      ],
    },
    {
      id: 'si-2',
      severity: 'Medium',
      title: 'Late-shift coverage gap at 5:00 PM',
      summary: 'Liam Carter is the best fit to extend coverage based on current load.',
      actions: [
        { label: 'Extend Liam +1h', outcome: 'Liam Carter extended by 1 hour for end-of-day coverage.' },
        { label: 'Split Final Hour', outcome: 'Final hour split across two team members to avoid overtime concentration.' },
      ],
    },
    {
      id: 'si-3',
      severity: 'Medium',
      title: 'Break overlap risk from 12:30 PM - 1:00 PM',
      summary: 'Two associates are scheduled to break at the same time on the same function.',
      actions: [
        { label: 'Stagger Breaks', outcome: 'Break schedule staggered to maintain minimum staffing.' },
        { label: 'Keep As Is', outcome: 'No change applied. Risk accepted for this shift window.' },
      ],
    },
  ];
  const scheduleActions: ScheduleActionItem[] = [
    {
      id: 'sa-1',
      title: 'Overtime risk for Ben Proctor by end of shift',
      summary: 'Current pace indicates Ben may exceed threshold in final hour.',
      actions: [
        { label: 'End Shift 1h Earlier', outcome: "Ben Proctor's shift adjusted to end 1 hour earlier." },
        { label: 'Reassign Final Hour', outcome: 'Final hour reassigned to a backup associate.' },
      ],
    },
    {
      id: 'sa-2',
      title: 'Coverage dip expected from 3:00 PM - 4:00 PM',
      summary: 'Break overlap and stagger mismatch on front desk support.',
      actions: [
        { label: 'Stagger Break Times', outcome: 'Break windows staggered to maintain desk coverage.' },
        { label: 'Move Start Time Earlier', outcome: 'One afternoon start moved earlier to reduce the gap.' },
      ],
    },
  ];
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
      setStaffingDecisionMessage(null);
    }
    if (action === 'alerts') {
      setAlertDecisionMessage(null);
    }
    if (action === 'schedules') {
      setScheduleDecisionMessage(null);
    }
  };

  const closeModal = () => {
    setActiveAction(null);
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
      {alertDecisionMessage && (
        <div className="mt-3 rounded-[12px] border border-[#c8d9f0] bg-[#eef4fb] px-3 py-2 text-[13px] text-[#1e4a7a]">
          {alertDecisionMessage}
        </div>
      )}
      {scheduleDecisionMessage && (
        <div className="mt-3 rounded-[12px] border border-[#f3d8dc] bg-[#fff1f3] px-3 py-2 text-[13px] text-[#9f1239]">
          {scheduleDecisionMessage}
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
                  The following staffing issues need attention. Choose how you want to handle each one.
                </p>
                <div className="mt-3 space-y-2">
                  {staffingIssues.map((issue) => (
                    <article key={issue.id} className="rounded-[12px] border border-[var(--border-neutral-x-weak)] p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[14px] font-semibold text-[var(--text-neutral-xx-strong)]">{issue.title}</p>
                        <span className={`rounded-[1000px] px-2 py-0.5 text-[11px] font-semibold ${issue.severity === 'High' ? 'bg-[#fee2e2] text-[#991b1b]' : 'bg-[#fef3c7] text-[#92400e]'}`}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] text-[var(--text-neutral-medium)]">{issue.summary}</p>
                      <p className="mt-2 text-[12px] font-medium text-[var(--text-neutral-medium)]">How do you want to handle this?</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {issue.actions.map((action) => (
                          <Button
                            key={action.label}
                            size="small"
                            variant="outlined"
                            className="h-7 px-3 text-[12px]"
                            onClick={() => setStaffingDecisionMessage(action.outcome)}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-5 flex justify-end gap-2">
                  <Button size="small" variant="standard" onClick={closeModal}>
                    Close
                  </Button>
                  <Button
                    size="small"
                    variant="primary"
                    onClick={() => {
                      navigate('/time-attendance');
                      closeModal();
                    }}
                  >
                    Open Time & Attendance
                  </Button>
                </div>
              </>
            ) : activeAction === 'alerts' ? (
              <>
                <p className="mt-2 text-[14px] text-[var(--text-neutral-medium)]">
                  {complianceAlerts} alerts need a handling decision. Choose an action for each alert below.
                </p>
                <div className="mt-3 space-y-2">
                  {complianceAlertsList.map((alert) => (
                    <article key={alert.id} className="rounded-[12px] border border-[var(--border-neutral-x-weak)] p-3">
                      <p className="text-[14px] font-semibold text-[var(--text-neutral-xx-strong)]">{alert.title}</p>
                      <p className="mt-1 text-[13px] text-[var(--text-neutral-medium)]">{alert.summary}</p>
                      <p className="mt-2 text-[12px] font-medium text-[var(--text-neutral-medium)]">How would you like to handle this?</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {alert.actions.map((action) => (
                          <Button
                            key={action.label}
                            size="small"
                            variant="outlined"
                            className="h-7 px-3 text-[12px]"
                            onClick={() => setAlertDecisionMessage(action.outcome)}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button size="small" variant="standard" onClick={closeModal}>
                    Close
                  </Button>
                  <Button
                    size="small"
                    variant="primary"
                    onClick={() => {
                      navigate('/reports');
                      closeModal();
                    }}
                  >
                    Open Reports
                  </Button>
                </div>
              </>
            ) : activeAction === 'schedules' ? (
              <>
                <p className="mt-2 text-[14px] text-[var(--text-neutral-medium)]">
                  Choose how you want to adjust today&apos;s schedule risks.
                </p>
                <div className="mt-3 space-y-2">
                  {scheduleActions.map((item) => (
                    <article key={item.id} className="rounded-[12px] border border-[var(--border-neutral-x-weak)] p-3">
                      <p className="text-[14px] font-semibold text-[var(--text-neutral-xx-strong)]">{item.title}</p>
                      <p className="mt-1 text-[13px] text-[var(--text-neutral-medium)]">{item.summary}</p>
                      <p className="mt-2 text-[12px] font-medium text-[var(--text-neutral-medium)]">Select an action:</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.actions.map((action) => (
                          <Button
                            key={action.label}
                            size="small"
                            variant="outlined"
                            className="h-7 px-3 text-[12px]"
                            onClick={() => setScheduleDecisionMessage(action.outcome)}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button size="small" variant="standard" onClick={closeModal}>
                    Close
                  </Button>
                  <Button
                    size="small"
                    variant="primary"
                    onClick={() => {
                      navigate('/time-attendance');
                      closeModal();
                    }}
                  >
                    Open Scheduler
                  </Button>
                </div>
              </>
            ) : activeAction === 'allocation' ? (
              <>
                <p className="mt-2 text-[14px] text-[var(--text-neutral-medium)]">
                  Project Tracking breakdown showing logged hours by project.
                </p>
                <div className="mt-3 rounded-[12px] border border-[var(--border-neutral-x-weak)] p-3">
                  <p className="text-[12px] font-semibold text-[var(--text-neutral-medium)]">Total Logged</p>
                  <p className="mt-1 text-[24px] font-semibold text-[var(--text-neutral-xx-strong)]">{totalProjectHours}h</p>
                  <ul className="mt-3 space-y-2">
                    {projectAllocationBreakdown.map((item) => {
                      const pct = Math.round((item.loggedHours / Math.max(totalProjectHours, 1)) * 100);
                      return (
                        <li key={item.id} className="rounded-[10px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-2">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[13px] font-medium text-[var(--text-neutral-xx-strong)]">{item.project}</p>
                            <p className="text-[13px] text-[var(--text-neutral-medium)]">{item.loggedHours}h ({pct}%)</p>
                          </div>
                          <div className="mt-1 h-2 rounded-[1000px] bg-[#d1d5db]">
                            <div className="h-full rounded-[1000px] bg-[#1d4ed8]" style={{ width: `${pct}%` }} />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button size="small" variant="standard" onClick={closeModal}>
                    Close
                  </Button>
                  <Button
                    size="small"
                    variant="primary"
                    onClick={() => {
                      navigate('/time-attendance');
                      closeModal();
                    }}
                  >
                    Open Project Tracking
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
