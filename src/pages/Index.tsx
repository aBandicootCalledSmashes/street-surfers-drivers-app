import { useState } from 'react';
import { Header } from '@/components/Header';
import { TripList } from '@/components/TripList';
import { ActiveTrip } from '@/components/ActiveTrip';
import { mockDriver, mockTrips } from '@/data/mockData';
import { Trip, TripStatus } from '@/types/trip';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const { toast } = useToast();

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleBack = () => {
    setSelectedTrip(null);
  };

  const handleUpdateStatus = (tripId: string, newStatus: TripStatus) => {
    setTrips(prevTrips => 
      prevTrips.map(trip => 
        trip.id === tripId 
          ? { ...trip, status: newStatus, updatedAt: new Date().toISOString() }
          : trip
      )
    );

    // Update the selected trip as well
    setSelectedTrip(prev => 
      prev?.id === tripId 
        ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() }
        : prev
    );

    const statusMessages: Record<TripStatus, string> = {
      'assigned': 'Trip assigned',
      'en_route_pickup': 'Heading to pickup location',
      'arrived_pickup': 'Arrived at pickup',
      'in_progress': 'Passenger picked up - trip started',
      'completed': 'Trip completed successfully',
      'cancelled': 'Trip cancelled',
    };

    toast({
      title: statusMessages[newStatus],
      duration: 2000,
    });
  };

  // Get the currently active trip (in progress)
  const activeTripId = trips.find(t => 
    t.status === 'en_route_pickup' || 
    t.status === 'arrived_pickup' || 
    t.status === 'in_progress'
  )?.id;

  return (
    <div className="min-h-screen bg-background">
      <Header driver={mockDriver} />
      
      {selectedTrip ? (
        <ActiveTrip 
          trip={selectedTrip}
          onBack={handleBack}
          onUpdateStatus={handleUpdateStatus}
        />
      ) : (
        <TripList 
          trips={trips}
          onSelectTrip={handleSelectTrip}
          activeTripId={activeTripId}
        />
      )}
    </div>
  );
};

export default Index;
