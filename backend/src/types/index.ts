export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  description: string;
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  venueId: string;
  customerName: string;
  customerEmail: string;
  startTime: Date;
  endTime: Date;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VenueWithBookings extends Venue {
  bookings: Booking[];
}

export interface BookingWithVenue extends Booking {
  venue: Venue;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
