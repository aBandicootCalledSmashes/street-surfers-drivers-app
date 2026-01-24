import { useState, useEffect } from 'react';
import { Wifi, WifiOff, MapPin, MapPinOff, Radio, CircleDot, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface OnlineToggleProps {
  isOnline: boolean;
  onToggle: (isOnline: boolean) => Promise<{ error: unknown } | void>;
  isTracking?: boolean;
  locationError?: string | null;
  hasActiveTrip?: boolean;
}

export function OnlineToggle({ isOnline, onToggle, isTracking, locationError, hasActiveTrip }: OnlineToggleProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [localOnline, setLocalOnline] = useState(isOnline);

  useEffect(() => {
    setLocalOnline(isOnline);
  }, [isOnline]);

  const handleToggle = async (checked: boolean) => {
    // Prevent going offline with active trip
    if (!checked && hasActiveTrip) {
      return;
    }

    setIsUpdating(true);
    setLocalOnline(checked);
    
    try {
      await onToggle(checked);
    } catch {
      // Revert on error
      setLocalOnline(!checked);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${
        localOnline 
          ? 'bg-success/5 border-success/30' 
          : 'bg-card border-border'
      }`}>
        <div className="flex items-center gap-3">
          {localOnline ? (
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-success" />
              </div>
              {/* Live indicator dot */}
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3">
                <div className="w-full h-full rounded-full bg-success animate-pulse" />
                <div className="absolute inset-0 w-full h-full rounded-full bg-success animate-ping opacity-50" />
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <Label htmlFor="online-toggle" className="text-base font-semibold cursor-pointer">
                {localOnline ? 'Online' : 'Offline'}
              </Label>
              {localOnline && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-success/20 rounded-full text-xs font-semibold text-success">
                  <Radio className="w-3 h-3" />
                  LIVE
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {localOnline 
                ? 'Visible to dispatch • Can receive trips' 
                : 'Hidden from dispatch • No new trips'
              }
            </p>
          </div>
        </div>
        
        <Switch
          id="online-toggle"
          checked={localOnline}
          onCheckedChange={handleToggle}
          disabled={isUpdating || (!localOnline ? false : hasActiveTrip)}
          className="data-[state=checked]:bg-success"
        />
      </div>

      {/* Active trip warning when trying to go offline */}
      {hasActiveTrip && localOnline && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-warning/10 text-warning border border-warning/20">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>Complete your current trip before going offline</span>
        </div>
      )}

      {/* GPS Status indicator when online */}
      {localOnline && (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
          locationError 
            ? 'bg-warning/10 text-warning border border-warning/20' 
            : isTracking 
              ? 'bg-success/10 text-success border border-success/20' 
              : 'bg-muted text-muted-foreground'
        }`}>
          {locationError ? (
            <>
              <MapPinOff className="w-4 h-4" />
              <span>Location disabled – enable GPS for tracking</span>
            </>
          ) : isTracking ? (
            <>
              <div className="relative">
                <MapPin className="w-4 h-4" />
                <CircleDot className="w-2 h-2 absolute -top-0.5 -right-0.5 text-success animate-pulse" />
              </div>
              <span>GPS streaming active • Dispatch can see your location</span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" />
              <span>Starting GPS...</span>
            </>
          )}
        </div>
      )}

      {/* Offline status details */}
      {!localOnline && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-muted text-muted-foreground">
          <MapPinOff className="w-4 h-4" />
          <span>Location tracking paused</span>
        </div>
      )}
    </div>
  );
}
