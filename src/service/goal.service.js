import { AppError } from "../error/appError.js";

export default class GoalService {
    constructor(goalRepository) {
        this.goalRepository = goalRepository;
    }

    async createGoal(goalData) {
        return await this.goalRepository.create(goalData);
    }

    async getGoalsByUser(userId) {
        return await this.goalRepository.findByUser(userId);
    }

    async getGoalById(id) {
        const goal = await this.goalRepository.findById(id);
        if (!goal) {
            throw new AppError('Goal not found', 404);
        }
        return goal;
    }

    async updateGoal(id, goalData) {
        const goal = await this.goalRepository.findById(id);
        if (!goal) {
            throw new AppError('Goal not found', 404);
        }
        return await this.goalRepository.update(id, goalData);
    }

    async deleteGoal(id) {
        const goal = await this.goalRepository.findById(id);
        if (!goal) {
            throw new AppError('Goal not found', 404);
        }
        return await this.goalRepository.delete(id);
    }
}
