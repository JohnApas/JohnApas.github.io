import { useCallback, useState } from 'react'
import { aboutMe } from '../../data/aboutMe'
import { useLaunchWindowChrome } from '../../hooks/useLaunchWindowChrome'
import { generateResumePdf } from '../../utils/generateResumePdf'
import { AppleNotification } from '../common/AppleNotification'
import { LaunchScreen } from '../common/LaunchScreen'
import { SectionTitle } from '../common/SectionTitle'
import { AboutCarousel } from './AboutCarousel'

const TRASH_CLOSE_MS = 520

export function About() {
  const [showResumeTerminal, setShowResumeTerminal] = useState(false)
  const [isTrashing, setIsTrashing] = useState(false)
  const {
    notification,
    closing,
    dismiss,
    isBusy,
    windowMotionClassName,
    handleBlockedClose,
    handleMinimize,
  } = useLaunchWindowChrome({
    blockedTitle: aboutMe.actionBlocked.title,
    blockedMessage: aboutMe.actionBlocked.message,
    enabled: !showResumeTerminal,
  })
  const initials = aboutMe.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  const closeResumeTerminal = useCallback(() => {
    if (!showResumeTerminal || isTrashing) return
    setIsTrashing(true)
    window.setTimeout(() => {
      setShowResumeTerminal(false)
      setIsTrashing(false)
    }, TRASH_CLOSE_MS)
  }, [isTrashing, showResumeTerminal])

  const windowClassName = [
    isTrashing ? 'terminal-to-trash' : '',
    !showResumeTerminal ? windowMotionClassName : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title={aboutMe.title} subtitle={aboutMe.subtitle} />

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex justify-center">
            <LaunchScreen
              content={
                showResumeTerminal
                  ? aboutMe.resumeLaunchScreen
                  : aboutMe.launchScreen
              }
              className="w-full max-w-md"
              windowClassName={windowClassName}
              contentClassName={
                showResumeTerminal
                  ? '!py-5 !px-4 sm:!py-6 sm:!px-5 text-left'
                  : '!py-6 !px-4 sm:!py-8 sm:!px-6 md:!py-10'
              }
              onClose={
                showResumeTerminal ? closeResumeTerminal : handleBlockedClose
              }
              onMinimize={
                showResumeTerminal ? closeResumeTerminal : handleMinimize
              }
              closeAriaLabel={
                showResumeTerminal
                  ? aboutMe.resume.closeAriaLabel
                  : aboutMe.actionBlocked.closeAriaLabel
              }
              minimizeAriaLabel={
                showResumeTerminal
                  ? aboutMe.resume.closeAriaLabel
                  : aboutMe.minimizeAriaLabel
              }
            >
              {showResumeTerminal ? (
                <ResumeTerminal />
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setShowResumeTerminal(true)}
                    aria-label={aboutMe.resume.openAriaLabel}
                    title={aboutMe.resume.clickHint}
                    disabled={isBusy}
                    className="group relative mx-auto block h-44 w-44 overflow-hidden rounded-full transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none sm:h-52 sm:w-52 md:h-64 md:w-64"
                  >
                    {aboutMe.image ? (
                      <img
                        src={aboutMe.image}
                        alt={aboutMe.imageAlt ?? aboutMe.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-space-secondary text-4xl font-semibold text-text sm:text-5xl">
                        {initials}
                      </div>
                    )}
                    <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/10 to-transparent pb-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
                        ./resume.sh
                      </span>
                    </span>
                  </button>

                  {aboutMe.imageCaption && (
                    <p className="mt-4 text-sm text-text-muted">
                      {aboutMe.imageCaption}
                    </p>
                  )}
                </>
              )}
            </LaunchScreen>
          </div>

          <div className="min-w-0 space-y-5 sm:space-y-6">
            {aboutMe.profileDetails && (
              <p className="text-base leading-relaxed text-pretty text-text-muted sm:text-lg">
                {aboutMe.profileDetails}
              </p>
            )}

            {aboutMe.address && (
              <p className="text-sm text-text-muted">
                <span className="text-text">{aboutMe.locationLabel}</span>{' '}
                {aboutMe.address}
              </p>
            )}

            <AboutCarousel />
          </div>
        </div>
      </div>

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

function ResumeTerminal() {
  const { resume } = aboutMe

  return (
    <div className="font-mono text-[12px] leading-relaxed text-white/85 sm:text-[13px]">
      {resume.lines.map((line, index) => (
        <p
          key={`${index}-${line}`}
          className={
            line.startsWith('john@') || line.startsWith('#!/')
              ? 'text-white/90'
              : line.startsWith('#')
                ? 'text-white/45'
                : line.endsWith('.pdf')
                  ? 'text-[#28c840]'
                  : 'text-white/75'
          }
        >
          {line || '\u00A0'}
        </p>
      ))}

      <button
        type="button"
        onClick={generateResumePdf}
        aria-label={resume.downloadLabel}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-[#2997ff] transition-colors hover:border-[#2997ff]/40 hover:bg-white/10"
      >
        <span aria-hidden="true">⬇</span>
        <span>{resume.downloadCommand}</span>
      </button>

      <p className="mt-4 text-white/40">
        tip: red or yellow closes this window
      </p>
    </div>
  )
}
