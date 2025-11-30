"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-stone-100/50 sticky top-0 z-50 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-light text-stone-800 tracking-wide hover:text-stone-900 transition-colors">
              Retreat Venues
            </h1>
          </Link>
          <div className="flex gap-6">
            <Link
              href="/bookings"
              className="text-stone-600 hover:text-stone-900 transition-colors duration-200 font-light"
            >
              Bookings
            </Link>
            <Link href="/admin/venues/new">
              <Button variant="zenPrimary" size="sm">
                Add Venue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
