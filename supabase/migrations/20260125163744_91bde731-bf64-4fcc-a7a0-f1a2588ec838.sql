-- Create vehicles table for multi-vehicle support
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  color TEXT,
  license_plate TEXT NOT NULL,
  vehicle_type TEXT NOT NULL DEFAULT 'kombi' CHECK (vehicle_type IN ('car', 'kombi', 'bus')),
  capacity INTEGER NOT NULL DEFAULT 10,
  is_active BOOLEAN NOT NULL DEFAULT false,
  verified_by_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Drivers can view their own vehicles
CREATE POLICY "Drivers can view their own vehicles"
ON public.vehicles
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = vehicles.driver_id 
  AND profiles.user_id = auth.uid()
));

-- Drivers can update is_active on their own vehicles only
CREATE POLICY "Drivers can update active status on their vehicles"
ON public.vehicles
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = vehicles.driver_id 
  AND profiles.user_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = vehicles.driver_id 
  AND profiles.user_id = auth.uid()
));

-- Admins can manage all vehicles
CREATE POLICY "Admins can manage all vehicles"
ON public.vehicles
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Add driver_code column for unique driver identification
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS driver_code TEXT;

-- Add depot/region assignment
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS assigned_depot TEXT;

-- Create trigger for vehicles updated_at
CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for vehicles
ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicles;