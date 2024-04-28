import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const store = await prisma.store.create({
    data: {
      name: "Starts & Stuff", // Replace with your store name
      openTime: 900, // 9:00 AM
      closeTime: 1600, // 4:00 PM
    },
  });
  // Create 3 employees
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        name: "Scott Greff", // Replace with employee details
        storeId: store.id,
        email: "scottiegreff@gmail.com", // Replace with employee email
        phone: "1234567890", // Replace with employee phone
        colour: generateRandomColor(), // Generate random color
      },
    }),
    prisma.employee.create({
      data: {
        name: "Employee 2", // Replace with employee details
        storeId: store.id,
        email: "employee2@example.com", // Replace with employee email
        phone: "1234567890", // Replace with employee phone
        colour: generateRandomColor(), // Generate random color
      },
    }),
    prisma.employee.create({
      data: {
        name: "Employee 3", // Replace with employee details
        storeId: store.id,
        email: "employee3@example.com", // Replace with employee email
        phone: "1234567890", // Replace with employee phone
        colour: generateRandomColor(), // Generate random color
      },
    }),
  ]);
  // Create 2 shifts for each employee
  for (const employee of employees) {
    for (let i = 0; i < 2; i++) {
      const randomDay = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28
      const randomStartTime = Math.floor(Math.random() * (1600 - 900)) + 900; // Random start time between 9:00 and 16:00
      const randomEndTime =
        Math.floor(Math.random() * (1600 - randomStartTime)) + randomStartTime; // Random end time after start time

      const from = new Date(
        2024,
        3,
        randomDay,
        Math.floor(randomStartTime / 100),
        randomStartTime % 100
      ); // Random date in April 2024
      const to = new Date(
        2024,
        3,
        randomDay,
        Math.floor(randomEndTime / 100),
        randomEndTime % 100
      ); // Random date in April 2024

      await prisma.shift.create({
        data: {
          employee: {
            connect: { id: employee.id },
          },
          store: {
            connect: { id: store.id },
          },
          from: from,
          to: to,
          startTime: randomStartTime,
          endTime: randomEndTime,
        },
      });
    }
  }
      // Create a hero image for the store
      const heroImage = await prisma.hero.create({
        data: {
          label: 'Main Hero', // Label for the hero image
          imageUrl: './public/images/hero.jpg', // Replace with the URL of the hero image
          logoUrl: './public/images/logo.webp', // Replace with the URL of the logo image
          store: {
            connect: { id: store.id }
          }
        }
      });

    // Create 3 billboards for the store
    const billboards = await Promise.all([
      prisma.billboard.create({
        data: {
          label: 'Optical Telescopes', // Replace with billboard label
          imageUrl: 'opticalBill.jpg', // Replace with the URL of the billboard image
          store: {
            connect: { id: store.id }
          }
        }
      }),
      prisma.billboard.create({
        data: {
          label: 'Smart Telescopes', // Replace with billboard label
          imageUrl: 'smartBill.jpg', // Replace with the URL of the billboard image
          store: {
            connect: { id: store.id }
          }
        }
      }),
      prisma.billboard.create({
        data: {
          label: 'Lessons', // Replace with billboard label
          imageUrl: 'lessonBill.jpg', // Replace with the URL of the billboard image
          store: {
            connect: { id: store.id }
          }
        }
      })
    ]);

     // Create 3 categories for the store
     const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Optical Telescopes',
          store: {
            connect: { id: store.id }
          },
          billboard: {
            connect: { id: billboards[0].id } 
          }
        }
      }),
      prisma.category.create({
        data: {
          name: 'Smart Telescopes',
          store: {
            connect: { id: store.id }
          },
          billboard: {
            connect: { id: billboards[1].id } 
          }
        }
      }),
      prisma.category.create({
        data: {
          name: 'Astronomy Lessons',
          store: {
            connect: { id: store.id }
          },
          billboard: {
            connect: { id: billboards[1].id }
          }
        }
      }),
    ]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

function generateRandomColor() {
  throw new Error("Function not implemented.");
}
