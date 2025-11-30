import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Delete existing data
  await prisma.booking.deleteMany();
  await prisma.venue.deleteMany();

  // Create venues - 12 diverse venues across different locations
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
        name: 'Beachside Pavilion',
        location: 'San Diego, CA',
        capacity: 200,
        pricePerHour: 175.00,
        description: 'An open-air pavilion just steps from the beach. Perfect for outdoor events and celebrations.',
        amenities: ['WiFi', 'Beach Access', 'BBQ Area', 'String Lights', 'Sound System'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Garden Estate',
        location: 'Napa Valley, CA',
        capacity: 120,
        pricePerHour: 250.00,
        description: 'An elegant estate surrounded by vineyards. Features beautiful gardens and a historic manor house.',
        amenities: ['WiFi', 'Parking', 'Gardens', 'Wine Cellar', 'Chef Kitchen', 'Bridal Suite'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Lakeside Cabin',
        location: 'Lake Tahoe, NV',
        capacity: 50,
        pricePerHour: 120.00,
        description: 'A rustic cabin overlooking pristine Lake Tahoe waters. Perfect for small group retreats and workshops.',
        amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Lake Access', 'Kayaks'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Desert Oasis',
        location: 'Sedona, AZ',
        capacity: 90,
        pricePerHour: 190.00,
        description: 'A tranquil desert retreat with stunning red rock views. Ideal for yoga sessions and meditation workshops.',
        amenities: ['WiFi', 'Outdoor Deck', 'Meditation Garden', 'Catering', 'Parking'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Historic Theater',
        location: 'Chicago, IL',
        capacity: 300,
        pricePerHour: 300.00,
        description: 'A beautifully restored 1920s theater with original frescoes and modern sound systems.',
        amenities: ['WiFi', 'AV Equipment', 'Box Office', 'Stage', 'Dressing Rooms', 'Bar'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Rooftop Garden',
        location: 'Los Angeles, CA',
        capacity: 75,
        pricePerHour: 220.00,
        description: 'A stunning rooftop space with panoramic city views and lush garden areas.',
        amenities: ['WiFi', 'Bar', 'Heaters', 'Garden', 'City View', 'Parking'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Secluded Farmhouse',
        location: 'Vermont, VT',
        capacity: 60,
        pricePerHour: 140.00,
        description: 'A charming 19th-century farmhouse surrounded by rolling hills and apple orchards.',
        amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Orchard Access', 'Parking'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Modern Art Gallery',
        location: 'Seattle, WA',
        capacity: 110,
        pricePerHour: 210.00,
        description: 'A contemporary art gallery with rotating exhibitions. Features white walls and high ceilings.',
        amenities: ['WiFi', 'Gallery Lighting', 'Sound System', 'Catering Area', 'Parking'],
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Coastal Mansion',
        location: 'Cape Cod, MA',
        capacity: 180,
        pricePerHour: 350.00,
        description: 'An elegant seaside mansion with wraparound porch and ocean views. Perfect for weddings.',
        amenities: ['WiFi', 'Parking', 'Garden', 'Ocean View', 'Bridal Suite', 'Catering Kitchen'],
      },
    }),
  ]);

  console.log(`✅ Created ${venues.length} venues`);

  // Create bookings - 18 diverse bookings with overlapping dates
  const now = new Date();
  const bookings = await Promise.all([
    // Bookings for Sunset Conference Center (Miami)
    prisma.booking.create({
      data: {
        venueId: venues[0].id,
        customerName: 'John Smith',
        customerEmail: 'john.smith@example.com',
        startTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        endTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours
        totalPrice: 600.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[0].id,
        customerName: 'Emily Chen',
        customerEmail: 'emily.chen@example.com',
        startTime: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        endTime: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 6 hours
        totalPrice: 900.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[0].id,
        customerName: 'Michael Brown',
        customerEmail: 'm.brown@example.com',
        startTime: new Date(now.getTime() + 17 * 24 * 60 * 60 * 1000), // 17 days from now
        endTime: new Date(now.getTime() + 17 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours
        totalPrice: 450.00,
        status: 'confirmed',
      },
    }),

    // Bookings for Mountain View Retreat (Aspen)
    prisma.booking.create({
      data: {
        venueId: venues[1].id,
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@example.com',
        startTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        endTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 8 hours
        totalPrice: 1600.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[1].id,
        customerName: 'David Wilson',
        customerEmail: 'david.w@example.com',
        startTime: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
        endTime: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000), // 5 hours
        totalPrice: 1000.00,
        status: 'confirmed',
      },
    }),

    // Bookings for Urban Loft (NYC)
    prisma.booking.create({
      data: {
        venueId: venues[2].id,
        customerName: 'Mike Davis',
        customerEmail: 'mike.davis@example.com',
        startTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours
        totalPrice: 720.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[2].id,
        customerName: 'Lisa Anderson',
        customerEmail: 'lisa.a@example.com',
        startTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        endTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 6 hours
        totalPrice: 1080.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[2].id,
        customerName: 'Robert Taylor',
        customerEmail: 'robert.t@example.com',
        startTime: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        endTime: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours
        totalPrice: 540.00,
        status: 'confirmed',
      },
    }),

    // Bookings for Beachside Pavilion (San Diego)
    prisma.booking.create({
      data: {
        venueId: venues[3].id,
        customerName: 'Jennifer Martinez',
        customerEmail: 'j.martinez@example.com',
        startTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        endTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000), // 5 hours
        totalPrice: 875.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[3].id,
        customerName: 'Chris Lee',
        customerEmail: 'chris.lee@example.com',
        startTime: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
        endTime: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000), // 7 hours
        totalPrice: 1225.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[3].id,
        customerName: 'Amanda White',
        customerEmail: 'amanda.w@example.com',
        startTime: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        endTime: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours
        totalPrice: 700.00,
        status: 'confirmed',
      },
    }),

    // Bookings for Garden Estate (Napa)
    prisma.booking.create({
      data: {
        venueId: venues[4].id,
        customerName: 'James Thompson',
        customerEmail: 'james.t@example.com',
        startTime: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        endTime: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 8 hours
        totalPrice: 2000.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[4].id,
        customerName: 'Patricia Garcia',
        customerEmail: 'patricia.g@example.com',
        startTime: new Date(now.getTime() + 11 * 24 * 60 * 60 * 1000), // 11 days from now
        endTime: new Date(now.getTime() + 11 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 6 hours
        totalPrice: 1500.00,
        status: 'confirmed',
      },
    }),

    // Bookings for Lakeside Cabin (Lake Tahoe)
    prisma.booking.create({
      data: {
        venueId: venues[5].id,
        customerName: 'Kevin O\'Brien',
        customerEmail: 'kevin.o@example.com',
        startTime: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
        endTime: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours
        totalPrice: 360.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[5].id,
        customerName: 'Nancy Williams',
        customerEmail: 'nancy.w@example.com',
        startTime: new Date(now.getTime() + 13 * 24 * 60 * 60 * 1000), // 13 days from now
        endTime: new Date(now.getTime() + 13 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours
        totalPrice: 480.00,
        status: 'confirmed',
      },
    }),

    // Bookings for Historic Theater (Chicago)
    prisma.booking.create({
      data: {
        venueId: venues[7].id,
        customerName: 'Steven Clark',
        customerEmail: 'steven.c@example.com',
        startTime: new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
        endTime: new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000), // 5 hours
        totalPrice: 1500.00,
        status: 'confirmed',
      },
    }),

    // Bookings for Rooftop Garden (LA)
    prisma.booking.create({
      data: {
        venueId: venues[8].id,
        customerName: 'Michelle Rodriguez',
        customerEmail: 'michelle.r@example.com',
        startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        endTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 6 hours
        totalPrice: 1320.00,
        status: 'confirmed',
      },
    }),
    prisma.booking.create({
      data: {
        venueId: venues[8].id,
        customerName: 'Daniel Kim',
        customerEmail: 'daniel.k@example.com',
        startTime: new Date(now.getTime() + 19 * 24 * 60 * 60 * 1000), // 19 days from now
        endTime: new Date(now.getTime() + 19 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours
        totalPrice: 880.00,
        status: 'confirmed',
      },
    }),

    // Bookings for Modern Art Gallery (Seattle)
    prisma.booking.create({
      data: {
        venueId: venues[10].id,
        customerName: 'Rebecca Moore',
        customerEmail: 'rebecca.m@example.com',
        startTime: new Date(now.getTime() + 16 * 24 * 60 * 60 * 1000), // 16 days from now
        endTime: new Date(now.getTime() + 16 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000), // 7 hours
        totalPrice: 1470.00,
        status: 'confirmed',
      },
    }),
  ]);

  console.log(`✅ Created ${bookings.length} bookings`);
  console.log('🎉 Database seeding completed!');
  console.log('\n📊 Summary:');
  console.log(`   Total Venues: ${venues.length}`);
  console.log(`   Total Bookings: ${bookings.length}`);
  console.log(`   Overlapping bookings: YES (for realistic testing)`);
  console.log('\n💡 Tip: Search for "Miami" or "CA" to find specific venues!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
