import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    avatar: Joi.string().allow(null, "").optional(),
    role: Joi.string().valid("user", "admin").default("user"),
    provider: Joi.string().default("local"),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    avatar: Joi.string().allow(null, ""),
    role: Joi.string().valid("user", "admin"),
    provider: Joi.string()
});
