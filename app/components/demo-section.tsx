"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot } from "lucide-react"

export function DemoSection() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! 👋 I'm your AI assistant. How can I help you today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

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

  return (
    <section id="demo" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See ChatWise in Action</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Try our interactive demo to experience how ChatWise can transform your customer support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-4">Intelligent AI That Understands Your Business</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 bg-blue-100 dark:bg-blue-900 p-1 rounded-full">
                  <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Trained on Your Content</p>
                  <p className="text-muted-foreground">
                    Upload documents, connect your website, or paste content to train the AI on your specific business
                    knowledge.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 bg-blue-100 dark:bg-blue-900 p-1 rounded-full">
                  <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Customizable Persona</p>
                  <p className="text-muted-foreground">
                    Define the tone and style of your AI to match your brand's personality and voice.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 bg-blue-100 dark:bg-blue-900 p-1 rounded-full">
                  <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Smart Fallback Options</p>
                  <p className="text-muted-foreground">
                    When the AI can't help, it offers alternatives like creating tickets or connecting with humans.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl border overflow-hidden">
            <div className="bg-blue-600 text-white p-4 flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <h4 className="font-medium">ChatWise Assistant</h4>
            </div>

            <div className="h-80 overflow-y-auto p-4 flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-100 dark:bg-slate-800 rounded-tl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-slate-800 rounded-lg rounded-tl-none p-3">
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
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about our pricing plans..."
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

