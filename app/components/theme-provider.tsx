"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps extends React.PropsWithChildren {
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  attribute,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  children,
}: ThemeProviderProps) {
  const resolvedAttribute = attribute ?? "class";

  return (
    <NextThemesProvider
      attribute={resolvedAttribute as "class"}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  )
}

