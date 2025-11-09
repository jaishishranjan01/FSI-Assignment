"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface User {
  id: string
  role: "student" | "admin" | "staff"
  name: string
  email: string
}

interface NavigationProps {
  user: User
  onLogout: () => void
}

export default function Navigation({ user, onLogout }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)
  const pathname = usePathname()

  const getRoleLabel = (role: string) => {
    const labels = {
      student: "Student",
      admin: "Administrator",
      staff: "Lab Staff",
    }
    return labels[role as keyof typeof labels] || role
  }

  const getRoleColor = (role: string) => {
    const colors = {
      student: "bg-blue-100 text-blue-800",
      admin: "bg-purple-100 text-purple-800",
      staff: "bg-green-100 text-green-800",
    }
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const isActive = (href: string) => pathname === href

  const navigationLinks = [
    { href: "/equipment", label: "Equipment", icon: "📦" },
    { href: "/requests", label: "Requests", icon: "📋" },
    ...(user.role === "admin" ? [{ href: "/admin", label: "Admin", icon: "⚙️" }] : []),
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="bg-blue-600 text-white rounded-lg p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">Equipment Portal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`font-medium transition ${
                    isActive(link.href)
                      ? "text-blue-600 border-b-2 border-blue-600 pb-3"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop User Profile */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{user.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getRoleColor(user.role)}`}>
                {getRoleLabel(user.role)}
              </span>
            </div>
            <Button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 space-y-2">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <div
                  className={`px-4 py-2 rounded-lg transition ${
                    isActive(link.href) ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {link.icon} {link.label}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Profile Menu */}
        {mobileProfileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 space-y-3">
            <div className="px-4 py-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600 mt-1">{user.email}</p>
              <span
                className={`inline-block text-xs px-2 py-1 rounded-full font-medium mt-2 ${getRoleColor(user.role)}`}
              >
                {getRoleLabel(user.role)}
              </span>
            </div>
            <Button
              onClick={() => {
                onLogout()
                setMobileProfileOpen(false)
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
