import prisma from "../config/db.js";

export default class BusinessCategoryRepository {
    async create(data) {
        return await prisma.businessCategory.create({ data });
    }

    async findAll() {
        return await prisma.businessCategory.findMany();
    }

    async findById(id) {
        return await prisma.businessCategory.findUnique({ where: { id } });
    }

    async findByName(name) {
        return await prisma.businessCategory.findUnique({ where: { name } });
    }

    async update(id, data) {
        return await prisma.businessCategory.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.businessCategory.delete({ where: { id } });
    }
}
