import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings - ChatWise",
  description: "Manage your profile and organization",
}

export default function SettingsPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}