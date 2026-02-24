import { Icon } from '../Icon';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded-[var(--radius-xx-small)] flex items-center justify-center
            ${checked
              ? 'bg-[var(--color-primary-strong)] border border-[var(--color-primary-strong)]'
              : 'bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'group-hover:border-[var(--color-primary-strong)]'}
          `}
          style={!checked ? { boxShadow: 'var(--shadow-100)' } : undefined}
        >
          {checked && (
            <Icon name="check" size={12} className="text-white" />
          )}
        </div>
      </div>
      <span className={`text-[15px] leading-[22px] text-[var(--text-neutral-strong)] ${disabled ? 'opacity-50' : ''}`}>
        {label}
      </span>
    </label>
  );
}

export default Checkbox;
