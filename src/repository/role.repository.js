import prisma from "../config/db.js";

export default class RoleRepository {
    async create(data) {
        return await prisma.role.create({ data });
    }

    async findAll() {
        return await prisma.role.findMany();
    }

    async findById(id) {
        return await prisma.role.findUnique({ where: { id } });
    }

    async findByName(name) {
        return await prisma.role.findUnique({ where: { name } });
    }

    async update(id, data) {
        return await prisma.role.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.role.delete({ where: { id } });
    }
}
