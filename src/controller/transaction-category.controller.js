import { createTransactionCategorySchema, updateTransactionCategorySchema } from "../dto/transaction-category-request.dto.js";
import { toTransactionCategoryResponse, toTransactionCategoryListResponse } from "../dto/transaction-category-response.dto.js";

export default class TransactionCategoryController {
    constructor(transactionCategoryService) {
        this.transactionCategoryService = transactionCategoryService;
    }

    create = async (req, res, next) => {
        try {
            const { error, value } = createTransactionCategorySchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const category = await this.transactionCategoryService.createCategory(value);
            res.status(201).json(toTransactionCategoryResponse(category));
        } catch (error) {
            next(error);
        }
    }

    getAll = async (req, res, next) => {
        try {
            const categories = await this.transactionCategoryService.getAllCategories();
            res.status(200).json(toTransactionCategoryListResponse(categories));
        } catch (error) {
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await this.transactionCategoryService.getCategoryById(parseInt(id));
            res.status(200).json(toTransactionCategoryResponse(category));
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = updateTransactionCategorySchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const category = await this.transactionCategoryService.updateCategory(parseInt(id), value);
            res.status(200).json(toTransactionCategoryResponse(category));
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.transactionCategoryService.deleteCategory(parseInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
