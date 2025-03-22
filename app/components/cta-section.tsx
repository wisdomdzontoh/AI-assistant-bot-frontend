import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Customer Support?</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Join thousands of businesses using ChatWise to provide exceptional customer experiences with AI.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Free Trial
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
              Request a Demo
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm opacity-80">No credit card required • 14-day free trial • Cancel anytime</p>
      </div>
    </section>
  )
}

