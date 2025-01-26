"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface LoanOffer {
  id: number
  amount: number
  interestRate: number
  duration: number
  lender: string
}

export default function LoanOffers() {
  const [offers, setOffers] = useState<LoanOffer[]>([])

  useEffect(() => {
    // In a real application, this would fetch offers from the DAO smart contract
    const mockOffers: LoanOffer[] = [
      { id: 1, amount: 5000, interestRate: 5.5, duration: 12, lender: "0x1234...5678" },
      { id: 2, amount: 10000, interestRate: 6.0, duration: 24, lender: "0xabcd...efgh" },
    ]
    setOffers(mockOffers)
  }, [])

  const handleAccept = (offerId: number) => {
    // In a real application, this would interact with the DAO smart contract
    console.log("Accepted offer:", offerId)
  }

  return (
    <div className="space-y-4">
      {offers.map((offer) => (
        <Card key={offer.id}>
          <CardHeader>
            <CardTitle>${offer.amount} Loan Offer</CardTitle>
            <CardDescription>From lender: {offer.lender}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Interest Rate: {offer.interestRate}%</p>
            <p>Duration: {offer.duration} months</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleAccept(offer.id)}>Accept Offer</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

