"use client"

import type React from "react"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { FileUp, Cpu, MessageSquare, Settings } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <FileUp className="h-10 w-10" />,
      title: "Upload Your Content",
      description: "Start by uploading your documents, FAQs, or connecting your website for the AI to learn from.",
    },
    {
      icon: <Cpu className="h-10 w-10" />,
      title: "AI Training",
      description: "Our system processes your content and trains the AI to understand your business context.",
    },
    {
      icon: <Settings className="h-10 w-10" />,
      title: "Customize & Configure",
      description: "Personalize your chatbot's appearance, tone, and behavior to match your brand.",
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: "Deploy & Engage",
      description: "Add the chatbot to your website and start providing 24/7 AI-powered customer support.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_40%,rgba(56,189,248,0.05)_70%)]" />

      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get up and running with ChatWise in just a few simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500 hidden md:block"></div>

          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => (
              <Step
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={index + 1}
                isEven={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({
  icon,
  title,
  description,
  index,
  isEven,
}: {
  icon: React.ReactNode
  title: string
  description: string
  index: number
  isEven: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className={cn(
        "md:grid md:grid-cols-5 md:gap-8 items-center relative",
        isInView ? "opacity-100" : "opacity-0",
        isEven ? "md:translate-x-0" : "md:translate-x-0",
      )}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "0.5s",
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      {/* Step number for mobile */}
      <div className="flex items-center justify-center md:hidden mb-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xl">
          {index}
        </div>
      </div>

      {/* Content for even steps (right side on desktop) */}
      {isEven && (
        <>
          <div className="md:col-span-2 hidden md:flex justify-end">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-2xl">
                {index}
              </div>
            </div>
          </div>
          <div className="md:col-span-3 bg-background rounded-xl p-6 shadow-sm border">
            <div className="flex md:hidden items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <div className="text-blue-600 dark:text-blue-400">{icon}</div>
            </div>
            <div className="hidden md:block mb-4 text-blue-600">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </>
      )}

      {/* Content for odd steps (left side on desktop) */}
      {!isEven && (
        <>
          <div className="md:col-span-3 bg-background rounded-xl p-6 shadow-sm border">
            <div className="flex md:hidden items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <div className="text-blue-600 dark:text-blue-400">{icon}</div>
            </div>
            <div className="hidden md:block mb-4 text-blue-600">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="md:col-span-2 hidden md:flex">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-2xl">
                {index}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

