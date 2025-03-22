import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "ChatWise has transformed our customer support. We've reduced response time by 70% and our team can focus on complex issues while the AI handles routine questions.",
      author: "Sarah Johnson",
      title: "Customer Support Manager",
      company: "TechFlow Inc.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The ability to train the AI on our specific documentation has been game-changing. Our customers get accurate answers instantly, even outside business hours.",
      author: "Michael Chen",
      title: "CTO",
      company: "Startup Ventures",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "We've seen a 45% increase in customer satisfaction since implementing ChatWise. The multi-language support has helped us expand globally without hiring additional staff.",
      author: "Elena Rodriguez",
      title: "Head of Operations",
      company: "Global Solutions",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Innovative Companies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what our customers have to say about their experience with ChatWise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-blue-500 mb-4 opacity-50" />
                <p className="mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

