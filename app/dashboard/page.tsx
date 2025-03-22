import type { Metadata } from "next"
import { BarChart, MessageSquare, Users, FileText } from "lucide-react"
import { StatCard } from "../components/dashboard/stat-card"
import { ActivityList } from "../components/dashboard/activity-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardCharts } from "../components/dashboard/dashboard-charts"

export const metadata: Metadata = {
  title: "Dashboard - ChatWise",
  description: "AI Assistant Dashboard Overview",
}

// Mock data for the dashboard
const conversationData = [
  { date: "Jan", conversations: 120, responses: 100 },
  { date: "Feb", conversations: 150, responses: 130 },
  { date: "Mar", conversations: 200, responses: 180 },
  { date: "Apr", conversations: 180, responses: 160 },
  { date: "May", conversations: 250, responses: 230 },
  { date: "Jun", conversations: 300, responses: 280 },
  { date: "Jul", conversations: 350, responses: 320 },
]

const recentActivities = [
  {
    id: "1",
    user: { name: "John Doe" },
    action: 'Created a new chatbot "Sales Assistant"',
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: { name: "Jane Smith" },
    action: "Updated knowledge base with 5 new documents",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    user: { name: "Alex Johnson" },
    action: 'Changed chatbot settings for "Support Bot"',
    timestamp: "1 day ago",
  },
  {
    id: "4",
    user: { name: "Sarah Williams" },
    action: 'Added new team member "Mike Brown"',
    timestamp: "2 days ago",
  },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your AI assistant performance and activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Conversations"
          value="1,234"
          description="Across all chatbots"
          icon={<MessageSquare className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Active Users"
          value="856"
          description="Users engaging with your bots"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Knowledge Base"
          value="42"
          description="Documents in your knowledge base"
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title="Response Rate"
          value="94%"
          description="Successfully answered queries"
          icon={<BarChart className="h-4 w-4" />}
          trend={{ value: 2, positive: false }}
        />
      </div>

      <Tabs defaultValue="conversations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="conversations" className="space-y-4">
          <DashboardCharts />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>User engagement and activity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">User analytics content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Response times and accuracy metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Performance metrics content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <ActivityList activities={recentActivities} />

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-medium">Create a new chatbot</h3>
              <p className="text-sm text-muted-foreground">Set up a new AI assistant for your business</p>
            </div>
            <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-medium">Upload knowledge base documents</h3>
              <p className="text-sm text-muted-foreground">Add new content for your AI to learn from</p>
            </div>
            <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-medium">Customize chatbot appearance</h3>
              <p className="text-sm text-muted-foreground">Change colors, styles and branding</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

