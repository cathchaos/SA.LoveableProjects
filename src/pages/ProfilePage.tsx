import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, User, Phone, Copy, MapPin } from 'lucide-react';

export default function ProfilePage() {
  const { user, profile, isLoading: authLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    setIsSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        phone: phone || null,
      })
      .eq('user_id', user.id);

    if (error) {
      toast.error('Σφάλμα αποθήκευσης', {
        description: error.message,
      });
    } else {
      toast.success('Το προφίλ ενημερώθηκε!');
      await refreshProfile();
    }

    setIsSaving(false);
  };

  const copyAddress = () => {
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

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Το Προφίλ μου</h1>
          <p className="text-muted-foreground">
            Διαχειριστείτε τα στοιχεία του λογαριασμού σας
          </p>
        </div>

        {/* Receiving Address Card */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Διεύθυνση Παραλαβής (Ελλάδα)
            </CardTitle>
            <CardDescription>
              Η μοναδική σας διεύθυνση για παραγγελίες από Ελληνικά e-shops
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profile?.receiving_address ? (
              <div className="flex items-center justify-between gap-4 p-4 bg-background rounded-lg border">
                <code className="text-sm font-mono break-all">
                  {profile.receiving_address}
                </code>
                <Button variant="outline" size="sm" onClick={copyAddress}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Η διεύθυνση θα δημιουργηθεί αυτόματα
              </p>
            )}
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Προσωπικά Στοιχεία</CardTitle>
              <CardDescription>
                Ενημερώστε τα στοιχεία επικοινωνίας σας
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Το email δεν μπορεί να αλλάξει
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Ονοματεπώνυμο</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Γιάννης Παπαδόπουλος"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Τηλέφωνο</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+357 99 123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    disabled={isSaving}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Αποθήκευση...
                  </>
                ) : (
                  'Αποθήκευση Αλλαγών'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
