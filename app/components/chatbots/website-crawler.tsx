"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Globe, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form, FormControl, FormDescription, FormField, FormItem,
  FormLabel, FormMessage
} from "@/components/ui/form"

import { ChatbotService } from "@/app/lib/api-services/chatbot-service"

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  maxPages: z.number().min(1).max(100),
  includeSubdomains: z.boolean().default(false),
  followExternalLinks: z.boolean().default(false),
})

interface WebsiteCrawlerProps {
  chatbotId: number
  onCrawlSuccess?: () => void
}

export function WebsiteCrawler({ chatbotId, onCrawlSuccess }: WebsiteCrawlerProps) {
  const [crawling, setCrawling] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      maxPages: 10,
      includeSubdomains: false,
      followExternalLinks: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setCrawling(true)
    toast.info(`Submitting ${values.url} for crawling...`)

    try {
      await ChatbotService.crawlWebsite(chatbotId, values)
      toast.success("Crawling job started.")
      form.reset()
      onCrawlSuccess?.()
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Crawl request failed.")
    } finally {
      setCrawling(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input placeholder="https://example.com" {...field} />
                </div>
              </FormControl>
              <FormDescription>Enter the URL of the website you want to crawl</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxPages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Pages</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>Limit the number of pages to crawl (1–100)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="includeSubdomains"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">Include subdomains</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="followExternalLinks"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">Follow external links</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={crawling}>
          {crawling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Crawling...
            </>
          ) : (
            "Start Crawling"
          )}
        </Button>
      </form>
    </Form>
  )
}
