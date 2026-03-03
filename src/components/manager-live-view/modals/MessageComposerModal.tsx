import { useEffect, useState } from 'react';
import type { Employee } from '../../../types/managerLiveView';

interface MessageComposerModalProps {
  employee: Employee | null;
  onClose: () => void;
}

export function MessageComposerModal({ employee, onClose }: MessageComposerModalProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!employee) {
      setMessage('');
    }
  }, [employee]);

  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border-neutral-x-weak)] bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)]">Message {employee.name}</h3>
        <textarea
          className="mt-3 h-28 w-full rounded-xl border border-[var(--border-neutral-medium)] p-3 text-sm outline-none focus:border-[var(--color-primary-medium)]"
          placeholder="Write your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-[var(--border-neutral-medium)] px-3 py-2 text-sm">Cancel</button>
          <button onClick={onClose} className="rounded-xl bg-[var(--color-primary-medium)] px-3 py-2 text-sm font-medium text-white">Send</button>
        </div>
      </div>
    </div>
  );
}
