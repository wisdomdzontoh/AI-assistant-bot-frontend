"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Send, Search, MoreHorizontal, ThumbsUp, ThumbsDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Message = {
  id: string
  role: "user" | "bot"
  content: string
  timestamp: Date
}

type Conversation = {
  id: string
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
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      user: { name: "John Doe", email: "john@example.com" },
      lastMessage: "I need help with my recent order",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unread: true,
      status: "active",
    },
    {
      id: "2",
      user: { name: "Jane Smith", email: "jane@example.com" },
      lastMessage: "How do I reset my password?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unread: false,
      status: "active",
    },
    {
      id: "3",
      user: { name: "Bob Johnson", email: "bob@example.com" },
      lastMessage: "Thanks for your help!",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unread: false,
      status: "resolved",
    },
  ])

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1-1",
        role: "user",
        content: "I need help with my recent order. It's been a week and I haven't received any shipping updates.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "1-2",
        role: "bot",
        content:
          "I'd be happy to help you with that. Could you please provide your order number so I can check the status for you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
    ],
    "2": [
      {
        id: "2-1",
        role: "user",
        content: "How do I reset my password?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "2-2",
        role: "bot",
        content:
          'You can reset your password by clicking on the "Forgot Password" link on the login page. We\'ll send you an email with instructions to reset your password.',
        timestamp: new Date(Date.now() - 1000 * 60 * 29),
      },
    ],
    "3": [
      {
        id: "3-1",
        role: "user",
        content: "I'm having trouble finding the product I saw yesterday.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      },
      {
        id: "3-2",
        role: "bot",
        content:
          "I can help you find that product. Do you remember any details about it, such as the name, category, or any specific features?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.9),
      },
      {
        id: "3-3",
        role: "user",
        content: "It was a blue wireless headphone with noise cancellation.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.8),
      },
      {
        id: "3-4",
        role: "bot",
        content:
          "Based on your description, you might be looking for our SoundWave Pro Noise Cancelling Headphones in blue. You can find them in the Audio section under Headphones. Here's a direct link: [SoundWave Pro Headphones]",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.7),
      },
      {
        id: "3-5",
        role: "user",
        content: "Thanks for your help!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
  })

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, activeConversation])

  const handleSendMessage = () => {
    if (!activeConversation || !input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), userMessage],
    }))

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              lastMessage: input,
              lastMessageTime: new Date(),
            }
          : conv,
      ),
    )

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

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), botMessage],
      }))

      // Update conversation last message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversation
            ? {
                ...conv,
                lastMessage: botMessage.content,
                lastMessageTime: new Date(),
              }
            : conv,
        ),
      )
    }, 1500)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  const markAsResolved = (id: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id
          ? {
              ...conv,
              status: "resolved",
            }
          : conv,
      ),
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-13rem)]">
      <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-muted/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9" />
          </div>
        </div>

        <Tabs defaultValue="active" className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="w-full">
              <TabsTrigger value="active" className="flex-1">
                Active
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex-1">
                Resolved
              </TabsTrigger>
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="flex-1 overflow-auto p-0 m-0">
            <div className="divide-y">
              {conversations
                .filter((conv) => conv.status === "active")
                .map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                      activeConversation === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => {
                      setActiveConversation(conversation.id)
                      // Mark as read when clicked
                      if (conversation.unread) {
                        setConversations((prev) =>
                          prev.map((conv) =>
                            conv.id === conversation.id
                              ? {
                                  ...conv,
                                  unread: false,
                                }
                              : conv,
                          ),
                        )
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={conversation.user.avatar || "/placeholder.svg"}
                          alt={conversation.user.name}
                        />
                        <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium truncate ${conversation.unread ? "text-primary" : ""}`}>
                            {conversation.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{formatTime(conversation.lastMessageTime)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread && <Badge className="ml-2 h-2 w-2 rounded-full p-0" />}
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="resolved" className="flex-1 overflow-auto p-0 m-0">
            <div className="divide-y">
              {conversations
                .filter((conv) => conv.status === "resolved")
                .map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                      activeConversation === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={conversation.user.avatar || "/placeholder.svg"}
                          alt={conversation.user.name}
                        />
                        <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.user.name}</p>
                          <p className="text-xs text-muted-foreground">{formatTime(conversation.lastMessageTime)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        Resolved
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="flex-1 overflow-auto p-0 m-0">
            <div className="divide-y">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    activeConversation === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => {
                    setActiveConversation(conversation.id)
                    // Mark as read when clicked
                    if (conversation.unread) {
                      setConversations((prev) =>
                        prev.map((conv) =>
                          conv.id === conversation.id
                            ? {
                                ...conv,
                                unread: false,
                              }
                            : conv,
                        ),
                      )
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                      <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium truncate ${conversation.unread ? "text-primary" : ""}`}>
                          {conversation.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{formatTime(conversation.lastMessageTime)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread ? (
                      <Badge className="ml-2 h-2 w-2 rounded-full p-0" />
                    ) : (
                      conversation.status === "resolved" && (
                        <Badge variant="outline" className="ml-2">
                          Resolved
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
        {activeConversation ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={conversations.find((c) => c.id === activeConversation)?.user.avatar || "/placeholder.svg"}
                    alt={conversations.find((c) => c.id === activeConversation)?.user.name || "User"}
                  />
                  <AvatarFallback>
                    {conversations.find((c) => c.id === activeConversation)?.user.name.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{conversations.find((c) => c.id === activeConversation)?.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {conversations.find((c) => c.id === activeConversation)?.user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markAsResolved(activeConversation)}
                  disabled={conversations.find((c) => c.id === activeConversation)?.status === "resolved"}
                >
                  {conversations.find((c) => c.id === activeConversation)?.status === "resolved"
                    ? "Resolved"
                    : "Mark as Resolved"}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View User Profile</DropdownMenuItem>
                    <DropdownMenuItem>Transfer Conversation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete Conversation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages[activeConversation]?.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start gap-2 max-w-[80%]">
                    {message.role === "bot" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src="/placeholder.svg" alt="Bot" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-card rounded-tl-none"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>

                        {message.role === "bot" && (
                          <div className="flex items-center gap-1 ml-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage
                          src={
                            conversations.find((c) => c.id === activeConversation)?.user.avatar || "/placeholder.svg"
                          }
                          alt={conversations.find((c) => c.id === activeConversation)?.user.name || "User"}
                        />
                        <AvatarFallback>
                          {conversations.find((c) => c.id === activeConversation)?.user.name.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 max-w-[80%]">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="/placeholder.svg" alt="Bot" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="rounded-lg p-3 bg-card rounded-tl-none">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={!activeConversation || isTyping}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!activeConversation || !input.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>No Conversation Selected</CardTitle>
                <CardDescription>Select a conversation from the list to view messages</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You can view all active and resolved conversations from the sidebar. Click on any conversation to view
                  the message history and respond to users.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

