import { createBusinessCategorySchema, updateBusinessCategorySchema } from "../dto/business-category-request.dto.js";
import { toBusinessCategoryResponse, toBusinessCategoryListResponse } from "../dto/business-category-response.dto.js";

export default class BusinessCategoryController {
    constructor(businessCategoryService) {
        this.businessCategoryService = businessCategoryService;
    }

    create = async (req, res, next) => {
        try {
            const { error, value } = createBusinessCategorySchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const category = await this.businessCategoryService.createCategory(value);
            res.status(201).json(toBusinessCategoryResponse(category));
        } catch (error) {
            next(error);
        }
    }

    getAll = async (req, res, next) => {
        try {
            const categories = await this.businessCategoryService.getAllCategories();
            res.status(200).json(toBusinessCategoryListResponse(categories));
        } catch (error) {
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await this.businessCategoryService.getCategoryById(parseInt(id));
            res.status(200).json(toBusinessCategoryResponse(category));
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = updateBusinessCategorySchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const category = await this.businessCategoryService.updateCategory(parseInt(id), value);
            res.status(200).json(toBusinessCategoryResponse(category));
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.businessCategoryService.deleteCategory(parseInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
