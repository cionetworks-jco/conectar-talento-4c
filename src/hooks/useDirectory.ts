import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DirectoryProfile {
  id: string;
  user_id: string;
  full_name: string;
  country: string;
  city: string;
  photo_url: string;
  cohort: string;
  whatsapp: string;
  biography: string;
  linkedin: string;
  website: string;
  phone: string;
  calendly: string;
  instagram: string;
  education: { id: string; type: string; institution: string; title: string; year: number }[];
  certifications: { id: string; name: string; institution: string; year: number }[];
  projects: { id: string; name: string; description: string; role: string; year: number }[];
  skills: { id: string; skill_name: string; brief: string; expertise: number }[];
}

export function getTopSkill(p: DirectoryProfile): string {
  if (!p.skills.length) return 'N/A';
  return p.skills.reduce((a, b) => a.expertise > b.expertise ? a : b).skill_name;
}
export function getTopExpertise(p: DirectoryProfile): number {
  if (!p.skills.length) return 0;
  return Math.max(...p.skills.map(s => s.expertise));
}
export function getLatestEducation(p: DirectoryProfile): string {
  if (!p.education.length) return 'N/A';
  return p.education.reduce((a, b) => a.year > b.year ? a : b).title;
}
export function getLatestCertification(p: DirectoryProfile): string {
  if (!p.certifications.length) return 'N/A';
  return p.certifications.reduce((a, b) => a.year > b.year ? a : b).name;
}

export function useDirectory() {
  const [profiles, setProfiles] = useState<DirectoryProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: profs } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_active', true)
        .order('full_name');

      if (!profs || profs.length === 0) { setLoading(false); return; }

      const ids = profs.map((p: any) => p.id);

      const [eduRes, certRes, projRes, skillRes] = await Promise.all([
        supabase.from('education').select('*').in('profile_id', ids),
        supabase.from('certifications').select('*').in('profile_id', ids),
        supabase.from('projects').select('*').in('profile_id', ids),
        supabase.from('profile_skills').select('*').in('profile_id', ids),
      ]);

      const result: DirectoryProfile[] = profs.map((p: any) => ({
        ...p,
        education: (eduRes.data ?? []).filter((e: any) => e.profile_id === p.id),
        certifications: (certRes.data ?? []).filter((c: any) => c.profile_id === p.id),
        projects: (projRes.data ?? []).filter((pr: any) => pr.profile_id === p.id),
        skills: (skillRes.data ?? []).filter((s: any) => s.profile_id === p.id),
      }));

      setProfiles(result);
      setLoading(false);
    }
    load();
  }, []);

  return { profiles, loading };
}
