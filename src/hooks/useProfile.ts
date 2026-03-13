import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ProfileData {
  id: string;
  full_name: string;
  country: string;
  city: string;
  photo_url: string;
  cohort: string;
  website: string;
  linkedin: string;
  whatsapp: string;
  phone: string;
  calendly: string;
  instagram: string;
  biography: string;
  cv_url: string;
}

export interface EducationRow { id: string; type: string; institution: string; title: string; year: number; }
export interface CertRow { id: string; name: string; institution: string; year: number; }
export interface ProjectRow { id: string; name: string; description: string; role: string; year: number; }
export interface SkillRow { id: string; skill_id: string; skill_name: string; brief: string; expertise: number; }

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [education, setEducation] = useState<EducationRow[]>([]);
  const [certifications, setCertifications] = useState<CertRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);

    const { data: p } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (p) {
      setProfile(p as unknown as ProfileData);
      const pid = p.id;

      const [eduRes, certRes, projRes, skillRes] = await Promise.all([
        supabase.from('education').select('*').eq('profile_id', pid).order('year', { ascending: false }),
        supabase.from('certifications').select('*').eq('profile_id', pid).order('year', { ascending: false }),
        supabase.from('projects').select('*').eq('profile_id', pid).order('year', { ascending: false }),
        supabase.from('profile_skills').select('*').eq('profile_id', pid),
      ]);

      setEducation((eduRes.data ?? []) as unknown as EducationRow[]);
      setCertifications((certRes.data ?? []) as unknown as CertRow[]);
      setProjects((projRes.data ?? []) as unknown as ProjectRow[]);
      setSkills((skillRes.data ?? []) as unknown as SkillRow[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  return { profile, education, certifications, projects, skills, loading, refetch: fetchProfile };
}
