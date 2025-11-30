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

    // Pagination parameters
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const total = await prisma.booking.count({ where });

    // Fetch bookings with pagination
    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        venue: true,
      },
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);

    res.json({
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
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

    // Check for conflicting bookings (availability check)
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        venueId: data.venueId,
        status: { not: 'cancelled' }, // Don't check against cancelled bookings
        OR: [
          // Case 1: New booking starts during existing booking
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } },
            ],
          },
          // Case 2: New booking ends during existing booking
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
          // Case 3: New booking completely contains existing booking
          {
            AND: [
              { startTime: { gte: startTime } },
              { endTime: { lte: endTime } },
            ],
          },
        ],
      },
    });

    if (conflictingBooking) {
      throw new AppError(
        'Venue is not available for the selected dates. Please choose different dates.',
        409
      );
    }

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
