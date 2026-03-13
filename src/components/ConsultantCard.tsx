import { DirectoryProfile, getTopSkill, getLatestEducation, getLatestCertification, getTopExpertise } from '@/hooks/useDirectory';
import { MapPin, MessageCircle, Award, GraduationCap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface Props {
  profile: DirectoryProfile;
}

export default function ConsultantCard({ profile }: Props) {
  const topSkill = getTopSkill(profile);
  const latestEdu = getLatestEducation(profile);
  const latestCert = getLatestCertification(profile);
  const topExpertise = getTopExpertise(profile);

  return (
    <Link to={`/consultor/${profile.id}`} className="consultant-card block">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        <div className="flex-shrink-0">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display text-xl font-bold">
            {profile.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold text-foreground truncate">{profile.full_name}</h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{profile.city}, {profile.country}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {topSkill !== 'N/A' && (
              <Badge variant="default" className="gap-1">
                <Star className="h-3 w-3" /> {topSkill}
                <span className="ml-0.5 text-xs opacity-80">({topExpertise}/5)</span>
              </Badge>
            )}
            {latestEdu !== 'N/A' && (
              <Badge variant="secondary" className="gap-1"><GraduationCap className="h-3 w-3" /> {latestEdu}</Badge>
            )}
            {latestCert !== 'N/A' && (
              <Badge variant="outline" className="gap-1"><Award className="h-3 w-3" /> {latestCert}</Badge>
            )}
          </div>
          {profile.whatsapp && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
              <MessageCircle className="h-3.5 w-3.5" /> <span>{profile.whatsapp}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
