import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';

interface GridletProps {
  title: string;
  icon?: IconName;
  children?: ReactNode;
  className?: string;
  minHeight?: number;
}

export function Gridlet({
  title,
  icon = 'face-smile',
  children,
  className = '',
  minHeight,
}: GridletProps) {
  return (
    <div
      className={`
        flex flex-col
        bg-[var(--surface-neutral-white)]
        border border-[var(--border-neutral-x-weak)]
        rounded-[var(--radius-small)]
        overflow-hidden
        ${className}
      `}
      style={{
        boxShadow: 'var(--shadow-300)',
        minHeight: minHeight ? `${minHeight}px` : undefined,
      }}
    >
      {/* Header */}
      <div className="flex flex-col">
        {/* Title Row */}
        <div className="flex items-center gap-3 px-6 py-4">
          <Icon
            name={icon}
            size={20}
            className="text-[var(--color-primary-strong)]"
          />
          <div className="flex-1 min-w-0">
            <h3
              className="
                font-bold text-base leading-6
                text-[var(--color-primary-strong)]
                truncate
              "
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border-neutral-x-weak)]" />
      </div>

      {/* Content */}
      {children && (
        <div className="flex-1 p-6">
          {children}
        </div>
      )}
    </div>
  );
}

export default Gridlet;
