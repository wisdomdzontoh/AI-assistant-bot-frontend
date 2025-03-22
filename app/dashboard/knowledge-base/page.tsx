import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Globe, Plus, Trash2, ExternalLink, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const metadata: Metadata = {
  title: "Knowledge Base - ChatWise",
  description: "Manage your AI knowledge base",
}

// Mock data for knowledge base
const documents = [
  {
    id: "1",
    name: "Product Manual.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2023-09-15",
    status: "processed",
  },
  {
    id: "2",
    name: "FAQ Document.docx",
    type: "DOCX",
    size: "1.2 MB",
    uploadedAt: "2023-09-10",
    status: "processed",
  },
  {
    id: "3",
    name: "Technical Specifications.pdf",
    type: "PDF",
    size: "3.8 MB",
    uploadedAt: "2023-09-05",
    status: "processed",
  },
  {
    id: "4",
    name: "User Guide.pdf",
    type: "PDF",
    size: "5.1 MB",
    uploadedAt: "2023-09-01",
    status: "processing",
  },
]

const websites = [
  {
    id: "1",
    url: "https://example.com/support",
    lastCrawled: "2023-09-15",
    pages: 24,
    status: "active",
  },
  {
    id: "2",
    url: "https://example.com/faq",
    lastCrawled: "2023-09-10",
    pages: 12,
    status: "active",
  },
]

export default function KnowledgeBasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground">Manage the information your AI assistant can access</p>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="websites">Websites</TabsTrigger>
          <TabsTrigger value="custom">Custom Content</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>PDF, DOCX, and TXT files that your AI can reference</CardDescription>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploadedAt}</TableCell>
                      <TableCell>
                        <Badge
                          variant={doc.status === "processed" ? "outline" : "secondary"}
                          className={
                            doc.status === "processed" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                          }
                        >
                          {doc.status === "processed" ? "Processed" : "Processing"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="websites">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Crawled Websites</CardTitle>
                <CardDescription>Websites that your AI can reference for information</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Website
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL</TableHead>
                    <TableHead>Last Crawled</TableHead>
                    <TableHead>Pages</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {websites.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                          {site.url}
                        </div>
                      </TableCell>
                      <TableCell>{site.lastCrawled}</TableCell>
                      <TableCell>{site.pages}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-500 text-white">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Visit</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Content</CardTitle>
              <CardDescription>Add custom text content for your AI to learn from</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You can add custom text content that your AI assistant will use to answer questions.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

