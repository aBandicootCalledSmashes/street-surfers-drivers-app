-- =============================================
-- POSTGRESQL DATABASE BACKUP
-- Project: Street Surfers Driver App
-- Generated: 2026-02-01
-- =============================================

BEGIN;

-- PROFILES TABLE
INSERT INTO public.profiles (id, user_id, name, email, phone, is_online, driver_code, license_number, assigned_depot, dispatcher_name, dispatcher_phone, vehicle_make, vehicle_model, vehicle_color, plate_number, profile_photo_url, created_at, updated_at)
VALUES 
  ('d09bf470-080b-420a-9c7d-067d1d45fef1', '308903b7-f32a-469a-b4eb-b28cd23e3a88', 'bandicootconnect', 'bandicootconnect@gmail.com', NULL, false, NULL, NULL, NULL, 'Street Surfers Operations', '+27123456789', NULL, NULL, NULL, NULL, NULL, '2026-01-30 11:58:46.191598+00', '2026-01-30 11:58:46.191598+00'),
  ('c2500677-cd6c-4bd1-ba26-28cf8e289804', '68aeafa4-02d1-46a0-8371-075b3af7fdff', 'Smanga', 'smanga@streetsurfers.co.za', '+27821234567', false, 'SS-DRV-001', 'DRV-2024-001', 'Cape Town South', 'Street Surfers Operations', '+27123456789', 'Toyota', 'Quantum', 'White', 'CA 456-789', NULL, '2026-01-25 16:38:17.128996+00', '2026-01-31 12:03:22.333407+00')
ON CONFLICT (id) DO NOTHING;

-- VEHICLES TABLE
INSERT INTO public.vehicles (id, driver_id, make, model, color, license_plate, capacity, vehicle_type, is_active, verified_by_admin, created_at, updated_at)
VALUES 
  ('f6fae211-4b58-42ea-86d5-e5c96123bf9d', 'c2500677-cd6c-4bd1-ba26-28cf8e289804', 'Toyota', 'Quantum', 'White', 'CA 456-789', 14, 'kombi', false, true, '2026-01-25 16:38:37.706117+00', '2026-01-30 01:26:41.092118+00'),
  ('f9dfd67e-32b3-436c-a8af-d7f7a97d770c', 'c2500677-cd6c-4bd1-ba26-28cf8e289804', 'VW', 'Crafter', 'Silver', 'CA 123-456', 16, 'kombi', true, true, '2026-01-25 16:38:37.706117+00', '2026-01-30 01:26:41.336875+00')
ON CONFLICT (id) DO NOTHING;

-- USER_ROLES TABLE
INSERT INTO public.user_roles (id, user_id, role, created_at)
VALUES 
  ('de5bfce0-57fd-4e49-b9a5-245ef963002a', '68aeafa4-02d1-46a0-8371-075b3af7fdff', 'driver', '2025-12-22 07:50:05.303573+00')
ON CONFLICT (id) DO NOTHING;

-- DRIVER_LOCATIONS TABLE
INSERT INTO public.driver_locations (id, driver_id, latitude, longitude, accuracy, vehicle_id, updated_at)
VALUES 
  ('0e02bb82-3def-4393-b955-3673fc242817', 'c2500677-cd6c-4bd1-ba26-28cf8e289804', -26.1983132260562, 28.0641721517918, 18.9992331191721, NULL, '2026-01-31 12:02:03.130899+00')
ON CONFLICT (id) DO NOTHING;

-- SAFETY_LOG TABLE
-- (No records)

COMMIT;
