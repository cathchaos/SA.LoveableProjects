import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <span className="font-semibold">{COMPANY_INFO.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ενοποίηση και προώθηση δεμάτων από την Ελλάδα στην Κύπρο.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Γρήγορες Συνδέσεις</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/#how-it-works" className="hover:text-foreground transition-colors">
                  Πώς Λειτουργεί
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="hover:text-foreground transition-colors">
                  Τιμολόγηση
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-foreground transition-colors">
                  Συχνές Ερωτήσεις
                </Link>
              </li>
              <li>
                <Link to="/new-shipment" className="hover:text-foreground transition-colors">
                  Νέα Αποστολή
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-4">Νομικά</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Όροι Χρήσης
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Πολιτική Απορρήτου
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-foreground transition-colors">
                  Πολιτική Αποστολών
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Επικοινωνία</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{COMPANY_INFO.address}</li>
              <li>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-foreground transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-foreground transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} {COMPANY_INFO.name}. Με επιφύλαξη παντός δικαιώματος.</p>
          <p className="text-xs">
            Λειτουργούμε υπό το Κυπριακό Δίκαιο. Όλες οι συναλλαγές διέπονται από τους νόμους της Κυπριακής Δημοκρατίας.
          </p>
        </div>
      </div>
    </footer>
  );
}
