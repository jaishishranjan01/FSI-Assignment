import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""

    console.log("[v0] Searching users with query:", query)

    // Get auth token from request headers
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "No authentication token provided" }, { status: 401 })
    }

    // Get cookies from request
    const cookies = request.headers.get("cookie") || ""

    // Forward request to backend
    const backendUrl = `http://localhost:8081/api/users/search?q=${encodeURIComponent(query)}`
    console.log("[v0] Forwarding to backend:", backendUrl)

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: cookies,
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Backend error:", response.status, errorText)
      return NextResponse.json({ error: `Backend error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] Search results received:", data.length, "users")

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] User search API error:", error.message)

    if (error.name === "AbortError" || error.message.includes("timeout")) {
      return NextResponse.json({ error: "Backend server timeout - is it running on localhost:8081?" }, { status: 504 })
    }

    return NextResponse.json({ error: error.message || "Failed to search users" }, { status: 500 })
  }
}
