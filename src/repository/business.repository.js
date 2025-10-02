import prisma from "../config/db.js";

export default class BusinessRepository {
    async create(data) {
        return await prisma.business.create({ data });
    }

    async findAll({ month, year }) {
        return await prisma.business.findMany({
            where: {
                AND: [
                    {
                        createdAt: {
                            gte: new Date(year, month - 1, 1),
                            lt: new Date(year, month, 1)
                        }
                    }
                ]
            },
            include: { category: true }
        });
    }
    
    async findByUserId(userId) {
        return await prisma.business.findMany({ where: { userId }, include: { category: true } });
    }

    async findById(id) {
        return await prisma.business.findUnique({ 
            where: { id }, 
            include: { 
                category: true,
                transactions: true,
            }, 
        });
    }

    async analytic({ id, startDate, endDate }) {
        const business = await prisma.business.findUnique({
            where: { id },
            include: { 
                category: true,
                transactions: {
                    include: {
                        category: true,
                    },
                    where: {
                        date: {
                            gte: startDate,
                            lte: endDate
                        }
                    }
                },
            },
        });

        if (!business) return null;

        // Group by day and type
        const dailySummary = {};

        for (const t of business.transactions) {
            const day = t.date.getDate();
            if (!dailySummary[day]) {
                dailySummary[day] = { income: 0, expense: 0 };
            }
            if (t.type === 'INCOME') {
                dailySummary[day].income += t.amount;
            } else if (t.type === 'EXPENSE') {
                dailySummary[day].expense += t.amount;
            }
        }

        business.dailySummary = dailySummary;
        return business;
    }

    async update(id, data) {
        return await prisma.business.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.business.delete({ where: { id } });
    }
}
