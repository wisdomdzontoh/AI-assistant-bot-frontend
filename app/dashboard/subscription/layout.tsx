import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Knowledge Base - ChatWise",
  description: "Manage your AI knowledge base",
}

export default function SubscriptionPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}