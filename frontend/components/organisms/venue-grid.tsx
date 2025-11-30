"use client"

import { Venue } from "@/lib/api"
import { VenueCard } from "@/components/molecules/venue-card"

interface VenueGridProps {
  venues: Venue[]
  loading?: boolean
}

export function VenueGrid({ venues, loading }: VenueGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white border border-stone-200 p-8 h-full animate-pulse"
          >
            <div className="h-6 bg-stone-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-stone-200 rounded w-1/2 mb-6"></div>
            <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-stone-200 rounded w-2/3 mb-6"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-stone-200 rounded w-16"></div>
              <div className="h-6 bg-stone-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (venues.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-stone-400 font-light">No venues found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  )
}
