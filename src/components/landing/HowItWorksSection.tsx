import { motion } from 'framer-motion';
import { MapPin, Package, Clock, Truck, Box } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    title: 'Λάβετε τη διεύθυνσή σας',
    description: 'Αποκτήστε μια προσωπική διεύθυνση παραλαβής στην Ελλάδα.',
  },
  {
    icon: Package,
    title: 'Παραγγείλετε από Ελληνικά καταστήματα',
    description: 'Στείλτε τα δέματά σας στη διεύθυνσή σας στην Ελλάδα.',
  },
  {
    icon: Clock,
    title: 'Παραλαμβάνουμε τα σφραγισμένα δέματα',
    description: 'Τα δέματα καταγράφονται και αποθηκεύονται προσωρινά χωρίς άνοιγμα ή επιθεώρηση.',
  },
  {
    icon: Box,
    title: 'Επιλέξτε πότε θα στείλετε',
    description: 'Στείλτε αμέσως ή ενοποιήστε μέχρι να γεμίσει το κουτί σας.',
  },
  {
    icon: Truck,
    title: 'Μία αποστολή Box Now',
    description: 'Τα δέματά σας προωθούνται locker-to-locker μεταξύ Ελλάδας και Κύπρου.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Πώς Λειτουργεί
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Απλή διαδικασία 5 βημάτων για να φέρετε τα δέματά σας στην Κύπρο
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 mb-8 last:mb-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <step.icon className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground"
        >
          Ενεργούμε αποκλειστικά ως ενδιάμεσος προώθησης και δεν επιθεωρούμε ή επαληθεύουμε το περιεχόμενο των δεμάτων.
        </motion.div>
      </div>
    </section>
  );
}
