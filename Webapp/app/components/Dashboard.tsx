"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LendingRequestForm from "./LendingRequestForm"
import LoanOffers from "./LoanOffers"
import RiskAssessment from "./RiskAssessment"
import FinancialLiteracyChatbot from "./FinancialLiteracyChatbot"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("request")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="request">Request Loan</TabsTrigger>
        <TabsTrigger value="offers">Loan Offers</TabsTrigger>
        <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        <TabsTrigger value="chatbot">Financial Literacy</TabsTrigger>
      </TabsList>
      <TabsContent value="request">
        <LendingRequestForm />
      </TabsContent>
      <TabsContent value="offers">
        <LoanOffers />
      </TabsContent>
      <TabsContent value="risk">
        <RiskAssessment />
      </TabsContent>
      <TabsContent value="chatbot">
        <FinancialLiteracyChatbot />
      </TabsContent>
    </Tabs>
  )
}

