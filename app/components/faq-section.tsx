import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
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
  ]

  return (
    <section id="faq" className="py-20">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about ChatWise.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

