"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function RiskAssessment() {
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState("")
  const [creditScore, setCreditScore] = useState("")
  const [riskScore, setRiskScore] = useState<number | null>(null)
  const [riskLevel, setRiskLevel] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [id, setId] = useState("")

  const calculateRiskScore = async () => {
    const incomeNum = Number.parseFloat(income)
    const expensesNum = Number.parseFloat(expenses)
    const creditScoreNum = Number.parseFloat(creditScore)

    if (isNaN(incomeNum) || isNaN(expensesNum) || isNaN(creditScoreNum)) {
      alert("Please enter valid numbers for all fields")
      return
    }

    const debtToIncomeRatio = expensesNum / incomeNum
    const normalizedCreditScore = creditScoreNum / 850 // Assuming max credit score is 850

    const score = (1 - debtToIncomeRatio) * 50 + normalizedCreditScore * 50
    const calculatedRiskScore = Math.min(Math.max(score, 0), 100) // Ensure score is between 0 and 100
    setRiskScore(calculatedRiskScore)

    // Call the risk assessment API
    try {
      const response = await fetch("/api/risk-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch risk assessment")
      }

      const data = await response.json()
      setRiskLevel(data.riskLevel)
    } catch (error) {
      console.error("Error fetching risk assessment:", error)
      alert("Failed to fetch risk assessment. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="id">Custom ID</Label>
        <Input id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter your custom ID" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="income">Monthly Income</Label>
        <Input
          id="income"
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Enter your monthly income"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expenses">Monthly Expenses</Label>
        <Input
          id="expenses"
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          placeholder="Enter your monthly expenses"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="creditScore">Credit Score</Label>
        <Input
          id="creditScore"
          type="number"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
          placeholder="Enter your credit score"
        />
      </div>
      <Button onClick={calculateRiskScore}>Calculate Risk Score</Button>
      {riskScore !== null && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Risk Score: {riskScore.toFixed(2)}</h3>
          <Progress value={riskScore} className="w-full" />
        </div>
      )}
      {riskLevel && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Risk Level: {riskLevel}</h3>
          <p className="text-sm text-muted-foreground">
            This risk level is based on the information provided and our assessment algorithm.
          </p>
        </div>
      )}
    </div>
  )
}

