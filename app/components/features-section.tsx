"use client"

import type React from "react"

import { useRef } from "react"
import { useInView } from "framer-motion"
import {
  Globe,
  FileText,
  MessageSquare,
  UserCircle,
  LifeBuoy,
  BarChart,
  ThumbsUp,
  Users,
  Webhook,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function FeaturesSection() {
  const features = [
    {
      icon: <Globe className="h-10 w-10 text-blue-500" />,
      title: "Multi-language Support",
      description: "Auto-detect user language and translate responses in real-time to support global customers.",
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-500" />,
      title: "Train from Multiple Sources",
      description: "Upload PDFs, crawl websites, or import from Notion to build your knowledge base.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
      title: "Document-Aware Chat",
      description: "AI references your specific documents to provide accurate, contextual responses.",
    },
    {
      icon: <UserCircle className="h-10 w-10 text-blue-500" />,
      title: "Custom Persona Builder",
      description: "Customize your bot's tone and style to match your brand's personality.",
    },
    {
      icon: <LifeBuoy className="h-10 w-10 text-blue-500" />,
      title: "Smart Fallback System",
      description: "Offer ticket creation or human handoff when AI can't provide a satisfactory answer.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-blue-500" />,
      title: "Conversation Insights",
      description: "Analyze common topics and tag conversations to identify trends and issues.",
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-blue-500" />,
      title: "User Feedback System",
      description: "Collect thumbs up/down feedback to continuously improve your AI responses.",
    },
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: "Team Collaboration",
      description: "Add multiple team members with different roles and permissions.",
    },
    {
      icon: <Webhook className="h-10 w-10 text-blue-500" />,
      title: "Webhooks & API Access",
      description: "Integrate with your existing tools and systems via webhooks and API.",
    },
    {
      icon: <Mail className="h-10 w-10 text-blue-500" />,
      title: "Email Summaries",
      description: "Receive daily or weekly reports of conversations, issues, and insights.",
    },
  ]

  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features for Modern Support</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to provide exceptional customer support with the power of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Calculate delay based on index (0.1s between each card)
  const delay = `${index * 0.1}s`

  return (
    <div
      ref={ref}
      className={cn(
        "bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300 group",
        "hover:border-blue-500/50 hover:-translate-y-1",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
      style={{ transitionDelay: delay }}
    >
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

