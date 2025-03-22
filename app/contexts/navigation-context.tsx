"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface NavigationContextProps {
  isNavigating: boolean
}

const NavigationContext = createContext<NavigationContextProps>({
  isNavigating: false,
})

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Reset navigation state when route changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsNavigating(false)
    }, 500) // Add a small delay to ensure components have time to load

    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  // Set navigating state when link is clicked
  useEffect(() => {
    const handleStart = () => {
      setIsNavigating(true)
    }

    // Add event listeners for link clicks
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        handleStart()
      }
    })

    return () => {
      document.removeEventListener("click", handleStart)
    }
  }, [])

  return <NavigationContext.Provider value={{ isNavigating }}>{children}</NavigationContext.Provider>
}

export function useNavigation() {
  return useContext(NavigationContext)
}

