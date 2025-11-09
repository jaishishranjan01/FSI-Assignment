import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const cookieHeader = request.headers.get("cookie")

    console.log("[v0] Users API - Fetching from backend")

    const response = await fetch("http://localhost:8081/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    })

    if (!response.ok) {
      console.error("[v0] Users API error - Status:", response.status)
      const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
      return NextResponse.json({ error: errorData.message || "Failed to fetch users" }, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] Users API - Success, received", data?.length || 0, "users")
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Users API error:", error.message)
    return NextResponse.json({ error: error.message || "Failed to fetch users" }, { status: 500 })
  }
}
