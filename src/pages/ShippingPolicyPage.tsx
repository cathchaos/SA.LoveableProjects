import { Layout } from '@/components/layout/Layout';
import { COMPANY_INFO } from '@/lib/constants';

const ShippingPolicyPage = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold mb-2">Πολιτική Αποστολών</h1>
          <p className="text-muted-foreground mb-8">
            Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR')}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Φύση Υπηρεσίας</h2>
            <p className="text-muted-foreground mb-4">
              Η {COMPANY_INFO.name} παρέχει υπηρεσίες ενδιάμεσου προώθησης δεμάτων μεταξύ 
              Ελλάδας και Κύπρου. Δεν είμαστε μεταφορική εταιρεία ούτε courier. 
              Λειτουργούμε ως ενδιάμεσος που παραλαμβάνει, ενοποιεί και προωθεί δέματα 
              κατ' εντολή του πελάτη.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground font-medium">
                Σημαντικό: Η τελική μεταφορά πραγματοποιείται μέσω Box Now και υπόκειται 
                στους δικούς τους όρους και προϋποθέσεις.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Διαδικασία Αποστολής</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">2.1 Παραλαβή στην Ελλάδα</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Αποκτάτε μοναδική διεύθυνση παραλαβής στην Ελλάδα</li>
              <li>Τα δέματα παραλαμβάνονται σφραγισμένα</li>
              <li>Δεν ανοίγουμε ούτε επιθεωρούμε τα δέματα</li>
              <li>Καταγράφεται η εξωτερική κατάσταση κατά την παραλαβή</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">2.2 Αποθήκευση</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Τα δέματα αποθηκεύονται προσωρινά έως 14 ημέρες χωρίς επιπλέον χρέωση</li>
              <li>Μετά τις 14 ημέρες, χρεώνεται €1/ημέρα ανά δέμα</li>
              <li>Μέγιστος χρόνος αποθήκευσης: 30 ημέρες</li>
              <li>Μετά τις 30 ημέρες, τα δέματα επιστρέφονται στον αποστολέα</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">2.3 Ενοποίηση</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Επιλέγετε πότε θα γίνει η ενοποίηση και αποστολή</li>
              <li>Ενοποιούμε σε τυπικά μεγέθη Box Now</li>
              <li>Χρησιμοποιούμε προστατευτικά υλικά όπου χρειάζεται</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">2.4 Προώθηση</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Η αποστολή γίνεται μέσω Box Now locker-to-locker</li>
              <li>Λαμβάνετε κωδικό παρακολούθησης</li>
              <li>Ενημερώνεστε για την πορεία της αποστολής</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Χρόνοι Παράδοσης</h2>
            <p className="text-muted-foreground mb-4">
              Οι εκτιμώμενοι χρόνοι παράδοσης είναι ενδεικτικοί:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Μεταφορά Ελλάδα → Κύπρος: 3-7 εργάσιμες ημέρες</li>
              <li>Οι χρόνοι εξαρτώνται από τη Box Now και εξωτερικούς παράγοντες</li>
              <li>Καθυστερήσεις λόγω τελωνείων, αργιών ή ανωτέρας βίας δεν αποτελούν 
                  ευθύνη μας</li>
            </ul>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="text-sm text-muted-foreground">
                Σύμφωνα με τον Κανονισμό (ΕΕ) 2018/644 για τις υπηρεσίες διασυνοριακής 
                παράδοσης δεμάτων, οι χρόνοι παράδοσης παρέχονται ως εκτίμηση και δεν 
                αποτελούν εγγύηση.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Απαγορευμένα Αντικείμενα</h2>
            <p className="text-muted-foreground mb-4">
              Απαγορεύεται η αποστολή:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Εύφλεκτων, εκρηκτικών ή επικίνδυνων υλικών</li>
              <li>Ναρκωτικών και παράνομων ουσιών</li>
              <li>Όπλων και πυρομαχικών</li>
              <li>Ζώντων ζώων ή φυτών</li>
              <li>Πορνογραφικού υλικού</li>
              <li>Χρημάτων, τραπεζογραμματίων, κοσμημάτων μεγάλης αξίας</li>
              <li>Αντικειμένων που παραβιάζουν πνευματικά δικαιώματα</li>
              <li>Οποιουδήποτε αντικειμένου απαγορεύεται από τη Box Now ή την κυπριακή/
                  ελληνική/ευρωπαϊκή νομοθεσία</li>
            </ul>
            <p className="text-muted-foreground mt-4 font-medium">
              Η ευθύνη για τη νομιμότητα του περιεχομένου ανήκει αποκλειστικά στον πελάτη.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Περιορισμοί Βάρους και Διαστάσεων</h2>
            <p className="text-muted-foreground mb-4">
              Τα δέματα πρέπει να συμμορφώνονται με τα όρια της Box Now:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Μέγιστο βάρος: Σύμφωνα με τις προδιαγραφές Box Now</li>
              <li>Μέγιστες διαστάσεις: Σύμφωνα με τα μεγέθη locker της Box Now</li>
              <li>Δέματα που υπερβαίνουν τα όρια δεν μπορούν να προωθηθούν</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Ασφάλιση</h2>
            <p className="text-muted-foreground mb-4">
              Προσφέρουμε προαιρετική ασφάλιση αποστολών:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Χωρίς ασφάλιση: Η ευθύνη μας περιορίζεται στην αξία της χρέωσης υπηρεσίας</li>
              <li>Με ασφάλιση: Κάλυψη έως τη δηλωμένη αξία (σύμφωνα με τους όρους ασφάλισης)</li>
              <li>Η ασφάλιση επιλέγεται κατά τη δημιουργία αποστολής</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Σημείωση: Η ασφάλιση δεν καλύπτει περιεχόμενο που δεν δηλώθηκε ή 
              παραβιάζει τους όρους χρήσης.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Απώλεια ή Ζημιά</h2>
            <p className="text-muted-foreground mb-4">
              Σύμφωνα με το Κυπριακό δίκαιο και τον περί Πώλησης Αγαθών Νόμο (Κεφ. 267):
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Καταγράφουμε την εξωτερική κατάσταση δεμάτων κατά την παραλαβή</li>
              <li>Δεν γνωρίζουμε ούτε επαληθεύουμε το περιεχόμενο</li>
              <li>Αξιώσεις για ζημιά πρέπει να υποβάλλονται εντός 7 ημερών από την παραλαβή</li>
              <li>Απαιτείται φωτογραφική τεκμηρίωση</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Τελωνειακές Διαδικασίες</h2>
            <p className="text-muted-foreground mb-4">
              Για αποστολές εντός ΕΕ (Ελλάδα → Κύπρος):
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Δεν απαιτούνται τελωνειακές διατυπώσεις για προϊόντα ΕΕ</li>
              <li>Προϊόντα τρίτων χωρών ενδέχεται να υπόκεινται σε δασμούς</li>
              <li>Ο πελάτης είναι υπεύθυνος για τυχόν δασμούς ή φόρους</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Ακύρωση και Επιστροφή Χρημάτων</h2>
            <p className="text-muted-foreground mb-4">
              Σύμφωνα με την Οδηγία 2011/83/ΕΕ για τα δικαιώματα των καταναλωτών:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Ακύρωση πριν την παραλαβή δεμάτων: Πλήρης επιστροφή</li>
              <li>Ακύρωση μετά την παραλαβή αλλά πριν την προώθηση: Χρέωση χειρισμού</li>
              <li>Μετά την προώθηση: Δεν είναι δυνατή η ακύρωση</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Παραλαβή από Locker</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Λαμβάνετε ειδοποίηση όταν το δέμα φτάσει στο locker</li>
              <li>Έχετε περιορισμένο χρόνο για παραλαβή (σύμφωνα με τους όρους Box Now)</li>
              <li>Μετά την παρέλευση του χρόνου, το δέμα επιστρέφεται</li>
              <li>Χρεώσεις επιστροφής βαρύνουν τον πελάτη</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">11. Επικοινωνία</h2>
            <p className="text-muted-foreground">
              Για ερωτήσεις σχετικά με την Πολιτική Αποστολών:
            </p>
            <ul className="list-none mt-4 text-muted-foreground space-y-1">
              <li><strong>Email:</strong> {COMPANY_INFO.email}</li>
              <li><strong>Τηλέφωνο:</strong> {COMPANY_INFO.phone}</li>
              <li><strong>Διεύθυνση:</strong> {COMPANY_INFO.address}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">12. Εφαρμοστέο Δίκαιο</h2>
            <p className="text-muted-foreground">
              Η παρούσα Πολιτική Αποστολών διέπεται από το δίκαιο της Κυπριακής Δημοκρατίας. 
              Αποκλειστικά αρμόδια για την επίλυση διαφορών είναι τα δικαστήρια της 
              Κυπριακής Δημοκρατίας.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicyPage;
