import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8081"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = request.headers.get("authorization")
    const cookie = request.headers.get("cookie")

    const response = await fetch(`${BACKEND_URL}/api/equipment/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
        ...(cookie && { Cookie: cookie }),
      },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Equipment not found" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Equipment detail API error:", error.message)
    return NextResponse.json({ error: "Backend unavailable", message: error.message }, { status: 503 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = request.headers.get("authorization")
    const cookie = request.headers.get("cookie")
    const body = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/equipment/${id}`, {
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
      return NextResponse.json({ error: error.message || "Failed to update equipment" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Equipment update error:", error.message)
    return NextResponse.json({ error: "Backend unavailable", message: error.message }, { status: 503 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = request.headers.get("authorization")
    const cookie = request.headers.get("cookie")

    const response = await fetch(`${BACKEND_URL}/api/equipment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
        ...(cookie && { Cookie: cookie }),
      },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to delete equipment" }, { status: response.status })
    }

    return NextResponse.json({ message: "Equipment deleted" })
  } catch (error: any) {
    console.error("[v0] Equipment delete error:", error.message)
    return NextResponse.json({ error: "Backend unavailable", message: error.message }, { status: 503 })
  }
}
