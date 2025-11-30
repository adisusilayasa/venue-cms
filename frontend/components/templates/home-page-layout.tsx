"use client"

import { Header } from "@/components/organisms/header"
import { SearchBar } from "@/components/molecules/search-bar"
import { VenueGrid } from "@/components/organisms/venue-grid"
import { Venue } from "@/lib/api"

interface HomePageLayoutProps {
  venues: Venue[]
  loading: boolean
  error: string
  onSearch: (query: string) => void
  onClear: () => void
}

export function HomePageLayout({
  venues,
  loading,
  error,
  onSearch,
  onClear,
}: HomePageLayoutProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <div className="max-w-4xl mx-auto px-8 pt-28 pb-20 text-center">
        <h2 className="text-5xl font-extralight text-stone-800 mb-8 tracking-wider leading-tight">
          Find Your Perfect Space
        </h2>
        <p className="text-lg text-stone-500 font-light leading-relaxed max-w-2xl mx-auto mb-16">
          Discover serene venues for your next retreat or gathering
        </p>

        <div className="max-w-2xl mx-auto mb-24">
          <SearchBar onSearch={onSearch} onClear={onClear} />
        </div>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto px-8 mb-8">
          <div className="bg-red-50 border-l-2 border-red-200 px-6 py-4 text-stone-700 font-light">
            {error}
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-8 pb-32">
        <VenueGrid venues={venues} loading={loading} />
      </main>

      <footer className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p className="text-stone-400 font-light text-sm">
            © 2025 Retreat Venues. Crafted with care.
          </p>
        </div>
      </footer>
    </div>
  )
}
