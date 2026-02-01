import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export function ResponsibilityNotice() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-muted rounded-xl p-8 border"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">ΣΗΜΑΝΤΙΚΗ ΕΙΔΟΠΟΙΗΣΗ</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 mt-2 shrink-0" />
                  <span>Τα δέματα παραμένουν σφραγισμένα ανά πάσα στιγμή</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 mt-2 shrink-0" />
                  <span>Το περιεχόμενο είναι αποκλειστική ευθύνη του πελάτη</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 mt-2 shrink-0" />
                  <span>Η ευθύνη είναι αυστηρά περιορισμένη εκτός αν επιλεγεί προαιρετική ασφάλεια</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 mt-2 shrink-0" />
                  <span>Ενεργούμε ως ενδιάμεσος προώθησης, όχι ως μεταφορέας</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
