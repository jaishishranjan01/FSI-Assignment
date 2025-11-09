import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8081"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")
    const cookie = request.headers.get("cookie")

    const response = await fetch(`${BACKEND_URL}/api/approvals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
        ...(cookie && { Cookie: cookie }),
      },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch approvals" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Approvals API error:", error.message)
    return NextResponse.json({ error: "Backend unavailable", message: error.message }, { status: 503 })
  }
}
