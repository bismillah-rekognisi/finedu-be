import Joi from 'joi';

export const createBlogSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.number().optional(),
    status: Joi.string().valid('draft', 'published', 'archived').optional(),
});

export const updateBlogSchema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
    categoryId: Joi.number().optional(),
    status: Joi.string().valid('draft', 'published', 'archived').optional(),
}).min(1);