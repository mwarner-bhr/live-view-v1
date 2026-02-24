import type { ReactNode } from 'react';
import { Checkbox } from '../Checkbox';

interface InfoBannerProps {
  title: string;
  description: string;
  checkboxLabel?: string;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

export function InfoBanner({
  title,
  description,
  checkboxLabel,
  checked = false,
  onCheckboxChange,
}: InfoBannerProps) {
  return (
    <div
      className="
        bg-[var(--surface-neutral-white)]
        border border-[var(--border-neutral-x-weak)]
        rounded-[var(--radius-small)]
        px-8 py-5
      "
      style={{ boxShadow: '2px 2px 0px 2px rgba(56, 49, 47, 0.05)' }}
    >
      {/* Title */}
      <div
        className="
          font-semibold text-[26px] leading-[34px]
          text-[var(--color-primary-strong)]
          mb-1
        "
        style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
      >
        {title}
      </div>

      {/* Description */}
      <p
        className="
          text-[13px] leading-[19px]
          text-[var(--text-neutral-strong)]
          mb-4
        "
      >
        {description}
      </p>

      {/* Checkbox (optional) */}
      {checkboxLabel && (
        <Checkbox
          label={checkboxLabel}
          checked={checked}
          onChange={onCheckboxChange}
        />
      )}
    </div>
  );
}

export default InfoBanner;
