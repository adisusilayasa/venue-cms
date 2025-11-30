"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface BookingFormProps {
  venueId: string
  onSubmit: (data: {
    customerName: string
    customerEmail: string
    startTime: string
    endTime: string
  }) => void
  pricePerHour: number
}

export function BookingForm({ venueId, onSubmit, pricePerHour }: BookingFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    startTime: "",
    endTime: "",
  })
  const [loading, setLoading] = useState(false)

  const calculateTotal = () => {
    if (!formData.startTime || !formData.endTime) return 0
    const start = new Date(formData.startTime)
    const end = new Date(formData.endTime)
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    return hours > 0 ? hours * Number(pricePerHour) : 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-8">
        <CardTitle className="mb-8 text-2xl">Make a Reservation</CardTitle>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              type="text"
              required
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              id="customerEmail"
              type="email"
              required
              value={formData.customerEmail}
              onChange={(e) =>
                setFormData({ ...formData, customerEmail: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="datetime-local"
              required
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="datetime-local"
              required
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
            />
          </div>

          {calculateTotal() > 0 && (
            <div className="pt-4 border-t border-stone-200">
              <p className="text-sm font-light text-stone-600">
                Total Price:{" "}
                <span className="text-lg font-light text-stone-800">
                  ${calculateTotal().toFixed(2)}
                </span>
              </p>
            </div>
          )}

          <Button
            type="submit"
            variant="zenPrimary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Booking..." : "Reserve Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
