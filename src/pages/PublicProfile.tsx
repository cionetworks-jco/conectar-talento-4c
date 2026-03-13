import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Globe, Linkedin, MessageCircle, Phone, Calendar, Instagram,
  GraduationCap, Award, Briefcase, Star, ArrowLeft, FileText } from 'lucide-react';

export default function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: p } = await supabase.from('profiles').select('*').eq('id', id).single();
      if (!p) { setLoading(false); return; }
      setProfile(p);
      const [e, c, pr, s] = await Promise.all([
        supabase.from('education').select('*').eq('profile_id', id).order('year', { ascending: false }),
        supabase.from('certifications').select('*').eq('profile_id', id).order('year', { ascending: false }),
        supabase.from('projects').select('*').eq('profile_id', id).order('year', { ascending: false }),
        supabase.from('profile_skills').select('*').eq('profile_id', id),
      ]);
      setEducation(e.data ?? []);
      setCertifications(c.data ?? []);
      setProjects(pr.data ?? []);
      setSkills(s.data ?? []);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background"><Header />
        <div className="container py-16 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background"><Header />
        <div className="container py-16 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Perfil no encontrado</h1>
          <Link to="/directorio" className="mt-4 inline-block text-accent hover:underline">Volver al directorio</Link>
        </div>
      </div>
    );
  }

  const contactLinks = [
    { icon: Globe, value: profile.website, label: 'Website', href: profile.website },
    { icon: Linkedin, value: profile.linkedin, label: 'LinkedIn', href: profile.linkedin },
    { icon: MessageCircle, value: profile.whatsapp, label: 'WhatsApp', href: `https://wa.me/${profile.whatsapp?.replace(/\D/g, '')}` },
    { icon: Phone, value: profile.phone, label: 'Teléfono', href: `tel:${profile.phone}` },
    { icon: Calendar, value: profile.calendly, label: 'Calendly', href: profile.calendly },
    { icon: Instagram, value: profile.instagram, label: 'Instagram', href: `https://instagram.com/${profile.instagram?.replace('@', '')}` },
  ].filter(l => l.value);

  const renderStars = (n: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < n ? 'fill-gold text-gold' : 'text-border'}`} />
    ));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 max-w-4xl">
        <Link to="/directorio" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> Volver al directorio
        </Link>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display text-3xl font-bold flex-shrink-0">
              {profile.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold text-foreground">{profile.full_name}</h1>
              <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" /><span>{profile.city}, {profile.country}</span>
              </div>
              {profile.cohort && <p className="mt-1 text-sm text-muted-foreground">Cohorte: {profile.cohort}</p>}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.map((s: any) => (
                    <Badge key={s.id} variant="default" className="gap-1">
                      {s.skill_name} <span className="text-xs opacity-75">({s.expertise}/5)</span>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            {profile.biography && (
              <section className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="font-display text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" /> Biografía
                </h2>
                <p className="text-foreground/80 leading-relaxed">{profile.biography}</p>
              </section>
            )}

            {skills.length > 0 && (
              <section className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" /> Fortalezas Profesionales
                </h2>
                <div className="space-y-4">
                  {skills.map((s: any) => (
                    <div key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex-1">
                        <span className="font-medium text-foreground">{s.skill_name}</span>
                        <p className="text-sm text-muted-foreground">{s.brief}</p>
                      </div>
                      <div className="flex gap-0.5">{renderStars(s.expertise)}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-accent" /> Educación
                </h2>
                <div className="space-y-3">
                  {education.map((e: any) => (
                    <div key={e.id} className="border-l-2 border-accent pl-4">
                      <p className="font-medium text-foreground">{e.title}</p>
                      <p className="text-sm text-muted-foreground">{e.institution} · {e.type} · {e.year}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" /> Certificaciones
                </h2>
                <div className="space-y-3">
                  {certifications.map((c: any) => (
                    <div key={c.id} className="border-l-2 border-gold pl-4">
                      <p className="font-medium text-foreground">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.institution} · {c.year}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-accent" /> Proyectos
                </h2>
                <div className="space-y-4">
                  {projects.map((p: any) => (
                    <div key={p.id} className="border-l-2 border-primary pl-4">
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.role} · {p.year}</p>
                      <p className="text-sm text-foreground/80 mt-1">{p.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            {contactLinks.length > 0 && (
              <section className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Contacto</h2>
                <div className="space-y-3">
                  {contactLinks.map((l, i) => (
                    <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                      <l.icon className="h-4 w-4" /><span className="truncate">{l.label}</span>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {profile.cv_url && (
              <section className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="font-display text-lg font-bold text-foreground mb-4">CV</h2>
                <a href={profile.cv_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:underline">
                  <FileText className="h-4 w-4" /> Descargar CV
                </a>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
