"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export function CtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const benefits = ["14-day free trial", "No credit card required", "Cancel anytime", "Full feature access"]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div
        ref={ref}
        className={cn(
          "container px-4 md:px-6 relative z-10 transition-all duration-1000",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Ready to Transform Your Customer Support?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of businesses using ChatWise to provide exceptional customer experiences with AI.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Request a Demo
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden md:block bg-gradient-to-br from-blue-500 to-indigo-600 p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">What Our Customers Say</h3>
                <blockquote className="text-lg italic mb-6">
                  "ChatWise has completely transformed how we handle customer support. Our response times are down 70%
                  and customer satisfaction is up 45%."
                </blockquote>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm opacity-80">Customer Support Manager, TechFlow Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

