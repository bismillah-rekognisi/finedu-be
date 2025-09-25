import Joi from 'joi';

export const createBusinessSchema = Joi.object({
    userId: Joi.number().integer().required(),
    name: Joi.string().required(),
    categoryId: Joi.number().integer().optional(),
    address: Joi.string().optional().allow(null, ''),
    description: Joi.string().optional().allow(null, ''),
});

export const updateBusinessSchema = Joi.object({
    name: Joi.string().optional(),
    categoryId: Joi.number().integer().optional(),
    address: Joi.string().optional().allow(null, ''),
    description: Joi.string().optional().allow(null, ''),
});
