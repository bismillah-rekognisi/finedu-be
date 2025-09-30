import { AppError } from "../error/appError.js";
import cloudinary from "../libs/cloudinary.js";

export default class BlogService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }

    async createBlog(blogData, thumbnail) {
        let thumbnailUrl = blogData.thumbnail;

        if (thumbnail) {
            try {
                const uploadResult = await cloudinary.uploader.upload(thumbnail.tempFilePath, {
                    folder: "blog_thumbnails"
                });
                thumbnailUrl = uploadResult.secure_url;
            } catch (err) {
                throw new AppError("Failed to upload thumbnail", 500);
            }
        }

        return await this.blogRepository.create({
            ...blogData,
            thumbnail: thumbnailUrl
        });
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

    async updateBlog(id, blogData, thumbnail) {
        const blog = await this.blogRepository.findById(id);
        if (!blog) {
            throw new AppError('Blog not found', 404);
        }

        let updatedData = { ...blogData };

        if (thumbnail) {
            try {
                const uploadResult = await cloudinary.uploader.upload(thumbnail.tempFilePath, {
                    folder: "blog_thumbnails"
                });
                updatedData.thumbnail = uploadResult.secure_url;
            } catch (err) {
                throw new AppError("Failed to upload thumbnail", 500);
            }
        }

        return await this.blogRepository.update(id, updatedData);
    }

    async deleteBlog(id) {
        const blog = await this.blogRepository.findById(id);
        if (!blog) {
            throw new AppError('Blog not found', 404);
        }
        return await this.blogRepository.delete(id);
    }
} 