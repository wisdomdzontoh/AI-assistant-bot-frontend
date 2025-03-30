"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, ExternalLink } from "lucide-react"
import { WidgetPreview } from "../../components/chatbots/widget-preview"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"
import type { Chatbot } from "@/app/types"

export default function EmbedPageClient({ chatbotId }: { chatbotId: number }) {
  const [showPreview, setShowPreview] = useState(false)
  const [copiedTab, setCopiedTab] = useState<string | null>(null)
  const [chatbot, setChatbot] = useState<Chatbot | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ChatbotService.getChatbot(chatbotId)
        setChatbot({
          ...data,
          description: data.description ?? undefined,
        })
      } catch (err) {
        console.error("Failed to fetch chatbot info", err)
      }
    }
    fetchData()
  }, [chatbotId])

  const handleCopy = (code: string, tab: string) => {
    navigator.clipboard.writeText(code)
    setCopiedTab(tab)
    setTimeout(() => setCopiedTab(null), 2000)
  }

  if (!chatbot) return <p>Loading chatbot info...</p>

  const embedConfig = {
    id: chatbot.id.toString(),
    theme: {
      primaryColor: chatbot.widget_color || "#3B82F6",
      textColor: "#1F2937",
      backgroundColor: "#FFFFFF",
      buttonColor: chatbot.widget_color || "#3B82F6",
    },
    position: chatbot.widget_position,
    greeting: chatbot.widget_welcome,
    title: chatbot.widget_name,
    avatar: "https://example.com/avatar.png", // or allow avatar uploads in the future
  }

  const scriptCode = `<script>
(function(w,d,s,o,f,js,fjs){
  w['ChatWise']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
  w[o].l=1*new Date();js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
  js.async=1;js.src=f;js.id=o;fjs.parentNode.insertBefore(js,fjs);
}(window,document,'script','cw','https://cdn.chatwise.ai/widget.js'));
cw('init', ${JSON.stringify(embedConfig, null, 2)});
</script>`

  const reactCode = `import { useEffect } from 'react'

function ChatWiseWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.chatwise.ai/widget.js'
    script.async = true
    script.onload = () => {
      window.cw('init', ${JSON.stringify(embedConfig, null, 2)})
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}

export default ChatWiseWidget`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Embed Your Chatbot</h1>
          <p className="text-muted-foreground">Copy the code below to add your chatbot to any website or React app</p>
        </div>
        <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>

      <Tabs defaultValue="script" className="space-y-6">
        <TabsList>
          <TabsTrigger value="script">HTML Script</TabsTrigger>
          <TabsTrigger value="react">React Component</TabsTrigger>
          <TabsTrigger value="config">Full Config JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="script">
          <EmbedCard
            title="HTML Script"
            description="Embed this in your <head> or before </body> in any HTML page."
            code={scriptCode}
            copied={copiedTab === "script"}
            onCopy={() => handleCopy(scriptCode, "script")}
          />
        </TabsContent>

        <TabsContent value="react">
          <EmbedCard
            title="React Component"
            description="Use this snippet in your React project."
            code={reactCode}
            copied={copiedTab === "react"}
            onCopy={() => handleCopy(reactCode, "react")}
          />
        </TabsContent>

        <TabsContent value="config">
          <EmbedCard
            title="Widget Config JSON"
            description="Raw config object used by the JS SDK"
            code={JSON.stringify(embedConfig, null, 2)}
            copied={copiedTab === "config"}
            onCopy={() => handleCopy(JSON.stringify(embedConfig, null, 2), "config")}
          />
        </TabsContent>
      </Tabs>

      {showPreview && (
        <div className="border rounded-lg bg-muted/30 p-4">
          <WidgetPreview
            chatbotId={chatbotId}
            chatbotName={chatbot.widget_name}
            welcomeMessage={chatbot.widget_welcome || "Welcome to our chatbot!"}
            primaryColor={chatbot.widget_color || "#3B82F6"}
            position={chatbot.widget_position}
          />
        </div>
      )}
    </div>
  )
}

function EmbedCard({
  title,
  description,
  code,
  copied,
  onCopy,
}: {
  title: string
  description: string
  code: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Documentation
        </Button>
      </CardFooter>
    </Card>
  )
}
