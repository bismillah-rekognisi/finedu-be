import { AppError } from "../error/appError.js";
import { slugify } from "../utils/slug.js";

export default class BusinessCategoryService {
    constructor(businessCategoryRepository) {
        this.businessCategoryRepository = businessCategoryRepository;
    }

    async createCategory(categoryData) {
        const existingCategory = await this.businessCategoryRepository.findByName(categoryData.name);
        if (existingCategory) {
            throw new AppError('Business Category already exists', 400);
        }
        const slug = slugify(categoryData.name);
        return await this.businessCategoryRepository.create({ ...categoryData, slug });
    }

    async getAllCategories() {
        return await this.businessCategoryRepository.findAll();
    }

    async getCategoryById(id) {
        const category = await this.businessCategoryRepository.findById(id);
        if (!category) {
            throw new AppError('Business Category not found', 404);
        }
        return category;
    }

    async updateCategory(id, categoryData) {
        const category = await this.businessCategoryRepository.findById(id);
        if (!category) {
            throw new AppError('Business Category not found', 404);
        }
        categoryData.slug = slugify(categoryData.name);
        return await this.businessCategoryRepository.update(id, categoryData);
    }

    async deleteCategory(id) {
        const category = await this.businessCategoryRepository.findById(id);
        if (!category) {
            throw new AppError('Business Category not found', 404);
        }
        return await this.businessCategoryRepository.delete(id);
    }
}
