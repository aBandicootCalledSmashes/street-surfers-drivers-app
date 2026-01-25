import { Camera } from 'lucide-react';
import { Profile } from '@/hooks/useProfile';

interface ProfilePhotoSectionProps {
  profile: Profile;
}

export function ProfilePhotoSection({ profile }: ProfilePhotoSectionProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
          {profile.profile_photo_url ? (
            <img 
              src={profile.profile_photo_url} 
              alt={profile.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-primary">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>
        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <Camera className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-sm text-muted-foreground">{profile.email}</p>
        {profile.driver_code && (
          <p className="text-xs text-primary font-mono mt-1">{profile.driver_code}</p>
        )}
      </div>
    </div>
  );
}
