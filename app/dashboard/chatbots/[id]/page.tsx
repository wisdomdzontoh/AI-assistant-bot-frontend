"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatbotSettings } from "../../../components/chatbots/chatbot-settings"
import { ChatbotTraining } from "../../../components/chatbots/chatbot-training"
import { ChatbotAnalytics } from "../../../components/chatbots/chatbot-analytics"
import ChatbotOverview from "../../../components/chatbots/chatbot-overview"
import { ArrowLeft, Loader2 } from "lucide-react"
import { ChatbotService, Chatbot } from "@/app/lib/api-services/chatbot-service"
import { toast } from "sonner"



export default function ChatbotDetailPage() {
  const params = useParams()
  const chatbotId = params?.id as string

  const [chatbot, setChatbot] = useState<Chatbot | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        const data = await ChatbotService.getChatbot(Number(chatbotId))
        setChatbot(data)
      } catch (err) {
        toast.error("Failed to load chatbot")
      } finally {
        setLoading(false)
      }
    }

    fetchChatbot()
  }, [chatbotId])

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="animate-spin h-4 w-4" />
        Loading chatbot...
      </div>
    )
  }

  if (!chatbot) {
    return <p className="text-red-500 text-sm">Chatbot not found.</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/chatbots">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{chatbot.name}</h1>
          <p className="text-muted-foreground">{chatbot.description}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ChatbotOverview
            id={chatbotId}
            name={chatbot.name}
            description={chatbot.description ?? ""}
            status={chatbot.is_active ? "active" : "inactive"}
          />
        </TabsContent>

        <TabsContent value="training">
          <ChatbotTraining id={chatbotId} />
        </TabsContent>

        <TabsContent value="analytics">
          <ChatbotAnalytics id={chatbotId} />
        </TabsContent>

        <TabsContent value="settings">
          <ChatbotSettings id={chatbotId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
