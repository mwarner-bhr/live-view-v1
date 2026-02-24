import { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon';
import { CalendarPopup } from './CalendarPopup';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'MM/DD/YYYY',
  disabled = false,
  className = '',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={pickerRef}>
      {label && (
        <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            flex items-center justify-between gap-4
            w-full h-10 pl-4 pr-3 py-2
            bg-[var(--surface-neutral-white)]
            border border-[var(--border-neutral-medium)]
            rounded-[var(--radius-xx-small)]
            text-[15px] leading-[22px]
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            ${value ? 'text-[var(--text-neutral-strong)]' : 'text-[var(--text-neutral-weak)]'}
          `}
          style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.04)' }}
        >
          <span className="flex-1 text-left truncate">
            {value || placeholder}
          </span>
          <Icon name="calendar" size={16} className="text-[var(--icon-neutral-strong)] shrink-0" />
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-50 top-full left-0 mt-2">
            <CalendarPopup
              value={value}
              onChange={(newValue) => {
                onChange?.(newValue);
                setIsOpen(false);
              }}
              onClose={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DatePicker;
