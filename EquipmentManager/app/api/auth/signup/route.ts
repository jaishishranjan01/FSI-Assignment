export async function POST(request: Request) {
  try {
    const body = await request.json()

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch("http://localhost:8081/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const data = await response.json()

    if (!response.ok) {
      return Response.json(data, { status: response.status })
    }

    return Response.json(data)
  } catch (error: any) {
    console.error("[v0] Signup API error:", error.message)

    const errorMessage =
      error.name === "AbortError"
        ? "Backend server timeout - ensure http://localhost:8081 is running"
        : error.message === "Failed to fetch"
          ? "Cannot connect to backend - ensure http://localhost:8081/api/auth/signup is running"
          : "Server error"

    return Response.json({ message: errorMessage }, { status: 500 })
  }
}
