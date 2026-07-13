export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}