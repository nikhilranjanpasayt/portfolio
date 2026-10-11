export type ProjectCategory = 
  | 'All Projects'
  | 'AI / Machine Learning'
  | 'Web Development'
  | 'Data Science / Analytics'
  | 'IoT'
  | 'Other';

export type ProjectStatus = 
  | 'Completed' 
  | 'In Progress' 
  | 'Prototype';

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  description?: string; // backwards compatibility alias
  category: ProjectCategory;
  status: ProjectStatus;
  statusColor: 'blue' | 'deep-blue' | 'light-blue' | 'gray';
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  thumbnail?: string;
  highlightPoints: string[];
  metrics?: string;
  isFeatured?: boolean;
}

export type SkillCategory = 'Languages' | 'Web & Frontend' | 'Database' | 'AI & ML';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  level: number; // 0 to 100
  badge: string;
  iconName?: string;
  description?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degreeOrStage: string;
  specialization?: string;
  period: string;
  status: 'Completed' | 'Currently Pursuing';
  location?: string;
  highlights: string[];
  icon: 'school' | 'book' | 'graduation';
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  type: 'Academic' | 'Hackathon' | 'Certification' | 'Initiative';
}
