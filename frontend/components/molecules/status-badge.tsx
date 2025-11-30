"use client"

import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "confirmed" | "pending" | "cancelled"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "zenSuccess" | "zenWarning" | "zenError"> = {
    confirmed: "zenSuccess",
    pending: "zenWarning",
    cancelled: "zenError",
  }

  const labels: Record<string, string> = {
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
  }

  return <Badge variant={variants[status]}>{labels[status]}</Badge>
}
