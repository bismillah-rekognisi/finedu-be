import { createTargetSchema, updateTargetSchema } from "../dto/target-request.dto.js";
import { toTargetListResponse, toTargetResponse } from "../dto/target-response.dto.js";

export default class TargetController {
    constructor(targetService) {
        this.targetService = targetService;
    }

    create = async (req, res, next) => {
        try {
            const { error, value } = createTargetSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const target = await this.targetService.createTarget(value);
            res.status(201).json(toTargetResponse(target));
        } catch (error) {
            next(error);
        }
    }

    getAll = async (req, res, next) => {
        try {
            const targets = await this.targetService.getTargets();
            res.status(200).json(toTargetListResponse(targets));
        } catch (error) {
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const target = await this.targetService.getTargetById(parseInt(id));
            res.status(200).json(toTargetResponse(target));
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = updateTargetSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const target = await this.targetService.updateTarget(parseInt(id), value);
            res.status(200).json(toTargetResponse(target));
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.targetService.deleteTarget(parseInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}