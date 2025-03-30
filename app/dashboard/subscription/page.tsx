"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SubscriptionService } from "@/app/lib/api-services/subscription-service"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"
import PlanSelectorModal from "@/app/components/subscription/PlanSelectorModal"
import { toast } from "sonner"

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [usage, setUsage] = useState({
    messages: { used: 0, limit: 0, percentage: 0 },
    assistants: { used: 0, limit: 0, percentage: 0 },
    storage: { used: 256, limit: 1024, percentage: 25 },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sub = await SubscriptionService.getCurrentSubscription()
        const plan = await SubscriptionService.getPlanById(sub.plan)
        const bots = await ChatbotService.getChatbots()

        const usedAssistants = bots.length
        const maxAssistants = plan.max_chatbots
        const usedMessages = 0 // Placeholder for message usage endpoint
        const maxMessages = plan.max_messages_per_month

        setCurrentPlan({
          name: plan.name,
          price: `$${plan.price}`,
          billingCycle: "monthly",
          nextBillingDate: sub.end_date,
          status: sub.is_active ? "active" : "inactive",
        })

        setUsage({
          messages: {
            used: usedMessages,
            limit: maxMessages,
            percentage: Math.min((usedMessages / maxMessages) * 100, 100),
          },
          assistants: {
            used: usedAssistants,
            limit: maxAssistants,
            percentage: Math.min((usedAssistants / maxAssistants) * 100, 100),
          },
          storage: usage.storage,
        })
      } catch (err) {
        toast.error("Failed to load subscription")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const features = [
    "Multiple AI assistants",
    "Advanced knowledge base",
    "Custom persona builder",
    "Analytics dashboard",
    "Human takeover",
    "Multi-language support",
  ]

  const billingHistory: any[] = []

  if (loading || !currentPlan) return <p>Loading...</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground">Manage your plan and billing information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your subscription details and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentPlan.price} / {currentPlan.billingCycle}
                </p>
              </div>
              <Badge variant="outline" className="bg-emerald-500 text-white">
                {currentPlan.status}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Next billing date: {currentPlan.nextBillingDate}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Usage this month</h4>
              <div className="space-y-2">
                <ProgressBar label="Messages" {...usage.messages} />
                <ProgressBar label="AI Assistants" {...usage.assistants} />
                <ProgressBar label="Storage (MB)" {...usage.storage} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={() => setShowPlanModal(true)}>Change Plan</Button>
            <Button variant="destructive">Cancel Subscription</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Features</CardTitle>
            <CardDescription>What's included in your {currentPlan.name} plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No billing history available.</TableCell>
                </TableRow>
              ) : (
                billingHistory.map((invoice: any) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-emerald-500 text-white">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PlanSelectorModal open={showPlanModal} onClose={() => setShowPlanModal(false)} />
    </div>
  )
}

function ProgressBar({ label, used, limit, percentage }: { label: string; used: number; limit: number; percentage: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span>
          {used} / {limit}
        </span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}