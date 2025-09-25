import Joi from "joi";

export const createTransactionSchema = Joi.object({
    businessId: Joi.number().integer().required(),
    date: Joi.date().iso().optional(),
    type: Joi.string().valid("INCOME", "EXPENSE").required(),
    categoryId: Joi.number().integer().allow(null).optional(),
    amount: Joi.number().required(),
    notes: Joi.string().allow(null, "").optional(),
});

export const updateTransactionSchema = Joi.object({
    date: Joi.date().iso().optional(),
    type: Joi.string().valid("INCOME", "EXPENSE").optional(),
    categoryId: Joi.number().integer().allow(null).optional(),
    amount: Joi.number().optional(),
    notes: Joi.string().allow(null, "").optional(),
});