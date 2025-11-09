"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "staff";
}

interface Equipment {
  id: string;
  name: string;
  category: string;
  quantity: number;
  available: number;
  condition: "good" | "fair" | "poor";
  description: string;
  image: string;
  specifications?: string;
  usageInstructions?: string;
  restrictions?: string;
}

export default function EquipmentDetailPage() {
  const [user, setUser] = useState<User | null>(null);
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestDate, setRequestDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [requestNotes, setRequestNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth");
      return;
    }
    setUser(JSON.parse(userData));

    const fetchEquipment = async () => {
      try {
        const equipmentId = params.id as string;
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/equipment/${equipmentId}`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Equipment not found");
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
  }, [router, params]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth");
  };

  const submitRequest = async () => {
    if (!requestDate || !returnDate) {
      alert("Please select both request and return dates");
      return;
    }

    const reqDate = new Date(requestDate);
    const retDate = new Date(returnDate);

    if (retDate <= reqDate) {
      alert("Return date must be after request date");
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
          equipmentId: equipment?.id,
          requestDate,
          returnDate,
          notes: requestNotes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      alert(
        `Request submitted for ${equipment?.name}. Staff will approve shortly.`
      );
      setShowRequestModal(false);
      setRequestDate("");
      setReturnDate("");
      setRequestNotes("");
    } catch (error: any) {
      console.error("[v0] Request submit error:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <>
        <Navigation user={user} onLogout={handleLogout} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              {error || "Equipment not found"}
            </p>
            <Link href="/equipment">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Back to Equipment
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const getConditionStyles = (condition: string) => {
    switch (condition) {
      case "good":
        return { bg: "bg-green-100", text: "text-green-800", label: "Good" };
      case "fair":
        return { bg: "bg-yellow-100", text: "text-yellow-800", label: "Fair" };
      case "poor":
        return { bg: "bg-red-100", text: "text-red-800", label: "Poor" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", label: "Unknown" };
    }
  };

  const conditionStyle = getConditionStyles(equipment.condition);
  const maxDays = equipment.restrictions?.match(/\d+/)?.[0] || "7";

  return (
    <>
      <Navigation user={user} onLogout={handleLogout} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs />

          {/* Back Button */}
          <Link href="/equipment">
            <button className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Equipment
            </button>
          </Link>

          <Card className="mb-6 border-0 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              {/* Equipment Image & Basic Info */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="text-8xl mb-6">{equipment.image}</div>
                <div className="w-full space-y-3">
                  <div
                    className={`${conditionStyle.bg} ${conditionStyle.text} px-4 py-2 rounded-lg text-center font-medium`}
                  >
                    Condition: {conditionStyle.label}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {equipment.available}/{equipment.quantity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Equipment Details */}
              <div className="md:col-span-2">
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {equipment.category}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {equipment.name}
                  </h1>
                </div>

                <p className="text-lg text-gray-600 mb-6">
                  {equipment.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Units</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {equipment.quantity}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Currently Available</p>
                    <p className="text-2xl font-bold text-green-600">
                      {equipment.available}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">In Use</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {equipment.quantity - equipment.available}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Max Borrow Period</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {maxDays} days
                    </p>
                  </div>
                </div>

                {/* Request Button */}
                <Button
                  onClick={() => setShowRequestModal(true)}
                  disabled={equipment.available === 0}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
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
            </div>
          </Card>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Specifications */}
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Specifications
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {equipment.specifications}
                </p>
              </div>
            </Card>

            {/* Usage Instructions */}
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Usage Instructions
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {equipment.usageInstructions}
                </p>
              </div>
            </Card>

            {/* Restrictions */}
            <Card className="border-0 shadow-lg md:col-span-2">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4v2m0 5v2m0-17V7m0 5V9m0 5v-2"
                    />
                  </svg>
                  Important Restrictions & Terms
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {equipment.restrictions}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Request Equipment
                </h2>
                <button
                  onClick={() => setShowRequestModal(false)}
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

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Equipment:</strong> {equipment.name}
                </p>
                <p className="text-sm text-blue-900 mt-2">
                  <strong>Maximum borrow period:</strong> {maxDays} days
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Date
                  </label>
                  <input
                    type="date"
                    value={requestDate}
                    onChange={(e) => setRequestDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
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
                    min={requestDate || new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={requestNotes}
                    onChange={(e) => setRequestNotes(e.target.value)}
                    placeholder="Any special requirements or notes for your request..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-sm text-amber-900">
                    <strong>Please review our restrictions</strong> and ensure
                    you comply with all usage terms. Violations may result in
                    restricted access.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitRequest}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                >
                  Submit Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
