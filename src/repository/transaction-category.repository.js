import prisma from "../config/db.js";

export default class TransactionCategoryRepository {
    async create(data) {
        return await prisma.transactionCategory.create({ data });
    }

    async findAll() {
        return await prisma.transactionCategory.findMany();
    }

    async findById(id) {
        return await prisma.transactionCategory.findUnique({ where: { id } });
    }

    async findByName(name) {
        return await prisma.transactionCategory.findUnique({ where: { name } });
    }

    async update(id, data) {
        return await prisma.transactionCategory.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.transactionCategory.delete({ where: { id } });
    }
}
