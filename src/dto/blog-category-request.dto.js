import Joi from 'joi';

export const createBlogCategorySchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
});

export const updateBlogCategorySchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
}); 