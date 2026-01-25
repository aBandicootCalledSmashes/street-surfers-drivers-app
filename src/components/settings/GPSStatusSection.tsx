import { MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GPSStatusSectionProps {
  isTracking: boolean;
  locationError: string | null;
  lastUpdate?: Date;
}

export function GPSStatusSection({ isTracking, locationError, lastUpdate }: GPSStatusSectionProps) {
  const handleFixPermissions = () => {
    // Show a helpful message about browser settings
    alert(
      'To enable location access:\n\n' +
      '1. Click the lock/info icon in your browser\'s address bar\n' +
      '2. Find "Location" in the permissions list\n' +
      '3. Change it to "Allow"\n' +
      '4. Refresh the page'
    );
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Location Status</h3>
      </div>
      
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        {/* GPS Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm">GPS Tracking</span>
          {isTracking ? (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Inactive</span>
            </div>
          )}
        </div>

        {/* Last Update */}
        {lastUpdate && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Update</span>
            <span className="text-sm font-mono">
              {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        )}

        {/* Error or Fix Button */}
        {locationError && (
          <>
            <p className="text-sm text-destructive">{locationError}</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleFixPermissions}
            >
              Fix Location Access
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
