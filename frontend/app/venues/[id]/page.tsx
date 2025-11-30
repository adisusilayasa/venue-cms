'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchVenue, createBooking, Venue } from '@/lib/api';
import { Header } from '@/components/organisms/header';
import { BookingForm } from '@/components/molecules/booking-form';
import { Badge } from '@/components/ui/badge';

export default function VenueDetail() {
  const params = useParams();
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    loadVenue();
  }, [params.id]);

  async function loadVenue() {
    try {
      setLoading(true);
      const data = await fetchVenue(params.id as string);
      setVenue(data);
      setError('');
    } catch (err) {
      setError('Failed to load venue. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 font-light">Loading venue...</p>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 mb-6 font-light">Venue not found.</p>
          <Link href="/" className="text-stone-600 hover:text-stone-900 font-light">
            ← Back to venues
          </Link>
        </div>
      </div>
    );
  }

  async function handleBookingSubmit(data: {
    customerName: string
    customerEmail: string
    startTime: string
    endTime: string
  }) {
    if (!venue) return

    setBookingLoading(true)
    try {
      await createBooking({
        venueId: venue.id,
        ...data,
      })
      alert('Booking created successfully!')
      router.push('/bookings')
    } catch (err) {
      setError('Failed to create booking. Please check your input.')
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <div className="max-w-5xl mx-auto px-8 py-6">
        <Link href="/" className="text-stone-600 hover:text-stone-900 font-light">
          ← Back to venues
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Venue Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-extralight text-stone-800 mb-6 tracking-wider">
            {venue.name}
          </h1>
          <div className="flex items-center gap-3 text-stone-500 font-light mb-8">
            <span className="inline-block w-1 h-1 bg-stone-400 rounded-full"></span>
            {venue.location}
          </div>
          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div className="bg-white border border-stone-200 p-4">
              <p className="text-stone-400 text-sm font-light mb-1">Capacity</p>
              <p className="text-stone-800 font-light">{venue.capacity} guests</p>
            </div>
            <div className="bg-white border border-stone-200 p-4">
              <p className="text-stone-400 text-sm font-light mb-1">Rate</p>
              <p className="text-stone-800 font-light">${venue.pricePerHour}/hour</p>
            </div>
          </div>
        </div>

        {/* Venue Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-2xl font-light text-stone-800 mb-6 tracking-wide">About</h2>
            <p className="text-stone-600 font-light leading-relaxed mb-12">
              {venue.description}
            </p>

            {venue.amenities && venue.amenities.length > 0 && (
              <div>
                <h3 className="text-xl font-light text-stone-800 mb-4 tracking-wide">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {venue.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-stone-600 font-light"
                    >
                      <span className="inline-block w-1 h-1 bg-stone-400 rounded-full"></span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Form */}
          {error && (
            <div className="bg-red-50 border-l-2 border-red-200 px-6 py-4 text-stone-700 font-light mb-6">
              {error}
            </div>
          )}
          <BookingForm
            venueId={venue.id}
            onSubmit={handleBookingSubmit}
            pricePerHour={venue.pricePerHour}
          />
        </div>

        {/* Bookings Display */}
        {venue.bookings && venue.bookings.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-stone-800 mb-8 tracking-wide">
              Existing Bookings
            </h2>
            <div className="space-y-3">
              {venue.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white border border-stone-200 p-6 flex items-center justify-between"
                >
                  <div>
                    <p className="text-stone-800 font-light mb-1">
                      {new Date(booking.startTime).toLocaleDateString()} -{' '}
                      {new Date(booking.endTime).toLocaleDateString()}
                    </p>
                    <p className="text-stone-500 text-sm font-light">
                      {booking.customerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-stone-800 font-light">${booking.totalPrice}</p>
                    <span className="text-xs text-stone-500 font-light">{booking.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
