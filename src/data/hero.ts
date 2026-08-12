import type { HeroContent } from './interface'

export const hero: HeroContent = {
  launchScreen: {
    title: 'johnapas — zsh — 80x24',
    prompt: 'john@portfolio ~ %',
  },
  eyebrow: '',
  name: 'John Apas',
  headline: 'Turning ideas into scalable, real-world solutions.',
  currentPosition: 'Full-Stack Software Engineer',
  primaryCta: {
    label: 'View Work',
    targetSection: 'experience',
  },
  secondaryCta: {
    label: 'Get in Touch',
    targetSection: 'contact',
  },
  scrollToSection: 'about',
  scrollAriaLabel: 'Scroll to about section',
  welcomeBackName: "I'm Back!",
  actionBlocked: {
    title: 'Action Blocked',
    message: "This window can't be closed right now.",
    closeAriaLabel: 'Close window',
  },
  minimizeAriaLabel: 'Minimize window',
}
