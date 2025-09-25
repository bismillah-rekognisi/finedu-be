import Joi from 'joi';

export const createTransactionCategorySchema = Joi.object({
    name: Joi.string().required(),
});

export const updateTransactionCategorySchema = Joi.object({
    name: Joi.string().required(),
});
