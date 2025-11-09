"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Equipment {
  id: string;
  name: string;
  category: string;
  quantity: number;
  available: number;
  condition: "good" | "fair" | "poor";
  location?: string;
  lastMaintenance?: string;
}

export default function EquipmentManagement() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    quantity: string;
    available: string;
    condition: "good" | "fair" | "poor";
    location: string;
    lastMaintenance: string;
  }>({
    name: "",
    category: "",
    quantity: "",
    available: "",
    condition: "good",
    location: "",
    lastMaintenance: "",
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/equipment", {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch equipment");
      }

      const data = await response.json();
      setEquipment(data);
    } catch (err: any) {
      console.error("[v0] Equipment fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredEquipment = equipment.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (eq?: Equipment) => {
    if (eq) {
      setEditingId(eq.id);
      setFormData({
        name: eq.name,
        category: eq.category,
        quantity: eq.quantity.toString(),
        available: eq.available.toString(),
        condition: eq.condition,
        location: eq.location || "",
        lastMaintenance: eq.lastMaintenance || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        category: "",
        quantity: "",
        available: "",
        condition: "good",
        location: "",
        lastMaintenance: "",
      });
    }
    setShowModal(true);
  };

  const handleSaveEquipment = async () => {
    if (!formData.name || !formData.category || !formData.quantity) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const equipmentData = {
        name: formData.name,
        category: formData.category,
        quantity: Number.parseInt(formData.quantity),
        available: Number.parseInt(formData.available),
        condition: formData.condition,
        location: formData.location,
        lastMaintenance: formData.lastMaintenance,
      };

      if (editingId) {
        const response = await fetch(`/api/equipment/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(equipmentData),
        });

        if (!response.ok) {
          throw new Error("Failed to update equipment");
        }
      } else {
        const response = await fetch("/api/equipment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(equipmentData),
        });

        if (!response.ok) {
          throw new Error("Failed to create equipment");
        }
      }

      await fetchEquipment();
      setShowModal(false);
      setFormData({
        name: "",
        category: "",
        quantity: "",
        available: "",
        condition: "good",
        location: "",
        lastMaintenance: "",
      });
    } catch (error: any) {
      console.error("[v0] Equipment save error:", error);
      alert("Failed to save equipment. Please try again.");
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this equipment?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/equipment/${id}`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete equipment");
      }

      await fetchEquipment();
    } catch (error: any) {
      console.error("[v0] Equipment delete error:", error);
      alert("Failed to delete equipment. Please try again.");
    }
  };

  const getConditionBadge = (condition: string) => {
    const styles = {
      good: "bg-green-100 text-green-800",
      fair: "bg-yellow-100 text-yellow-800",
      poor: "bg-red-100 text-red-800",
    };
    return (
      styles[condition as keyof typeof styles] || "bg-gray-100 text-gray-800"
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-gray-600">Loading equipment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load equipment</p>
          <Button
            onClick={fetchEquipment}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex gap-4 flex-col sm:flex-row sm:items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search equipment by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium whitespace-nowrap"
        >
          Add Equipment
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredEquipment.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">
              {equipment.length === 0
                ? "No equipment yet"
                : "No equipment matches your search"}
            </p>
          </Card>
        ) : (
          filteredEquipment.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionBadge(
                        item.condition
                      )}`}
                    >
                      {item.condition.charAt(0).toUpperCase() +
                        item.condition.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Category</p>
                      <p className="font-medium text-gray-900">
                        {item.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total</p>
                      <p className="font-medium text-gray-900">
                        {item.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Available</p>
                      <p className="font-medium text-green-600">
                        {item.available}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">In Use</p>
                      <p className="font-medium text-orange-600">
                        {item.quantity - item.available}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">
                        {item.location || "-"}
                      </p>
                    </div>
                  </div>

                  {item.lastMaintenance && (
                    <div className="mt-2 text-xs text-gray-500">
                      Last maintained:{" "}
                      {new Date(item.lastMaintenance).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleOpenModal(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteEquipment(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? "Edit Equipment" : "Add New Equipment"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipment Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter equipment name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="E.g., Sports, Lab Equipment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Quantity *
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currently Available *
                  </label>
                  <input
                    type="number"
                    value={formData.available}
                    onChange={(e) =>
                      setFormData({ ...formData, available: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        condition: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Storage location"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Maintenance Date
                  </label>
                  <input
                    type="date"
                    value={formData.lastMaintenance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastMaintenance: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEquipment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  {editingId ? "Update Equipment" : "Add Equipment"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
