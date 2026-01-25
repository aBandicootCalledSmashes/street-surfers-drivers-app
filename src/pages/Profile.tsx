import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useVehicles } from '@/hooks/useVehicles';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfilePhotoSection } from '@/components/profile/ProfilePhotoSection';
import { PersonalInfoSection } from '@/components/profile/PersonalInfoSection';
import { VehicleInfoSection } from '@/components/profile/VehicleInfoSection';
import { OperationsSection } from '@/components/profile/OperationsSection';
import { SecuritySection } from '@/components/profile/SecuritySection';

export default function Profile() {
  const navigate = useNavigate();
  const { profile, isLoading, updatePhone, updatePassword } = useProfile();
  const { activeVehicle, isLoading: vehiclesLoading } = useVehicles();

  if (isLoading || vehiclesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Profile not found</p>
          <p className="text-sm text-muted-foreground mt-2">Please log out and log back in.</p>
          <Button variant="outline" onClick={() => navigate('/')} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      <ProfileHeader title="My Profile" />

      <main className="p-4 space-y-6 pb-8">
        {/* Profile Photo & Name */}
        <ProfilePhotoSection profile={profile} />

        {/* Personal Information (mostly read-only) */}
        <PersonalInfoSection 
          profile={profile} 
          onUpdatePhone={updatePhone} 
        />

        {/* Current Vehicle Info (read-only) */}
        <VehicleInfoSection vehicle={activeVehicle} />

        {/* Operations / Dispatcher */}
        <OperationsSection profile={profile} />

        {/* Security - Change Password */}
        <SecuritySection onUpdatePassword={updatePassword} />
      </main>
    </div>
  );
}
