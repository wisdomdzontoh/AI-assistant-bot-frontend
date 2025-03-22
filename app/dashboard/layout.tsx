"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Toaster } from "sonner"
import { AuthProvider, useAuth } from "../contexts/auth-context"
import { NavigationProvider, useNavigation } from "../contexts/navigation-context"
import { DashboardSidebar } from "../components/dashboard/sidebar"
import { Topbar } from "../components/dashboard/topbar"
import { LoadingScreen } from "@/components/ui/loading-screen"

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { loading: authLoading, user } = useAuth()
  const { isNavigating } = useNavigation()
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [authLoading, user, router])

  if (authLoading) {
    return <LoadingScreen message="Loading your account..." />
  }

  // Don't render dashboard until we have a user
  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {isNavigating && <LoadingScreen />}
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NavigationProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
        <Toaster position="top-right" />
      </NavigationProvider>
    </AuthProvider>
  )
}

