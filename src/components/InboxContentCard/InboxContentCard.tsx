import type { ReactNode } from 'react';

interface InboxContentCardProps {
  children: ReactNode;
}

export function InboxContentCard({ children }: InboxContentCardProps) {
  return (
    <div
      className="flex-1 flex flex-col min-h-0"
      style={{
        maxWidth: '944px',
        backgroundColor: 'var(--surface-neutral-white)',
        borderRadius: '16px',
        border: '1px solid var(--border-neutral-xx-weak)',
        boxShadow: 'var(--shadow-100)',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export default InboxContentCard;
