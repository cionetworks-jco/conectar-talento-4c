export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
}

export interface Education {
  id: string;
  type: 'Pregrado' | 'Posgrado';
  institution: string;
  title: string;
  year: number;
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  year: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  year: number;
}

export interface ProfileSkill {
  skillId: string;
  skillName: string;
  brief: string;
  expertise: number; // 1-5
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  country: string;
  city: string;
  photoUrl: string;
  cohort: string;
  website: string;
  linkedin: string;
  whatsapp: string;
  phone: string;
  calendly: string;
  instagram: string;
  biography: string;
  cvUrl: string;
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  skills: ProfileSkill[];
}

export const COUNTRIES = [
  'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica',
  'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México',
  'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico',
  'República Dominicana', 'Uruguay', 'Venezuela', 'Estados Unidos', 'Canadá', 'España'
];

export const SKILLS_CATALOG = [
  'Data Science', 'Marketing Digital', 'Finanzas', 'Desarrollo Web',
  'Inteligencia Artificial', 'Consultoría', 'Planeación Estratégica',
  'Legal', 'Bases de Datos', 'Procesos/Producción', 'Ventas', 'RRHH', 'Otro'
];
