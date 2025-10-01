import prisma from "../config/db.js";

export default class TargetRepository {
    async create(data) {
        return await prisma.target.create({ data });
    }

    async getById(id) {
        return await prisma.target.findUnique({
            where: { id },
            include: { business: true },
        });
    }

    async getAll(filter = {}) {
        return await prisma.target.findMany({
            where: filter,
            orderBy: { createdAt: 'desc' },
        });
    }

    async update(id, data) {
        return await prisma.target.update({
            where: { id },
            data,
        });
    }

    async delete(id) {
        return await prisma.target.delete({
            where: { id },
        });
    }
}