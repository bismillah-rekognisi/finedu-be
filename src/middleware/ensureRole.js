import { AppError } from '../error/appError.js';

export const ensureRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError('Unauthorized', 401);
            }

            const role = user.role.name;

            if (!role || !allowedRoles.includes(role)) {
                throw new AppError('Forbidden: insufficient role', 403);
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};
