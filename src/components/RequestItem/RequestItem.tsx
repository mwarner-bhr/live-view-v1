import { Icon } from '../Icon';
import type { InboxRequest } from '../../data/inboxData';

interface RequestItemProps {
  request: InboxRequest;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export function RequestItem({ request, isSelected, onToggleSelect }: RequestItemProps) {
  // Render icon based on iconType
  const renderIcon = () => {
    if (request.iconType === 'avatar' && request.avatarUrl) {
      return (
        <div
          className="shrink-0 relative"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-xx-small)',
            boxShadow: 'var(--shadow-300)',
          }}
        >
          <img
            src={request.avatarUrl}
            alt={request.requesterName || ''}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ borderRadius: 'var(--radius-xx-small)' }}
          />
        </div>
      );
    } else if (request.iconType === 'document') {
      return (
        <div
          className="shrink-0 flex items-center justify-center"
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--surface-neutral-xx-weak)',
            borderRadius: 'var(--radius-xx-small)',
          }}
        >
          <Icon
            name="file-lines"
            size={20}
            style={{ color: 'var(--text-neutral-medium)' }}
          />
        </div>
      );
    } else if (request.iconType === 'user') {
      return (
        <div
          className="shrink-0 flex items-center justify-center"
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--surface-neutral-xx-weak)',
            borderRadius: 'var(--radius-xx-small)',
          }}
        >
          <Icon
            name="circle-user"
            size={24}
            style={{ color: 'var(--text-neutral-medium)' }}
          />
        </div>
      );
    }
  };

  // Render subtitle based on subtitleType
  const renderSubtitle = () => {
    if (request.subtitleType === 'requester' && request.requesterName) {
      return (
        <div className="flex items-center gap-1.5">
          <Icon
            name="circle-user"
            size={16}
            style={{ color: 'var(--text-neutral-medium)' }}
          />
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '19px',
              color: 'var(--text-neutral-medium)',
            }}
          >
            {request.requesterName}
          </span>
        </div>
      );
    } else if (request.subtitleType === 'description' && request.description) {
      return (
        <span
          className="truncate"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '19px',
            color: 'var(--text-neutral-medium)',
          }}
        >
          {request.description}
        </span>
      );
    }
  };

  // Render due status badge
  const renderDueStatus = () => {
    if (!request.dueStatus) return null;

    const statusConfig = {
      'past-due': {
        text: 'Past due',
        color: '#c93b37',
      },
      'due-soon': {
        text: 'Due soon',
        color: '#c9763b',
      },
    };

    const config = statusConfig[request.dueStatus];

    return (
      <div className="flex items-center gap-1">
        <Icon
          name="clock"
          size={14}
          style={{ color: config.color }}
        />
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            lineHeight: '19px',
            color: config.color,
          }}
        >
          {config.text}
        </span>
      </div>
    );
  };

  return (
    <div
      className="flex items-center border-b cursor-pointer hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
      style={{
        borderColor: 'var(--border-neutral-xx-weak)',
        padding: '12px 24px',
        gap: '12px',
      }}
      onClick={() => onToggleSelect(request.id)}
    >
      {/* Custom Checkbox */}
      <div
        className="shrink-0 relative"
        style={{
          width: '18px',
          height: '18px',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect(request.id);
        }}
      >
        <div
          className="absolute inset-0 cursor-pointer"
          style={{
            border: isSelected ? 'none' : '1.5px solid var(--border-neutral-medium)',
            borderRadius: '4px',
            backgroundColor: isSelected ? 'var(--color-primary-strong)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isSelected && (
            <Icon
              name="check-circle"
              size={12}
              style={{ color: 'white' }}
            />
          )}
        </div>
      </div>

      {/* Icon (Avatar/Document/User) */}
      {renderIcon()}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Line 1: Title + Date */}
        <div className="flex items-baseline gap-2">
          <span
            className="truncate"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              color: 'var(--text-neutral-xx-strong)',
            }}
          >
            {request.title}
          </span>
          <span
            className="shrink-0"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              color: '#777270',
            }}
          >
            {request.date}
          </span>
        </div>

        {/* Line 2: Subtitle + Due Status */}
        <div className="flex items-center gap-2 mt-0.5">
          {renderSubtitle()}
          {request.dueStatus && renderDueStatus()}
        </div>
      </div>

      {/* Chevron Icon */}
      <div className="shrink-0">
        <Icon
          name="chevron-right"
          size={16}
          style={{ color: '#c6c2bf' }}
        />
      </div>
    </div>
  );
}

export default RequestItem;
