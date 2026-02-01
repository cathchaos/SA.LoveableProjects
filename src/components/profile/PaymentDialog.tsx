import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Loader2, Lock, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function PaymentDialog({ open, onOpenChange, onSuccess }: PaymentDialogProps) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsProcessing(true);

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ address_unlocked: true })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Η πληρωμή ολοκληρώθηκε! Η διεύθυνση ξεκλειδώθηκε.');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Σφάλμα κατά την πληρωμή. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handlePayment}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Ξεκλείδωμα Διεύθυνσης
            </DialogTitle>
            <DialogDescription>
              Πραγματοποιήστε μια εφάπαξ πληρωμή για να αποκτήσετε την προσωπική σας διεύθυνση στην Ελλάδα.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="bg-muted p-4 rounded-lg flex justify-between items-center mb-2">
              <span className="font-medium">Ενεργοποίηση Λογαριασμού</span>
              <span className="text-xl font-bold text-primary">€5.00</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card">Αριθμός Κάρτας (Mock)</Label>
              <div className="relative">
                <Input
                  id="card"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  required
                />
                <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Λήξη</Label>
                <Input id="expiry" placeholder="MM/YY" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" maxLength={3} required />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              Ασφαλής πληρωμή μέσω κρυπτογραφημένης σύνδεσης
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Ακύρωση
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Επεξεργασία...
                </>
              ) : (
                'Πληρωμή €5.00'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
