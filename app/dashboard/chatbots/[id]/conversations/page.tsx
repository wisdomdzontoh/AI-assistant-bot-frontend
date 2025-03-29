"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bot, User } from "lucide-react"
import { ChatbotService, ChatMessage } from "@/app/lib/api-services/chatbot-service"
import { toast } from "sonner"

type ChatSession = {
  id: number
  session_id: string
  created_at: string
  messages: ChatMessage[]
}

type PageProps = {
  params: {
    id: string
  }
}

export default function ChatbotConversations({ params }: PageProps) {
  const chatbotId = Number(params.id)
  const [sessions, setSessions] = useState<ChatSession[]>([])

  useEffect(() => {
    ChatbotService.getConversations(chatbotId)
      .then(setSessions)
      .catch((err) => {
        console.error("Failed to fetch conversations:", err)
        toast.error("Unable to load conversation history")
      })
  }, [chatbotId])
  

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Conversation History</h1>
      {sessions.length === 0 ? (
        <p className="text-muted-foreground text-sm">No conversations yet.</p>
      ) : (
        sessions.map((session) => (
          <Card key={session.session_id}>
            <CardHeader>
              <CardTitle>Session: {session.session_id}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Started at: {new Date(session.created_at).toLocaleString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
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
  )
}
