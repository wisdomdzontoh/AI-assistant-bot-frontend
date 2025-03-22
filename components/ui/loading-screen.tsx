"use client"

import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  fullScreen?: boolean
  message?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingScreen({ fullScreen = true, message = "Loading...", size = "md" }: LoadingScreenProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" : "w-full h-full"}`}
    >
      <div className="flex flex-col items-center gap-2">
        <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  )
}

