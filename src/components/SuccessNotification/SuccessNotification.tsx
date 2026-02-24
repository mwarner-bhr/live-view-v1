import { Icon } from '../Icon';

interface SuccessNotificationProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  show: boolean;
}

export function SuccessNotification({
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  show
}: SuccessNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed top-5 left-1/2 z-50 animate-slideDown">
      <div
        className="flex items-start gap-6 px-4 py-3 rounded-[16px] w-[832px]"
        style={{
          background: '#016d00',
          boxShadow: '3px 3px 10px 2px rgba(56, 49, 47, 0.1)'
        }}
      >
        {/* Message section */}
        <div className="flex flex-1 gap-3 items-start py-1 min-w-[150px]">
          {/* Check Icon - no background circle */}
          <div className="flex items-start pt-1 flex-shrink-0">
            <Icon name="check-circle" size={16} className="text-white" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-0.5 flex-1">
            <div className="text-[16px] font-semibold leading-[24px] text-white">
              {title}
            </div>
            {description && (
              <div className="text-[14px] font-normal leading-[20px] text-white">
                {description}
              </div>
            )}
          </div>
        </div>

        {/* Buttons section */}
        <div className="flex gap-3 items-center h-8 flex-shrink-0">
          {/* Action Button - pill with white border */}
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="h-8 px-3 rounded-full border border-white text-[13px] font-semibold leading-[19px] text-white hover:bg-white/10 transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.01)',
                boxShadow: '1px 1px 0px 1px rgba(212, 210, 208, 0.1)'
              }}
            >
              {actionLabel}
            </button>
          )}

          {/* Dismiss Button - pill with white border */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="h-8 px-3 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.01)',
                boxShadow: '1px 1px 0px 1px rgba(212, 210, 208, 0.1)'
              }}
              aria-label="Dismiss"
            >
              <Icon name="xmark" size={16} className="text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuccessNotification;
