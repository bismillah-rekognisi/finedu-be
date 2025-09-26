import { createBlogCategorySchema, updateBlogCategorySchema } from "../dto/blog-category-request.dto.js";
import { toBlogCategoryResponse, toBlogCategoryListResponse } from "../dto/blog-category-response.dto.js";

export default class BlogCategoryController {
    constructor(blogCategoryService) {
        this.blogCategoryService = blogCategoryService;
    }

    create = async (req, res, next) => {
        try {
            const { error, value } = createBlogCategorySchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const blogCategory = await this.blogCategoryService.createBlogCategory(value);
            res.status(201).json(toBlogCategoryResponse(blogCategory));
        } catch (error) {
            next(error);
        }
    }

    findMany = async (req, res, next) => {
        try {
            const blogCategories = await this.blogCategoryService.getBlogCategories();
            res.status(200).json(toBlogCategoryListResponse(blogCategories));
        } catch (error) {
            next(error);
        }
    }

    findById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const blogCategory = await this.blogCategoryService.getBlogCategoryById(parseInt(id));
            res.status(200).json(toBlogCategoryResponse(blogCategory));
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = updateBlogCategorySchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const blogCategory = await this.blogCategoryService.updateBlogCategory(parseInt(id), value);
            res.status(200).json(toBlogCategoryResponse(blogCategory));
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.blogCategoryService.deleteBlogCategory(parseInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
} 