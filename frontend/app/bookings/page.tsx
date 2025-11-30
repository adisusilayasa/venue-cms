'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchBookings, Booking } from '@/lib/api';

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      setLoading(true);
      const data = await fetchBookings();
      setBookings(data);
      setError('');
    } catch (err) {
      setError('Failed to load bookings. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-stone-800 tracking-wide">Bookings</h1>
            <Link href="/" className="text-stone-600 hover:text-stone-900 font-light">
              ← Back to venues
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-extralight text-stone-800 mb-4 tracking-wider">
            All Reservations
          </h2>
          <p className="text-stone-500 font-light">Manage your venue bookings</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-2 border-red-200 px-6 py-4 text-stone-700 font-light mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-24">
            <p className="text-stone-400 font-light">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-400 font-light">No bookings found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-stone-200 p-8 transition-all hover:border-stone-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-stone-800 mb-2 tracking-wide">
                      {booking.venue?.name || 'Venue'}
                    </h3>
                    <p className="text-stone-500 font-light mb-1">
                      {booking.customerName}
                    </p>
                    <p className="text-stone-400 text-sm font-light">
                      {booking.customerEmail}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-light text-stone-800 mb-2">
                      ${booking.totalPrice}
                    </p>
                    <span className="inline-block bg-stone-100 text-stone-700 px-3 py-1 text-xs font-light">
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-2 text-stone-600 font-light text-sm">
                    <span className="inline-block w-1 h-1 bg-stone-400 rounded-full"></span>
                    {formatDate(booking.startTime)} - {formatDate(booking.endTime)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
