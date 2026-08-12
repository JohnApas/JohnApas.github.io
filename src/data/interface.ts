// Hero section interface
export interface LaunchScreenContent {
  /** macOS title bar text, e.g. "johnapas — zsh" */
  title: string
  /** Optional shell prompt at the bottom of the window */
  prompt?: string
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
  resumeLaunchScreen: LaunchScreenContent
  resume: {
    fileName: string
    filePath?: string
    clickHint: string
    openAriaLabel: string
    closeAriaLabel: string
    lines: string[]
    downloadCommand: string
    downloadLabel: string
  }
  profileDetails?: string
  locationLabel: string
  address?: string
  educationTitle: string
  education: Education[]
  skillsTitle: string
}

// Experience section interface
export interface ExperienceProject {
  id: number
  title: string
  description: string
  role?: string
  link?: string
  image?: string
  imageAlt?: string
  techUsed?: string[]
}

export interface Experience {
  id: string
  companyName: string
  projectName?: string
  image?: string
  /** Projects shown in the Apple-style modal when “View Projects” is clicked */
  projects?: ExperienceProject[]
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
  projectsModalTitle?: string
  items: Experience[]
}

// Skills (used by About carousel / profile)
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'other'

export interface Skill {
  name: string
  category?: SkillCategory
  proficiency?: number
}

// Services section interface
export interface ServiceItem {
  number: string
  title: string
  description: string
  icon: 'fullstack' | 'website' | 'integrations' | 'maintenance'
  tech?: string[]
}

export interface ServicesContent {
  title: string
  subtitle: string
  items: ServiceItem[]
}

// Contact section interface
export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
}

export interface ContactContent {
  title: string
  subtitle: string
  infoTitle: string
  infoDescription: string
  emailLabel: string
  phoneLabel: string
  locationLabel: string
  responseTimeLabel: string
  responseTime: string
  socialsLabel: string
  formTitle: string
  nameLabel: string
  namePlaceholder: string
  emailFieldLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submitLabel: string
  mailSubjectPrefix: string
  email?: string
  phone?: string
  address?: string
  socials: SocialLinks
  socialLabels: {
    github: string
    linkedin: string
    twitter: string
  }
  backToTopLabel: string
  backToTopTarget: string
}

// Profile / personal details interface
// (used by About and Contact sections)
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

// Resume / PDF generation
export interface ResumeSkillCategory {
  category: string
  skills: string[]
}

export interface ResumeContent {
  fileName: string
  name: string
  profile: string
  coreSkills: ResumeSkillCategory[]
}
