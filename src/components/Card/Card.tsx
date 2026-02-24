import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-gray-50 dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-700 ${className}`}
    >
      {children}
    </div>
  );
}
