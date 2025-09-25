import prisma from '../config/db.js';
import { AppError } from '../error/appError.js';

export const ensureOwner = (entity, field = 'userId') => {
    return async (req, res, next) => {
        try {
            const entityId = req.params.id;
            const user = req.user;

            const record = await prisma[entity].findUnique({
                where: { id: Number(entityId) },
            });

            if (!record) {
                throw new AppError(`${entity} not found`, 404);
            }

            if (user.roleId !== 1 && record[field] !== user.id) {
                throw new AppError('Forbidden: you are not the owner', 403);
            }

            // simpan record ke req biar controller bisa pakai tanpa query ulang
            req[entity] = record;

            next();
        } catch (err) {
            next(err);
        }
    };
};
