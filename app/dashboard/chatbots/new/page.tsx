import type { Metadata } from "next"
import { CreateChatbotForm } from "../../../components/chatbots/create-chatbot-form"

export const metadata: Metadata = {
  title: "Create Chatbot - ChatWise",
  description: "Create a new AI chatbot for your business",
}

export default function NewChatbotPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Chatbot</h1>
        <p className="text-muted-foreground">Set up a new AI assistant tailored to your business needs</p>
      </div>

      <CreateChatbotForm />
    </div>
  )
}

