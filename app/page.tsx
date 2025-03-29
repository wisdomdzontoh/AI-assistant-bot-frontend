import { SiteHeader } from "@/app/components/site-header"
import { HeroSection } from "@/app/components/hero-section"
import { StatsSection } from "@/app/components/stats-section"
import { FeaturesSection } from "@/app/components/features-section"
import { HowItWorksSection } from "@/app/components/how-it-works-section"
import { DemoSection } from "@/app/components/demo-section"
import { PricingSection } from "@/app/components/pricing-section"
import { TestimonialsSection } from "@/app/components/testimonials-section"
import { FaqSection } from "@/app/components/faq-section"
import { CtaSection } from "@/app/components/cta-section"
import { SiteFooter } from "@/app/components/site-footer"
import { Toaster } from "sonner"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
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

