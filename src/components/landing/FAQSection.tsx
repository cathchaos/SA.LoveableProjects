import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Ανοίγετε τα δέματά μου;',
    answer: 'Όχι. Τα δέματα παραμένουν σφραγισμένα ανά πάσα στιγμή. Δεν ανοίγουμε, δεν επιθεωρούμε και δεν επαληθεύουμε το περιεχόμενο κανενός δέματος.',
  },
  {
    question: 'Μπορείτε να ελέγξετε τι περιέχει;',
    answer: 'Όχι. Δεν έχουμε τη δυνατότητα ούτε την εξουσιοδότηση να επιθεωρήσουμε το περιεχόμενο των δεμάτων. Η ευθύνη για το περιεχόμενο ανήκει αποκλειστικά στον πελάτη.',
  },
  {
    question: 'Πόσο καιρό μπορούν να μείνουν τα δέματα;',
    answer: 'Τα δέματα μπορούν να παραμείνουν για περιορισμένο χρονικό διάστημα μόνο. Για ακριβείς λεπτομέρειες, επικοινωνήστε μαζί μας ή δείτε τους όρους χρήσης.',
  },
  {
    question: 'Τι γίνεται αν το αντικείμενό μου είναι κατεστραμμένο;',
    answer: 'Η ευθύνη μας είναι αυστηρά περιορισμένη σύμφωνα με τους όρους χρήσης. Προτείνουμε την επιλογή προαιρετικής ασφάλειας για επιπλέον προστασία.',
  },
  {
    question: 'Μπορώ να στείλω μπαταρίες/υγρά;',
    answer: 'Η ευθύνη για τη νομιμότητα και την ασφάλεια του περιεχομένου ανήκει αποκλειστικά στον πελάτη. Συμβουλευτείτε τους κανονισμούς της Box Now και τις ισχύουσες νομοθεσίες.',
  },
  {
    question: 'Πώς λειτουργεί η παρακολούθηση;',
    answer: 'Μετά τη δημιουργία αποστολής, λαμβάνετε έναν κωδικό παρακολούθησης. Μπορείτε να δείτε την κατάσταση της αποστολής σας ανά πάσα στιγμή μέσα από τον λογαριασμό σας.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="section-padding bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Συχνές Ερωτήσεις
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Απαντήσεις σε συχνές ερωτήσεις
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
