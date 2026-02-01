import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingFeatures = [
  'Κόστος αποστολής Box Now (pass-through)',
  'Χρέωση ενοποίησης & χειρισμού',
  'Υλικά συσκευασίας (bubble wrap)',
  'Προαιρετική ασφάλεια',
];

export function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Φιλοσοφία Τιμολόγησης
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Διαφανής χρέωση χωρίς κρυφές χρεώσεις
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Πληρώνετε μόνο ό,τι χρησιμοποιείτε</h3>
                <p className="text-muted-foreground">
                  Χωρίς συνδρομές. Χωρίς κρυφές χρεώσεις.
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="w-full" asChild>
                <Link to="/new-shipment">Ζητήστε Τιμή / Ανοίξτε Αποστολή</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Math Logic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center"
        >
          <div className="p-6 bg-card rounded-lg border">
            <div className="text-3xl font-bold text-primary mb-2">€5+</div>
            <p className="text-sm text-muted-foreground">
              Αποφύγετε €5+ αποστολή ανά αντικείμενο
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg border">
            <div className="text-3xl font-bold text-primary mb-2">1x</div>
            <p className="text-sm text-muted-foreground">
              Στείλτε πολλές παραγγελίες μαζί
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg border">
            <div className="text-3xl font-bold text-primary mb-2">Skroutz</div>
            <p className="text-sm text-muted-foreground">
              Ιδανικό για Skroutz και Ελληνικά e-shops
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Πολλοί πελάτες χρησιμοποιούν Skroutz ή Skroutz Plus για μειωμένη εγχώρια αποστολή στην Ελλάδα, 
          και μετά ενοποιούν αποστολές προς Κύπρο.
        </motion.p>
      </div>
    </section>
  );
}
