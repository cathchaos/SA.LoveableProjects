import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, ArrowRight, MapPin, Box, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Package className="w-4 h-4" />
              Ελλάδα → Κύπρος
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Πολλά δέματα.{' '}
            <span className="text-primary">Μία αποστολή.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Παραλάβετε τα δέματά σας στην Ελλάδα, ενοποιήστε τα σε μία αποστολή Box Now, 
            και προωθήστε τα στην Κύπρο — απλά και διαφανώς.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild>
              <Link to="/new-shipment">
                Ξεκινήστε Αποστολή
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">Πώς Λειτουργεί</a>
            </Button>
          </motion.div>
        </div>

        {/* Visual Elements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center gap-8 md:gap-16"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Ελλάδα</span>
          </div>
          <div className="flex items-center">
            <div className="w-24 md:w-32 h-px bg-border relative">
              <Truck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-accent bg-background px-1" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-3">
              <Box className="w-8 h-8 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Κύπρος</span>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
