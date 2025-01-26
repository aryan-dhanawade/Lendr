"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function LendingRequestForm() {
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [duration, setDuration] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would interact with the DAO smart contract
    console.log("Loan request submitted:", { amount, purpose, duration })
    // Reset form
    setAmount("")
    setPurpose("")
    setDuration("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="amount">Loan Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in USD"
          required
        />
      </div>
      <div>
        <Label htmlFor="purpose">Loan Purpose</Label>
        <Textarea
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Describe the purpose of your loan"
          required
        />
      </div>
      <div>
        <Label htmlFor="duration">Loan Duration (months)</Label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter loan duration in months"
          required
        />
      </div>
      <Button type="submit">Submit Loan Request</Button>
    </form>
  )
}

