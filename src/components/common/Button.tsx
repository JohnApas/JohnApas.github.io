import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-[#0077ed] active:bg-[#006edb]',
  secondary:
    'bg-[#424245] text-white hover:bg-[#525256] active:bg-[#3a3a3d]',
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
      className={`rounded-full px-[22px] py-[11px] text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200 active:scale-[0.97] ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
