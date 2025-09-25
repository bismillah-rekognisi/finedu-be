import { AppError } from "../error/appError.js";
import { slugify } from "../utils/slug.js";

export default class TransactionCategoryService {
    constructor(transactionCategoryRepository) {
        this.transactionCategoryRepository = transactionCategoryRepository;
    }

    async createCategory(categoryData) {
        const existingCategory = await this.transactionCategoryRepository.findByName(categoryData.name);
        if (existingCategory) {
            throw new AppError('Transaction Category already exists', 400);
        }
        const slug = slugify(categoryData.name);
        return await this.transactionCategoryRepository.create({...categoryData, slug});
    }

    async getAllCategories() {
        return await this.transactionCategoryRepository.findAll();
    }

    async getCategoryById(id) {
        const category = await this.transactionCategoryRepository.findById(id);
        if (!category) {
            throw new AppError('Transaction Category not found', 404);
        }
        return category;
    }

    async updateCategory(id, categoryData) {
        const category = await this.transactionCategoryRepository.findById(id);
        if (!category) {
            throw new AppError('Transaction Category not found', 404);
        }
        const slug = slugify(categoryData.name);
        return await this.transactionCategoryRepository.update(id, { ...categoryData, slug });
    }

    async deleteCategory(id) {
        const category = await this.transactionCategoryRepository.findById(id);
        if (!category) {
            throw new AppError('Transaction Category not found', 404);
        }
        return await this.transactionCategoryRepository.delete(id);
    }
}
