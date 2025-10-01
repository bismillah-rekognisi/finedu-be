import Joi from "joi";

export const createTargetSchema = Joi.object({
    businessId: Joi.number().required(),
    title: Joi.string().required(),
    amount: Joi.number().required(),
    achievedAmount: Joi.number().default(0),
    deadlineDate: Joi.date().required(),
    status: Joi.string().valid("Going", "Achieved").default("Going"),
});

export const updateTargetSchema = Joi.object({
    title: Joi.string(),
    amount: Joi.number(),
    achievedAmount: Joi.number(),
    deadlineDate: Joi.date(),
    status: Joi.string().valid("Going", "Achieved"),
});