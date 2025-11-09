"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ApprovalRequest {
  id: string;
  studentName: string;
  equipmentName: string;
  requestDate: string;
  returnDate: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
}

export default function RequestApprovals() {
  const [requests, setRequests] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/approvals", {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch approvals");
      }

      const data = await response.json();
      setRequests(data);
    } catch (err: any) {
      console.error("[v0] Approvals fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/approvals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ status: "approved" }),
      });

      if (!response.ok) {
        throw new Error("Failed to approve request");
      }

      await fetchApprovals();
    } catch (error: any) {
      console.error("[v0] Approval error:", error);
      alert("Failed to approve request. Please try again.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/approvals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (!response.ok) {
        throw new Error("Failed to reject request");
      }

      await fetchApprovals();
    } catch (error: any) {
      console.error("[v0] Rejection error:", error);
      alert("Failed to reject request. Please try again.");
    }
  };

  const pending = requests.filter((r) => r.status === "pending");

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-gray-600">Loading approvals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load approvals</p>
          <Button
            onClick={fetchApprovals}
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
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900">
            <strong>{pending.length}</strong> request
            {pending.length !== 1 ? "s" : ""} pending approval
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {request.studentName}
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : request.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Equipment:</span>
                    <p className="font-medium text-gray-900">
                      {request.equipmentName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Request Date:</span>
                    <p className="font-medium text-gray-900">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Return Date:</span>
                    <p className="font-medium text-gray-900">
                      {new Date(request.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Requested:</span>
                    <p className="font-medium text-gray-900">
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {request.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {requests.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-600 text-lg">No requests to review</p>
        </Card>
      )}
    </div>
  );
}
