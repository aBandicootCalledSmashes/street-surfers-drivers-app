export type TripStatus = 
  | 'assigned' 
  | 'en_route_pickup' 
  | 'arrived_pickup' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface Passenger {
  id: string;
  name: string;
  phone: string;
  count: number;
}

export interface Location {
  address: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Trip {
  id: string;
  passenger: Passenger;
  pickup: Location;
  dropoff: Location;
  scheduledTime: string;
  status: TripStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  plateNumber: string;
  isOnline: boolean;
}
