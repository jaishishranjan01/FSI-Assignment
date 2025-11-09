"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Equipment Portal
            </h1>
            <p className="text-gray-600">Welcome, {user.name}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
          >
            Sign Out
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 border-0 shadow-lg">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 font-medium">Name</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Email</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Role</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Links */}
          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quick Links
              </h2>
              <div className="space-y-3">
                <Link href="/equipment">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                    <svg
                      className="w-5 h-5 mr-2"
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
                    Browse Equipment
                  </Button>
                </Link>
                <Link href="/requests">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    My Requests
                  </Button>
                </Link>
                {user.role.toLowerCase() === "admin" && (
                  <Link href="/admin">
                    <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dashboard Stats
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Active Requests</p>
                  <p className="text-3xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Equipment Borrowed</p>
                  <p className="text-3xl font-bold text-green-600">0</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Equipment</p>
                  <p className="text-3xl font-bold text-purple-600">0</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Placeholder for future features */}
        <Card className="mt-8 border-0 shadow-lg bg-blue-50">
          <div className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              More Features Coming Soon
            </h3>
            <p className="text-gray-600">
              Equipment catalog, requests, and admin tools are being built.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
