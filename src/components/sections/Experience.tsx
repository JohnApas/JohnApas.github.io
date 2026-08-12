import { useState } from 'react'
import { experience } from '../../data/experience'
import type { Experience as ExperienceItem } from '../../data/interface'
import { formatDateRange } from '../../utils/formatDate'
import { Card } from '../common/Card'
import { SectionTitle } from '../common/SectionTitle'
import { ExperienceProjectsModal } from './ExperienceProjectsModal'

export function Experience() {
  const [activeExperience, setActiveExperience] =
    useState<ExperienceItem | null>(null)

  return (
    <section id="experience" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          title={experience.title}
          subtitle={experience.subtitle}
        />

        <div className="relative space-y-6 sm:space-y-8">
          <div className="absolute top-0 bottom-0 left-3 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          {[...experience.items]
            .sort((a, b) => Number(b.id) - Number(a.id))
            .map((exp, index) => {
              const hasProjects = Boolean(
                exp.projects && exp.projects.length > 0,
              )

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col pl-8 md:pl-0 md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />

                  <div className="absolute top-6 left-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent md:left-1/2" />

                  <div className="min-w-0 md:w-1/2 md:px-8">
                    <Card className="relative">
                      {hasProjects && (
                        <button
                          type="button"
                          onClick={() => setActiveExperience(exp)}
                          aria-label={experience.viewProjectLabel}
                          title={experience.viewProjectLabel}
                          className="group absolute top-3 right-3 z-10 rounded-full p-2 text-text-muted transition-colors hover:bg-text/5 hover:text-text sm:top-4 sm:right-4 sm:p-1.5"
                        >
                          <ArrowUpRightIcon />
                          <span className="pointer-events-none absolute top-full right-0 mt-2 hidden whitespace-nowrap rounded-lg bg-space-secondary px-2 py-1 text-[10px] font-medium text-text opacity-0 shadow-lg transition-opacity sm:block group-hover:opacity-100">
                            {experience.viewProjectLabel}
                          </span>
                        </button>
                      )}

                      <div className={`mb-2 ${hasProjects ? 'pr-10' : ''}`}>
                        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                          {exp.title}
                        </h3>
                      </div>

                      <p className="text-[15px] text-accent">
                        {exp.companyName}
                      </p>

                      {exp.projectName && (
                        <p className="text-sm text-text-muted">
                          {exp.projectName}
                        </p>
                      )}

                      {exp.subtitle && (
                        <p className="text-sm italic text-text-muted">
                          {exp.subtitle}
                        </p>
                      )}

                      {(exp.startDate || exp.endDate) && (
                        <p className="mt-1 text-xs text-text-muted">
                          {formatDateRange(exp.startDate, exp.endDate)}
                        </p>
                      )}

                      <p className="mt-1 text-sm text-text-muted">{exp.role}</p>

                      <p className="mt-3 text-sm leading-relaxed text-pretty text-text-muted">
                        {exp.description}
                      </p>

                      {exp.techUsed.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.techUsed.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-text/10 px-3 py-1 text-xs text-text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {activeExperience && (
        <ExperienceProjectsModal
          experience={activeExperience}
          onClose={() => setActiveExperience(null)}
        />
      )}
    </section>
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
