import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Experience, ExperienceProject } from '../../data/interface'
import { experience as experienceContent } from '../../data/experience'

const MINIMIZE_MS = 480
const RESTORE_MS = 480

interface ExperienceProjectsModalProps {
  experience: Experience
  onClose: () => void
}

export function ExperienceProjectsModal({
  experience,
  onClose,
}: ExperienceProjectsModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isOpening, setIsOpening] = useState(true)
  const [isMinimizing, setIsMinimizing] = useState(false)
  const projects = experience.projects ?? []
  const windowTitle =
    experienceContent.projectsModalTitle ??
    `${experience.companyName} — Projects`
  const isAnimating = isOpening || isMinimizing

  const handleClose = useCallback(() => {
    if (isAnimating) return
    onClose()
  }, [isAnimating, onClose])

  const handleMinimize = useCallback(() => {
    if (isAnimating) return
    setIsMinimizing(true)
  }, [isAnimating])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpening(false)
    }, RESTORE_MS)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isMinimizing) return

    const timer = window.setTimeout(() => {
      onClose()
    }, MINIMIZE_MS)

    return () => window.clearTimeout(timer)
  }, [isMinimizing, onClose])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [handleClose])

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-8">
      <button
        type="button"
        className={`absolute inset-0 bg-black/25 backdrop-blur-[2px] ${
          isMinimizing
            ? 'pointer-events-none opacity-0 transition-opacity duration-500 ease-in'
            : 'modal-backdrop-in'
        }`}
        aria-label="Close projects"
        onClick={handleClose}
        disabled={isAnimating}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 flex w-full flex-col overflow-hidden border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-[max-width,max-height,border-radius] duration-300 ease-out max-sm:rounded-t-2xl sm:rounded-2xl ${
          isMaximized
            ? 'max-h-[min(100svh,1680px)] max-w-[min(84rem,calc(100vw-2rem))] max-sm:h-[100svh] max-sm:max-w-none max-sm:rounded-none'
            : 'max-h-[min(92svh,840px)] max-w-2xl max-sm:h-[min(92svh,840px)]'
        } ${
          isMinimizing
            ? 'modal-minimize pointer-events-none'
            : isOpening
              ? 'modal-restore pointer-events-none'
              : ''
        }`}
      >
        <div className="relative flex h-12 shrink-0 items-center border-b border-border bg-space-dark px-3 sm:px-4">
          <div className="group/traffic z-10 flex items-center gap-1 sm:gap-2">
            <button
              ref={closeRef}
              type="button"
              onClick={handleClose}
              aria-label="Close"
              disabled={isAnimating}
              className="flex h-8 w-8 items-center justify-center rounded-full disabled:cursor-default sm:h-3 sm:w-3 sm:hover:brightness-95"
            >
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57]">
                <svg
                  className="h-1.5 w-1.5 opacity-0 group-hover/traffic:opacity-70"
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2l8 8M10 2L2 10"
                    stroke="#4a0000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <button
              type="button"
              onClick={handleMinimize}
              aria-label="Minimize"
              disabled={isAnimating}
              className="flex h-8 w-8 items-center justify-center rounded-full disabled:cursor-default sm:h-3 sm:w-3 sm:hover:brightness-95"
            >
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e]">
                <svg
                  className="h-1.5 w-1.5 opacity-0 group-hover/traffic:opacity-70"
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6h8"
                    stroke="#5c3b00"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsMaximized((prev) => !prev)}
              aria-label={isMaximized ? 'Restore' : 'Maximize'}
              disabled={isAnimating}
              className="flex h-8 w-8 items-center justify-center rounded-full disabled:cursor-default sm:h-3 sm:w-3 sm:hover:brightness-95"
            >
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840]">
                {isMaximized ? (
                  <svg
                    className="h-1.5 w-1.5 opacity-0 group-hover/traffic:opacity-70"
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.5 8.5h5v-5"
                      fill="none"
                      stroke="#0b3d12"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 3.5h-5v5"
                      fill="none"
                      stroke="#0b3d12"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-1.5 w-1.5 opacity-0 group-hover/traffic:opacity-70"
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 6h8M6 2v8"
                      stroke="#0b3d12"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          </div>

          <p
            id={titleId}
            className="pointer-events-none absolute inset-x-24 flex h-full items-center justify-center truncate text-center text-[13px] font-medium text-text/80 sm:inset-x-16"
          >
            {windowTitle}
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
          <div className="mb-5">
            <h3 className="text-xl font-semibold tracking-tight break-words text-text sm:text-2xl">
              {experience.companyName}
            </h3>
            <p className="mt-1 text-sm text-pretty text-text-muted">
              {experience.title}
              {experience.role ? ` · ${experience.role}` : ''}
            </p>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm text-text-muted">No projects listed yet.</p>
          ) : (
            <ul className="relative ml-0.5 space-y-5 border-l border-border pl-6 sm:ml-1 sm:space-y-6 sm:pl-8">
              {[...projects]
                .sort((a, b) => b.id - a.id)
                .map((project) => (
                  <li key={project.id} className="relative min-w-0">
                    <div
                      className="absolute top-5 -left-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-surface sm:top-6 sm:-left-8"
                      aria-hidden="true"
                    />
                    <ProjectCard project={project} />
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function ProjectCard({ project }: { project: ExperienceProject }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-border bg-space-dark">
      {project.image && (
        <div className="aspect-video overflow-hidden bg-space-dark">
          <img
            src={project.image}
            alt={project.imageAlt ?? project.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="text-base font-semibold tracking-tight break-words text-text sm:text-lg">
              {project.title}
            </h4>
            {project.role && (
              <p className="mt-0.5 text-sm text-pretty text-accent">
                {project.role}
              </p>
            )}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="shrink-0 rounded-full p-1.5 text-text-muted transition-colors hover:bg-text/5 hover:text-text"
            >
              <ArrowUpRightIcon />
            </a>
          )}
        </div>

        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-pretty text-text-muted">
          {project.description}
        </p>

        {project.techUsed && project.techUsed.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techUsed.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-text/10 px-3 py-1 text-xs text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 17L17 7M8 7h9v9"
      />
    </svg>
  )
}
