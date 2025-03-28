"use client"

import { useEffect, useState } from "react"
import { SubscriptionService } from "@/app/lib/api-services/subscription-service"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Check, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Define proper types for the Plan
interface Plan {
  id: number
  name: string
  price: number
  max_chatbots: number
  max_messages_per_month: number
  features: string[]
  is_popular?: boolean
}

export default function PlanSelectorModal({
  open,
  onClose,
  currentPlanId,
}: {
  open: boolean
  onClose: () => void
  currentPlanId?: number
}) {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [processingPlanId, setProcessingPlanId] = useState<number | null>(null)

  useEffect(() => {
    if (open) {
      setLoading(true)
      SubscriptionService.getPlans()
        .then((data) => {
          // Add features array if it doesn't exist in the API response
          const plansWithFeatures = data.map((plan: any) => ({
            ...plan,
            features:
              plan.features ||
              [
                `${plan.max_chatbots} AI assistants`,
                `${plan.max_messages_per_month} messages/month`,
                "Knowledge base integration",
                "Email support",
                plan.max_chatbots > 1 ? "Team collaboration" : "",
                plan.price >= 79 ? "Custom branding" : "",
                plan.price >= 79 ? "API access" : "",
              ].filter(Boolean),
          }))
          setPlans(plansWithFeatures)
        })
        .catch(() => toast.error("Failed to load subscription plans"))
        .finally(() => setLoading(false))
    }
  }, [open])

  const subscribeToPlan = async (planId: number) => {
    try {
      setProcessingPlanId(planId)
      const res = await SubscriptionService.createCheckoutSession(planId)
      window.location.href = res.checkout_url
    } catch (err) {
      toast.error("Checkout session creation failed")
      setProcessingPlanId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose Your Plan</DialogTitle>
          <DialogDescription>
            Select the plan that best fits your needs. All plans include a 14-day free trial.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 py-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col relative ${plan.is_popular ? "border-primary shadow-md" : ""}`}
              >
                {plan.is_popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
                )}
                {currentPlanId === plan.id && (
                  <Badge className="absolute -top-2 right-4 bg-green-500">Current Plan</Badge>
                )}
                <CardHeader className="pb-2">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>
                    {plan.max_chatbots > 1
                      ? `For teams with up to ${plan.max_chatbots} assistants`
                      : "Perfect for individuals and small businesses"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow px-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => subscribeToPlan(plan.id)}
                    disabled={processingPlanId === plan.id || currentPlanId === plan.id}
                    variant={plan.is_popular ? "default" : "outline"}
                  >
                    {processingPlanId === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : currentPlanId === plan.id ? (
                      "Current Plan"
                    ) : (
                      "Select Plan"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

