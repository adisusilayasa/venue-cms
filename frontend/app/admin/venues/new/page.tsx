'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createVenue } from '@/lib/api';

export default function NewVenue() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: 0,
    pricePerHour: 0,
    description: '',
    amenities: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const amenitiesArray = formData.amenities
        .split(',')
        .map((a) => a.trim())
        .filter((a) => a.length > 0);

      await createVenue({
        name: formData.name,
        location: formData.location,
        capacity: formData.capacity,
        pricePerHour: formData.pricePerHour,
        description: formData.description,
        amenities: amenitiesArray,
      } as any);

      alert('Venue created successfully!');
      router.push('/');
    } catch (err) {
      setError('Failed to create venue. Please check your input.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <Link href="/" className="text-stone-600 hover:text-stone-900 font-light">
            ← Back to venues
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-extralight text-stone-800 mb-4 tracking-wider">
            Add New Venue
          </h1>
          <p className="text-stone-500 font-light">Create a space for memorable gatherings</p>
        </div>

        <div className="bg-white border border-stone-200 p-8">
          {error && (
            <div className="bg-red-50 border-l-2 border-red-200 px-6 py-4 text-stone-700 font-light mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-light text-stone-700 mb-2">
                Venue Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-400 transition-colors font-light"
                placeholder="Enter venue name"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-stone-700 mb-2">
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-400 transition-colors font-light"
                placeholder="City, State"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light text-stone-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-400 transition-colors font-light"
                  placeholder="Number of guests"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-stone-700 mb-2">
                  Price per Hour
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.pricePerHour}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerHour: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-400 transition-colors font-light"
                  placeholder="USD"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-stone-700 mb-2">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-400 transition-colors font-light resize-none"
                placeholder="Describe the venue and its unique features"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-stone-700 mb-2">
                Amenities
              </label>
              <input
                type="text"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-400 transition-colors font-light"
                placeholder="WiFi, Parking, Catering (comma-separated)"
              />
              <p className="text-stone-400 text-sm font-light mt-2">
                Separate multiple amenities with commas
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-stone-800 text-white py-4 font-light tracking-wide hover:bg-stone-700 transition-colors disabled:bg-stone-300"
              >
                {loading ? 'Creating...' : 'Create Venue'}
              </button>
              <Link
                href="/"
                className="flex-1 bg-white border border-stone-300 text-stone-700 py-4 font-light tracking-wide hover:bg-stone-50 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
