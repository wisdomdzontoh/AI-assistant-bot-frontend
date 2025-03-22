import { SiteHeader } from "./components/site-header"
import { HeroSection } from "./components/hero-section"
import { FeaturesSection } from "./components/features-section"
import { DemoSection } from "./components/demo-section"
import { PricingSection } from "./components/pricing-section"
import { TestimonialsSection } from "./components/testimonials-section"
import { FaqSection } from "./components/faq-section"
import { CtaSection } from "./components/cta-section"
import { SiteFooter } from "./components/site-footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}

