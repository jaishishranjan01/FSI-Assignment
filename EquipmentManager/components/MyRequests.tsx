"use client";

import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Request {
  id: string;
  equipmentName: string;
  requestDate: string;
  returnDate: string;
  status: "pending" | "approved" | "issued" | "returned" | "rejected";
  createdAt: string;
}

interface MyRequestsProps {
  userId: string;
}

export default function MyRequests({ userId }: MyRequestsProps) {
  const [filterStatus, setFilterStatus] = useState<"all" | Request["status"]>(
    "all"
  );
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/requests", {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data = await response.json();
        setRequests(data);
      } catch (err: any) {
        console.error("[v0] Requests fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filtered = useMemo(() => {
    return requests.filter(
      (req) => filterStatus === "all" || req.status === filterStatus
    );
  }, [filterStatus, requests]);

  const getStatusColor = (status: Request["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-blue-100 text-blue-800",
      issued: "bg-green-100 text-green-800",
      returned: "bg-gray-100 text-gray-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  const getStatusLabel = (status: Request["status"]) => {
    const labels = {
      pending: "Pending Review",
      approved: "Approved",
      issued: "Issued",
      returned: "Returned",
      rejected: "Rejected",
    };
    return labels[status];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-gray-600">Loading requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load requests</p>
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
      <div className="mb-6 flex gap-2 flex-wrap">
        {(
          [
            "all",
            "pending",
            "approved",
            "issued",
            "returned",
            "rejected",
          ] as const
        ).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-600 text-lg">No requests found</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {request.equipmentName}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          request.status
                        )} mt-1`}
                      >
                        {getStatusLabel(request.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {request.status === "issued" && (
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                      Return
                    </Button>
                  )}
                  {request.status === "pending" && (
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
