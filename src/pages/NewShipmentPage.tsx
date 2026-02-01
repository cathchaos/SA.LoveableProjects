import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useShipments } from '@/hooks/useShipments';
import { toast } from 'sonner';
import { Loader2, Package, MapPin, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LOCKER_LOCATIONS } from '@/lib/constants';

export default function NewShipmentPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { createShipment, isCreating } = useShipments();
  const navigate = useNavigate();

  const [parcelCount, setParcelCount] = useState('1');
  const [description, setDescription] = useState('');
  const [lockerDestination, setLockerDestination] = useState('');
  const [notes, setNotes] = useState('');
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error('Παρακαλώ αποδεχτείτε τους όρους αποστολής');
      return;
    }

    if (!lockerDestination) {
      toast.error('Παρακαλώ επιλέξτε σημείο παραλαβής');
      return;
    }

    const shipment = await createShipment({
      parcel_count: parseInt(parcelCount) || 1,
      description: description || null,
      locker_destination: lockerDestination,
      notes: notes || null,
      insurance_selected: insuranceSelected,
      terms_accepted: termsAccepted,
    });

    if (shipment) {
      toast.success('Η αποστολή δημιουργήθηκε!', {
        description: `Κωδικός: ${shipment.tracking_code}`,
      });
      navigate('/dashboard');
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

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            Νέα Αποστολή
          </h1>
          <p className="text-muted-foreground">
            Δημιουργήστε νέα αποστολή για να στείλετε τα δέματά σας από Ελλάδα σε Κύπρο
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Στοιχεία Αποστολής</CardTitle>
              <CardDescription>
                Συμπληρώστε τα στοιχεία της αποστολής σας
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="parcelCount">Αριθμός Δεμάτων</Label>
                <Select value={parcelCount} onValueChange={setParcelCount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Επιλέξτε αριθμό" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'δέμα' : 'δέματα'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Περιγραφή Περιεχομένου</Label>
                <Textarea
                  id="description"
                  placeholder="π.χ. Ρούχα, ηλεκτρονικά, βιβλία..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="locker">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Σημείο Παραλαβής (Box Now Locker)
                </Label>
                <Select value={lockerDestination} onValueChange={setLockerDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Επιλέξτε locker" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCKER_LOCATIONS.map((locker) => (
                      <SelectItem key={locker.id} value={locker.id}>
                        {locker.name} - {locker.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Σημειώσεις (προαιρετικό)</Label>
                <Textarea
                  id="notes"
                  placeholder="Ειδικές οδηγίες ή σημειώσεις..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="insurance"
                    checked={insuranceSelected}
                    onCheckedChange={(checked) => setInsuranceSelected(checked === true)}
                  />
                  <div>
                    <Label htmlFor="insurance" className="font-medium">
                      Ασφάλιση Δέματος
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Προσθέστε ασφάλεια για προστασία έως €500 (+€5)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-primary mb-1">Πώς λειτουργεί:</p>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Λαμβάνετε τη διεύθυνση αποστολής στην Ελλάδα</li>
                      <li>Στέλνετε τα δέματά σας σε αυτή τη διεύθυνση</li>
                      <li>Τα συγκεντρώνουμε και τα στέλνουμε σε Κύπρο</li>
                      <li>Τα παραλαμβάνετε από το επιλεγμένο locker</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  Αποδέχομαι την{' '}
                  <Link to="/shipping-policy" className="text-primary hover:underline" target="_blank">
                    Πολιτική Αποστολών
                  </Link>{' '}
                  και τους{' '}
                  <Link to="/terms" className="text-primary hover:underline" target="_blank">
                    Όρους Χρήσης
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Δημιουργία...
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Δημιουργία Αποστολής
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
