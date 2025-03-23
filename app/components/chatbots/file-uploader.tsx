"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Upload, File, X, Loader2 } from "lucide-react"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"

interface FileUploaderProps {
  chatbotId: number
}

export function FileUploader({ chatbotId, onUploadSuccess }: { chatbotId: number; onUploadSuccess: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)


  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
      toast.success(`${newFiles.length} file(s) added`)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
      toast.success(`${newFiles.length} file(s) added`)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (!chatbotId) {
      toast.error("Chatbot ID is missing.")
      return
    }

    setUploading(true)
    try {
      for (const file of files) {
        await ChatbotService.uploadFile(chatbotId, file)
      }
      

      toast.success(`${files.length} file(s) uploaded successfully`)
      setFiles([])
      onUploadSuccess?.() // ✅ refresh knowledge
    } catch (err) {
      console.error(err)
      toast.error("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-1">Drag and drop files here</h3>
        <p className="text-sm text-muted-foreground mb-4">PDF, DOCX, TXT, etc.</p>
        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
          Browse Files
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept=".pdf,.docx,.txt,.md,.csv"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Selected Files</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={uploadFiles} disabled={uploading} className="w-full">
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                Upload {files.length} File{files.length !== 1 ? "s" : ""}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
