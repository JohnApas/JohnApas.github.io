import { useEffect, useId, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { contact } from '../../data/contact'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { Button } from '../common/Button'
import { SectionTitle } from '../common/SectionTitle'

const inputClass =
  'w-full rounded-2xl border-0 bg-space-dark px-4 py-3.5 text-base text-text outline-none ring-1 ring-border/60 transition-[box-shadow,background-color] placeholder:text-text-muted/50 focus:bg-surface focus:ring-2 focus:ring-accent/40'

const PROMPT_VISIBLE_MS = 2000
const PROMPT_EXIT_MS = 280

type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'activation'
type PromptKind = 'success' | 'error' | 'activation'

export function Contact() {
  const { scrollToSection } = useScrollToSection()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [honeypot, setHoneypot] = useState('')
  const [prompt, setPrompt] = useState<{
    kind: PromptKind
    title: string
    message: string
  } | null>(null)
  const [promptClosing, setPromptClosing] = useState(false)

  const showPrompt = (kind: PromptKind, title: string, message: string) => {
    setPromptClosing(false)
    setPrompt({ kind, title, message })
  }

  const dismissPrompt = () => {
    setPromptClosing(true)
  }

  useEffect(() => {
    if (!prompt || promptClosing) return

    const timer = window.setTimeout(() => {
      setPromptClosing(true)
    }, PROMPT_VISIBLE_MS)

    return () => window.clearTimeout(timer)
  }, [prompt, promptClosing])

  useEffect(() => {
    if (!promptClosing) return

    const timer = window.setTimeout(() => {
      setPrompt(null)
      setPromptClosing(false)
      setStatus('idle')
    }, PROMPT_EXIT_MS)

    return () => window.clearTimeout(timer)
  }, [promptClosing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact.email || status === 'submitting') return

    // Bot filled the honeypot — pretend success
    if (honeypot.trim()) {
      setStatus('success')
      showPrompt('success', contact.successTitle, contact.successMessage)
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
        showPrompt(
          'activation',
          contact.activationTitle,
          contact.activationMessage,
        )
        return
      }

      if (!response.ok || !isSuccess) {
        setStatus('error')
        showPrompt(
          'error',
          contact.errorTitle,
          apiMessage || contact.errorMessage,
        )
        return
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      showPrompt('success', contact.successTitle, contact.successMessage)
    } catch {
      setStatus('error')
      showPrompt('error', contact.errorTitle, contact.errorMessage)
    }
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title={contact.title} subtitle={contact.subtitle} />

        <div className="overflow-hidden rounded-[28px] border border-border/70 bg-surface shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-between gap-10 border-b border-border/70 bg-space-dark/40 p-6 sm:p-8 md:border-r md:border-b-0 md:p-10">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-text">
                  {contact.infoTitle}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-pretty text-text-muted">
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

            <div className="p-6 sm:p-8 md:p-10">
              <h3 className="mb-6 text-xl font-semibold tracking-tight text-text">
                {contact.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="_gotcha"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-text-muted"
                  >
                    {contact.nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    name="name"
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
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-text-muted"
                  >
                    {contact.emailFieldLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    name="email"
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
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-text-muted"
                  >
                    {contact.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    required
                    name="message"
                    rows={5}
                    placeholder={contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    disabled={status === 'submitting'}
                    className={`${inputClass} min-h-[140px] resize-none`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto sm:min-w-[180px] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting'
                    ? contact.submittingLabel
                    : contact.submitLabel}
                </Button>
              </form>
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

      {prompt && (
        <AppleAlertPrompt
          kind={prompt.kind}
          title={prompt.title}
          message={prompt.message}
          closing={promptClosing}
          onDismiss={dismissPrompt}
        />
      )}
    </section>
  )
}

function AppleAlertPrompt({
  kind,
  title,
  message,
  closing,
  onDismiss,
}: {
  kind: PromptKind
  title: string
  message: string
  closing: boolean
  onDismiss: () => void
}) {
  const titleId = useId()
  const messageId = useId()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onDismiss])

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-110 flex justify-center p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:justify-end sm:p-4 sm:pt-[max(1rem,env(safe-area-inset-top))]"
      aria-live="polite"
    >
      <div
        role="status"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        className={`apple-notification pointer-events-auto w-full max-w-[380px] overflow-hidden rounded-[18px] backdrop-blur-[40px] ${
          closing ? 'apple-notification-out' : 'apple-notification-in'
        }`}
        onClick={onDismiss}
      >
        <div className="flex gap-3 px-3.5 py-3">
          <PromptIcon kind={kind} />

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="apple-notification-app text-[12px] font-semibold tracking-wide uppercase">
                Portfolio
              </p>
              <p className="apple-notification-time shrink-0 text-[12px]">
                now
              </p>
            </div>
            <h3
              id={titleId}
              className="apple-notification-title mt-0.5 text-[14px] leading-tight font-semibold tracking-tight"
            >
              {title}
            </h3>
            <p
              id={messageId}
              className="apple-notification-message mt-0.5 text-[13px] leading-snug"
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function PromptIcon({ kind }: { kind: PromptKind }) {
  if (kind === 'success') {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#30d158] text-white shadow-sm">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
    )
  }

  if (kind === 'activation') {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#ff9f0a] text-white shadow-sm">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
          />
        </svg>
      </span>
    )
  }

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#ff453a] text-white shadow-sm">
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6l12 12M18 6 6 18"
        />
      </svg>
    </span>
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
        <span className="block truncate text-[15px] font-medium text-text">
          {value}
        </span>
      </span>
      {href && (
        <span className="text-text-muted/70" aria-hidden="true">
          <ChevronIcon />
        </span>
      )}
    </>
  )

  const className =
    'flex w-full items-center gap-3 rounded-2xl px-2 py-2.5 transition-colors hover:bg-surface/80'

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
