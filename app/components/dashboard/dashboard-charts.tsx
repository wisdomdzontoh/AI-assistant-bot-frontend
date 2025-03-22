"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

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

export function DashboardCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Analytics</CardTitle>
        <CardDescription>Number of conversations and responses over time</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
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
  )
}

