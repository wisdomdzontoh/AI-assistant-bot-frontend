"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import API from "../lib/api"
import { toast } from "sonner"

type User = {
  id: string
  username: string
  email: string
  organization_name: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const refreshUser = async () => {
    const access = localStorage.getItem("access")

    if (!access) {
      setUser(null)
      return
    }

    try {
      const response = await API.get("/accounts/profile/")
      setUser(response.data)
      return response.data
    } catch (error) {
      console.error("Failed to fetch user:", error)
      // Only clear tokens on 401 Unauthorized errors
      if (error instanceof Error && (error as any).response?.status === 401) {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setUser(null)
      }
      return null
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)

      const access = localStorage.getItem("access")
      const refresh = localStorage.getItem("refresh")

      // If we're already on the login page and no tokens, don't redirect
      if ((!access || !refresh) && (pathname === "/login" || pathname === "/register")) {
        setLoading(false)
        return
      }

      // If no tokens, redirect to login
      if (!access || !refresh) {
        setLoading(false)
        router.push("/login")
        return
      }

      // Try to get user data
      try {
        const userData = await refreshUser()

        // If we got user data and we're on login page, redirect to dashboard
        if (userData && (pathname === "/login" || pathname === "/register")) {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [pathname, router])

  const logout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setUser(null)
    router.push("/login")
    toast.success("Logged out successfully")
  }

  return <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

