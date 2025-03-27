"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { StatCard } from "../../components/dashboard/stat-card"
import { MessageSquare, Users, Clock, ThumbsUp, Download, Loader } from "lucide-react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from "recharts"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"





interface ChatbotAnalyticsProps {
  id: string
}

export function ChatbotAnalytics({ id }: ChatbotAnalyticsProps) {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await ChatbotService.getAnalytics(Number(id))
        setAnalytics(data)
      } catch (err) {
        console.error("Failed to load analytics", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [id])

  if (loading || !analytics)
    return (
      <p className="text-muted-foreground flex items-center gap-2">
        <Loader className="animate-spin h-4 w-4" />
        Loading analytics...
      </p>
    )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          title="Total Conversations"
          value={Number(analytics.total_conversations).toLocaleString()}
          description="All-time conversations"
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <StatCard
          title="Unique Users"
          value={Number(analytics.unique_users).toLocaleString()}
          description="Distinct users"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Avg. Response Time"
          value={analytics.avg_response_time}
          description="Time to generate response"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Satisfaction Rate"
          value={analytics.satisfaction_rate}
          description="Based on user feedback"
          icon={<ThumbsUp className="h-4 w-4" />}
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
              <CardTitle>Conversation Trends</CardTitle>
              <CardDescription>Messages and sessions over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              {analytics.conversation_data?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.conversation_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="conversations" stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line dataKey="responses" stroke="var(--chart-2)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-sm">No conversation data available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Top Questions</CardTitle>
              <CardDescription>Most frequently asked by users</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              {analytics.top_questions?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.top_questions}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="content"
                      width={200}
                      tickFormatter={(value: string) =>
                        value.length > 40 ? value.slice(0, 37) + "..." : value
                      }
                    />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 4, 4]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-sm">No questions yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback</CardTitle>
              <CardDescription>Thumbs up and down over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              {analytics.feedback_data?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.feedback_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="positive" stroke="var(--chart-1)" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line dataKey="negative" stroke="var(--destructive)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-sm">No feedback trends yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Bot latency, fallbacks, etc.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Performance metrics will be added soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
