"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinancialLiteracyChatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Financial Literacy Chatbot</CardTitle>
        <CardDescription>Ask me anything about personal finance!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <Card className={`max-w-[80%] ${m.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
              <CardContent className="p-3">
                <p>{m.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input value={input} onChange={handleInputChange} placeholder="Ask a financial question..." />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

