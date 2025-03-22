"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function EmbedPageClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Embed Your Chatbot</h1>
        <p className="text-muted-foreground">Add your AI assistant to your website with a simple code snippet</p>
      </div>

      <EmbedCodeTabs />
    </div>
  )
}

function EmbedCodeTabs() {
  const [copied, setCopied] = useState(false)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scriptCode = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatWise']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    w[o].l=1*new Date();js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.async=1;js.src=f;js.id=o;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','cw','https://cdn.chatwise.ai/widget.js'));
  cw('init', { id: 'YOUR_CHATBOT_ID' });
</script>`

  const reactCode = `import { useEffect } from 'react';

function ChatWiseWidget() {
  useEffect(() => {
    // Load ChatWise script
    const script = document.createElement('script');
    script.src = 'https://cdn.chatwise.ai/widget.js';
    script.async = true;
    script.onload = () => {
      // Initialize the widget
      window.cw('init', { id: 'YOUR_CHATBOT_ID' });
    };
    document.body.appendChild(script);

    return () => {
      // Clean up
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export default ChatWiseWidget;`

  return (
    <Tabs defaultValue="script" className="space-y-6">
      <TabsList>
        <TabsTrigger value="script">HTML Script</TabsTrigger>
        <TabsTrigger value="react">React Component</TabsTrigger>
        <TabsTrigger value="customize">Customization</TabsTrigger>
      </TabsList>

      <TabsContent value="script">
        <Card>
          <CardHeader>
            <CardTitle>HTML Script Tag</CardTitle>
            <CardDescription>Add this script to your website's HTML to embed your chatbot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
                <code>{scriptCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => handleCopy(scriptCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy code</span>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Replace <code className="text-primary">YOUR_CHATBOT_ID</code> with your actual chatbot ID.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Documentation
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="react">
        <Card>
          <CardHeader>
            <CardTitle>React Component</CardTitle>
            <CardDescription>Use this React component to add your chatbot to your React application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
                <code>{reactCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => handleCopy(reactCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy code</span>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Import and use this component in your React application.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              View React Documentation
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="customize">
        <Card>
          <CardHeader>
            <CardTitle>Customization Options</CardTitle>
            <CardDescription>Customize the appearance and behavior of your chatbot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              You can customize your chatbot by passing additional options to the init function:
            </p>

            <div className="relative">
              <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
                <code>{`cw('init', {
  id: 'YOUR_CHATBOT_ID',
  theme: {
    primaryColor: '#3B82F6',
    textColor: '#1F2937',
    backgroundColor: '#FFFFFF',
    buttonColor: '#3B82F6'
  },
  position: 'right', // 'right' or 'left'
  greeting: 'Hello! How can I help you today?',
  title: 'Chat with our AI Assistant',
  avatar: 'https://example.com/avatar.png'
});`}</code>
              </pre>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Theme Options</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <code>primaryColor</code>: Main color for the chatbot
                  </li>
                  <li>
                    <code>textColor</code>: Color for the text
                  </li>
                  <li>
                    <code>backgroundColor</code>: Background color
                  </li>
                  <li>
                    <code>buttonColor</code>: Color for buttons
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Behavior Options</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <code>position</code>: Position of the chat widget
                  </li>
                  <li>
                    <code>greeting</code>: Initial message from the bot
                  </li>
                  <li>
                    <code>title</code>: Title of the chat window
                  </li>
                  <li>
                    <code>avatar</code>: URL to the bot's avatar image
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Full Customization Guide
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

