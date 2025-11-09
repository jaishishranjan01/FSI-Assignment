"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface BreadcrumbItem {
  label: string
  href?: string
}

const pathToBreadcrumb: Record<string, BreadcrumbItem[]> = {
  "/equipment": [{ label: "Equipment", href: "/equipment" }],
  "/equipment/[id]": [{ label: "Equipment", href: "/equipment" }, { label: "Details" }],
  "/requests": [{ label: "Requests", href: "/requests" }],
  "/admin": [{ label: "Admin", href: "/admin" }, { label: "Dashboard" }],
  "/dashboard": [{ label: "Dashboard", href: "/dashboard" }],
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Map dynamic routes to static breadcrumb keys
  const getBreadcrumbKey = (path: string): string => {
    if (path.startsWith("/equipment/") && path !== "/equipment") {
      return "/equipment/[id]"
    }
    return path
  }

  const breadcrumbKey = getBreadcrumbKey(pathname)
  const items = pathToBreadcrumb[breadcrumbKey] || []

  if (!items.length) return null

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <Link href="/dashboard" className="text-blue-600 hover:underline">
        Home
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="text-gray-400">/</span>
          {item.href ? (
            <Link href={item.href} className="text-blue-600 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
