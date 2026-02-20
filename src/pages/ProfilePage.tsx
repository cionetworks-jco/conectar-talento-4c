import { useState } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COUNTRIES, SKILLS_CATALOG } from '@/types';
import { toast } from 'sonner';
import {
  User, MapPin, Phone, GraduationCap, Award, Briefcase, Star, Plus, Trash2, Save
} from 'lucide-react';

interface EducationEntry { id: string; type: string; institution: string; title: string; year: string; }
interface CertEntry { id: string; name: string; institution: string; year: string; }
interface ProjectEntry { id: string; name: string; description: string; role: string; year: string; }
interface SkillEntry { skillName: string; brief: string; expertise: number; }

export default function ProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [cohort, setCohort] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phone, setPhone] = useState('');
  const [calendly, setCalendly] = useState('');
  const [instagram, setInstagram] = useState('');
  const [biography, setBiography] = useState('');

  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [certifications, setCertifications] = useState<CertEntry[]>([]);
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [skills, setSkills] = useState<SkillEntry[]>([]);

  const addEducation = () => setEducation([...education, { id: Date.now().toString(), type: 'Pregrado', institution: '', title: '', year: '' }]);
  const addCert = () => setCertifications([...certifications, { id: Date.now().toString(), name: '', institution: '', year: '' }]);
  const addProject = () => setProjects([...projects, { id: Date.now().toString(), name: '', description: '', role: '', year: '' }]);
  const addSkill = () => setSkills([...skills, { skillName: '', brief: '', expertise: 3 }]);

  const removeEdu = (id: string) => setEducation(education.filter(e => e.id !== id));
  const removeCert = (id: string) => setCertifications(certifications.filter(c => c.id !== id));
  const removeProject = (id: string) => setProjects(projects.filter(p => p.id !== id));
  const removeSkill = (i: number) => setSkills(skills.filter((_, idx) => idx !== i));

  const handleSave = () => {
    if (!fullName) { toast.error('El nombre completo es obligatorio'); return; }
    toast.success('Perfil guardado exitosamente (demo)');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 max-w-3xl">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground">Mi Perfil</h1>
          <p className="text-muted-foreground mt-1">Completa tu información profesional</p>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-accent" /> Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nombre completo *</Label>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Tu nombre completo" />
                </div>
                <div>
                  <Label>Cohorte</Label>
                  <Input value={cohort} onChange={e => setCohort(e.target.value)} placeholder="Ej: Cohorte 2024-A" />
                </div>
                <div>
                  <Label>País</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger><SelectValue placeholder="Selecciona tu país" /></SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Ciudad</Label>
                  <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Tu ciudad" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent" /> Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Website</Label>
                  <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://tuwebsite.com" />
                </div>
                <div>
                  <Label>LinkedIn</Label>
                  <Input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/tu-perfil" />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+52 55 1234 5678" />
                </div>
                <div>
                  <Label>Teléfono</Label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+52 55 1234 5678" />
                </div>
                <div>
                  <Label>Calendly</Label>
                  <Input value={calendly} onChange={e => setCalendly(e.target.value)} placeholder="https://calendly.com/tu-perfil" />
                </div>
                <div>
                  <Label>Instagram</Label>
                  <Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@tu_usuario" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biography */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Biografía</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={biography}
                onChange={e => setBiography(e.target.value)}
                placeholder="Cuéntanos sobre tu trayectoria profesional..."
                rows={5}
              />
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-accent" /> Educación
              </CardTitle>
              <Button variant="outline" size="sm" onClick={addEducation}>
                <Plus className="mr-1 h-4 w-4" /> Agregar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {education.map(e => (
                <div key={e.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end border-b border-border pb-4 last:border-0">
                  <Select value={e.type} onValueChange={v => setEducation(education.map(x => x.id === e.id ? { ...x, type: v } : x))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pregrado">Pregrado</SelectItem>
                      <SelectItem value="Posgrado">Posgrado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Institución" value={e.institution} onChange={ev => setEducation(education.map(x => x.id === e.id ? { ...x, institution: ev.target.value } : x))} />
                  <Input placeholder="Título" value={e.title} onChange={ev => setEducation(education.map(x => x.id === e.id ? { ...x, title: ev.target.value } : x))} />
                  <div className="flex gap-2">
                    <Input placeholder="Año" type="number" value={e.year} onChange={ev => setEducation(education.map(x => x.id === e.id ? { ...x, year: ev.target.value } : x))} />
                    <Button variant="ghost" size="icon" onClick={() => removeEdu(e.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              ))}
              {education.length === 0 && <p className="text-sm text-muted-foreground">Sin entradas aún. Haz clic en "Agregar".</p>}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" /> Certificaciones
              </CardTitle>
              <Button variant="outline" size="sm" onClick={addCert}>
                <Plus className="mr-1 h-4 w-4" /> Agregar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {certifications.map(c => (
                <div key={c.id} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end border-b border-border pb-4 last:border-0">
                  <Input placeholder="Nombre" value={c.name} onChange={ev => setCertifications(certifications.map(x => x.id === c.id ? { ...x, name: ev.target.value } : x))} />
                  <Input placeholder="Institución" value={c.institution} onChange={ev => setCertifications(certifications.map(x => x.id === c.id ? { ...x, institution: ev.target.value } : x))} />
                  <div className="flex gap-2">
                    <Input placeholder="Año" type="number" value={c.year} onChange={ev => setCertifications(certifications.map(x => x.id === c.id ? { ...x, year: ev.target.value } : x))} />
                    <Button variant="ghost" size="icon" onClick={() => removeCert(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              ))}
              {certifications.length === 0 && <p className="text-sm text-muted-foreground">Sin certificaciones aún.</p>}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" /> Proyectos / Experiencia
              </CardTitle>
              <Button variant="outline" size="sm" onClick={addProject}>
                <Plus className="mr-1 h-4 w-4" /> Agregar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map(p => (
                <div key={p.id} className="space-y-3 border-b border-border pb-4 last:border-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input placeholder="Nombre del proyecto" value={p.name} onChange={ev => setProjects(projects.map(x => x.id === p.id ? { ...x, name: ev.target.value } : x))} />
                    <Input placeholder="Rol desempeñado" value={p.role} onChange={ev => setProjects(projects.map(x => x.id === p.id ? { ...x, role: ev.target.value } : x))} />
                    <div className="flex gap-2">
                      <Input placeholder="Año" type="number" value={p.year} onChange={ev => setProjects(projects.map(x => x.id === p.id ? { ...x, year: ev.target.value } : x))} />
                      <Button variant="ghost" size="icon" onClick={() => removeProject(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </div>
                  <Textarea placeholder="Descripción del proyecto" value={p.description} onChange={ev => setProjects(projects.map(x => x.id === p.id ? { ...x, description: ev.target.value } : x))} rows={2} />
                </div>
              ))}
              {projects.length === 0 && <p className="text-sm text-muted-foreground">Sin proyectos aún.</p>}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" /> Fortalezas Profesionales
              </CardTitle>
              <Button variant="outline" size="sm" onClick={addSkill}>
                <Plus className="mr-1 h-4 w-4" /> Agregar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((s, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end border-b border-border pb-4 last:border-0">
                  <Select value={s.skillName} onValueChange={v => setSkills(skills.map((x, idx) => idx === i ? { ...x, skillName: v } : x))}>
                    <SelectTrigger><SelectValue placeholder="Fortaleza" /></SelectTrigger>
                    <SelectContent>
                      {SKILLS_CATALOG.map(sk => <SelectItem key={sk} value={sk}>{sk}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Descripción breve" value={s.brief} onChange={ev => setSkills(skills.map((x, idx) => idx === i ? { ...x, brief: ev.target.value } : x))} />
                  <Select value={s.expertise.toString()} onValueChange={v => setSkills(skills.map((x, idx) => idx === i ? { ...x, expertise: parseInt(v) } : x))}>
                    <SelectTrigger><SelectValue placeholder="Nivel" /></SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5].map(n => <SelectItem key={n} value={n.toString()}>{n} - {['Básico','Intermedio','Avanzado','Experto','Maestro'][n-1]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => removeSkill(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
              {skills.length === 0 && <p className="text-sm text-muted-foreground">Sin fortalezas aún.</p>}
            </CardContent>
          </Card>

          {/* Save button */}
          <div className="flex justify-end">
            <Button size="lg" onClick={handleSave} className="px-8">
              <Save className="mr-2 h-4 w-4" /> Guardar Perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
