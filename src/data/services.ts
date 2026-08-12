import type { ServicesContent } from './interface'

export const services: ServicesContent = {
  title: 'What I Can Do For You',
  subtitle:
    'Turning ideas and business requirements into reliable digital solutions.',
  items: [
    {
      number: '01',
      title: 'Full-Stack Development',
      icon: 'fullstack',
      description:
        'Build complete web applications from frontend to backend, including business systems, dashboards, APIs, databases, and custom functionality.',
      tech: [
        'React',
        'Next.js',
        'PHP',
        'JavaScript',
        'REST APIs',
        'GraphQL',
        'MySQL',
        'PostgreSQL',
      ],
    },
    {
      number: '02',
      title: 'Website & UI Development',
      icon: 'website',
      description:
        'Create modern, responsive, and mobile-first websites focused on usability, performance, and a polished user experience.',
      tech: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'responsive design',
        'performance optimization',
      ],
    },
    {
      number: '03',
      title: 'Business Systems & Integrations',
      icon: 'integrations',
      description:
        'Turn business processes into digital systems that make operations more organized and efficient, while connecting different services through APIs.',
      tech: [
        'Custom BMS',
        'Workflow and process automationL',
        'REST API integration',
        'GraphQL integration',
        'Third-party system integration',
        'Custom dashboards and reporting',
        'API Documentation',
      ],
    },
    {
      number: '04',
      title: 'Maintenance & Optimization',
      icon: 'maintenance',
      description:
        'Improve existing applications rather than starting from scratch—fix bugs, optimize APIs and databases, modernize legacy systems, refactor code, and improve system performance.',
      tech: [
        'API performance optimization',
        'Database optimization',
        'Code refactoring',
        'UI/UX improvements',
        'System performance improvements',
        'Production deployment and updates',
      ],
    },
  ],
}
