"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Paperclip, Send, ThumbsDown, ThumbsUp, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"

type Message = {
  id: string
  role: "user" | "bot"
  content: string
  timestamp: Date
  attachment?: string
  feedback?: "up" | "down"
}

type Conversation = {
  id: string
  session_id: string
  user: {
    name: string
    email?: string
    avatar?: string
  }
  lastMessage: string
  lastMessageTime: Date
  unread: boolean
  status: "active" | "resolved" | "pending"
}

export function LiveChat() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const convs = await ChatbotService.getConversations(1) // replace 1 with actual chatbotId
        setConversations(convs)

        const map: Record<string, Message[]> = {}
        convs.forEach((conv) => {
          map[conv.id] = conv.messages.map((m: any) => ({
            id: m.id,
            role: m.sender,
            content: m.content,
            timestamp: new Date(m.created_at),
            attachment: m.attachment || undefined,
            feedback: m.feedback || undefined,
          }))
        })

        setMessages(map)
      } catch (error) {
        toast.error("Failed to load conversations")
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, activeConversation])

  const handleSendMessage = async () => {
    if (!activeConversation || (!input.trim() && !attachment)) return

    const formData = new FormData()
    formData.append("message", input)
    if (attachment) formData.append("attachment", attachment)

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      attachment: attachment ? URL.createObjectURL(attachment) : undefined,
    }

    setMessages((prev) => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), userMsg],
    }))
    setInput("")
    setAttachment(null)
    setIsTyping(true)

    try {
      const res = await ChatbotService.sendMessage(
        conversations.find((c) => c.id === activeConversation)?.session_id!,
        formData
      )

      const reply = res.reply?.result || res.reply

      const botMsg: Message = {
        id: Date.now().toString() + "-bot",
        role: "bot",
        content: reply,
        timestamp: new Date(),
      }

      setMessages((prev) => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), botMsg],
      }))
    } catch (error) {
      toast.error("Failed to send message")
    } finally {
      setIsTyping(false)
    }
  }

  const handleFeedback = async (messageId: string, feedback: "up" | "down") => {
    try {
      await ChatbotService.submitFeedback(messageId, feedback)
      setMessages((prev) => ({
        ...prev,
        [activeConversation!]: prev[activeConversation!].map((msg) =>
          msg.id === messageId ? { ...msg, feedback } : msg
        ),
      }))
      toast.success("Feedback submitted")
    } catch (err) {
      toast.error("Failed to submit feedback")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAttachment(e.target.files[0])
    }
  }

  return (
    <div className="h-[600px] w-full border rounded-md flex flex-col bg-background">
      <div className="p-4 border-b font-semibold flex items-center gap-2">
        <Bot className="w-4 h-4" />
        Live Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
        {messages[activeConversation || ""]?.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-lg max-w-[70%] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-white dark:bg-card rounded-tl-none"
              }`}
            >
              <p>{msg.content}</p>

              {msg.attachment && (
                <a
                  href={msg.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-2 flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Paperclip className="w-4 h-4" /> View Attachment
                </a>
              )}

              {msg.role === "bot" && (
                <div className="mt-2 flex gap-1">
                  <Button
                    variant={msg.feedback === "up" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleFeedback(msg.id, "up")}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={msg.feedback === "down" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleFeedback(msg.id, "down")}
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <p className="text-sm text-muted-foreground">Bot is typing...</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-background">
        {attachment && (
          <div className="mb-2 flex justify-between items-center text-sm bg-muted p-2 rounded">
            <span>{attachment.name}</span>
            <Button size="icon" variant="ghost" onClick={() => setAttachment(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!activeConversation}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-4 h-4" />
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Button>
          <Button type="submit" disabled={!input.trim() && !attachment}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
