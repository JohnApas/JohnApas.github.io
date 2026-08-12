import type { ExperienceProject } from './interface'

export const rococoProjects: ExperienceProject[] = [
  {
    id: 1,
    title: 'Rococo Global Technologies Corporation | Jun 2022 – Aug 2022',
    role: 'Software Development Intern Internship',
    techUsed: ['ServiceNow', 'Git', 'Scrum', 'Kanban', 'Service Management'],
    description: [
      'Completed training in software analysis and design, task management using Scrum, Kanban, and Lean methodologies, service management, Git-based code management, and ServiceNow infrastructure.',
      '',
      '• Developed a Café Management System in ServiceNow based on client requirements, implementing system functionality and data management features.',
      '• Designed dashboards and reports to visualize system data and provide insights from recorded café transactions.',
      '• Collaborated closely with ServiceNow specialists throughout the development process, gaining practical experience in enterprise application development and service management.',
    ].join('\n'),
  },
]

export const allianceProjects: ExperienceProject[] = [
  {
    id: 1,
    title: 'Alliance Software Inc. | Sep 2022 – Mar 2023',
    role: 'Software developer / Machine Learning Intern Internship',
    techUsed: [
      'ASP.NET',
      'Angular',
      'ML.NET',
      'OpenCV',
      'Deep Learning',
      'Image Processing',
    ],
    description: [
      "Developed a 2D facial recognition system for the company's employee attendance logging system, contributing across the project lifecycle from data collection and preprocessing to model training, evaluation, and application development.",
      '',
      '• Implemented and evaluated multiple computer vision and deep learning approaches for face detection and recognition, including OpenCV Haar Cascade, LBP Cascade, SSD Face Detector, ResNet, InceptionV3, and MobileNetV2.',
      '• Trained and fine-tuned classification models by evaluating accuracy, training time, and log loss to identify effective model configurations for the application.',
      '• Developed an intuitive web-based interface for the facial recognition system using ASP.NET and Angular, integrating the machine learning functionality into the application.',
      '• Worked with ML.NET, image processing, deep neural networks, and computer vision to develop and evaluate machine learning solutions.',
    ].join('\n'),
  },
]

export const hatchItProjects: ExperienceProject[] = [
  {
    id: 8,
    title: 'ALCON (Version 8) — System Optimization & Workflow Enhancement',
    role: 'Lead Developer / Front-End Engineer / Back-End Engineer',
    techUsed: ['PHP', 'MySQL', 'JavaScript'],
    description: [
      "Led a major system update for ALCON V8, focusing on API optimization, system process improvements, UI enhancements, and alignment with the client's updated workflows.",
      '',
      'Took ownership of API enhancement and performance optimization while coordinating with another developer responsible for implementing the system processes and UI updates. Managed pull request reviews and merging, deployment updates, and overall code integration to ensure stable releases.',
      '',
      'Established a dedicated development environment for the team, allowing new features and system changes to be thoroughly tested and validated before deployment to production.',
    ].join('\n'),
  },
  {
    id: 7,
    title: 'Plantation Bay Resort Website — Headless Website',
    role: 'Front-End Engineer / Back-End Engineer',
    techUsed: ['WordPress', 'React', 'Next.js', 'GraphQL', 'Vercel'],
    description: [
      'Contributed to the development of a headless WordPress website for Plantation Bay Resort, a major resort in Cebu. Configured and managed the WordPress backend as the content management system and integrated GraphQL APIs to retrieve and dynamically display content on the React/Next.js frontend.',
      '',
      'Developed and refined user interface components to ensure a polished and responsive user experience. Also reviewed and refactored code contributed by other developers, improving code readability, consistency, and maintainability while ensuring the application remained aligned with established development practices.',
    ].join('\n'),
  },
  {
    id: 6,
    title: 'ZLREJ — Construction Project Management System',
    role: 'Lead Developer / Front-End Engineer / Back-End Engineer',
    techUsed: ['PHP', 'MySQL', 'JavaScript'],
    description: [
      'Led the development of a construction business management system designed to streamline project management, quotation creation, and the tracking and movement of machinery and assets between projects.',
      '',
      "Worked as the lead developer alongside another developer, responsible for assigning and coordinating development tasks while contributing approximately 50% of the system's front-end and back-end development. Managed the application's deployment and production setup, ensuring the system was properly delivered to the client.",
      '',
      "Conducted the system turnover and training, personally presenting the system's features, workflows, and usage procedures to the client and employees.",
    ].join('\n'),
  },
  {
    id: 5,
    title: 'ALCON Version 7.1 — Legacy System Enhancement & Maintenance',
    role: 'Front-End Engineer / Back-End Engineer',
    techUsed: ['PHP', 'MySQL', 'JavaScript'],
    description: [
      'Reassigned to maintain and enhance ALCON V7.1, a legacy system previously worked on. Implemented improvements including user role updates, a search function within report selection, replacement of the navigation bar logo with the new company branding, and enhancements to data readability.',
      '',
      "Investigated and resolved database-related issues affecting the calculation and display of system data, identifying and correcting logic and implementation gaps left by previous developers. Ensured the system's existing functionality remained stable while improving its usability and data accuracy.",
    ].join('\n'),
  },
  {
    id: 4,
    title:
      'CONNEXI — Centralized Pharmaceutical Procurement & Inventory Platform',
    role: 'Front-End Engineer',
    techUsed: ['React', 'Next.js', 'Odoo', 'PostgreSQL', 'Keycloak'],
    description: [
      'Assigned as a Front-End Engineer to a third-party development team building a centralized pharmaceutical procurement, inventory, and dispensing platform connecting pharmaceutical companies and hospitals.',
      '',
      "Developed approximately 50% of the application's user interface, including the authentication flow, landing page, procurement module, and dashboard. Integrated APIs developed by the backend team to retrieve and dynamically display system data within the frontend.",
      '',
      'Collaborated closely with the development team and client through sprint planning and Agile development processes. Traveled to Manila to work directly with the project team and client, where the frontend development speed and delivery were positively recognized.',
    ].join('\n'),
  },
  {
    id: 3,
    title: 'ATLANTIC Hardware — Headless E-Commerce & Corporate Website',
    role: 'Front-End Engineer / Back-End Engineer',
    techUsed: [
      'WordPress',
      'React',
      'Next.js',
      'GraphQL',
      'Vercel',
      'Bluehost',
    ],
    description: [
      'Developed a headless WordPress website for ATLANTIC Hardware to showcase its product catalog, company information, locations, and career opportunities.',
      '',
      'Designed and implemented an intuitive, mobile-responsive user interface using React and Next.js, with WordPress configured as the content management system hosted on Bluehost. Integrated GraphQL to efficiently retrieve and display content from WordPress on the frontend.',
      '',
      'Managed the deployment of the Next.js application to Vercel and ensured the website was properly connected to the WordPress backend for ongoing content management.',
    ].join('\n'),
  },
  {
    id: 2,
    title: 'YM Cargo — Accounting Module Enhancement',
    role: 'Front-End Engineer / Back-End Engineer',
    techUsed: ['PHP', 'MySQL', 'JavaScript', 'React'],
    description: [
      'Enhanced the legacy YM Cargo system by designing and developing a comprehensive accounting module. The module enabled accounting staff to record purchases, manage petty cash transactions and expenses, and generate invoices.',
      '',
      'Developed a mobile-first user interface to improve accessibility and usability across devices, while restructuring and extending the existing MySQL database to support accurate storage and management of accounting transactions. Integrated the new functionality into the existing legacy system while maintaining compatibility with its established workflows and architecture.',
    ].join('\n'),
  },
  {
    id: 1,
    title: 'HatchIt Website — Company Corporate Website',
    role: 'Front-End Engineer / Back-End Engineer',
    techUsed: ['React', 'TypeScript', 'Tailwind CSS'],
    description: [
      "Developed and maintained the company's corporate website using React, TypeScript, and Tailwind CSS. Built key pages including the home, products, blog, and contact sections, while implementing responsive and mobile-optimized layouts across the website.",
      '',
      "Fine-tuned the site's performance and responsiveness across different devices and screen sizes. Also restructured and refactored pages developed by interns to improve code consistency, maintainability, and overall user experience.",
    ].join('\n'),
  },
]
