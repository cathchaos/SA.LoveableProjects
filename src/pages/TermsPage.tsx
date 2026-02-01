import { Layout } from '@/components/layout/Layout';
import { COMPANY_INFO } from '@/lib/constants';

const TermsPage = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold mb-2">Όροι Χρήσης</h1>
          <p className="text-muted-foreground mb-8">
            Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR')}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Εισαγωγή</h2>
            <p className="text-muted-foreground mb-4">
              Οι παρόντες Όροι Χρήσης («Όροι») διέπουν τη χρήση των υπηρεσιών της {COMPANY_INFO.name}
              («Εταιρεία», «εμείς», «μας»), εταιρείας εγγεγραμμένης στην Κυπριακή Δημοκρατία.
              Χρησιμοποιώντας τις υπηρεσίες μας, συμφωνείτε με τους παρόντες Όρους.
            </p>
            <p className="text-muted-foreground">
              Οι παρόντες Όροι διέπονται από το δίκαιο της Κυπριακής Δημοκρατίας και τους
              κανονισμούς της Ευρωπαϊκής Ένωσης.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Περιγραφή Υπηρεσιών</h2>
            <p className="text-muted-foreground mb-4">
              Η Εταιρεία παρέχει υπηρεσίες ενδιάμεσου προώθησης δεμάτων («Υπηρεσίες»).
              Συγκεκριμένα:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Παραλαμβάνουμε σφραγισμένα δέματα σε διεύθυνση στην Ελλάδα</li>
              <li>Αποθηκεύουμε προσωρινά τα δέματα</li>
              <li>Ενοποιούμε δέματα κατ' εντολή του πελάτη</li>
              <li>Προωθούμε τα δέματα μέσω Box Now στην Κύπρο</li>
            </ul>
            <p className="text-muted-foreground mt-4 font-medium">
              Ρητά διευκρινίζεται ότι η Εταιρεία ΔΕΝ:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Ανοίγει ή επιθεωρεί τα δέματα</li>
              <li>Επαληθεύει το περιεχόμενο, την αξία ή τη νομιμότητα</li>
              <li>Λειτουργεί ως μεταφορική εταιρεία ή courier</li>
              <li>Παρέχει υπηρεσίες μακροπρόθεσμης αποθήκευσης</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Υποχρεώσεις Πελάτη</h2>
            <p className="text-muted-foreground mb-4">Ο πελάτης υποχρεούται να:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Παρέχει ακριβείς και αληθείς πληροφορίες</li>
              <li>Διασφαλίζει ότι το περιεχόμενο των δεμάτων είναι νόμιμο σύμφωνα με το
                  Κυπριακό, Ελληνικό και Ευρωπαϊκό δίκαιο</li>
              <li>Μην αποστέλλει απαγορευμένα, επικίνδυνα ή παράνομα αντικείμενα</li>
              <li>Συμμορφώνεται με τους κανονισμούς της Box Now</li>
              <li>Παραλαμβάνει τα δέματά του εντός του καθορισμένου χρονικού διαστήματος</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Περιορισμός Ευθύνης</h2>
            <p className="text-muted-foreground mb-4">
              Σύμφωνα με τον περί Ελαττωματικών Προϊόντων (Αστική Ευθύνη) Νόμο του 1995
              (Ν.105(Ι)/1995) και τον περί Προστασίας του Καταναλωτή Νόμο του 2021:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Η ευθύνη της Εταιρείας περιορίζεται στην αξία της χρέωσης υπηρεσίας</li>
              <li>Δεν φέρουμε ευθύνη για απώλεια ή ζημιά περιεχομένου εκτός αν επιλεγεί
                  προαιρετική ασφάλεια</li>
              <li>Δεν φέρουμε ευθύνη για καθυστερήσεις που οφείλονται σε τρίτους (Box Now,
                  τελωνεία, μεταφορείς)</li>
              <li>Δεν φέρουμε ευθύνη για το περιεχόμενο των δεμάτων</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Τιμολόγηση και Πληρωμές</h2>
            <p className="text-muted-foreground mb-4">
              Σύμφωνα με τον περί Φόρου Προστιθέμενης Αξίας Νόμο (Ν.95(Ι)/2000):
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Οι τιμές περιλαμβάνουν ΦΠΑ όπου εφαρμόζεται (19% στην Κύπρο)</li>
              <li>Η χρέωση γίνεται ανά αποστολή</li>
              <li>Πληρωμή απαιτείται πριν την προώθηση</li>
              <li>Δεν υπάρχουν κρυφές χρεώσεις ή συνδρομές</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Αποθήκευση Δεμάτων</h2>
            <p className="text-muted-foreground mb-4">
              Τα δέματα αποθηκεύονται προσωρινά για περιορισμένο χρονικό διάστημα. Μετά την
              παρέλευση του χρόνου αποθήκευσης, η Εταιρεία δικαιούται να:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Επιβάλει επιπλέον χρεώσεις αποθήκευσης</li>
              <li>Επιστρέψει τα δέματα στον αποστολέα</li>
              <li>Διαθέσει τα δέματα σύμφωνα με την ισχύουσα νομοθεσία</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Δικαιώματα Καταναλωτή</h2>
            <p className="text-muted-foreground mb-4">
              Σύμφωνα με τον περί Προστασίας του Καταναλωτή Νόμο του 2021 και τον Κανονισμό
              (ΕΕ) 2017/2394:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Έχετε δικαίωμα πλήρους ενημέρωσης για τις υπηρεσίες</li>
              <li>Έχετε δικαίωμα υποβολής παραπόνου στην Υπηρεσία Προστασίας Καταναλωτή</li>
              <li>Έχετε δικαίωμα προσφυγής στο Επαρχιακό Δικαστήριο της Κύπρου</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Τροποποίηση Όρων</h2>
            <p className="text-muted-foreground">
              Διατηρούμε το δικαίωμα τροποποίησης των παρόντων Όρων. Οι αλλαγές θα
              κοινοποιούνται μέσω της ιστοσελίδας μας και θα ισχύουν από την ημερομηνία
              δημοσίευσής τους.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Εφαρμοστέο Δίκαιο</h2>
            <p className="text-muted-foreground">
              Οι παρόντες Όροι διέπονται από το δίκαιο της Κυπριακής Δημοκρατίας.
              Αποκλειστικά αρμόδια για την επίλυση οποιασδήποτε διαφοράς είναι τα
              δικαστήρια της Κυπριακής Δημοκρατίας.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Επικοινωνία</h2>
            <p className="text-muted-foreground">
              Για ερωτήσεις σχετικά με τους παρόντες Όρους, επικοινωνήστε μαζί μας:
            </p>
            <ul className="list-none mt-4 text-muted-foreground space-y-1">
              <li><strong>Email:</strong> {COMPANY_INFO.email}</li>
              <li><strong>Τηλέφωνο:</strong> {COMPANY_INFO.phone}</li>
              <li><strong>Διεύθυνση:</strong> {COMPANY_INFO.address}</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
