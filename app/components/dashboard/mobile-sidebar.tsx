"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  Code,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "../../contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      title: "Overview",
      icon: BarChart,
      href: "/dashboard",
      variant: "default",
    },
    {
      title: "Chatbots",
      icon: MessageSquare,
      href: "/dashboard/chatbots",
      variant: "default",
    },
    {
      title: "Conversations",
      icon: MessageSquare,
      href: "/dashboard/conversations",
      variant: "default",
    },
    {
      title: "Knowledge Base",
      icon: FileText,
      href: "/dashboard/knowledge-base",
      variant: "default",
    },
    {
      title: "Subscription",
      icon: CreditCard,
      href: "/dashboard/subscription",
      variant: "default",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      variant: "default",
    },
    {
      title: "Embed Code",
      icon: Code,
      href: "/dashboard/embed",
      variant: "default",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <div className="border-b px-6 py-5 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-[oklch(0.488_0.243_264.376)] to-[oklch(0.551_0.027_264.364)] text-transparent bg-clip-text">
              ChatWise
            </span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === route.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                <route.icon className="h-5 w-5" />
                <span>{route.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t p-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/support"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help & Support</span>
            </Link>

            <Button
              variant="ghost"
              className="justify-start px-2 text-muted-foreground hover:text-destructive"
              onClick={() => {
                logout()
                setOpen(false)
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

