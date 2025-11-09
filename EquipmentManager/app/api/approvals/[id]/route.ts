import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8081"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = request.headers.get("authorization")
    const cookie = request.headers.get("cookie")
    const body = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/approvals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
        ...(cookie && { Cookie: cookie }),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.message || "Failed to update approval" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Approval update error:", error.message)
    return NextResponse.json({ error: "Backend unavailable", message: error.message }, { status: 503 })
  }
}
