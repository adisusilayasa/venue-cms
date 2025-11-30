import { Router } from 'express';
import { prisma } from '../prisma/client';
import { venueSchema, venueQuerySchema, updateVenueSchema } from '../validators/venues';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const router = Router();

// GET /api/venues - List all venues
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const query = venueQuerySchema.parse(req.query);

    const where: any = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.minCapacity) {
      where.capacity = { gte: parseInt(query.minCapacity) };
    }

    if (query.maxPrice) {
      where.pricePerHour = { lte: parseFloat(query.maxPrice) };
    }

    const venues = await prisma.venue.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        bookings: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    res.json(venues);
  })
);

// GET /api/venues/:id - Get single venue
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const venue = await prisma.venue.findUnique({
      where: { id },
      include: {
        bookings: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!venue) {
      throw new AppError('Venue not found', 404);
    }

    res.json(venue);
  })
);

// POST /api/venues - Create venue
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const data = venueSchema.parse(req.body);

    const venue = await prisma.venue.create({
      data,
    });

    res.status(201).json(venue);
  })
);

// PUT /api/venues/:id - Update venue
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = updateVenueSchema.parse(req.body);

    const venue = await prisma.venue.update({
      where: { id },
      data,
    });

    res.json(venue);
  })
);

// DELETE /api/venues/:id - Delete venue
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await prisma.venue.delete({
      where: { id },
    });

    res.json({ success: true });
  })
);

export default router;
