import { experience } from '../../data/experience'
import { formatDateRange } from '../../utils/formatDate'
import { Card } from '../common/Card'
import { SectionTitle } from '../common/SectionTitle'
import { TimelineAstronaut } from '../common/TimelineAstronaut'

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title={experience.title}
          subtitle={experience.subtitle}
        />

        <div className="relative space-y-8">
          <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-gradient-to-b from-accent via-highlight to-transparent md:left-1/2 md:block md:-translate-x-1/2" />
          <TimelineAstronaut />

          {experience.items.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-4 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-highlight bg-space-dark shadow-[0_0_10px_rgba(34,211,238,0.5)] md:left-1/2 md:block" />

              <div className="md:w-1/2 md:px-8">
                <Card className="relative">
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={experience.viewProjectLabel}
                      title={experience.viewProjectLabel}
                      className="group absolute top-4 right-4 z-10 rounded-full p-1.5 text-highlight transition-all hover:bg-highlight/10 hover:shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                    >
                      <AsteroidIcon />
                      <span className="pointer-events-none absolute top-full right-0 mt-2 whitespace-nowrap rounded-md border border-white/10 bg-space-dark/95 px-2 py-1 text-[10px] font-medium text-text opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        {experience.viewProjectLabel}
                      </span>
                    </a>
                  )}

                  <div className={`mb-2 ${exp.link ? 'pr-10' : ''}`}>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                  </div>

                  <p className="text-accent">{exp.companyName}</p>

                  {exp.projectName && (
                    <p className="text-sm text-text-muted">{exp.projectName}</p>
                  )}

                  {exp.subtitle && (
                    <p className="text-sm italic text-text-muted">
                      {exp.subtitle}
                    </p>
                  )}

                  {(exp.startDate || exp.endDate) && (
                    <p className="mt-1 text-xs text-highlight">
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-text-muted">{exp.role}</p>

                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {exp.description}
                  </p>

                  {exp.techUsed.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.techUsed.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AsteroidIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.2 2.3c.4-.2.9 0 1.1.4l1.4 2.8 3 .7c.5.1.8.6.6 1.1l-1.1 2.8 1.5 2.7c.2.4 0 .9-.4 1.1l-2.8 1.3-.8 3c-.1.5-.6.8-1.1.6l-2.8-1.2-2.7 1.4c-.4.2-.9 0-1.1-.4l-1.3-2.8-3-.8c-.5-.1-.8-.6-.6-1.1l1.2-2.8-1.4-2.7c-.2-.4 0-.9.4-1.1l2.8-1.2.8-3c.1-.5.6-.8 1.1-.6l2.7 1.2 2.7-1.4z" />
      <circle cx="10" cy="10" r="1.1" className="fill-space-dark" />
      <circle cx="14.2" cy="12.5" r="0.8" className="fill-space-dark" />
      <circle cx="11.5" cy="14.8" r="0.6" className="fill-space-dark" />
    </svg>
  )
}
