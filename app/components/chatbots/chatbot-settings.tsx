"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem,
  FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"

interface ChatbotSettingsProps {
  id: string
}

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  welcomeMessage: z.string().min(5),
  persona: z.string(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  enableHumanHandoff: z.boolean(),
  enableFeedback: z.boolean(),
  enableAttachments: z.boolean(),
  maxResponseTokens: z.number().min(100).max(4000),
})

type ChatbotSettingsFormValues = z.infer<typeof formSchema>

export function ChatbotSettings({ id }: ChatbotSettingsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<ChatbotSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      welcomeMessage: "",
      persona: "professional",
      primaryColor: "#3B82F6",
      enableHumanHandoff: true,
      enableFeedback: true,
      enableAttachments: false,
      maxResponseTokens: 1000,
    },
  })

  // Load chatbot data
  useEffect(() => {
    const loadChatbot = async () => {
      try {
        const data = await ChatbotService.getChatbot(Number(id))
        form.reset({
          name: data.name,
          description: data.description,
          welcomeMessage: data.welcome_message,
          persona: data.persona,
          primaryColor: data.primary_color,
          enableHumanHandoff: data.enable_human_handoff,
          enableFeedback: data.enable_feedback,
          enableAttachments: data.enable_attachments,
          maxResponseTokens: data.max_response_tokens || 1000,
        })
      } catch (err) {
        toast.error("Failed to load chatbot")
      } finally {
        setIsLoading(false)
      }
    }

    loadChatbot()
  }, [id, form])

  const onSubmit = async (values: ChatbotSettingsFormValues) => {
    setIsSubmitting(true)
    try {
      await ChatbotService.updateChatbot(Number(id), {
        name: values.name,
        description: values.description,
        welcome_message: values.welcomeMessage,
        persona: values.persona,
        primary_color: values.primaryColor,
        enable_feedback: values.enableFeedback,
        enable_human_handoff: values.enableHumanHandoff,
        enable_attachments: values.enableAttachments,
        max_response_tokens: values.maxResponseTokens,
        is_active: true,
      })
      toast.success("Chatbot settings updated successfully!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to update chatbot settings.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await ChatbotService.deleteChatbot(Number(id))
      toast.success("Chatbot deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete chatbot")
    }
  }

  if (isLoading) return <p className="text-muted-foreground">Loading settings...</p>

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
            <CardHeader>
              <CardTitle>Basic Settings</CardTitle>
              <CardDescription>Configure the basic settings for your chatbot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chatbot Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>This name will be displayed to your users in the chat widget.</FormDescription>
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      A brief description of what this chatbot does (for your reference only).
                    </FormDescription>
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>The first message users will see when they start a conversation.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how your chatbot looks and behaves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                    <FormDescription>
                      The tone and style your chatbot will use when responding to users.
                    </FormDescription>
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
                    <FormDescription>The main color for your chatbot widget. Use a hex color code.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced features and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="enableHumanHandoff"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Human Handoff</FormLabel>
                      <FormDescription>Allow users to request to speak with a human agent</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableFeedback"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">User Feedback</FormLabel>
                      <FormDescription>Allow users to rate responses with thumbs up/down</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableAttachments"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">File Attachments</FormLabel>
                      <FormDescription>Allow users to upload files during conversations</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxResponseTokens"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Response Length</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={100}
                        max={4000}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Maximum number of tokens in each response (100-4000)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Chatbot
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your chatbot and all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

