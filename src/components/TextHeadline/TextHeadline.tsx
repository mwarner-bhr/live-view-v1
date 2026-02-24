import { Icon, type IconName } from '../Icon';

type HeadlineSize = 'x-large' | 'large' | 'medium' | 'small' | 'x-small';
type HeadlineColor = 'primary' | 'neutral-strong' | 'neutral-medium' | 'neutral-weak' | 'inverted' | 'link';

interface TextHeadlineProps {
  children: string;
  size?: HeadlineSize;
  color?: HeadlineColor;
  icon?: IconName;
  className?: string;
}

const sizeStyles: Record<HeadlineSize, { fontSize: string; lineHeight: string; fontFamily: string }> = {
  'x-large': {
    fontSize: '52px',
    lineHeight: '62px',
    fontFamily: 'Fields, system-ui, sans-serif',
  },
  'large': {
    fontSize: '40px',
    lineHeight: '48px',
    fontFamily: 'Fields, system-ui, sans-serif',
  },
  'medium': {
    fontSize: '32px',
    lineHeight: '40px',
    fontFamily: 'Fields, system-ui, sans-serif',
  },
  'small': {
    fontSize: '24px',
    lineHeight: '32px',
    fontFamily: 'Fields, system-ui, sans-serif',
  },
  'x-small': {
    fontSize: '20px',
    lineHeight: '28px',
    fontFamily: 'Fields, system-ui, sans-serif',
  },
};

const colorStyles: Record<HeadlineColor, string> = {
  'primary': 'var(--color-primary-strong)',
  'neutral-strong': 'var(--text-neutral-strong)',
  'neutral-medium': 'var(--text-neutral-medium)',
  'neutral-weak': 'var(--text-neutral-weak)',
  'inverted': '#ffffff',
  'link': '#0066cc',
};

const iconSizeMap: Record<HeadlineSize, number> = {
  'x-large': 48,
  'large': 40,
  'medium': 32,
  'small': 24,
  'x-small': 20,
};

export function TextHeadline({
  children,
  size = 'x-large',
  color = 'primary',
  icon,
  className = '',
}: TextHeadlineProps) {
  const styles = sizeStyles[size];
  const textColor = colorStyles[color];
  const iconSize = iconSizeMap[size];

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {icon && (
        <Icon
          name={icon}
          size={iconSize}
          className="text-[var(--icon-neutral-x-strong)]"
        />
      )}
      <span
        className="font-bold whitespace-nowrap"
        style={{
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
          fontFamily: styles.fontFamily,
          color: textColor,
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default TextHeadline;
