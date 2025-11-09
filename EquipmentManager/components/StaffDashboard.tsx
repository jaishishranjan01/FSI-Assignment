"use client"

import { useState } from "react"
import RequestApprovals from "@/components/RequestApprovals"
import MyRequests from "@/components/MyRequests"

interface User {
  id: string
  role: "student" | "admin" | "staff"
  name: string
  email: string
}

export default function StaffDashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<"approvals" | "requests">("approvals")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab Assistant Dashboard</h1>
        <p className="text-gray-600">Approve requests and manage equipment issuance</p>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("approvals")}
          className={`px-4 py-3 font-medium transition ${
            activeTab === "approvals" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Pending Approvals
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

      {activeTab === "approvals" && <RequestApprovals />}
      {activeTab === "requests" && <MyRequests userId={user.id} />}
    </div>
  )
}
