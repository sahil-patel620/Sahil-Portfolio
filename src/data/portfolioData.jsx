import { Code, GitMerge, Rocket, Trophy } from 'lucide-react';
import resume from "../assets/resume.pdf";
import javaCertificate from "../assets/certificates/java.pdf";
import springBootCertificate from "../assets/certificates/springbootCertificate.png";
import ReactCertificate from "../assets/certificates/react.pdf";
import CloudComputingCertificate from "../assets/certificates/cloudComputing.pdf";
import DSAJavaCertificate from "../assets/certificates/dsa.pdf";

/**
 * ============================================================================
 * PORTFOLIO CENTRAL DATA STORAGE
 * ============================================================================
 * Update this file to modify the content of your portfolio without touching
 * the underlying React component code.
 */

export const personalInfo = {
  name: 'Sahil Patel',
  role: 'Full Stack Developer',
  email: 'sahilpatel.techie@gmail.com',
  phone: '+91 6200239192',
  githubUsername: 'sahil-patel620',
  linkedinUrl: 'https://www.linkedin.com/in/sahil-patel-a69998262/',
  twitterUrl: '#',
  resumeUrl: resume,
  availableForHire: true,
  bioParagraph1: "I'm a passionate Full Stack Developer who loves building scalable and visually stunning digital experiences. My journey started with a curiosity for how things work on the web, which evolved into a career of solving complex problems through code.",
  bioParagraph2: "When I'm not writing code, I'm usually exploring new technologies, contributing to open source, or optimizing my development workflow. I believe in writing clean, maintainable code and creating intuitive user interfaces."
};

export const heroPhrases = [
  "building scalable web applications.",
  "crafting premium digital experiences.",
  "engineering the future of the web."
];

export const marqueePhrases = [
  'Open To Work', 
  'Full Stack Developer', 
  'Hire Me', 
  'React & Spring Boot'
];

export const aboutStats = [
  { label: 'Years Experience', value: '0' },
  { label: 'Projects Built', value: '5' },
  { label: 'Commits', value: '500+' },
  { label: 'Coffee Cups', value: '∞' },
];

export const terminalCommands = {
  whoami: `${personalInfo.name} - ${personalInfo.role} - ${personalInfo.bioParagraph1}`,
  skills: 'Java, JavaScript, Spring Boot, React, React Native, PostgreSQL, MySQL, MongoDB, Tailwind CSS, VS Code, IntelliJ IDEA...',
  projects: 'Loading featured projects... ShopLoom, Med-Care, College App, AirBnb Clone',
  status: personalInfo.availableForHire ? 'Open to work' : 'Currently employed',
  contact: `Email: ${personalInfo.email} | Mobile No: ${personalInfo.phone} | GitHub: ${personalInfo.githubUsername}`,
  help: 'Available commands: whoami, skills, projects, status, contact, clear',
};

export const skillsData = [
  { category: 'Frontend', items: ['React', 'React Native', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Java', 'Spring Boot', 'Hibernate', 'REST APIs', 'Microservices'] },
  { category: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { category: 'Tools', items: ['GitHub', 'Postman', 'DBeaver', 'Vercel', 'Docker', 'AWS', 'VS Code', 'IntelliJ IDEA'] }
];

export const projectsData = [
  {
    title: 'ShopLoom',
    description: 'A modern e-commerce platform with real-time inventory management, secure payments, and an admin dashboard.',
    tech: ['React', 'SpringBoot', 'PostgreSQL', 'RazorPay'],
    github: 'https://github.com/sahil-patel620/ShopLoom.git',
    live: 'https://github.com/sahil-patel620/ShopLoom.git',
    featured: true
  },
  {
    title: 'Med - Care',
    description: 'A full-stack Hospital Management System developed with React, Spring Boot, and MySQL to streamline patient records, appointments, billing, and hospital administration.',
    tech: ['React','SpringBoot', 'MySQL'],
    github: 'https://github.com/sahil-patel620/Med-Care',
    live: 'https://github.com/sahil-patel620/Med-Care',
    featured: true
  },
  {
    title: 'College App - Student Connect',
    description: 'College Management System developed using React, Spring Boot, and PostgreSQL for managing students, faculty, courses, attendance, and academic records efficiently.',
    tech: ['ReactNative', 'TypeScript', 'Nativewind', 'PostgreSQL','FireBase'],
    github: 'https://github.com/sahil-patel620/subharti-app',
    live: 'https://github.com/sahil-patel620/subharti-app',
    featured: true
  },
  {
    title: 'airBnb Clone',
    description: 'An AirBnb Clone built with React, Spring Boot, and PostgreSQL that allows users to rent out their properties to travelers around the world.',
    tech: ['React', 'Spring Boot', 'RestFul APIs', 'JWT','Spring Security', 'PostgreSQL'],
    github: 'https://github.com/sahil-patel620/airBnb-Clone', 
    live: 'https://github.com/sahil-patel620/airBnb-Clone',
    featured: true
  }
];

export const experienceData = [
  // {
  //   role: 'Full Stack Developer',
  //   company: 'Tech Innovators Inc.',
  //   period: '2022 - Present',
  //   description: 'Led the development of scalable microservices using Spring Boot and designed responsive frontend interfaces with React.',
  //   tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL']
  // },
  {
    role: 'Frontend Developer Intern',
    company: 'MagnusOrbit',
    period: 'Jan 2025 - July 2025',
    description: 'Collaborated with the design team to implement pixel-perfect user interfaces and integrated RESTful APIs.',
    tech: ['HTML/CSS', 'React', 'JavaScript']
  },
  // {
  //   role: 'Open Source Contributor',
  //   company: 'Various Projects',
  //   period: '2020 - 2021',
  //   description: 'Contributed to multiple open-source repositories on GitHub, focusing on bug fixes and feature enhancements.',
  //   tech: ['Python', 'JavaScript', 'Git']
  // }
];

export const achievementsData = [
  {
    icon: <Code className="w-8 h-8" />,
    value: 125,
    suffix: '+',
    label: 'Problems Solved',
    description: 'LeetCode & HackerRank'
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    value: 5,
    suffix: '+',
    label: 'Projects Built',
    description: 'Full Stack & Mobile'
  },
  {
    icon: <GitMerge className="w-8 h-8" />,
    value: 350,
    suffix: '+',
    label: 'GitHub Contributions',
    description: 'In the last year'
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    value: 1,
    suffix: '+',
    label: 'Hackathons Won',
    description: 'Global & Local events'
  }
];

export const certificationsData = [
  {
    title: 'Java Certification',
    organization: 'Knowledge Gate',
    date: 'May 2026',
    credentialId: 'CERT-1778311859489-11993222',
    link: javaCertificate,
    tech: [ 'Core Java', 'OOP', 'Collections Framework', 'Exception Handling', 'Multithreading','JVM']
  },
  {
    title: 'Spring Boot Certification',
    organization: 'Coding Shuttle',
    date: 'May 2026',
    credentialId: '50K9R3ZG',
    link: springBootCertificate,
    tech: ['Spring Boot','Spring MVC','Spring Data JPA','Restful API','Spring Security']
  },
  {
    title: 'HackerRank React Certification',
    organization: 'HackerRank',
    date: 'Jun 2025',
    credentialId: '7E6F9C62BECВ',
    link: ReactCertificate,
    tech: ['React','Props','State','Redux']
  },
  {
    title: 'NPTEL Cloud Computing',
    organization: 'IIT Kharagpur',
    date: 'Apr 2025',
    credentialId: 'NPTEL25CS11S1052000457',
    link: CloudComputingCertificate,
    tech: ['Cloud Computing', 'Virtualization', 'Cloud Service Models (IaaS, PaaS, SaaS)', 'AWS']
  },
  {
  title: 'Data Structure and Algorithms Using Java',
  organization: 'IIT Kharagpur',
  date: 'Oct 2023',
  credentialId: 'NPTEL23CS85S742000579',
  link: DSAJavaCertificate,
  tech: [
    'Java',
    'Data Structures',
    'Algorithms',
    'Arrays',
    'Linked List',
    'Stack',
    'Queue',
    'Trees',
    'Searching',
    'Sorting'
  ]
}
];

export const blogData = [
  {
    title: 'Building Scalable APIs with Spring Boot',
    excerpt: 'Learn the best practices for structuring and scaling your Spring Boot applications in production environments.',
    date: 'May 15, 2024',
    category: 'Backend'
  },
  {
    title: 'Advanced State Management in React',
    excerpt: 'Deep dive into modern React state management using Context, Redux Toolkit, and Zustand.',
    date: 'April 28, 2024',
    category: 'Frontend'
  },
  {
    title: 'Full Stack Authentication Flow',
    excerpt: 'Implementing secure JWT authentication from React frontend to Java backend.',
    date: 'April 10, 2024',
    category: 'Security'
  }
];
