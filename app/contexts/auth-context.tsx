"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access")
  
      if (!token) {
        setLoading(false)
        router.push("/login")
        return
      }
  
      try {
        const response = await API.get("/accounts/profile/")
        setUser(response.data)
      } catch (error) {
        console.error("Failed to fetch user:", error)
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
  
    fetchUser()
  }, [router])
  

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
    toast.success("Logged out successfully")
  }

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

