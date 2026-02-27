import { Icon } from '../Icon';

interface TypingIndicatorProps {
  className?: string;
  label?: string;
}

export function TypingIndicator({ className = '', label = 'BambooHR Assistant' }: TypingIndicatorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`} role="status" aria-live="polite" aria-label={`${label} is typing`}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 flex items-center justify-center bg-[var(--color-primary-strong)] rounded-full">
          <Icon name="sparkles" size={12} className="text-white" />
        </div>
        <span className="text-[13px] font-semibold text-[var(--text-neutral-medium)]">{label}</span>
      </div>
      <div className="pl-8">
        <div className="inline-flex items-center gap-2 rounded-[14px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] px-3 py-2">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[var(--icon-neutral-medium)] animate-bounce" />
            <span className="h-2 w-2 rounded-full bg-[var(--icon-neutral-medium)] animate-bounce [animation-delay:120ms]" />
            <span className="h-2 w-2 rounded-full bg-[var(--icon-neutral-medium)] animate-bounce [animation-delay:240ms]" />
          </div>
          <span className="text-[13px] text-[var(--text-neutral-medium)]">Typing...</span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
