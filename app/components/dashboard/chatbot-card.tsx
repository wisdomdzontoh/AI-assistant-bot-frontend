"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal, MessageSquare, Clock, Settings,
  BarChart2, Code, Play, Trash2
} from "lucide-react"
import type { Chatbot } from "@/app/lib/api-services/chatbot-service"

interface ChatbotCardProps {
  chatbot: Chatbot
  onEdit?: (chatbot: Chatbot) => void
  onDelete?: (chatbot: Chatbot) => void
  conversations?: number
}

export function ChatbotCard({
  chatbot,
  onEdit,
  onDelete,
  conversations = 0
}: ChatbotCardProps) {
  const lastUpdated = formatDistanceToNow(new Date(chatbot.created_at), { addSuffix: true })

  const status = chatbot.is_active ? "active" : "inactive"
  const statusConfig = {
    active: { color: "bg-emerald-500 text-white", label: "Active" },
    inactive: { color: "bg-slate-400 text-white", label: "Inactive" },
    training: { color: "bg-amber-500 text-white", label: "Training" },
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-muted/60 group">
      <CardHeader className="pb-3 space-y-1">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{chatbot.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {chatbot.description || <span className="italic text-xs">No description provided</span>}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground opacity-70 hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit?.(chatbot)}>
                <Settings className="mr-2 h-4 w-4" />
                Edit chatbot
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/chatbots/${chatbot.id}`}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View analytics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete?.(chatbot)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete chatbot
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className={`${statusConfig[status].color} px-2 py-0.5 text-xs font-medium rounded-sm`}
          >
            {statusConfig[status].label}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1 opacity-70" />
            <span>{lastUpdated}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4 opacity-70" />
          <span>{conversations} conversation{conversations !== 1 && "s"}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t bg-muted/30 px-6 py-3 gap-2">
        <Button variant="ghost" size="sm" asChild className="flex-1">
          <Link href={`/dashboard/chatbots/${chatbot.id}/test`} className="flex items-center justify-center">
            <Play className="mr-2 h-4 w-4" />
            Test
          </Link>
        </Button>

        <Button variant="ghost" size="sm" asChild className="flex-1">
          <Link href={`/dashboard/embed/${chatbot.id}`} className="flex items-center justify-center">
            <Code className="mr-2 h-4 w-4" />
            Embed
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
