import { AppError } from "../error/appError.js";

export default class BlogService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }

    async createBlog(blogData) {
        return await this.blogRepository.create(blogData);
    }

    async getBlogs(query) {
        return await this.blogRepository.findMany(query);
    }

    async getBlogById(id) {
        const blog = await this.blogRepository.findById(id);
        if (!blog) {
            throw new AppError('Blog not found', 404);
        }
        return blog;
    }

    async updateBlog(id, blogData) {
        const blog = await this.blogRepository.findById(id);
        if (!blog) {
            throw new AppError('Blog not found', 404);
        }
        return await this.blogRepository.update(id, blogData);
    }

    async deleteBlog(id) {
        const blog = await this.blogRepository.findById(id);
        if (!blog) {
            throw new AppError('Blog not found', 404);
        }
        return await this.blogRepository.delete(id);
    }
} 