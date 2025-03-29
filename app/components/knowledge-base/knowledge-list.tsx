"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface KnowledgeEntry {
  chatbot: number
  id: number
  title: string
  source_type: string
  embedded: boolean
  created_at: string
}

export function KnowledgeBaseList({ chatbotId }: { chatbotId: number }) {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [training, setTraining] = useState<number | null>(null)

  const fetchEntries = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/knowledge/")
      const data = await res.json()
      setEntries(data.filter((entry: KnowledgeEntry) => entry.chatbot === chatbotId))
    } catch (error) {
      console.error("Failed to load knowledge entries:", error)
      toast.error("Failed to load knowledge base")
    } finally {
      setLoading(false)
    }
  }

  const handleTrain = async (id: number) => {
    try {
      setTraining(id)
      toast.info("Training in progress...")
      await new Promise((r) => setTimeout(r, 2000)) // simulate delay

      // In real app, call an endpoint like: POST /api/knowledge/:id/embed/
      toast.success("Embedding completed")
      fetchEntries()
    } catch {
      toast.error("Training failed")
    } finally {
      setTraining(null)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [chatbotId])

  if (loading) return <p className="text-muted-foreground text-sm">Loading knowledge base...</p>

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-muted-foreground">
          <tr className="text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Source</th>
            <th className="p-3">Embedded</th>
            <th className="p-3">Date</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                No entries found for this chatbot.
              </td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="p-3">{entry.title}</td>
                <td className="p-3 capitalize">{entry.source_type}</td>
                <td className="p-3">
                  <Badge variant={entry.embedded ? "default" : "outline"}>
                    {entry.embedded ? "✅ Embedded" : "❌ Not Embedded"}
                  </Badge>
                </td>
                <td className="p-3">{new Date(entry.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTrain(entry.id)}
                    disabled={entry.embedded || training === entry.id}
                  >
                    {training === entry.id ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Training...
                      </>
                    ) : entry.embedded ? (
                      "Trained"
                    ) : (
                      "Train Now"
                    )}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
