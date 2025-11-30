import { z } from 'zod';

export const venueSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  location: z.string().min(1, 'Location is required').max(100),
  capacity: z.number().int().positive('Capacity must be positive'),
  pricePerHour: z.number().positive('Price per hour must be positive'),
  description: z.string().min(1, 'Description is required'),
  amenities: z.array(z.string()).default([]),
});

export const venueQuerySchema = z.object({
  search: z.string().optional(),
  minCapacity: z.string().optional(),
  maxPrice: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const updateVenueSchema = venueSchema.partial();

export type VenueInput = z.infer<typeof venueSchema>;
export type VenueQueryInput = z.infer<typeof venueQuerySchema>;
export type UpdateVenueInput = z.infer<typeof updateVenueSchema>;
