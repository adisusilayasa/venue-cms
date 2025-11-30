'use client';

import { useEffect, useState } from 'react';
import { fetchVenues, Venue } from '@/lib/api';
import { HomePageLayout } from '@/components/templates/home-page-layout';

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadVenues();
  }, []);

  async function loadVenues() {
    try {
      setLoading(true);
      const data = await fetchVenues();
      setVenues(data);
      setError('');
    } catch (err) {
      setError('Failed to load venues. Please make sure the backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query: string) {
    try {
      setLoading(true);
      const data = await fetchVenues({ search: query });
      setVenues(data);
      setError('');
    } catch (err) {
      setError('Failed to search venues.');
    } finally {
      setLoading(false);
    }
  }

  async function handleClear() {
    setSearchTerm('');
    loadVenues();
  }

  return (
    <HomePageLayout
      venues={venues}
      loading={loading}
      error={error}
      onSearch={handleSearch}
      onClear={handleClear}
    />
  );
}
