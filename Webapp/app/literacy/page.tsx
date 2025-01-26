"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

// This is a mock function to simulate AI responses
const getAIResponse = async (message: string) => {
  // In a real application, this would call an AI service
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
  return `Here's some financial advice related to "${message}": ...`
}

export default function FinancialLiteracyPage() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    const aiResponse = await getAIResponse(input)
    setMessages((prev) => [...prev, { role: "ai", content: aiResponse }])
  }

  return (
    <div className="flex flex-col h-[80vh] w-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Financial Literacy</h2>
        <Card className="flex flex-col h-full w-full">
          <CardHeader>
            <CardTitle>Financial Literacy Chatbot</CardTitle>
            <CardDescription>Ask me anything about personal finance!</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full w-full pr-4">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block p-2 rounded-lg ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a financial question..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

