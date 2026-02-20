import { Profile, User } from '@/types';

export const mockUsers: User[] = [
  { id: '1', email: 'carlos.mendez@email.com', role: 'admin', isActive: true, createdAt: '2025-01-15' },
  { id: '2', email: 'maria.gonzalez@email.com', role: 'user', isActive: true, createdAt: '2025-02-01' },
  { id: '3', email: 'juan.ramirez@email.com', role: 'user', isActive: true, createdAt: '2025-02-10' },
  { id: '4', email: 'ana.torres@email.com', role: 'user', isActive: true, createdAt: '2025-03-05' },
  { id: '5', email: 'luis.herrera@email.com', role: 'user', isActive: true, createdAt: '2025-03-20' },
  { id: '6', email: 'sofia.castro@email.com', role: 'user', isActive: false, createdAt: '2025-04-01' },
  { id: '7', email: 'diego.morales@email.com', role: 'user', isActive: true, createdAt: '2025-04-15' },
  { id: '8', email: 'valentina.rojas@email.com', role: 'user', isActive: true, createdAt: '2025-05-01' },
];

export const mockProfiles: Profile[] = [
  {
    id: 'p1', userId: '1', fullName: 'Carlos Mendez García', country: 'México', city: 'Ciudad de México',
    photoUrl: '', cohort: 'Cohorte 2024-A',
    website: 'https://carlosmendez.com', linkedin: 'https://linkedin.com/in/carlosmendez',
    whatsapp: '+5215512345678', phone: '+5215512345678', calendly: 'https://calendly.com/carlosmendez',
    instagram: '@carlosmendez',
    biography: 'Consultor senior con más de 15 años de experiencia en transformación digital y estrategia empresarial. Especializado en implementación de soluciones de inteligencia artificial para empresas Fortune 500 en América Latina.',
    cvUrl: '',
    education: [
      { id: 'e1', type: 'Posgrado', institution: 'MIT Sloan', title: 'MBA en Tecnología', year: 2018 },
      { id: 'e2', type: 'Pregrado', institution: 'ITESM', title: 'Ingeniería en Sistemas', year: 2010 },
    ],
    certifications: [
      { id: 'c1', name: 'PMP', institution: 'PMI', year: 2022 },
      { id: 'c2', name: 'AWS Solutions Architect', institution: 'Amazon', year: 2023 },
    ],
    projects: [
      { id: 'pr1', name: 'Transformación Digital Bancomer', description: 'Lideré la migración de sistemas legacy a cloud para uno de los bancos más grandes de México.', role: 'Director de Proyecto', year: 2023 },
    ],
    skills: [
      { skillId: 's1', skillName: 'Inteligencia Artificial', brief: 'Implementación de modelos ML en producción', expertise: 5 },
      { skillId: 's2', skillName: 'Consultoría', brief: 'Consultoría estratégica empresarial', expertise: 5 },
      { skillId: 's3', skillName: 'Planeación Estratégica', brief: 'Roadmaps tecnológicos', expertise: 4 },
    ],
  },
  {
    id: 'p2', userId: '2', fullName: 'María González López', country: 'Colombia', city: 'Bogotá',
    photoUrl: '', cohort: 'Cohorte 2024-A',
    website: '', linkedin: 'https://linkedin.com/in/mariagonzalez',
    whatsapp: '+573001234567', phone: '+573001234567', calendly: '',
    instagram: '@mariaglez',
    biography: 'Especialista en marketing digital y growth hacking con experiencia en startups de alto crecimiento. He ayudado a más de 50 empresas a escalar sus operaciones digitales en Latinoamérica.',
    cvUrl: '',
    education: [
      { id: 'e3', type: 'Posgrado', institution: 'Universidad de los Andes', title: 'Maestría en Marketing', year: 2020 },
      { id: 'e4', type: 'Pregrado', institution: 'Universidad Javeriana', title: 'Comunicación Social', year: 2016 },
    ],
    certifications: [
      { id: 'c3', name: 'Google Analytics', institution: 'Google', year: 2023 },
      { id: 'c4', name: 'HubSpot Inbound Marketing', institution: 'HubSpot', year: 2022 },
    ],
    projects: [
      { id: 'pr2', name: 'Growth Rappi LatAm', description: 'Estrategia de adquisición que incrementó usuarios 300% en 6 meses.', role: 'Growth Manager', year: 2022 },
    ],
    skills: [
      { skillId: 's4', skillName: 'Marketing Digital', brief: 'Growth hacking y performance marketing', expertise: 5 },
      { skillId: 's5', skillName: 'Ventas', brief: 'Estrategias de ventas B2B', expertise: 4 },
      { skillId: 's6', skillName: 'Data Science', brief: 'Analítica web avanzada', expertise: 3 },
    ],
  },
  {
    id: 'p3', userId: '3', fullName: 'Juan Ramírez Soto', country: 'Argentina', city: 'Buenos Aires',
    photoUrl: '', cohort: 'Cohorte 2024-B',
    website: 'https://juanramirez.dev', linkedin: 'https://linkedin.com/in/juanramirez',
    whatsapp: '+5491112345678', phone: '+5491112345678', calendly: 'https://calendly.com/juanramirez',
    instagram: '',
    biography: 'Desarrollador full-stack con pasión por crear productos digitales escalables. Experto en React, Node.js y arquitecturas cloud-native. Contribuidor activo en proyectos open source.',
    cvUrl: '',
    education: [
      { id: 'e5', type: 'Pregrado', institution: 'Universidad de Buenos Aires', title: 'Licenciatura en Ciencias de la Computación', year: 2017 },
    ],
    certifications: [
      { id: 'c5', name: 'Kubernetes Administrator', institution: 'CNCF', year: 2024 },
    ],
    projects: [
      { id: 'pr3', name: 'Plataforma E-commerce MercadoLibre', description: 'Desarrollo de microservicios para el sistema de pagos.', role: 'Senior Developer', year: 2023 },
    ],
    skills: [
      { skillId: 's7', skillName: 'Desarrollo Web', brief: 'Full-stack React + Node.js', expertise: 5 },
      { skillId: 's8', skillName: 'Bases de Datos', brief: 'PostgreSQL, MongoDB, Redis', expertise: 4 },
      { skillId: 's9', skillName: 'Inteligencia Artificial', brief: 'Integración de APIs de IA', expertise: 3 },
    ],
  },
  {
    id: 'p4', userId: '4', fullName: 'Ana Torres Villegas', country: 'Perú', city: 'Lima',
    photoUrl: '', cohort: 'Cohorte 2024-A',
    website: '', linkedin: 'https://linkedin.com/in/anatorres',
    whatsapp: '+51912345678', phone: '+51912345678', calendly: '',
    instagram: '@anatorresconsulting',
    biography: 'Abogada corporativa con especialización en derecho tecnológico y protección de datos. Asesora a empresas de tecnología en cumplimiento regulatorio en América Latina.',
    cvUrl: '',
    education: [
      { id: 'e6', type: 'Posgrado', institution: 'PUCP', title: 'Maestría en Derecho Corporativo', year: 2021 },
      { id: 'e7', type: 'Pregrado', institution: 'Universidad de Lima', title: 'Derecho', year: 2017 },
    ],
    certifications: [
      { id: 'c6', name: 'CIPP/LA', institution: 'IAPP', year: 2023 },
    ],
    projects: [
      { id: 'pr4', name: 'Programa de Compliance Interbank', description: 'Implementación del programa de protección de datos personales.', role: 'Consultora Legal', year: 2023 },
    ],
    skills: [
      { skillId: 's10', skillName: 'Legal', brief: 'Derecho tecnológico y protección de datos', expertise: 5 },
      { skillId: 's11', skillName: 'Consultoría', brief: 'Compliance y regulación', expertise: 4 },
      { skillId: 's12', skillName: 'Planeación Estratégica', brief: 'Estrategia regulatoria', expertise: 3 },
    ],
  },
  {
    id: 'p5', userId: '5', fullName: 'Luis Herrera Paredes', country: 'Chile', city: 'Santiago',
    photoUrl: '', cohort: 'Cohorte 2024-B',
    website: 'https://luisherrera.cl', linkedin: 'https://linkedin.com/in/luisherrera',
    whatsapp: '+56912345678', phone: '+56912345678', calendly: '',
    instagram: '',
    biography: 'Data Scientist con experiencia en banca y retail. Especializado en modelos predictivos, NLP y computer vision aplicados a problemas de negocio.',
    cvUrl: '',
    education: [
      { id: 'e8', type: 'Posgrado', institution: 'Universidad de Chile', title: 'Magíster en Data Science', year: 2022 },
      { id: 'e9', type: 'Pregrado', institution: 'USM', title: 'Ingeniería Civil Informática', year: 2018 },
    ],
    certifications: [
      { id: 'c7', name: 'TensorFlow Developer', institution: 'Google', year: 2023 },
      { id: 'c8', name: 'Azure Data Scientist', institution: 'Microsoft', year: 2024 },
    ],
    projects: [
      { id: 'pr5', name: 'Motor de Recomendaciones Falabella', description: 'Diseño e implementación del sistema de recomendaciones basado en deep learning.', role: 'Lead Data Scientist', year: 2024 },
    ],
    skills: [
      { skillId: 's13', skillName: 'Data Science', brief: 'ML, Deep Learning, NLP', expertise: 5 },
      { skillId: 's14', skillName: 'Inteligencia Artificial', brief: 'Computer Vision, LLMs', expertise: 5 },
      { skillId: 's15', skillName: 'Bases de Datos', brief: 'Data warehousing, ETL', expertise: 4 },
    ],
  },
  {
    id: 'p6', userId: '7', fullName: 'Diego Morales Fuentes', country: 'Ecuador', city: 'Quito',
    photoUrl: '', cohort: 'Cohorte 2024-A',
    website: '', linkedin: 'https://linkedin.com/in/diegomorales',
    whatsapp: '+593912345678', phone: '+593912345678', calendly: '',
    instagram: '@diegomfinanzas',
    biography: 'CFO con experiencia en empresas multinacionales. Especialista en restructuración financiera, fusiones y adquisiciones, y planificación fiscal internacional.',
    cvUrl: '',
    education: [
      { id: 'e10', type: 'Posgrado', institution: 'IE Business School', title: 'Master in Finance', year: 2019 },
      { id: 'e11', type: 'Pregrado', institution: 'ESPOL', title: 'Ingeniería Comercial', year: 2015 },
    ],
    certifications: [
      { id: 'c9', name: 'CFA Level III', institution: 'CFA Institute', year: 2021 },
    ],
    projects: [
      { id: 'pr6', name: 'M&A Grupo Wong', description: 'Lideré el proceso de due diligence y negociación en la adquisición.', role: 'Director Financiero', year: 2022 },
    ],
    skills: [
      { skillId: 's16', skillName: 'Finanzas', brief: 'M&A, Valuación, Planificación fiscal', expertise: 5 },
      { skillId: 's17', skillName: 'Consultoría', brief: 'Reestructuración empresarial', expertise: 4 },
      { skillId: 's18', skillName: 'Planeación Estratégica', brief: 'Planificación financiera a largo plazo', expertise: 4 },
    ],
  },
  {
    id: 'p7', userId: '8', fullName: 'Valentina Rojas Medina', country: 'Costa Rica', city: 'San José',
    photoUrl: '', cohort: 'Cohorte 2024-B',
    website: 'https://valentinarojas.com', linkedin: 'https://linkedin.com/in/valentinarojas',
    whatsapp: '+50612345678', phone: '+50612345678', calendly: 'https://calendly.com/valentinarojas',
    instagram: '@valrojas_rrhh',
    biography: 'Directora de Recursos Humanos con enfoque en cultura organizacional, bienestar y transformación del talento. Certificada en coaching ejecutivo y design thinking aplicado a HR.',
    cvUrl: '',
    education: [
      { id: 'e12', type: 'Posgrado', institution: 'INCAE', title: 'MBA', year: 2021 },
      { id: 'e13', type: 'Pregrado', institution: 'UCR', title: 'Psicología', year: 2016 },
    ],
    certifications: [
      { id: 'c10', name: 'ICF Professional Coach', institution: 'ICF', year: 2023 },
      { id: 'c11', name: 'SHRM-SCP', institution: 'SHRM', year: 2022 },
    ],
    projects: [
      { id: 'pr7', name: 'Transformación Cultural Walmart CA', description: 'Diseño e implementación del programa de transformación cultural para Centroamérica.', role: 'Directora de Talento', year: 2023 },
    ],
    skills: [
      { skillId: 's19', skillName: 'RRHH', brief: 'Gestión del talento y cultura organizacional', expertise: 5 },
      { skillId: 's20', skillName: 'Consultoría', brief: 'Coaching ejecutivo', expertise: 4 },
      { skillId: 's21', skillName: 'Planeación Estratégica', brief: 'Diseño organizacional', expertise: 3 },
    ],
  },
];

export function getTopSkill(profile: Profile): string {
  if (!profile.skills.length) return 'N/A';
  return profile.skills.reduce((a, b) => a.expertise > b.expertise ? a : b).skillName;
}

export function getLatestEducation(profile: Profile): string {
  if (!profile.education.length) return 'N/A';
  return profile.education.reduce((a, b) => a.year > b.year ? a : b).title;
}

export function getLatestCertification(profile: Profile): string {
  if (!profile.certifications.length) return 'N/A';
  return profile.certifications.reduce((a, b) => a.year > b.year ? a : b).name;
}
