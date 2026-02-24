import { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon';

interface FormDropdownOption {
  value: string;
  label: string;
}

interface FormDropdownProps {
  label?: string;
  options: FormDropdownOption[];
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function FormDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = '-Select-',
  disabled = false,
  className = '',
}: FormDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={dropdownRef}>
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
            ${selectedOption ? 'text-[var(--text-neutral-strong)]' : 'text-[var(--text-neutral-weak)]'}
          `}
          style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.04)' }}
        >
          <span className="flex-1 text-left truncate">
            {selectedOption?.label || placeholder}
          </span>
          <div className="flex items-center gap-2 h-full shrink-0">
            <div className="w-px h-full bg-[var(--border-neutral-medium)]" />
            <Icon
              name="caret-down"
              size={16}
              className={`text-[var(--icon-neutral-strong)] transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {isOpen && !disabled && (
          <div
            className="
              absolute z-50 top-full left-0 mt-1
              w-full
              max-h-[240px]
              bg-[var(--surface-neutral-white)]
              border border-[var(--border-neutral-medium)]
              rounded-[var(--radius-small)]
              shadow-lg
              overflow-y-auto
            "
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-4 py-2 text-left text-[15px]
                  hover:bg-[var(--surface-neutral-x-weak)]
                  transition-colors duration-150
                  ${
                    option.value === value
                      ? 'bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-xx-strong)]'
                      : 'text-[var(--text-neutral-strong)]'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormDropdown;
