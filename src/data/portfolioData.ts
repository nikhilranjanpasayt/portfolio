import type { 
  SkillItem, 
  EducationItem, 
  AchievementItem 
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Nikhil Ranjan Pasayat',
  role: 'AI/ML Enthusiast & Software Developer',
  headline: 'Building Intelligent Experiences.',
  subtitle: 'Aspiring Software Developer | AI/ML Enthusiast | Technology Innovator',
  currentUniversity: 'GIET University, Gunupur',
  specialization: 'Artificial Intelligence & Machine Learning',
  degree: 'B.Tech in Computer Science and Engineering',
  location: 'Odisha, India',
  email: 'nikhilpasayat14@gmail.com', // placeholder / standard professional format editable
  githubUrl: 'https://github.com/nikhilranjanpasayt',
  linkedinUrl: 'https://www.linkedin.com/in/nikhil-ranjan-pasayat-66763a37a',
  resumeFileName: 'Nikhil_Ranjan_Pasayat_Resume.pdf',
  bio: `I am an ambitious Computer Science and Engineering undergraduate specializing in Artificial Intelligence and Machine Learning at GIET University, Gunupur. Driven by curiosity and a builder's mindset, I combine core computer science fundamentals with modern AI frameworks and full-stack software development to create robust, real-world systems. From smart edge-hardware systems to automated proctoring vision algorithms, I am focused on engineering intelligent digital experiences that solve real challenges.`,
  stats: [
    { label: 'Core Projects', value: '4+' },
    { label: 'Technical Skills', value: '14+' },
    { label: 'Specialization', value: 'AI & ML' },
    { label: 'Academic Standing', value: 'Undergraduate' }
  ]
};

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'btech',
    institution: 'GIET University, Gunupur',
    degreeOrStage: 'Bachelor of Technology (B.Tech)',
    specialization: 'Computer Science and Engineering (AI & ML Specialization)',
    period: '2023 – Present',
    status: 'Currently Pursuing',
    location: 'Gunupur, Rayagada, Odisha',
    highlights: [
      'Core focus on Machine Learning, Deep Learning, Data Structures & Algorithms, and DBMS.',
      'Active researcher in practical edge-computing and intelligent automated systems.',
      'Developing AI-driven applications and participating in technical innovations.'
    ],
    icon: 'graduation'
  },
  {
    id: 'intermediate',
    institution: 'Deepika English Medium School',
    degreeOrStage: 'Higher Secondary / Intermediate (Class XII)',
    specialization: 'Science Stream (Physics, Chemistry, Mathematics, Computer Science)',
    period: '2021 – 2023',
    status: 'Completed',
    location: 'Rourkela, Odisha',
    highlights: [
      'Strong quantitative grounding in Mathematics, Physics, and foundational computing logic.',
      'Developed early passion for software coding and algorithmic problem solving.'
    ],
    icon: 'book'
  },
  {
    id: 'matriculation',
    institution: 'Pragati Public School',
    degreeOrStage: 'Secondary School Examination (Class X / Matriculation)',
    period: 'Completed',
    status: 'Completed',
    location: 'Odisha',
    highlights: [
      'Built academic foundation in Science, Mathematics, and Analytical Reasoning.',
      'Actively participated in school science exhibitions and technical clubs.'
    ],
    icon: 'school'
  }
];

export const SKILLS_LIST: SkillItem[] = [
  // Languages
  { name: 'C', category: 'Languages', level: 85, badge: 'System Logic' },
  { name: 'Python', category: 'Languages', level: 90, badge: 'AI / Scripting' },
  { name: 'Java', category: 'Languages', level: 82, badge: 'OOP & Core' },
  { name: 'PHP', category: 'Languages', level: 75, badge: 'Backend' },
  { name: 'JavaScript', category: 'Languages', level: 88, badge: 'Modern ES6+' },

  // Web & Frontend
  { name: 'HTML', category: 'Web & Frontend', level: 92, badge: 'Semantic' },
  { name: 'CSS', category: 'Web & Frontend', level: 88, badge: 'Responsive UI' },
  { name: 'Bootstrap', category: 'Web & Frontend', level: 85, badge: 'Grid & UI' },
  { name: 'Web Development', category: 'Web & Frontend', level: 88, badge: 'Full-Stack Workflow' },

  // Database
  { name: 'DBMS', category: 'Database', level: 84, badge: 'Architecture & Normalization' },
  { name: 'SQL', category: 'Database', level: 86, badge: 'Relational Queries' },

  // AI & ML
  { name: 'Machine Learning', category: 'AI & ML', level: 88, badge: 'Predictive Modeling' },
  { name: 'Artificial Intelligence', category: 'AI & ML', level: 86, badge: 'Vision & NLP Systems' }
];

export { PROJECTS_DATA as PROJECTS_LIST } from './projects';

export const ACHIEVEMENTS_LIST: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'AI & Machine Learning Specialization Track',
    organization: 'GIET University, Gunupur',
    year: '2023 - Present',
    description: 'Pursuing specialized academic coursework focusing on advanced algorithms, neural architectures, data mining, and engineering applications.',
    type: 'Academic'
  },
  {
    id: 'ach-2',
    title: 'IoT & Smart Grid Innovation Exploration',
    organization: 'Academic Research & Project Exhibition',
    year: '2024',
    description: 'Researched sustainable micro-grid node integration and sensor telemetry for urban air quality monitoring.',
    type: 'Initiative'
  },
  {
    id: 'ach-3',
    title: 'Computer Science Core Fundamentals Milestone',
    organization: 'Undergraduate Program',
    year: '2023 - 2024',
    description: 'Mastered core foundations in Data Structures, Object-Oriented Programming (Java/C), Database Management Systems, and Web Technologies.',
    type: 'Academic'
  },
  {
    id: 'ach-4',
    title: 'Open Source & Technical Portfolio Development',
    organization: 'GitHub & Developer Community',
    year: '2024 - Present',
    description: 'Building and documenting machine learning utilities, web applications, and collaborative developer tools on GitHub.',
    type: 'Certification'
  }
];
