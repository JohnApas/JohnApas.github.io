import { useCallback, useEffect, useState } from 'react'
import type { AppleNotificationKind } from '../components/common/AppleNotification'

const VISIBLE_MS = 2000
const EXIT_MS = 280

export interface AppleNotificationState {
  kind: AppleNotificationKind
  title: string
  message: string
}

export function useAppleNotification(options?: { onDismissed?: () => void }) {
  const onDismissed = options?.onDismissed
  const [notification, setNotification] =
    useState<AppleNotificationState | null>(null)
  const [closing, setClosing] = useState(false)

  const show = useCallback(
    (kind: AppleNotificationKind, title: string, message: string) => {
      setClosing(false)
      setNotification({ kind, title, message })
    },
    [],
  )

  const dismiss = useCallback(() => {
    setClosing(true)
  }, [])

  useEffect(() => {
    if (!notification || closing) return

    const timer = window.setTimeout(() => {
      setClosing(true)
    }, VISIBLE_MS)

    return () => window.clearTimeout(timer)
  }, [notification, closing])

  useEffect(() => {
    if (!closing) return

    const timer = window.setTimeout(() => {
      setNotification(null)
      setClosing(false)
      onDismissed?.()
    }, EXIT_MS)

    return () => window.clearTimeout(timer)
  }, [closing, onDismissed])

  return { notification, closing, show, dismiss }
}
