"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { User, Settings, ShieldAlert } from "lucide-react"

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [riskScore, setRiskScore] = useState(78) // Example risk score

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // Here you would typically update the app's theme
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-4xl font-bold tracking-tight gradient-text">Profile</h2>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" />
                Account Information
              </CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <Button>Update Account</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2" />
                Settings
              </CardTitle>
              <CardDescription>Customize your app preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <Switch id="darkMode" checked={darkMode} onCheckedChange={toggleDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Email Notifications</Label>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                <Switch id="twoFactor" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="risk">
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldAlert className="mr-2" />
                Risk Assessment
              </CardTitle>
              <CardDescription>Your current risk score based on KYC information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Your Risk Score: {riskScore}</h3>
                <Progress value={riskScore} className="w-full" />
              </div>
              <p className="text-sm text-muted-foreground">
                {riskScore < 30
                  ? "High risk: Loan approval unlikely."
                  : riskScore < 70
                    ? "Moderate risk: Loan may be approved with conditions."
                    : "Low risk: Good candidate for loan approval."}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

