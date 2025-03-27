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
import { ArrowLeft, Loader2, Bot, User } from "lucide-react"
import { ChatbotService, Chatbot, ChatMessage } from "@/app/lib/api-services/chatbot-service"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type ChatSession = {
  id: number
  session_id: string
  created_at: string
  messages: ChatMessage[]
}

export default function ChatbotDetailPage() {
  const params = useParams()
  const chatbotId = Number(params?.id)

  const [chatbot, setChatbot] = useState<Chatbot | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<ChatSession[]>([])

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        const data = await ChatbotService.getChatbot(chatbotId)
        setChatbot(data)
      } catch (err) {
        toast.error("Failed to load chatbot")
      } finally {
        setLoading(false)
      }
    }

    const fetchSessions = async () => {
      try {
        const data = await ChatbotService.getConversations(chatbotId)
        setSessions(data)
      } catch (err) {
        toast.error("Failed to load conversations")
        console.error("Conversations error:", err)
      }
    }

    fetchChatbot()
    fetchSessions()
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
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ChatbotOverview
            id={chatbotId.toString()}
            name={chatbot.name}
            description={chatbot.description ?? ""}
            status={chatbot.is_active ? "active" : "inactive"}
          />
        </TabsContent>

        <TabsContent value="training">
          <ChatbotTraining id={chatbotId.toString()} />
        </TabsContent>

        <TabsContent value="analytics">
          <ChatbotAnalytics id={chatbotId.toString()} />
        </TabsContent>

        <TabsContent value="settings">
          <ChatbotSettings id={chatbotId.toString()} />
        </TabsContent>

        <TabsContent value="conversations">
          <div className="space-y-4">
            {sessions.length === 0 ? (
              <p className="text-muted-foreground text-sm">No conversations found.</p>
            ) : (
              sessions.map((session) => (
                <Card key={session.session_id}>
                  <CardHeader>
                    <CardTitle>Session ID: {session.session_id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Started: {new Date(session.created_at).toLocaleString()}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {session.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-md ${
                          msg.sender === "user" ? "bg-muted" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          <span className="text-sm font-semibold capitalize">{msg.sender}</span>
                        </div>
                        <p>{msg.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {msg.created_at ? new Date(msg.created_at).toLocaleString() : ""}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
