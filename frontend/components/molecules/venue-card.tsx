"use client"

import Link from "next/link"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Venue } from "@/lib/api"

interface VenueCardProps {
  venue: Venue
  className?: string
}

export function VenueCard({ venue, className }: VenueCardProps) {
  return (
    <Link href={`/venues/${venue.id}`}>
      <Card
        className={cn(
          "group h-full cursor-pointer transition-all duration-300 ease-out hover:border-stone-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1",
          className
        )}
      >
        <CardContent className="p-8">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <CardTitle className="mb-4 group-hover:text-stone-900 transition-colors">
                {venue.name}
              </CardTitle>

              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-1 h-1 bg-stone-400 rounded-full" />
                <span className="text-sm font-light text-stone-500">
                  {venue.location}
                </span>
              </div>

              <p className="text-sm font-light text-stone-600 mb-6 leading-relaxed line-clamp-2">
                {venue.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-light text-stone-500">Capacity</span>
                  <span className="text-sm font-light text-stone-700">
                    {venue.capacity}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-light text-stone-500">Price</span>
                  <span className="text-sm font-light text-stone-700">
                    ${venue.pricePerHour}/hr
                  </span>
                </div>
              </div>

              {venue.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-light text-stone-600 bg-stone-100 rounded-none"
                    >
                      {amenity}
                    </span>
                  ))}
                  {venue.amenities.length > 3 && (
                    <span className="px-3 py-1 text-xs font-light text-stone-500 bg-stone-50">
                      +{venue.amenities.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-stone-100">
              <span className="text-sm font-light text-stone-600 group-hover:text-stone-800 transition-colors">
                View details →
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
