"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploadForm } from "../../components/knowledge-base/file-upload-form"
import { TextEntryForm } from "../../components/knowledge-base/text-entry-form"
import { UrlEntryForm } from "../../components/knowledge-base/url-entry-form"
import { KnowledgeBaseList } from "../../components/knowledge-base/knowledge-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from "next/navigation"



export default function KnowledgeBasePage() {
  const params = useParams()
  const chatbotId = Number(params?.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground">Manage the documents, content, and websites your AI assistant can learn from.</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="text">Custom Text</TabsTrigger>
          <TabsTrigger value="url">Website URLs</TabsTrigger>
          <TabsTrigger value="all">All Knowledge</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>Upload PDFs, DOCX, TXT and other reference materials</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadForm chatbotId={chatbotId} onSuccess={() => { /* handle success */ }} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Add Custom Text</CardTitle>
              <CardDescription>Paste policies, internal docs or any manual content here</CardDescription>
            </CardHeader>
            <CardContent>
              <TextEntryForm chatbotId={chatbotId} onSuccess={() => { /* handle success */ }} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="url">
          <Card>
            <CardHeader>
              <CardTitle>Crawl a Website</CardTitle>
              <CardDescription>Add URLs and crawl public content into your assistant's knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <UrlEntryForm chatbotId={chatbotId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>All uploaded knowledge across formats</CardDescription>
            </CardHeader>
            <CardContent>
              <KnowledgeBaseList chatbotId={chatbotId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
