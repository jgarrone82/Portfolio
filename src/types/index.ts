// All shared TypeScript interfaces for the portfolio

export interface NavLink {
  label: string;
  href: string; // e.g. "#about"
}

export interface Service {
  icon: string; // lucide-react icon name
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'live' | 'coming-soon';
  imageUrl?: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  company?: string;
  location?: string;
  description?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // spam trap — must be empty on submit
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}
