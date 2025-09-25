import Joi from 'joi';

export const createGoalSchema = Joi.object({
    businessId: Joi.number().integer().required(),
    title: Joi.string().required(),
    targetAmount: Joi.number().required(),
    progressAmount: Joi.number().optional().default(0),
    deadline: Joi.date().required(),
    status: Joi.string().valid('Not Yet', 'On Going', 'Done').optional().default('Not Yet'),
});

export const updateGoalSchema = Joi.object({
    businessId: Joi.number().integer().optional(),
    title: Joi.string().optional(),
    targetAmount: Joi.number().optional(),
    progressAmount: Joi.number().optional(),
    deadline: Joi.date().optional(),
    status: Joi.string().valid('Not Yet', 'On Going', 'Done').optional(),
});
