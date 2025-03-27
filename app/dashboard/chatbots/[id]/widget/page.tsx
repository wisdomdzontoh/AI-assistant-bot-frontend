import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WidgetCustomizer } from "../../../../components/chatbots/widget-customizer"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Widget Customization - ChatWise",
  description: "Customize your chatbot widget",
}

export default function WidgetCustomizationPage({ params }: { params: { id: string } }) {
  const chatbotId = Number(params.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/chatbots/${params.id}`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Widget Customization</h1>
          <p className="text-muted-foreground">Customize how your chatbot appears on your website</p>
        </div>
      </div>

      <WidgetCustomizer chatbotId={chatbotId} />
    </div>
  )
}


