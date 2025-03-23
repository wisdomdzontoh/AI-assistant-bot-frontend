"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileUploader } from "../../components/chatbots/file-uploader"
import { WebsiteCrawler } from "../../components/chatbots/website-crawler"
import { toast } from "sonner"
import { FileText, Globe, MessageSquare, Plus, RefreshCw, Trash2 } from "lucide-react"

interface ChatbotTrainingProps {
  id: string
}

export function ChatbotTraining({ id }: ChatbotTrainingProps) {
  const [trainingInProgress, setTrainingInProgress] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)

  const startTraining = () => {
    setTrainingInProgress(true)
    setTrainingProgress(0)

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTrainingInProgress(false)
          toast.success("Training completed successfully!")
          return 100
        }
        return prev + 10
      })
    }, 800)
  }

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
                <p className="text-sm text-muted-foreground">Last trained: 2 days ago</p>
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
          <TabsTrigger value="custom">Custom Content</TabsTrigger>
          <TabsTrigger value="qa">Q&A Pairs</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Training</CardTitle>
              <CardDescription>Upload documents to train your chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader />

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Uploaded Documents</h3>
                <div className="space-y-3">
                  {["Product Manual.pdf", "FAQ Document.docx", "Technical Specifications.pdf"].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span>{doc}</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="websites">
          <Card>
            <CardHeader>
              <CardTitle>Website Crawling</CardTitle>
              <CardDescription>Train your chatbot by crawling website content</CardDescription>
            </CardHeader>
            <CardContent>
              <WebsiteCrawler />

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Crawled Websites</h3>
                <div className="space-y-3">
                  {["https://example.com/support", "https://example.com/faq"].map((url, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <span>{url}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">12 pages</Badge>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Content</CardTitle>
              <CardDescription>Add custom text content for training</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content-title">Content Title</Label>
                  <Input id="content-title" placeholder="e.g. Refund Policy" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="content-text">Content</Label>
                  <Textarea
                    id="content-text"
                    placeholder="Enter your custom content here..."
                    className="mt-1 min-h-[200px]"
                  />
                </div>

                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Content
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Saved Content</h3>
                <div className="space-y-3">
                  {["Refund Policy", "Shipping Information", "Privacy Policy"].map((title, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <span>{title}</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qa">
          <Card>
            <CardHeader>
              <CardTitle>Q&A Pairs</CardTitle>
              <CardDescription>Define specific question and answer pairs for your chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="question">Question</Label>
                  <Input id="question" placeholder="e.g. What is your return policy?" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea
                    id="answer"
                    placeholder="e.g. Our return policy allows returns within 30 days of purchase..."
                    className="mt-1 min-h-[150px]"
                  />
                </div>

                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Q&A Pair
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Saved Q&A Pairs</h3>
                <div className="space-y-3">
                  {["What is your return policy?", "How do I track my order?", "Do you ship internationally?"].map(
                    (question, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{question}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {
                              [
                                "Our return policy allows returns within 30 days of purchase with original receipt.",
                                "You can track your order by logging into your account or using the tracking number in your confirmation email.",
                                "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
                              ][i]
                            }
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

