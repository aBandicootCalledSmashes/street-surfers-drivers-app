import { Trip } from '@/types/trip';
import { TripCard } from './TripCard';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface TripListProps {
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
  activeTripId?: string;
}

export function TripList({ trips, onSelectTrip, activeTripId }: TripListProps) {
  const pendingTrips = trips.filter(t => 
    t.status !== 'completed' && t.status !== 'cancelled'
  );
  const completedTrips = trips.filter(t => t.status === 'completed');

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <Calendar className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-bold">Today's Trips</h2>
          <p className="text-sm text-muted-foreground">{format(new Date(), 'EEEE, d MMMM')}</p>
        </div>
      </div>

      {pendingTrips.length === 0 && completedTrips.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium">No trips assigned</p>
          <p className="text-muted-foreground">Check back later for new assignments</p>
        </div>
      ) : (
        <>
          {pendingTrips.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Upcoming
                </p>
                <span className="text-sm font-bold text-primary">{pendingTrips.length}</span>
              </div>
              <div className="space-y-3">
                {pendingTrips.map((trip, index) => (
                  <div key={trip.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <TripCard 
                      trip={trip} 
                      onClick={onSelectTrip}
                      isActive={trip.id === activeTripId}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedTrips.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Completed ({completedTrips.length})
                </p>
              </div>
              <div className="space-y-3 opacity-60">
                {completedTrips.map(trip => (
                  <TripCard 
                    key={trip.id} 
                    trip={trip} 
                    onClick={onSelectTrip}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
