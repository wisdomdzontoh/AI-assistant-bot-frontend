"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, X, Maximize2, Minimize2 } from "lucide-react"

interface WidgetPreviewProps {
  chatbotName?: string
  welcomeMessage?: string
  primaryColor?: string
  position?: "right" | "left"
}

export function WidgetPreview({
  chatbotName = "ChatWise Assistant",
  welcomeMessage = "Hello! How can I help you today?",
  primaryColor = "#3B82F6",
  position = "right",
}: WidgetPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "bot",
      content: welcomeMessage,
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false)

      const botResponses = [
        "I'd be happy to help with that! Could you provide more details?",
        "Thanks for your question. Based on the information you've provided, I recommend checking our documentation for more information.",
        "I understand your concern. Let me look into this for you.",
        "Great question! Here's what you need to know about that...",
      ]

      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1500)
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div className={`fixed ${position === "right" ? "right-6" : "left-6"} bottom-6 z-50 flex flex-col items-end`}>
      {isOpen && (
        <div
          className={`mb-4 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "w-[400px] h-[500px]" : "w-[350px] h-[450px]"
          }`}
          style={{ backgroundColor: "white" }}
        >
          <div
            className="flex items-center justify-between p-4"
            style={{ backgroundColor: primaryColor, color: "white" }}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Bot" />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{chatbotName}</span>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleExpand} className="text-white hover:bg-white/20">
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === "user" ? "rounded-tr-none text-white" : "rounded-tl-none bg-white border"
                  }`}
                  style={{
                    backgroundColor: message.role === "user" ? primaryColor : "white",
                  }}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-lg rounded-tl-none p-3 bg-white border">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                style={{ backgroundColor: primaryColor }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={toggleChat}
        style={{ backgroundColor: primaryColor }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>
    </div>
  )
}

