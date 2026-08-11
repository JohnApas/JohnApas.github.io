import type { CSSProperties } from 'react'

interface PlanetProps {
  size: number
  color: string
  ringColor?: string
  hasRing?: boolean
  className?: string
  style?: CSSProperties
}

export function Planet({
  size,
  color,
  ringColor = 'rgba(255,255,255,0.25)',
  hasRing = false,
  className = '',
  style,
}: PlanetProps) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <div
        className="relative h-full w-full rounded-full shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.45),0_0_40px_currentColor]"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${color}, ${shade(color, -40)})`,
          color,
        }}
      >
        {hasRing && (
          <div
            className="absolute left-1/2 top-1/2 h-[18%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-[3px] opacity-70"
            style={{
              borderColor: ringColor,
              transform: 'translate(-50%, -50%) rotateX(70deg) rotateZ(-20deg)',
            }}
          />
        )}
      </div>
    </div>
  )
}

function shade(hex: string, percent: number): string {
  const cleaned = hex.replace('#', '')
  const num = parseInt(cleaned, 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + percent))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent))
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
