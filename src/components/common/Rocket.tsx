import type { CSSProperties } from 'react'

interface RocketProps {
  className?: string
  style?: CSSProperties
  size?: number
}

export function Rocket({ className = '', style, size = 40 }: RocketProps) {
  return (
    <div className={`absolute ${className}`} style={style}>
      <svg
        width={size}
        height={size * 1.4}
        viewBox="0 0 40 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2C16 10 14 18 14 28H26C26 18 24 10 20 2Z"
          fill="url(#rocketBody)"
        />
        <circle cx="20" cy="20" r="3.5" fill="#22d3ee" opacity="0.9" />
        <path d="M14 30L8 42L14 38V30Z" fill="#6366f1" />
        <path d="M26 30L32 42L26 38V30Z" fill="#6366f1" />
        <path
          d="M17 40C17 40 18 50 20 54C22 50 23 40 23 40H17Z"
          fill="url(#flame)"
          className="origin-top animate-flame"
        />
        <defs>
          <linearGradient id="rocketBody" x1="20" y1="2" x2="20" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e2e8f0" />
            <stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="flame" x1="20" y1="40" x2="20" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf24" />
            <stop offset="0.5" stopColor="#f97316" />
            <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
