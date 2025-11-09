"use client";

import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Equipment {
  id: string;
  name: string;
  category: string;
  quantity: number;
  available: number;
  condition: "good" | "fair" | "poor";
  description: string;
  image: string;
}

interface EquipmentCatalogProps {
  userId: string;
}

export default function EquipmentCatalog({ userId }: EquipmentCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [requestDate, setRequestDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchEquipment();
  }, []);

  const categories = ["all", ...new Set(equipment.map((e) => e.category))];

  const filtered = useMemo(() => {
    return equipment.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, equipment]);

  const handleRequest = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setRequestModalOpen(true);
  };

  const submitRequest = async () => {
    if (!requestDate || !returnDate) {
      alert("Please select both request and return dates");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          equipmentId: selectedEquipment!.id,
          requestDate,
          returnDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      alert(
        `Request submitted for ${selectedEquipment?.name}. Staff will approve shortly.`
      );
      setRequestModalOpen(false);
      setSelectedEquipment(null);
      setRequestDate("");
      setReturnDate("");
    } catch (error: any) {
      console.error("[v0] Request submit error:", error);
      alert("Failed to submit request. Please try again.");
    }
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
            onClick={() => window.location.reload()}
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
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Equipment
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((equipment) => (
          <Card
            key={equipment.id}
            className="hover:shadow-lg transition flex flex-col"
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-5xl mb-4">{equipment.image}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {equipment.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {equipment.description}
              </p>

              <div className="space-y-2 mb-4 flex-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {equipment.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Available:</span>
                  <span className="text-sm font-medium text-green-600">
                    {equipment.available}/{equipment.quantity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Condition:</span>
                  <span
                    className={`text-sm font-medium ${
                      equipment.condition === "good"
                        ? "text-green-600"
                        : equipment.condition === "fair"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {equipment.condition.charAt(0).toUpperCase() +
                      equipment.condition.slice(1)}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => handleRequest(equipment)}
                disabled={equipment.available === 0}
                className={`w-full py-2 rounded-lg font-medium transition ${
                  equipment.available === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {equipment.available === 0
                  ? "Out of Stock"
                  : "Request Equipment"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {requestModalOpen && selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Request {selectedEquipment.name}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Date
                  </label>
                  <input
                    type="date"
                    value={requestDate}
                    onChange={(e) => setRequestDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Your request will be reviewed by lab
                    staff. You will receive a confirmation email once approved.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setRequestModalOpen(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitRequest}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Submit Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
