import type { Metadata } from "next"
import { LiveChat } from "@/app/components/conversations/live-chat"

export const metadata: Metadata = {
  title: "Conversations - ChatWise",
  description: "View and manage customer conversations",
}

export default function ConversationsPage() {
  return (
    <main className="space-y-6 px-4 md:px-8 py-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
        <p className="text-muted-foreground">
          View and manage customer conversations with your AI assistants.
        </p>
      </header>

      <LiveChat />
    </main>
  )
}
