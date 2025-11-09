"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/Navigation"
import Breadcrumbs from "@/components/Breadcrumbs"
import MyRequests from "@/components/MyRequests"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin" | "staff"
}

export default function RequestsPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/auth")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Navigation user={user} onLogout={handleLogout} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Requests</h1>
              <p className="text-gray-600">Track your equipment borrowing requests and status</p>
            </div>
            <Link href="/equipment">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                Browse Equipment
              </button>
            </Link>
          </div>

          <MyRequests userId={user.id} />
        </div>
      </div>
    </>
  )
}
