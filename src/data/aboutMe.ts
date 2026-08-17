import profileImage from '../assets/my-image.png'
import type { AboutMeContent } from './interface'
import { profile } from './profile'
import { resume as resumeData } from './resume'

export const aboutMe: AboutMeContent = {
  title: 'About Me',
  subtitle: 'A brief journey through my story',
  name: 'John Apas',
  image: profileImage,
  imageAlt: 'Image of John Apas',
  imageCaption: 'me but AI generated',
  launchScreen: {
    title: 'about — zsh — 80x24',
    prompt: 'cat ~/about_me.txt',
  },
  resumeLaunchScreen: {
    title: 'resume — zsh — 80x24',
    prompt: 'john@portfolio ~ %',
  },
  resume: {
    fileName: resumeData.fileName,
    clickHint: 'Click photo to download resume',
    openAriaLabel: 'Open resume download terminal',
    closeAriaLabel: 'Close resume terminal',
    lines: [
      'john@portfolio ~ % ls ~/Documents/resume',
      resumeData.fileName,
      '',
      'john@portfolio ~ % cat download.sh',
      '#!/bin/bash',
      '# Generate resume from latest data',
      `curl -L -O ${resumeData.fileName}`,
      '',
      'john@portfolio ~ % ./download.sh',
    ],
    downloadCommand: `→ Download ${resumeData.fileName}`,
    downloadLabel: 'Download resume PDF',
  },
  actionBlocked: {
    title: 'Action Blocked',
    message: "This window can't be closed right now.",
    closeAriaLabel: 'Close window',
  },
  minimizeAriaLabel: 'Minimize window',
  profileDetails:
    'Full-Stack Software Engineer with 3 years of experience building web applications and business systems. Skilled in frontend and backend development, API integration, databases, and deployment, with experience in React, Next.js, PHP, JavaScript, MySQL, WordPress, and GraphQL. Passionate about building scalable, maintainable, and user-friendly solutions.',
  locationLabel: 'Location:',
  address: profile.address ?? 'Philippines',
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
