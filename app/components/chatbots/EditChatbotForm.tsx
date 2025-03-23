"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { ChatbotService } from "../../lib/api-services/chatbot-service"
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, { message: "Chatbot name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  welcomeMessage: z.string().min(5, { message: "Welcome message must be at least 5 characters." }),
  persona: z.string(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
})

export function EditChatbotForm() {
  const router = useRouter()
  const { id } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      welcomeMessage: "",
      persona: "professional",
      primaryColor: "#3B82F6",
    },
  })

  useEffect(() => {
    const loadChatbot = async () => {
      try {
        const chatbots = await ChatbotService.getChatbots()
        const bot = chatbots.find((b) => b.id === Number(id))
        if (!bot) {
          toast.error("Chatbot not found")
          router.push("/dashboard/chatbots")
          return
        }

        form.reset({
          name: bot.name,
          description: bot.description || "",
          welcomeMessage: bot.welcome_message || "",
          persona: bot.persona || "professional",
          primaryColor: bot.primary_color || "#3B82F6",
        })
      } catch (error) {
        toast.error("Failed to load chatbot")
      } finally {
        setLoading(false)
      }
    }

    loadChatbot()
  }, [id, form, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const payload = {
        name: values.name,
        description: values.description,
        welcome_message: values.welcomeMessage,
        persona: values.persona,
        primary_color: values.primaryColor,
        instructions: `${values.welcomeMessage}\n\nPersona: ${values.persona}`,
        is_active: true,
      }

      await ChatbotService.updateChatbot(Number(id), payload)
      toast.success("Chatbot updated successfully!")
      router.push("/dashboard/chatbots")
    } catch (error) {
      toast.error("Failed to update chatbot. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading chatbot data...</p>
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Chatbot</CardTitle>
        <CardDescription>Update your AI assistant’s settings and behavior</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chatbot Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Support Assistant" {...field} />
                  </FormControl>
                  <FormDescription>This name will be displayed to users in the chat widget.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g. This chatbot helps with support inquiries" {...field} />
                  </FormControl>
                  <FormDescription>A short internal description of what this chatbot does.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="welcomeMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Welcome Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g. Hello! How can I help you today?" {...field} />
                  </FormControl>
                  <FormDescription>This message is shown to users when the chat starts.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="persona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chatbot Persona</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a persona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Controls tone and language used by the bot.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Color</FormLabel>
                  <div className="flex gap-3">
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <Input type="color" value={field.value} onChange={field.onChange} className="w-12 h-10 p-1" />
                  </div>
                  <FormDescription>Used to theme the chat widget. Use a hex color code.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/chatbots")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
