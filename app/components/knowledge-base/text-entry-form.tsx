"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function TextEntryForm({ chatbotId, onSuccess }: { chatbotId: number; onSuccess: () => void }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [keywords, setKeywords] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) return toast.error("Title and content are required")

    try {
      setLoading(true)
      const res = await fetch("/api/knowledge/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          source_type: "text",
          chatbot: chatbotId,
          keywords,
        }),
      })
      if (!res.ok) throw new Error("Failed to save text")
      toast.success("Knowledge saved")
      onSuccess()
      setTitle("")
      setContent("")
      setKeywords("")
    } catch (err) {
      console.error(err)
      toast.error("Submission failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Text block title" />
      </div>
      <div>
        <Label>Content</Label>
        <Textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Paste knowledge content here..." />
      </div>
      <div>
        <Label>Keywords (optional)</Label>
        <Textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. onboarding, setup, help" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
        Save Text
      </Button>
    </form>
  )
}