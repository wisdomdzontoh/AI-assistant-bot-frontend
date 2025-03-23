"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WidgetPreview } from "../../components/chatbots/widget-preview"

const formSchema = z.object({
  chatbotName: z.string().min(2, {
    message: "Chatbot name must be at least 2 characters.",
  }),
  welcomeMessage: z.string().min(5, {
    message: "Welcome message must be at least 5 characters.",
  }),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  position: z.enum(["right", "left"]),
  showBranding: z.boolean().default(true),
  enableAttachments: z.boolean().default(false),
  enableFeedback: z.boolean().default(true),
})

export function WidgetCustomizer() {
  const [previewSettings, setPreviewSettings] = useState({
    chatbotName: "ChatWise Assistant",
    welcomeMessage: "Hello! How can I help you today?",
    primaryColor: "#3B82F6",
    position: "right" as const,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chatbotName: "ChatWise Assistant",
      welcomeMessage: "Hello! How can I help you today?",
      primaryColor: "#3B82F6",
      position: "right",
      showBranding: true,
      enableAttachments: false,
      enableFeedback: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPreviewSettings({
      chatbotName: values.chatbotName,
      welcomeMessage: values.welcomeMessage,
      primaryColor: values.primaryColor,
      position: values.position,
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Widget Customization</CardTitle>
          <CardDescription>Customize the appearance and behavior of your chat widget</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="chatbotName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chatbot Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>The name displayed in the chat header</FormDescription>
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
                    <FormDescription>The first message users will see</FormDescription>
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
                    <FormDescription>The main color for your chat widget</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Widget Position</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="right">Bottom Right</SelectItem>
                        <SelectItem value="left">Bottom Left</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Where the chat widget appears on your website</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showBranding"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Show Branding</FormLabel>
                      <FormDescription>Display "Powered by ChatWise" in the widget</FormDescription>
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
                      <FormDescription>Allow users to upload files</FormDescription>
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
                      <FormDescription>Allow users to rate responses</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">Update Preview</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Widget Preview</CardTitle>
          <CardDescription>See how your chat widget will appear on your website</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] bg-gray-100 rounded-md relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Your website content</p>
          </div>
          <WidgetPreview
            chatbotName={previewSettings.chatbotName}
            welcomeMessage={previewSettings.welcomeMessage}
            primaryColor={previewSettings.primaryColor}
            position={previewSettings.position}
          />
        </CardContent>
      </Card>
    </div>
  )
}

