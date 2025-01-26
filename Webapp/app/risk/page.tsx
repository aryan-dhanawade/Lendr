"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function RiskAssessmentPage() {
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState("")
  const [creditScore, setCreditScore] = useState("")
  const [employmentStatus, setEmploymentStatus] = useState("")
  const [riskScore, setRiskScore] = useState<number | null>(null)

  const calculateRiskScore = () => {
    // This is a simplified risk calculation. In a real application, this would be much more complex.
    const incomeNum = Number.parseFloat(income)
    const expensesNum = Number.parseFloat(expenses)
    const creditScoreNum = Number.parseFloat(creditScore)

    if (isNaN(incomeNum) || isNaN(expensesNum) || isNaN(creditScoreNum)) {
      alert("Please enter valid numbers for all fields")
      return
    }

    const debtToIncomeRatio = expensesNum / incomeNum
    const normalizedCreditScore = creditScoreNum / 850 // Assuming max credit score is 850
    const employmentFactor = employmentStatus === "Employed" ? 1 : 0.9 // Slight penalty for non-traditional employment

    const score = (1 - debtToIncomeRatio) * 30 + normalizedCreditScore * 50 + employmentFactor * 20
    setRiskScore(Math.min(Math.max(score, 0), 100)) // Ensure score is between 0 and 100
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Risk Assessment</h2>
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your Risk Score</CardTitle>
          <CardDescription>Enter your financial information to get a custom risk assessment.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="income">Monthly Income</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your monthly income"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="expenses">Monthly Expenses</Label>
            <Input
              id="expenses"
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="Enter your monthly expenses"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="creditScore">Credit Score</Label>
            <Input
              id="creditScore"
              type="number"
              value={creditScore}
              onChange={(e) => setCreditScore(e.target.value)}
              placeholder="Enter your credit score"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="employmentStatus">Employment Status</Label>
            <Input
              id="employmentStatus"
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
              placeholder="e.g., Employed, Freelancer, Business Owner"
            />
          </div>
          <Button onClick={calculateRiskScore}>Calculate Risk Score</Button>
          {riskScore !== null && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Your Risk Score: {riskScore.toFixed(2)}</h3>
              <Progress value={riskScore} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {riskScore < 30
                  ? "High risk: Loan approval unlikely."
                  : riskScore < 70
                    ? "Moderate risk: Loan may be approved with conditions."
                    : "Low risk: Good candidate for loan approval."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

