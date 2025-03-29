"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      quote:
        "ChatWise has transformed our customer support. We've reduced response time by 70% and our team can focus on complex issues while the AI handles routine questions.",
      author: "Sarah Johnson",
      title: "Customer Support Manager",
      company: "TechFlow Inc.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "The ability to train the AI on our specific documentation has been game-changing. Our customers get accurate answers instantly, even outside business hours.",
      author: "Michael Chen",
      title: "CTO",
      company: "Startup Ventures",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "We've seen a 45% increase in customer satisfaction since implementing ChatWise. The multi-language support has helped us expand globally without hiring additional staff.",
      author: "Elena Rodriguez",
      title: "Head of Operations",
      company: "Global Solutions",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "Setting up ChatWise was incredibly easy. Within a day, we had a fully functional AI assistant that understood our product documentation and could answer customer questions accurately.",
      author: "David Kim",
      title: "Product Manager",
      company: "InnoTech",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
    },
    {
      quote:
        "The analytics dashboard gives us valuable insights into what our customers are asking about, helping us improve our product and documentation based on real user needs.",
      author: "Jessica Martinez",
      title: "Customer Experience Director",
      company: "CloudSoft",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ]

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1),transparent_70%)]" />

      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted by Innovative Companies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what our customers have to say about their experience with ChatWise.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-background h-full">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <Quote className="h-10 w-10 text-blue-500 opacity-50" />
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5",
                                i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-lg mb-8 italic">{testimonial.quote}</p>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.author}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background shadow-md z-10 hidden md:flex"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background shadow-md z-10 hidden md:flex"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === activeIndex ? "bg-primary w-6" : "bg-muted",
                )}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Logos */}
        <div className="mt-20">
          <p className="text-center text-sm text-muted-foreground mb-8">TRUSTED BY COMPANIES WORLDWIDE</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Image
                key={index}
                src={`/placeholder.svg?height=40&width=120`}
                alt="Company logo"
                width={120}
                height={40}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

