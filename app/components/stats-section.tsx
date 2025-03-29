"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCounter value={97} suffix="%" title="Customer Satisfaction" description="Average rating from users" />
          <StatCounter value={24} suffix="/7" title="Availability" description="Always ready to help" />
          <StatCounter value={5000} suffix="+" title="Businesses" description="Trust our platform" />
          <StatCounter value={10} suffix="M+" title="Conversations" description="Handled by our AI" />
        </div>
      </div>
    </section>
  )
}

function StatCounter({
  value,
  suffix = "",
  title,
  description,
  duration = 2000,
}: {
  value: number
  suffix?: string
  title: string
  description: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = Math.min(value, 999999)
    const incrementTime = Math.floor(duration / end) || 1

    // Don't run if value is zero
    if (end === 0) return

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => {
      clearInterval(timer)
    }
  }, [value, duration, isInView])

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center transition-opacity duration-1000",
        isInView ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary">
        {count}
        {suffix}
      </div>
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

