"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreditCard, DollarSign, AlertTriangle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"

// Initial borrowers data
const initialBorrowers = [
  { id: 1, name: "Alice Smith", creditScore: 720, loanAmount: 5000, interestRate: 5.5 },
  { id: 2, name: "Bob Johnson", creditScore: 680, loanAmount: 10000, interestRate: 8.2 },
  { id: 3, name: "Charlie Brown", creditScore: 620, loanAmount: 7500, interestRate: 7.0 },
  { id: 4, name: "Diana Prince", creditScore: 750, loanAmount: 15000, interestRate: 7.8 },
  { id: 5, name: "Ethan Hunt", creditScore: 700, loanAmount: 3000, interestRate: 5.3 },
]

export default function LendingPage() {
  const [riskLevels, setRiskLevels] = useState<Record<number, string>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { open } = useSidebar()

  useEffect(() => {
    const fetchRiskLevels = async () => {
      setIsLoading(true)
      try {
        const fetchedRiskLevels = await Promise.all(
          initialBorrowers.map(async (borrower) => {
            const response = await fetch("/api/risk-assessment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: borrower.id.toString() }),
            })
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return { id: data.id, riskLevel: data.riskLevel }
          }),
        )
        const riskLevelMap = fetchedRiskLevels.reduce(
          (acc, { id, riskLevel }) => {
            acc[id] = riskLevel
            return acc
          },
          {} as Record<number, string>,
        )
        setRiskLevels(riskLevelMap)
      } catch (error) {
        console.error("Failed to fetch risk levels:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRiskLevels()
  }, [])

  const borrowers = initialBorrowers.map((borrower) => ({
    ...borrower,
    riskLevel: riskLevels[borrower.id] || "",
  }))

  const filteredBorrowers = borrowers.filter((borrower) =>
    borrower.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className={`full-width-container ${open ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="flex-1 space-y-4 p-8 pt-6 max-w-full overflow-x-hidden">
        <h2 className="text-4xl font-bold tracking-tight gradient-text">Lending Opportunities</h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search borrowers..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {isLoading ? (
            <p>Loading borrowers...</p>
          ) : filteredBorrowers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBorrowers.map((borrower) => (
                <Card key={borrower.id} className="card-hover-effect">
                  <Link href={`/lending/${borrower.id}`}>
                    <CardHeader>
                      <CardTitle>{borrower.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 mb-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Credit Score: {borrower.creditScore}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
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
                                : borrower.riskLevel === "High"
                                  ? "text-red-500"
                                  : "text-gray-500"
                          }`}
                        >
                          {borrower.riskLevel || "Calculating"} Risk
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <p>No borrowers found.</p>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

