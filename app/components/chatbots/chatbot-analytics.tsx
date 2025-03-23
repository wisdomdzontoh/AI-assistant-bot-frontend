"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { StatCard } from "../../components/dashboard/stat-card"
import { MessageSquare, Users, Clock, ThumbsUp, Download } from "lucide-react"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

interface ChatbotAnalyticsProps {
  id: string
}

// Mock data for the analytics
const conversationData = [
  { date: "Jan 1", conversations: 45, responses: 120 },
  { date: "Jan 8", conversations: 52, responses: 143 },
  { date: "Jan 15", conversations: 49, responses: 132 },
  { date: "Jan 22", conversations: 63, responses: 156 },
  { date: "Jan 29", conversations: 58, responses: 149 },
  { date: "Feb 5", conversations: 64, responses: 162 },
  { date: "Feb 12", conversations: 72, responses: 187 },
]

const topQuestionsData = [
  { question: "How do I reset my password?", count: 42 },
  { question: "What are your business hours?", count: 38 },
  { question: "How do I track my order?", count: 35 },
  { question: "Do you offer refunds?", count: 29 },
  { question: "How do I contact customer support?", count: 24 },
]

const feedbackData = [
  { date: "Jan 1", positive: 32, negative: 8 },
  { date: "Jan 8", positive: 38, negative: 6 },
  { date: "Jan 15", positive: 30, negative: 10 },
  { date: "Jan 22", positive: 40, negative: 5 },
  { date: "Jan 29", positive: 35, negative: 7 },
  { date: "Feb 5", positive: 42, negative: 4 },
  { date: "Feb 12", positive: 45, negative: 3 },
]

export function ChatbotAnalytics({ id }: ChatbotAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          title="Total Conversations"
          value="532"
          description="All-time conversations"
          icon={<MessageSquare className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Unique Users"
          value="328"
          description="Distinct users"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Avg. Response Time"
          value="1.2s"
          description="Time to generate response"
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title="Satisfaction Rate"
          value="94%"
          description="Based on user feedback"
          icon={<ThumbsUp className="h-4 w-4" />}
          trend={{ value: 2, positive: true }}
        />
      </div>

      <Tabs defaultValue="conversations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="questions">Top Questions</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Analytics</CardTitle>
              <CardDescription>Number of conversations and responses over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="conversations"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="responses" stroke="var(--chart-2)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Top Questions</CardTitle>
              <CardDescription>Most frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topQuestionsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="question" width={150} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback</CardTitle>
              <CardDescription>Positive and negative feedback over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={feedbackData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="positive"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="negative" stroke="var(--destructive)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
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

      <Card>
        <CardHeader>
          <CardTitle>Conversation Insights</CardTitle>
          <CardDescription>Key insights from user conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Common Topics</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Account Issues</span>
                    <span className="text-sm text-muted-foreground">32%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Product Information</span>
                    <span className="text-sm text-muted-foreground">28%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Shipping & Delivery</span>
                    <span className="text-sm text-muted-foreground">18%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Returns & Refunds</span>
                    <span className="text-sm text-muted-foreground">12%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Other</span>
                    <span className="text-sm text-muted-foreground">10%</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">User Sentiment</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Positive</span>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Neutral</span>
                    <span className="text-sm text-muted-foreground">25%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Negative</span>
                    <span className="text-sm text-muted-foreground">10%</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Improvement Suggestions</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Add more information about shipping policies to reduce related questions</li>
                <li>Improve password reset flow based on frequent account access issues</li>
                <li>Enhance product descriptions to address common product questions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

