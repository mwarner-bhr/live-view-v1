import { useState } from 'react';
import { DatePicker } from '../../components';

export function DatePickerDemo() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('01/15/2026');
  const [date3, setDate3] = useState('');

  return (
    <div className="min-h-screen bg-[var(--surface-neutral-x-weak)] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-neutral-xx-strong)] mb-8">
          DatePicker Component Demo
        </h1>

        <div className="space-y-8">
          {/* Basic DatePicker */}
          <div className="bg-[var(--surface-neutral-white)] p-6 rounded-lg border border-[var(--border-neutral-medium)]">
            <h2 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)] mb-4">
              Basic DatePicker
            </h2>
            <div className="max-w-sm">
              <DatePicker
                label="Select a date"
                value={date1}
                onChange={setDate1}
              />
            </div>
            {date1 && (
              <p className="mt-4 text-sm text-[var(--text-neutral-medium)]">
                Selected: {date1}
              </p>
            )}
          </div>

          {/* DatePicker with value */}
          <div className="bg-[var(--surface-neutral-white)] p-6 rounded-lg border border-[var(--border-neutral-medium)]">
            <h2 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)] mb-4">
              DatePicker with Pre-selected Value
            </h2>
            <div className="max-w-sm">
              <DatePicker
                label="Birth Date"
                value={date2}
                onChange={setDate2}
              />
            </div>
            {date2 && (
              <p className="mt-4 text-sm text-[var(--text-neutral-medium)]">
                Selected: {date2}
              </p>
            )}
          </div>

          {/* DatePicker disabled */}
          <div className="bg-[var(--surface-neutral-white)] p-6 rounded-lg border border-[var(--border-neutral-medium)]">
            <h2 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)] mb-4">
              Disabled DatePicker
            </h2>
            <div className="max-w-sm">
              <DatePicker
                label="Start Date"
                value="03/20/2026"
                disabled
              />
            </div>
          </div>

          {/* Multiple DatePickers in a row */}
          <div className="bg-[var(--surface-neutral-white)] p-6 rounded-lg border border-[var(--border-neutral-medium)]">
            <h2 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)] mb-4">
              Multiple DatePickers
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Start Date"
                value={date3}
                onChange={setDate3}
                placeholder="MM/DD/YYYY"
              />
              <DatePicker
                label="End Date"
                value=""
                placeholder="MM/DD/YYYY"
              />
            </div>
          </div>

          {/* Without label */}
          <div className="bg-[var(--surface-neutral-white)] p-6 rounded-lg border border-[var(--border-neutral-medium)]">
            <h2 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)] mb-4">
              DatePicker without Label
            </h2>
            <div className="max-w-sm">
              <DatePicker
                value=""
                placeholder="Select date..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatePickerDemo;
