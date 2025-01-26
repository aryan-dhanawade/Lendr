"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSidebar } from "@/components/ui/sidebar"

const loans = [
  { id: 1, borrower: "Alice Smith", amount: 5000, interestRate: 5.5, term: 12, riskScore: 78, status: "Active" },
  { id: 2, borrower: "Bob Johnson", amount: 10000, interestRate: 6.0, term: 24, riskScore: 82, status: "Pending" },
  { id: 3, borrower: "Charlie Brown", amount: 7500, interestRate: 5.8, term: 18, riskScore: 75, status: "Active" },
  { id: 4, borrower: "Diana Prince", amount: 15000, interestRate: 6.2, term: 36, riskScore: 88, status: "Completed" },
  { id: 5, borrower: "Ethan Hunt", amount: 3000, interestRate: 5.2, term: 6, riskScore: 72, status: "Active" },
]

export default function LoansPage() {
  const [activeTab, setActiveTab] = useState("apply")
  const { open } = useSidebar()

  return (
    <div className={`full-width-container ${open ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="flex-1 space-y-4 p-8 pt-6 max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Loans</h2>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
            <TabsTrigger value="active">Active Loans</TabsTrigger>
          </TabsList>
          <TabsContent value="apply" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Application</CardTitle>
                <CardDescription>Fill out the form below to apply for a loan.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Loan Amount</Label>
                      <Input id="amount" type="number" placeholder="Enter amount" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="term">Loan Term (months)</Label>
                      <Input id="term" type="number" placeholder="Enter term" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Textarea id="purpose" placeholder="Describe the purpose of your loan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income">Monthly Income</Label>
                    <Input id="income" type="number" placeholder="Enter your monthly income" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employment">Employment Status</Label>
                    <Input id="employment" placeholder="e.g., Employed, Freelancer, Business Owner" />
                  </div>
                  <Button type="submit">Submit Application</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Loans</CardTitle>
                <CardDescription>View all active and pending loans.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Borrower</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Interest Rate</TableHead>
                      <TableHead>Term (Months)</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.borrower}</TableCell>
                        <TableCell>${loan.amount.toLocaleString()}</TableCell>
                        <TableCell>{loan.interestRate}%</TableCell>
                        <TableCell>{loan.term}</TableCell>
                        <TableCell>{loan.riskScore}</TableCell>
                        <TableCell>{loan.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

