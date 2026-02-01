import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import type { ShipmentStatusKey } from '@/lib/constants';

export interface Shipment {
  id: string;
  user_id: string;
  tracking_code: string;
  status: ShipmentStatusKey;
  parcel_count: number;
  description: string | null;
  notes: string | null;
  locker_destination: string | null;
  insurance_selected: boolean;
  terms_accepted: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShipmentHistory {
  id: string;
  shipment_id: string;
  status: ShipmentStatusKey;
  notes: string | null;
  created_at: string;
}

export interface CreateShipmentData {
  parcel_count: number;
  description?: string | null;
  locker_destination?: string;
  notes?: string | null;
  insurance_selected?: boolean;
  terms_accepted: boolean;
  tracking_numbers?: string[]; // New: list of tracking numbers for incoming packages
}

export interface IncomingPackage {
  id: string;
  shipment_id: string;
  tracking_number: string | null;
  vendor: string | null;
  status: string;
  weight_kg: number | null;
  created_at: string;
}

export function useShipments() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const shipmentsQuery = useQuery({
    queryKey: ['shipments', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Shipment[];
    },
    enabled: !!user,
  });

  const shipmentHistoryQuery = (shipmentId: string) => useQuery({
    queryKey: ['shipment-history', shipmentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shipment_history')
        .select('*')
        .eq('shipment_id', shipmentId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ShipmentHistory[];
    },
    enabled: !!shipmentId,
  });

  const createShipmentMutation = useMutation({
    mutationFn: async ({ tracking_numbers, ...shipmentData }: CreateShipmentData) => {
      if (!user) throw new Error('User not authenticated');

      // 1. Create the shipment
      const { data: shipment, error: shipmentError } = await supabase
        .from('shipments')
        .insert({
          user_id: user.id,
          ...shipmentData,
        })
        .select()
        .single();

      if (shipmentError) throw shipmentError;

      // 2. Create incoming packages if tracking numbers were provided
      if (tracking_numbers && tracking_numbers.length > 0) {
        const packagesToInsert = tracking_numbers.map(num => ({
          shipment_id: shipment.id,
          tracking_number: num,
          status: 'expected'
        }));

        const { error: pkgError } = await supabase
          .from('incoming_packages')
          .insert(packagesToInsert);

        if (pkgError) throw pkgError;
      }

      return shipment as Shipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
      toast.success('Η αποστολή δημιουργήθηκε επιτυχώς!');
    },
    onError: (error) => {
      toast.error('Σφάλμα κατά τη δημιουργία της αποστολής');
      console.error('Create shipment error:', error);
    },
  });

  const incomingPackagesQuery = (shipmentId: string) => useQuery({
    queryKey: ['incoming-packages', shipmentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('incoming_packages')
        .select('*')
        .eq('shipment_id', shipmentId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as IncomingPackage[];
    },
    enabled: !!shipmentId,
  });

  const addPackageMutation = useMutation({
    mutationFn: async ({ shipmentId, trackingNumber, vendor }: { shipmentId: string, trackingNumber: string, vendor?: string }) => {
      const { data, error } = await supabase
        .from('incoming_packages')
        .insert({ shipment_id: shipmentId, tracking_number: trackingNumber, vendor, status: 'expected' })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incoming-packages', variables.shipmentId] });
      toast.success('Το πακέτο προστέθηκε');
    }
  });

  return {
    shipments: shipmentsQuery.data ?? [],
    isLoading: shipmentsQuery.isLoading,
    error: shipmentsQuery.error,
    createShipment: createShipmentMutation.mutateAsync,
    isCreating: createShipmentMutation.isPending,
    getShipmentHistory: shipmentHistoryQuery,
    getIncomingPackages: incomingPackagesQuery,
    addPackage: addPackageMutation.mutateAsync,
    refetch: shipmentsQuery.refetch,
  };
}

// Admin-specific hook for managing all shipments
export function useAdminShipments() {
  const queryClient = useQueryClient();

  const allShipmentsQuery = useQuery({
    queryKey: ['admin-shipments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shipments')
        .select(`
          *,
          profiles:user_id (
            full_name,
            phone,
            receiving_address
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ shipmentId, status, notes }: {
      shipmentId: string;
      status: ShipmentStatusKey;
      notes?: string;
    }) => {
      const { data, error } = await supabase
        .from('shipments')
        .update({ status, notes })
        .eq('id', shipmentId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shipments'] });
      toast.success('Η κατάσταση ενημερώθηκε επιτυχώς!');
    },
    onError: (error) => {
      toast.error('Σφάλμα κατά την ενημέρωση της κατάστασης');
      console.error('Update status error:', error);
    },
  });

  return {
    shipments: allShipmentsQuery.data ?? [],
    isLoading: allShipmentsQuery.isLoading,
    error: allShipmentsQuery.error,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    refetch: allShipmentsQuery.refetch,
  };
}
