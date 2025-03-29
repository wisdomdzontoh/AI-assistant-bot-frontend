import type { Metadata } from "next"
import EmbedPageClient from "./EmbedPageClient"

export const metadata: Metadata = {
  title: "Embed Code - ChatWise",
  description: "Get the code to embed your chatbot on your website",
}

export default function EmbedPage() {
  return <EmbedPageClient chatbotId={1} />
}

