"use client"

import { useState } from "react"
import EquipmentManagement from "@/components/EquipmentManagement"
import RequestApprovals from "@/components/RequestApprovals"
import EquipmentAnalytics from "@/components/EquipmentAnalytics"
import UserManagement from "@/components/UserManagement"

interface User {
  id: string
  role: "student" | "admin" | "staff"
  name: string
  email: string
}

export default function AdminDashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<"overview" | "equipment" | "approvals" | "users">("overview")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage equipment, users, and borrowing requests</p>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-3 font-medium transition whitespace-nowrap ${
            activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("equipment")}
          className={`px-4 py-3 font-medium transition whitespace-nowrap ${
            activeTab === "equipment" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Manage Equipment
        </button>
        <button
          onClick={() => setActiveTab("approvals")}
          className={`px-4 py-3 font-medium transition whitespace-nowrap ${
            activeTab === "approvals" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Approvals
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-3 font-medium transition whitespace-nowrap ${
            activeTab === "users" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Users
        </button>
      </div>

      {activeTab === "overview" && <EquipmentAnalytics />}
      {activeTab === "equipment" && <EquipmentManagement />}
      {activeTab === "approvals" && <RequestApprovals />}
      {activeTab === "users" && <UserManagement />}
    </div>
  )
}
