"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Code, MoreHorizontal, Play } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Chatbot } from "../../lib/api-services/chatbot-service"
import { formatDistanceToNow } from "date-fns"

interface ChatbotCardProps {
  chatbot: Chatbot
  onEdit?: (chatbot: Chatbot) => void
  onDelete?: (chatbot: Chatbot) => void
}

export function ChatbotCard({ chatbot, onEdit, onDelete }: ChatbotCardProps) {
  const statusColors = {
    active: "bg-emerald-500",
    inactive: "bg-slate-500",
  }

  const statusLabels = {
    active: "Active",
    inactive: "Inactive",
  }

  const status = chatbot.is_active ? "active" : "inactive"
  const lastUpdated = formatDistanceToNow(new Date(chatbot.created_at), { addSuffix: true })

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{chatbot.name}</CardTitle>
            <CardDescription className="mt-1">{chatbot.description || "No description provided"}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit?.(chatbot)}>Edit chatbot</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/chatbots/${chatbot.id}/test`}>Test chatbot</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link href={`/dashboard/chatbots/${chatbot.id}`}>View analytics</Link>
                </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete?.(chatbot)}>
                Delete chatbot
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className={`${statusColors[status]} text-white`}>
            {statusLabels[status]}
          </Badge>
          <span className="text-xs text-muted-foreground">Created: {lastUpdated}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span>AI Assistant</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/chatbots/${chatbot.id}/test`}>
            <Play className="mr-2 h-4 w-4" />
            Test
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/chatbots/${chatbot.id}/embed`}>
            <Code className="mr-2 h-4 w-4" />
            Embed
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

