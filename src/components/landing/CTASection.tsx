import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Έτοιμοι να ξεκινήσετε;
          </h2>
          <p className="text-muted-foreground mb-8">
            Σχεδιασμένο για απλότητα, διαφάνεια και ελεγχόμενο χειρισμό.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/new-shipment">
                Ξεκινήστε την Αποστολή σας
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">
                Λάβετε τη Διεύθυνσή σας
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
