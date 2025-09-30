import prisma from "../config/db.js"

export default class UserRepository {
    async create(data) {
        return await prisma.user.create({ data });
    }

    async findAll() {
        return await prisma.user.findMany({ include: { role: true } });
    }

    async findById(id) {
        return await prisma.user.findUnique({ where: { id }, include: { role: true } });
    }

    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email }, include: { role: true } });
    }

    async verify(id) {
        return await prisma.user.update({
            where: { id },
            data: { emailVerifiedAt: new Date() }
        });
    }

    async update(email, data) {
        return await prisma.user.update({ where: { email }, data });
    }

    async delete(id) {
        return await prisma.user.delete({
            where: { id }
        });
    }

    async updateAccessToken(id, token) {
        return await prisma.user.update({
            where: { id },
            data: { access_token: token }
        });
    }

    async updatePassword(id, password) {
        return await prisma.user.update({
            where: { id },
            data: { password }
        });
    }

    async suspend(id) {
        return await prisma.user.update({
            where: { id },
            data: { isActive: false }
        });
    }

    async activate(id) {
        return await prisma.user.update({
            where: { id },
            data: { isActive: true }
        });
    }
}