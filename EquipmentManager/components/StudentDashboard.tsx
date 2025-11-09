"use client"

import { useState } from "react"
import EquipmentCatalog from "@/components/EquipmentCatalog"
import MyRequests from "@/components/MyRequests"

interface User {
  id: string
  role: "student" | "admin" | "staff"
  name: string
  email: string
}

export default function StudentDashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<"catalog" | "requests">("catalog")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user.name}</h1>
        <p className="text-gray-600">Browse and request equipment from our inventory</p>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`px-4 py-3 font-medium transition ${
            activeTab === "catalog" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Equipment Catalog
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-3 font-medium transition ${
            activeTab === "requests" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          My Requests
        </button>
      </div>

      {activeTab === "catalog" && <EquipmentCatalog userId={user.id} />}
      {activeTab === "requests" && <MyRequests userId={user.id} />}
    </div>
  )
}
