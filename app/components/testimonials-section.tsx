"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      quote:
        "ChatWise has transformed our customer support. We've reduced response time by 70% and our team can focus on complex issues while the AI handles routine questions.",
      author: "Sarah Johnson",
      title: "Customer Support Manager",
      company: "TechFlow Inc.",
      avatar: "/images/home/testimonials/woman1.jpg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "The ability to train the AI on our specific documentation has been game-changing. Our customers get accurate answers instantly, even outside business hours.",
      author: "Michael Chen",
      title: "CTO",
      company: "Startup Ventures",
      avatar: "/images/home/testimonials/man1.jpg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "We've seen a 45% increase in customer satisfaction since implementing ChatWise. The multi-language support has helped us expand globally without hiring additional staff.",
      author: "Elena Rodriguez",
      title: "Head of Operations",
      company: "Global Solutions",
      avatar: "/images/home/testimonials/woman2.jpg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "Setting up ChatWise was incredibly easy. Within a day, we had a fully functional AI assistant that understood our product documentation and could answer customer questions accurately.",
      author: "David Kim",
      title: "Product Manager",
      company: "InnoTech",
      avatar: "/images/home/testimonials/man3.jpg?height=80&width=80",
      rating: 4,
    },
    {
      quote:
        "The analytics dashboard gives us valuable insights into what our customers are asking about, helping us improve our product and documentation based on real user needs.",
      author: "Jessica Martinez",
      title: "Customer Experience Director",
      company: "CloudSoft",
      avatar: "/images/home/testimonials/woman3.jpg?height=80&width=80",
      rating: 5,
    },
  ]

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplay, activeIndex])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  const nextTestimonial = useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevTestimonial = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const goToTestimonial = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1)
      setActiveIndex(index)
    },
    [activeIndex],
  )

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const currentTestimonial = testimonials[activeIndex]

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-950/80 dark:to-slate-900" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      <div className="container px-4 md:px-6 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
            Trusted by Innovative Companies
          </h2>
          <p className="text-xl text-muted-foreground">
            See what our customers have to say about their experience with ChatWise.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="relative min-h-[400px] md:min-h-[320px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 p-6 md:p-10"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <Quote className="h-10 w-10 text-blue-500 opacity-70" />
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < currentTestimonial.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-slate-300 dark:text-slate-700",
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-lg md:text-xl mb-8 flex-grow italic leading-relaxed">
                      "{currentTestimonial.quote}"
                    </p>

                    <div className="flex items-center mt-auto">
                      <div className="mr-4 rounded-full ring-2 ring-blue-100 dark:ring-blue-900 p-0.5">
                        <Image
                          src={currentTestimonial.avatar || "/placeholder.svg"}
                          alt={currentTestimonial.author}
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{currentTestimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {currentTestimonial.title}, {currentTestimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-white dark:bg-slate-800 h-10 w-10 md:h-12 md:w-12"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg bg-white dark:bg-slate-800 h-10 w-10 md:h-12 md:w-12"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-blue-500"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600",
                )}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Logos */}
        <div className="mt-24">
          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-10 tracking-wider">
            TRUSTED BY COMPANIES WORLDWIDE
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-blue-500/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                <Image
                  src={`/images/home/companies/toyota.png?height=40&width=120`}
                  alt="Company logo"
                  width={120}
                  height={40}
                  className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 relative"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

