"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function DemoSection() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! 👋 I'm your AI assistant. How can I help you today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputValue }])
    setInputValue("")

    // Simulate AI typing
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I'd be happy to help! Our Premium plan includes 3 AI assistants, 3,000 messages per month, and features like multi-language support and human takeover. Would you like me to tell you more about our pricing options or specific features?",
        },
      ])
    }, 1500)
  }

  const predefinedQuestions = [
    "Tell me about your pricing plans",
    "How does the AI training work?",
    "Can I customize the chatbot appearance?",
    "Do you support multiple languages?",
  ]

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_50%)]" />

      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">See ChatWise in Action</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Try our interactive demo to experience how ChatWise can transform your customer support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Intelligent AI That Understands Your Business</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mr-4 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-lg">Trained on Your Content</p>
                  <p className="text-muted-foreground">
                    Upload documents, connect your website, or paste content to train the AI on your specific business
                    knowledge.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-lg">Customizable Persona</p>
                  <p className="text-muted-foreground">
                    Define the tone and style of your AI to match your brand's personality and voice.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-lg">Smart Fallback Options</p>
                  <p className="text-muted-foreground">
                    When the AI can't help, it offers alternatives like creating tickets or connecting with humans.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <p className="font-medium mb-3">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {predefinedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputValue(question)
                      // Focus the input
                      document.getElementById("chat-input")?.focus()
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl shadow-xl border overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <h4 className="font-medium">ChatWise Assistant</h4>
            </div>

            <div className="h-[400px] overflow-y-auto p-4 flex flex-col space-y-4 bg-muted/30">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex animate-fade-in-up",
                    message.role === "user" ? "justify-end" : "justify-start",
                    // Add staggered animation delay
                    `animation-delay-${index * 100}`,
                  )}
                >
                  {message.role === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2 mt-1">
                      <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none"
                        : "bg-background border rounded-tl-none",
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center ml-2 mt-1">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2 mt-1">
                    <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="bg-background border rounded-lg rounded-tl-none p-3">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <form
                className="flex space-x-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
              >
                <Input
                  id="chat-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about our pricing plans..."
                  className="flex-grow"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

