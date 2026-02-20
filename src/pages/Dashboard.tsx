import { mockProfiles, mockUsers } from '@/data/mockData';
import { COUNTRIES, SKILLS_CATALOG } from '@/types';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Globe, Award, GraduationCap, Briefcase, TrendingUp, Star, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.isActive).length;
  const totalProfiles = mockProfiles.length;

  const countryData = COUNTRIES
    .map(c => ({ name: c, count: mockProfiles.filter(p => p.country === c).length }))
    .filter(d => d.count > 0)
    .sort((a, b) => b.count - a.count);

  const skillData = SKILLS_CATALOG
    .map(s => ({
      name: s,
      count: mockProfiles.filter(p => p.skills.some(sk => sk.skillName === s)).length,
    }))
    .filter(d => d.count > 0)
    .sort((a, b) => b.count - a.count);

  const pregradoCount = mockProfiles.filter(p => p.education.some(e => e.type === 'Pregrado')).length;
  const posgradoCount = mockProfiles.filter(p => p.education.some(e => e.type === 'Posgrado')).length;
  const eduData = [
    { name: 'Pregrado', value: pregradoCount },
    { name: 'Posgrado', value: posgradoCount },
  ];

  const totalCerts = mockProfiles.reduce((sum, p) => sum + p.certifications.length, 0);
  const totalProjects = mockProfiles.reduce((sum, p) => sum + p.projects.length, 0);

  const COLORS = ['hsl(215, 60%, 22%)', 'hsl(178, 55%, 40%)', 'hsl(40, 80%, 55%)', 'hsl(145, 60%, 42%)', 'hsl(205, 75%, 55%)'];

  const stats = [
    { icon: Users, label: 'Total Usuarios', value: totalUsers, color: 'text-accent' },
    { icon: TrendingUp, label: 'Usuarios Activos', value: activeUsers, color: 'text-success' },
    { icon: Globe, label: 'Países', value: countryData.length, color: 'text-info' },
    { icon: Star, label: 'Perfiles', value: totalProfiles, color: 'text-gold' },
    { icon: Award, label: 'Certificaciones', value: totalCerts, color: 'text-accent' },
    { icon: Briefcase, label: 'Proyectos', value: totalProjects, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Resumen general del directorio profesional</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="stat-card text-center animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <s.icon className={`mx-auto h-6 w-6 ${s.color} mb-2`} />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" /> Distribución de Fortalezas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(178, 55%, 40%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" /> Consultores por País
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(215, 60%, 22%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-accent" /> Nivel Educativo
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={eduData} cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`} dataKey="value">
                    {eduData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" /> Profesionales Destacados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProfiles.slice(0, 5).map(p => {
                  const topSkill = p.skills.length > 0
                    ? p.skills.reduce((a, b) => a.expertise > b.expertise ? a : b)
                    : null;
                  return (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                        {p.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{p.fullName}</p>
                        <p className="text-xs text-muted-foreground">{p.country}</p>
                      </div>
                      {topSkill && <Badge variant="secondary" className="text-xs">{topSkill.skillName}</Badge>}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
