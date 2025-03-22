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
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Support</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to provide exceptional customer support with the power of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

