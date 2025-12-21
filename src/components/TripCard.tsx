import { MapPin, Clock, Users, ChevronRight } from 'lucide-react';
import { Trip } from '@/types/trip';
import { format } from 'date-fns';

interface TripCardProps {
  trip: Trip;
  onClick: (trip: Trip) => void;
  isActive?: boolean;
}

export function TripCard({ trip, onClick, isActive }: TripCardProps) {
  const scheduledTime = new Date(trip.scheduledTime);

  const getStatusBadge = () => {
    switch (trip.status) {
      case 'en_route_pickup':
        return <span className="px-2 py-1 text-xs font-semibold rounded bg-warning/20 text-warning">En Route</span>;
      case 'arrived_pickup':
        return <span className="px-2 py-1 text-xs font-semibold rounded bg-primary/20 text-primary">Arrived</span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs font-semibold rounded bg-success/20 text-success animate-pulse-glow">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-semibold rounded bg-muted text-muted-foreground">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={() => onClick(trip)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 animate-slide-up ${
        isActive 
          ? 'bg-primary/10 border-primary' 
          : 'bg-card border-border hover:border-muted-foreground hover:bg-secondary/50'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-lg font-bold">{format(scheduledTime, 'HH:mm')}</span>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Pickup</p>
            <p className="font-medium truncate">{trip.pickup.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 ml-[3px]">
            <MapPin className="w-4 h-4 text-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Drop-off</p>
            <p className="font-medium truncate">{trip.dropoff.address}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{trip.passenger.count} passenger{trip.passenger.count > 1 ? 's' : ''}</span>
        </div>
        <span className="text-sm text-muted-foreground">•</span>
        <span className="text-sm font-medium">{trip.passenger.name}</span>
      </div>
    </button>
  );
}
