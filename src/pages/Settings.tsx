import { useState } from 'react';
import { AlertCircle, LogOut, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useVehicles } from '@/hooks/useVehicles';
import { useAuth } from '@/hooks/useAuth';
import { useDriverLocation } from '@/hooks/useDriverLocation';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { OnlineToggle } from '@/components/OnlineToggle';
import { VehicleSelector } from '@/components/settings/VehicleSelector';
import { GPSStatusSection } from '@/components/settings/GPSStatusSection';
import { NotificationsSection } from '@/components/settings/NotificationsSection';
import { SafetySection } from '@/components/settings/SafetySection';
import { LegalSection } from '@/components/settings/LegalSection';

export default function Settings() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile, isLoading, toggleOnlineStatus } = useProfile();
  const { vehicles, activeVehicle, isLoading: vehiclesLoading, setActiveVehicle } = useVehicles();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // TODO: Get actual trip state from context/hook
  const hasActiveTrip = false;

  // Location tracking for online toggle
  const { isTracking, error: locationError } = useDriverLocation({
    driverId: profile?.id || '',
    enabled: profile?.is_online || false,
    updateInterval: 10000,
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    navigate('/auth', { replace: true });
  };

  const handleOnlineToggle = async (isOnline: boolean) => {
    return toggleOnlineStatus(isOnline);
  };

  const handleVehicleChange = async (vehicleId: string) => {
    await setActiveVehicle(vehicleId);
  };

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
      <ProfileHeader title="Settings" />

      <main className="p-4 space-y-6 pb-8">
        {/* Online/Offline Toggle */}
        <OnlineToggle 
          isOnline={profile.is_online} 
          onToggle={handleOnlineToggle}
          isTracking={isTracking}
          locationError={locationError}
          hasActiveTrip={hasActiveTrip}
        />

        {/* Vehicle Selection */}
        <VehicleSelector
          vehicles={vehicles}
          activeVehicle={activeVehicle}
          onSelectVehicle={handleVehicleChange}
          isDisabled={hasActiveTrip}
          isLoading={vehiclesLoading}
        />

        {/* GPS/Location Status */}
        <GPSStatusSection
          isTracking={isTracking}
          locationError={locationError}
        />

        {/* Notifications */}
        <NotificationsSection />

        {/* Safety */}
        <SafetySection 
          profile={profile}
          tripId={null}
        />

        {/* Legal & Support */}
        <LegalSection />

        {/* Logout */}
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="destructive"
          className="w-full"
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing out...
            </>
          ) : (
            <>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </>
          )}
        </Button>
      </main>
    </div>
  );
}
