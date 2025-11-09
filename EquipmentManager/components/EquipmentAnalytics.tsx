"use client"

import { Card } from "@/components/ui/card"

export default function EquipmentAnalytics() {
  const stats = [
    { label: "Total Equipment", value: "36", change: "+2 this month" },
    { label: "Currently Available", value: "21", change: "-3 issued today" },
    { label: "Pending Requests", value: "5", change: "+1 today" },
    { label: "Overdue Returns", value: "2", change: "Needs attention" },
  ]

  const recentActivity = [
    { id: 1, action: "Approved request", item: "Microscope", user: "Alice Johnson", time: "2 hours ago" },
    { id: 2, action: "Equipment returned", item: "Camera", user: "David Lee", time: "4 hours ago" },
    { id: 3, action: "New request", item: "Football Kit", user: "Emma Davis", time: "6 hours ago" },
    { id: 4, action: "Equipment issued", item: "Projector", user: "Frank Miller", time: "1 day ago" },
  ]

  const categoryStats = [
    { category: "Sports", equipment: 8, available: 5, usage: "62%" },
    { category: "Lab Equipment", equipment: 10, available: 7, usage: "30%" },
    { category: "Photography", equipment: 3, available: 2, usage: "33%" },
    { category: "Musical Instruments", equipment: 4, available: 1, usage: "75%" },
    { category: "Electronics", equipment: 2, available: 1, usage: "50%" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6">
            <div className="text-gray-600 text-sm font-medium mb-2">{stat.label}</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.change}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.item} - {activity.user}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Usage by Category</h2>
          <div className="space-y-4">
            {categoryStats.map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">{cat.category}</span>
                  <span className="text-sm text-gray-600">
                    {cat.available}/{cat.equipment}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: cat.usage }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{cat.usage} in use</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
