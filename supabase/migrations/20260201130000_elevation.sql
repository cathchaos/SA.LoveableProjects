-- Add address_unlocked to profiles
ALTER TABLE public.profiles ADD COLUMN address_unlocked BOOLEAN DEFAULT false;

-- Create payment_status enum
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- Add payment_status to shipments
ALTER TABLE public.shipments ADD COLUMN payment_status payment_status DEFAULT 'pending';

-- Create incoming_packages table
CREATE TABLE public.incoming_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE NOT NULL,
  tracking_number TEXT,
  vendor TEXT,
  weight_kg DECIMAL(10,2),
  status TEXT DEFAULT 'expected' NOT NULL, -- expected, received, missing
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on incoming_packages
ALTER TABLE public.incoming_packages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for incoming_packages
CREATE POLICY "Users can view own incoming packages"
ON public.incoming_packages FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shipments s
    WHERE s.id = shipment_id
    AND (s.user_id = auth.uid() OR public.is_admin())
  )
);

CREATE POLICY "Users can manage own incoming packages"
ON public.incoming_packages FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shipments s
    WHERE s.id = shipment_id
    AND (s.user_id = auth.uid() OR public.is_admin())
  )
);

-- Trigger for updated_at on incoming_packages
CREATE TRIGGER update_incoming_packages_updated_at
BEFORE UPDATE ON public.incoming_packages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
