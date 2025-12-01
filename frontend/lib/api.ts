const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  description: string;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  bookings?: Booking[];
}

export interface Booking {
  id: string;
  venueId: string;
  customerName: string;
  customerEmail: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  venue?: Venue;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface VenuesResponse {
  data: Venue[];
  pagination: PaginationMeta;
}

export async function fetchVenues(params?: {
  search?: string;
  minCapacity?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}): Promise<VenuesResponse> {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.minCapacity) queryParams.append('minCapacity', params.minCapacity.toString());
  if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const response = await fetch(`${API_URL}/api/venues?${queryParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch venues');
  return response.json();
}

export async function fetchVenue(id: string): Promise<Venue> {
  const response = await fetch(`${API_URL}/api/venues/${id}`);
  if (!response.ok) throw new Error('Failed to fetch venue');
  return response.json();
}

export async function createVenue(data: Omit<Venue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Venue> {
  const response = await fetch(`${API_URL}/api/venues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create venue');
  return response.json();
}

export async function fetchBookings(params?: { venueId?: string; status?: string }): Promise<Booking[]> {
  const queryParams = new URLSearchParams();
  if (params?.venueId) queryParams.append('venueId', params.venueId);
  if (params?.status) queryParams.append('status', params.status);

  const response = await fetch(`${API_URL}/api/bookings?${queryParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
}

export async function createBooking(data: {
  venueId: string;
  customerName: string;
  customerEmail: string;
  startTime: string;
  endTime: string;
}): Promise<Booking> {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create booking');
  return response.json();
}
