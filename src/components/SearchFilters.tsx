import { COUNTRIES, SKILLS_CATALOG } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface Filters {
  country: string;
  skill: string;
  educationLevel: string;
  searchText: string;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

export default function SearchFilters({ filters, onChange, onReset }: Props) {
  const hasFilters = filters.country || filters.skill || filters.educationLevel || filters.searchText;

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-foreground">Búsqueda Avanzada</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground">
            <X className="mr-1 h-4 w-4" /> Limpiar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">País</label>
          <Select value={filters.country} onValueChange={v => onChange({ ...filters, country: v === 'all' ? '' : v })}>
            <SelectTrigger><SelectValue placeholder="Todos los países" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los países</SelectItem>
              {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Fortaleza</label>
          <Select value={filters.skill} onValueChange={v => onChange({ ...filters, skill: v === 'all' ? '' : v })}>
            <SelectTrigger><SelectValue placeholder="Todas las fortalezas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las fortalezas</SelectItem>
              {SKILLS_CATALOG.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Nivel Educativo</label>
          <Select value={filters.educationLevel} onValueChange={v => onChange({ ...filters, educationLevel: v === 'all' ? '' : v })}>
            <SelectTrigger><SelectValue placeholder="Todos los niveles" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              <SelectItem value="Pregrado">Pregrado</SelectItem>
              <SelectItem value="Posgrado">Posgrado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Búsqueda libre</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Nombre, biografía..."
              value={filters.searchText}
              onChange={e => onChange({ ...filters, searchText: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
