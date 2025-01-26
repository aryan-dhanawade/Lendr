"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useSidebar } from "@/components/ui/sidebar"

const loanTypeData = [
  { name: "Personal", value: 400 },
  { name: "Business", value: 300 },
  { name: "Education", value: 200 },
  { name: "Home", value: 100 },
]

const riskLevelData = [
  { name: "Low Risk", value: 500 },
  { name: "Medium Risk", value: 300 },
  { name: "High Risk", value: 200 },
]

const loanTrendData = [
  { month: "Jan", amount: 4000 },
  { month: "Feb", amount: 3000 },
  { month: "Mar", amount: 5000 },
  { month: "Apr", amount: 4500 },
  { month: "May", amount: 6000 },
  { month: "Jun", amount: 5500 },
]

const loanPurposeData = [
  { purpose: "Business Expansion", amount: 12000 },
  { purpose: "Education", amount: 8000 },
  { purpose: "Debt Consolidation", amount: 15000 },
  { purpose: "Home Improvement", amount: 10000 },
  { purpose: "Personal", amount: 6000 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() })
  const [loanType, setLoanType] = useState("all")
  const { open } = useSidebar()

  return (
    <div className={`full-width-container ${open ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="flex-1 space-y-4 p-8 pt-6 max-w-full overflow-x-hidden">
        <h2 className="text-3xl font-bold tracking-tight gradient-text">Analytics</h2>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <Label htmlFor="date-range" className="mb-2 block">
              Date Range
            </Label>
            <DatePickerWithRange id="date-range" selected={dateRange} onSelect={setDateRange} />
          </div>
          <div className="flex-1">
            <Label htmlFor="loan-type" className="mb-2 block">
              Loan Type
            </Label>
            <Select value={loanType} onValueChange={setLoanType}>
              <SelectTrigger id="loan-type">
                <SelectValue placeholder="Select loan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="home">Home</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="loanTrends">Loan Trends</TabsTrigger>
            <TabsTrigger value="loanPurpose">Loan Purpose</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Type Distribution</CardTitle>
                  <CardDescription>Breakdown of loans by type</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={loanTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {loanTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Risk Level Distribution</CardTitle>
                  <CardDescription>Breakdown of loans by risk level</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskLevelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskLevelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="loanTrends">
            <Card>
              <CardHeader>
                <CardTitle>Loan Amount Trends</CardTitle>
                <CardDescription>Monthly loan amount trends</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={loanTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loanPurpose">
            <Card>
              <CardHeader>
                <CardTitle>Loan Amounts by Purpose</CardTitle>
                <CardDescription>Total loan amounts for different purposes</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loanPurposeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="purpose" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

