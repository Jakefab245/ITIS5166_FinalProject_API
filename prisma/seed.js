import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  // Clear in dependency order
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "reviews", "orders", "menu", "users" RESTART IDENTITY CASCADE;`);

  const usersData = [
    { email: 'admin@uncc.edu',  password: 'Password123!', role: 'ADMIN' },
    { email: 'alice@testing.com',  password: 'Password456^', role: 'USER'  }
  ];

  const users = [];
  for (const u of usersData) {
    const hashed = await bcrypt.hash(u.password, 10);
    const created = await prisma.user.create({
      data: { email: u.email, password: hashed, role: u.role },
    });
    users.push(created);
  }
  const [admin, user] = users;

  // Menu items (created by admin)
  const menuItems = await Promise.all([
    prisma.menu.create({ data: { name: 'Espresso',     description: 'Strong shot of coffee',  price: 2.50, userId: admin.id } }),
    prisma.menu.create({ data: { name: 'Latte',        description: 'Espresso with milk',     price: 4.00, userId: admin.id } }),
    prisma.menu.create({ data: { name: 'Cappuccino',   description: 'Espresso with foam',     price: 3.75, userId: admin.id } }),
  ]);

  // Orders — `owner` owns the first order
  await prisma.order.create({
    data: { name: 'Morning espresso', authorId: user.id, menuId: menuItems[0].id },
  });
  await prisma.order.create({
    data: { name: 'Afternoon latte',  authorId: user.id, menuId: menuItems[1].id },
  });

  // Reviews — `owner` owns the first review
  await prisma.review.create({
    data: { rating: 5, comment: 'Amazing espresso!',   authorId: user.id, menuItemId: menuItems[0].id },
  });
  await prisma.review.create({
    data: { rating: 4, comment: 'Decent cappuccino.',  authorId: user.id, menuItemId: menuItems[2].id },
  });

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}