import type { Profile } from './interface'

// all profile related data should be stored in this file

export const profile: Profile = {
  name: 'John Apas',
  headline: 'Building modern and scalable apps.',
  currentPosition: 'Software Developer',
  address: 'Cebu City, Cebu, 6000, Philippines',
  email: 'johnclyde.apas032647@gmail.com',
  phone: '',
  socials: {
    github: 'https://github.com/JohnApas',
    linkedin: 'https://www.linkedin.com/in/john-clyde-apas-4a8799246/',
  },
  education: [
    {
      schoolName: 'Cebu Institute of Technology – University',
      course: 'Bachelor of Science in Computer Science',
      startDate: '2019',
      endDate: '2023',
    },
    {
      schoolName: 'Cebu Institute of Technology – University',
      course: 'Science, Technology, Engineering, and Mathematics',
      startDate: '2017',
      endDate: '2019',
    },
    {
      schoolName: 'St. Thomas Aquinas School of Montessori',
      course: 'Junior High School',
      startDate: '2013',
      endDate: '2017',
    },
  ],
  profileDetails:
    'Full-Stack Software Engineer with 3 years of experience building web applications and business systems. Skilled in frontend and backend development, API integration, databases, and deployment, with experience in React, Next.js, PHP, JavaScript, MySQL, WordPress, and GraphQL. Passionate about building scalable, maintainable, and user-friendly solutions.',
    skills: [
      { name: 'React', category: 'frontend', proficiency: 90 },
      { name: 'Next.js', category: 'frontend', proficiency: 88 },
      { name: 'JavaScript', category: 'frontend', proficiency: 90 },
      { name: 'TypeScript', category: 'frontend', proficiency: 80 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 85 },
    
      { name: 'PHP', category: 'backend', proficiency: 88 },
      { name: 'REST API', category: 'backend', proficiency: 85 },
      { name: 'GraphQL', category: 'backend', proficiency: 80 },
    
      { name: 'MySQL', category: 'database', proficiency: 88 },
      { name: 'PostgreSQL', category: 'database', proficiency: 70 },
    
      { name: 'WordPress', category: 'tools', proficiency: 85 },
      { name: 'Git', category: 'tools', proficiency: 85 },
      { name: 'Vercel', category: 'tools', proficiency: 80 },
    ],
}
