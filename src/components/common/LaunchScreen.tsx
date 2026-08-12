import type { ReactNode } from 'react'
import { hero } from '../../data/hero'
import type { LaunchScreenContent } from '../../data/interface'

interface LaunchScreenProps {
  children: ReactNode
  /** Override window title / prompt. Defaults to hero.launchScreen */
  content?: LaunchScreenContent
  className?: string
  contentClassName?: string
  windowClassName?: string
  /** Makes the red traffic light clickable (e.g. to close a view) */
  onClose?: () => void
  /** Makes the yellow traffic light clickable */
  onMinimize?: () => void
  closeAriaLabel?: string
  minimizeAriaLabel?: string
}

export function LaunchScreen({
  children,
  content,
  className = '',
  contentClassName = '',
  windowClassName = '',
  onClose,
  onMinimize,
  closeAriaLabel = 'Close',
  minimizeAriaLabel = 'Minimize',
}: LaunchScreenProps) {
  const launchScreen = content ?? hero.launchScreen

  return (
    <div className={`relative w-full max-w-3xl ${className}`}>
      <div
        className={`terminal-window overflow-hidden rounded-xl border border-white/10 bg-[#1c1c1c] shadow-[0_24px_80px_rgba(0,0,0,0.55)] ${windowClassName}`}
      >
        <div className="relative flex h-11 items-center border-b border-white/10 bg-[#2d2d2d] px-4">
          <div className="group/traffic z-10 flex items-center gap-2">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                aria-label={closeAriaLabel}
                className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] transition-opacity hover:brightness-95"
              >
                <TrafficCloseIcon />
              </button>
            ) : (
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57]">
                <TrafficCloseIcon />
              </span>
            )}

            {onMinimize ? (
              <button
                type="button"
                onClick={onMinimize}
                aria-label={minimizeAriaLabel}
                className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] transition-opacity hover:brightness-95"
              >
                <TrafficMinimizeIcon />
              </button>
            ) : (
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e]">
                <TrafficMinimizeIcon />
              </span>
            )}

            <span
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#8e8e93]"
              aria-hidden="true"
              title="Unavailable"
            />
          </div>

          <p className="pointer-events-none absolute inset-x-14 flex h-full items-center justify-center truncate font-mono text-[11px] text-white/60 sm:inset-x-16 sm:text-xs">
            {launchScreen.title}
          </p>
        </div>

        <div className="bg-[#1c1c1c]">
          <div
            className={`relative px-4 py-8 text-center sm:px-6 sm:py-12 md:px-12 md:py-14 ${contentClassName}`}
          >
            {children}
          </div>

          {launchScreen.prompt && (
            <p className="truncate px-4 pb-4 text-left font-mono text-xs text-white/80 sm:px-6 sm:pb-5 sm:text-sm">
              <span>{launchScreen.prompt}</span>
              <span className="terminal-cursor ml-1 inline-block h-4 w-2 translate-y-0.5 bg-white align-middle" />
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function TrafficCloseIcon() {
  return (
    <svg
      className="h-1.5 w-1.5 opacity-0 group-hover/traffic:opacity-70"
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path
        d="M2 2l8 8M10 2L2 10"
        stroke="#4a0000"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TrafficMinimizeIcon() {
  return (
    <svg
      className="h-1.5 w-1.5 opacity-0 group-hover/traffic:opacity-70"
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path
        d="M2 6h8"
        stroke="#5c3b00"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
