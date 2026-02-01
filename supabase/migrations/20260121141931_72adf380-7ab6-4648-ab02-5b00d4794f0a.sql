-- Fix function search paths for security
ALTER FUNCTION public.generate_tracking_code() SET search_path = public;
ALTER FUNCTION public.generate_receiving_address() SET search_path = public;
ALTER FUNCTION public.set_shipment_tracking_code() SET search_path = public;
ALTER FUNCTION public.record_shipment_history() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;