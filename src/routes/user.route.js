import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { ensureRole } from '../middleware/ensureRole.js';

export default function createUserRoute(userController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(ensureRole('Admin'));

    router.get('/', userController.getAll);
    router.get('/:id', userController.getById);
    router.put('/:id/suspend', userController.suspend);
    router.put('/:id/activate', userController.activate);
    router.delete('/:id', userController.delete);

    return router;
}
