import { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon';
import { CalendarPopup } from '../DatePicker/CalendarPopup';

interface TextInputProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'dropdown' | 'date';
  size?: 'default' | 'small';
  className?: string;
  inputClassName?: string;
  icon?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = 'text',
  size = 'default',
  className = '',
  inputClassName = '',
  icon,
}: TextInputProps) {
  const isSmall = size === 'small';
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close date picker when clicking outside
  useEffect(() => {
    if (type !== 'date') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [type]);

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={type === 'date' ? containerRef : undefined}>
      {label && (
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={`
            flex items-center gap-4
            ${isSmall ? 'h-8 px-4 py-2' : 'h-10 pl-4 pr-3 py-2'}
            bg-[var(--surface-neutral-white)]
            border border-[var(--border-neutral-medium)]
            ${isSmall ? 'rounded-full' : 'rounded-[var(--radius-xx-small)]'}
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            ${inputClassName}
          `}
          style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.04)' }}
        >
          {icon && (
            <Icon name={icon as any} size={16} className="text-[var(--icon-neutral-strong)] shrink-0" />
          )}
          <input
            type={type === 'date' ? 'text' : 'text'}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={`flex-1 bg-transparent ${isSmall ? 'text-[14px] leading-[20px]' : 'text-[15px] leading-[22px]'} text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none min-w-0`}
          />
          {type === 'dropdown' && (
            <div className="flex items-center gap-2 h-full shrink-0">
              <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
              <Icon name="caret-down" size={16} className="text-[var(--icon-neutral-strong)]" />
            </div>
          )}
          {type === 'date' && (
            <button
              type="button"
              onClick={() => !disabled && setIsDatePickerOpen(!isDatePickerOpen)}
              disabled={disabled}
              className="flex items-center gap-2 h-full shrink-0 cursor-pointer"
            >
              <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
              <Icon name="calendar" size={16} className="text-[var(--icon-neutral-strong)]" />
            </button>
          )}
        </div>

        {/* Calendar Popup */}
        {type === 'date' && isDatePickerOpen && !disabled && (
          <div className="absolute z-50 top-full left-0 mt-2">
            <CalendarPopup
              value={value}
              onChange={(newValue: string) => {
                onChange?.(newValue);
                setIsDatePickerOpen(false);
              }}
              onClose={() => setIsDatePickerOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TextInput;
