import { NextResponse } from "next/server"

const FLASK_API_URL = "http://127.0.0.1:5000/get-risk" // Replace with your Flask API URL


export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    // Make a POST request to the Flask API
    const response = await fetch(FLASK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.error || "Failed to fetch risk assessment" },
        { status: response.status },
      )
    }

    const riskAssessment = await response.json()

    // Ensure the response matches the expected format
    if (!riskAssessment.id || !riskAssessment.riskLevel) {
      return NextResponse.json({ error: "Invalid response from risk assessment API" }, { status: 500 })
    }

    return NextResponse.json(riskAssessment)
  } catch (error) {
    console.error("Error in risk assessment:", error)
    return NextResponse.json({ error: "Failed to generate risk assessment" }, { status: 500 })
  }
}

