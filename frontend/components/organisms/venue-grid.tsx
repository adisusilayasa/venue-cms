"use client"

import { Venue, PaginationMeta } from "@/lib/api"
import { VenueCard } from "@/components/molecules/venue-card"

interface VenueGridProps {
  venues: Venue[]
  loading?: boolean
  pagination?: PaginationMeta | null
  onPageChange: (page: number) => void
}

export function VenueGrid({ venues, loading, pagination, onPageChange }: VenueGridProps) {
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

  if (!venues || venues.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-stone-400 font-light">No venues found.</p>
      </div>
    )
  }

  const shouldShowPagination = pagination && pagination.totalPages > 1

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {venues?.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {shouldShowPagination && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={!pagination.hasPrevPage}
            className="px-4 py-2 border border-stone-200 rounded bg-white text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 border border-stone-200 rounded transition-colors ${
                  page === pagination.page
                    ? 'bg-stone-800 text-white border-stone-800'
                    : 'bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 border border-stone-200 rounded bg-white text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}
