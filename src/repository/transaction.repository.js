import prisma from "../config/db.js";

export default class TransactionRepository {
    async create(data) {
        return await prisma.transaction.create({
            data,
        });
    }

    async getById(id) {
        return await prisma.transaction.findUnique({
            where: { id: id },
            include: { category: true, business: true },
        });
    }

    async getByBusiness(businessId, startDate, endDate, categoryId) {
        const where = { businessId: businessId };

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            where.date = {
                gte: start,
                lte: end,
            };
        }

        if (categoryId) {
            where.categoryId = categoryId;
        }

        return await prisma.transaction.findMany({
            where,
            include: { category: true, business: true },
            orderBy: { date: 'desc' },
        });
    }

    async getAll(filter = {}) {
        return await prisma.transaction.findMany({
            where: filter,
            include: { category: true, business: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async update(id, data) {
        return await prisma.transaction.update({
            where: { id: Number(id) },
            data,
        });
    }

    async delete(id) {
        return await prisma.transaction.delete({
            where: { id: Number(id) },
        });
    }
}
