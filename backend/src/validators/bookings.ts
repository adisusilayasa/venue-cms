import { z } from 'zod';

export const bookingSchema = z.object({
  venueId: z.string().uuid('Invalid venue ID'),
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  startTime: z.string().datetime('Invalid start time'),
  endTime: z.string().datetime('Invalid end time'),
}).refine((data) => {
  const start = new Date(data.startTime);
  const end = new Date(data.endTime);
  return start < end;
}, {
  message: 'End time must be after start time',
  path: ['endTime'],
});

export const bookingQuerySchema = z.object({
  venueId: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type BookingQueryInput = z.infer<typeof bookingQuerySchema>;
