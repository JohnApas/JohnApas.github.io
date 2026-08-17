import { useCallback, useState, type ReactNode } from 'react'
import { contact } from '../../data/contact'
import { useAppleNotification } from '../../hooks/useAppleNotification'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { AppleNotification } from '../common/AppleNotification'
import { Button } from '../common/Button'
import { SectionTitle } from '../common/SectionTitle'

const inputClass =
  'w-full max-w-full rounded-xl border-0 bg-space-dark px-3.5 py-3 text-base text-text outline-none ring-1 ring-border/60 transition-[box-shadow,background-color] placeholder:text-text-muted/50 focus:bg-surface focus:ring-2 focus:ring-accent/40 sm:rounded-2xl sm:px-4 sm:py-3.5'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'activation'

export function Contact() {
  const { scrollToSection } = useScrollToSection()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [honeypot, setHoneypot] = useState('')
  const resetStatus = useCallback(() => setStatus('idle'), [])
  const { notification, closing, show, dismiss } = useAppleNotification({
    onDismissed: resetStatus,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact.email || status === 'submitting') return

    // Bot filled the honeypot — pretend success
    if (honeypot.trim()) {
      setStatus('success')
      show('success', contact.successTitle, contact.successMessage)
      return
    }

    setStatus('submitting')

    try {
      const payload = new FormData()
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('message', formData.message)
      payload.append(
        '_subject',
        `${contact.mailSubjectPrefix} ${formData.name}`,
      )
      payload.append('_template', 'table')
      payload.append('_captcha', 'false')
      payload.append('_replyto', formData.email)

      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(contact.email)}`,
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: payload,
        },
      )

      const result = (await response.json()) as {
        success?: string | boolean
        message?: string
      }

      const apiMessage = result.message ?? ''
      const isSuccess =
        result.success === true || result.success === 'true'
      const needsActivation = /activat/i.test(apiMessage)

      if (needsActivation) {
        setStatus('activation')
        show(
          'activation',
          contact.activationTitle,
          contact.activationMessage,
        )
        return
      }

      if (!response.ok || !isSuccess) {
        setStatus('error')
        show('error', contact.errorTitle, apiMessage || contact.errorMessage)
        return
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      show('success', contact.successTitle, contact.successMessage)
    } catch {
      setStatus('error')
      show('error', contact.errorTitle, contact.errorMessage)
    }
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <div className="mx-auto min-w-0 max-w-5xl">
        <SectionTitle title={contact.title} subtitle={contact.subtitle} />

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_8px_40px_rgba(0,0,0,0.04)] sm:rounded-[24px] md:rounded-[28px]">
          <div className="grid min-w-0 md:grid-cols-2">
            {/* Form first on mobile so users can message without scrolling past info */}
            <div className="order-1 min-w-0 p-5 sm:p-8 md:order-2 md:p-10">
              <h3 className="mb-5 text-lg font-semibold tracking-tight text-text sm:mb-6 sm:text-xl">
                {contact.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="relative space-y-4 sm:space-y-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 h-px w-px overflow-hidden opacity-0"
                >
                  <input
                    type="text"
                    name="_gotcha"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-text-muted"
                  >
                    {contact.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    name="name"
                    autoComplete="name"
                    enterKeyHint="next"
                    placeholder={contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={status === 'submitting'}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-text-muted"
                  >
                    {contact.emailFieldLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    enterKeyHint="next"
                    placeholder={contact.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={status === 'submitting'}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-text-muted"
                  >
                    {contact.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    name="message"
                    rows={4}
                    enterKeyHint="send"
                    placeholder={contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    disabled={status === 'submitting'}
                    className={`${inputClass} min-h-[120px] resize-y sm:min-h-[140px] sm:resize-none`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[180px]"
                >
                  {status === 'submitting'
                    ? contact.submittingLabel
                    : contact.submitLabel}
                </Button>
              </form>
            </div>

            <div className="order-2 flex min-w-0 flex-col justify-between gap-6 border-t border-border/70 bg-space-dark/40 p-5 sm:gap-8 sm:p-8 md:order-1 md:gap-10 md:border-t-0 md:border-r md:p-10">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                  {contact.infoTitle}
                </h3>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-pretty text-text-muted sm:text-[15px]">
                  {contact.infoDescription}
                </p>
              </div>

              <div className="space-y-1">
                {contact.email && (
                  <ContactRow
                    label={contact.emailLabel}
                    href={`mailto:${contact.email}`}
                    value={contact.email}
                    icon={<MailIcon />}
                  />
                )}

                {contact.phone && (
                  <ContactRow
                    label={contact.phoneLabel}
                    href={`tel:${contact.phone}`}
                    value={contact.phone}
                    icon={<PhoneIcon />}
                  />
                )}

                {contact.address && (
                  <ContactRow
                    label={contact.locationLabel}
                    value={contact.address}
                    icon={<PinIcon />}
                  />
                )}

                {contact.responseTime && (
                  <ContactRow
                    label={contact.responseTimeLabel}
                    value={contact.responseTime}
                    icon={<ClockIcon />}
                  />
                )}
              </div>

              <div>
                <p className="mb-3 text-xs font-medium tracking-wide text-text-muted uppercase">
                  {contact.socialsLabel}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {contact.socials.github && (
                    <SocialChip
                      href={contact.socials.github}
                      label={contact.socialLabels.github}
                      icon={<GitHubIcon />}
                    />
                  )}
                  {contact.socials.linkedin && (
                    <SocialChip
                      href={contact.socials.linkedin}
                      label={contact.socialLabels.linkedin}
                      icon={<LinkedInIcon />}
                    />
                  )}
                  {contact.socials.twitter && (
                    <SocialChip
                      href={contact.socials.twitter}
                      label={contact.socialLabels.twitter}
                      icon={<TwitterIcon />}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <button
            type="button"
            onClick={() => scrollToSection(contact.backToTopTarget)}
            aria-label={contact.backToTopLabel}
            title={contact.backToTopLabel}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-surface text-text-muted ring-1 ring-border/70 transition-all hover:text-text hover:ring-accent/40 active:scale-95"
          >
            <ArrowUpIcon />
          </button>
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

function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string
  value: string
  href?: string
  icon: ReactNode
}) {
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-accent shadow-sm ring-1 ring-border/60">
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-xs text-text-muted">{label}</span>
        <span className="block break-words text-[14px] font-medium text-text sm:text-[15px]">
          {value}
        </span>
      </span>
      {href && (
        <span className="shrink-0 text-text-muted/70" aria-hidden="true">
          <ChevronIcon />
        </span>
      )}
    </>
  )

  const className =
    'flex w-full min-w-0 items-start gap-3 rounded-2xl px-1.5 py-2.5 transition-colors hover:bg-surface/80 sm:items-center sm:px-2'

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    )
  }

  return <div className={className}>{content}</div>
}

function SocialChip({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface text-text ring-1 ring-border/60 transition-colors hover:bg-text/5 hover:text-accent"
    >
      {icon}
    </a>
  )
}

function MailIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.5-.36c1.1.37 2.3.57 3.5.57a1.5 1.5 0 0 1 1.5 1.5V20a1.5 1.5 0 0 1-1.5 1.5C11.4 21.5 2.5 12.6 2.5 2.5A1.5 1.5 0 0 1 4 1h2.9A1.5 1.5 0 0 1 8.4 2.5c0 1.2.2 2.4.57 3.5a1.5 1.5 0 0 1-.36 1.5L6.6 10.8Z"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.467-1.11-1.467-.908-.621.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.952 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.025 10.025 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21.5l-7.084 8.094L22.5 22h-6.188l-4.844-6.328L5.98 22H2.72l7.577-8.66L1.5 2h6.344l4.375 5.79L18.244 2Zm-1.086 18h1.712L7.01 3.89H5.17L17.158 20Z" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg
      className="h-5 w-5 transition-transform group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19V5m0 0-6 6m6-6 6 6"
      />
    </svg>
  )
}
