import { Icon } from '../Icon';

interface PendingFeedbackRequest {
  id: string;
  personName: string;
  personTitle: string;
  personAvatar: string;
  requestDate: string;
  emailSentDate: string;
  dueDate: string;
  daysRemaining: number;
}

interface PendingFeedbackCardProps {
  requests: PendingFeedbackRequest[];
  onCancel?: (id: string) => void;
}

export function PendingFeedbackCard({ requests, onCancel }: PendingFeedbackCardProps) {
  return (
    <div
      className="bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-x-weak)] rounded-lg p-6"
    >
      {requests.map((request, index) => (
        <div key={request.id}>
          {/* Section Header */}
          <div className="flex items-start justify-between mb-4">
            <span className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)]">
              Waiting for feedback from...
            </span>
            <button
              onClick={() => onCancel?.(request.id)}
              className="flex items-center gap-2 text-[var(--color-link)] hover:underline"
            >
              <Icon name="xmark" size={16} className="text-[var(--color-link)]" />
              <span className="text-[15px] leading-[22px] font-medium">Cancel</span>
            </button>
          </div>

          {/* Person Badge */}
          <div className="flex items-center gap-4 mb-3">
            <img
              src={request.personAvatar}
              alt={request.personName}
              className="w-12 h-12 rounded-xl object-cover"
              style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.04)' }}
            />
            <div className="flex flex-col">
              <span className="text-[18px] leading-[26px] font-semibold text-[var(--text-neutral-x-strong)]">
                {request.personName}
              </span>
              <span className="text-[15px] leading-[22px] text-[var(--text-neutral-medium)]">
                {request.personTitle}
              </span>
              <span className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)]">
                {request.requestDate}
              </span>
            </div>
          </div>

          {/* Status Messages */}
          <div className="pl-16 space-y-1">
            <p className="text-[14px] leading-[20px] font-medium text-[var(--text-neutral-strong)]">
              An email requesting {request.personName.split(' ')[0]} to complete feedback was sent {request.emailSentDate}.
            </p>
            <p className="text-[14px] leading-[20px] text-[var(--text-neutral-strong)]">
              {request.personName.split(' ')[0]} has until {request.dueDate} ({request.daysRemaining} days) to complete this.
            </p>
          </div>

          {/* Divider between requests */}
          {index < requests.length - 1 && (
            <div className="w-full h-px bg-[var(--border-neutral-x-weak)] my-6" />
          )}
        </div>
      ))}
    </div>
  );
}

export default PendingFeedbackCard;
