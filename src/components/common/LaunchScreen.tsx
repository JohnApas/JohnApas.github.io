import type { ReactNode } from 'react'
import { hero } from '../../data/hero'
import type { LaunchScreenContent } from '../../data/interface'

interface LaunchScreenProps {
  children: ReactNode
  /** Override bezel / telemetry labels. Defaults to hero.launchScreen */
  content?: LaunchScreenContent
  className?: string
  contentClassName?: string
}

export function LaunchScreen({
  children,
  content,
  className = '',
  contentClassName = '',
}: LaunchScreenProps) {
  const launchScreen = content ?? hero.launchScreen

  return (
    <div className={`relative w-full max-w-3xl ${className}`}>
      {/* Outer bezel */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-slate-700/80 via-slate-900 to-black p-3 shadow-[0_0_60px_rgba(34,211,238,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]">
        {/* Top control bar */}
        <div className="mb-3 flex items-center justify-between rounded-t-xl border border-white/10 bg-black/60 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-highlight md:text-xs">
            {launchScreen.title}
          </p>

          <p className="font-mono text-[10px] text-emerald-400 md:text-xs">
            {launchScreen.status}
          </p>
        </div>

        {/* Inner screen */}
        <div className="relative overflow-hidden rounded-2xl border border-highlight/30 bg-[#050816]">
          {/* Screen glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_65%)]" />

          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0 animate-scanlines bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />

          {/* Corner brackets */}
          <span className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-highlight/60" />
          <span className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-highlight/60" />
          <span className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-highlight/60" />
          <span className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-highlight/60" />

          {/* Content */}
          <div
            className={`relative z-10 px-6 py-14 text-center md:px-12 md:py-16 ${contentClassName}`}
          >
            {children}
          </div>

          {/* Launch pad / rocket silhouette at bottom of screen */}
          {launchScreen.launchStatus && (
            <div className="relative z-10 flex flex-col items-center pb-6">
              <div className="animate-launch-bob">
                <svg
                  width="28"
                  height="48"
                  viewBox="0 0 28 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14 2C11 8 10 14 10 22H18C18 14 17 8 14 2Z"
                    fill="#e2e8f0"
                  />
                  <circle cx="14" cy="14" r="2.5" fill="#22d3ee" />
                  <path d="M10 24L6 34L10 30V24Z" fill="#6366f1" />
                  <path d="M18 24L22 34L18 30V24Z" fill="#6366f1" />
                  <path
                    d="M12 32C12 32 13 42 14 46C15 42 16 32 16 32H12Z"
                    fill="#f97316"
                    className="origin-top animate-flame"
                  />
                </svg>
              </div>
              <div className="mt-1 h-px w-24 bg-gradient-to-r from-transparent via-highlight/60 to-transparent" />
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-highlight/70">
                {launchScreen.launchStatus}
              </p>
            </div>
          )}
        </div>

        {/* Bottom panel */}
        <div className="mt-3 flex items-center justify-between rounded-b-xl border border-white/10 bg-black/60 px-4 py-2 font-mono text-[10px] text-text-muted md:text-xs">
          <span>{launchScreen.altitude}</span>
          <span className="text-highlight animate-pulse">{launchScreen.liveFeed}</span>
          <span>{launchScreen.velocity}</span>
        </div>
      </div>
    </div>
  )
}
