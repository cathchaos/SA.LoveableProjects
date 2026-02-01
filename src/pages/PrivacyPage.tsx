import { Layout } from '@/components/layout/Layout';
import { COMPANY_INFO } from '@/lib/constants';

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold mb-2">Πολιτική Απορρήτου</h1>
          <p className="text-muted-foreground mb-8">
            Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR')}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Εισαγωγή</h2>
            <p className="text-muted-foreground mb-4">
              Η {COMPANY_INFO.name} («Εταιρεία», «εμείς», «μας») δεσμεύεται για την προστασία 
              των προσωπικών σας δεδομένων. Η παρούσα Πολιτική Απορρήτου εξηγεί πώς 
              συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα δεδομένα σας.
            </p>
            <p className="text-muted-foreground">
              Η επεξεργασία δεδομένων διενεργείται σύμφωνα με τον Γενικό Κανονισμό 
              Προστασίας Δεδομένων (GDPR - Κανονισμός ΕΕ 2016/679) και τον περί της 
              Προστασίας των Φυσικών Προσώπων Έναντι της Επεξεργασίας των Δεδομένων 
              Προσωπικού Χαρακτήρα και της Ελεύθερης Κυκλοφορίας των Δεδομένων αυτών 
              Νόμο του 2018 (Ν.125(Ι)/2018).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Υπεύθυνος Επεξεργασίας</h2>
            <p className="text-muted-foreground">
              Υπεύθυνος επεξεργασίας των προσωπικών σας δεδομένων είναι η {COMPANY_INFO.name}, 
              με έδρα: {COMPANY_INFO.address}.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Δεδομένα που Συλλέγουμε</h2>
            <p className="text-muted-foreground mb-4">Συλλέγουμε τα ακόλουθα δεδομένα:</p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">3.1 Δεδομένα Εγγραφής</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Ονοματεπώνυμο</li>
              <li>Διεύθυνση ηλεκτρονικού ταχυδρομείου</li>
              <li>Τηλέφωνο επικοινωνίας</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">3.2 Δεδομένα Αποστολών</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Διεύθυνση παραλαβής locker</li>
              <li>Ιστορικό αποστολών</li>
              <li>Κωδικοί παρακολούθησης</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">3.3 Τεχνικά Δεδομένα</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Διεύθυνση IP</li>
              <li>Τύπος προγράμματος περιήγησης</li>
              <li>Cookies (βλ. ενότητα 8)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Νομική Βάση Επεξεργασίας</h2>
            <p className="text-muted-foreground mb-4">
              Η επεξεργασία των δεδομένων σας βασίζεται σε:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Εκτέλεση σύμβασης (Άρθρο 6(1)(β) GDPR):</strong> Για την παροχή 
                  των υπηρεσιών μας</li>
              <li><strong>Έννομο συμφέρον (Άρθρο 6(1)(στ) GDPR):</strong> Για τη βελτίωση 
                  των υπηρεσιών μας</li>
              <li><strong>Νομική υποχρέωση (Άρθρο 6(1)(γ) GDPR):</strong> Για συμμόρφωση 
                  με φορολογικές και άλλες υποχρεώσεις</li>
              <li><strong>Συγκατάθεση (Άρθρο 6(1)(α) GDPR):</strong> Για marketing 
                  επικοινωνίες (όπου ισχύει)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Σκοποί Επεξεργασίας</h2>
            <p className="text-muted-foreground mb-4">Χρησιμοποιούμε τα δεδομένα σας για:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Παροχή υπηρεσιών προώθησης δεμάτων</li>
              <li>Επικοινωνία σχετικά με τις αποστολές σας</li>
              <li>Εκπλήρωση νομικών υποχρεώσεων</li>
              <li>Βελτίωση της ιστοσελίδας και των υπηρεσιών μας</li>
              <li>Αποστολή ενημερωτικών email (με τη συγκατάθεσή σας)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Διαβίβαση Δεδομένων</h2>
            <p className="text-muted-foreground mb-4">
              Τα δεδομένα σας ενδέχεται να διαβιβαστούν σε:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Box Now:</strong> Για την εκτέλεση των αποστολών</li>
              <li><strong>Πάροχοι υπηρεσιών:</strong> Φιλοξενία δεδομένων, επεξεργασία 
                  πληρωμών</li>
              <li><strong>Αρχές:</strong> Όταν απαιτείται από το νόμο</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Διασφαλίζουμε ότι όλοι οι αποδέκτες παρέχουν επαρκές επίπεδο προστασίας 
              δεδομένων σύμφωνα με το GDPR.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Διατήρηση Δεδομένων</h2>
            <p className="text-muted-foreground">
              Διατηρούμε τα δεδομένα σας για όσο διάστημα απαιτείται για την εκπλήρωση 
              των σκοπών επεξεργασίας και σύμφωνα με τις νομικές υποχρεώσεις μας 
              (συνήθως 6 έτη για φορολογικούς σκοπούς σύμφωνα με τον περί Φορολογίας 
              του Εισοδήματος Νόμο).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Χρησιμοποιούμε cookies για:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Απαραίτητα cookies:</strong> Για τη λειτουργία της ιστοσελίδας</li>
              <li><strong>Cookies επιδόσεων:</strong> Για ανάλυση χρήσης</li>
              <li><strong>Cookies λειτουργικότητας:</strong> Για αποθήκευση προτιμήσεων</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Μπορείτε να διαχειριστείτε τα cookies μέσω των ρυθμίσεων του προγράμματος 
              περιήγησής σας.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Τα Δικαιώματά σας</h2>
            <p className="text-muted-foreground mb-4">
              Σύμφωνα με το GDPR, έχετε τα ακόλουθα δικαιώματα:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Δικαίωμα πρόσβασης:</strong> Να ζητήσετε αντίγραφο των δεδομένων σας</li>
              <li><strong>Δικαίωμα διόρθωσης:</strong> Να διορθώσετε ανακριβή δεδομένα</li>
              <li><strong>Δικαίωμα διαγραφής:</strong> Να ζητήσετε διαγραφή των δεδομένων σας</li>
              <li><strong>Δικαίωμα περιορισμού:</strong> Να περιορίσετε την επεξεργασία</li>
              <li><strong>Δικαίωμα φορητότητας:</strong> Να λάβετε τα δεδομένα σας σε 
                  μηχαναγνώσιμη μορφή</li>
              <li><strong>Δικαίωμα εναντίωσης:</strong> Να αντιταχθείτε στην επεξεργασία</li>
              <li><strong>Δικαίωμα ανάκλησης συγκατάθεσης:</strong> Ανά πάσα στιγμή</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Για άσκηση των δικαιωμάτων σας, επικοινωνήστε μαζί μας στο {COMPANY_INFO.email}.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Καταγγελία</h2>
            <p className="text-muted-foreground">
              Έχετε δικαίωμα υποβολής καταγγελίας στο Γραφείο Επιτρόπου Προστασίας 
              Δεδομένων Προσωπικού Χαρακτήρα της Κύπρου:
            </p>
            <ul className="list-none mt-4 text-muted-foreground space-y-1">
              <li><strong>Ιστοσελίδα:</strong> www.dataprotection.gov.cy</li>
              <li><strong>Email:</strong> commissioner@dataprotection.gov.cy</li>
              <li><strong>Τηλέφωνο:</strong> +357 22 818 456</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">11. Ασφάλεια Δεδομένων</h2>
            <p className="text-muted-foreground">
              Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία 
              των δεδομένων σας, συμπεριλαμβανομένης της κρυπτογράφησης, του ελέγχου 
              πρόσβασης και της τακτικής αξιολόγησης ασφάλειας.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">12. Επικοινωνία</h2>
            <p className="text-muted-foreground">
              Για ερωτήσεις σχετικά με την Πολιτική Απορρήτου:
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

export default PrivacyPage;
