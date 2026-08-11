import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] ${className}`}
    >
      {children}
    </div>
  )
}
