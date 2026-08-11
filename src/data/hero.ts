import type { HeroContent } from './interface'

export const hero: HeroContent = {
  launchScreen: {
    title: 'Mission Control',
    status: 'SYS OK',
    launchStatus: 'Launch Ready',
    altitude: 'ALT: 000 km',
    liveFeed: '● LIVE FEED',
    velocity: 'VELOCITY: 0.0 m/s',
  },
  eyebrow: '',
  name: 'John Apas',
  headline: 'Building digital experiences across the cosmos of code.',
  currentPosition: 'Software Developer',
  primaryCta: {
    label: 'Initiate Launch',
    targetSection: 'experience',
  },
  secondaryCta: {
    label: 'Open Channel',
    targetSection: 'contact',
  },
  scrollToSection: 'about',
  scrollAriaLabel: 'Scroll to about section',
}
