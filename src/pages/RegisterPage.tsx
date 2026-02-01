import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !fullName) {
      toast.error('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Οι κωδικοί πρόσβασης δεν ταιριάζουν');
      return;
    }

    if (password.length < 6) {
      toast.error('Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 6 χαρακτήρες');
      return;
    }

    if (!acceptTerms) {
      toast.error('Παρακαλώ αποδεχτείτε τους όρους χρήσης');
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await signUp(email, password, fullName);
    
    if (error) {
      toast.error('Σφάλμα εγγραφής', {
        description: error.message,
      });
      setIsSubmitting(false);
      return;
    }

    toast.success('Επιτυχής εγγραφή!', {
      description: 'Ο λογαριασμός σας δημιουργήθηκε',
    });
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Εγγραφή</CardTitle>
            <CardDescription>
              Δημιουργήστε λογαριασμό και αποκτήστε τη δική σας διεύθυνση Ελλάδας
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Ονοματεπώνυμο *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Γιάννης Παπαδόπουλος"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Κωδικός Πρόσβασης *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Επιβεβαίωση Κωδικού *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  Αποδέχομαι τους{' '}
                  <Link to="/terms" className="text-primary hover:underline" target="_blank">
                    Όρους Χρήσης
                  </Link>{' '}
                  και την{' '}
                  <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                    Πολιτική Απορρήτου
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Εγγραφή...
                  </>
                ) : (
                  'Δημιουργία Λογαριασμού'
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Έχετε ήδη λογαριασμό;{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Συνδεθείτε
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
