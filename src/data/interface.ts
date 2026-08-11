// Hero section interface
export interface LaunchScreenContent {
  title: string
  status: string
  launchStatus?: string
  altitude: string
  liveFeed: string
  velocity: string
}

export interface HeroContent {
  eyebrow: string
  name: string
  headline: string
  currentPosition: string
  primaryCta: {
    label: string
    targetSection: string
  }
  secondaryCta: {
    label: string
    targetSection: string
  }
  /** Optional image shown inside the launch screen */
  image?: string
  imageAlt?: string
  scrollToSection: string
  scrollAriaLabel: string
  launchScreen: LaunchScreenContent
}

// About section interface
export interface Education {
  schoolName: string
  course: string
  startDate?: string
  endDate?: string
}

export interface AboutMeContent {
  title: string
  subtitle: string
  name: string
  /** Optional profile photo; initials are shown when omitted */
  image?: string
  imageAlt?: string
  imageCaption?: string
  launchScreen: LaunchScreenContent
  profileDetails?: string
  locationLabel: string
  address?: string
  educationTitle: string
  education: Education[]
  skillsTitle: string
}

// Experience section interface
export interface Experience {
  id: string
  companyName: string
  projectName?: string
  image?: string
  link?: string
  startDate?: string
  endDate?: string | 'Present'
  title: string
  subtitle?: string
  description: string
  role: string
  techUsed: string[]
}

export interface ExperienceContent {
  title: string
  subtitle: string
  viewProjectLabel: string
  items: Experience[]
}

// Skills section interface
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'other'

export interface Skill {
  name: string
  category?: SkillCategory
  proficiency?: number
}

// Contact section interface
export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
}

// Profile / personal details interface
// (used by About, Skills, and Contact sections)
export interface Profile {
  name: string
  headline: string
  currentPosition: string
  address?: string
  email?: string
  phone?: string
  socials: SocialLinks
  education: Education[]
  profileDetails?: string
  skills: Skill[]
}
