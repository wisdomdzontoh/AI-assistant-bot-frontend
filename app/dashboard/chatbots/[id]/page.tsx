import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChatbotOverview from "../../../components/chatbots/chatbot-overview"
import { ChatbotSettings } from "../../../components/chatbots/chatbot-settings"
import { ChatbotTraining } from "../../../components/chatbots/chatbot-training"
import { ChatbotAnalytics } from "../../../components/chatbots/chatbot-analytics"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Chatbot Details - ChatWise",
  description: "Manage and configure your AI chatbot",
}

export default function ChatbotDetailPage({ params }: { params: { id: string } }) {
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
          <h1 className="text-3xl font-bold tracking-tight">Customer Support Bot</h1>
          <p className="text-muted-foreground">Manage and configure your AI assistant</p>
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
          <ChatbotOverview id={params.id} name="Chatbot Name" description="Chatbot Description" status="active" />
        </TabsContent>

        <TabsContent value="training">
          <ChatbotTraining id={params.id} />
        </TabsContent>

        <TabsContent value="analytics">
          <ChatbotAnalytics id={params.id} />
        </TabsContent>

        <TabsContent value="settings">
          <ChatbotSettings id={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

