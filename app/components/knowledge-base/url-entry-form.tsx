"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function UrlEntryForm({ chatbotId }: { chatbotId: number }) {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [keywords, setKeywords] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url || !title) {
      toast.error("Title and URL are required")
      return
    }

    try {
      setLoading(true)
      const response = await fetch("/api/knowledge/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatbot: chatbotId,
          source_type: "url",
          title,
          url,
          keywords,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save URL")
      }

      toast.success("URL saved to knowledge base")
      setUrl("")
      setTitle("")
      setKeywords("")
    } catch (error) {
      console.error("URL upload error:", error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title for this source (e.g. Help Center)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="url"
        placeholder="https://example.com/support"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Textarea
        placeholder="Optional keywords (e.g. refund, account, policy)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Add URL"
        )}
      </Button>
    </form>
  )
}
