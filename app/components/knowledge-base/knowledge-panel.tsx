"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"
import { KnowledgeBaseList } from "./knowledge-list"
import { FileUploadForm } from "./file-upload-form"
import { TextEntryForm } from "./text-entry-form"
import { UrlEntryForm } from "./url-entry-form"

export function KnowledgePanel({ chatbotId }: { chatbotId: number }) {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
    toast.success("Knowledge base refreshed")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Train Knowledge</CardTitle>
            <p className="text-muted-foreground text-sm">Upload files, paste content, or crawl URLs</p>
          </div>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload">
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="text">Paste Text</TabsTrigger>
              <TabsTrigger value="url">Add URL</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <FileUploadForm chatbotId={chatbotId} onSuccess={handleRefresh} />
            </TabsContent>
            <TabsContent value="text">
              <TextEntryForm chatbotId={chatbotId} onSuccess={handleRefresh} />
            </TabsContent>
            <TabsContent value="url">
              <UrlEntryForm chatbotId={chatbotId} onSuccess={handleRefresh} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <KnowledgeBaseList chatbotId={chatbotId} key={refreshKey} />
    </div>
  )
}
