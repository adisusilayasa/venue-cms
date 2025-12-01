'use client';

import { useEffect, useState } from 'react';
import { fetchVenues, Venue, PaginationMeta } from '@/lib/api';
import { HomePageLayout } from '@/components/templates/home-page-layout';

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    loadVenues(currentPage);
  }, [currentPage]);

  async function loadVenues(page = 1) {
    try {
      setLoading(true);
      const result = await fetchVenues({
        search: searchTerm,
        page: page,
        limit: itemsPerPage,
      });
      setVenues(result.data);
      setPagination(result.pagination);
      setError('');
    } catch (err: any) {
      setError('Failed to load venues. Please make sure the backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query: string) {
    setSearchTerm(query);
    setCurrentPage(1);
    try {
      setLoading(true);
      const result = await fetchVenues({
        search: query,
        page: 1,
        limit: itemsPerPage,
      });
      setVenues(result.data);
      setPagination(result.pagination);
      setCurrentPage(1);
      setError('');
    } catch (err) {
      setError('Failed to search venues.');
    } finally {
      setLoading(false);
    }
  }

  async function handleClear() {
    setSearchTerm('');
    setCurrentPage(1);
    loadVenues(1);
  }

  async function handlePageChange(newPage: number) {
    if (newPage < 1 || !pagination) return;
    if (newPage > pagination.totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <HomePageLayout
      venues={venues}
      loading={loading}
      error={error}
      pagination={pagination}
      onSearch={handleSearch}
      onClear={handleClear}
      onPageChange={handlePageChange}
    />
  );
}
