import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingDown, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export function PricingCalculator() {
  const [parcelCount, setParcelCount] = useState(3);
  const [avgWeight, setAvgWeight] = useState(2); // kg

  // Hypothetical costs
  const separateShippingCost = parcelCount * 15; // €15 per parcel if sent separately to Cyprus
  const boxNowConsolidatedCost = 5 + (parcelCount * 2) + 10; // €5 activation + €2 per parcel handling + €10 Box Now L to Cyprus

  const savings = separateShippingCost - boxNowConsolidatedCost;
  const savingsPercent = Math.round((savings / separateShippingCost) * 100);

  return (
    <section className="py-12 bg-primary/5 rounded-3xl my-16 overflow-hidden relative">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">
              <Calculator className="w-3 h-3" />
              Υπολογιστής Κέρδους
            </div>
            <h2 className="text-3xl font-bold mb-6">Δείτε πόσα <span className="text-primary">εξοικονομείτε</span></h2>
            <p className="text-muted-foreground mb-8">
              Όσο περισσότερα δέματα ενοποιείτε, τόσο μεγαλύτερο το κέρδος σας.
              Αποφύγετε τις πολλαπλές χρεώσεις αποστολής προς Κύπρο.
            </p>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Αριθμός Δεμάτων</Label>
                  <span className="font-bold text-primary">{parcelCount}</span>
                </div>
                <Slider
                  value={[parcelCount]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(v) => setParcelCount(v[0])}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Μέσο Βάρος ανά Δέμα (kg)</Label>
                  <span className="font-bold text-primary">{avgWeight} kg</span>
                </div>
                <Slider
                  value={[avgWeight]}
                  min={0.5}
                  max={10}
                  step={0.5}
                  onValueChange={(v) => setAvgWeight(v[0])}
                />
              </div>
            </div>
          </div>

          <motion.div
            key={`${parcelCount}-${avgWeight}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-primary/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <TrendingDown className="text-green-500 w-8 h-8 opacity-20" />
              </div>
              <CardHeader>
                <CardTitle className="text-center">Εκτίμηση Εξοικονόμησης</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm">Μεμονωμένες Αποστολές</span>
                  <span className="font-bold line-through text-muted-foreground">€{separateShippingCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-sm font-medium">Με Packeto Mou</span>
                  <span className="text-2xl font-bold text-primary">€{boxNowConsolidatedCost.toFixed(2)}</span>
                </div>

                <div className="text-center pt-4">
                  <div className="text-4xl font-black text-green-500 mb-1">
                    €{savings.toFixed(2)}
                  </div>
                  <p className="text-sm font-medium text-green-600">
                    Κερδίζετε {savingsPercent}% στα έξοδα αποστολής!
                  </p>
                </div>

                <div className="flex items-start gap-2 text-[10px] text-muted-foreground bg-muted/50 p-2 rounded">
                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <p>
                    Οι τιμές είναι ενδεικτικές και βασίζονται σε μέσους όρους αγοράς.
                    Το τελικό κόστος εξαρτάται από τις διαστάσεις του τελικού κιβωτίου Box Now.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
