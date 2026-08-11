import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent/90 shadow-[0_0_20px_rgba(99,102,241,0.4)]',
  secondary:
    'border border-highlight/50 text-highlight hover:bg-highlight/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]',
  ghost: 'text-text-muted hover:text-text hover:bg-white/5',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
