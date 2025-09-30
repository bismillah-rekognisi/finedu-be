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
        return await prisma.business.findUnique({ where: { id }, include: { category: true } });
    }

    async update(id, data) {
        return await prisma.business.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.business.delete({ where: { id } });
    }
}
