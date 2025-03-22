"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import API from "../../lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { LogIn } from "lucide-react"
import { LoadingScreen } from "@/components/ui/loading-screen"

export default function LoginForm() {
  const router = useRouter()
  const [form, setForm] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await API.post("/accounts/login/", form)

      // Store both tokens with consistent naming
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)

      toast.success("Login successful!")

      // Set redirecting state to show loading screen
      setRedirecting(true)

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Invalid credentials"
      toast.error(errorMessage)
      setLoading(false)
    }
  }

  // If redirecting, show the loading screen
  if (redirecting) {
    return <LoadingScreen message="Redirecting to dashboard..." />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,oklch(0.488_0.243_264.376_/_0.12),oklch(0_0_0_/_0))]" />

      <Link
        href="/"
        className="mb-8 text-2xl font-bold bg-gradient-to-r from-[oklch(0.488_0.243_264.376)] to-[oklch(0.551_0.027_264.364)] text-transparent bg-clip-text"
      >
        ChatWise
      </Link>

      <Card className="w-full max-w-md shadow-xl border-border/40">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-1">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign in
                </span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 border-t p-6">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

