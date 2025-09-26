import prisma from "../config/db.js";

export default class BlogCategoryRepository {
    async create(data) {
        return await prisma.blogCategory.create({ data });
    }

    async findMany() {
        return await prisma.blogCategory.findMany();
    }

    async findById(id) {
        return await prisma.blogCategory.findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma.blogCategory.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.blogCategory.delete({ where: { id } });
    }
} 