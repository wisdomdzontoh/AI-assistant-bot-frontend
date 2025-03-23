import type { Metadata } from "next"
import { LiveChat } from "../../components/conversations/live-chat"

export const metadata: Metadata = {
  title: "Conversations - ChatWise",
  description: "View and manage customer conversations",
}

export default function ConversationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
        <p className="text-muted-foreground">View and manage customer conversations</p>
      </div>

      <LiveChat />
    </div>
  )
}

