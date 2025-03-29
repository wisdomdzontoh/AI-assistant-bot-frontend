"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LogIn, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react"

import API from "@/app/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginForm() {
  const router = useRouter()
  const [form, setForm] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<{
    username?: string
    password?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))

    // Clear error when user types
    if (formErrors[id as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [id]: undefined }))
    }
  }

  const validateForm = () => {
    const errors: { username?: string; password?: string } = {}

    if (!form.username.trim()) {
      errors.username = "Username is required"
    }

    if (!form.password) {
      errors.password = "Password is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const res = await API.post("/accounts/login/", form)
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)

      toast.success("Login successful!")
      router.push("/dashboard")
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Invalid credentials"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-background to-muted/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_500px_at_50%_200px,var(--primary)/8%,transparent)]" />
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="flex flex-col items-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium transition-colors hover:text-primary gap-1.5 mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            ChatWise
          </h1>
        </div>

        <Card className="border-border/30 shadow-xl transition-all">
          <CardHeader className="space-y-1 pb-3">
            <CardTitle className="text-2xl font-semibold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
          </CardHeader>

          <CardContent className="pt-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  className={`transition-all ${formErrors.username ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                />
                {formErrors.username && (
                  <p className="text-destructive text-xs mt-1 animate-fade-in">{formErrors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    className={`pr-10 transition-all ${formErrors.password ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                {formErrors.password && (
                  <p className="text-destructive text-xs mt-1 animate-fade-in">{formErrors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full mt-6 transition-all" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign in</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>

          <Separator className="my-1" />

          <CardFooter className="flex flex-col p-6 gap-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline transition-colors">
                Create an account
              </Link>
            </div>

            <div className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

