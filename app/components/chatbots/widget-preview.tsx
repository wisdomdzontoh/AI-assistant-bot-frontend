"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, X, Maximize2, Minimize2, ThumbsUp, ThumbsDown, Paperclip } from "lucide-react"
import type { Chatbot } from "../../types"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"

interface WidgetPreviewProps {
  chatbotId: number
  chatbotName: string
  welcomeMessage: string
  primaryColor: string
  position: "left" | "right"
  showBranding?: boolean
  allowFeedback?: boolean
  allowAttachments?: boolean
}

export function WidgetPreview({
  chatbotId,
  chatbotName,
  welcomeMessage,
  primaryColor,
  position,
  showBranding = true,
  allowFeedback = true,
  allowAttachments = false,
}: WidgetPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [attachment, setAttachment] = useState<File | null>(null)

  const [messages, setMessages] = useState<{ id: string; role: "user" | "bot"; content: string }[]>([
    { id: "init", role: "bot", content: welcomeMessage },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim() && !attachment) return

    const userMsg = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input || "[Sent a file]",
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setAttachment(null)
    setIsTyping(true)

    setTimeout(() => {
      const botMsg = {
        id: Date.now().toString() + "-bot",
        role: "bot" as const,
        content: "Thanks! We'll get back to you shortly.",
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className={`fixed ${position === "right" ? "right-6" : "left-6"} bottom-6 z-50 flex flex-col items-end`}>
      {isOpen && (
        <div
          className={`mb-4 rounded-lg shadow-lg transition-all overflow-hidden flex flex-col justify-between ${
            isExpanded ? "w-[400px] h-[500px]" : "w-[350px] h-[450px]"
          }`}
          style={{ backgroundColor: "white" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4" style={{ backgroundColor: primaryColor, color: "white" }}>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{chatbotName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setIsExpanded((p) => !p)} className="text-white hover:bg-white/20">
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg p-3 max-w-[80%] whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "text-white rounded-tr-none"
                      : "bg-white border rounded-tl-none"
                  }`}
                  style={{ backgroundColor: msg.role === "user" ? primaryColor : "white" }}
                >
                  {msg.content}
                  {msg.role === "bot" && allowFeedback && (
                    <div className="flex gap-1 mt-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="text-sm text-muted-foreground">Bot is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t bg-white space-y-2">
            {attachment && (
              <div className="text-sm bg-muted p-2 rounded flex justify-between items-center">
                <span>{attachment.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => setAttachment(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              {allowAttachments && (
                <label className="cursor-pointer">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                  />
                </label>
              )}
              <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() && !attachment}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Branding */}
          {showBranding && (
            <div className="text-center text-xs text-muted-foreground py-2 bg-white border-t">
              Powered by <span className="font-semibold">ChatWise</span>
            </div>
          )}
        </div>
      )}

      {/* Floating Button */}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
        style={{ backgroundColor: primaryColor }}
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>
    </div>
  )
}
