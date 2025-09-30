import { createBlogSchema, updateBlogSchema } from "../dto/blog-request.dto.js";
import { toBlogResponse, toBlogListResponse } from "../dto/blog-response.dto.js";

export default class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }

    create = async (req, res, next) => {
        try {
            const { error, value } = createBlogSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            
            const blog = await this.blogService.createBlog(value, req.files?.thumbnail);
            res.status(201).json(toBlogResponse(blog));
        } catch (error) {
            next(error);
        }
    }

    findMany = async (req, res, next) => {
        try {
            const blogs = await this.blogService.getBlogs();
            res.status(200).json(toBlogListResponse(blogs));
        } catch (error) {
            next(error);
        }
    }

    findById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const blog = await this.blogService.getBlogById(parseInt(id));
            res.status(200).json(toBlogResponse(blog));
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = updateBlogSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const blog = await this.blogService.updateBlog(parseInt(id), value, req.files?.thumbnail);
            res.status(200).json(toBlogResponse(blog));
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.blogService.deleteBlog(parseInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
} 