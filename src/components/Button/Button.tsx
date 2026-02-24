import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'standard' | 'primary' | 'ghost' | 'outlined' | 'text';
  size?: 'small' | 'medium';
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  showCaret?: boolean;
}

export function Button({
  children,
  variant = 'standard',
  size = 'medium',
  icon,
  iconPosition = 'left',
  showCaret = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold text-[15px] leading-[22px]
    rounded-[var(--radius-full)]
    transition-all duration-200
    cursor-pointer
  `;

  const variantStyles = {
    standard: `
      bg-[var(--surface-neutral-white)]
      border border-[var(--border-neutral-medium)]
      text-[var(--text-neutral-strong)]
      hover:bg-[var(--surface-neutral-xx-weak)]
    `,
    primary: `
      bg-[var(--color-primary-strong)]
      border border-transparent
      text-white
      hover:bg-[var(--color-primary-medium)]
    `,
    ghost: `
      bg-transparent
      border border-transparent
      text-[var(--text-neutral-strong)]
      hover:bg-[var(--surface-neutral-xx-weak)]
    `,
    outlined: `
      bg-[var(--surface-neutral-white)]
      border border-[var(--color-primary-strong)]
      text-[var(--color-primary-strong)]
      hover:bg-[var(--surface-neutral-xx-weak)]
    `,
    text: `
      bg-transparent
      border border-transparent
      text-[#0b4fd1]
      hover:underline
      h-auto
      px-0
    `,
  };

  const sizeStyles = {
    small: 'h-8 px-4',
    medium: 'h-10 px-5',
  };

  const iconColor = {
    standard: 'var(--icon-neutral-x-strong)',
    primary: 'white',
    ghost: 'var(--icon-neutral-x-strong)',
    outlined: 'var(--color-primary-strong)',
    text: '#0b4fd1',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${variant !== 'text' ? sizeStyles[size] : ''}
        ${className}
      `}
      style={{ boxShadow: variant === 'standard' || variant === 'outlined' ? 'var(--shadow-100)' : undefined }}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={16} style={{ color: iconColor[variant] }} />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon name={icon} size={16} style={{ color: iconColor[variant] }} />
      )}
      {showCaret && (
        <Icon name="caret-down" size={10} style={{ color: iconColor[variant] }} />
      )}
    </button>
  );
}

export default Button;
