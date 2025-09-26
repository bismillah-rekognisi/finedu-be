import prisma from "../config/db.js";

export default class BlogRepository {
    async create(data) {
        return await prisma.blog.create({ data });
    }

    async findMany() {
        return await prisma.blog.findMany({ include: { category: true } });
    }

    async findById(id) {
        return await prisma.blog.findUnique({ where: { id }, include: { category: true } });
    }

    async update(id, data) {
        return await prisma.blog.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.blog.delete({ where: { id } });
    }
} 