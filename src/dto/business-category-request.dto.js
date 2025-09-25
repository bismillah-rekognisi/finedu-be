import Joi from 'joi';

export const createBusinessCategorySchema = Joi.object({
    name: Joi.string().required(),
});

export const updateBusinessCategorySchema = Joi.object({
    name: Joi.string().required(),
});
