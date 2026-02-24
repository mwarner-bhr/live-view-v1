import { useState } from 'react';

export interface TextAreaProps {
  placeholder?: string;
  hasValue?: boolean;
  hasLabel?: boolean;
  state?: 'Default' | 'Focus' | 'Error';
  note?: 'None' | 'Error' | 'Info';
  noteText?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export function TextArea({
  placeholder = 'Ask a question about your data...',
  hasValue: _hasValue = false,
  hasLabel: _hasLabel = false,
  state: _state = 'Default',
  note = 'None',
  noteText,
  onChange,
  value: controlledValue,
}: TextAreaProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className="relative">
      {/* AI gradient border wrapper */}
      <div
        className="relative rounded-lg p-[2px]"
        style={{
          background: 'linear-gradient(93deg, #87C276 0%, #7AB8EE 33.65%, #C198D4 66.83%, #F2A766 96.15%)',
          boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04), 2px 2px 0px 2px rgba(56, 49, 47, 0.05)',
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full h-16 pl-5 pr-14 bg-[var(--surface-neutral-white)] rounded-[6px] text-[15px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-medium)] outline-none"
        />
      </div>
      {/* Circle arrow up icon */}
      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.5" fill="#a8a5a3" />
          <path
            d="M12 16V8M12 8L8.5 11.5M12 8L15.5 11.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {note !== 'None' && noteText && (
        <div
          className={`mt-2 text-[14px] ${
            note === 'Error' ? 'text-red-600' : 'text-[var(--text-neutral-medium)]'
          }`}
        >
          {noteText}
        </div>
      )}
    </div>
  );
}

export default TextArea;
