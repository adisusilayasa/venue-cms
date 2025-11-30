import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Delete existing data
  await prisma.booking.deleteMany();
  await prisma.venue.deleteMany();

  // Create venues
  const venues = await Promise.all([
    prisma.venue.create({
      data: {
        name: 'Sunset Conference Center',
        location: 'Miami, FL',
        capacity: 150,
        pricePerHour: 150.00,
        description: 'A modern conference center with stunning sunset views over Biscayne Bay. Perfect for corporate events, weddings, and large gatherings.',
        amenities: ['WiFi', 'Parking', 'Catering', 'AV Equipment', 'Stage', 'Ocean View'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Mountain View Retreat',
        location: 'Aspen, CO',
        capacity: 80,
        pricePerHour: 200.00,
        description: 'A cozy mountain retreat nestled in the Colorado Rockies. Ideal for team retreats and intimate gatherings.',
        amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Hot Tub', 'Hiking Trails'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Urban Loft Space',
        location: 'New York, NY',
        capacity: 100,
        pricePerHour: 180.00,
        description: 'A trendy loft space in the heart of Manhattan. Exposed brick walls and high ceilings create a unique atmosphere.',
        amenities: ['WiFi', 'Parking', 'Bar', 'Sound System', 'Natural Light'],
      },
    }),
    prisma.venue.create({
      data: {
        'name': 'Beachside Pavilion',
        'location': 'San Diego, CA',
        'capacity': 200,
        'pricePerHour': 175.00,
        'description': 'An open-air pavilion just steps from the beach. Perfect for outdoor events and celebrations.',
        amenities: ['WiFi', 'Beach Access', 'BBQ Area', 'String Lights', 'Sound System'],
      },
    }),
    prisma.venue.create({
      data: {
        'name': 'Garden Estate',
        'location': 'Napa Valley, CA',
        'capacity': 120,
        'pricePerHour': 250.00,
        'description': 'An elegant estate surrounded by vineyards. Features beautiful gardens and a historic manor house.',
        amenities: ['WiFi', 'Parking', 'Gardens', 'Wine Cellar', 'Chef Kitchen', 'Bridal Suite'],
      },
    }),
  ]);

  console.log(`✅ Created ${venues.length} venues`);

  // Create bookings
  const now = new Date();
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        venueId: venues[0].id,
        customerName: 'John Smith',
        customerEmail: 'john.smith@example.com',
        startTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // Next week
        endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours later
        totalPrice: 600.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[1].id,
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@example.com',
        startTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // Two weeks from now
        endTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 6 hours later
        totalPrice: 1200.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[2].id,
        customerName: 'Mike Davis',
        customerEmail: 'mike.davis@example.com',
        startTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        endTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours later
        totalPrice: 540.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[0].id,
        customerName: 'Emily Chen',
        customerEmail: 'emily.chen@example.com',
        startTime: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
        endTime: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000), // 5 hours later
        totalPrice: 750.00,
        status: 'confirmed',
      },
    }),
  ]);

  console.log(`✅ Created ${bookings.length} bookings`);
  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
