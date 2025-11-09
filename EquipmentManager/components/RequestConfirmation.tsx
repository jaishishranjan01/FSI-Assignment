"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RequestConfirmationProps {
  equipmentName: string
  requestDate: string
  returnDate: string
  onDone?: () => void
}

export default function RequestConfirmation({
  equipmentName,
  requestDate,
  returnDate,
  onDone,
}: RequestConfirmationProps) {
  const days = Math.ceil((new Date(returnDate).getTime() - new Date(requestDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-8 text-center">
          <div className="inline-block bg-green-100 text-green-600 rounded-full p-4 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted Successfully</h2>

          <p className="text-gray-600 mb-6">Your equipment request has been submitted and is pending staff approval.</p>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left mb-6 space-y-2">
            <div>
              <p className="text-sm text-gray-600">Equipment</p>
              <p className="font-medium text-gray-900">{equipmentName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-medium text-gray-900">
                {new Date(requestDate).toLocaleDateString()} to {new Date(returnDate).toLocaleDateString()} ({days}{" "}
                days)
              </p>
            </div>
            <div className="pt-2 border-t border-blue-200">
              <p className="text-sm text-blue-900">
                You will receive an email notification once your request is approved.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/requests" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View My Requests</Button>
            </Link>
            <Link href="/equipment" className="flex-1">
              <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
