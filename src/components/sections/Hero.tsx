import { hero } from '../../data/hero'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { Button } from '../common/Button'
import { LaunchScreen } from '../common/LaunchScreen'

export function Hero() {
  const { scrollToSection } = useScrollToSection()

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16 md:px-6"
    >
      <LaunchScreen>
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.3em] text-highlight md:text-sm">
          {hero.eyebrow}
        </p>

        {hero.image && (
          <img
            src={hero.image}
            alt={hero.imageAlt ?? hero.name}
            className="mx-auto mb-6 h-28 w-28 rounded-full object-cover ring-2 ring-highlight/40 shadow-[0_0_30px_rgba(34,211,238,0.3)] md:h-36 md:w-36"
          />
        )}

        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          <span className="bg-gradient-to-r from-white via-highlight to-accent bg-clip-text text-transparent animate-glow">
            {hero.name}
          </span>
        </h1>

        <p className="mb-2 text-base text-text-muted md:text-xl">
          {hero.headline}
        </p>

        <p className="mb-8 font-mono text-sm text-accent md:text-base">
          // {hero.currentPosition}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => scrollToSection(hero.primaryCta.targetSection)}>
            {hero.primaryCta.label}
          </Button>
          <Button
            variant="secondary"
            onClick={() => scrollToSection(hero.secondaryCta.targetSection)}
          >
            {hero.secondaryCta.label}
          </Button>
        </div>
      </LaunchScreen>

      <button
        onClick={() => scrollToSection(hero.scrollToSection)}
        className="mt-10 animate-bounce text-text-muted transition-colors hover:text-highlight"
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
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </section>
  )
}
