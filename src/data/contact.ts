import type { ContactContent } from './interface'
import { profile } from './profile'

export const contact: ContactContent = {
  title: `Let's Connect`,
  subtitle: 'Ready to bring your ideas to life? I\'d love to hear about your project and discuss how we can work together.',
  infoTitle: 'Get in Touch',
  infoDescription:
    'Have a project in mind, need help improving an existing system, or looking for a developer to join your team? I\'d love to hear from you.',
  emailLabel: 'Email',
  phoneLabel: 'Phone',
  locationLabel: 'Location',
  responseTimeLabel: 'Response time',
  responseTime: 'Usually within 24 hours',
  socialsLabel: 'Social',
  formTitle: 'Send a Message',
  nameLabel: 'Name',
  namePlaceholder: 'Your name',
  emailFieldLabel: 'Email',
  emailPlaceholder: 'you@example.com',
  messageLabel: 'Message',
  messagePlaceholder: 'How can I help?',
  submitLabel: 'Connect with me',
  submittingLabel: 'Sending…',
  successTitle: 'Message Sent',
  successMessage: "I'll get back to you soon.",
  errorTitle: 'Unable to Send',
  errorMessage: 'Please try again or email me directly.',
  activationTitle: 'Activation Required',
  activationMessage:
    'Check your inbox for a FormSubmit email, click Activate Form, then try again.',
  mailSubjectPrefix: 'Portfolio Contact from',
  email: profile.email,
  phone: profile.phone,
  address: profile.address,
  socials: profile.socials,
  socialLabels: {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
  },
  backToTopLabel: 'Back to top',
  backToTopTarget: 'home',
}

