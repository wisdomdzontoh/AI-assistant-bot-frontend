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

  if (loading || !analytics) return <p className="text-muted-foreground"><Loader /></p>

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
        <StatCard title="Total Conversations" value={analytics.total_conversations} description="All-time conversations" icon={<MessageSquare className="h-4 w-4" />} trend={{ value: 12, positive: true }} />
        <StatCard title="Unique Users" value={analytics.unique_users} description="Distinct users" icon={<Users className="h-4 w-4" />} trend={{ value: 8, positive: true }} />
        <StatCard title="Avg. Response Time" value={analytics.avg_response_time} description="Time to generate response" icon={<Clock className="h-4 w-4" />} trend={{ value: 5, positive: true }} />
        <StatCard title="Satisfaction Rate" value={analytics.satisfaction_rate} description="Based on user feedback" icon={<ThumbsUp className="h-4 w-4" />} trend={{ value: 2, positive: true }} />
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
                <LineChart data={analytics.conversation_data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="conversations" stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 8 }} />
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
                <BarChart data={analytics.top_questions || []} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="content"
                    width={200}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value: string) => value.length > 40 ? value.slice(0, 37) + "..." : value}
                  />
                  <Tooltip formatter={(value: any, name: any, props: any) => [`${value}`, props.payload.question]} />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 4, 4]} />
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
                <LineChart data={analytics.feedback_data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="positive" stroke="var(--chart-1)" strokeWidth={2} activeDot={{ r: 8 }} />
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
    </div>
  )
}