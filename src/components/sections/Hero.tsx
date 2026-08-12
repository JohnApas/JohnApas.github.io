import { useEffect, useRef, useState } from 'react'
import { hero } from '../../data/hero'
import { useLaunchWindowChrome } from '../../hooks/useLaunchWindowChrome'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { AppleNotification } from '../common/AppleNotification'
import { Button } from '../common/Button'
import { LaunchScreen } from '../common/LaunchScreen'

const TYPE_MS = 55
const DELETE_MS = 35
const HOLD_MS = 2000

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export function Hero() {
  const { scrollToSection } = useScrollToSection()
  const {
    notification,
    closing,
    dismiss,
    isBusy,
    windowMotion,
    windowMotionClassName,
    handleBlockedClose,
    handleMinimize,
  } = useLaunchWindowChrome({
    blockedTitle: hero.actionBlocked.title,
    blockedMessage: hero.actionBlocked.message,
  })
  const [displayName, setDisplayName] = useState(hero.name)
  const [isTyping, setIsTyping] = useState(false)
  const typingGen = useRef(0)

  useEffect(() => {
    if (windowMotion !== 'restoring') return

    const gen = ++typingGen.current

    const stillActive = () => typingGen.current === gen

    let current = ''

    const typeText = async (text: string) => {
      for (let i = 1; i <= text.length; i += 1) {
        if (!stillActive()) return
        current = text.slice(0, i)
        setDisplayName(current)
        await wait(TYPE_MS)
      }
    }

    const deleteText = async () => {
      while (current.length > 0 && stillActive()) {
        current = current.slice(0, -1)
        setDisplayName(current)
        await wait(DELETE_MS)
      }
    }

    const run = async () => {
      setIsTyping(true)
      current = ''
      setDisplayName('')
      await typeText(hero.welcomeBackName)
      if (!stillActive()) return
      await wait(HOLD_MS)
      if (!stillActive()) return
      await deleteText()
      if (!stillActive()) return
      await typeText(hero.name)
      if (!stillActive()) return
      setIsTyping(false)
    }

    void run()
    // Do not cancel on cleanup — restore → idle would abort mid-sequence.
    // A new restore increments typingGen and invalidates this run.
  }, [windowMotion])

  useEffect(() => {
    return () => {
      typingGen.current += 1
    }
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 pt-24 pb-12 sm:px-5 md:px-6 md:pb-16"
    >
      <LaunchScreen
        className="w-full"
        windowClassName={windowMotionClassName}
        onClose={handleBlockedClose}
        onMinimize={handleMinimize}
        closeAriaLabel={hero.actionBlocked.closeAriaLabel}
        minimizeAriaLabel={hero.minimizeAriaLabel}
      >
        {hero.eyebrow && (
          <p className="mb-4 text-sm font-medium tracking-wide text-text-muted">
            {hero.eyebrow}
          </p>
        )}

        {hero.image && (
          <img
            src={hero.image}
            alt={hero.imageAlt ?? hero.name}
            className="mx-auto mb-6 h-28 w-28 rounded-full object-cover md:h-36 md:w-36"
          />
        )}

        <h1
          className="mb-3 text-4xl font-semibold tracking-tight break-words text-text sm:text-5xl md:text-6xl"
          aria-label={hero.name}
        >
          <span>{displayName}</span>
          {isTyping && (
            <span
              className="terminal-cursor ml-1 inline-block h-[0.85em] w-[0.45ch] translate-y-[0.08em] bg-text align-baseline"
              aria-hidden="true"
            />
          )}
        </h1>

        <p className="mx-auto mb-2 max-w-xl text-base text-pretty text-text-muted sm:text-lg md:text-2xl">
          {hero.headline}
        </p>

        <p className="mb-8 text-sm text-text-muted md:text-base">
          {hero.currentPosition}
        </p>

        <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3.5">
          <Button
            className="w-full sm:w-auto"
            disabled={isBusy}
            onClick={() => scrollToSection(hero.primaryCta.targetSection)}
          >
            {hero.primaryCta.label}
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant="secondary"
            disabled={isBusy}
            onClick={() => scrollToSection(hero.secondaryCta.targetSection)}
          >
            {hero.secondaryCta.label}
          </Button>
        </div>
      </LaunchScreen>

      <button
        onClick={() => scrollToSection(hero.scrollToSection)}
        className="mt-8 text-text-muted transition-colors hover:text-text md:mt-10"
        aria-label={hero.scrollAriaLabel}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {notification && (
        <AppleNotification
          kind={notification.kind}
          title={notification.title}
          message={notification.message}
          closing={closing}
          onDismiss={dismiss}
        />
      )}
    </section>
  )
}
