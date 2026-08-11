import type { ExperienceContent } from './interface'

export const experience: ExperienceContent = {
  title: 'Experience',
  subtitle: 'My professional journey across different roles and companies, building expertise in full-stack development, system architecture, and delivering practical solutions for real-world business needs.',
  viewProjectLabel: 'View Projects',
  items: [
    {
      id: 'exp-1',
      companyName: 'HatchIt Solution',
      projectName: 'Multiple Client Projects',
      // link: 'https://hatchitsolution.com',
      startDate: 'September 04 2023',
      endDate: 'Present',
      title: 'Full-Stack Software Engineer',
      subtitle: 'Full-stack developer & technical leadership',
      description:
        'Developed and maintained web applications and business systems across multiple industries, working across frontend, backend, APIs, databases, and deployment. Progressed into lead development responsibilities, coordinating developers, assigning tasks, reviewing and merging code, managing deployments, and working directly with clients.',
      role: 'Full-stack Developer / Lead Developer',
      techUsed: [
        'React',
        'Next.js',
        'PHP',
        'JavaScript',
        'MySQL',
        'GraphQL',
        'WordPress',
        'Vercel'
      ],
    },
  
    {
      id: 'exp-2',
      companyName: 'Alliance Software Inc.',
      projectName: '2D Facial Recognition Attendance System',
      // link: 'https://hatchitsolution.com',
      startDate: 'September 2022',
      endDate: 'March 2023',
      title: 'Software developer / Machine Learning Intern',
      subtitle: 'Machine learning & Computer vision',
      description:
        'Developed a 2D facial recognition system for employee attendance, contributing to data collection, preprocessing, model training, evaluation, and web application development. Evaluated multiple computer vision and deep learning models while developing the system interface and integrating machine learning functionality.',
      role: 'Software Development / Machine Learning Intern',
      techUsed: [
        'ASP.NET',
        'Angular',
        'ML.NET',
        'OpenCV',
        'Deep Learning',
        'Image Processing'
      ],
    },
  
    {
      id: 'exp-3',
      companyName: 'Rococo Global Technologies Corporation',
      projectName: 'Café Management System',
      // link: 'https://hatchitsolution.com',
      startDate: 'June 2022',
      endDate: 'August 2022',
      title: 'Software Development Intern',
      subtitle: 'ServiceNow development',
      description:
        'Developed a Café Management System in ServiceNow based on client requirements. Created dashboards and reports to visualize system data and gained practical experience in software analysis, Agile methodologies, service management, Git, and ServiceNow infrastructure while collaborating with ServiceNow specialists.',
      role: 'Software Development Intern',
      techUsed: [
        'ServiceNow',
        'Git',
        'Scrum',
        'Kanban',
        'Service Management'
      ],
    },
  ],
}
