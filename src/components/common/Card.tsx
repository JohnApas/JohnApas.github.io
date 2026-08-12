import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-[16px] bg-surface p-5 transition-colors duration-200 sm:rounded-[20px] sm:p-6 ${className}`}
    >
      {children}
    </div>
  )
}
