"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"
import { type ChatMessage, ChatbotService } from "@/app/lib/api-services/chatbot-service"
import { toast } from "sonner"
import { LoadingScreen } from "@/components/ui/loading-screen"

interface ChatInterfaceProps {
  chatbotId: number
  chatbotName: string
}

interface BotReply {
  query: string
  result: string
}

export function ChatInterface({ chatbotId, chatbotName }: ChatInterfaceProps) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initSession = async () => {
      try {
        const key = `chatbot_session_${chatbotId}`
        let storedId = localStorage.getItem(key)

        if (!storedId) {
          const session = await ChatbotService.startSession(chatbotId)
          storedId = session.session_id
          localStorage.setItem(key, storedId)
        }

        setSessionId(storedId)

        const fullSession = await ChatbotService.getSession(storedId)
        const formattedMessages = fullSession.messages.map((m) => ({
          sender: m.sender,
          content: m.content,
          created_at: m.created_at,
        }))

        setMessages(formattedMessages)
      } catch (error) {
        console.error("Chat session init failed:", error)
        toast.error("Failed to load or start chat session.")
      } finally {
        setInitializing(false)
      }
    }

    initSession()
  }, [chatbotId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return

    const userMessage: ChatMessage = {
      sender: "user",
      content: inputValue,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setLoading(true)

    try {
      const res = await ChatbotService.sendMessage(sessionId, inputValue)

      const botMessage: ChatMessage = {
        sender: "bot",
        content: res.reply, // this could be a string or object {query, result}
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      toast.error("Bot failed to respond.")
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          content: "Oops! Something went wrong. Try again later.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (initializing) return <LoadingScreen fullScreen={false} message="Starting chat session..." />

  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-3 px-4 flex items-center">
        <Bot className="h-5 w-5 mr-2" />
        <h3 className="font-medium text-base">{chatbotName}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, index) => {
          const isBot = msg.sender === "bot"
          const isStructured = typeof msg.content === "object" && msg.content !== null

          return (
            <div
              key={`${msg.sender}-${index}-${msg.created_at || index}`}
              className={`flex ${isBot ? "justify-start" : "justify-end"}`}
            >
              {isBot && (
                <Avatar className="h-8 w-8 mt-1 mr-2">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`rounded-lg p-3 max-w-[75%] text-sm whitespace-pre-wrap ${
                  isBot
                    ? "bg-muted rounded-tl-none"
                    : "bg-primary text-primary-foreground rounded-tr-none"
                }`}
              >
                {isStructured ? (
                  <>
                    <p className="text-muted-foreground text-xs mb-1">
                      <strong>Q:</strong> {isStructured && typeof msg.content === "object" && 'query' in msg.content ? (msg.content as BotReply).query : ""}
                    </p>
                    <p>
                      <strong>A:</strong> {isStructured && typeof msg.content === "object" && 'result' in msg.content ? (msg.content as BotReply).result : ""}
                    </p>
                  </>
                ) : (
                  <p>{msg.content as string}</p>
                )}
              </div>

              {!isBot && (
                <Avatar className="h-8 w-8 mt-1 ml-2">
                  <AvatarFallback className="bg-secondary">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          )
        })}

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Bot className="h-4 w-4" /> Bot is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
