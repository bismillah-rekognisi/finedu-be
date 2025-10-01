import { AppError } from "../error/appError.js";

export default class TargetService {
    constructor(targetRepo) {
        this.targetRepo = targetRepo;
    }

    async createTarget(data) {
        return await this.targetRepo.create(data);
    }

    async getTargetById(id) {
        const target = await this.targetRepo.getById(id);
        if (!target) {
            throw new AppError('Target not found', 404);
        }
        return target;
    }

    async getTargets(filter = {}) {
        return await this.targetRepo.getAll(filter);
    }

    async updateTarget(id, data) {
        const existing = await this.targetRepo.getById(id);
        if (!existing) {
            throw new AppError('Target not found', 404);
        }

        // auto update status kalau amount berubah
        const nextAmount = data.amount ?? existing.amount;
        const nextAchieved = data.achievedAmount ?? existing.achievedAmount;
        if (nextAchieved >= nextAmount) {
            data.status = 'Achieved';
        }

        return await this.targetRepo.update(id, data);
    }

    async deleteTarget(id) {
        const existing = await this.targetRepo.getById(id);
        if (!existing) {
            throw new AppError('Target not found', 404);
        }
        return await this.targetRepo.delete(id);
    }
}