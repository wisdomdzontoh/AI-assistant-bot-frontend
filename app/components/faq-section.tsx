"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function FaqSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How does the AI assistant learn about my business?",
      answer:
        "You can train the AI by uploading documents (PDF, DOCX, TXT), connecting to your website for crawling, or directly pasting content. The system processes this information and makes it available to the AI for answering customer queries accurately.",
    },
    {
      question: "Can I customize how the AI responds to customers?",
      answer:
        "Our Custom Persona Builder lets you define the tone, style, and personality of your AI assistant. Whether you want it to be professional, friendly, or humorous, you can tailor it to match your brand voice.",
    },
    {
      question: "What happens when the AI can't answer a question?",
      answer:
        "Our Smart Fallback System kicks in when the AI is uncertain. It can offer to create a support ticket, suggest a human takeover, or provide alternative resources. You can customize these fallback options based on your preferences.",
    },
    {
      question: "How does multi-language support work?",
      answer:
        "The system automatically detects the language of incoming queries and responds in the same language. You can enable as many languages as you need, and the AI will handle translations seamlessly, allowing you to support customers globally.",
    },
    {
      question: "Can I integrate ChatWise with my existing tools?",
      answer:
        "Yes, we offer webhooks and API access for integration with your CRM, helpdesk, or other systems. You can also use Zapier to connect with thousands of apps without any coding required.",
    },
    {
      question: "Is there a limit to how many team members can use the platform?",
      answer:
        "The number of team members depends on your plan. The Starter plan supports 1 admin, while Professional supports up to 5 team members with different roles. Enterprise plans offer unlimited team members with customizable permission levels.",
    },
    {
      question: "How secure is my data with ChatWise?",
      answer:
        "We take security seriously. All data is encrypted both in transit and at rest. We use industry-standard security practices and regularly undergo security audits. Your data is never used to train other AI models.",
    },
    {
      question: "Can I export my chat data and analytics?",
      answer:
        "Yes, you can export all chat data and analytics in various formats including CSV, JSON, and PDF. This allows you to perform your own analysis or integrate the data with your existing business intelligence tools.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, we offer a 14-day free trial on all our plans with no credit card required. This gives you full access to all features so you can thoroughly test if ChatWise is right for your business before committing.",
    },
    {
      question: "How long does it take to set up ChatWise?",
      answer:
        "Most customers can set up a basic chatbot within 30 minutes. Training the AI with your specific content might take a bit longer depending on the volume, but the system processes documents quickly. Our onboarding team is also available to help you get started.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <section id="faq" className="py-24">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about ChatWise.</p>

          <div className="relative max-w-md mx-auto mt-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No matching questions found. Try a different search term.</p>
            </div>
          )}
        </Accordion>

        {searchQuery && filteredFaqs.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setSearchQuery("")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear search and show all FAQs
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

