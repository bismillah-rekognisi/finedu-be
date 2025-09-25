import Joi from 'joi';

export const createRoleSchema = Joi.object({
    name: Joi.string().required(),
});

export const updateRoleSchema = Joi.object({
    name: Joi.string().optional(),
}); 