import profileImage from '../assets/my-image.png'
import type { AboutMeContent } from './interface'

export const aboutMe: AboutMeContent = {
  title: 'About Me',
  subtitle: 'A brief journey through my story',
  name: 'John Apas',
  image: profileImage,
  imageAlt: 'Image ofJohn Apas',
  imageCaption: 'me but AI generated',
  launchScreen: {
    title: 'Profile View',
    status: 'ID LOCK',
    altitude: 'ALT: BIO',
    liveFeed: '● VISUAL FEED',
    velocity: 'FRAME: 01',
  },
  profileDetails:
    'Full-Stack Software Engineer with 3 years of experience building web applications and business systems. Skilled in frontend and backend development, API integration, databases, and deployment, with experience in React, Next.js, PHP, JavaScript, MySQL, WordPress, and GraphQL. Passionate about building scalable, maintainable, and user-friendly solutions.',
  locationLabel: 'Location:',
  address: 'Philippines',
  educationTitle: 'Education',
  skillsTitle: 'Core Technologies',
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
}
