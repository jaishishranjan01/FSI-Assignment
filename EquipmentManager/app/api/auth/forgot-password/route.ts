import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Forgot-password request received")
    const body = await request.json()

    console.log("[v0] Calling backend forgot-password endpoint with email:", body.email)

    const response = await fetch("http://localhost:8081/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
      }),
      credentials: "include", // Include cookies like JSESSIONID
    })

    console.log("[v0] Backend response status:", response.status)

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.log("[v0] Backend error:", error)
      return NextResponse.json({ error: error.message || "Failed to send reset email" }, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] Forgot-password success")
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Forgot-password error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Server error" }, { status: 500 })
  }
}
