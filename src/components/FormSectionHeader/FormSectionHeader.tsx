import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';

interface FormSectionHeaderProps {
  title: string;
  icon: IconName;
  children?: ReactNode;
}

export function FormSectionHeader({
  title,
  icon,
  children,
}: FormSectionHeaderProps) {
  return (
    <div
      className="
        bg-[var(--surface-neutral-white)]
        border border-[var(--border-neutral-x-weak)]
        rounded-[var(--radius-small)]
      "
      style={{ boxShadow: '2px 2px 0px 2px rgba(56, 49, 47, 0.05)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-8 py-5">
        {/* Icon Container */}
        <div
          className="
            flex items-center justify-center
            w-10 h-10
            bg-[var(--surface-neutral-x-weak)]
            rounded-[var(--radius-x-small)]
          "
        >
          <Icon
            name={icon}
            size={16}
            className="text-[var(--color-primary-strong)]"
          />
        </div>

        {/* Title */}
        <div
          className="
            font-semibold text-[26px] leading-[34px]
            text-[var(--color-primary-strong)]
          "
          style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
        >
          {title}
        </div>
      </div>

      {/* Content */}
      {children && (
        <div className="px-8 pb-8">
          {children}
        </div>
      )}
    </div>
  );
}

export default FormSectionHeader;
