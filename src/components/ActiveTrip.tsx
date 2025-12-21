import { Phone, MapPin, Users, Navigation, CheckCircle2, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trip, TripStatus } from '@/types/trip';
import { format } from 'date-fns';

interface ActiveTripProps {
  trip: Trip;
  onBack: () => void;
  onUpdateStatus: (tripId: string, status: TripStatus) => void;
}

export function ActiveTrip({ trip, onBack, onUpdateStatus }: ActiveTripProps) {
  const scheduledTime = new Date(trip.scheduledTime);

  const getActionButton = () => {
    switch (trip.status) {
      case 'assigned':
        return (
          <Button 
            variant="action" 
            size="xl" 
            className="w-full"
            onClick={() => onUpdateStatus(trip.id, 'en_route_pickup')}
          >
            <Navigation className="w-6 h-6" />
            Start Trip to Pickup
          </Button>
        );
      case 'en_route_pickup':
        return (
          <Button 
            variant="action" 
            size="xl" 
            className="w-full"
            onClick={() => onUpdateStatus(trip.id, 'arrived_pickup')}
          >
            <MapPin className="w-6 h-6" />
            Arrived at Pickup
          </Button>
        );
      case 'arrived_pickup':
        return (
          <Button 
            variant="success" 
            size="xl" 
            className="w-full"
            onClick={() => onUpdateStatus(trip.id, 'in_progress')}
          >
            <Users className="w-6 h-6" />
            Passenger Picked Up
          </Button>
        );
      case 'in_progress':
        return (
          <Button 
            variant="success" 
            size="xl" 
            className="w-full"
            onClick={() => onUpdateStatus(trip.id, 'completed')}
          >
            <CheckCircle2 className="w-6 h-6" />
            Complete Trip
          </Button>
        );
      default:
        return null;
    }
  };

  const getStatusStep = () => {
    const steps = [
      { key: 'assigned', label: 'Assigned' },
      { key: 'en_route_pickup', label: 'En Route' },
      { key: 'arrived_pickup', label: 'Arrived' },
      { key: 'in_progress', label: 'In Progress' },
      { key: 'completed', label: 'Completed' },
    ];
    const currentIndex = steps.findIndex(s => s.key === trip.status);
    
    return (
      <div className="flex items-center gap-1 mb-6">
        {steps.map((step, index) => (
          <div key={step.key} className="flex-1">
            <div 
              className={`h-1.5 rounded-full transition-colors ${
                index <= currentIndex 
                  ? index === currentIndex && trip.status !== 'completed'
                    ? 'bg-primary animate-pulse-glow'
                    : 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="flex-1 p-4 space-y-6 animate-slide-up">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to trips</span>
        </button>

        {getStatusStep()}

        {/* Time & Passenger Info */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Scheduled Time</p>
              <p className="text-2xl font-bold">{format(scheduledTime, 'HH:mm')}</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="font-bold">{trip.passenger.count}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Passenger</p>
              <p className="text-lg font-semibold">{trip.passenger.name}</p>
            </div>
            <div className="flex gap-2">
              <a 
                href={`tel:${trip.passenger.phone}`}
                className="p-3 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a 
                href={`sms:${trip.passenger.phone}`}
                className="p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Pickup</p>
            </div>
            <p className="text-lg font-medium pl-5">{trip.pickup.address}</p>
            {trip.pickup.landmark && (
              <p className="text-sm text-muted-foreground pl-5 mt-1">{trip.pickup.landmark}</p>
            )}
          </div>

          <div className="relative pl-1.5">
            <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-border" />
            <div className="h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-3 h-3 text-foreground" />
              <p className="text-sm font-semibold uppercase tracking-wide">Drop-off</p>
            </div>
            <p className="text-lg font-medium pl-5">{trip.dropoff.address}</p>
            {trip.dropoff.landmark && (
              <p className="text-sm text-muted-foreground pl-5 mt-1">{trip.dropoff.landmark}</p>
            )}
          </div>
        </div>

        {/* Notes */}
        {trip.notes && (
          <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
            <p className="text-sm font-semibold text-warning mb-1">Driver Notes</p>
            <p className="text-foreground">{trip.notes}</p>
          </div>
        )}
      </div>

      {/* Fixed Action Button */}
      {trip.status !== 'completed' && trip.status !== 'cancelled' && (
        <div className="sticky bottom-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
          {getActionButton()}
        </div>
      )}

      {trip.status === 'completed' && (
        <div className="p-4">
          <div className="bg-success/10 border border-success/30 rounded-xl p-5 text-center">
            <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-2" />
            <p className="text-lg font-bold text-success">Trip Completed</p>
          </div>
        </div>
      )}
    </div>
  );
}
