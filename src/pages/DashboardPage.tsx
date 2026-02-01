import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useShipments } from '@/hooks/useShipments';
import { ShipmentCard } from '@/components/shipment/ShipmentCard';
import { Package, Plus, Copy, MapPin, Loader2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { PaymentDialog } from '@/components/profile/PaymentDialog';

export default function DashboardPage() {
  const { user, profile, isLoading: authLoading, refreshProfile } = useAuth();
  const { shipments, isLoading: shipmentsLoading } = useShipments();
  const navigate = useNavigate();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const copyAddress = () => {
    if (!profile?.address_unlocked) {
      setIsPaymentDialogOpen(true);
      return;
    }
    if (profile?.receiving_address) {
      navigator.clipboard.writeText(profile.receiving_address);
      toast.success('Διεύθυνση αντιγράφηκε!');
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  const activeShipments = shipments.filter(s => s.status !== 'delivered');
  const completedShipments = shipments.filter(s => s.status === 'delivered');

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Καλώς ήρθατε, {profile?.full_name || 'Χρήστη'}!
          </h1>
          <p className="text-muted-foreground">
            Διαχειριστείτε τις αποστολές σας και παρακολουθήστε τα δέματά σας
          </p>
        </div>

        {/* Receiving Address Card */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Η Διεύθυνσή σας στην Ελλάδα
            </CardTitle>
            <CardDescription>
              Χρησιμοποιήστε αυτή τη διεύθυνση για να λαμβάνετε δέματα από Ελληνικά e-shops
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profile?.address_unlocked ? (
              <div className="flex items-center justify-between gap-4 p-4 bg-background rounded-lg border">
                <code className="text-sm font-mono break-all font-bold text-primary">
                  {profile.receiving_address}
                </code>
                <Button variant="outline" size="sm" onClick={copyAddress}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-background rounded-lg border border-dashed flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <h4 className="font-medium mb-1">Η διεύθυνση είναι κλειδωμένη</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Πρέπει να ενεργοποιήσετε το λογαριασμό σας για να δείτε τη διεύθυνση παραλαβής στην Ελλάδα.
                </p>
                <Button onClick={() => setIsPaymentDialogOpen(true)}>
                  Ξεκλείδωμα Διεύθυνσης (€5)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <PaymentDialog
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
          onSuccess={refreshProfile}
        />

        {/* New Shipment Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Οι Αποστολές μου</h2>
          <Button asChild>
            <Link to="/new-shipment">
              <Plus className="h-4 w-4 mr-2" />
              Νέα Αποστολή
            </Link>
          </Button>
        </div>

        {shipmentsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : shipments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Καμία αποστολή ακόμα</h3>
              <p className="text-muted-foreground text-center mb-4">
                Δημιουργήστε την πρώτη σας αποστολή για να ξεκινήσετε
              </p>
              <Button asChild>
                <Link to="/new-shipment">
                  <Plus className="h-4 w-4 mr-2" />
                  Δημιουργία Αποστολής
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {activeShipments.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4 text-primary">
                  Ενεργές Αποστολές ({activeShipments.length})
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {activeShipments.map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
                </div>
              </div>
            )}

            {completedShipments.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4 text-muted-foreground">
                  Ολοκληρωμένες ({completedShipments.length})
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {completedShipments.map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
