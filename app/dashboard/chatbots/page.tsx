"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChatbotCard } from "../../components/dashboard/chatbot-card"
import { Plus, Trash2 } from "lucide-react"
import { type Chatbot, ChatbotService } from "../../lib/api-services/chatbot-service"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { toast } from "sonner"
import {
  Dialog, DialogTrigger, DialogContent, DialogFooter,
  DialogTitle, DialogHeader, DialogDescription
} from "@/components/ui/dialog"

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([])
  const [loading, setLoading] = useState(true)
  const [pendingDelete, setPendingDelete] = useState<Chatbot | null>(null)

  const fetchChatbots = async () => {
    try {
      const data = await ChatbotService.getChatbots()
      setChatbots(data)
    } catch (error) {
      console.error("Failed to fetch chatbots:", error)
      toast.error("Failed to load chatbots")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChatbots()
  }, [])

  const handleDeleteChatbot = (chatbot: Chatbot) => {
    setPendingDelete(chatbot)
  }

  const performDeleteChatbot = async () => {
    if (!pendingDelete) return
    try {
      await ChatbotService.deleteChatbot(pendingDelete.id)
      setChatbots(chatbots.filter((b) => b.id !== pendingDelete.id))
      toast.success(`${pendingDelete.name} deleted`, {
        action: {
          label: "Undo",
          onClick: async () => {
            await ChatbotService.updateChatbot(pendingDelete.id, { is_deleted: false } as Partial<Chatbot>)
            await fetchChatbots()
          },
        },
      })
    } catch (error) {
      toast.error("Failed to delete chatbot")
    } finally {
      setPendingDelete(null)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chatbots</h1>
          <p className="text-muted-foreground">Create and manage your AI assistants</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/chatbots/new">
            <Plus className="mr-2 h-4 w-4" />
            New Chatbot
          </Link>
        </Button>
      </div>

      {loading ? (
        <LoadingScreen fullScreen={false} message="Loading chatbots..." />
      ) : chatbots.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center border border-dashed rounded-lg p-10 bg-muted/10">
          <h3 className="mb-2 text-xl font-semibold">No chatbots yet</h3>
          <p className="mb-6 text-sm text-muted-foreground max-w-sm">
            Start by creating your first AI assistant. You can train it with documents, websites, or custom content.
          </p>
          <Button asChild>
            <Link href="/dashboard/chatbots/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Chatbot
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chatbots.map((chatbot) => (
            <ChatbotCard
              key={chatbot.id}
              chatbot={chatbot}
              onDelete={handleDeleteChatbot}
              onEdit={() => {
                window.location.href = `/dashboard/chatbots/${chatbot.id}/edit`
              }}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{pendingDelete?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={performDeleteChatbot}>
              Delete Chatbot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
