import { hero } from '../../data/hero'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { Button } from '../common/Button'
import { LaunchScreen } from '../common/LaunchScreen'

export function Hero() {
  const { scrollToSection } = useScrollToSection()

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 pt-24 pb-12 sm:px-5 md:px-6 md:pb-16"
    >
      <LaunchScreen className="w-full">
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

        <h1 className="mb-3 text-4xl font-semibold tracking-tight break-words text-text sm:text-5xl md:text-6xl">
          {hero.name}
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
            onClick={() => scrollToSection(hero.primaryCta.targetSection)}
          >
            {hero.primaryCta.label}
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant="secondary"
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
    </section>
  )
}
