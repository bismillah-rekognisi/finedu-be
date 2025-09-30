import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Seed Roles
    const roles = [
        { name: 'Admin', slug: 'admin' },
        { name: 'Owner', slug: 'owner' },
        { name: 'Staff', slug: 'staff' },
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }
    console.log('Role seeded.');

    // Seed Admin User
    const adminEmail = 'admin@finedu.com';
    const adminPassword = await bcrypt.hash('admin123', 10);

    // Seed Owner User
    const ownerEmail = 'owner@finedu.com';
    const ownerPassword = await bcrypt.hash('owner123', 10);

    // Get admin and owner role id
    const adminRole = await prisma.role.findUnique({ where: { slug: 'admin' } });
    const ownerRole = await prisma.role.findUnique({ where: { slug: 'owner' } });

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            name: 'Admin',
            email: adminEmail,
            password: adminPassword,
            roleId: adminRole.id,
            isActive: true,
            emailVerifiedAt: new Date(),
        },
    });

    await prisma.user.upsert({
        where: { email: ownerEmail },
        update: {},
        create: {
            name: 'Owner',
            email: ownerEmail,
            password: ownerPassword,
            roleId: ownerRole.id,
            isActive: true,
            emailVerifiedAt: new Date(),
        },
    });

    console.log('Admin and Owner users seeded.');

    // Seed Business Categories
    const businessCategories = [
        { name: 'Technology', slug: 'technology' },
        { name: 'Food & Beverage', slug: 'food-beverage' },
        { name: 'Retail', slug: 'retail' },
        { name: 'Services', slug: 'services' },
    ];

    for (const category of businessCategories) {
        await prisma.businessCategory.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    }
    console.log('Business Categories seeded.');

    // Seed Transaction Categories
    const transactionCategories = [
        { name: 'Groceries', slug: 'groceries' },
        { name: 'Utilities', slug: 'utilities' },
        { name: 'Rent', slug: 'rent' },
        { name: 'Salary', slug: 'salary' },
        { name: 'Freelance', slug: 'freelance' },
    ];

    for (const category of transactionCategories) {
        await prisma.transactionCategory.upsert({
        where: { name: category.name },
        update: {},
        create: category,
        });
    }
    console.log('Transaction Categories seeded.');

    // Seed Blog Categories
     const blogCategories = [
        { name: 'Finance Tips', slug: 'finance-tips' },
        { name: 'Investment', slug: 'investment' },
        { name: 'Business Growth', slug: 'business-growth' },
        { name: 'Productivity', slug: 'productivity' },
    ];

    for (const category of blogCategories) {
        await prisma.blogCategory.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    }
    console.log('Blog Categories seeded.');

    console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });