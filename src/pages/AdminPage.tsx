import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { StatusBadge } from '@/components/shipment/StatusBadge';
import { toast } from 'sonner';
import { Loader2, Shield, Package, Users, Search, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { SHIPMENT_STATUSES } from '@/lib/constants';
import type { Database } from '@/integrations/supabase/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type ShipmentStatus = Database['public']['Enums']['shipment_status'];

interface IncomingPackage {
  id: string;
  tracking_number: string | null;
  vendor: string | null;
  status: string;
}

interface ShipmentWithProfile {
  id: string;
  tracking_code: string | null;
  status: ShipmentStatus;
  description: string | null;
  parcel_count: number | null;
  created_at: string;
  locker_destination: string | null;
  payment_status: string;
  profiles: {
    full_name: string | null;
    phone: string | null;
  } | null;
}

export default function AdminPage() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<ShipmentWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedShipment, setSelectedShipment] = useState<ShipmentWithProfile | null>(null);
  const [incomingPackages, setIncomingPackages] = useState<IncomingPackage[]>([]);
  const [isPackagesLoading, setIsPackagesLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchShipments();
    }
  }, [isAdmin]);

  const fetchShipments = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('shipments')
      .select(`
        id,
        tracking_code,
        status,
        description,
        parcel_count,
        created_at,
        locker_destination,
        user_id,
        payment_status
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Σφάλμα φόρτωσης αποστολών');
      setIsLoading(false);
      return;
    }

    // Fetch profiles separately
    const userIds = [...new Set((data || []).map(s => s.user_id))];
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('user_id, full_name, phone')
      .in('user_id', userIds);

    const profilesMap = new Map(profilesData?.map(p => [p.user_id, p]) || []);

    const shipmentsWithProfiles = (data || []).map(s => ({
      ...s,
      profiles: profilesMap.get(s.user_id) || null,
    }));

    setShipments(shipmentsWithProfiles as ShipmentWithProfile[]);
    setIsLoading(false);
  };

  const updateStatus = async (shipmentId: string, newStatus: ShipmentStatus) => {
    const { error } = await supabase
      .from('shipments')
      .update({ status: newStatus })
      .eq('id', shipmentId);

    if (error) {
      toast.error('Σφάλμα ενημέρωσης κατάστασης');
    } else {
      toast.success('Η κατάσταση ενημερώθηκε');
      fetchShipments();
      if (selectedShipment?.id === shipmentId) {
        setSelectedShipment(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const fetchPackages = async (shipmentId: string) => {
    setIsPackagesLoading(true);
    const { data, error } = await supabase
      .from('incoming_packages')
      .select('*')
      .eq('shipment_id', shipmentId);

    if (!error) {
      setIncomingPackages(data || []);
    }
    setIsPackagesLoading(false);
  };

  const togglePackageStatus = async (pkgId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'received' ? 'expected' : 'received';
    const { error } = await supabase
      .from('incoming_packages')
      .update({ status: newStatus })
      .eq('id', pkgId);

    if (!error) {
      setIncomingPackages(prev => prev.map(p => p.id === pkgId ? { ...p, status: newStatus } : p));
      toast.success('Η κατάσταση του πακέτου ενημερώθηκε');
    }
  };

  if (authLoading || !isAdmin) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.tracking_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'pending').length,
    inTransit: shipments.filter(s => ['received_greece', 'consolidating', 'shipped_cyprus'].includes(s.status)).length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Shield className="h-8 w-8 text-accent" />
            Διαχείριση
          </h1>
          <p className="text-muted-foreground">
            Διαχειριστείτε όλες τις αποστολές και τους χρήστες
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Σύνολο</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Σε αναμονή</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-info/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.inTransit}</p>
                  <p className="text-sm text-muted-foreground">Σε μεταφορά</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.delivered}</p>
                  <p className="text-sm text-muted-foreground">Παραδόθηκαν</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Αναζήτηση με κωδικό, όνομα..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Φίλτρο κατάστασης" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Όλες οι καταστάσεις</SelectItem>
                  {SHIPMENT_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Shipments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Αποστολές ({filteredShipments.length})</CardTitle>
            <CardDescription>
              Διαχειριστείτε τις καταστάσεις των αποστολών
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredShipments.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Δεν βρέθηκαν αποστολές
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Κωδικός</th>
                      <th className="text-left py-3 px-2 font-medium">Πελάτης</th>
                      <th className="text-left py-3 px-2 font-medium">Περιγραφή</th>
                      <th className="text-left py-3 px-2 font-medium">Δέματα</th>
                      <th className="text-left py-3 px-2 font-medium">Κατάσταση</th>
                      <th className="text-left py-3 px-2 font-medium">Ενέργειες</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.map((shipment) => (
                      <tr key={shipment.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <code className="text-sm">{shipment.tracking_code}</code>
                        </td>
                        <td className="py-3 px-2">
                          {shipment.profiles?.full_name || 'Άγνωστος'}
                        </td>
                        <td className="py-3 px-2 text-sm text-muted-foreground max-w-[200px] truncate">
                          {shipment.description || '-'}
                        </td>
                        <td className="py-3 px-2">
                          {shipment.parcel_count || 1}
                        </td>
                        <td className="py-3 px-2">
                          <StatusBadge status={shipment.status} />
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Select
                              value={shipment.status}
                              onValueChange={(value) => updateStatus(shipment.id, value as ShipmentStatus)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {SHIPMENT_STATUSES.map((status) => (
                                  <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedShipment(shipment);
                                fetchPackages(shipment.id);
                              }}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Sheet open={!!selectedShipment} onOpenChange={(open) => !open && setSelectedShipment(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Διαχείριση Αποστολής {selectedShipment?.tracking_code}</SheetTitle>
            <SheetDescription>
              Στοιχεία πελάτη και δέματα προς ενοποίηση
            </SheetDescription>
          </SheetHeader>

          {selectedShipment && (
            <div className="py-6 space-y-6">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">Πελάτης</h4>
                <p className="font-semibold">{selectedShipment.profiles?.full_name}</p>
                <p className="text-sm">{selectedShipment.profiles?.phone}</p>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">Κατάσταση Αποστολής</h4>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={selectedShipment.status} />
                  <span className={`text-xs font-bold uppercase ${selectedShipment.payment_status === 'paid' ? 'text-green-600' : 'text-orange-500'}`}>
                    {selectedShipment.payment_status === 'paid' ? 'Πληρωμένο' : 'Εκκρεμεί Πληρωμή'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Αναμενόμενα Πακέτα ({incomingPackages.length})</h4>
                {isPackagesLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : incomingPackages.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">Δεν έχουν δηλωθεί πακέτα.</p>
                ) : (
                  <div className="space-y-2">
                    {incomingPackages.map((pkg) => (
                      <div key={pkg.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          {pkg.status === 'received' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-orange-500" />
                          )}
                          <div>
                            <p className="text-sm font-mono font-bold">{pkg.tracking_number}</p>
                            <p className="text-xs text-muted-foreground">{pkg.vendor || 'Άγνωστο κατάστημα'}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={pkg.status === 'received' ? 'outline' : 'default'}
                          onClick={() => togglePackageStatus(pkg.id, pkg.status)}
                        >
                          {pkg.status === 'received' ? 'Αναίρεση' : 'Παραλήφθηκε'}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t space-y-3">
                <h4 className="text-sm font-medium">Ενέργειες Διαχειριστή</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => updateStatus(selectedShipment.id, 'consolidating')}
                    disabled={selectedShipment.status === 'consolidating'}
                  >
                    Ενοποίηση
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => updateStatus(selectedShipment.id, 'shipped_cyprus')}
                    disabled={selectedShipment.status === 'shipped_cyprus'}
                  >
                    Αποστολή Κύπρο
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Layout>
  );
}
