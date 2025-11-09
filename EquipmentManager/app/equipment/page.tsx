"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/Navigation"
import Breadcrumbs from "@/components/Breadcrumbs"
import StudentDashboard from "@/components/StudentDashboard"
import AdminDashboard from "@/components/AdminDashboard"
import StaffDashboard from "@/components/StaffDashboard"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin" | "staff"
}

export default function EquipmentPage() {
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
          {user.role === "student" && <StudentDashboard user={user} />}
          {user.role === "admin" && <AdminDashboard user={user} />}
          {user.role === "staff" && <StaffDashboard user={user} />}
        </div>
      </div>
    </>
  )
}
