import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Subscription - ChatWise",
  description: "Manage your ChatWise subscription",
}

export default function SubscriptionPage() {
  // Mock data for current plan
  const currentPlan = {
    name: "Professional",
    price: "$79",
    billingCycle: "monthly",
    nextBillingDate: "October 15, 2023",
    status: "active",
  }

  // Mock data for usage
  const usage = {
    messages: {
      used: 1245,
      limit: 3000,
      percentage: 41.5,
    },
    assistants: {
      used: 2,
      limit: 3,
      percentage: 66.7,
    },
    storage: {
      used: 256,
      limit: 1024,
      percentage: 25,
    },
  }

  // Mock data for billing history
  const billingHistory = [
    {
      id: "1",
      date: "September 15, 2023",
      amount: "$79.00",
      status: "Paid",
    },
    {
      id: "2",
      date: "August 15, 2023",
      amount: "$79.00",
      status: "Paid",
    },
    {
      id: "3",
      date: "July 15, 2023",
      amount: "$79.00",
      status: "Paid",
    },
  ]

  // Features included in the current plan
  const features = [
    "3 AI assistants",
    "3,000 messages/month",
    "Advanced knowledge base",
    "Custom persona builder",
    "Analytics dashboard",
    "Human takeover",
    "20 training documents",
    "Multi-language support",
  ]

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
                Active
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Next billing date: {currentPlan.nextBillingDate}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Usage this month</h4>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Messages</span>
                    <span>
                      {usage.messages.used} / {usage.messages.limit}
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${usage.messages.percentage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>AI Assistants</span>
                    <span>
                      {usage.assistants.used} / {usage.assistants.limit}
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${usage.assistants.percentage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Storage (MB)</span>
                    <span>
                      {usage.storage.used} / {usage.storage.limit}
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${usage.storage.percentage}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline">Change Plan</Button>
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
          <CardFooter className="border-t pt-6">
            <Button className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              Update Payment Method
            </Button>
          </CardFooter>
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
              {billingHistory.map((invoice) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

