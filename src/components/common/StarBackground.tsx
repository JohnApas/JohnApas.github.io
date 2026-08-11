import { useEffect, useState } from 'react'
import { Planet } from './Planet'
import { Rocket } from './Rocket'

interface Star {
  id: number
  left: number
  top: number
  size: number
  delay: number
  duration: number
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }))
}

const planets = [
  {
    id: 'planet-1',
    size: 90,
    color: '#6366f1',
    hasRing: true,
    className: 'animate-float-slow',
    style: { top: '12%', left: '8%', opacity: 0.7 },
  },
  {
    id: 'planet-2',
    size: 55,
    color: '#22d3ee',
    className: 'animate-float-medium',
    style: { top: '60%', right: '10%', opacity: 0.65 },
  },
  {
    id: 'planet-3',
    size: 120,
    color: '#a855f7',
    className: 'animate-float-reverse',
    style: { bottom: '8%', left: '15%', opacity: 0.45 },
  },
  {
    id: 'planet-4',
    size: 40,
    color: '#f472b6',
    hasRing: true,
    className: 'animate-float-medium',
    style: { top: '25%', right: '20%', opacity: 0.55, animationDelay: '2s' },
  },
  {
    id: 'planet-5',
    size: 70,
    color: '#38bdf8',
    className: 'animate-float-slow',
    style: { top: '70%', left: '55%', opacity: 0.4, animationDelay: '4s' },
  },
]

const rockets = [
  {
    id: 'rocket-1',
    size: 36,
    className: 'animate-rocket-diagonal',
    style: { top: '20%', left: '-10%' },
  },
  {
    id: 'rocket-2',
    size: 28,
    className: 'animate-rocket-horizontal',
    style: { top: '75%', left: '-8%', animationDelay: '12s' },
  },
  {
    id: 'rocket-3',
    size: 32,
    className: 'animate-rocket-up',
    style: { bottom: '-10%', left: '70%', animationDelay: '20s' },
  },
]

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const count = window.innerWidth < 768 ? 80 : 150
    setStars(generateStars(count))
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Nebula layers */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-nebula" />
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-highlight/15 blur-3xl animate-nebula-delayed" />
      <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl animate-nebula" />

      {/* Stars */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: star.size > 2 ? '0 0 4px rgba(255,255,255,0.8)' : undefined,
          }}
        />
      ))}

      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          size={planet.size}
          color={planet.color}
          hasRing={planet.hasRing}
          className={planet.className}
          style={planet.style}
        />
      ))}

      {/* Rockets */}
      {rockets.map((rocket) => (
        <Rocket
          key={rocket.id}
          size={rocket.size}
          className={rocket.className}
          style={rocket.style}
        />
      ))}

      {/* Soft vignette so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark/40 via-transparent to-space-dark/60" />
    </div>
  )
}
