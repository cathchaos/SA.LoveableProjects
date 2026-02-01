import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { WhatWeDoSection } from '@/components/landing/WhatWeDoSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { PricingCalculator } from '@/components/landing/PricingCalculator';
import { ResponsibilityNotice } from '@/components/landing/ResponsibilityNotice';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <WhatWeDoSection />
      <PricingSection />
      <PricingCalculator />
      <ResponsibilityNotice />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
