import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const weDo = [
  'Παραλαμβάνουμε σφραγισμένα δέματα',
  'Προωθούμε δέματα κατ\' εντολή πελάτη',
  'Ενοποιούμε σε τυπικά μεγέθη Box Now',
  'Παρέχουμε πληροφορίες παρακολούθησης',
];

const weDont = [
  'Δεν ανοίγουμε δέματα',
  'Δεν επιθεωρούμε περιεχόμενα',
  'Δεν επαληθεύουμε νομιμότητα ή αξία',
  'Δεν αποθηκεύουμε δέματα μακροπρόθεσμα',
  'Δεν ενεργούμε ως πωλητής ή μεταφορέας',
];

export function WhatWeDoSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Τι Κάνουμε / Τι Δεν Κάνουμε
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Διαφάνεια στις υπηρεσίες μας
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Τι Κάνουμε
                </h3>
                <ul className="space-y-3">
                  {weDo.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-destructive flex items-center gap-2">
                  <X className="w-5 h-5" />
                  Τι Δεν Κάνουμε
                </h3>
                <ul className="space-y-3">
                  {weDont.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
