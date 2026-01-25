import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

export interface Vehicle {
  id: string;
  driver_id: string;
  make: string;
  model: string;
  color: string | null;
  license_plate: string;
  vehicle_type: 'car' | 'kombi' | 'bus';
  capacity: number;
  is_active: boolean;
  verified_by_admin: boolean;
  created_at: string;
  updated_at: string;
}

export function useVehicles() {
  const { profile } = useProfile();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = useCallback(async () => {
    if (!profile?.id) {
      setVehicles([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('driver_id', profile.id)
        .order('is_active', { ascending: false });

      if (fetchError) throw fetchError;
      
      setVehicles(data as Vehicle[] || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Failed to load vehicles');
    } finally {
      setIsLoading(false);
    }
  }, [profile?.id]);

  const setActiveVehicle = useCallback(async (vehicleId: string) => {
    if (!profile?.id) return { error: new Error('No profile found') };

    try {
      // First, deactivate all vehicles for this driver
      const { error: deactivateError } = await supabase
        .from('vehicles')
        .update({ is_active: false })
        .eq('driver_id', profile.id);

      if (deactivateError) throw deactivateError;

      // Then activate the selected vehicle
      const { error: activateError } = await supabase
        .from('vehicles')
        .update({ is_active: true })
        .eq('id', vehicleId);

      if (activateError) throw activateError;

      // Update local state
      setVehicles(prev => prev.map(v => ({
        ...v,
        is_active: v.id === vehicleId
      })));

      toast({
        title: 'Vehicle updated',
        description: 'Your active vehicle has been changed.',
        duration: 2000,
      });

      return { error: null };
    } catch (err) {
      console.error('Error setting active vehicle:', err);
      toast({
        title: 'Failed to update vehicle',
        variant: 'destructive',
      });
      return { error: err };
    }
  }, [profile?.id, toast]);

  const activeVehicle = vehicles.find(v => v.is_active) || vehicles[0] || null;

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    activeVehicle,
    isLoading,
    error,
    fetchVehicles,
    setActiveVehicle,
  };
}
