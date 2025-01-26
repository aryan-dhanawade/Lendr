"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CreditCard, DollarSign, AlertTriangle, Calendar, User, Briefcase } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for a single borrower
const getBorrowerDetails = async (id: number) => {
  // Simulate API call to get borrower details
  const borrower = {
    id,
    name: "Alice Smith",
    creditScore: 720,
    loanAmount: 5000,
    riskLevel: "",
    purpose: "Business expansion",
    term: 12,
    interestRate: 5.5,
    occupation: "Small Business Owner",
    monthlyIncome: 4000,
    fundingProgress: 60,
  }

  // Fetch risk level
  const response = await fetch("/api/risk-assessment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id.toString() }),
  })
  const data = await response.json()
  borrower.riskLevel = data.riskLevel

  return borrower
}

export default function LoanDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [borrower, setBorrower] = useState<any>(null)
  const [investmentAmount, setInvestmentAmount] = useState("")

  useEffect(() => {
    const fetchBorrowerDetails = async () => {
      const id = typeof params.id === "string" ? Number.parseInt(params.id, 10) : 0
      const borrowerDetails = await getBorrowerDetails(id)
      setBorrower(borrowerDetails)
    }

    fetchBorrowerDetails()
  }, [params.id])

  const handleInvest = () => {
    // Here you would typically integrate with a blockchain payment system
    console.log(`Investing ${investmentAmount} in loan ${borrower.id}`)
    // After successful payment, you might update the loan status and redirect
    router.push("/dashboard")
  }

  if (!borrower) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Loan Details</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Borrower Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`/placeholder.svg?height=64&width=64`} />
                <AvatarFallback>{borrower.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{borrower.name}</h3>
                <p className="text-sm text-muted-foreground">{borrower.occupation}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Credit Score: {borrower.creditScore}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Monthly Income: ${borrower.monthlyIncome}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Occupation: {borrower.occupation}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Loan Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Loan Amount: ${borrower.loanAmount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span
                className={`capitalize ${
                  borrower.riskLevel === "Low"
                    ? "text-green-500"
                    : borrower.riskLevel === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {borrower.riskLevel} Risk
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Term: {borrower.term} months</span>
            </div>
            <div>
              <span>Interest Rate: {borrower.interestRate}%</span>
            </div>
            <div>
              <span>Purpose: {borrower.purpose}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Funding Progress</CardTitle>
          <CardDescription>
            ${((borrower.loanAmount * borrower.fundingProgress) / 100).toFixed(2)} funded of ${borrower.loanAmount} goal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={borrower.fundingProgress} className="w-full" />
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Invest in This Loan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invest in Loan</DialogTitle>
                <DialogDescription>Enter the amount you want to invest and confirm your transaction.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <Button onClick={handleInvest} className="w-full">
                  Confirm Investment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

