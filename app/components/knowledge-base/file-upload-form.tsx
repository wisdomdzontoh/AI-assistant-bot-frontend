"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function FileUploadForm({ chatbotId, onSuccess }: { chatbotId: number; onSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [keywords, setKeywords] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return toast.error("Please select a file")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title || file.name)
    formData.append("source_type", "upload")
    formData.append("chatbot", chatbotId.toString())
    formData.append("keywords", keywords)

    try {
      setLoading(true)
      const res = await fetch("/api/knowledge/", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Upload failed")
      toast.success("File uploaded and saved")
      onSuccess()
      setFile(null)
      setTitle("")
      setKeywords("")
    } catch (err) {
      console.error(err)
      toast.error("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document title" />
      </div>
      <div>
        <Label>File</Label>
        <Input type="file" accept=".pdf,.txt,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      <div>
        <Label>Keywords (optional)</Label>
        <Textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. support, shipping, billing" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
        Upload File
      </Button>
    </form>
  )
}
