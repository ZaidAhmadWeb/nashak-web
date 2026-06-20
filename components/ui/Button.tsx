import Link from 'next/link';
import { type ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary: 'bg-(--accent) text-(--primary) hover:bg-(--accent-light) focus-visible:ring-(--accent)',
  outline: 'border-2 border-current hover:bg-white/10',
  ghost: 'hover:bg-white/10',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  external = false,
  type = 'button',
  disabled,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
