import { useState, useMemo } from 'react';
import { mockProfiles, getTopSkill, getLatestEducation, getLatestCertification } from '@/data/mockData';
import SearchFilters from '@/components/SearchFilters';
import ConsultantCard from '@/components/ConsultantCard';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Grid3X3, List, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

type SortKey = 'name' | 'country' | 'skill' | 'education' | 'certification';
type ViewMode = 'cards' | 'table';

const emptyFilters = { country: '', skill: '', educationLevel: '', searchText: '' };

export default function Directory() {
  const [filters, setFilters] = useState(emptyFilters);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const filtered = useMemo(() => {
    let results = [...mockProfiles];

    if (filters.country) {
      results = results.filter(p => p.country === filters.country);
    }
    if (filters.skill) {
      results = results.filter(p => p.skills.some(s => s.skillName === filters.skill));
    }
    if (filters.educationLevel) {
      results = results.filter(p => p.education.some(e => e.type === filters.educationLevel));
    }
    if (filters.searchText) {
      const q = filters.searchText.toLowerCase();
      results = results.filter(p =>
        p.fullName.toLowerCase().includes(q) ||
        p.biography.toLowerCase().includes(q) ||
        p.projects.some(pr => pr.description.toLowerCase().includes(q))
      );
    }

    // Sort
    const getSortValue = (p: typeof results[0]): string => {
      switch (sortKey) {
        case 'name': return p.fullName;
        case 'country': return p.country;
        case 'skill': return getTopSkill(p);
        case 'education': return getLatestEducation(p);
        case 'certification': return getLatestCertification(p);
        default: return p.fullName;
      }
    };

    results.sort((a, b) => {
      const va = getSortValue(a).toLowerCase();
      const vb = getSortValue(b).toLowerCase();
      return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    return results;
  }, [filters, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortButton = ({ label, sKey }: { label: string; sKey: SortKey }) => (
    <button
      onClick={() => toggleSort(sKey)}
      className="flex items-center gap-1 font-medium hover:text-accent transition-colors"
    >
      {label}
      <ArrowUpDown className={`h-3.5 w-3.5 ${sortKey === sKey ? 'text-accent' : 'text-muted-foreground'}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Directorio de Consultores</h1>
            <p className="text-muted-foreground mt-1">
              <Users className="inline h-4 w-4 mr-1" />
              {filtered.length} profesionales encontrados
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <SearchFilters filters={filters} onChange={setFilters} onReset={() => setFilters(emptyFilters)} />

        <div className="mt-6">
          {viewMode === 'table' ? (
            <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Foto</TableHead>
                      <TableHead><SortButton label="Nombre" sKey="name" /></TableHead>
                      <TableHead><SortButton label="País" sKey="country" /></TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead><SortButton label="Fortaleza Principal" sKey="skill" /></TableHead>
                      <TableHead><SortButton label="Título Académico" sKey="education" /></TableHead>
                      <TableHead><SortButton label="Certificación" sKey="certification" /></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map(p => (
                      <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <Link to={`/consultor/${p.id}`}>
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                              {p.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/consultor/${p.id}`} className="font-medium text-foreground hover:text-accent">
                            {p.fullName}
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{p.country}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{p.whatsapp || '—'}</TableCell>
                        <TableCell>
                          <Badge variant="default" className="text-xs">{getTopSkill(p)}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{getLatestEducation(p)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{getLatestCertification(p)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(p => (
                <ConsultantCard key={p.id} profile={p} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Users className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">No se encontraron resultados</h3>
              <p className="mt-2 text-muted-foreground">Intenta con otros filtros de búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
