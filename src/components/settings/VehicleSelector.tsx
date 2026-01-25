import { Car, Check, Lock } from 'lucide-react';
import { Vehicle } from '@/hooks/useVehicles';
import { cn } from '@/lib/utils';

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  activeVehicle: Vehicle | null;
  onSelectVehicle: (vehicleId: string) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function VehicleSelector({ 
  vehicles, 
  activeVehicle, 
  onSelectVehicle,
  isDisabled = false,
  isLoading = false 
}: VehicleSelectorProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Car className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Select Vehicle</h3>
      </div>

      {isDisabled && (
        <div className="flex items-center gap-2 p-3 bg-warning/10 text-warning rounded-lg">
          <Lock className="w-4 h-4" />
          <p className="text-sm">Vehicle cannot be changed during an active trip</p>
        </div>
      )}
      
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        {vehicles.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No vehicles assigned. Contact your administrator.
          </div>
        ) : (
          vehicles.map((vehicle) => {
            const isActive = activeVehicle?.id === vehicle.id;
            return (
              <button
                key={vehicle.id}
                disabled={isDisabled || isLoading}
                onClick={() => !isActive && onSelectVehicle(vehicle.id)}
                className={cn(
                  "w-full p-4 flex items-center gap-4 transition-colors",
                  isActive 
                    ? "bg-primary/5" 
                    : "hover:bg-secondary/50",
                  (isDisabled || isLoading) && "opacity-50 cursor-not-allowed"
                )}
              >
                {/* Radio circle */}
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  isActive 
                    ? "border-primary bg-primary" 
                    : "border-muted-foreground"
                )}>
                  {isActive && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>

                {/* Vehicle info */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                    {isActive && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-success/10 text-success rounded-full">
                        Current
                      </span>
                    )}
                    {vehicle.verified_by_admin && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{vehicle.color || 'No color'}</span>
                    <span>•</span>
                    <span className="font-mono">{vehicle.license_plate}</span>
                    <span>•</span>
                    <span>{vehicle.capacity} seats</span>
                  </div>
                </div>

                {/* Vehicle type badge */}
                <span className="px-2 py-1 text-xs font-medium bg-secondary rounded-full capitalize">
                  {vehicle.vehicle_type}
                </span>
              </button>
            );
          })
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        ⚠️ Only admins can add, edit, or remove vehicles
      </p>
    </section>
  );
}
