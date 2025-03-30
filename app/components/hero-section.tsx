"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_30%,rgba(56,189,248,0.12),rgba(0,0,0,0))]" />
      <div className="absolute top-0 right-0 -z-10 overflow-hidden">
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-30 dark:opacity-20"
        >
          <g clipPath="url(#clip0_358_8)">
            <path d="M800 0H0V800H800V0Z" fill="url(#paint0_radial_358_8)" />
          </g>
          <defs>
            <radialGradient
              id="paint0_radial_358_8"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(400 400) rotate(90) scale(400)"
            >
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
            <clipPath id="clip0_358_8">
              <rect width="800" height="800" rx="400" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="px-3 py-1 text-sm animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 mr-1" />
            <span>Just Launched</span>
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl animate-fade-in-up">
            Your AI Customer Support{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Assistant
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[42rem] animate-fade-in-up animation-delay-100">
            Transform your customer support with AI that understands your business. Train it on your docs, customize its
            persona, and watch it handle inquiries 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 animate-fade-in-up animation-delay-200">
            <Link href="/register">
              <Button size="lg" className="px-8 group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="px-8">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-0 bg-black">
                <iframe
                  width="100%"
                  height="450"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Product Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-sm text-muted-foreground mt-3 animate-fade-in-up animation-delay-300">
            No credit card required • Free plan available
          </p>
        </div>

        <div className="mt-16 flex justify-center animate-fade-in-up animation-delay-400">
          <div className="relative w-full max-w-4xl rounded-xl border shadow-2xl overflow-hidden bg-gradient-to-b from-background to-muted/50">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] mix-blend-plus-lighter"></div>
            <Image
              src="/images/home/dashboard-preview.png?height=600&width=1200"
              alt="ChatWise dashboard preview"
              width={1200}
              height={600}
              className="w-full h-auto relative z-10"
              priority
            />
            {/* Floating elements */}
            <div className="absolute top-8 right-8 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg animate-float">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-medium">AI Assistant Online</span>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg animate-float animation-delay-500">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-xs font-medium">24/7 Support Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-70 animate-fade-in-up animation-delay-500">
          <Image
            src="/images/home/hero/chatbot-analytics.png?height=40&width=120"
            alt="Company logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
          <Image
            src="/images/home/hero/chatbot-settings.png?height=40&width=120"
            alt="Company logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
          <Image
            src="/images/home/hero/login.png?height=40&width=120"
            alt="Company logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
          <Image
            src="/images/home/hero/register.png?height=40&width=120"
            alt="Company logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
          <Image
            src="/images/home/hero/training.png?height=40&width=120"
            alt="Company logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    </section>
  )
}

