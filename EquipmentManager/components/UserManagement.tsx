"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "staff" | "admin";
  joinDate: string;
  activeRequests: number;
  totalBorrows: number;
  status: "active" | "suspended";
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@school.com",
    role: "student",
    joinDate: "2024-09-15",
    activeRequests: 2,
    totalBorrows: 8,
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@school.com",
    role: "student",
    joinDate: "2024-10-01",
    activeRequests: 1,
    totalBorrows: 3,
    status: "active",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@school.com",
    role: "staff",
    joinDate: "2024-08-20",
    activeRequests: 0,
    totalBorrows: 12,
    status: "active",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<
    "all" | "student" | "staff" | "admin"
  >("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Failed to fetch users");
        }

        const data = await response.json();
        console.log("[v0] Users fetched successfully:", data);
        setUsers(data);
      } catch (err: any) {
        console.error("[v0] Error fetching users:", err.message);
        setError(err.message);
        setUsers(MOCK_USERS);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const searchUsers = async () => {
      if (!searchTerm) {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const response = await fetch(
          `/api/users/search?q=${encodeURIComponent(searchTerm)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Failed to search users");
        }

        const data = await response.json();
        console.log("[v0] Search results:", data);
        setUsers(data);
      } catch (err: any) {
        console.error("[v0] Error searching users:", err.message);
        setError(err.message);
        const filtered = MOCK_USERS.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUsers(filtered);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchUsers();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const filteredUsers = users.filter(
    (user) => filterRole === "all" || user.role === filterRole
  );

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u
      )
    );
  };

  const getRoleColor = (role: string) => {
    const colors = {
      student: "bg-blue-100 text-blue-800",
      staff: "bg-green-100 text-green-800",
      admin: "bg-purple-100 text-purple-800",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}
      {loading && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg">
          Loading users...
        </div>
      )}

      <div className="mb-6 flex gap-4 flex-col sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="staff">Staff</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">No users found</p>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Member Since</p>
                      <p className="font-medium text-gray-900">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Active Requests</p>
                      <p className="font-medium text-orange-600">
                        {user.activeRequests}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Borrows</p>
                      <p className="font-medium text-blue-600">
                        {user.totalBorrows}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Compliance</p>
                      <p className="font-medium text-green-600">
                        Good Standing
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      user.status === "active"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {user.status === "active" ? "Suspend" : "Activate"}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
