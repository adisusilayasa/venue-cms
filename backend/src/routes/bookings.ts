import { Router } from 'express';
import { prisma } from '../prisma/client';
import { bookingSchema, bookingQuerySchema } from '../validators/bookings';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const router = Router();

// GET /api/bookings - List all bookings
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const query = bookingQuerySchema.parse(req.query);

    const where: any = {};

    if (query.venueId) {
      where.venueId = query.venueId;
    }

    if (query.status) {
      where.status = query.status;
    }

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        venue: true,
      },
    });

    res.json(bookings);
  })
);

// GET /api/bookings/:id - Get single booking
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        venue: true,
      },
    });

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    res.json(booking);
  })
);

// POST /api/bookings - Create booking
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const data = bookingSchema.parse(req.body);

    // Verify venue exists
    const venue = await prisma.venue.findUnique({
      where: { id: data.venueId },
    });

    if (!venue) {
      throw new AppError('Venue not found', 404);
    }

    // Calculate total price
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);
    const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const totalPrice = hours * Number(venue.pricePerHour);

    const booking = await prisma.booking.create({
      data: {
        venueId: data.venueId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        startTime,
        endTime,
        totalPrice,
        status: 'confirmed',
      },
      include: {
        venue: true,
      },
    });

    res.status(201).json(booking);
  })
);

// DELETE /api/bookings/:id - Delete booking
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await prisma.booking.delete({
      where: { id },
    });

    res.json({ success: true });
  })
);

export default router;
