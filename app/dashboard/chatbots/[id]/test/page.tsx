"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "../../../../components/chat/chat-interface"
import { type Chatbot, ChatbotService } from "../../../../lib/api-services/chatbot-service"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TestChatbotPage() {
  const params = useParams()
  const router = useRouter()
  const [chatbot, setChatbot] = useState<Chatbot | null>(null)
  const [loading, setLoading] = useState(true)

  const chatbotId = Number(params.id)

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        // In a real app, you'd have an endpoint to get a single chatbot
        const chatbots = await ChatbotService.getChatbots()
        const foundChatbot = chatbots.find((bot) => bot.id === chatbotId)

        if (foundChatbot) {
          setChatbot(foundChatbot)
        } else {
          toast.error("Chatbot not found")
          router.push("/dashboard/chatbots")
        }
      } catch (error) {
        console.error("Failed to fetch chatbot:", error)
        toast.error("Failed to load chatbot")
      } finally {
        setLoading(false)
      }
    }

    if (chatbotId) {
      fetchChatbot()
    }
  }, [chatbotId, router])

  if (loading) {
    return <LoadingScreen fullScreen={false} message="Loading chatbot..." />
  }

  if (!chatbot) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/dashboard/chatbots">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chatbots
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Test Chatbot: {chatbot.name}</h1>
      </div>

      <p className="text-muted-foreground">
        This is a test interface for your chatbot. You can use it to see how your chatbot responds to different
        messages.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Chatbot Details</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium">Name</dt>
              <dd className="text-muted-foreground">{chatbot.name}</dd>
            </div>
            <div>
              <dt className="font-medium">Description</dt>
              <dd className="text-muted-foreground">{chatbot.description || "No description provided"}</dd>
            </div>
            <div>
              <dt className="font-medium">Status</dt>
              <dd className="text-muted-foreground">{chatbot.is_active ? "Active" : "Inactive"}</dd>
            </div>
            <div>
              <dt className="font-medium">Instructions</dt>
              <dd className="text-muted-foreground whitespace-pre-line">{chatbot.instructions}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Chat Interface</h2>
          <ChatInterface chatbotId={chatbot.id} chatbotName={chatbot.name} />
        </div>
      </div>
    </div>
  )
}

