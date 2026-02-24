import { Icon } from '../../../components';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search employees',
  ariaLabel = 'Search employees',
}: SearchInputProps) {
  return (
    <label className="relative block w-full max-w-[340px]">
      <span className="sr-only">{ariaLabel}</span>
      <Icon name="magnifying-glass" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--icon-neutral-strong)]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="h-10 w-full rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] pl-9 pr-3 text-[14px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-medium)]"
      />
    </label>
  );
}

export default SearchInput;
