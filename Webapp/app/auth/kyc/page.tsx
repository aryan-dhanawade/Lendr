"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function KYCPage() {
  const router = useRouter()
  const [documents, setDocuments] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle KYC submission
    console.log("KYC submitted")
    // Redirect to dashboard after KYC
    router.push("/")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files))
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Complete Your KYC</CardTitle>
          <CardDescription>Please provide the required information and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idNumber">National ID Number</Label>
              <Input id="idNumber" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Textarea id="address" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income</Label>
              <Input id="income" type="number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documents">Upload Documents (ID, Proof of Address, etc.)</Label>
              <Input id="documents" type="file" multiple onChange={handleFileChange} required />
            </div>
            <div className="text-sm text-muted-foreground">
              {documents.length > 0 && <p>{documents.length} document(s) selected</p>}
            </div>
            <Button type="submit" className="w-full">
              Submit KYC
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Your information is secure and will be used for verification purposes only.
          </p>
        </CardFooter> */}
      </Card>
    </div>
  )
}

