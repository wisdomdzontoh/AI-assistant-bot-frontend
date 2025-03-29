"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ChatbotService } from "@/app/lib/api-services/chatbot-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Form, FormControl, FormDescription, FormField, FormItem,
  FormLabel, FormMessage
} from "@/components/ui/form"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card"
import { WidgetPreview } from "../../components/chatbots/widget-preview"

const formSchema = z.object({
  widget_name: z.string().min(2),
  widget_welcome: z.string().min(5),
  widget_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: "Invalid hex color code." }),
  widget_position: z.enum(["right", "left"]),
  widget_show_branding: z.boolean(),
  widget_feedback: z.boolean(),
  widget_attachments: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

interface WidgetCustomizerProps {
  chatbotId: number
}

export function WidgetCustomizer({ chatbotId }: WidgetCustomizerProps) {
  const [preview, setPreview] = useState({
    chatbotName: "ChatWise Assistant",
    welcomeMessage: "Hello! How can I help you today?",
    primaryColor: "#3B82F6",
    position: "right" as "right" | "left",
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      widget_name: preview.chatbotName,
      widget_welcome: preview.welcomeMessage,
      widget_color: preview.primaryColor,
      widget_position: preview.position,
      widget_show_branding: true,
      widget_feedback: true,
      widget_attachments: false,
    },
  })

  // Load widget settings from API
  useEffect(() => {
    const load = async () => {
      try {
        const data = await ChatbotService.getChatbot(chatbotId)

        form.reset({
          widget_name: data.widget_name,
          widget_welcome: data.widget_welcome ?? "Hello! How can I help you today?",
          widget_color: data.widget_color,
          widget_position: data.widget_position,
          widget_show_branding: data.widget_show_branding,
          widget_feedback: data.widget_feedback,
          widget_attachments: data.widget_attachments,
        })

        setPreview({
          chatbotName: data.widget_name,
          welcomeMessage: data.widget_welcome ?? "Hello! How can I help you today?",
          primaryColor: data.widget_color,
          position: data.widget_position,
        })
      } catch (err) {
        console.error(err)
        toast.error("❌ Failed to load widget settings")
      }
    }

    load()
  }, [chatbotId, form])

  const onSubmit = async (values: FormValues) => {
    try {
      await ChatbotService.updateWidgetSettings(chatbotId, values)
      toast.success("✅ Widget settings saved")

      setPreview({
        chatbotName: values.widget_name,
        welcomeMessage: values.widget_welcome,
        primaryColor: values.widget_color,
        position: values.widget_position,
      })
    } catch (err) {
      console.error(err)
      toast.error("❌ Failed to save widget settings")
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Widget Customization</CardTitle>
          <CardDescription>Control your chat widget’s appearance and behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="widget_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chatbot Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormDescription>This appears in the chat header</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="widget_welcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Welcome Message</FormLabel>
                    <FormControl><Textarea {...field} /></FormControl>
                    <FormDescription>Initial message shown to users</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="widget_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <div className="flex gap-3">
                      <FormControl><Input type="text" {...field} /></FormControl>
                      <Input type="color" value={field.value} onChange={field.onChange} className="w-12 h-10 p-1" />
                    </div>
                    <FormDescription>Accent color for the widget</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="widget_position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Choose side" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="right">Bottom Right</SelectItem>
                        <SelectItem value="left">Bottom Left</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="widget_show_branding"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <FormLabel>Show Branding</FormLabel>
                      <FormDescription>Display “Powered by ChatWise”</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="widget_feedback"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <FormLabel>User Feedback</FormLabel>
                      <FormDescription>Allow thumbs up/down</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="widget_attachments"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <FormLabel>File Upload</FormLabel>
                      <FormDescription>Allow users to send files</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Save Widget Settings</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>Preview how the widget looks in real-time</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] bg-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-muted-foreground">Website Preview</p>
          </div>
          <WidgetPreview
            chatbotId={chatbotId}
            chatbotName={preview.chatbotName}
            welcomeMessage={preview.welcomeMessage}
            primaryColor={preview.primaryColor}
            position={preview.position}
            showBranding={form.watch("widget_show_branding")}
            allowFeedback={form.watch("widget_feedback")}
            allowAttachments={form.watch("widget_attachments")}
          />
        </CardContent>
      </Card>
    </div>
  )
}
