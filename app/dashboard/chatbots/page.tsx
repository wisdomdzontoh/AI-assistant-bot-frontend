import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChatbotCard } from "../../components/dashboard/chatbot-card"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Chatbots - ChatWise",
  description: "Manage your AI chatbots",
}

// Mock data for chatbots
const chatbots = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles common customer inquiries and support requests",
    status: "active" as const,
    conversations: 532,
    lastUpdated: "2 days ago",
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Helps with product information and sales inquiries",
    status: "active" as const,
    conversations: 328,
    lastUpdated: "5 days ago",
  },
  {
    id: "3",
    name: "Onboarding Guide",
    description: "Assists new users with getting started",
    status: "inactive" as const,
    conversations: 124,
    lastUpdated: "2 weeks ago",
  },
  {
    id: "4",
    name: "FAQ Bot",
    description: "Answers frequently asked questions",
    status: "training" as const,
    conversations: 0,
    lastUpdated: "Just now",
  },
]

export default function ChatbotsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chatbots</h1>
          <p className="text-muted-foreground">Create and manage your AI assistants</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/chatbots/new">
            <Plus className="mr-2 h-4 w-4" />
            New Chatbot
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chatbots.map((chatbot) => (
          <ChatbotCard
            key={chatbot.id}
            id={chatbot.id}
            name={chatbot.name}
            description={chatbot.description}
            status={chatbot.status}
            conversations={chatbot.conversations}
            lastUpdated={chatbot.lastUpdated}
          />
        ))}
      </div>
    </div>
  )
}

