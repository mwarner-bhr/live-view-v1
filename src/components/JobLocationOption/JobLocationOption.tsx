import { Icon, type IconName } from '../Icon';

interface JobLocationOptionProps {
  icon: IconName;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function JobLocationOption({ icon, label, checked, onChange }: JobLocationOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        flex items-center gap-4 p-5 flex-1 min-w-[200px] max-w-[223px]
        bg-[var(--surface-neutral-white)]
        border rounded-[var(--radius-small)]
        transition-all
        ${checked
          ? 'border-[var(--color-primary-strong)] bg-[var(--surface-selected-weak)]'
          : 'border-[var(--border-neutral-x-weak)] hover:border-[var(--border-neutral-weak)]'
        }
      `}
      style={{ boxShadow: 'var(--shadow-300)' }}
    >
      <div className="flex-1 flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-x-small)] bg-[var(--surface-neutral-x-weak)]">
          <Icon name={icon} size={24} className="text-[var(--color-primary-strong)]" />
        </div>
        <span className="text-[16px] font-medium leading-[24px] text-[var(--color-primary-strong)]">
          {label}
        </span>
      </div>
      <div
        className={`
          w-5 h-5 rounded-[4px] flex items-center justify-center transition-colors
          ${checked
            ? 'bg-[var(--color-primary-strong)] border border-[var(--color-primary-strong)]'
            : 'bg-[var(--surface-neutral-x-weak)] border border-[var(--border-neutral-medium)]'
          }
        `}
        style={!checked ? { boxShadow: 'var(--shadow-100)' } : undefined}
      >
        {checked && (
          <Icon name="check" size={12} className="text-white" />
        )}
      </div>
    </button>
  );
}

export default JobLocationOption;
