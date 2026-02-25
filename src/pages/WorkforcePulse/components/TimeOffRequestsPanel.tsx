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
    dateRange: 'Mar 8',
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

export function TimeOffRequestsPanel() {
  const [requests, setRequests] = useState<TimeOffRequest[]>(seedRequests);

  const setStatus = (id: string, status: RequestStatus) => {
    setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status } : request)));
  };

  const pendingCount = requests.filter((request) => request.status === 'PENDING').length;

  return (
    <aside className="rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
      <div className="flex items-center justify-between gap-2">
        <h3
          className="text-[20px] leading-[28px] font-semibold text-[var(--color-primary-strong)]"
          style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
        >
          Time Off Requests
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
    </aside>
  );
}

export default TimeOffRequestsPanel;
