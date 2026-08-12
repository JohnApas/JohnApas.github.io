import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'

export type AppleNotificationKind =
  | 'success'
  | 'error'
  | 'activation'
  | 'blocked'

export interface AppleNotificationProps {
  kind: AppleNotificationKind
  title: string
  message: string
  closing?: boolean
  appLabel?: string
  onDismiss: () => void
}

export function AppleNotification({
  kind,
  title,
  message,
  closing = false,
  appLabel = 'Portfolio',
  onDismiss,
}: AppleNotificationProps) {
  const titleId = useId()
  const messageId = useId()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onDismiss])

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-110 flex justify-center p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:justify-end sm:p-4 sm:pt-[max(1rem,env(safe-area-inset-top))]"
      aria-live="polite"
    >
      <div
        role="status"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        className={`apple-notification pointer-events-auto w-full max-w-[380px] overflow-hidden rounded-[18px] backdrop-blur-[40px] ${
          closing ? 'apple-notification-out' : 'apple-notification-in'
        }`}
        onClick={onDismiss}
      >
        <div className="flex items-center gap-3 px-3.5 py-3">
          <NotificationIcon kind={kind} />

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <p className="apple-notification-app text-[12px] font-semibold tracking-wide uppercase">
                {appLabel}
              </p>
              <p className="apple-notification-time shrink-0 text-[12px]">
                now
              </p>
            </div>
            <h3
              id={titleId}
              className="apple-notification-title mt-0.5 text-[14px] leading-tight font-semibold tracking-tight"
            >
              {title}
            </h3>
            <p
              id={messageId}
              className="apple-notification-message mt-0.5 text-[13px] leading-snug"
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function NotificationIcon({ kind }: { kind: AppleNotificationKind }) {
  if (kind === 'success') {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#30d158] text-white shadow-sm">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
    )
  }

  if (kind === 'activation') {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#ff9f0a] text-white shadow-sm">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
          />
        </svg>
      </span>
    )
  }

  if (kind === 'blocked') {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#ff453a] text-white shadow-sm">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />
          <path strokeLinecap="round" d="M7.5 7.5l9 9" />
        </svg>
      </span>
    )
  }

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#ff453a] text-white shadow-sm">
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6l12 12M18 6 6 18"
        />
      </svg>
    </span>
  )
}
