"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Starter",
      price: {
        monthly: "$29",
        yearly: "$290",
      },
      description: "Perfect for small businesses just getting started with AI support.",
      features: [
        "1 AI assistant",
        "500 messages/month",
        "Basic knowledge base",
        "Website widget",
        "Email support",
        "5 training documents",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: {
        monthly: "$79",
        yearly: "$790",
      },
      description: "Ideal for growing businesses with moderate support volume.",
      features: [
        "3 AI assistants",
        "3,000 messages/month",
        "Advanced knowledge base",
        "Custom persona builder",
        "Analytics dashboard",
        "Human takeover",
        "20 training documents",
        "Multi-language support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: {
        monthly: "Custom",
        yearly: "Custom",
      },
      description: "For large organizations with complex support needs.",
      features: [
        "Unlimited AI assistants",
        "Unlimited messages",
        "Full knowledge base",
        "Priority support",
        "Custom integrations",
        "Team collaboration",
        "Unlimited training documents",
        "White-labeling",
        "API access",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const comparisonFeatures = [
    { name: "AI Assistants", starter: "1", professional: "3", enterprise: "Unlimited" },
    { name: "Monthly Messages", starter: "500", professional: "3,000", enterprise: "Unlimited" },
    { name: "Knowledge Base", starter: "Basic", professional: "Advanced", enterprise: "Full" },
    { name: "Training Documents", starter: "5", professional: "20", enterprise: "Unlimited" },
    { name: "Website Widget", starter: true, professional: true, enterprise: true },
    { name: "Custom Persona", starter: false, professional: true, enterprise: true },
    { name: "Multi-language Support", starter: false, professional: true, enterprise: true },
    { name: "Analytics Dashboard", starter: false, professional: true, enterprise: true },
    { name: "Human Takeover", starter: false, professional: true, enterprise: true },
    { name: "Team Collaboration", starter: false, professional: false, enterprise: true },
    { name: "White-labeling", starter: false, professional: false, enterprise: true },
    { name: "API Access", starter: false, professional: false, enterprise: true },
    { name: "Priority Support", starter: false, professional: false, enterprise: true },
  ]

  return (
    <section id="pricing" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>

          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Label htmlFor="billing-toggle" className={billingCycle === "monthly" ? "font-medium" : ""}>
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
              />
              <div className="flex items-center">
                <Label htmlFor="billing-toggle" className={billingCycle === "yearly" ? "font-medium" : ""}>
                  Yearly
                </Label>
                <Badge variant="outline" className="ml-2 bg-green-500 text-white">
                  Save 20%
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="cards" className="space-y-8">
          <TabsList className="mx-auto">
            <TabsTrigger value="cards">Plan Cards</TabsTrigger>
            <TabsTrigger value="comparison">Feature Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`flex flex-col relative overflow-hidden ${
                    plan.popular ? "border-blue-500 shadow-lg" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-6 translate-y-3">
                        POPULAR
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                      {plan.price[billingCycle]}
                      {plan.price[billingCycle] !== "Custom" && (
                        <span className="ml-1 text-xl font-medium text-muted-foreground">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      )}
                    </div>
                    <CardDescription className="mt-4">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${plan.popular ? "bg-blue-500 hover:bg-blue-600" : ""}`}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <div className="rounded-lg border overflow-hidden max-w-6xl mx-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[300px]">Feature</TableHead>
                    <TableHead>Starter</TableHead>
                    <TableHead>Professional</TableHead>
                    <TableHead>Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonFeatures.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{feature.name}</TableCell>
                      <TableCell>
                        {typeof feature.starter === "boolean" ? (
                          feature.starter ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground" />
                          )
                        ) : (
                          feature.starter
                        )}
                      </TableCell>
                      <TableCell>
                        {typeof feature.professional === "boolean" ? (
                          feature.professional ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground" />
                          )
                        ) : (
                          feature.professional
                        )}
                      </TableCell>
                      <TableCell>
                        {typeof feature.enterprise === "boolean" ? (
                          feature.enterprise ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground" />
                          )
                        ) : (
                          feature.enterprise
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

