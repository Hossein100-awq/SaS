export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface ResumeData {
  id?: string;
  full_name: string;
  professional_title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  languages: LanguageItem[];
}