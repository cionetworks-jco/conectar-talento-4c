import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COUNTRIES, SKILLS_CATALOG } from '@/types';
import { toast } from 'sonner';
import {
  User, Phone, GraduationCap, Award, Briefcase, Star, Plus, Trash2, Save, Upload, Loader2
} from 'lucide-react';

interface EduEntry { id: string; type: string; institution: string; title: string; year: string; isNew?: boolean; }
interface CertEntry { id: string; name: string; institution: string; year: string; isNew?: boolean; }
interface ProjEntry { id: string; name: string; description: string; role: string; year: string; isNew?: boolean; }
interface SkillEntry { id: string; skill_name: string; brief: string; expertise: number; skill_id: string; isNew?: boolean; }

export default function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { profile, education: eduData, certifications: certData, projects: projData, skills: skillData, loading, refetch } = useProfile();
  const fileRef = useRef<HTMLInputElement>(null);

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
  const [cvUrl, setCvUrl] = useState('');

  const [education, setEducation] = useState<EduEntry[]>([]);
  const [certifications, setCertifications] = useState<CertEntry[]>([]);
  const [projects, setProjects] = useState<ProjEntry[]>([]);
  const [skills, setSkills] = useState<SkillEntry[]>([]);
  const [skillsCatalog, setSkillsCatalog] = useState<{ id: string; name: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate('/login');
  }, [authLoading, isAuthenticated, navigate]);

  // Load skills catalog
  useEffect(() => {
    supabase.from('skills').select('id, name').order('name').then(({ data }) => {
      if (data) setSkillsCatalog(data as unknown as { id: string; name: string }[]);
    });
  }, []);

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setCountry(profile.country || '');
      setCity(profile.city || '');
      setCohort(profile.cohort || '');
      setWebsite(profile.website || '');
      setLinkedin(profile.linkedin || '');
      setWhatsapp(profile.whatsapp || '');
      setPhone(profile.phone || '');
      setCalendly(profile.calendly || '');
      setInstagram(profile.instagram || '');
      setBiography(profile.biography || '');
      setCvUrl(profile.cv_url || '');
    }
    if (eduData.length) setEducation(eduData.map(e => ({ ...e, year: e.year.toString() })));
    if (certData.length) setCertifications(certData.map(c => ({ ...c, year: c.year.toString() })));
    if (projData.length) setProjects(projData.map(p => ({ ...p, year: p.year.toString() })));
    if (skillData.length) setSkills(skillData.map(s => ({ ...s })));
  }, [profile, eduData, certData, projData, skillData]);

  const addEducation = () => setEducation([...education, { id: `new-${Date.now()}`, type: 'Pregrado', institution: '', title: '', year: '', isNew: true }]);
  const addCert = () => setCertifications([...certifications, { id: `new-${Date.now()}`, name: '', institution: '', year: '', isNew: true }]);
  const addProject = () => setProjects([...projects, { id: `new-${Date.now()}`, name: '', description: '', role: '', year: '', isNew: true }]);
  const addSkill = () => setSkills([...skills, { id: `new-${Date.now()}`, skill_name: '', brief: '', expertise: 3, skill_id: '', isNew: true }]);

  const removeEdu = (id: string) => setEducation(education.filter(e => e.id !== id));
  const removeCert = (id: string) => setCertifications(certifications.filter(c => c.id !== id));
  const removeProject = (id: string) => setProjects(projects.filter(p => p.id !== id));
  const removeSkill = (id: string) => setSkills(skills.filter(s => s.id !== id));

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !profile) return;
    if (file.type !== 'application/pdf') { toast.error('Solo se permiten archivos PDF'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('El archivo no debe superar 5MB'); return; }

    setUploading(true);
    const path = `${user.id}/cv.pdf`;
    const { error } = await supabase.storage.from('cvs').upload(path, file, { upsert: true });
    if (error) { toast.error('Error al subir CV'); setUploading(false); return; }

    const { data: urlData } = supabase.storage.from('cvs').getPublicUrl(path);
    setCvUrl(urlData.publicUrl);
    setUploading(false);
    toast.success('CV subido correctamente');
  };

  const handleSave = async () => {
    if (!fullName) { toast.error('El nombre completo es obligatorio'); return; }
    if (!profile) return;
    setSaving(true);

    try {
      // Update profile
      await supabase.from('profiles').update({
        full_name: fullName, country, city, cohort, website, linkedin,
        whatsapp, phone, calendly, instagram, biography, cv_url: cvUrl,
      } as any).eq('id', profile.id);

      // Sync education: delete removed, upsert existing/new
      const existingEduIds = eduData.map(e => e.id);
      const currentEduIds = education.filter(e => !e.isNew).map(e => e.id);
      const removedEduIds = existingEduIds.filter(id => !currentEduIds.includes(id));
      if (removedEduIds.length) await supabase.from('education').delete().in('id', removedEduIds);
      for (const e of education) {
        const row = { profile_id: profile.id, type: e.type, institution: e.institution, title: e.title, year: parseInt(e.year) || 2024 } as any;
        if (e.isNew) await supabase.from('education').insert(row);
        else await supabase.from('education').update(row).eq('id', e.id);
      }

      // Sync certifications
      const existingCertIds = certData.map(c => c.id);
      const currentCertIds = certifications.filter(c => !c.isNew).map(c => c.id);
      const removedCertIds = existingCertIds.filter(id => !currentCertIds.includes(id));
      if (removedCertIds.length) await supabase.from('certifications').delete().in('id', removedCertIds);
      for (const c of certifications) {
        const row = { profile_id: profile.id, name: c.name, institution: c.institution, year: parseInt(c.year) || 2024 } as any;
        if (c.isNew) await supabase.from('certifications').insert(row);
        else await supabase.from('certifications').update(row).eq('id', c.id);
      }

      // Sync projects
      const existingProjIds = projData.map(p => p.id);
      const currentProjIds = projects.filter(p => !p.isNew).map(p => p.id);
      const removedProjIds = existingProjIds.filter(id => !currentProjIds.includes(id));
      if (removedProjIds.length) await supabase.from('projects').delete().in('id', removedProjIds);
      for (const p of projects) {
        const row = { profile_id: profile.id, name: p.name, description: p.description, role: p.role, year: parseInt(p.year) || 2024 } as any;
        if (p.isNew) await supabase.from('projects').insert(row);
        else await supabase.from('projects').update(row).eq('id', p.id);
      }

      // Sync skills
      const existingSkillIds = skillData.map(s => s.id);
      const currentSkillIds = skills.filter(s => !s.isNew).map(s => s.id);
      const removedSkillIds = existingSkillIds.filter(id => !currentSkillIds.includes(id));
      if (removedSkillIds.length) await supabase.from('profile_skills').delete().in('id', removedSkillIds);
      for (const s of skills) {
        const catalog = skillsCatalog.find(sc => sc.name === s.skill_name);
        if (!catalog) continue;
        const row = { profile_id: profile.id, skill_id: catalog.id, skill_name: s.skill_name, brief: s.brief, expertise: s.expertise } as any;
        if (s.isNew) await supabase.from('profile_skills').insert(row);
        else await supabase.from('profile_skills').update(row).eq('id', s.id);
      }

      toast.success('Perfil guardado exitosamente');
      refetch();
    } catch (err) {
      toast.error('Error al guardar el perfil');
    }
    setSaving(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background"><Header />
        <div className="container py-16 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </div>
    );
  }

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
                <div><Label>Nombre completo *</Label><Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Tu nombre completo" /></div>
                <div><Label>Cohorte</Label><Input value={cohort} onChange={e => setCohort(e.target.value)} placeholder="Ej: Cohorte 2024-A" /></div>
                <div>
                  <Label>País</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger><SelectValue placeholder="Selecciona tu país" /></SelectTrigger>
                    <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Ciudad</Label><Input value={city} onChange={e => setCity(e.target.value)} placeholder="Tu ciudad" /></div>
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
                <div><Label>Website</Label><Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://tuwebsite.com" /></div>
                <div><Label>LinkedIn</Label><Input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/tu-perfil" /></div>
                <div><Label>WhatsApp</Label><Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+52 55 1234 5678" /></div>
                <div><Label>Teléfono</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+52 55 1234 5678" /></div>
                <div><Label>Calendly</Label><Input value={calendly} onChange={e => setCalendly(e.target.value)} placeholder="https://calendly.com/tu-perfil" /></div>
                <div><Label>Instagram</Label><Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@tu_usuario" /></div>
              </div>
            </CardContent>
          </Card>

          {/* Biography */}
          <Card>
            <CardHeader><CardTitle className="font-display text-lg">Biografía</CardTitle></CardHeader>
            <CardContent>
              <Textarea value={biography} onChange={e => setBiography(e.target.value)} placeholder="Cuéntanos sobre tu trayectoria profesional..." rows={5} />
            </CardContent>
          </Card>

          {/* CV Upload */}
          <Card>
            <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Upload className="h-5 w-5 text-accent" /> CV (PDF)</CardTitle></CardHeader>
            <CardContent>
              <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={handleCvUpload} />
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
                  {uploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...</> : <><Upload className="mr-2 h-4 w-4" /> Subir CV</>}
                </Button>
                {cvUrl && <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">Ver CV actual</a>}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg flex items-center gap-2"><GraduationCap className="h-5 w-5 text-accent" /> Educación</CardTitle>
              <Button variant="outline" size="sm" onClick={addEducation}><Plus className="mr-1 h-4 w-4" /> Agregar</Button>
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
              <CardTitle className="font-display text-lg flex items-center gap-2"><Award className="h-5 w-5 text-accent" /> Certificaciones</CardTitle>
              <Button variant="outline" size="sm" onClick={addCert}><Plus className="mr-1 h-4 w-4" /> Agregar</Button>
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
              <CardTitle className="font-display text-lg flex items-center gap-2"><Briefcase className="h-5 w-5 text-accent" /> Proyectos / Experiencia</CardTitle>
              <Button variant="outline" size="sm" onClick={addProject}><Plus className="mr-1 h-4 w-4" /> Agregar</Button>
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
              <CardTitle className="font-display text-lg flex items-center gap-2"><Star className="h-5 w-5 text-accent" /> Fortalezas Profesionales</CardTitle>
              <Button variant="outline" size="sm" onClick={addSkill}><Plus className="mr-1 h-4 w-4" /> Agregar</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map(s => (
                <div key={s.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end border-b border-border pb-4 last:border-0">
                  <Select value={s.skill_name} onValueChange={v => setSkills(skills.map(x => x.id === s.id ? { ...x, skill_name: v } : x))}>
                    <SelectTrigger><SelectValue placeholder="Fortaleza" /></SelectTrigger>
                    <SelectContent>
                      {skillsCatalog.map(sk => <SelectItem key={sk.id} value={sk.name}>{sk.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Descripción breve" value={s.brief} onChange={ev => setSkills(skills.map(x => x.id === s.id ? { ...x, brief: ev.target.value } : x))} />
                  <Select value={s.expertise.toString()} onValueChange={v => setSkills(skills.map(x => x.id === s.id ? { ...x, expertise: parseInt(v) } : x))}>
                    <SelectTrigger><SelectValue placeholder="Nivel" /></SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5].map(n => <SelectItem key={n} value={n.toString()}>{n} - {['Básico','Intermedio','Avanzado','Experto','Maestro'][n-1]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => removeSkill(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
              {skills.length === 0 && <p className="text-sm text-muted-foreground">Sin fortalezas aún.</p>}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleSave} className="px-8" disabled={saving}>
              {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...</> : <><Save className="mr-2 h-4 w-4" /> Guardar Perfil</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
