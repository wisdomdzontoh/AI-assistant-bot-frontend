"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChatbotCard } from "../../components/dashboard/chatbot-card"
import { Plus } from "lucide-react"
import { type Chatbot, ChatbotService } from "../../lib/api-services/chatbot-service"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { toast } from "sonner"
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogTitle } from "@/components/ui/dialog"



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
            await ChatbotService.updateChatbot(pendingDelete.id, { is_deleted: false })
            await fetchChatbots() //  Reload from backend after undo
          },
        },
      })
    } catch (error) {
      toast.error("Failed to delete chatbot")
    } finally {
      setPendingDelete(null)
    }
  }
  

  if (loading) {
    return <LoadingScreen fullScreen={false} message="Loading chatbots..." />
  }

  return (
    <div className="space-y-6">
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

      {chatbots.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No chatbots yet</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Create your first AI assistant to start helping your customers.
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
              onEdit={(chatbot) => {
                // Navigate to edit page
                window.location.href = `/dashboard/chatbots/${chatbot.id}/edit`
              }}
            />
          ))}
        </div>
      )}
      <Dialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>

    <DialogContent>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <p className="text-sm">
        Are you sure you want to delete <strong>{pendingDelete?.name}</strong>?
      </p>
      <DialogFooter>
        <Button variant="ghost" onClick={() => setPendingDelete(null)}>Cancel</Button>
        <Button variant="destructive" onClick={performDeleteChatbot}>Delete</Button>
      </DialogFooter>
    </DialogContent>

  </Dialog>

    </div>
  )
}

