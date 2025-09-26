import { AppError } from "../error/appError.js";
import { slugify } from "../utils/slug.js";

export default class BlogCategoryService {
    constructor(blogCategoryRepository) {
        this.blogCategoryRepository = blogCategoryRepository;
    }

    async createBlogCategory(blogCategoryData) {
        blogCategoryData.slug = slugify(blogCategoryData.name);

        return await this.blogCategoryRepository.create(blogCategoryData);
    }

    async getBlogCategories(query) {
        return await this.blogCategoryRepository.findMany(query);
    }

    async getBlogCategoryById(id) {
        const blogCategory = await this.blogCategoryRepository.findById(id);
        if (!blogCategory) {
            throw new AppError('BlogCategory not found', 404);
        }
        return blogCategory;
    }

    async updateBlogCategory(id, blogCategoryData) {
        const blogCategory = await this.blogCategoryRepository.findById(id);
        if (!blogCategory) {
            throw new AppError('BlogCategory not found', 404);
        }
        blogCategoryData.slug = slugify(blogCategoryData.name);
        return await this.blogCategoryRepository.update(id, blogCategoryData);
    }

    async deleteBlogCategory(id) {
        const blogCategory = await this.blogCategoryRepository.findById(id);
        if (!blogCategory) {
            throw new AppError('BlogCategory not found', 404);
        }
        return await this.blogCategoryRepository.delete(id);
    }
} 