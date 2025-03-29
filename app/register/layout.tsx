import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create Account - ChatWise",
    description: "Create a new ChatWise account for your organization",
  }

export default function RegisterPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}