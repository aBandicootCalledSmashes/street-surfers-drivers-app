import { Car } from 'lucide-react';
import { Vehicle } from '@/hooks/useVehicles';

interface VehicleInfoSectionProps {
  vehicle: Vehicle | null;
}

export function VehicleInfoSection({ vehicle }: VehicleInfoSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Car className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Current Vehicle</h3>
      </div>
      
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        {vehicle ? (
          <>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Make / Model</p>
                  <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
                  Active
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-xs text-muted-foreground">Color</p>
              <p className="font-medium">{vehicle.color || '—'}</p>
            </div>
            
            <div className="p-4">
              <p className="text-xs text-muted-foreground">License Plate</p>
              <p className="font-medium font-mono">{vehicle.license_plate}</p>
            </div>

            <div className="p-4">
              <p className="text-xs text-muted-foreground">Capacity</p>
              <p className="font-medium">{vehicle.capacity} passengers</p>
            </div>

            <div className="p-4">
              <p className="text-xs text-muted-foreground">Vehicle Type</p>
              <p className="font-medium capitalize">{vehicle.vehicle_type}</p>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No vehicle assigned
          </div>
        )}
      </div>
    </section>
  );
}
