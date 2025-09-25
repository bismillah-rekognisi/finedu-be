import { createGoalSchema, updateGoalSchema } from "../dto/goal-request.dto.js";
import { toGoalResponse, toGoalListResponse } from "../dto/goal-response.dto.js";

export default class GoalController {
    constructor(goalService) {
        this.goalService = goalService;
    }

    create = async (req, res, next) => {
        try {
            const { error, value } = createGoalSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const goal = await this.goalService.createGoal(value);
            res.status(201).json(toGoalResponse(goal));
        } catch (error) {
            next(error);
        }
    }

    getByUser = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const goals = await this.goalService.getGoalsByUser(userId);
            res.status(200).json(toGoalListResponse(goals));
        } catch (error) {
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const goal = await this.goalService.getGoalById(parseInt(id));
            res.status(200).json(toGoalResponse(goal));
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = updateGoalSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const goal = await this.goalService.updateGoal(parseInt(id), value);
            res.status(200).json(toGoalResponse(goal));
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.goalService.deleteGoal(parseInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
