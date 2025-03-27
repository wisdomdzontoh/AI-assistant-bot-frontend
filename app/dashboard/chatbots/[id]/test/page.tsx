"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { ChatInterface } from "@/app/components/chat/chat-interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ChatbotService, Chatbot } from "@/app/lib/api-services/chatbot-service"

export default function TestChatbotPage() {
  const { id } = useParams()
  const router = useRouter()

  const [chatbot, setChatbot] = useState<Chatbot | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const chatbotId = Number(id)
    if (!chatbotId) return

    ChatbotService.getChatbot(chatbotId)
      .then(setChatbot)
      .catch((error) => {
        console.error("Failed to fetch chatbot:", error)
        toast.error("Failed to load chatbot")
        router.push("/dashboard/chatbots")
      })
      .finally(() => setLoading(false))
  }, [id, router])

  if (loading) return <LoadingScreen fullScreen={false} message="Loading chatbot..." />
  if (!chatbot) return null

  return (
    <div className="space-y-6 max-w-full">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/dashboard/chatbots">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chatbots
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Test Chatbot: {chatbot.name}</h1>
      </div>

      <p className="text-muted-foreground">
        This is a test interface for your chatbot. You can use it to see how your chatbot responds to different messages.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Chatbot Details</CardTitle>
          </CardHeader>
          <CardContent>
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
                <dd className="text-muted-foreground whitespace-pre-line overflow-auto max-h-[200px]">
                  {chatbot.instructions}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="w-full overflow-hidden">
          <ChatInterface chatbotId={chatbot.id} chatbotName={chatbot.name} />
        </div>
      </div>
    </div>
  )
}
