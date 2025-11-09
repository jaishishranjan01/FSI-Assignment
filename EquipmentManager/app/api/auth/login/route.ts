import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8081"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Login request:", body)

    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
      credentials: "include",
    })

    console.log("[v0] Backend response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.log("[v0] Backend error:", errorData)
      return NextResponse.json({ error: errorData.message || "Login failed" }, { status: response.status })
    }

    const userData = await response.json()
    console.log("[v0] Login successful:", userData)

    // Create response with credentials
    const res = NextResponse.json(userData, { status: 200 })

    // Forward any cookies from backend
    const setCookieHeader = response.headers.get("set-cookie")
    if (setCookieHeader) {
      res.headers.set("set-cookie", setCookieHeader)
    }

    return res
  } catch (error) {
    console.error("[v0] Login API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error occurred" },
      { status: 500 },
    )
  }
}
