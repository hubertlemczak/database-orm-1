const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: 'Alice',
      Contact: {
        create: {
          phone: '123123123123',
          email: 'email@email.com',
        },
      },
    },
    include: {
      Contact: true,
    },
  });

  console.log('Customer created', createdCustomer);

  const createdMovie = await prisma.movie.create({
    data: {
      title: 'Alice in Wonderland',
      runtimeMins: 108,
    },
  });

  console.log('Movie created', createdMovie);

  const createdScreen = await prisma.screen.create({
    data: {
      number: 1,
      screenings: {
        create: {
          startsAt: new Date('2022-09-02T20:23:33+00:00'),
          movieId: 1,
        },
      },
    },
    include: {
      screenings: true,
    },
  });

  console.log('Screen created', createdScreen);

  const createdTicket = await prisma.ticket.create({
    data: {
      screeningId: 1,
      customerId: 1,
    },
  });

  // Add your code here
  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async error => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
