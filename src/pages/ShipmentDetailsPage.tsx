import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useShipments, type Shipment } from '@/hooks/useShipments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/shipment/StatusBadge';
import { Loader2, ArrowLeft, Package, Plus, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function ShipmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { shipments, getIncomingPackages, addPackage, isLoading: shipmentsLoading } = useShipments();
  const { data: packages, isLoading: pkgsLoading } = getIncomingPackages(id || '');

  const [newTracking, setNewTracking] = useState('');
  const [newVendor, setNewVendor] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const shipment = shipments.find(s => s.id === id);

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newTracking) return;

    setIsAdding(true);
    try {
      await addPackage({ shipmentId: id, trackingNumber: newTracking, vendor: newVendor });
      setNewTracking('');
      setNewVendor('');
      toast.success('Το πακέτο προστέθηκε στην αποστολή');
    } catch (error) {
      toast.error('Σφάλμα κατά την προσθήκη');
    } finally {
      setIsAdding(false);
    }
  };

  const removePackage = async (pkgId: string) => {
    try {
      const { error } = await supabase
        .from('incoming_packages')
        .delete()
        .eq('id', pkgId);

      if (error) throw error;
      toast.success('Το πακέτο αφαιρέθηκε');
      // Query will auto-invalidate if using TanStack Query correctly in hook
    } catch (error) {
      toast.error('Σφάλμα κατά την αφαίρεση');
    }
  };

  if (shipmentsLoading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!shipment) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Η αποστολή δεν βρέθηκε</h2>
          <Button asChild>
            <Link to="/dashboard">Επιστροφή στο Dashboard</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Επιστροφή
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold">Αποστολή {shipment.tracking_code}</h1>
              <StatusBadge status={shipment.status} />
            </div>
            <p className="text-muted-foreground">
              Δημιουργήθηκε στις {new Date(shipment.created_at).toLocaleDateString('el-GR')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Track Box Now
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Περιεχόμενα Αποστολής
                </CardTitle>
                <CardDescription>
                  Τα δέματα που περιμένουμε να παραλάβουμε για εσάς
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pkgsLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : packages?.length === 0 ? (
                  <div className="text-center py-8 bg-muted/50 rounded-lg border border-dashed">
                    <p className="text-muted-foreground mb-4">Δεν έχουν προστεθεί tracking numbers ακόμα</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {packages?.map((pkg) => (
                      <div key={pkg.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                        <div>
                          <p className="font-mono text-sm font-bold">{pkg.tracking_number}</p>
                          <p className="text-xs text-muted-foreground">
                            {pkg.vendor || 'Άγνωστος προμηθευτής'} • Κατάσταση: {
                              pkg.status === 'expected' ? 'Αναμένεται' :
                              pkg.status === 'received' ? 'Παραλήφθηκε' : 'Πρόβλημα'
                            }
                          </p>
                        </div>
                        {pkg.status === 'expected' && (
                          <Button variant="ghost" size="icon" onClick={() => removePackage(pkg.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-medium mb-4">Προσθήκη νέου tracking number</h4>
                  <form onSubmit={handleAddPackage} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="pkg-tracking" className="text-xs">Tracking Number</Label>
                      <Input
                        id="pkg-tracking"
                        placeholder="π.χ. 123456789"
                        value={newTracking}
                        onChange={(e) => setNewTracking(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="pkg-vendor" className="text-xs">Κατάστημα (Προαιρετικά)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="pkg-vendor"
                          placeholder="π.χ. Skroutz, Zara"
                          value={newVendor}
                          onChange={(e) => setNewVendor(e.target.value)}
                        />
                        <Button type="submit" disabled={isAdding || !newTracking}>
                          {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Σημειώσεις</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  {shipment.notes || 'Δεν υπάρχουν σημειώσεις για αυτή την αποστολή.'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Σύνοψη</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Δέματα:</span>
                  <span className="font-medium">{shipment.parcel_count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ασφάλεια:</span>
                  <span className="font-medium">{shipment.insurance_selected ? 'Ναι' : 'Όχι'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Προορισμός:</span>
                  <span className="font-medium">{shipment.locker_destination}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Πληρωμή:</span>
                    <span className={shipment.payment_status === 'paid' ? 'text-green-600' : 'text-orange-500'}>
                      {shipment.payment_status === 'paid' ? 'Ολοκληρώθηκε' : 'Εκκρεμεί'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Τι ακολουθεί;
              </h4>
              <ul className="text-xs space-y-2 text-muted-foreground list-disc list-inside">
                <li>Περιμένουμε να έρθουν τα δέματά σας στην Αθήνα.</li>
                <li>Όταν έρθουν όλα, θα τα ενοποιήσουμε σε μία αποστολή.</li>
                <li>Θα λάβετε ειδοποίηση για την τελική πληρωμή και αποστολή στην Κύπρο.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
