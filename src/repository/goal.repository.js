import prisma from "../config/db.js";

export default class GoalRepository {
    async create(data) {
        return await prisma.goal.create({ data });
    }

    async findByUser(userId) {
        return await prisma.goal.findMany({
            where: {
                business: {
                    userId: userId
                }
            }
        });
    }

    async findById(id) {
        return await prisma.goal.findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma.goal.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.goal.delete({ where: { id } });
    }
}
