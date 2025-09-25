import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    avatar: Joi.string().allow(null, "").optional(),
    roleId: Joi.number().integer().valid(1, 2, 3).default(2), // 1: admin, 2: owner, 3: staff
    provider: Joi.string().default("local"),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    avatar: Joi.string().allow(null, ""),
    roleId: Joi.number().integer().valid(1, 2, 3), // 1: admin, 2: owner, 3: staff
    provider: Joi.string()
});
