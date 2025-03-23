"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileUploader } from "../../components/chatbots/file-uploader"
import { WebsiteCrawler } from "../../components/chatbots/website-crawler"
import { toast } from "sonner"
import { FileText, Globe, MessageSquare, Plus, RefreshCw, Trash2 } from "lucide-react"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"




interface ChatbotTrainingProps {
  id: string
}

export function ChatbotTraining({ id }: ChatbotTrainingProps) {
  const chatbotId = Number(id)
  const [trainingInProgress, setTrainingInProgress] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [knowledge, setKnowledge] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchKnowledge = async () => {
    try {
      setLoading(true)
      const data = await ChatbotService.getKnowledge(chatbotId)
      setKnowledge(data)
    } catch (err) {
      toast.error("Failed to fetch knowledge base")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKnowledge()
  }, [chatbotId])

  const startTraining = async () => {
    setTrainingInProgress(true)
    setTrainingProgress(0)

    try {
      await ChatbotService.trainChatbot(chatbotId)

      const interval = setInterval(() => {
        setTrainingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTrainingInProgress(false)
            toast.success("Training completed successfully!")
            fetchKnowledge()
            return 100
          }
          return prev + 10
        })
      }, 500)
    } catch (error) {
      toast.error("Training failed. Please try again.")
      setTrainingInProgress(false)
    }
  }

  const documents = knowledge.filter((k) => k.source_type === "upload")
  const websites = knowledge.filter((k) => k.source_type === "url")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Training Status</CardTitle>
          <CardDescription>Current training status and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Training Status</p>
                <p className="text-sm text-muted-foreground">Triggered manually</p>
              </div>
              <Badge
                variant={trainingInProgress ? "secondary" : "outline"}
                className={trainingInProgress ? "bg-amber-500 text-white" : ""}
              >
                {trainingInProgress ? "Training in Progress" : "Ready for Training"}
              </Badge>
            </div>

            {trainingInProgress && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Training Progress</span>
                  <span>{trainingProgress}%</span>
                </div>
                <Progress value={trainingProgress} />
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={startTraining} disabled={trainingInProgress}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {trainingInProgress ? "Training..." : "Start Training"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="websites">Websites</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>Train your chatbot using PDFs, DOCs, or text files</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader chatbotId={chatbotId} />
              <div className="mt-6 space-y-3">
                {documents.length === 0 && <p className="text-muted-foreground text-sm">No documents yet.</p>}
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>{doc.title}</span>
                    </div>
                    <Badge variant="outline">
                      {doc.embedded ? "✅ Trained" : "❌ Not Trained"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="websites">
          <Card>
            <CardHeader>
              <CardTitle>Crawled Websites</CardTitle>
              <CardDescription>Train your chatbot by crawling public URLs</CardDescription>
            </CardHeader>
            <CardContent>
              <WebsiteCrawler chatbotId={chatbotId} />
              <div className="mt-6 space-y-3">
                {websites.length === 0 && <p className="text-muted-foreground text-sm">No crawled URLs yet.</p>}
                {websites.map((site) => (
                  <div key={site.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <span>{site.title}</span>
                    </div>
                    <Badge variant="outline">
                      {site.embedded ? "✅ Trained" : "❌ Not Trained"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
