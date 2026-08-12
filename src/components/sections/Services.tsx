import { services } from '../../data/services'
import type { ServiceItem } from '../../data/interface'
import { Card } from '../common/Card'
import { SectionTitle } from '../common/SectionTitle'

export function Services() {
  return (
    <section id="services" className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title={services.title} subtitle={services.subtitle} />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {services.items.map((item) => (
            <Card key={item.number} className="flex min-w-0 flex-col">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <ServiceIcon name={item.icon} />
              </div>
              <p className="text-sm font-medium tracking-wide text-pretty text-accent">
                {item.number} — {item.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-text-muted">
                {item.description}
              </p>
              {item.tech && item.tech.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {item.tech.map((tech) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceIcon({ name }: { name: ServiceItem['icon'] }) {
  const common = {
    className: 'h-5 w-5',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.6,
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
  }

  switch (name) {
    case 'fullstack':
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 5l-2 14"
          />
        </svg>
      )
    case 'website':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path strokeLinecap="round" d="M3 9h18M8 19h8" />
        </svg>
      )
    case 'integrations':
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 5.93"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 11a5 5 0 0 0-7.07 0L5.52 12.4a5 5 0 0 0 7.07 7.07L14 18.07"
          />
        </svg>
      )
    case 'maintenance':
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.7 6.3a4.5 4.5 0 0 0-5.66 5.66L4 17v3h3l5.04-5.04a4.5 4.5 0 0 0 5.66-5.66l-2.12 2.12-1.88-1.88 2.12-2.12Z"
          />
        </svg>
      )
  }
}
