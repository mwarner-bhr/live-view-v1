import { useState } from 'react';
import { Button, Icon } from '../../../components';

type RequestStatus = 'PENDING' | 'APPROVED' | 'DENIED';

interface TimeOffRequest {
  id: string;
  employeeName: string;
  type: 'Vacation' | 'Sick' | 'Personal';
  dateRange: string;
  submittedAt: string;
  status: RequestStatus;
}

interface AccrualRisk {
  id: string;
  employeeName: string;
  remainingHours: number;
  requestedHours: number;
}

const seedRequests: TimeOffRequest[] = [
  {
    id: 'tor-1',
    employeeName: 'Ben Proctor',
    type: 'Vacation',
    dateRange: 'Mar 4 - Mar 6',
    submittedAt: 'Submitted 2h ago',
    status: 'PENDING',
  },
  {
    id: 'tor-2',
    employeeName: 'Liam Carter',
    type: 'Personal',
    dateRange: 'Mar 4 - Mar 6',
    submittedAt: 'Submitted 5h ago',
    status: 'PENDING',
  },
  {
    id: 'tor-3',
    employeeName: 'Janet Caldwell',
    type: 'Sick',
    dateRange: 'Mar 1',
    submittedAt: 'Submitted yesterday',
    status: 'PENDING',
  },
];

const accrualRisks: AccrualRisk[] = [
  { id: 'ar-1', employeeName: 'Ben Proctor', remainingHours: 6, requestedHours: 8 },
  { id: 'ar-2', employeeName: 'Liam Carter', remainingHours: 3.5, requestedHours: 6 },
  { id: 'ar-3', employeeName: 'Janet Caldwell', remainingHours: 5, requestedHours: 8 },
];

export function TimeOffRequestsPanel() {
  const [requests, setRequests] = useState<TimeOffRequest[]>(seedRequests);

  const setStatus = (id: string, status: RequestStatus) => {
    setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status } : request)));
  };

  const pendingCount = requests.filter((request) => request.status === 'PENDING').length;
  const overlapCountByRange = requests.reduce<Record<string, number>>((acc, request) => {
    acc[request.dateRange] = (acc[request.dateRange] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <aside className="rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
      <div className="flex items-center justify-between gap-2">
        <h3
          className="text-[20px] leading-[28px] font-semibold text-[var(--color-primary-strong)]"
          style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
        >
          Time Off
        </h3>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-[1000px] bg-[var(--surface-neutral-x-weak)] px-2 text-[12px] font-semibold text-[var(--text-neutral-strong)]">
          {pendingCount}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {requests.map((request) => (
          <article key={request.id} className="rounded-[12px] border border-[var(--border-neutral-x-weak)] p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[14px] font-semibold text-[var(--text-neutral-xx-strong)]">{request.employeeName}</p>
                <p className="text-[13px] text-[var(--text-neutral-medium)]">{request.type} · {request.dateRange}</p>
                <p className="mt-1 text-[12px] text-[var(--text-neutral-medium)]">{request.submittedAt}</p>
                {overlapCountByRange[request.dateRange] > 1 && (
                  <p className="mt-1 text-[12px] text-[#92400e]">
                    {overlapCountByRange[request.dateRange] - 1} other employee{overlapCountByRange[request.dateRange] - 1 > 1 ? 's have' : ' has'} also requested these day(s).
                  </p>
                )}
                {overlapCountByRange[request.dateRange] <= 1 && (
                  <p className="mt-1 text-[12px] text-[#166534]">
                    No other overlapping time off requests on these day(s).
                  </p>
                )}
              </div>
              <span
                className={`rounded-[1000px] px-2 py-1 text-[11px] font-semibold ${
                  request.status === 'APPROVED'
                    ? 'bg-[#dcfce7] text-[#166534]'
                    : request.status === 'DENIED'
                      ? 'bg-[#fee2e2] text-[#991b1b]'
                      : 'bg-[#f3f4f6] text-[#374151]'
                }`}
              >
                {request.status === 'PENDING' ? 'Pending' : request.status === 'APPROVED' ? 'Approved' : 'Denied'}
              </span>
            </div>

            <div className="mt-3 flex gap-2">
              <Button
                size="small"
                variant="outlined"
                className="h-7 px-3 text-[12px]"
                icon="check"
                onClick={() => setStatus(request.id, 'APPROVED')}
                disabled={request.status !== 'PENDING'}
              >
                Approve
              </Button>
              <Button
                size="small"
                variant="standard"
                className="h-7 px-3 text-[12px]"
                icon="xmark"
                onClick={() => setStatus(request.id, 'DENIED')}
                disabled={request.status !== 'PENDING'}
              >
                Deny
              </Button>
            </div>
          </article>
        ))}

        {requests.length === 0 && (
          <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] p-3 text-[13px] text-[var(--text-neutral-medium)]">
            No requests.
          </div>
        )}
      </div>

      <p className="mt-3 inline-flex items-center gap-1 text-[12px] text-[var(--text-neutral-medium)]">
        <Icon name="circle-info" size={11} />
        Requests update immediately in this preview.
      </p>

      <div className="mt-4 rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13px] font-semibold text-[var(--text-neutral-xx-strong)]">Low Accrual Watch</p>
          <span className="text-[11px] text-[var(--text-neutral-medium)]">Near limit</span>
        </div>
        <ul className="mt-2 space-y-2">
          {accrualRisks.map((risk) => (
            <li key={risk.id} className="rounded-[10px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] px-2 py-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-medium text-[var(--text-neutral-xx-strong)]">{risk.employeeName}</p>
                <span className="rounded-[1000px] bg-[#fee2e2] px-2 py-0.5 text-[11px] font-semibold text-[#991b1b]">
                  {risk.remainingHours}h left
                </span>
              </div>
              <p className="mt-1 text-[12px] text-[var(--text-neutral-medium)]">
                Requested {risk.requestedHours}h off. Review balance before approval.
              </p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default TimeOffRequestsPanel;
