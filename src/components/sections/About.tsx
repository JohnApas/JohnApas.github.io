import { useCallback, useEffect, useState } from 'react'
import { aboutMe } from '../../data/aboutMe'
import { LaunchScreen } from '../common/LaunchScreen'
import { SectionTitle } from '../common/SectionTitle'
import { AboutCarousel } from './AboutCarousel'

const GLITCH_DURATION_MS = 550

export function About() {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchKey, setGlitchKey] = useState(0)

  const initials = aboutMe.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true)
    setGlitchKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (!isGlitching) return

    const timer = window.setTimeout(() => {
      setIsGlitching(false)
    }, GLITCH_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [isGlitching, glitchKey])

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={aboutMe.title} subtitle={aboutMe.subtitle} />

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex justify-center">
            <LaunchScreen
              content={aboutMe.launchScreen}
              className="max-w-md"
              contentClassName="!py-8 !px-6 md:!py-10"
            >
              <div
                key={glitchKey}
                className={`mx-auto h-52 w-52 overflow-hidden rounded-full md:h-64 md:w-64 ${
                  isGlitching ? 'crt-glitch' : ''
                }`}
                style={
                  aboutMe.image
                    ? {
                        backgroundImage: `url(${aboutMe.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : undefined
                }
              >
                {aboutMe.image ? (
                  <img
                    src={aboutMe.image}
                    alt={aboutMe.imageAlt ?? aboutMe.name}
                    className="h-full w-full object-cover ring-2 ring-highlight/40 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center border-2 border-highlight/40 bg-space-secondary text-5xl font-bold text-accent">
                    {initials}
                  </div>
                )}
              </div>

              {aboutMe.imageCaption && (
                <p className="mt-4 flex items-center justify-center gap-2 text-sm italic text-text-muted">
                  <svg
                    className="h-4 w-4 shrink-0 text-highlight"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="6" height="6" rx="1" />
                    <rect
                      x="2"
                      y="10.5"
                      width="5"
                      height="3"
                      rx="0.5"
                      opacity="0.85"
                    />
                    <rect
                      x="17"
                      y="10.5"
                      width="5"
                      height="3"
                      rx="0.5"
                      opacity="0.85"
                    />
                    <rect x="7" y="11.25" width="2" height="1.5" />
                    <rect x="15" y="11.25" width="2" height="1.5" />
                    <circle
                      cx="15.5"
                      cy="7.5"
                      r="2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <line
                      x1="14"
                      y1="9"
                      x2="12.5"
                      y2="10.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                  {aboutMe.imageCaption}
                </p>
              )}
            </LaunchScreen>
          </div>

          <div className="space-y-6">
            {aboutMe.profileDetails && (
              <p className="text-lg leading-relaxed text-text-muted">
                {aboutMe.profileDetails}
              </p>
            )}

            {aboutMe.address && (
              <p className="text-sm text-text-muted">
                <span className="text-highlight">{aboutMe.locationLabel}</span>{' '}
                {aboutMe.address}
              </p>
            )}

            <AboutCarousel onSlideChange={triggerGlitch} />
          </div>
        </div>
      </div>
    </section>
  )
}
