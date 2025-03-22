import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_30%,rgba(56,189,248,0.12),rgba(0,0,0,0))]" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <span className="text-emerald-600 mr-1">✦</span> Just Launched
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Your AI Customer Support{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Assistant
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[42rem]">
            Transform your customer support with AI that understands your business. Train it on your docs, customize its
            persona, and watch it handle inquiries 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link href="/register">
              <Button size="lg" className="px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="px-8">
                See Demo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-3">No credit card required • Free plan available</p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl rounded-lg border shadow-2xl overflow-hidden">
            <Image
              src="/images/home/dashboard-preview.png?height=600&width=1200"
              alt="ChatWise dashboard preview"
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-10" />
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 grayscale opacity-70">
          <Image src="/placeholder.svg?height=40&width=120" alt="Company logo" width={120} height={40} />
          <Image src="/placeholder.svg?height=40&width=120" alt="Company logo" width={120} height={40} />
          <Image src="/placeholder.svg?height=40&width=120" alt="Company logo" width={120} height={40} />
          <Image src="/placeholder.svg?height=40&width=120" alt="Company logo" width={120} height={40} />
          <Image src="/placeholder.svg?height=40&width=120" alt="Company logo" width={120} height={40} />
        </div>
      </div>
    </section>
  )
}

