"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { UserPlus, Loader2, ArrowLeft, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react"

import API from "@/app/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    organization_name: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<{
    username?: string
    email?: string
    password?: string
    organization_name?: string
  }>({})

  // Password strength calculation
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0

    let strength = 0
    // Length check
    if (password.length >= 8) strength += 25
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25
    // Contains number or special char
    if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 25

    return strength
  }

  const passwordStrength = calculatePasswordStrength(formData.password)

  const getPasswordStrengthLabel = (strength: number): { label: string; color: string } => {
    if (strength === 0) return { label: "", color: "bg-muted" }
    if (strength <= 25) return { label: "Weak", color: "bg-destructive" }
    if (strength <= 50) return { label: "Fair", color: "bg-amber-500" }
    if (strength <= 75) return { label: "Good", color: "bg-amber-500" }
    return { label: "Strong", color: "bg-emerald-500" }
  }

  const strengthInfo = getPasswordStrengthLabel(passwordStrength)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const errors: {
      username?: string
      email?: string
      password?: string
      organization_name?: string
    } = {}

    if (!formData.username.trim()) {
      errors.username = "Username is required"
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      errors.password = "Password is required"
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    if (!formData.organization_name.trim()) {
      errors.organization_name = "Organization name is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      await API.post("/accounts/register/", formData)
      toast.success("Registration successful. Please login.")
      router.push("/login")
    } catch (error: any) {
      const detail =
        error.response?.data?.detail || Object.values(error.response?.data || {})[0] || "Registration failed"
      toast.error(Array.isArray(detail) ? detail[0] : detail)

      // Handle field-specific errors from API
      if (error.response?.data && typeof error.response.data === "object") {
        const apiErrors: Record<string, string[]> = error.response.data
        const newErrors: Record<string, string> = {}

        Object.entries(apiErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            newErrors[field] = messages[0]
          }
        })

        if (Object.keys(newErrors).length > 0) {
          setFormErrors((prev) => ({ ...prev, ...newErrors }))
        }
      }
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
            <CardTitle className="text-2xl font-semibold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to get started with ChatWise
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organization_name" className="text-sm font-medium">
                  Organization Name
                </Label>
                <Input
                  id="organization_name"
                  name="organization_name"
                  placeholder="e.g. Acme Corp"
                  value={formData.organization_name}
                  onChange={handleChange}
                  className={`transition-all ${formErrors.organization_name ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                />
                {formErrors.organization_name && (
                  <p className="text-destructive text-xs mt-1 animate-fade-in">{formErrors.organization_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  className={`transition-all ${formErrors.username ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                />
                {formErrors.username && (
                  <p className="text-destructive text-xs mt-1 animate-fade-in">{formErrors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`transition-all ${formErrors.email ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                />
                {formErrors.email && (
                  <p className="text-destructive text-xs mt-1 animate-fade-in">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
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

                {/* Password strength indicator */}
                {formData.password && (
                  <div className="space-y-1 mt-2 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Password strength</span>
                      <span
                        className={`text-xs font-medium ${strengthInfo.label === "Strong" ? "text-emerald-500" : strengthInfo.label === "Weak" ? "text-destructive" : "text-amber-500"}`}
                      >
                        {strengthInfo.label}
                      </span>
                    </div>
                    <Progress value={passwordStrength} className={`h-1 ${strengthInfo.color}`} />

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center gap-1 text-xs">
                        {formData.password.length >= 8 ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={formData.password.length >= 8 ? "text-foreground" : "text-muted-foreground"}>
                          8+ characters
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {/[A-Z]/.test(formData.password) ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={/[A-Z]/.test(formData.password) ? "text-foreground" : "text-muted-foreground"}>
                          Uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {/[a-z]/.test(formData.password) ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={/[a-z]/.test(formData.password) ? "text-foreground" : "text-muted-foreground"}>
                          Lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password) ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span
                          className={
                            /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          Number or symbol
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full mt-6 transition-all" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Create account</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>

          <Separator className="my-1" />

          <CardFooter className="flex flex-col p-6 gap-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline transition-colors">
                Sign in
              </Link>
            </div>

            <div className="text-xs text-center text-muted-foreground">
              By creating an account, you agree to our{" "}
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

