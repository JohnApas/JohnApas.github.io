import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppleNotification } from './useAppleNotification'

const RESTORE_ANIM_MS = 480
const MINIMIZE_HOLD_MS = 2500

type WindowMotion = 'idle' | 'minimizing' | 'restoring'

export function useLaunchWindowChrome(options: {
  blockedTitle: string
  blockedMessage: string
  /** When false, minimize/close chrome handlers no-op (e.g. another mode owns the lights) */
  enabled?: boolean
}) {
  const { blockedTitle, blockedMessage, enabled = true } = options
  const [windowMotion, setWindowMotion] = useState<WindowMotion>('idle')
  const minimizeTimers = useRef<number[]>([])
  const { notification, closing, show, dismiss } = useAppleNotification()

  const clearMinimizeTimers = useCallback(() => {
    for (const id of minimizeTimers.current) window.clearTimeout(id)
    minimizeTimers.current = []
  }, [])

  useEffect(() => clearMinimizeTimers, [clearMinimizeTimers])

  const isBusy = windowMotion !== 'idle'

  const handleBlockedClose = useCallback(() => {
    if (!enabled || isBusy) return
    show('blocked', blockedTitle, blockedMessage)
  }, [blockedMessage, blockedTitle, enabled, isBusy, show])

  const handleMinimize = useCallback(() => {
    if (!enabled || isBusy) return

    clearMinimizeTimers()
    setWindowMotion('minimizing')

    const restoreTimer = window.setTimeout(() => {
      setWindowMotion('restoring')
      const idleTimer = window.setTimeout(() => {
        setWindowMotion('idle')
      }, RESTORE_ANIM_MS)
      minimizeTimers.current.push(idleTimer)
    }, MINIMIZE_HOLD_MS)

    minimizeTimers.current.push(restoreTimer)
  }, [clearMinimizeTimers, enabled, isBusy])

  const windowMotionClassName = [
    windowMotion === 'minimizing' ? 'modal-minimize' : '',
    windowMotion === 'restoring' ? 'modal-restore' : '',
    isBusy ? 'pointer-events-none' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return {
    notification,
    closing,
    dismiss,
    isBusy,
    windowMotion,
    windowMotionClassName,
    handleBlockedClose,
    handleMinimize,
  }
}
