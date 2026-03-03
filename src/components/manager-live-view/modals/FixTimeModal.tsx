import { useState } from 'react';
import type { Employee } from '../../../types/managerLiveView';

interface FixTimeModalProps {
  employee: Employee | null;
  onClose: () => void;
}

export function FixTimeModal({ employee, onClose }: FixTimeModalProps) {
  const [note, setNote] = useState('');

  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border-neutral-x-weak)] bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)]">Fix time for {employee.name}</h3>
        <p className="mt-2 text-sm text-[var(--text-neutral-medium)]">Mock editor: capture correction reason and submit.</p>
        <input
          className="mt-3 h-10 w-full rounded-xl border border-[var(--border-neutral-medium)] px-3 text-sm outline-none focus:border-[var(--color-primary-medium)]"
          placeholder="Correction note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-[var(--border-neutral-medium)] px-3 py-2 text-sm">Cancel</button>
          <button onClick={onClose} className="rounded-xl bg-[var(--color-primary-medium)] px-3 py-2 text-sm font-medium text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
