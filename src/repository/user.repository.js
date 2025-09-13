import prisma from "../config/db.js"

export default class UserRepository {
    async create(data) {
        return await prisma.user.create({ data });
    }

    async findById(id) {
        return await prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    }

    async verify(id) {
        return await prisma.user.update({
            where: { id },
            data: { emailVerifiedAt: new Date() }
        });
    }

    async updatePassword(id, password) {
        return await prisma.user.update({
            where: { id },
            data: { password }
        });
    }
}