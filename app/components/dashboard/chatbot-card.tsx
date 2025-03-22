import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, BarChart2, Code, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatbotCardProps {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "training"
  conversations: number
  lastUpdated: string
}

export function ChatbotCard({ id, name, description, status, conversations, lastUpdated }: ChatbotCardProps) {
  const statusColors = {
    active: "bg-emerald-500",
    inactive: "bg-slate-500",
    training: "bg-amber-500",
  }

  const statusLabels = {
    active: "Active",
    inactive: "Inactive",
    training: "Training",
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
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
              <DropdownMenuItem>Edit chatbot</DropdownMenuItem>
              <DropdownMenuItem>View analytics</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete chatbot</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className={`${statusColors[status]} text-white`}>
            {statusLabels[status]}
          </Badge>
          <span className="text-xs text-muted-foreground">Last updated: {lastUpdated}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span>{conversations} conversations</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/chatbots/${id}/analytics`}>
            <BarChart2 className="mr-2 h-4 w-4" />
            Analytics
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/chatbots/${id}/embed`}>
            <Code className="mr-2 h-4 w-4" />
            Embed
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

