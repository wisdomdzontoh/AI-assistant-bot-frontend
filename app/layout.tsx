import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

import { ThemeProvider } from "@/app/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

// Load Inter font with expanded character subsets
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    template: "%s | ChatWise",
    default: "ChatWise - AI-Powered Customer Support Assistant",
  },
  description:
    "Transform your customer support with AI that understands your business. Train it on your docs, customize its persona, and watch it handle inquiries 24/7.",
  keywords: [
    "ai assistant",
    "customer support",
    "chatbot",
    "ai support",
    "business ai",
    "customer service",
    "support automation",
    "ai chatbot",
  ],
  authors: [
    {
      name: "ChatWise",
      url: "https://chatwise.example.com",
    },
  ],
  creator: "ChatWise",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chatwise.example.com",
    title: "ChatWise - AI-Powered Customer Support Assistant",
    description: "Transform your customer support with AI that understands your business.",
    siteName: "ChatWise",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatWise - AI-Powered Customer Support Assistant",
    description: "Transform your customer support with AI that understands your business.",
    creator: "@chatwise",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          "bg-background text-foreground",
          "selection:bg-primary/20 selection:text-primary",
          "relative",
        )}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Background pattern - fixed position with negative z-index */}
          <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

          {/* Main content container */}
          <div className="flex min-h-screen flex-col">{children}</div>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: "text-sm",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}

