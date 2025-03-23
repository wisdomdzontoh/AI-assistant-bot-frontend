"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ChatbotOverviewProps {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
}

const ChatbotOverview: React.FC<ChatbotOverviewProps> = ({ id, name, description, status }) => {
  const [currentStatus, setStatus] = useState(status)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Status: {currentStatus}</p>
        <div className="flex gap-3">
          <Button
            variant={currentStatus === "active" ? "destructive" : "default"}
            onClick={() => setStatus(currentStatus === "active" ? "inactive" : "active")}
          >
            {currentStatus === "active" ? "Deactivate" : "Activate"}
          </Button>
          <Button variant="outline">
          <Link href={`/dashboard/chatbots/${id}/test`}>Test Chatbot</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/chatbots/${id}/widget`}>Customize Widget</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChatbotOverview

