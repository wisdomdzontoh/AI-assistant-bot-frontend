"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChatbotCard } from "../../components/dashboard/chatbot-card"
import { Plus } from "lucide-react"
import { type Chatbot, ChatbotService } from "../../lib/api-services/chatbot-service"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { toast } from "sonner"

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        const data = await ChatbotService.getChatbots()
        setChatbots(data)
      } catch (error) {
        console.error("Failed to fetch chatbots:", error)
        toast.error("Failed to load chatbots")
      } finally {
        setLoading(false)
      }
    }

    fetchChatbots()
  }, [])

  const handleDeleteChatbot = async (chatbot: Chatbot) => {
    // This would typically show a confirmation dialog
    if (confirm(`Are you sure you want to delete ${chatbot.name}?`)) {
      try {
        // Implement delete API call
        // await ChatbotService.deleteChatbot(chatbot.id)

        // For now, just remove from state
        setChatbots(chatbots.filter((b) => b.id !== chatbot.id))
        toast.success(`${chatbot.name} has been deleted`)
      } catch (error) {
        console.error("Failed to delete chatbot:", error)
        toast.error("Failed to delete chatbot")
      }
    }
  }

  if (loading) {
    return <LoadingScreen fullScreen={false} message="Loading chatbots..." />
  }

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

      {chatbots.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No chatbots yet</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Create your first AI assistant to start helping your customers.
          </p>
          <Button asChild>
            <Link href="/dashboard/chatbots/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Chatbot
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chatbots.map((chatbot) => (
            <ChatbotCard
              key={chatbot.id}
              chatbot={chatbot}
              onDelete={handleDeleteChatbot}
              onEdit={(chatbot) => {
                // Navigate to edit page
                window.location.href = `/dashboard/chatbots/${chatbot.id}/edit`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

